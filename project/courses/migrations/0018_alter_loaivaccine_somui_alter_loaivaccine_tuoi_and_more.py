# Generated by Django 5.2.1 on 2025-05-29 07:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0017_remove_vaccine_somui_loaivaccine_somui'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loaivaccine',
            name='soMui',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='loaivaccine',
            name='tuoi',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='vaccine',
            name='thongTin',
            field=models.TextField(),
        ),
    ]
