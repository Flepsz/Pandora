from django.contrib import admin
from django.urls import path, include
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi
from drf_spectacular.views import SpectacularAPIView, SpectacularRedocView, SpectacularSwaggerView
from api.urls import router


# schema_view = get_schema_view(
#     openapi.Info(
#         title="Pandora Bank API",
#         default_version="v1",
#         description="Your API description",
#         terms_of_service="https://www.yourapi.com/terms/",
#         contact=openapi.Contact(email="contact@yourapi.com"),
#         license=openapi.License(name="Your License"),
#     ),
#     public=True,
#     permission_classes=(permissions.AllowAny,),
# )


urlpatterns = [
    path('api/v1/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('auth/', include('rest_framework.urls')),
]

urlpatterns += [
    path('api/v1/auth/', include('djoser.urls')),
    path('api/v1/auth/', include('djoser.urls.jwt'))
]

urlpatterns += [
    path('api/v1/schema/', SpectacularAPIView.as_view(), name='schema'),
    path('api/v1/swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger'),
    path('api/v1/redoc/', SpectacularRedocView.as_view(url_name='schema'), name='redoc'),
]