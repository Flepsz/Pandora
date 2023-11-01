from django.contrib import admin
from django.urls import path, include
from api.urls import router

urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('auth/', include('rest_framework.urls')),
]

urlpatterns += [
    path('api/v1/auth', include('djoser.urls')),
    path('api/v1/auth', include('djoser.urls.jwt'))
]
