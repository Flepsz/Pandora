# Generated by Django 4.2.5 on 2023-09-04 14:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('code', models.AutoField(primary_key=True, serialize=False)),
                ('agency', models.CharField(max_length=10)),
                ('number', models.CharField(max_length=25, unique=True)),
                ('account_type', models.CharField(max_length=20)),
                ('limit', models.DecimalField(decimal_places=2, max_digits=10)),
                ('active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('code', models.AutoField(primary_key=True, serialize=False)),
                ('street', models.CharField(max_length=100)),
                ('neighborhood', models.CharField(max_length=75)),
                ('city', models.CharField(max_length=75)),
                ('state', models.CharField(max_length=2)),
                ('postal_code', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('code', models.AutoField(primary_key=True, serialize=False)),
                ('number', models.CharField(max_length=30, unique=True)),
                ('cvv', models.CharField(max_length=5)),
                ('expiration_date', models.DateField()),
                ('brand', models.CharField(max_length=20)),
                ('status', models.CharField(max_length=20)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='core.account')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('code', models.AutoField(primary_key=True, serialize=False)),
                ('full_name', models.CharField(max_length=100)),
                ('social_name_or_fantasy', models.CharField(max_length=100)),
                ('photo_logo', models.ImageField(blank=True, null=True, upload_to='user_photos/')),
                ('birthdate_or_opening_date', models.DateField()),
                ('username', models.CharField(max_length=10, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('address', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.address')),
            ],
        ),
        migrations.CreateModel(
            name='UserLP',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='core.user')),
                ('cnpj', models.CharField(max_length=25)),
                ('state_registration', models.CharField(max_length=30)),
                ('municipal_registration', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='UserNP',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='core.user')),
                ('cpf', models.CharField(max_length=15)),
                ('rg', models.CharField(max_length=15)),
            ],
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('code', models.AutoField(primary_key=True, serialize=False)),
                ('date_time', models.DateTimeField()),
                ('operation', models.CharField(max_length=20)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('card', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.card')),
            ],
        ),
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('code', models.AutoField(primary_key=True, serialize=False)),
                ('request_date', models.DateField()),
                ('requested_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('interest_rate', models.FloatField()),
                ('approved', models.BooleanField(default=False)),
                ('installment_number', models.IntegerField()),
                ('approval_date', models.DateField(blank=True, null=True)),
                ('remark', models.TextField(blank=True)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.account')),
            ],
        ),
        migrations.CreateModel(
            name='Investment',
            fields=[
                ('code', models.AutoField(primary_key=True, serialize=False)),
                ('investment_type', models.CharField(max_length=30)),
                ('investment_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('management_fee', models.FloatField()),
                ('term', models.CharField(max_length=20)),
                ('risk_level', models.CharField(max_length=5)),
                ('profitability', models.DecimalField(decimal_places=2, max_digits=10)),
                ('completed', models.BooleanField(default=False)),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='core.account')),
            ],
        ),
        migrations.CreateModel(
            name='InstallmentLoan',
            fields=[
                ('code', models.AutoField(primary_key=True, serialize=False)),
                ('installment_number', models.IntegerField()),
                ('due_date', models.DateField()),
                ('installment_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('payment_date', models.DateField(blank=True, null=True)),
                ('paid_amount', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('loan', models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, to='core.loan')),
            ],
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('code', models.AutoField(primary_key=True, serialize=False)),
                ('number', models.CharField(max_length=15)),
                ('extension', models.CharField(blank=True, max_length=25, null=True)),
                ('email', models.EmailField(blank=True, max_length=50, null=True)),
                ('observation', models.CharField(blank=True, max_length=200, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.user')),
            ],
        ),
        migrations.CreateModel(
            name='UserAccount',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.account')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.user')),
            ],
            options={
                'unique_together': {('user', 'account')},
            },
        ),
    ]