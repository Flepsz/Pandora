from api.models import Account


# Function to filter models by user
def filter_by_user(model, user):
    # Retrieve all instances of the model
    queryset = model.objects.all()

    # Check if the user is authenticated and not a superuser
    if user.is_authenticated and not user.is_superuser:
        return queryset.filter(customer=user.pk)

    return queryset


# Function to filter models by account number and user
def filter_by_account(model, account_number, user):
    # Retrieve all instances of the model
    queryset = model.objects.all()

    # Check if an account number is provided
    if account_number:
        try:
            account_obj = Account.objects.get(pk=account_number)
            print(account_obj)
        except model.DoesNotExist:
            return []

        # Check if the user is a superuser or is associated with the account
        if (user.is_authenticated or user.is_superuser) or user in account_obj.customer.all():
            queryset = queryset.filter(account=account_obj)
            return queryset

    return queryset
