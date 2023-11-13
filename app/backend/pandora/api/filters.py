from api.models import Account


def filter_by_user(model, user):
    queryset = model.objects.all()

    if user.is_authenticated and not user.is_superuser:
        return queryset.filter(user=user.pk)
    return queryset


def filter_by_account(model, account_number, user):
    queryset = model.objects.all()
    if account_number:
        try:
            account_obj = model.objects.get(pk=account_number)
        except model.DoesNotExist:
            return []

        if (user.is_authenticated and user.is_superuser) or user in account_obj.customer.all():
            queryset = queryset.filter(account=account_obj)
            return queryset

    return []
