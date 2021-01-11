from rest_framework import status, filters, exceptions, viewsets
from django_filters.rest_framework import DjangoFilterBackend

from merchants.serializers import (MerchantSerializer, 
																	MerchantListSerializer, 
																	EmailSettingsSerializer, 
																	EmailTemplateSerializer, )	

from merchants.models import Merchant, EmailSettings ,EmailTemplate

class MerchantViewset(viewsets.ModelViewSet):
	serializer_class = MerchantSerializer
	queryset = Merchant.objects.all().order_by('-id')
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['id']
	search_fields = ['id']
	ordering_fields = ['id']
	ordering = ['id']
		
class MerchantListViewset(viewsets.ModelViewSet):
	serializer_class = MerchantListSerializer
	queryset = Merchant.objects.all().order_by('-id')
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['id']
	search_fields = ['id']
	ordering_fields = ['id']
	ordering = ['id']


class EmailSettingsViewset(viewsets.ModelViewSet):
	serializer_class = EmailSettingsSerializer
	queryset = EmailSettings.objects.all().order_by('-id')
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['id']
	search_fields = ['id']
	ordering_fields = ['id']
	ordering = ['id']


class EmailTemplateViewset(viewsets.ModelViewSet):
	serializer_class = EmailTemplateSerializer
	queryset = EmailTemplate.objects.all().order_by('-id')
	filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
	filterset_fields = ['id']
	search_fields = ['id']
	ordering_fields = ['id']
	ordering = ['id']



