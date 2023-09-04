from django.db import models

class Address(models.Model):
    code = models.AutoField(primary_key=True)
    street = models.CharField(max_length=100)
    neighborhood = models.CharField(max_length=75)
    city = models.CharField(max_length=75)
    state = models.CharField(max_length=2)
    postal_code = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state}"

class User(models.Model):
    code = models.AutoField(primary_key=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    social_name_or_fantasy = models.CharField(max_length=100)
    photo_logo = models.ImageField(upload_to='user_photos/', blank=True, null=True)
    birthdate_or_opening_date = models.DateField()
    username = models.CharField(max_length=10, unique=True)
    password = models.CharField(max_length=128)

    def __str__(self):
        return self.full_name

class Contact(models.Model):
    code = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    number = models.CharField(max_length=15)
    extension = models.CharField(max_length=25, blank=True, null=True)
    email = models.EmailField(max_length=50, blank=True, null=True)
    observation = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        return self.number

class UserNP(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    cpf = models.CharField(max_length=15)
    rg = models.CharField(max_length=15)

class UserLP(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    cnpj = models.CharField(max_length=25)
    state_registration = models.CharField(max_length=30)
    municipal_registration = models.CharField(max_length=30)

class Account(models.Model):
    code = models.AutoField(primary_key=True)
    agency = models.CharField(max_length=10)
    number = models.CharField(max_length=25, unique=True)
    account_type = models.CharField(max_length=20)
    limit = models.DecimalField(max_digits=10, decimal_places=2)
    active = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.account_type} - {self.number}"

class Card(models.Model):
    code = models.AutoField(primary_key=True)
    account = models.ForeignKey(Account, on_delete=models.RESTRICT)
    number = models.CharField(max_length=30, unique=True)
    cvv = models.CharField(max_length=5)
    expiration_date = models.DateField()
    brand = models.CharField(max_length=20)
    status = models.CharField(max_length=20)

    def __str__(self):
        return f"Card ending in {self.number[-4:]}"

class Transaction(models.Model):
    code = models.AutoField(primary_key=True)
    card = models.ForeignKey(Card, on_delete=models.CASCADE)
    date_time = models.DateTimeField()
    operation = models.CharField(max_length=20)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

class Investment(models.Model):
    code = models.AutoField(primary_key=True)
    account = models.ForeignKey(Account, on_delete=models.RESTRICT)
    investment_type = models.CharField(max_length=30)
    investment_amount = models.DecimalField(max_digits=10, decimal_places=2)
    management_fee = models.FloatField()
    term = models.CharField(max_length=20)
    risk_level = models.CharField(max_length=5)
    profitability = models.DecimalField(max_digits=10, decimal_places=2)
    completed = models.BooleanField(default=False)

class Loan(models.Model):
    code = models.AutoField(primary_key=True)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    request_date = models.DateField()
    requested_amount = models.DecimalField(max_digits=10, decimal_places=2)
    interest_rate = models.FloatField()
    approved = models.BooleanField(default=False)
    installment_number = models.IntegerField()
    approval_date = models.DateField(null=True, blank=True)
    remark = models.TextField(blank=True)

class InstallmentLoan(models.Model):
    code = models.AutoField(primary_key=True)
    loan = models.ForeignKey(Loan, on_delete=models.RESTRICT)
    installment_number = models.IntegerField()
    due_date = models.DateField()
    installment_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField(null=True, blank=True)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

class UserAccount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'account')
