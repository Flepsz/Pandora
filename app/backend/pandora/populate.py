from datetime import date, timedelta
import datetime
import json
from datetime import date, timedelta
import datetime
import json
from faker import Faker
import requests
import os
import subprocess

BASE_URL = 'http://localhost:8000/api/v1/'

populate_customers_url = os.path.join(BASE_URL, 'customers/')

fake = Faker()


def data_base_creation():
    try:
        subprocess.run(['py', 'manage.py', 'makemigrations'], check=True)
        subprocess.run(['py', 'manage.py', 'migrate'], check=True)
        print('Success')
    except subprocess.CalledProcessError as e:
        print(e)
    except Exception as e:
        print(e)


def run_server():
    try:
        subprocess.run(['py', 'manage.py', 'runserver'], check=True)
    except subprocess.CalledProcessError as e:
        print(e)
    except Exception as e:
        print(e)


def superuser_creation():
    try:
        subprocess.run(['py', 'manage.py', 'create_superuser'], check=True)
    except subprocess.CalledProcessError as e:
        print(e)
    except Exception as e:
        print(e)
        

class DateEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (date, datetime, timedelta)):
            return obj.isoformat()
        return super(DateEncoder, self).default(obj)
    

def date_to_iso_string(date_obj):
    if isinstance(date_obj, (date, datetime, timedelta)):
        return date_obj.isoformat()
    return date_obj

def populate_customers(num_customers=10):
    for _ in range(num_customers):
        birthdate = fake.date_of_birth()
        birthdate_iso = date_to_iso_string(birthdate)

        response = requests.post(populate_customers_url,
            json={
                "full_name": fake.name(),
                "social_name": fake.name(),
                "birthdate": birthdate_iso,
                "username": fake.user_name(),
                "password": fake.password(),
            })

        return response.json


# def populate_customer_np(num_customers=10):
#     for _ in range(num_customers):
#         response = requests.post(
#             json={
#                 "full_name": fake.name(),
#                 "social_name": fake.name(),
#                 "birthdate": fake.date_of_birth(),
#                 "username": fake.user_name(),
#                 "password": fake.password(),
#                 "cpf": fake.unique.random_int(min=10000000000, max=99999999999),
#                 "rg": fake.unique.random_int(min=100000000, max=999999999),
#             })
#         return response.json()


# def populate_customer_lp(num_customers=10):
#     for _ in range(num_customers):
#         response = requests.post(
#             json={
#                 "full_name": fake.name(),
#                 "social_name": fake.name(),
#                 "birthdate": fake.date_of_birth(),
#                 "username": fake.user_name(),
#                 "password": fake.password(),
#                 "cnpj": fake.unique.random_int(
#                     min=10000000000000, max=99999999999999),
#                 "state_registration": fake.unique.random_int(
#                     min=100000000, max=999999999),
#                 "municipal_registration": fake.unique.random_int(
#                     min=10000000000, max=99999999999),
#             })
#         return response.json()


# def populate_account(num_accounts=20):
#     customers = Customer.objects.all()
#     for _ in range(num_accounts):
#         account = Account(
#             acc_type=fake.random_element(elements=('SAVINGS', 'CHECKING')),
#             limit=random.uniform(1000, 10000),
#             active=fake.boolean(chance_of_getting_true=90),
#         )
#         account.save()
#         account.customer.set(random.sample(
#             list(customers), random.randint(1, 3)))


# def populate_address(num_addresses=30):
#     for _ in range(num_addresses):
#         address = Address(
#             street=fake.street_address(),
#             neighborhood=fake.city_suffix(),
#             city=fake.city(),
#             state=fake.state_abbr(),
#             zip_code=fake.zipcode(),
#         )
#         address.save()


# def populate_contact():
#     customers = Customer.objects.all()
#     for customer in customers:
#         contact = Contact(
#             idCustomer=customer,
#             number=fake.phone_number(),
#             email=fake.email(),
#             observation=fake.text(max_nb_chars=200),
#         )
#         contact.save()


# def populate_card(num_cards=50):
#     accounts = Account.objects.all()
#     for _ in range(num_cards):
#         card = Card(
#             idAccount=random.choice(accounts),
#             active=fake.boolean(chance_of_getting_true=90),
#         )
#         card.save()


# def populate_transaction(num_transactions=100):
#     cards = Card.objects.all()
#     for _ in range(num_transactions):
#         transaction = Transaction(
#             idCard=random.choice(cards),
#             date_time=fake.date_time_this_decade(),
#             operation=fake.random_element(
#                 elements=('Deposit', 'Withdrawal', 'Payment')),
#             amount=random.uniform(10, 1000),
#         )
#         transaction.save()


# def populate_investment(num_investments=10):
#     accounts = Account.objects.all()
#     for _ in range(num_investments):
#         investment = Investment(
#             idAccount=random.choice(accounts),
#             inv_type=fake.random_element(
#                 elements=('Stocks', 'Bonds', 'Mutual Funds', 'Real Estate')),
#             amount=random.uniform(1000, 10000),
#             management_fee=random.uniform(0.5, 3.0),
#             term=timedelta(days=random.randint(365, 3650)),
#             risk_rate=random.uniform(0.5, 10.0),
#             profitability=random.uniform(2.0, 12.0),
#         )
#         investment.save()


# def populate_loan(num_loans=5):
#     accounts = Account.objects.all()
#     for _ in range(num_loans):
#         loan = Loan(
#             idAccount=random.choice(accounts),
#             request_date=fake.date_this_decade(),
#             requested_amount=random.uniform(1000, 10000),
#             interest_rate=random.uniform(3.0, 12.0),
#             approved=fake.boolean(chance_of_getting_true=80),
#             approval_date=fake.date_between(
#                 start_date='-30d', end_date='today') if fake.boolean(chance_of_getting_true=80) else None,
#             installment_number=random.randint(6, 36),
#             observation=fake.text(max_nb_chars=200),
#         )
#         loan.save()


# def populate_installment_loan():
#     loans = Loan.objects.filter(approved=True)
#     for loan in loans:
#         for installment_number in range(1, loan.installment_number + 1):
#             installment = InstallmentLoan(
#                 idLoan=loan,
#                 number=installment_number,
#                 due_date=fake.date_between_dates(
#                     loan.approval_date, loan.approval_date + timedelta(days=365)),
#                 amount=loan.requested_amount / loan.installment_number,
#             )
#             installment.save()


def main():
    data_base_creation(),
    # superuser_creation()
    # populate_customers()
    # populate_customer_np()
    # populate_customer_lp()
    run_server()


if __name__ == '__main__':
    main()
