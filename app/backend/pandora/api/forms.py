from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import Customer


class CustomUserFrom(UserCreationForm):
    class Meta:
        model = Customer
        fields = [
            'photo_logo'
        ]
        labels = {'username': 'Register Number'}

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password"])
        user.register_number = self.cleaned_data["username"]

        if commit:
            user.save()
        return user


class CustomUserUpdFrom(UserChangeForm):
    class Meta:
        model = Customer
        fields = [
            'photo_logo'
        ]
