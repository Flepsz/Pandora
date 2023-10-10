import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'pandora.settings')
django.setup()

import random
from datetime import timedelta
from faker import Faker
from django.core.management import call_command
import subprocess
from django.contrib.auth.models import User
from core.models import Costumer, CostumerNP, CostumerLP, Account, Address, Contact, Card, Transaction, Investment, Loan, InstallmentLoan


fake = Faker()

def create_superuser():
    username = 'felipe'
    password = '123'

    if not User.objects.filter(username=username).exists():
        User.objects.create_superuser(username=username, password=password)
        print(f"Superusuário '{username}' criado com sucesso!")


def run_server():
    try:
        subprocess.Popen(['python', 'manage.py', 'runserver'])
        print("Servidor Django está em execução...")
    except Exception as e:
        print(f"Erro ao iniciar o servidor: {e}")


def populate_costumers(num_costumers=10):
    for _ in range(num_costumers):
        costumer = Costumer(
            full_name=fake.name(),
            social_name=fake.name(),
            birthdate=fake.date_of_birth(),
            username=fake.user_name(),
            password=fake.password(),
        )
        costumer.save()


def populate_costumer_np():
    costumers = Costumer.objects.all()
    for costumer in costumers:
        costumer_np = CostumerNP(
            idCostumer=costumer,
            cpf=fake.unique.random_int(min=10000000000, max=99999999999),
            rg=fake.unique.random_int(min=100000000, max=999999999),
        )
        costumer_np.save()


def populate_costumer_lp():
    costumers = Costumer.objects.all()
    for costumer in costumers:
        costumer_lp = CostumerLP(
            idCostumer=costumer,
            cnpj=fake.unique.random_int(
                min=10000000000000, max=99999999999999),
            state_registration=fake.unique.random_int(
                min=100000000, max=999999999),
            municipal_registration=fake.unique.random_int(
                min=10000000000, max=99999999999),
        )
        costumer_lp.save()


def populate_account(num_accounts=20):
    costumers = Costumer.objects.all()
    for _ in range(num_accounts):
        account = Account(
            acc_type=fake.random_element(elements=('SAVINGS', 'CHECKING')),
            limit=random.uniform(1000, 10000),
            active=fake.boolean(chance_of_getting_true=90),
        )
        account.save()
        account.costumer.set(random.sample(
            list(costumers), random.randint(1, 3)))


def populate_address(num_addresses=30):
    for _ in range(num_addresses):
        address = Address(
            street=fake.street_address(),
            neighborhood=fake.city_suffix(),
            city=fake.city(),
            state=fake.state_abbr(),
            zip_code=fake.zipcode(),
        )
        address.save()


def populate_contact():
    costumers = Costumer.objects.all()
    for costumer in costumers:
        contact = Contact(
            idCostumer=costumer,
            number=fake.phone_number(),
            email=fake.email(),
            observation=fake.text(max_nb_chars=200),
        )
        contact.save()


def populate_card(num_cards=50):
    accounts = Account.objects.all()
    for _ in range(num_cards):
        card = Card(
            idAccount=random.choice(accounts),
            active=fake.boolean(chance_of_getting_true=90),
        )
        card.save()


def populate_transaction(num_transactions=100):
    cards = Card.objects.all()
    for _ in range(num_transactions):
        transaction = Transaction(
            idCard=random.choice(cards),
            date_time=fake.date_time_this_decade(),
            operation=fake.random_element(
                elements=('Deposit', 'Withdrawal', 'Payment')),
            amount=random.uniform(10, 1000),
        )
        transaction.save()


def populate_investment(num_investments=10):
    accounts = Account.objects.all()
    for _ in range(num_investments):
        investment = Investment(
            idAccount=random.choice(accounts),
            inv_type=fake.random_element(
                elements=('Stocks', 'Bonds', 'Mutual Funds', 'Real Estate')),
            amount=random.uniform(1000, 10000),
            management_fee=random.uniform(0.5, 3.0),
            term=timedelta(days=random.randint(365, 3650)),
            risk_rate=random.uniform(0.5, 10.0),
            profitability=random.uniform(2.0, 12.0),
        )
        investment.save()


def populate_loan(num_loans=5):
    accounts = Account.objects.all()
    for _ in range(num_loans):
        loan = Loan(
            idAccount=random.choice(accounts),
            request_date=fake.date_this_decade(),
            requested_amount=random.uniform(1000, 10000),
            interest_rate=random.uniform(3.0, 12.0),
            approved=fake.boolean(chance_of_getting_true=80),
            approval_date=fake.date_between(
                start_date='-30d', end_date='today') if fake.boolean(chance_of_getting_true=80) else None,
            installment_number=random.randint(6, 36),
            observation=fake.text(max_nb_chars=200),
        )
        loan.save()


def populate_installment_loan():
    loans = Loan.objects.filter(approved=True)
    for loan in loans:
        for installment_number in range(1, loan.installment_number + 1):
            installment = InstallmentLoan(
                idLoan=loan,
                number=installment_number,
                due_date=fake.date_between_dates(
                    loan.approval_date, loan.approval_date + timedelta(days=365)),
                amount=loan.requested_amount / loan.installment_number,
            )
            installment.save()


def main():
    # create_superuser()
    subprocess.Popen(['python', 'manage.py', 'makemigrations'])
    subprocess.Popen(['python', 'manage.py', 'migrate'])
    populate_costumers()
    populate_costumer_np()
    populate_costumer_lp()
    populate_account()
    populate_address()
    populate_contact()
    populate_card()
    populate_transaction()
    populate_investment()
    populate_loan()
    populate_installment_loan()
    run_server()


if __name__ == '__main__':
    main()
