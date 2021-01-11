from django.contrib.auth import login as django_login, logout as django_logout
from django.http import Http404
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import is_password_usable, check_password, make_password

from django.contrib.auth.models import Permission, Group
from django.contrib.contenttypes.models import ContentType

from rest_framework.authentication import SessionAuthentication, BasicAuthentication, TokenAuthentication
from rest_framework.permissions import IsAdminUser, IsAuthenticated, AllowAny
from rest_framework.permissions import DjangoModelPermissionsOrAnonReadOnly
from rest_framework.views import APIView
from rest_framework.generics import UpdateAPIView
from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.settings import api_settings
from rest_framework import filters, exceptions, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from .serializers import (UserSerializer, 
                        LoginSerializer,   
                        ChangePasswordSerializer, 
                        ContentTypeSerializer, 
                        BasePermissionSeializer,  
                        BaseGroupSerializer, 
                        UserListSerializer, 
                        UsersGroupsSerializer, )
from .permissions import AdminSuperAdmin
from .models import User


class ContentTypeViewSet(viewsets.ModelViewSet):
  serializer_class = ContentTypeSerializer
  queryset = ContentType.objects.all()

class BasePermissionsViewSet(viewsets.ModelViewSet):
  serializer_class = BasePermissionSeializer
  queryset = Permission.objects.all()

        
class BaseGroupViewSet(viewsets.ModelViewSet):
  serializer_class = BaseGroupSerializer
  queryset = Group.objects.all()


class UserViewset(viewsets.ModelViewSet):
	serializer_class = UserSerializer
	queryset = User.objects.all()
	authentication_classes = (TokenAuthentication, )
	# permission_classes = (IsAuthenticated, AdminSuperAdmin, )
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['first_name', 'email']
	search_fields = ['id', 'email']
	ordering_fields = '__all__'
	ordering = ['id']

class UserListViewset(viewsets.ModelViewSet):
  serializer_class = UserSerializer
  queryset = User.objects.all()

class UserLoginAPIView(ObtainAuthToken):
	"""Handles creating user auth tokens"""
	# renderer_classes = api_settings.DEFAULT_RENDERER_CLASSES

	def post(self, request, *args, **kwargs):
		print('Login request', request)
		print('Login kwargs', kwargs)
		
		serializer = self.serializer_class(data=request.data,
																				context={'request': request})
		serializer.is_valid(raise_exception=True)
		user = serializer.validated_data['user']
		token, created = Token.objects.get_or_create(user=user)

		print('user.__dict__', user.__dict__)

		return Response({
			'token': token.key,
			'id': user.pk,
			'email': user.email,
		})

class UserLogOutAPIView(APIView):
	"""Handles removing user auth tokens"""
	authentication_classes = (TokenAuthentication, )

	def logout(self, request):
		print('request', request)
		print('self', self)
		django_logout(request)
		return Response(status=204)

class ChangePasswordAPI(APIView):
	"""Handles creating user auth tokens for Alternative Login"""
	serializer_class = ChangePasswordSerializer

	def get(self, request):
		return Response({'Message': "Hello There Yall"})

	def put(self, request, *args, **kwargs):
		print('request', request)
		serializer = self.serializer_class(data=request.data,
																				context={'request': request})
		serializer.is_valid(raise_exception=True)
		print('serializer--------', serializer)
		print('serializer.validated_data', serializer.validated_data)
		user = serializer.validated_data['user']
		user.set_password(serializer.validated_data['new_password'])
		user.save()
		
		return Response({
			'user_id': serializer.validated_data['user'].pk,
			'email': serializer.validated_data['user'].email,
		})