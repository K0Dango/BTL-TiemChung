from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('user', views.UserViewSet)
urlpatterns = [
    path('api/', include(router.urls)),
    path('api/check-email/', views.check_email),
    path('api/check-sdt/', views.check_sdt),
]  