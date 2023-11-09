from datetime import datetime, timedelta
import random

from .utilsM import determine_flag, generate_credit_card_number
from .filters import filter_by_account, filter_by_user
from random import randint
from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model
from rest_framework import viewsets
from rest_framework import status
from rest_framework.response import Response

from .models import Customer, Account, Card, Transaction, Investment, Loan, Address, Contact, CustomerNP, CustomerLP
from .serializers import (
    NaturalPersonSerializer,
    LegalPersonSerializer,
    AccountGetSerializer, 
    AccountPostSerializer, 
    CardGetSerializer, 
    CardPostSerializer, 
    TransactionSerializer, 
    InvestmentSerializer, 
    LoanSerializer, 
    AddressSerializer, 
    ContactSerializer,
)

class NaturalPersonViewSet(viewsets.ModelViewSet):
    permission_classes = []

    def get_queryset(self):
        return filter_by_user(CustomerNP, self.request.user)
    
    def get_serializer_class(self):
        return NaturalPersonSerializer

    def create(self, request):
        name = request.data.get('name')
        social_name = request.data.get('social_name')
        cpf = request.data.get('cpf')
        rg = request.data.get('rg')
        birthdate = request.data.get('birthdate')
        password = request.data.get('password')
        
        customer = get_user_model().objects.create_user(
            register_number=int(cpf),
            password=password,
            photo_logo='photo_path'
        )

        CustomerNP.objects.create(
            customer=customer,
            name=name,
            social_name=social_name,
            cpf=str(cpf),
            rg=rg,
            birthdate=birthdate
        )

        return Response({'status': 'Natural Person Created'}, status=status.HTTP_201_CREATED)
    
    

class LegalPersonViewSet(viewsets.ModelViewSet):
    permission_classes = []

    def get_queryset(self):
        return filter_by_user(CustomerLP, self.request.user)

    def get_serializer_class(self):
        return LegalPersonSerializer

    def create(self, request):
        fantasy_name = request.data.get('fantasy_name')
        cnpj = request.data.get('cnpj')
        establishment_date = request.data.get('establishment_date')
        sr = request.data.get('sr')
        mr = request.data.get('mr')
        password = request.data.get('password')

        customer = get_user_model().objects.create_user(
            register_number=int(cnpj),
            password=password,
            photo_logo='photo_path'
        )

        CustomerLP.objects.create(
            customer=customer,
            cnpj=str(cnpj),
            fantasy_name=fantasy_name,
            establishment_date=establishment_date,
            sr=sr,
            mr=mr
        )

        return Response({'status': 'Legal Person Created'}, status=status.HTTP_201_CREATED)

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()

    def get_queryset(self):
        return filter_by_user(Account, self.request.user)
    
    def get_serializer_class(self):
        if self.request.method in 'POST PATCH':
            return AccountPostSerializer
        elif self.request.method in 'GET':
            return AccountGetSerializer

    def create(self, request):
        customer = self.request.user.pk
        agency = ''.join(str(random.randint(0, 9)) for _ in range(4))
        acc_number = ''.join(str(random.randint(0, 9)) for _ in range(10))
        acc_type = request.data.get('acc_type')
        limit = random.choice([500, 1000])
        balance = random.choice([500, 1000])

        card_number = generate_credit_card_number()
        cvv = str(randint(100, 999))
        expiration_date = datetime.now() + timedelta(days=365)
        flag = determine_flag(int(card_number[0]))
            
        account = Account.objects.create(
            number=acc_number,
            agency=agency,
            acc_type=acc_type,
            limit=limit,
            balance=balance,
            active=True
        )
        account.customer.add(customer)

        Card.objects.create(
            account=account,
            number=card_number,
            cvv=cvv,
            flag=flag,
            expiration_date=expiration_date,
            active=True
        )
            
        return Response({'status': 'Account Created'}, status=status.HTTP_201_CREATED)


class CardViewSet(viewsets.ModelViewSet):
    permission_classes = []

    def get_queryset(self):
        return filter_by_account(Card, self.request.query_params.get('account'), self.request.user)

    def get_serializer_class(self):
        if self.request.method in 'POST PATCH':
            return CardPostSerializer
        elif self.request.method in 'GET':
            return CardGetSerializer

    def create(self, request):
        idAccount = request.data.get("idAccount")
        account = get_object_or_404(Account, pk=idAccount)

        card_number = generate_credit_card_number()
        cvv = str(randint(100, 999))
        expiration_date = datetime.now() + timedelta(days=365)
        flag = determine_flag(int(card_number[0]))

        if account.limit >= 500:
            Card.objects.create(
                account=account,
                number=card_number,
                cvv=cvv,
                flag=flag,
                expiration_date=expiration_date,
                active=True
            )

            return Response({'status': 'Card Created'}, status=status.HTTP_201_CREATED)
        
        return Response({'status': 'Account not meet the requirements to receive the card'}, status=status.HTTP_403_FORBIDDEN)


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class InvestmentViewSet(viewsets.ModelViewSet):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer


class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
