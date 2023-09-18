from django.db import models


class Client(models.Model):
    full_name = models.CharField(max_length=100)
    social_name = models.CharField(max_length=100)
    birthdate = models.DateField()
    photo_logo = models.ImageField(
        upload_to='user_photos/', blank=True, null=True)
    username = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.full_name


class ClientNP(Client):
    idClient = models.OneToOneField(Client, on_delete=models.CASCADE, related_name="client_np")
    cpf = models.CharField(max_length=11, unique=True)
    rg = models.CharField(max_length=9, unique=True)


class ClientLP(Client):
    idClient = models.OneToOneField(Client, on_delete=models.CASCADE, related_name="client_lp")
    cnpj = models.CharField(max_length=14, unique=True)
    state_registration = models.CharField(max_length=30)
    municipal_registration = models.CharField(max_length=30)


class Account(models.Model):
    client = models.ManyToManyField(Client)
    agency = models.CharField(max_length=10)
    number = models.CharField(max_length=25, unique=True)
    acc_type = models.CharField(max_length=20)
    limit = models.DecimalField(max_digits=10, decimal_places=2)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.acc_type} - {self.number}"


class Address(models.Model):
    street = models.CharField(max_length=100)
    neighborhood = models.CharField(max_length=75)
    city = models.CharField(max_length=75)
    state = models.CharField(max_length=2)
    zip_code = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state}"


class Contact(models.Model):
    idClient = models.ForeignKey(Client, on_delete=models.CASCADE)
    number = models.CharField(max_length=11)
    email = models.EmailField(max_length=50, blank=True, null=True)
    observation = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.number


class Card(models.Model):
    idAccount = models.ForeignKey(Account, on_delete=models.CASCADE)
    number = models.CharField(max_length=20)
    cvv = models.CharField(max_length=3)
    expiration_date = models.DateField()
    flag = models.CharField(max_length=20)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"Card ending in {self.number[-4:]}"


class Transaction(models.Model):
    idCard = models.ForeignKey(Card, on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    operation = models.CharField(max_length=20)
    amount = models.DecimalField(max_digits=10, decimal_places=2)


class Investment(models.Model):
    idAccount = models.ForeignKey(Account, on_delete=models.CASCADE)
    inv_type = models.CharField(max_length=30)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    management_fee = models.FloatField()
    term = models.DurationField()
    risk_rate = models.DecimalField(max_digits=5, decimal_places=2)
    profitability = models.DecimalField(max_digits=5, decimal_places=2)
    completed = models.BooleanField(default=False)


class Loan(models.Model):
    idAccount = models.ForeignKey(Account, on_delete=models.CASCADE)
    request_date = models.DateField()
    requested_amount = models.DecimalField(max_digits=10, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    approved = models.BooleanField(default=False)
    approval_date = models.DateField(null=True)
    installment_number = models.IntegerField()
    observation = models.TextField(blank=True)


class InstallmentLoan(models.Model):
    idLoan = models.ForeignKey(Loan, on_delete=models.CASCADE)
    number = models.IntegerField()
    due_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField(null=True, blank=True)
    paid_amount = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)
