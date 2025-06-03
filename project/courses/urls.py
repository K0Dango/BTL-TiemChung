from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('user', views.UserViewSet)
router.register('vaccine', views.VaccineViewSet)
router.register('loai-vaccine', views.LoaiVaccineViewSet)
router.register('gio-hang', views.GioHangViewSet)
router.register('nguoi-tiem', views.NguoiTiemViewSet)
router.register('don-tiem', views.DonTiemViewSet)
router.register('dk-tiem', views.DonDangKyViewSet)
urlpatterns = [
    path('check-email/', views.check_email),
    path('check-sdt/', views.check_sdt),
    path('current-user/', views.current_user),
    path('change-password/', views.change_password),
    path('check-pass/', views.check_pass),
    path('update-info/', views.update_user_info),
    # path('vaccine-loai/', views.locLoaiVaccine),
    path('', include(router.urls)),
    # path('o/', include('oauth2_provider.urls', namespace='oauth2_provider')),
] + router.urls