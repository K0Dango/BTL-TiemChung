from django.contrib import admin
from crouse.models import UserInfo

# Register your models here.

# admin.site.register(UserInfo)


class UserInfoAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'password', 'sdt', 'gioiTinh', 'ngaySinh', 'diaChi', 'role', 'created_at']
    list_filter = ['name', 'ngaySinh', 'role', 'created_at']
    search_fields = ['name', 'email', 'sdt']
    ordering = ('-created_at',)

admin.site.register(UserInfo, UserInfoAdmin)