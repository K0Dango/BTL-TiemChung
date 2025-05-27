from rest_framework import viewsets, permissions, generics, status
from .models import User, LoaiVaccine, Vaccine
from .serializers import UserSerializer, LoaiVaccineSerializer, VaccineSerializer
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from django.contrib.auth.hashers import check_password
from oauth2_provider.contrib.rest_framework import OAuth2Authentication


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
    queryset = Vaccine.objects.select_related('loai_vaccine').all()
    serializer_class = VaccineSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]