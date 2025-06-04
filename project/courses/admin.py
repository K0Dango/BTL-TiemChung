from django.contrib import admin
from .models import User, LoaiVaccine, Vaccine, GioHang, NguoiTiem, DonDangKy,DonTiem

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


# class GioHangAdmin(admin.ModelAdmin):
#     list_display = [field.name for field in GioHang._meta.fields]
#     list_filter = [field.name for field in GioHang._meta.fields]
#     search_fields= [field.name for field in GioHang._meta.fields]   

class GioHangAdmin(admin.ModelAdmin):
    list_display = ['id', 'get_user_id', 'get_user_email', 'get_vaccine_id', 'get_vaccine_name', 'soLuong']
    list_filter = ['user', 'vaccine']
    search_fields = ['user__email', 'vaccine__tenVc']

    fields = ['user', 'vaccine', 'soLuong']

    def get_user_id(self, obj):
        return obj.user.id
    get_user_id.short_description = 'ID User'

    def get_user_email(self, obj):
        return obj.user.email
    get_user_email.short_description = 'Email'

    def get_vaccine_id(self, obj):
        return obj.vaccine.maVaccine
    get_vaccine_id.short_description = 'ID Vaccine'

    def get_vaccine_name(self, obj):
        return obj.vaccine.tenVc
    get_vaccine_name.short_description = 'Tên Vaccine'


class NguoiTiemAdmin(admin.ModelAdmin):
    list_display = ('name', 'gioiTinh', 'ngaySinh', 'sdt', 'nguoiTao')
    search_fields = ('name', 'sdt', 'diaChi')
    list_filter = ('gioiTinh',)

class DonDangKyAdmin(admin.ModelAdmin):
    list_display = ('id', 'nguoiDangKy', 'vaccine', 'ngayDangKy', 'tong_tien')
    list_filter = ('ngayDangKy', 'vaccine')
    search_fields = ('nguoiDangKy__username',) 
    readonly_fields = ('tong_tien',)

    def get_nguoiDangKy(self, obj):
        return obj.nguoiDangKy.username  
    get_nguoiDangKy.short_description = 'Người đăng ký'

    def tong_tien(self, obj):
        return obj.tong_tien

class DonTiemAdmin(admin.ModelAdmin):
    list_display = ('id', 'nguoiTiem', 'donDangKy', 'ngayTiem', 'trangThai')
    list_filter = ('trangThai',)
    search_fields = ('nguoiTiem__name',)
    

admin.site.register(User, UserAdmin)
admin.site.register(LoaiVaccine, LoaiVcAdmin)
admin.site.register(Vaccine, VaccineAdmin)
admin.site.register(GioHang, GioHangAdmin)
admin.site.register(NguoiTiem, NguoiTiemAdmin)
admin.site.register(DonDangKy, DonDangKyAdmin)
admin.site.register(DonTiem, DonTiemAdmin)
