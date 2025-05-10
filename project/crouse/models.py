from django.db import models
from django.contrib.auth.hashers import make_password


# Create your models here.

class UserInfo(models.Model):
    ROLE_CHOICES = (
        (1, 'Admin'),
        (2, 'User'),
    )

    GIOITINH_CHOICES = (
        ('NAM', 'NAM'),
        ('NỮ', 'NỮ'),
        ('KHÁC', 'KHÁC')
    )
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True, null=True, blank=True)
    password = models.CharField(max_length=100)
    sdt = models.CharField(max_length=10, null=True, blank=True)
    gioiTinh = models.CharField(max_length=5, choices=GIOITINH_CHOICES)
    ngaySinh = models.DateField(null=True, blank=True)
    diaChi = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    role = models.IntegerField(choices=ROLE_CHOICES, default=2)

    def save(self, *args, **kwargs):
        if not self.password.startswith('pbkdf2_'):
            self.password = make_password(self.password)
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.email} ({'Admin' if self.role == 1 else 'user'})"
