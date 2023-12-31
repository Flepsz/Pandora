# Import necessary modules
from datetime import datetime, timedelta
from decimal import Decimal
import random

# Import functions from local modules
from .utilsM import determine_flag, generate_credit_card_number
from .filters import filter_by_account, filter_by_user
from random import randint
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

# Import models and serializers from local modules
from .permissions import IsSuperUser, UserGet, UserGetPost, UserPost, UserPostPatch, UserGetPostPatch
from .models import Account, Card, Transaction, Investment, Loan, Address, Contact, CustomerNP, CustomerLP, PandoraManager, InstallmentLoan, AccountInvestment, Pix
from .serializers import (
    NaturalGetPersonSerializer,
    NaturalPostPersonSerializer,
    LegalGetPersonSerializer,
    LegalPostPersonSerializer,
    AccountGetSerializer,
    AccountPostSerializer,
    CardGetSerializer,
    CardPostSerializer,
    TransactionGetSerializer,
    TransactionPostSerializer,
    PixGetSerializer,
    PixPostSerializer,
    InvestmentGetSerializer,
    AccountInvestmentGetSerializer,
    AccountInvestmentPostSerializer,
    LoanGetSerializer,
    LoanPostSerializer,
    InstallmentLoanGetSerializer,
    InstallmentLoanPostSerializer,
    AddressGetSerializer,
    AddressPostSerializer,
    ContactsGetSerializer,
    ContactsPostSerializer,
    PandoraManagerSerializer
)


# Define a view set for handling natural persons
class NaturalPersonViewSet(viewsets.ModelViewSet):
    permission_classes = [UserGetPostPatch]

    # Define queryset for NaturalPersonViewSet
    def get_queryset(self):
        return filter_by_user(CustomerNP, self.request.user)

    # Define serializer class based on the HTTP method
    def get_serializer_class(self):
        if self.request.method in 'POST PATCH':
            return NaturalPostPersonSerializer
        elif self.request.method in 'GET':
            return NaturalGetPersonSerializer

    # Custom create method for creating a natural person
    def create(self, request):
        # Extract data from the request
        name = request.data.get('name')
        social_name = request.data.get('social_name')
        cpf = request.data.get('cpf')
        rg = request.data.get('rg')
        birthdate = request.data.get('birthdate')
        password = request.data.get('password')

        # Create a user and associate with CustomerNP
        customer = get_user_model().objects.create_user(
            register_number=int(cpf),
            password=password,
            photo_logo='photo_path'
        )

        # Create a Natural Person
        CustomerNP.objects.create(
            customer=customer,
            name=name,
            social_name=social_name,
            cpf=str(cpf),
            rg=rg,
            birthdate=birthdate
        )

        return Response({'status': 'Natural Person Created With Successfully'}, status=status.HTTP_201_CREATED)


# Define a view set for handling legal persons
class LegalPersonViewSet(viewsets.ModelViewSet):
    permission_classes = [UserGetPostPatch]

    # Define queryset for LegalPersonViewSet
    def get_queryset(self):
        return filter_by_user(CustomerLP, self.request.user)

    # Define serializer class based on the HTTP method
    def get_serializer_class(self):
        if self.request.method in 'POST PATCH':
            return LegalPostPersonSerializer
        elif self.request.method in 'GET':
            return LegalGetPersonSerializer

    # Custom create method for creating a legal person
    def create(self, request):
        # Extract data from the request
        fantasy_name = request.data.get('fantasy_name')
        cnpj = request.data.get('cnpj')
        establishment_date = request.data.get('establishment_date')
        sr = request.data.get('sr')
        mr = request.data.get('mr')
        password = request.data.get('password')

        # Create a user and associate with CustomerLP
        customer = get_user_model().objects.create_user(
            register_number=int(cnpj),
            password=password,
            photo_logo='photo_path'
        )

        # Create a Legal Person
        CustomerLP.objects.create(
            customer=customer,
            cnpj=str(cnpj),
            fantasy_name=fantasy_name,
            establishment_date=establishment_date,
            sr=sr,
            mr=mr
        )

        return Response({'status': 'Legal Person Created With Successfully'}, status=status.HTTP_201_CREATED)


# Define a view set for handling accounts
class AccountViewSet(viewsets.ModelViewSet):
    permission_classes = [UserGetPostPatch]
    queryset = Account.objects.all()

    # Define queryset for AccountViewSet
    def get_queryset(self):
        return filter_by_user(Account, self.request.user)

    # Define serializer class based on the HTTP method
    def get_serializer_class(self):
        if self.request.method in 'POST PATCH':
            return AccountPostSerializer
        elif self.request.method in 'GET':
            return AccountGetSerializer

    # Custom create method for creating an account
    def create(self, request):
        # Extract data from the request
        customer = self.request.user.pk
        agency = ''.join(str(random.randint(0, 9)) for _ in range(4))
        acc_number = ''.join(str(random.randint(0, 9)) for _ in range(10))
        acc_type = request.data.get('acc_type')
        limit = random.choice([500, 1000])
        balance = random.choice([500, 1000])

        # Generate credit card details
        card_number = generate_credit_card_number()
        cvv = str(randint(100, 999))
        expiration_date = datetime.now() + timedelta(days=365)
        flag = determine_flag(int(card_number[0]))

        # Create an account and associate with the customer
        account = Account.objects.create(
            number=acc_number,
            agency=agency,
            acc_type=acc_type,
            limit=limit,
            balance=balance,
            active=True
        )
        account.customer.add(customer)

        # Create a card associated with the account
        Card.objects.create(
            account=account,
            number=card_number,
            cvv=cvv,
            flag=flag,
            expiration_date=expiration_date,
            active=True
        )

        return Response({'status': 'Account Created With Successfully'}, status=status.HTTP_201_CREATED)


# Define a view set for handling cards
class CardViewSet(viewsets.ModelViewSet):
    permission_classes = [UserGetPostPatch]

    # Define queryset for CardViewSet
    def get_queryset(self):
        return filter_by_account(Card, self.request.query_params.get('account'), self.request.user)

    # Define serializer class based on the HTTP method
    def get_serializer_class(self):
        if self.request.method in 'POST PATCH':
            return CardPostSerializer
        elif self.request.method in 'GET':
            return CardGetSerializer

    # Custom create method for creating a card
    def create(self, request):
        idAccount = request.data.get("account")
        account = get_object_or_404(Account, pk=idAccount)

        # Generate credit card details
        card_number = generate_credit_card_number()
        cvv = str(randint(100, 999))
        expiration_date = datetime.now() + timedelta(days=365)
        flag = determine_flag(int(card_number[0]))

        # Check if the account meets the requirements to receive a card
        if account.limit >= 500:
            Card.objects.create(
                account=account,
                number=card_number,
                cvv=cvv,
                flag=flag,
                expiration_date=expiration_date,
                active=True
            )

            return Response({'status': 'Card Created With Successfully'}, status=status.HTTP_201_CREATED)

        return Response({'status': 'Account does not meet the requirements to receive the card'}, status=status.HTTP_403_FORBIDDEN)

class PixViewSet(viewsets.ModelViewSet):
    permission_classes = [UserGetPost]

    def get_queryset(self):
        return filter_by_account(self)

    # Define serializer class based on the HTTP method
    def get_serializer_class(self):
        if self.request.method in 'POST PATCH':
            return PixPostSerializer
        elif self.request.method in 'GET':
            return PixGetSerializer

    # Custom create method for creating a transaction
    def create(self, request):
        account_id = request.data.get('account')
        account = get_object_or_404(Account, pk=account_id)
        amount = Decimal(request.data.get('amount'))

        receiver_id = request.data.get('receiver')
        receiver = get_object_or_404(Account, pk=receiver_id)

        # Check if there is enough balance in the account to make the transaction
        if account.balance >= amount:
            if account.limit >= amount:

                # Create Pix
                Pix.objects.create(
                    account=account,
                    amount=amount,
                    receiver=receiver_id
                )

                # Update PandoraManager for sender and receiver
                create_pandoramanager(account, 'Sent', 'Pix', amount)
                create_pandoramanager(
                    receiver, 'Received', 'Pix', amount)

                return Response({'status': 'Pix Created With Successfully'}, status=status.HTTP_201_CREATED)
            return Response({'status': 'Not enough limit for this Pix'})
        return Response({'status': 'Not enough balance to make the Pix'}, status=status.HTTP_403_FORBIDDEN)
    

class TransactionViewSet(viewsets.ModelViewSet):
    permission_classes = [UserGetPost]

    def get_queryset(self):
        return filter_by_account(self)

    # Define serializer class based on the HTTP method
    def get_serializer_class(self):
        if self.request.method in 'POST PATCH':
            return TransactionPostSerializer
        elif self.request.method in 'GET':
            return TransactionGetSerializer

    # Custom create method for creating a transaction
    def create(self, request):
        id_card = request.data.get('card')
        card = get_object_or_404(Card, pk=id_card)
        print(card)
        amount = Decimal(request.data.get('amount'))
        operation = request.data.get('operation')
        account = card.account

        id_receiver = request.data.get('receiver')
        receiver = get_object_or_404(Account, pk=id_receiver)

        # Check if there is enough balance in the account to make the transaction
        if account.balance >= amount:
            if account.limit >= amount:

                # Create a transaction
                Transaction.objects.create(
                    card=card,
                    amount=amount,
                    operation=operation,
                    receiver=id_receiver
                )

                # Update PandoraManager for sender and receiver
                create_pandoramanager(account, 'Sent', 'Transaction', amount)
                create_pandoramanager(
                    receiver, 'Received', 'Transaction', amount)

                return Response({'status': 'Transaction Created With Successfully'}, status=status.HTTP_201_CREATED)
            return Response({'status': 'Not enough limit for this transaction'})
        return Response({'status': 'Not enough balance to make the transaction'}, status=status.HTTP_403_FORBIDDEN)


# Define a view set for handling investments
class InvestmentViewSet(viewsets.ModelViewSet):
    queryset = Investment.objects.all()
    serializer_class = InvestmentGetSerializer
    permission_classes = [UserGet]


class AccountInvestmentViewSet(viewsets.ModelViewSet):
    permission_classes = [UserGetPost]

    def get_queryset(self):
        return filter_by_account(AccountInvestment, self.request.query_params.get('account'), self.request.user)

    def get_serializer_class(self):
        if self.request.method in 'POST PATCH':
            return AccountInvestmentPostSerializer
        elif self.request.method in 'GET':
            return AccountInvestmentGetSerializer

    def create(self, request):
        id_investment = request.data.get('investment')
        investment = get_object_or_404(Investment, pk=id_investment)

        account_id = request.data.get('account')
        account = get_object_or_404(Account, pk=account_id)

        if account.balance >= investment.amount:
            inv_type = investment.inv_type
            amount = investment.amount
            income = 0.00
            management_fee = investment.management_fee
            term = investment.term
            risk_rate = investment.risk_rate
            profitability = investment.profitability

            create_pandoramanager(account, 'Sent',
                                  'Investment', amount)

            AccountInvestment.objects.create(
                account=account,
                inv_type=inv_type,
                amount=amount,
                income=income,
                management_fee=management_fee,
                term=term,
                risk_rate=risk_rate,
                profitability=profitability
            )

            return Response({'status': 'Account Investment Succesfully Created'}, status=status.HTTP_201_CREATED)
        return Response({'status': 'Not enough balance to make the investment'}, status=status.HTTP_403_FORBIDDEN)


# Define a view set for handling loans
class LoanViewSet(viewsets.ModelViewSet):
    permission_classes = [UserGetPost]
    queryset = Loan.objects.all()

    def get_serializer_class(self):
        if self.request.method in 'POST PATCH':
            return LoanPostSerializer
        elif self.request.method in 'GET':
            return LoanGetSerializer

    # Define queryset for LoanViewSet
    def get_queryset(self):
        user = self.request.user
        account = self.request.query_params.get('account')
        return filter_by_account(Loan, account, user)

    # Custom create method for creating a loan
    def create(self, request):
        id_account = request.data.get('account')
        account = get_object_or_404(Account, pk=id_account)
        requested_amount = Decimal(request.data.get('requested_amount'))
        interest_rate = 10.0
        paidout = False
        installment_number = int(request.data.get('installment_number'))
        approval_date = datetime.now().strftime('%Y-%m-%d')
        observation = request.data.get('observation')

        def create_loan(is_approved):
            loan = Loan.objects.create(
                account=account,
                requested_amount=requested_amount,
                interest_rate=interest_rate,
                paidout=paidout,
                installment_number=installment_number,
                approval_date=approval_date,
                is_approved=is_approved,
                observation=observation
            )

            return loan


        payment_amount = round((requested_amount / installment_number), 2)
        consignable_margin = account.balance * Decimal(0.35)

        # Check if the account is eligible to receive the loan
        if consignable_margin > payment_amount:
            loan = create_loan(True)

            # Create loan installments
            for i in range(installment_number):
                expiration_date = datetime.now() + timedelta(30 * i)

                number = ''.join(random.choice('0123456789')
                                 for _ in range(0, 8))

                InstallmentLoan.objects.create(
                    loan=loan,
                    number=number,
                    amount=payment_amount,
                    due_date=expiration_date,
                    is_paid=False
                )

            # Update PandoraManager for the received loan amount
            create_pandoramanager(account, 'Received',
                                  'Loan', requested_amount)

            return Response({'status': 'Loan Created With Successfully'}, status=status.HTTP_201_CREATED)

        # Create a rejected loan
        create_loan(False)
        return Response({'status': 'Not eligible to receive the loan'}, status=status.HTTP_403_FORBIDDEN)


# Define a view set for handling loan installments
class InstallmentLoanViewSet(viewsets.ModelViewSet):
    permission_classes = [UserGetPostPatch]

    def get_serializer_class(self):
        if self.request.method in 'POST PATCH':
            return InstallmentLoanPostSerializer
        elif self.request.method in 'GET':
            return InstallmentLoanGetSerializer

    # Define queryset for InstallmentLoanViewSet
    def get_queryset(self):
        user = self.request.user
        account = self.request.query_params.get('account')
        return filter_by_account(InstallmentLoan, account, user)

    def partial_update(self, request, *args, **kwargs):
        installment = self.get_object()
        loan = installment.loan
        account = loan.account
        if account.balance >= installment.amount:
            account.balance -= installment.amount
            account.save()
            installment.is_paid = True
            installment.save()
            create_pandoramanager(account, 'Sent', 'Installment', installment)
            return Response({'Successfully paid': 'success'}, status=status.HTTP_202_ACCEPTED)
        return Response({'status': 'Not enough balance to pay the installment'}, status=status.HTTP_403_FORBIDDEN)


# Define a view set for handling addresses
class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    permission_classes = [UserGetPostPatch]

    # Define serializer class based on the HTTP method
    def get_serializer_class(self):
        if self.request.method in 'POST PATCH':
            return AddressPostSerializer
        elif self.request.method in 'GET':
            return AddressGetSerializer


# Define a view set for handling contacts
class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    permission_classes = [UserGetPostPatch]

    # Define serializer class based on the HTTP method
    def get_serializer_class(self):
        if self.request.method in 'POST PATCH':
            return ContactsPostSerializer
        elif self.request.method in 'GET':
            return ContactsGetSerializer


class PandoraManagerViewSet(viewsets.ModelViewSet):
    serializer_class = PandoraManagerSerializer
    permission_classes = [
        UserGet
    ]

    def get_queryset(self):
        user = self.request.user
        account = self.request.query_params.get('account')
        return filter_by_account(PandoraManager, account, user)


# Function to update the account balance and create a PandoraManager record
def create_pandoramanager(account, action, source, amount):
    if action == 'Received':
        account.balance += amount
    elif action == 'Sent':
        account.balance -= amount

    account.save()

    PandoraManager.objects.create(
        account=account,
        transaction_action=action,
        source=source,
        amount=amount,
        account_balance=account.balance
    )
