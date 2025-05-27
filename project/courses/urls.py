from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('user', views.UserViewSet)
router.register('vaccine', views.VaccineViewSet)
router.register('LoaiVaccine', views.LoaiVaccineViewSet)
urlpatterns = [
    path('check-email/', views.check_email),
    path('check-sdt/', views.check_sdt),
    path('current-user/', views.current_user),
    path('change-password/', views.change_password),
    path('check-pass/', views.check_pass),
    path('update-info/', views.update_user_info),
    path('', include(router.urls)),
    # path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
]