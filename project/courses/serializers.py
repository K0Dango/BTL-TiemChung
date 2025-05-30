from rest_framework.serializers import ModelSerializer, CharField, ImageField, ValidationError, PrimaryKeyRelatedField
from .models import User, LoaiVaccine, Vaccine, GioHang
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
    loaiVaccine = LoaiVaccineSerializer(read_only=True)
    loai_vaccine_id = PrimaryKeyRelatedField(
        queryset=LoaiVaccine.objects.all(),
        source='loaiVaccine',
        write_only=True
    )

    class Meta:
        model = Vaccine
        fields = ['maVaccine', 'tenVc', 'loaiVaccine', 'loai_vaccine_id', 'NSX', 'HSD', 'nguonGoc', 'gia', 'thongTin']


class GioHangSerializer(ModelSerializer):
    user_id = PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='user',
    ) 
    vaccine_id = PrimaryKeyRelatedField(
        queryset=Vaccine.objects.all(),
        source='vaccine',
    ) 
    tenVaccine = CharField(source='vaccine.tenVc', read_only=True) 
    emailUser = CharField(source='user.email', read_only=True)

    class Meta:
        model = GioHang
        fields = ('id', 'user_id', 'emailUser','vaccine_id', 'tenVaccine', 'soLuong')
    
    # def create(self, validated_data):
    #     user = validated_data['user']
    #     vaccine = validated_data['vaccine']
    #     so_luong_moi = validated_data.get('soLuong', 1)

    #     gio_hang, created = GioHang.objects.get_or_create(
    #         user=user,
    #         vaccine=vaccine,
    #         defaults={'soLuong': so_luong_moi}
    #     )

    #     if not created:
    #         gio_hang.soLuong += so_luong_moi
    #         gio_hang.save()

    #     return gio_hang

