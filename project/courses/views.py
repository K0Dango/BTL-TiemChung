from rest_framework import viewsets, permissions, generics, status
from .models import User, LoaiVaccine, Vaccine, GioHang
from .serializers import UserSerializer, LoaiVaccineSerializer, VaccineSerializer, GioHangSerializer
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
        return Response(serializer.data)
    


class GioHangViewSet(viewsets.ModelViewSet):
    queryset = GioHang.objects.all()
    serializer_class = GioHangSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    

    def get_queryset(self):
        return GioHang.objects.filter(maUser = self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(maUser=self.request.user)
