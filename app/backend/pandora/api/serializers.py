from rest_framework import serializers
from .models import Customer, CustomerNP, CustomerLP, Account, Address, Contact, Card, Transaction, Investment, Loan, InstallmentLoan

class NaturalPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerNP
        fields = '__all__'


class LegalPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerLP
        fields = '__all__'
        
class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class CardGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class InvestmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields = '__all__'

class LoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'

class InstallmentLoanSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstallmentLoan
        fields = '__all__'

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'


class CardTransationSerializer(serializers.ModelSerializer):
    transaction = TransactionSerializer()
    class Meta:
        model = Card
        fields = [
            'idAccount',
            'number',
            'cvv',
            'expiration_date',
            'flag',
            'active',
            'transaction'
        ]