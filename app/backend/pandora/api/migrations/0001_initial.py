# Generated by Django 4.2.5 on 2023-11-09 19:29

import api.models
from django.conf import settings
import django.contrib.auth.validators
import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('username', models.CharField(error_messages={'unique': 'A user with that username already exists.'}, help_text='Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.', max_length=150, unique=True, validators=[django.contrib.auth.validators.UnicodeUsernameValidator()], verbose_name='username')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('email', models.EmailField(blank=True, max_length=254, verbose_name='email address')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('register_number', models.IntegerField(primary_key=True, serialize=False, unique=True, validators=[django.core.validators.MaxValueValidator(999999999999999999999999)])),
                ('password', models.CharField(max_length=100)),
                ('photo_logo', models.ImageField(blank=True, null=True, upload_to='user_photos/')),
                ('is_staff', models.BooleanField(default=False)),
            ],
            options={
                'verbose_name': 'user',
                'verbose_name_plural': 'users',
                'abstract': False,
            },
            managers=[
                ('objects', api.models.CustomUserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('agency', models.CharField(max_length=4)),
                ('number', models.CharField(max_length=10, unique=True)),
                ('acc_type', models.CharField(choices=[('savings', 'savings'), ('cheking', 'cheking')], max_length=20)),
                ('balance', models.DecimalField(decimal_places=2, max_digits=9)),
                ('limit', models.DecimalField(decimal_places=2, max_digits=10)),
                ('active', models.BooleanField(default=True)),
                ('customer', models.ManyToManyField(to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Account',
                'verbose_name_plural': 'Accounts',
            },
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
                ('operation', models.CharField(choices=[('Deposit', 'Deposit'), ('Withdrawal', 'Withdrawal')], max_length=20)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('account_balance', models.DecimalField(decimal_places=2, max_digits=9)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.account')),
            ],
            options={
                'verbose_name': 'Transaction',
                'verbose_name_plural': 'Transactions',
            },
        ),
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
                ('request_date', models.DateField()),
                ('requested_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('interest_rate', models.DecimalField(decimal_places=2, max_digits=5)),
                ('approved', models.BooleanField(default=False)),
                ('approval_date', models.DateField(null=True)),
                ('installment_number', models.IntegerField()),
                ('observation', models.TextField(blank=True)),
                ('idAccount', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.account')),
            ],
            options={
                'verbose_name': 'Loan',
                'verbose_name_plural': 'Loans',
            },
        ),
        migrations.CreateModel(
            name='Investment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
                ('inv_type', models.CharField(choices=[('Stocks', 'Stocks'), ('Bonds', 'Bonds'), ('Mutual Funds', 'Mutual Funds'), ('Real Estate', 'Real Estate')], max_length=30)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('management_fee', models.FloatField()),
                ('term', models.DurationField()),
                ('risk_rate', models.CharField(choices=[('Low', 'Low'), ('Medium', 'Medium'), ('High', 'High')], max_length=6)),
                ('profitability', models.DecimalField(decimal_places=2, max_digits=5)),
                ('completed', models.BooleanField(default=False)),
                ('idAccount', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.account')),
            ],
            options={
                'verbose_name': 'Investment',
                'verbose_name_plural': 'Investments',
            },
        ),
        migrations.CreateModel(
            name='InstallmentLoan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
                ('number', models.IntegerField()),
                ('due_date', models.DateField()),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('payment_date', models.DateField(null=True)),
                ('paid_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('loan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.loan')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='CustomerNP',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
                ('name', models.CharField(max_length=100)),
                ('social_name', models.CharField(max_length=50)),
                ('cpf', models.CharField(max_length=11, unique=True)),
                ('rg', models.CharField(max_length=9, unique=True)),
                ('birthdate', models.DateField()),
                ('customer', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Natural Person',
                'verbose_name_plural': 'Natural People',
            },
        ),
        migrations.CreateModel(
            name='CustomerLP',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
                ('fantasy_name', models.CharField(max_length=100)),
                ('cnpj', models.CharField(max_length=14, unique=True)),
                ('establishment_date', models.DateField()),
                ('sr', models.CharField(max_length=9)),
                ('mr', models.CharField(max_length=11)),
                ('customer', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Legal Person',
                'verbose_name_plural': 'Legal People',
            },
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
                ('number', models.CharField(max_length=11)),
                ('email', models.EmailField(blank=True, max_length=50, null=True)),
                ('observation', models.CharField(blank=True, max_length=200, null=True)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='email_customer', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Contact',
                'verbose_name_plural': 'Contacts',
            },
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('number', models.CharField(max_length=16)),
                ('cvv', models.CharField(max_length=3)),
                ('expiration_date', models.DateField()),
                ('flag', models.CharField(max_length=25)),
                ('active', models.BooleanField(default=True)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.account', to_field='number')),
            ],
            options={
                'verbose_name': 'Card',
                'verbose_name_plural': 'Cards',
            },
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('modified', models.DateTimeField(auto_now=True)),
                ('active', models.BooleanField(default=True)),
                ('street', models.CharField(max_length=100)),
                ('neighborhood', models.CharField(max_length=75)),
                ('city', models.CharField(max_length=75)),
                ('state', models.CharField(max_length=2)),
                ('zip_code', models.CharField(max_length=10)),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='addresses', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Address',
                'verbose_name_plural': 'Addresses',
            },
        ),
        migrations.AddField(
            model_name='customer',
            name='accounts',
            field=models.ManyToManyField(blank=True, related_name='customers', to='api.account'),
        ),
        migrations.AddField(
            model_name='customer',
            name='groups',
            field=models.ManyToManyField(blank=True, related_name='customer_groups', to='auth.group'),
        ),
        migrations.AddField(
            model_name='customer',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, related_name='customer_user_permissions', to='auth.permission'),
        ),
    ]
