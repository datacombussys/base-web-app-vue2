from rest_framework import serializers, exceptions 
from drf_extra_fields.fields import Base64ImageField

from users.serializers import UserListSerializer, UserSerializer
from users.models import User

from superusers.models import SuperUser

class SuperUserSerializer(serializers.ModelSerializer):
	user_obj = UserSerializer(read_only=True, source='user')
	user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
	profile_img = Base64ImageField(required=False, allow_null=True)
	 
	class Meta:
		model = SuperUser
		fields = ('__all__')
	
	def create(self, validated_data):
		print('validated_data', validated_data)
		return SuperUser.objects.create_superuser(**validated_data) 

class SuperUserListSerializer(serializers.ModelSerializer):
	user_obj = UserListSerializer(read_only=True, source='user')
	user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all(), required=False, allow_null=True)
	profile_img = Base64ImageField(required=False, allow_null=True)
	 
	class Meta:
		model = SuperUser
		fields = ('__all__')
