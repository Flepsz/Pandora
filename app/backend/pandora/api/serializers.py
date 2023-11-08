from rest_framework import serializers
from .models import Customer, CustomerNP, CustomerLP, Account, Address, Contact, Card, Transaction, Investment, Loan, InstallmentLoan

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'

class CustomerSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True, read_only=True)
    contacts = ContactSerializer(many=True, read_only=True)
    accounts = serializers.HyperlinkedRelatedField(
        many=True, read_only=True, view_name='account-detail'
    )

    class Meta:
        model = Customer
        fields = '__all__'

    def to_representation(self, instance):
        if isinstance(instance, CustomerNP):
            self.fields.update({
                'cpf': serializers.CharField(),
                'rg': serializers.CharField()
            })
        elif isinstance(instance, CustomerLP):
            self.fields.update({
                'cnpj': serializers.CharField(),
                'state_registration': serializers.CharField(),
                'municipal_registration': serializers.CharField()
            })

        return super(CustomerSerializer, self).to_representation(instance)

class CardSerializer(serializers.ModelSerializer):
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