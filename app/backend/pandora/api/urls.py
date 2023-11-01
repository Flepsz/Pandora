from django.urls import path
from rest_framework.routers import SimpleRouter
from . import views

# urlpatterns = [
#     path('costumers/', views.CostumerViewSet.as_view({'get': 'list'}), name='costumer-list'),
#     path('costumers/<int:pk>/', views.CostumerViewSet.as_view({'get': 'retrieve'}), name='costumer-detail'),
#     path('costumers/<int:pk>/address/', views.CostumerViewSet.as_view({'get': 'address'}), name='costumer-address-list'),
#     path('costumers/<int:pk>/contact/', views.CostumerViewSet.as_view({'get': 'contact'}), name='costumer-contact-list'),
#     path('costumers/<int:pk>/account/', views.CostumerViewSet.as_view({'get': 'account'}), name='costumer-account-list'),
#     path('costumers/<int:costumer_id>/account/<int:pk>/', views.AccountViewSet.as_view({'get': 'retrieve'}), name='costumer-account-detail'),
#     path('costumers/<int:costumer_id>/account/<int:account_id>/card/', views.AccountViewSet.as_view({'get': 'card'}), name='costumer-card-list'),
#     path('costumers/<int:costumer_id>/account/<int:account_id>/card/<int:pk>/', views.CardViewSet.as_view({'get': 'retrieve'}), name='costumer-card-detail'),
#     path('costumers/<int:costumer_id>/account/<int:account_id>/card/<int:card_id>/transaction/', views.CardViewSet.as_view({'get': 'transaction'}), name='costumer-transaction-list'),
#     path('costumers/<int:costumer_id>/account/<int:account_id>/card/<int:card_id>/transaction/<int:pk>/', views.TransactionViewSet.as_view({'get': 'retrieve'}), name='costumer-transaction-detail'),
#     path('costumers/<int:costumer_id>/account/<int:account_id>/investment/', views.AccountViewSet.as_view({'get': 'investment'}), name='costumer-investment-list'),
#     path('costumers/<int:costumer_id>/account/<int:account_id>/investment/<int:pk>/', views.InvestmentViewSet.as_view({'get': 'retrieve'}), name='costumer-investment-detail'),
#     path('costumers/<int:costumer_id>/account/<int:account_id>/loan/', views.AccountViewSet.as_view({'get': 'loan'}), name='costumer-loan-list'),
#     path('costumers/<int:costumer_id>/account/<int:account_id>/loan/<int:pk>/', views.LoanViewSet.as_view({'get': 'retrieve'}), name='costumer-loan-detail'),
# ]


router = SimpleRouter()

router.register(r'costumers', views.CostumerViewSet, basename='costumer')
router.register(r'accounts', views.AccountViewSet, basename='account')
router.register(r'addresses', views.AddressViewSet, basename='address')
router.register(r'contacts', views.ContactViewSet, basename='contact')
router.register(r'cards', views.CardViewSet, basename='card')
router.register(r'transactions', views.TransactionViewSet, basename='transaction')
router.register(r'investments', views.InvestmentViewSet, basename='investment')
router.register(r'loans', views.LoanViewSet, basename='loan')
