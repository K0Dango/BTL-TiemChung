# Generated by Django 5.2.1 on 2025-06-03 04:04

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0019_alter_giohang_soluong_dondangky_nguoitiem_dontiem'),
    ]

    operations = [
        migrations.AddField(
            model_name='dontiem',
            name='ngayTiem',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
