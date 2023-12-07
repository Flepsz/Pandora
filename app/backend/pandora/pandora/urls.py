from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from django.conf.urls.static import static
from django.conf import settings
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from api.urls import router


# Main urls for API
urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('auth/', include('rest_framework.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# Djoser urls for user authentication
urlpatterns += [
    path('api/v1/auth/', include('djoser.urls')),
    path('api/v1/auth/', include('djoser.urls.jwt'))
]

# drf_spectacular for swagger view
urlpatterns += [
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/v1/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger'),
    path('api/v1/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]
