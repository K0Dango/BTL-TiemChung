from rest_framework import viewsets, permissions, generics, status
from .models import User
from .serializers import UserSerializer
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.decorators import api_view


class UserViewSet(viewsets.ViewSet, generics.CreateAPIView, generics.RetrieveAPIView):
    queryset = User.objects.all()  
    serializer_class = UserSerializer
    # parser_classes = [MultiPartParser, ]
    # permission_classes = [permissions.AllowAny]

    # def get_permissions(self):
    #     if self.action == 'retrieve':
    #         return[permissions.IsAuthenticated()]
    #     return [permissions.AllowAny]

@api_view(['GET'])
def check_email(request):
    email  = request.query_params.get('email')
    exits = User.objects.filter(email=email).exists()
    return Response({'exits':exits})