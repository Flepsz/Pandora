from django.db import models
from random import randint
import random
from datetime import datetime, timedelta
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator

# Custom User Manager for creating and managing users
class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    # Function to create a user with a register number and password
    def _create_user(self, register_number, password, **extra_fields):
        if not register_number:
            raise ValueError('Register Number is required')
        user = self.model(register_number=register_number, username=register_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    # Function to create a regular user
    def create_user(self, register_number, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(register_number, password, **extra_fields)

    # Function to create a superuser
    def create_superuser(self, register_number, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser needs the is_superuser=True')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser needs the is_staff=True')

        return self._create_user(register_number, password, **extra_fields)

# Base model with created, modified, and active fields
class Base(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True

# Custom User model extending AbstractUser
class Customer(AbstractUser):
    register_number = models.IntegerField(
        primary_key=True,
        validators=[MaxValueValidator(999999999999999999999999)],
        unique=True,
    )
    password = models.CharField(max_length=100)
    photo_logo = models.ImageField(
        upload_to='user_photos/', blank=True, null=True)
    accounts = models.ManyToManyField(
        'Account', related_name='customers', blank=True)
    is_staff = models.BooleanField(default=False)

    groups = models.ManyToManyField(
        'auth.Group', related_name='customer_groups', blank=True)
    user_permissions = models.ManyToManyField(
        'auth.Permission', related_name='customer_user_permissions', blank=True)

    REQUIRED_FIELDS = ['first_name', 'last_name']
    USERNAME_FIELD = 'register_number'

    def __str__(self):
        return f'{self.register_number}'

    objects = CustomUserManager()

# Natural Person model with customer details
class CustomerNP(Base):
    customer = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    social_name = models.CharField(max_length=50)
    cpf = models.CharField(max_length=11, unique=True)
    rg = models.CharField(max_length=9, unique=True)
    birthdate = models.DateField()

    class Meta:
        verbose_name = 'Natural Person'
        verbose_name_plural = 'Natural People'

    def __str__(self):
        return f'{self.name}'

# Legal Person model with customer details
class CustomerLP(Base):
    customer = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    fantasy_name = models.CharField(max_length=100)
    cnpj = models.CharField(max_length=14, unique=True)
    establishment_date = models.DateField()
    sr = models.CharField(max_length=9)  # State Registration
    mr = models.CharField(max_length=11)  # Municipal Registration

    class Meta:
        verbose_name = 'Legal Person'
        verbose_name_plural = 'Legal People'

    def _str_(self):
        return f'{self.fantasy_name}'

# Account model with account details
class Account(Base):
    ACC_TYPES = [
        ("savings", "savings"),
        ("checking", "checking"),
    ]

    number = models.CharField(max_length=10, unique=True, primary_key=True)
    customer = models.ManyToManyField(Customer)
    agency = models.CharField(max_length=4)
    acc_type = models.CharField(max_length=20, choices=ACC_TYPES)
    balance = models.DecimalField(decimal_places=2, max_digits=9)
    limit = models.DecimalField(max_digits=10, decimal_places=2)
    active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Account'
        verbose_name_plural = 'Accounts'

    def __str__(self):
        return f"{self.acc_type} - {self.number}"

# Address model with customer address details
class Address(Base):
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='addresses')
    street = models.CharField(max_length=100)
    neighborhood = models.CharField(max_length=75)
    city = models.CharField(max_length=75)
    state = models.CharField(max_length=2)
    zip_code = models.CharField(max_length=10)

    class Meta:
        verbose_name = 'Address'
        verbose_name_plural = 'Addresses'

    def __str__(self):
        return f"{self.street}, {self.city}, {self.state}"

# Contact model with customer contact details
class Contact(Base):
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='email_customer')
    number = models.CharField(max_length=11)
    email = models.EmailField(max_length=50, blank=True, null=True)
    observation = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        verbose_name = 'Contact'
        verbose_name_plural = 'Contacts'

    def __str__(self):
        if self.email:
            return f"Number: {self.number}, Email: {self.email}"
        return f"Number: {self.number}"

# Card model with card details
class Card(Base):
    number = models.CharField(max_length=16, primary_key=True)
    account = models.ForeignKey(
        Account, on_delete=models.CASCADE, to_field='number')
    cvv = models.CharField(max_length=3)
    expiration_date = models.DateField()
    flag = models.CharField(max_length=25)
    active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Card'
        verbose_name_plural = 'Cards'

    def __str__(self):
        return f"Card ending in {self.number[-4:]}"

# Transaction model with transaction details
class Transaction(Base):
    OPERATION_CHOICES = [
        ('Deposit', 'Deposit'),
        ('Withdrawal', 'Withdrawal'),
    ]

    card = models.ForeignKey(Card, on_delete=models.CASCADE, to_field='number')
    amount = models.DecimalField(max_digits=7, decimal_places=2)
    receiver = models.CharField(max_length=10)
    operation = models.CharField(choices=OPERATION_CHOICES, max_length=6)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Transaction'
        verbose_name_plural = 'Transactions'

    def __str__(self):
        return f"{self.operation}"

# PandoraManager model with bank statement details
class PandoraManager(Base):
    OPTIONS = [
        ('Received', 'Received'),
        ('Sent', 'Sent')
    ]

    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    transaction_action = models.CharField(choices=OPTIONS, max_length=8)
    amount = models.FloatField()
    account_balance = models.DecimalField(decimal_places=2, max_digits=9)

    class Meta:
        verbose_name = 'BankStatement'
        verbose_name_plural = 'BankStatements'

    def _str_(self):
        return f'{self.transaction_action}'

# Investment model with investment details
class Investment(Base):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    INVESTMENT_TYPE_CHOICES = [
        ('Stocks', 'Stocks'),
        ('Bonds', 'Bonds'),
        ('Mutual Funds', 'Mutual Funds'),
        ('Real Estate', 'Real Estate')
    ]

    RISC_RATE = [
        ('Low', 'Low'),
        ('Medium', 'Medium'),
        ('High', 'High')
    ]

    inv_type = models.CharField(max_length=30, choices=INVESTMENT_TYPE_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    management_fee = models.FloatField()
    term = models.DurationField()
    risk_rate = models.CharField(
        choices=RISC_RATE, max_length=6)
    profitability = models.DecimalField(max_digits=5, decimal_places=2)
    completed = models.BooleanField(default=False)

    class Meta:
        verbose_name = 'Investment'
        verbose_name_plural = 'Investments'

    def __str__(self):
        return f"{self.inv_type} Investment - Amount: {self.amount}, Risk Rate: {self.risk_rate}%"

# Loan model with loan details
class Loan(Base):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    requested_amount = models.DecimalField(max_digits=10, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    paidout = models.BooleanField(default=False)
    installment_number = models.IntegerField(default=1,
                                             validators=[
                                                 MaxValueValidator(24)
                                             ])
    paid_installment_number = models.IntegerField(default=1,
                                                  validators=[
                                                      MaxValueValidator(24)
                                                  ])
    request_date = models.DateField()
    approval_date = models.DateField()
    is_approved = models.BooleanField(default=False)
    observation = models.TextField(blank=True)

    class Meta:
        verbose_name = 'Loan'
        verbose_name_plural = 'Loans'

    def __str__(self):
        return f"Loan for Account: {self.account.number} - Amount: {self.requested_amount}"

# InstallmentLoan model with installment details
class InstallmentLoan(Base):
    number = models.IntegerField(primary_key=True)
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    due_date = models.DateField()
    payment_date = models.DateField(null=True)
    paid_amount = models.DecimalField(
        max_digits=10, decimal_places=2)
    is_paid = models.BooleanField(default=False)

    def __str__(self):
        return f"Installment for Loan #{self.loan.id} - Number: {self.number}, Due Date: {self.due_date}, Amount: {self.amount}"
