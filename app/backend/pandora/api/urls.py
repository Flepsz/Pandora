from django.urls import path
from . import views

urlpatterns = [
    path('costumers/', views.CostumerList.as_view(), name='costumer-list'),

    path('costumers/<int:costumer_id>/',
         views.CostumerDetail.as_view(), name='costumer-detail'),

    path('costumers/<int:costumer_id>/address/',
         views.CostumerAddressList.as_view(), name='costumer-address-list'),

    path('costumers/<int:costumer_id>/contact/',
         views.CostumerContactList.as_view(), name='costumer-contact-list'),

    path('costumers/<int:costumer_id>/account/',
         views.CostumerAccountList.as_view(), name='costumer-account-list'),

    path('costumers/<int:costumer_id>/account/<int:account_id>/',
         views.CostumerAccountDetail.as_view(), name='costumer-account-detail'),

    path('costumers/<int:costumer_id>/account/<int:account_id>/card/',
         views.CostumerCardList.as_view(), name='costumer-card-list'),

    path('costumers/<int:costumer_id>/account/<int:account_id>/card/<int:card_id>/',
         views.CostumerCardDetail.as_view(), name='costumer-card-detail'),

    path('costumers/<int:costumer_id>/account/<int:account_id>/card/<int:card_id>/transaction/',
         views.CostumerTransactionList.as_view(), name='costumer-transaction-list'),

    path('costumers/<int:costumer_id>/account/<int:account_id>/card/<int:card_id>/transaction/<int:transaction_id>/',
         views.CostumerTransactionDetail.as_view(), name='costumer-transaction-detail'),

    path('costumers/<int:costumer_id>/account/<int:account_id>/investment/',
         views.CostumerInvestmentList.as_view(), name='costumer-investment-list'),


    path('costumers/<int:costumer_id>/account/<int:account_id>/investment/<int:investment_id>/',
         views.CostumerInvestmentDetail.as_view(), name='costumer-investment-detail'),

    path('costumers/<int:costumer_id>/account/<int:account_id>/loan/',
         views.CostumerLoanList.as_view(), name='costumer-loan-list'),

    path('costumers/<int:costumer_id>/account/<int:account_id>/loan/<int:loan_id>/',
         views.CostumerLoanDetail.as_view(), name='costumer-loan-detail'),
]
