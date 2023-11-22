from rest_framework import permissions


class IsSuperUser(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True
        return False


class DeletePermission(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == 'DELETE':
            if request.user.is_superuser:
                return True
            return False
        return True


class UserGet(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True

        if request.method == 'GET':
            if request.user.is_authenticated:
                return True
            return False
        return False


class UserPost(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True

        if request.method == 'POST':
            if request.user.is_authenticated:
                return True
            return False
        return False


class UserGetPost(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True

        if request.method in 'GET POST':
            if request.user.is_authenticated:
                return True
            return False
        return False


class UserGetPostPatch(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True

        if request.method in 'GET POST PATCH':
            if request.user.is_authenticated:
                return True
            return False
        return False


class UserPostPatch(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.is_superuser:
            return True

        if request.method in 'POST PATCH':
            if request.user.is_authenticated:
                return True
            return False
        return False
