from django.urls import path
from rest_framework.routers import SimpleRouter
from . import views

# urlpatterns = [
#     path('customers/', views.CustomerViewSet.as_view({'get': 'list'}), name='customer-list'),
#     path('customers/<int:pk>/', views.CustomerViewSet.as_view({'get': 'retrieve'}), name='customer-detail'),
#     path('customers/<int:pk>/address/', views.CustomerViewSet.as_view({'get': 'address'}), name='customer-address-list'),
#     path('customers/<int:pk>/contact/', views.CustomerViewSet.as_view({'get': 'contact'}), name='customer-contact-list'),
#     path('customers/<int:pk>/account/', views.CustomerViewSet.as_view({'get': 'account'}), name='customer-account-list'),
#     path('customers/<int:customer_id>/account/<int:pk>/', views.AccountViewSet.as_view({'get': 'retrieve'}), name='customer-account-detail'),
#     path('customers/<int:customer_id>/account/<int:account_id>/card/', views.AccountViewSet.as_view({'get': 'card'}), name='customer-card-list'),
#     path('customers/<int:customer_id>/account/<int:account_id>/card/<int:pk>/', views.CardViewSet.as_view({'get': 'retrieve'}), name='customer-card-detail'),
#     path('customers/<int:customer_id>/account/<int:account_id>/card/<int:card_id>/transaction/', views.CardViewSet.as_view({'get': 'transaction'}), name='customer-transaction-list'),
#     path('customers/<int:customer_id>/account/<int:account_id>/card/<int:card_id>/transaction/<int:pk>/', views.TransactionViewSet.as_view({'get': 'retrieve'}), name='customer-transaction-detail'),
#     path('customers/<int:customer_id>/account/<int:account_id>/investment/', views.AccountViewSet.as_view({'get': 'investment'}), name='customer-investment-list'),
#     path('customers/<int:customer_id>/account/<int:account_id>/investment/<int:pk>/', views.InvestmentViewSet.as_view({'get': 'retrieve'}), name='customer-investment-detail'),
#     path('customers/<int:customer_id>/account/<int:account_id>/loan/', views.AccountViewSet.as_view({'get': 'loan'}), name='customer-loan-list'),
#     path('customers/<int:customer_id>/account/<int:account_id>/loan/<int:pk>/', views.LoanViewSet.as_view({'get': 'retrieve'}), name='customer-loan-detail'),
# ]


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
