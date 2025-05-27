from django.contrib import admin
from .models import User, LoaiVaccine, Vaccine

class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'email','password', 'sdt', 'gioiTinh', 'ngaySinh', 'diaChi', 'avatar', 'role']
    list_filter = ['id', 'username', 'email', 'is_active','date_joined']
    search_fields = ['username', 'email']

    fields = ['username', 'email', 'password', 'sdt', 'gioiTinh', 'ngaySinh', 'diaChi', 'avatar', 'role']



class LoaiVcAdmin(admin.ModelAdmin):
    list_display = [field.name for field in LoaiVaccine._meta.fields]
    list_filter = [field.name for field in LoaiVaccine._meta.fields]
    search_fields= [field.name for field in LoaiVaccine._meta.fields]


class VaccineAdmin(admin.ModelAdmin):
    list_display = [field.name for field in Vaccine._meta.fields]
    list_filter = [field.name for field in Vaccine._meta.fields]
    search_fields= [field.name for field in Vaccine._meta.fields]


    

admin.site.register(User, UserAdmin)
admin.site.register(LoaiVaccine, LoaiVcAdmin)
admin.site.register(Vaccine, VaccineAdmin)
# Register your models here.
