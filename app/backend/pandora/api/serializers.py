from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from .models import Customer, CustomerNP, CustomerLP, Account, Address, Contact, Card, Transaction, Investment, AccountInvestment, Loan, InstallmentLoan, PandoraManager


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['register_number', 'password', 'photo_logo',
                  'accounts']
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        return make_password(value)

    def create(self, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data['password'] = make_password(validated_data['password'])
        return super().update(instance, validated_data)


class NaturalGetPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerNP
        fields = '__all__'


class NaturalPostPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerNP
        fields = (
            'customer',
            'name',
            'social_name',
            'cpf',
            'rg',
            'birthdate'
        )


class LegalGetPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerLP
        fields = '__all__'


class LegalPostPersonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerLP
        fields = (
            'customer',
            'fantasy_name',
            'cnpj',
            'sr',
            'mr',
            'establishment_date'
        )


class AccountGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'


class AccountPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = (
            'customer',
            'acc_type'
        )


class AddressGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class AddressPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = (
            'customer',
            'street',
            'neighborhood',
            'city',
            'state',
            'zip_code'
        )


class ContactsGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class ContactsPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = (
            'customer',
            'number',
            'email',
            'observation'
        )


class CardGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = '__all__'


class CardPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = (
            'account',
        )


class TransactionGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'


class TransactionPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = (
            'card',
            'amount',
            'operation',
            'receiver'
        )


class InvestmentGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investment
        fields = '__all__'


class AccountInvestmentGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountInvestment
        fields = '__all__'


class AccountInvestmentPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccountInvestment
        fields = [
            'id_investment',
            'account',
        ]


class LoanGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = '__all__'


class LoanPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Loan
        fields = [
            'id',
            'account',
            'requested_amount',
            'interest_rate',
            'paidout',
            'installment_amount',
            'observation'
        ]


class InstallmentLoanGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstallmentLoan
        fields = '__all__'


class InstallmentLoanPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = InstallmentLoan
        fields = [
            'id',
            'number',
            'amount',
            'payment_date',
            'due_date',
            'is_paid'
        ]

class CardTransationSerializer(serializers.ModelSerializer):
    transaction = TransactionGetSerializer()

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

class PandoraManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = PandoraManager
        fields = "__all__"