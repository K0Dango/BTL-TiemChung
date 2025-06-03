from rest_framework import viewsets, permissions, generics, status
from .models import User, LoaiVaccine, Vaccine, GioHang, NguoiTiem, DonDangKy, DonTiem
from .serializers import UserSerializer, LoaiVaccineSerializer, VaccineSerializer, GioHangSerializer, NguoiTiemSerializer, DonTiemSerializer, DonDangKySerializer 
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes, action
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth.hashers import check_password
from oauth2_provider.contrib.rest_framework import OAuth2Authentication
from rest_framework.pagination import PageNumberPagination


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()  
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, ]


    def get_permissions(self):
        if self.action in ['retrieve', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

@api_view(['GET'])
def check_email(request):
    email  = request.query_params.get('email')
    exits = User.objects.filter(email=email).exists()
    return Response({'exits':exits})


@api_view(['GET'])
def check_sdt(request):
    sdt  = request.query_params.get('sdt')
    exits = User.objects.filter(sdt=sdt).exists()
    return Response({'exits':exits})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    new_password = request.data.get('new_password')
    user.set_password(new_password)
    user.save()
    return Response({"detail": "Đổi mật khẩu thành công."})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
@parser_classes([FormParser, MultiPartParser, JSONParser])
def check_pass(request):
    user = request.user
    old_pass = request.data.get('old_pass')

    if user.check_password(old_pass):
        return Response({'valid': True})
    else:
        return Response({'valid': False})


@api_view(['PATCH'])
@permission_classes([IsAuthenticated])
@parser_classes([MultiPartParser, FormParser, JSONParser])
def update_user_info(request):
    serializer = UserSerializer(request.user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=400)


class LoaiVaccineViewSet(viewsets.ModelViewSet):
    queryset = LoaiVaccine.objects.all()
    serializer_class = LoaiVaccineSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]



class VaccineViewSet(viewsets.ModelViewSet):
    queryset = Vaccine.objects.select_related('loaiVaccine').all()
    serializer_class = VaccineSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    @action(detail=False, methods=['GET'], url_path='loai')
    def locLoaiVaccine(self, request):
        maLoai = request.query_params.get('maLoai')
        vaccine = Vaccine.objects.filter(loaiVaccine_id=maLoai).select_related('loaiVaccine')
        page = self.paginate_queryset(vaccine)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(vaccine, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=["GET"], url_path='tuoi')
    def locTuoiVaccine(self, request):
        tuoi = request.query_params.get('tuoi')
        tuoi = int(tuoi)
        vaccine = Vaccine.objects.filter(loaiVaccine__tuoi=tuoi).select_related('loaiVaccine')

        page = self.paginate_queryset(vaccine)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = self.get_serializer(vaccine, many=True)
        return Response(serializer.data)
    


class GioHangViewSet(viewsets.ModelViewSet):
    queryset = GioHang.objects.all()
    serializer_class = GioHangSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    

    def get_queryset(self):
        return GioHang.objects.filter(user=self.request.user)
    

    def create(self, request, *args, **kwargs):
        user = request.user
        vaccine_id = request.data.get("vaccine_id")
        soLuong = int(request.data.get("soLuong", 1))

        try:
            item, created= GioHang.objects.get_or_create(
                user = user,
                vaccine_id=vaccine_id,
                defaults={'soLuong': soLuong}
            )
            if not created:
                item.soLuong += soLuong
                item.save()
            return Response({'message': "Đã thêm vào giỏ hàng"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

        
class NguoiTiemViewSet(viewsets.ModelViewSet):
    queryset = NguoiTiem.objects.all()
    serializer_class = NguoiTiemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(nguoiTao=self.request.user)

    @action(detail=False, permission_classes=[IsAuthenticated], url_path="my")
    def my_nguoi_tiem(self, request):
        user = request.user
        if not user.is_authenticated:
            return Response([], status=200)

        queryset = NguoiTiem.objects.filter(nguoiTao=user)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class DonTiemViewSet(viewsets.ModelViewSet):  # Trước là DonDangKyViewSet
    queryset = DonTiem.objects.all()
    serializer_class = DonTiemSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_queryset(self):
        return DonTiem.objects.filter(nguoiDangKy=self.request.user).prefetch_related('don_tiem__nguoiTiem', 'vaccine')
        

class DonDangKyViewSet(viewsets.ModelViewSet):  # Trước là DonTiemViewSet
    queryset = DonDangKy.objects.all()
    serializer_class = DonDangKySerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        vaccine_id = request.data.get("vaccine_id")


        if not vaccine_id:
            return Response({"error": "Thiếu vaccine_id"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            vaccine = Vaccine.objects.get(pk=vaccine_id)
        except Vaccine.DoesNotExist:
            return Response({"error": "Vaccine không tồn tại"}, status=status.HTTP_400_BAD_REQUEST)
        
        don_dk = DonDangKy.objects.create(
            vaccine=vaccine,
            nguoiDangKy=request.user
        )

        serializer = self.get_serializer(don_dk)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

