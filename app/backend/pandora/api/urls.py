from django.urls import path
from rest_framework.routers import SimpleRouter
from . import views


router = SimpleRouter()

router.register(r'customersnp', views.NaturalPersonViewSet, basename='customerNP')
router.register(r'customerslp', views.LegalPersonViewSet, basename='customerLP')
router.register(r'accounts', views.AccountViewSet, basename='account')
router.register(r'addresses', views.AddressViewSet, basename='address')
router.register(r'contacts', views.ContactViewSet, basename='contact')
router.register(r'cards', views.CardViewSet, basename='card')
router.register(r'transactions', views.TransactionViewSet, basename='transaction')
router.register(r'investments', views.InvestmentViewSet, basename='investment')
router.register(r'loans', views.LoanViewSet, basename='loan')
router.register(r'installments', views.InstallmentLoanViewSet, basename='installment')
router.register(r'manager', views.PandoraManagerViewSet, basename='loan')

