import datetime
from random import randint
from django.shortcuts import get_object_or_404
from django.urls import reverse
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Costumer, Account, Card, Transaction, Investment, Loan, Address, Contact
from .serializers import (
    CostumerSerializer, 
    AccountSerializer, 
    CardSerializer, 
    TransactionSerializer, 
    InvestmentSerializer, 
    LoanSerializer, 
    AddressSerializer, 
    ContactSerializer,
    CardTransationSerializer
)

class CostumerViewSet(viewsets.ModelViewSet):
    queryset = Costumer.objects.all()
    serializer_class = CostumerSerializer

    def list(self, request):
        id_costumer = request.query_params.get('idCostumer')
        if id_costumer is not None:
            queryset = Costumer.objects.filter(id=id_costumer)
        else:
            queryset = Costumer.objects.all()

        serializer = CostumerSerializer(queryset, many=True)
        return Response(serializer.data)


    @action(detail=False, methods=['get'])
    def list_with_details(self, request):
        costumers = Costumer.objects.all()
        data = []

        for costumer in costumers:
            costumer_data = {
                'id': costumer.id,
                'full_name': costumer.full_name,
                'social_name': costumer.social_name,
                'birthdate': costumer.birthdate,
                'photo_logo': costumer.photo_logo.url if costumer.photo_logo else None,
                'username': costumer.username,
                'password': costumer.password,
                'address': [],
                'contact': [],
            }

            for address in costumer.addresses.all():
                costumer_data['address'].append({
                    'street': address.street,
                    'neighborhood': address.neighborhood,
                    'city': address.city,
                    'state': address.state,
                    'zip_code': address.zip_code,
                })

            for contact in costumer.contacts.all():
                costumer_data['contact'].append({
                    'number': contact.number,
                    'email': contact.email,
                    'observation': contact.observation,
                })

            data.append(costumer_data)

        return Response(data)
    # @action(detail=True, methods=['get'])
    # def address(self, request, pk=None):
    #     costumer = self.get_object()
    #     addresses = costumer.addresses.all()
    #     serializer = AddressSerializer(addresses, many=True)
    #     return Response(serializer.data)

    # @action(detail=True, methods=['get'])
    # def contact(self, request, pk=None):
    #     costumer = self.get_object()
    #     contacts = costumer.contacts.all()
    #     serializer = ContactSerializer(contacts, many=True)
    #     return Response(serializer.data)

    # @action(detail=True, methods=['get'])
    # def account(self, request, pk=None):
    #     costumer = self.get_object()
    #     accounts = costumer.accounts.all()
    #     serializer = AccountSerializer(accounts, many=True)
    #     return Response(serializer.data)


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def list(self, request):
        id_account = request.query_params.get('idAccount')
        if id_account is not None:
            queryset = Account.objects.filter(id=id_account)
        else:
            queryset = Account.objects.all()

        serializer = AccountSerializer(queryset, many=True)
        return Response(serializer.data)

    # @action(detail=True, methods=['get'])
    # def card(self, request, pk=None):
    #     account = self.get_object()
    #     cards = account.cards.all()
    #     serializer = CardSerializer(cards, many=True)
    #     return Response(serializer.data)

    # @action(detail=True, methods=['get'])
    # def transaction(self, request, pk=None):
    #     account = self.get_object()
    #     transactions = account.transactions.all()
    #     serializer = TransactionSerializer(transactions, many=True)
    #     return Response(serializer.data)

    # @action(detail=True, methods=['get'])
    # def investment(self, request, pk=None):
    #     account = self.get_object()
    #     investments = account.investments.all()
    #     serializer = InvestmentSerializer(investments, many=True)
    #     return Response(serializer.data)

    # @action(detail=True, methods=['get'])
    # def loan(self, request, pk=None):
    #     account = self.get_object()
    #     loans = account.loans.all()
    #     serializer = LoanSerializer(loans, many=True)
    #     return Response(serializer.data)


class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer
    lookup_field = 'id'

    def get_serializer_class(self):
        if self.request.method == 'GET':
            return CardSerializer
        return CardSerializer

    def create(self, request):
        idAccount = request.data.get("idAccount")
        card = Card.objects.create(
            idAccount=get_object_or_404(Account, pk=idAccount),
            number=Card.generate_credit_card_number(),
            cvv=str(randint(100, 999)),
            expiration_date=datetime.now() + datetime.timedelta(days=365),
            flag=Card.determine_flag(),
            active=True
        )
        return Response(CardSerializer(card).data, status=201)

    # def transaction(self, request, pk=None):
    #     card = self.get_object()
    #     transactions = card.transactions.all()
    #     serializer = TransactionSerializer(transactions, many=True)
    #     return Response(serializer.data)

    
    # def create(self, request):
    #     serializer = CardSerializer(data=request.data)
    #     if serializer.is_valid():
    #         card = serializer.save()
            # card.number = card.generate_credit_card_number()
            # card.cvv = str(randint(100, 999))
            # card.expiration_date = datetime.now() + datetime.timedelta(days=365)
            # card.flag = card.determine_flag()
    #         card.save()
    #         return Response(serializer.data, status=201)
    #     return Response(serializer.errors, status=400)
    
    def create(self, request):
        idAccount = request.data.get("idAccount")
        card = Card.objects.create(
            idAccount = get_object_or_404(Account, pk=idAccount),
            number = Card.generate_credit_card_number(),
            cvv = str(randint(100, 999)),
            expiration_date = datetime.now() + datetime.timedelta(days=365),
            flag = Card.determine_flag(),
            active = True
        )
        return Response(card.data, status=201)



class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = 'id'


class InvestmentViewSet(viewsets.ModelViewSet):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer
    lookup_field = 'id'


class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
    lookup_field = 'id'


class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer


class ContactViewSet(viewsets.ModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer