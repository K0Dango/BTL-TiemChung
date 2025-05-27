from rest_framework.serializers import ModelSerializer, CharField, ImageField, ValidationError, PrimaryKeyRelatedField
from .models import User, LoaiVaccine, Vaccine
from django.contrib.auth.hashers import make_password


class UserSerializer(ModelSerializer):
    avatar = ImageField(required=False, allow_null=True)
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'sdt', 'gioiTinh', 'ngaySinh', 'diaChi', 'avatar']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.password = make_password(password)
        user.save()
        return user
    

class LoaiVaccineSerializer(ModelSerializer):
    class Meta:
        model = LoaiVaccine
        fields = '__all__'


class VaccineSerializer(ModelSerializer):
    loai_vaccine = LoaiVaccineSerializer(read_only=True)
    loai_vaccine_id = PrimaryKeyRelatedField(
        queryset=LoaiVaccine.objects.all(),
        source='loaiVaccine',
        write_only=True
    )

    class Meta:
        model = Vaccine
        fields = ['maVaccine', 'tenVc', 'loai_vaccine', 'loai_vaccine_id', 'tuoi', 'NSX', 'HSD', 'nguonGoc', 'gia']
    

