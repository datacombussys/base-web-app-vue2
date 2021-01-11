import base64
from django.core.files.base import ContentFile
from uuid import uuid4
from django.db import models
from django.utils import timezone
from django.core.validators import RegexValidator
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
from django.shortcuts import get_object_or_404
from django.core.files.images import ImageFile
from django.apps import apps

from django.shortcuts import get_object_or_404
from django.contrib.auth.models import Group, Permission
from django.core.exceptions import ValidationError
from django.contrib.auth.hashers import is_password_usable, check_password, make_password
from project.settings import base

# User Model Manager
class UserManager(BaseUserManager):

	def make_full_name(self, first_name, last_name):
		return "{} {}".format(first_name, last_name)

	def create_user(self, *args, **kwargs):
		if not kwargs['email']:
			raise ValueError("User must enter a valid email address")
		if not kwargs['password']:
			raise ValueError("Users must have a valid password")
		# print('CreateUser kwargs', kwargs)

		groups_var = kwargs.get('groups', None)
		if groups_var:
			del kwargs['groups']

		user = self.model(**kwargs)
		user.full_name = self.make_full_name(kwargs['first_name'], kwargs['last_name'])
		user.is_active = True
		
		user.set_password(kwargs['password'])
		# userPIN = make_password(kwargs['pin'], salt=None, hasher='default')
		# user.pin = userPIN

		user.save(using=self._db)

		objID = User.objects.get(email=kwargs['email'])
		# print('CreateUser objID', objID)

		#set groups
		if groups_var:
			user.groups.set(groups_var)

		user.save(using=self._db)

		return user


# User Model
class User(AbstractBaseUser):
	email 				= models.EmailField(verbose_name="email", max_length=60, unique=True)
	username 			= models.CharField(max_length=30, unique=True, blank=True, null=True)
	date_added 		= models.DateTimeField(verbose_name="date added", auto_now_add=True)
	date_closed 	= models.DateTimeField(verbose_name="date closed", auto_now_add=False, auto_now=False, blank=True, null=True)
	last_login		= models.DateTimeField(verbose_name="last login", auto_now=True)
	is_superuser	= models.BooleanField(default=False, blank=True, null=True)
	is_admin			= models.BooleanField(default=False, blank=True, null=True)
	is_merchant		= models.BooleanField(default=False, blank=True, null=True)
	is_active			= models.BooleanField(default=True, blank=True, null=True)
	is_staff			= models.BooleanField(default=False, blank=True, null=True)
	full_name 		= models.CharField(max_length=200, blank=True, null=True)
	first_name 		= models.CharField(max_length=100)
	last_name 		= models.CharField(max_length=100)
	mobile_phone 	= models.CharField(max_length=10, null=True, 
									blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
	fax 					= models.CharField(max_length=10, null=True, 
									blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
	address 			= models.CharField(max_length=200, blank=True, null=True)
	address2 			= models.CharField(max_length=200, blank=True, null=True)
	city 					= models.CharField(max_length=200, blank=True, null=True)
	state 				= models.CharField(max_length=50, blank=True, null=True)
	zip_code 			= models.CharField(max_length=5, null=True, 
									blank=True, validators=[RegexValidator(r'^\d{1,5}$')])
	country 			= models.CharField(max_length=200, blank=True, null=True)
	bio 					= models.TextField(blank=True, null=True)
	notes 				= models.TextField(blank=True, null=True)
	global_id 		= models.UUIDField(primary_key=False, default=uuid4, editable=False)
	groups  			= models.ManyToManyField(Group, related_name="user_groups", blank=True)
	ssn           = models.CharField(max_length=9, null=True, 
											blank=True, validators=[RegexValidator(r'^\d{1,9}$')])
	dob           = models.DateField(auto_now=False, auto_now_add=False, null=True, blank=True)
	
	class Meta:
		ordering = ['last_name', 'first_name', 'date_added']
	
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['first_name', 'last_name']

	objects	= UserManager()

	def __str__(self):
		return str(self.email)

	def get_fullname(self):
		return str(self.full_name)
