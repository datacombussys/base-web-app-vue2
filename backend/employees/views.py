from rest_framework import status, filters, exceptions, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from employees.serializers import EmployeeSerializer, EmployeeListSerializer
from employees.models import Employee

class EmployeeViewset(viewsets.ModelViewSet):
	serializer_class = EmployeeSerializer
	queryset = Employee.objects.all()
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['id', 'user__id']
	search_fields = ['id', 'user__id']
	ordering_fields = ['id']
	ordering = ['-id']
		
class EmployeeListViewset(viewsets.ModelViewSet):
	serializer_class = EmployeeListSerializer
	queryset = Employee.objects.all()
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['id', 'vendor']
	search_fields = ['id', 'vendor']
	ordering_fields = ['id']
	ordering = ['-id']
	
