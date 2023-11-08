from api.models import Account


def filter_by_user(model, user):
    queryset = model.objects.all()

    if user.is_authenticated and not user.is_superuser:
        return queryset.filter(user=user.pk)
    return queryset


def filter_by_account(model, account, user):
    queryset = model.objects.all()

    if account:
        account_o = model.objects.get(number=account)
        if (user.is_authenticated and user.is_superuser) or user in account_o.user.all():
            queryset = queryset.filter(id_account=account)
            return queryset
    return []
