from rest_framework import serializers, exceptions 
from drf_extra_fields.fields import Base64ImageField

from users.serializers import UserListSerializer, UserSerializer
from users.models import User
from merchants.models import Merchant
from merchants.serializers import MerchantSerializer, MerchantListSerializer

from employees.models import Employee


class EmployeeSerializer(serializers.ModelSerializer):
	user_obj = UserSerializer(read_only=True, source='user')
	user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
	merchant_obj = MerchantSerializer(read_only=True, source='merchant')
	merchant = serializers.PrimaryKeyRelatedField(queryset=Merchant.objects.all(), required=False, allow_null=True)
	profile_img = Base64ImageField(required=False, allow_null=True)
	 
	class Meta:
		model = Employee
		fields = ('__all__')

	def create(self, validated_data):
		# print('create validated_data ', validated_data)
		return Employee.objects.create_employee(**validated_data)


class EmployeeListSerializer(serializers.ModelSerializer):
	user_obj = UserListSerializer(read_only=True, source='user')
	user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
	merchant_obj = MerchantListSerializer(read_only=True, source='merchant')
	merchant = serializers.PrimaryKeyRelatedField(queryset=Merchant.objects.all(), required=False, allow_null=True)
	profile_img = Base64ImageField(required=False, allow_null=True)
	 
	class Meta:
		model = Employee
		fields = ['id', 'merchant', 'merchant_obj', 'user', 'user_obj', 'profile_img']

	# def to_representation(self, value):
	# 	data = super().to_representation(value)  
	# 	if data['merchant_obj']:
	# 		merchant_data_serializer = MerchantListSerializer(value.merchant)
	# 		data['merchant'] = merchant_data_serializer.data
		
	# 	return data

