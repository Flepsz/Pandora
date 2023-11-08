from django.db import models
from random import randint
import random
from datetime import datetime, timedelta
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth import get_user_model
from django.core.validators import MaxValueValidator


class CustomUserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, register_number, password, **extra_fields):
        if not register_number:
            raise ValueError('Register Number is required')
        user = self.model(register_number=register_number,
                          username=register_number, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, register_number, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(register_number, password, **extra_fields)

    def create_superuser(self, register_number, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_staff', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser needs the is_superuser=True')

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser needs the is_staff=True')

        return self._create_user(register_number, password, **extra_fields)


class Base(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)
    active = models.BooleanField(default=True)

    class Meta:
        abstract = True


class Customer(AbstractUser):
    register_number = models.IntegerField(
        validators=[MaxValueValidator(999999999999999999999999)],
        unique=True,
        primary_key=True
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


class CustomerLP(Base):
    customer = models.OneToOneField(get_user_model(), on_delete=models.CASCADE)
    fantasy_name = models.CharField(max_length=100)
    cnpj = models.CharField(max_length=14, unique=True)
    establishment_date = models.DateField()
    sr = models.CharField(max_length=9) # State Registration
    mr = models.CharField(max_length=11) # Municipal Registration

    class Meta:
        verbose_name = 'Legal Person'
        verbose_name_plural = 'Legal People'

    def _str_(self):
        return f'{self.fantasy_name}'


class Account(Base):
    ACC_TYPES = [
        ("savings", "savings"),
        ("cheking", "cheking"),
    ]

    customer = models.ManyToManyField(Customer)
    agency = models.CharField(max_length=4, blank=True)
    number = models.CharField(max_length=10, unique=True, blank=True)
    acc_type = models.CharField(max_length=20, choices=ACC_TYPES)
    balance = models.DecimalField(decimal_places=2, max_digits=9)
    limit = models.DecimalField(max_digits=10, decimal_places=2)
    active = models.BooleanField(default=True)


    class Meta:
        verbose_name = 'Account'
        verbose_name_plural = 'Accounts'

    def __str__(self):
        return f"{self.acc_type} - {self.number}"


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


class Contact(Base):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='email_customer')
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


class Card(Base):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    number = models.CharField(max_length=16, blank=True)
    cvv = models.CharField(max_length=3, blank=True)
    expiration_date = models.DateField(blank=True, null=True)
    flag = models.CharField(max_length=25, blank=True)
    active = models.BooleanField(default=True)

    class Meta:
        verbose_name = 'Card'
        verbose_name_plural = 'Cards'

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


class Transaction(Base):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)

    OPERATION_CHOICES = [
        ('Deposit', 'Deposit'),
        ('Withdrawal', 'Withdrawal'),
    ]

    operation = models.CharField(max_length=20, choices=OPERATION_CHOICES)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    account_balance = models.DecimalField(decimal_places=2, max_digits=9)

    class Meta:
        verbose_name = 'Transaction'
        verbose_name_plural = 'Transactions'

    def __str__(self):
        return f"{self.operation}"


class Investment(Base):
    idAccount = models.ForeignKey(Account, on_delete=models.CASCADE)

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


class Loan(Base):
    idAccount = models.ForeignKey(Account, on_delete=models.CASCADE)
    request_date = models.DateField()
    requested_amount = models.DecimalField(max_digits=10, decimal_places=2)
    interest_rate = models.DecimalField(max_digits=5, decimal_places=2)
    approved = models.BooleanField(default=False)
    approval_date = models.DateField(null=True)
    installment_number = models.IntegerField()
    observation = models.TextField(blank=True)

    class Meta:
        verbose_name = 'Loan'
        verbose_name_plural = 'Loans'

    def __str__(self):
        return f"Loan for Account: {self.idAccount.number} - Amount: {self.requested_amount}"


class InstallmentLoan(Base):
    loan = models.ForeignKey(Loan, on_delete=models.CASCADE)
    number = models.IntegerField()
    due_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField(null=True, blank=True)
    paid_amount = models.DecimalField(
        max_digits=10, decimal_places=2, null=True, blank=True)

    def __str__(self):
        return f"Installment for Loan #{self.idLoan.id} - Number: {self.number}, Due Date: {self.due_date}, Amount: {self.amount}"

