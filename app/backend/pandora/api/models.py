from django.db import models
from random import randint
import random
from datetime import datetime, timedelta
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):
    use_in_migrations = True


class Costumer(models.Model):
    full_name = models.CharField(max_length=100)
    social_name = models.CharField(max_length=100)
    birthdate = models.DateField()
    photo_logo = models.ImageField(
        upload_to='user_photos/', blank=True, null=True)
    accounts = models.ManyToManyField(
        'Account', related_name='customers', blank=True)

    def __str__(self):
        return self.full_name


class CostumerNP(Costumer):
    cpf = models.CharField(max_length=11, unique=True)
    rg = models.CharField(max_length=9, unique=True)


class CostumerLP(Costumer):
    cnpj = models.CharField(max_length=14, unique=True)
    state_registration = models.CharField(max_length=9)
    municipal_registration = models.CharField(max_length=11)


class Account(models.Model):
    ACC_TYPES = [
        ("SAVINGS", "Savings Account"),
        ("CHECKING", "Checking Account"),
    ]

    costumer = models.ManyToManyField(Costumer)
    agency = models.CharField(max_length=4, blank=True)
    number = models.CharField(max_length=10, unique=True, blank=True)
    acc_type = models.CharField(max_length=20, choices=ACC_TYPES)
    limit = models.DecimalField(max_digits=10, decimal_places=2)
    active = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        if not self.id:
            self.agency = ''.join(str(random.randint(0, 9)) for _ in range(4))
            self.number = ''.join(str(random.randint(0, 9)) for _ in range(10))
        super(Account, self).save(*args, **kwargs)

    def __str__(self):
        return f"{self.acc_type} - {self.number}"


class Address(models.Model):
    costumer = models.ForeignKey(
        Costumer, on_delete=models.CASCADE, related_name='addresses')
    street = models.CharField(max_length=100)
    neighborhood = models.CharField(max_length=75)
    city = models.CharField(max_length=75)
    state = models.CharField(max_length=2)
    zip_code = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state}"


class Contact(models.Model):
    idCostumer = models.ForeignKey(Costumer, on_delete=models.CASCADE)
    number = models.CharField(max_length=11)
    email = models.EmailField(max_length=50, blank=True, null=True)
    observation = models.CharField(max_length=200, blank=True, null=True)

    def __str__(self):
        if self.email:
            return f"Number: {self.number}, Email: {self.email}"
        return f"Number: {self.number}"


class Card(models.Model):
    idAccount = models.ForeignKey(Account, on_delete=models.CASCADE)
    number = models.CharField(max_length=16, blank=True)
    cvv = models.CharField(max_length=3, blank=True)
    expiration_date = models.DateField(blank=True, null=True)
    flag = models.CharField(max_length=25, blank=True)
    active = models.BooleanField(default=True)

    def determine_flag(self):
        first_digit = int(self.number[0])
        if first_digit == 2:
            return "Mastercard"
        if first_digit == 3:
            return "American Express"
        if first_digit == 4:
            return "Visa"
        if first_digit == 5:
            return "MasterCard"
        if first_digit == 6:
            return "Elo"

    @staticmethod
    def generate_credit_card_number():
        # 2 Mastercard, 3 American Express, 4 Visa, 5 MasterCard, 6 Elo
        first_digit = random.choice([2, 3, 4, 5, 6])

        other_digits = [random.randint(0, 9) for _ in range(15)]

        total = first_digit
        for i, digit in enumerate(other_digits):
            if i % 2 == 0:
                digit *= 2
                if digit > 9:
                    digit -= 9
            total += digit

        last_digit = (10 - (total % 10)) % 10

        credit_card_number = [str(first_digit)] + [str(digit)
                                                   for digit in other_digits] + [str(last_digit)]

        return ''.join(credit_card_number)

    def save(self, *args, **kwargs):
        self.number = self.generate_credit_card_number()
        self.cvv = str(randint(100, 999))
        self.expiration_date = datetime.now() + timedelta(days=365)
        self.flag = self.determine_flag()
        super(Card, self).save(*args, **kwargs)

    def __str__(self):
        return f"Card ending in {self.number[-4:]}"


class Transaction(models.Model):
    idCard = models.ForeignKey(Card, on_delete=models.CASCADE)
    date_time = models.DateTimeField()

    OPERATION_CHOICES = [
        ('Deposit', 'Deposit'),
        ('Withdrawal', 'Withdrawal'),
        ('Payment', 'Payment'),
        ('Transfer', 'Transfer')
    ]

    operation = models.CharField(max_length=20, choices=OPERATION_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.date_time} - {self.operation} - Card ending in {self.idCard.number[-4:]}"


class Investment(models.Model):
    idAccount = models.ForeignKey(Account, on_delete=models.CASCADE)

    INVESTMENT_TYPE_CHOICES = [
        ('Stocks', 'Stocks'),
        ('Bonds', 'Bonds'),
        ('Mutual Funds', 'Mutual Funds'),
        ('Real Estate', 'Real Estate')
    ]

    inv_type = models.CharField(max_length=30, choices=INVESTMENT_TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    management_fee = models.FloatField()
    term = models.DurationField()
    risk_rate = models.DecimalField(max_digits=5, decimal_places=2)
    profitability = models.DecimalField(max_digits=5, decimal_places=2)
    completed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.inv_type} Investment - Amount: {self.amount}, Risk Rate: {self.risk_rate}%"


class Loan(models.Model):
    idAccount = models.ForeignKey(Account, on_delete=models.CASCADE)
    request_date = models.DateField()
    requested_amount = models.DecimalField(max_digits=10, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    approved = models.BooleanField(default=False)
    approval_date = models.DateField(null=True)
    installment_number = models.IntegerField()
    observation = models.TextField(blank=True)

    def __str__(self):
        return f"Loan for Account: {self.idAccount.number} - Amount: {self.requested_amount}"


class InstallmentLoan(models.Model):
    idLoan = models.ForeignKey(Loan, on_delete=models.CASCADE)
    number = models.IntegerField()
    due_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField(null=True, blank=True)
    paid_amount = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"Installment for Loan #{self.idLoan.id} - Number: {self.number}, Due Date: {self.due_date}, Amount: {self.amount}"

