from rest_framework.serializers import ModelSerializer, CharField, ImageField, ValidationError, PrimaryKeyRelatedField, SerializerMethodField, DecimalField
from .models import User, LoaiVaccine, Vaccine, GioHang, DonTiem, DonDangKy, NguoiTiem
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
    vaccine = VaccineSerializer(read_only=True)
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
    thanhTien = SerializerMethodField()

    class Meta:
        model = GioHang
        fields = ('id', 'user_id', 'emailUser','vaccine','vaccine_id', 'tenVaccine', 'soLuong', 'thanhTien')

    def get_thanhTien(self, obj):
        return obj.soLuong * obj.vaccine.gia
    

class NguoiTiemSerializer(ModelSerializer):
    class Meta:
        model = NguoiTiem
        fields = '__all__'
        read_only_fields = ['nguoiTao']  




class DonDangKySerializer(ModelSerializer):  
    nguoiDangKy = UserSerializer(read_only=True)
    nguoiDangKy_id = PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='nguoiDangKy',
    ) 
    vaccine = VaccineSerializer(read_only=True)
    vaccine_id = PrimaryKeyRelatedField(
        queryset=Vaccine.objects.all(),
        source='vaccine',
    ) 
    tong_tien = DecimalField(max_digits=10, decimal_places=2, read_only=True)

    class Meta:
        model = DonDangKy
        fields = ('id', 'nguoiDangKy', 'nguoiDangKy_id', 'vaccine', 'vaccine_id', 'ngayDangKy', 'tong_tien')

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret['tong_tien'] = instance.tong_tien
        return ret

class DonTiemSerializer(ModelSerializer):  
    nguoiTiem = NguoiTiemSerializer(read_only=True)
    nguoiTiem_id = PrimaryKeyRelatedField(
        queryset=NguoiTiem.objects.all(),
        source='nguoiTiem',
        write_only=True
    )
    donDangKy = DonDangKySerializer(read_only=True)  # <-- nested
    donDangKy_id = PrimaryKeyRelatedField(
        queryset=DonDangKy.objects.all(),
        source='donDangKy',
        write_only=True
    )

    class Meta:
        model = DonTiem
        fields = ('id', 'nguoiTiem','nguoiTiem_id', 'donDangKy', 'donDangKy_id', 'ngayTiem', 'trangThai')