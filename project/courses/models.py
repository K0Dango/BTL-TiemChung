from django.db import models
from cloudinary.models import CloudinaryField
from django.contrib.auth.hashers import make_password
import cloudinary

cloudinary.config( 
    cloud_name = 'dcjnoorcg', 
    api_key = '321831298548949', 
    api_secret = '_I5S01hI_lJDPAu5RTudCfW7Lh4')

class User(models.Model):
    GENDER_CHOICES = [
        ('NAM', 'NAM'),
        ('NỮ', 'NỮ'),
        ('KHÁC', 'KHÁC'),
    ]

    ROLE_CHOICES = [
        ('1', 'admin'),
        ('2', 'user'),
    ]
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    sdt = models.CharField(max_length=10,null=True, blank=True)
    gioiTinh = models.CharField(max_length=5,  choices=GENDER_CHOICES, default="NAM")
    ngaySinh = models.DateField(blank=True, null=True)
    diaChi = models.TextField( null=True, blank=True)   
    avatar = CloudinaryField('avatar', blank=True, null=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='2')
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        if not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)



    def __str__(self):
        return f"{self.email} ({'admin' if self.role == '1' else 'user'})"
# Create your models here.
