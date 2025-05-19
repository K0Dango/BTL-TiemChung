from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('user', views.UserViewSet)
urlpatterns = [
    path('check-email/', views.check_email),
    path('check-sdt/', views.check_sdt),
    path('user/me/', views.current_user),
    path('user/change-password/', views.change_password),
    path('user/check-pass/', views.check_pass),
    path('', include(router.urls)),
    path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
]