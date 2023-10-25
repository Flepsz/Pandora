import datetime
from random import randint
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Costumer, Account, Card, Transaction, Investment, Loan
from .serializers import CostumerSerializer, AccountSerializer, CardSerializer, TransactionSerializer, InvestmentSerializer, LoanSerializer, AddressSerializer, ContactSerializer

class CostumerViewSet(viewsets.ModelViewSet):
    queryset = Costumer.objects.all()
    serializer_class = CostumerSerializer

    @action(detail=True, methods=['get'])
    def address(self, request, pk=None):
        costumer = self.get_object()
        addresses = costumer.addresses.all()
        serializer = AddressSerializer(addresses, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def contact(self, request, pk=None):
        costumer = self.get_object()
        contacts = costumer.contacts.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def account(self, request, pk=None):
        costumer = self.get_object()
        accounts = costumer.accounts.all()
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data)


class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    @action(detail=True, methods=['get'])
    def card(self, request, pk=None):
        account = self.get_object()
        cards = account.cards.all()
        serializer = CardSerializer(cards, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def transaction(self, request, pk=None):
        account = self.get_object()
        transactions = account.transactions.all()
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def investment(self, request, pk=None):
        account = self.get_object()
        investments = account.investments.all()
        serializer = InvestmentSerializer(investments, many=True)
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def loan(self, request, pk=None):
        account = self.get_object()
        loans = account.loans.all()
        serializer = LoanSerializer(loans, many=True)
        return Response(serializer.data)


class CardViewSet(viewsets.ModelViewSet):
    queryset = Card.objects.all()
    serializer_class = CardSerializer

    @action(detail=True, methods=['get'])
    def transaction(self, request, pk=None):
        card = self.get_object()
        transactions = card.transactions.all()
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['post'])
    def create_card(self, request):
        serializer = CardSerializer(data=request.data)
        if serializer.is_valid():
            card = serializer.save()
            card.number = card.generate_credit_card_number()
            card.cvv = str(randint(100, 999))
            card.expiration_date = datetime.now() + datetime.timedelta(days=365)
            card.flag = card.determine_flag()
            card.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer


class InvestmentViewSet(viewsets.ModelViewSet):
    queryset = Investment.objects.all()
    serializer_class = InvestmentSerializer


class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer
