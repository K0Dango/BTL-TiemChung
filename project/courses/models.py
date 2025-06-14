from django.db import models
from cloudinary.models import CloudinaryField
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.utils import timezone

import cloudinary

cloudinary.config( 
    cloud_name = 'dcjnoorcg', 
    api_key = '321831298548949', 
    api_secret = '_I5S01hI_lJDPAu5RTudCfW7Lh4')




class User(AbstractUser):
    GENDER_CHOICES = [
        ('NAM', 'NAM'),
        ('NỮ', 'NỮ'),
        ('KHÁC', 'KHÁC'),
    ]

    ROLE_CHOICES = [
        ('1', 'Superuser'),
        ('2', 'Admin'),
        ('3', 'User'),
    ]
    # name = models.CharField(max_length=50)
    # email = models.CharField(max_length=100)
    # password = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    sdt = models.CharField(max_length=10,null=True, blank=True)
    gioiTinh = models.CharField(max_length=5,  choices=GENDER_CHOICES, default="NAM")
    ngaySinh = models.DateField(blank=True, null=True)
    diaChi = models.TextField( null=True, blank=True)   
    avatar = CloudinaryField('avatar', blank=True, null=True)
    first_name = None
    last_name = None
    role = models.CharField(max_length=1, choices=ROLE_CHOICES, default='3')
    # created_at = models.DateTimeField(auto_now_add=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username'] 


    # def save(self, *args, **kwargs):
    #     if not self.password.startswith('pbkdf2_'):
    #         self.password = make_password(self.password)
    #     super().save(*args, **kwargs)
    def save(self, *args, **kwargs):
        if self.role == '1':
            self.is_superuser = True
            self.is_staff = True
        elif self.role == '2':
            self.is_staff = True
            self.is_superuser = False
        else:
            self.is_staff = False
            self.is_superuser = False

        if not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)



    def __str__(self):
        role_name = dict(self.ROLE_CHOICES).get(self.role, 'User')
        return f"{self.email} ({role_name})"


class LoaiVaccine(models.Model):
    maLoai = models.CharField(max_length=10, primary_key=True)
    tenLoai = models.CharField(max_length=100)
    tuoi = models.IntegerField(default=0)
    soMui  = models.IntegerField(default=1)

    def __str__(self):
        return self.tenLoai

class Vaccine(models.Model):
    maVaccine = models.CharField(max_length=10, primary_key=True)
    tenVc = models.CharField(max_length=100)
    loaiVaccine = models.ForeignKey(LoaiVaccine, on_delete=models.CASCADE, related_name='vaccines')
    NSX = models.DateField() 
    HSD = models.DateField()  
    nguonGoc = models.CharField(max_length=100)
    gia = models.DecimalField(max_digits=12, decimal_places=2)
    thongTin = models.TextField()

    def __str__(self):
        return self.tenVc
    
class GioHang(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='gio_hang')
    vaccine = models.ForeignKey(Vaccine, on_delete=models.CASCADE, related_name='gio_hang')
    soLuong = models.IntegerField(default=1)
    
    def __str__(self):
        return str(self.id)
    

class NguoiTiem(models.Model):
    GENDER_CHOICES = [
        ('NAM', 'NAM'),
        ('NỮ', 'NỮ'),
        ('KHÁC', 'KHÁC'),
    ]
    name = models.CharField(max_length=100)
    ngaySinh = models.DateField()
    gioiTinh = models.CharField(max_length=5,  choices=GENDER_CHOICES, default="NAM")
    nguoiTao = models.ForeignKey(User, on_delete=models.CASCADE, related_name='nguoi_tiem')
    sdt = models.CharField(max_length=10)
    diaChi = models.TextField()   


    def __str__(self):
        return self.name



class DonDangKy(models.Model):  
    nguoiDangKy = models.ForeignKey(User, on_delete=models.CASCADE, related_name='don_dang_ky')
    ngayDangKy = models.DateField(auto_now_add=True)
    vaccine = models.ForeignKey(Vaccine, on_delete=models.CASCADE)

    def __str__(self):
         return str(self.id)

    @property
    def tong_tien(self):
        so_nguoi = self.don_tiem.count()
        return self.vaccine.gia * so_nguoi


class DonTiem(models.Model):  
    TRANG_THAI = [
        (1, 'Chưa tiêm'),
        (2, 'Đã tiêm'),
        (3, 'Đã hủy')
    ]

    nguoiTiem = models.ForeignKey(NguoiTiem, on_delete=models.CASCADE, related_name='don_tiem')
    donDangKy = models.ForeignKey(DonDangKy, on_delete=models.CASCADE, related_name='don_tiem')
    ngayTiem = models.DateField()
    trangThai = models.IntegerField( choices=TRANG_THAI, default=1)

    def __str__(self):
         return str(self.id)
