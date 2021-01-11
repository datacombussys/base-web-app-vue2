from rest_framework import serializers, exceptions 
from drf_extra_fields.fields import Base64ImageField
# from project.base64 import Base64ImageField
import re

from users.serializers import UserListSerializer, UserSerializer
from users.models import User
 
from merchants.models import Merchant, EmailSettings, EmailTemplate

class MerchantSerializer(serializers.ModelSerializer):
	profile_img = Base64ImageField(required=False, allow_null=True)
	logo = Base64ImageField(required=False, allow_null=True)
	 
	class Meta:
		model = Merchant
		fields = ('__all__')

class MerchantListSerializer(serializers.ModelSerializer):
	profile_img = Base64ImageField(required=False)
	logo = Base64ImageField(required=False)
	 
	class Meta:
		model = Merchant
		fields = ['id', 'name', 'date_added', 'primary_city', 'primary_state', 'profile_img', 'logo', 'global_id', 'is_active']

class EmailSettingsSerializer(serializers.ModelSerializer):
	merchant_obj = MerchantListSerializer(read_only=True, source='merchant')
	merchant = serializers.PrimaryKeyRelatedField(queryset=Merchant.objects.all(), required=False, allow_null=True)
	 
	class Meta:
		model = EmailSettings
		fields = ('__all__')

class EmailTemplateSerializer(serializers.ModelSerializer):
	merchant_obj = MerchantListSerializer(read_only=True, source='merchant')
	merchant = serializers.PrimaryKeyRelatedField(queryset=Merchant.objects.all(), required=False, allow_null=True)
	 
	class Meta:
		model = EmailTemplate
		fields = ('__all__')


