# Generated by Django 5.2.1 on 2025-05-28 08:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0012_alter_giohang_soluong'),
    ]

    operations = [
        migrations.AlterField(
            model_name='giohang',
            name='soLuong',
            field=models.IntegerField(default='1'),
        ),
    ]
