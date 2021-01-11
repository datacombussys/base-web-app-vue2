from rest_framework import status, filters, exceptions, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from superusers.serializers import SuperUserSerializer, SuperUserListSerializer
from superusers.models import SuperUser

class SuperUserViewset(viewsets.ModelViewSet):
	serializer_class = SuperUserSerializer
	queryset = SuperUser.objects.all()
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['id', 'user']
	search_fields = ['id', 'user']
	ordering_fields = ['id']
	ordering = ['id']
		
class SuperUserListViewset(viewsets.ModelViewSet):
	serializer_class = SuperUserListSerializer
	queryset = SuperUser.objects.all()
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['id']
	search_fields = ['id']
	ordering_fields = ['id']
	ordering = ['id']
