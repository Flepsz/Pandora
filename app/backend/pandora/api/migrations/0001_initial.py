# Generated by Django 4.2.5 on 2023-11-06 11:03

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
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('agency', models.CharField(blank=True, max_length=4)),
                ('number', models.CharField(blank=True, max_length=10, unique=True)),
                ('acc_type', models.CharField(choices=[('SAVINGS', 'Savings Account'), ('CHECKING', 'Checking Account')], max_length=20)),
                ('limit', models.DecimalField(decimal_places=2, max_digits=10)),
                ('active', models.BooleanField(default=True)),
            ],
        ),
        migrations.CreateModel(
            name='Card',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(blank=True, max_length=16)),
                ('cvv', models.CharField(blank=True, max_length=3)),
                ('expiration_date', models.DateField(blank=True, null=True)),
                ('flag', models.CharField(blank=True, max_length=25)),
                ('active', models.BooleanField(default=True)),
                ('idAccount', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.account')),
            ],
        ),
        migrations.CreateModel(
            name='Costumer',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=100)),
                ('social_name', models.CharField(max_length=100)),
                ('birthdate', models.DateField()),
                ('photo_logo', models.ImageField(blank=True, null=True, upload_to='user_photos/')),
                ('username', models.CharField(max_length=20, unique=True)),
                ('password', models.CharField(max_length=128)),
                ('accounts', models.ManyToManyField(blank=True, related_name='customers', to='api.account')),
            ],
        ),
        migrations.CreateModel(
            name='CostumerLP',
            fields=[
                ('costumer_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.costumer')),
                ('cnpj', models.CharField(max_length=14, unique=True)),
                ('state_registration', models.CharField(max_length=9)),
                ('municipal_registration', models.CharField(max_length=11)),
            ],
            bases=('api.costumer',),
        ),
        migrations.CreateModel(
            name='CostumerNP',
            fields=[
                ('costumer_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='api.costumer')),
                ('cpf', models.CharField(max_length=11, unique=True)),
                ('rg', models.CharField(max_length=9, unique=True)),
            ],
            bases=('api.costumer',),
        ),
        migrations.CreateModel(
            name='Transaction',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_time', models.DateTimeField()),
                ('operation', models.CharField(choices=[('Deposit', 'Deposit'), ('Withdrawal', 'Withdrawal'), ('Payment', 'Payment'), ('Transfer', 'Transfer')], max_length=20)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('idCard', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.card')),
            ],
        ),
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('request_date', models.DateField()),
                ('requested_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('interest_rate', models.DecimalField(decimal_places=2, max_digits=5)),
                ('approved', models.BooleanField(default=False)),
                ('approval_date', models.DateField(null=True)),
                ('installment_number', models.IntegerField()),
                ('observation', models.TextField(blank=True)),
                ('idAccount', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.account')),
            ],
        ),
        migrations.CreateModel(
            name='Investment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('inv_type', models.CharField(choices=[('Stocks', 'Stocks'), ('Bonds', 'Bonds'), ('Mutual Funds', 'Mutual Funds'), ('Real Estate', 'Real Estate')], max_length=30)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('management_fee', models.FloatField()),
                ('term', models.DurationField()),
                ('risk_rate', models.DecimalField(decimal_places=2, max_digits=5)),
                ('profitability', models.DecimalField(decimal_places=2, max_digits=5)),
                ('completed', models.BooleanField(default=False)),
                ('idAccount', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.account')),
            ],
        ),
        migrations.CreateModel(
            name='InstallmentLoan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('due_date', models.DateField()),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('payment_date', models.DateField(blank=True, null=True)),
                ('paid_amount', models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True)),
                ('idLoan', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.loan')),
            ],
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.CharField(max_length=11)),
                ('email', models.EmailField(blank=True, max_length=50, null=True)),
                ('observation', models.CharField(blank=True, max_length=200, null=True)),
                ('idCostumer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.costumer')),
            ],
        ),
        migrations.CreateModel(
            name='Address',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('street', models.CharField(max_length=100)),
                ('neighborhood', models.CharField(max_length=75)),
                ('city', models.CharField(max_length=75)),
                ('state', models.CharField(max_length=2)),
                ('zip_code', models.CharField(max_length=10)),
                ('costumer', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='addresses', to='api.costumer')),
            ],
        ),
        migrations.AddField(
            model_name='account',
            name='costumer',
            field=models.ManyToManyField(to='api.costumer'),
        ),
    ]
