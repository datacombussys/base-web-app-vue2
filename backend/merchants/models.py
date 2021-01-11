from django.db import models
from project.settings import base
from uuid import uuid4
from django.core.validators import RegexValidator
from django.contrib.postgres.fields.jsonb import JSONField
from django.contrib.postgres.fields.array import ArrayField


class Merchant(models.Model):
	name 									= models.CharField(max_length=100)
	date_added 						= models.DateTimeField(verbose_name="date added", auto_now_add=True)
	primary_email 				= models.EmailField(verbose_name="primary_email", max_length=100, blank=True, null=True)
	primary_first_name 		= models.CharField(max_length=100, blank=True, null=True)
	primary_last_name 		= models.CharField(max_length=100, blank=True, null=True)
	primary_phone 				= models.CharField(max_length=10, null=True, 
													blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
	primary_fax 					= models.CharField(max_length=10, null=True, 
													blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
	primary_address 			= models.CharField(max_length=200, blank=True, null=True)
	primary_address2 			= models.CharField(max_length=200, blank=True, null=True)
	primary_city 					= models.CharField(max_length=200, blank=True, null=True)
	primary_state 				= models.CharField(max_length=50, blank=True, null=True)
	primary_zip_code 			= models.CharField(max_length=5, null=True, 
													blank=True, validators=[RegexValidator(r'^\d{1,5}$')])
	primary_country 			= models.CharField(max_length=200, blank=True, null=True)
	billing_email 				= models.EmailField(verbose_name="billing_email", max_length=60, unique=True, blank=True, null=True)
	billing_first_name 		= models.CharField(max_length=100, blank=True, null=True)
	billing_last_name 		= models.CharField(max_length=100, blank=True, null=True)
	billing_phone 				= models.CharField(max_length=10, null=True, 
													blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
	billing_fax 					= models.CharField(max_length=10, null=True, 
													blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
	billing_address 			= models.CharField(max_length=200, blank=True, null=True)
	billing_address2 			= models.CharField(max_length=200, blank=True, null=True)
	billing_city 					= models.CharField(max_length=200, blank=True, null=True)
	billing_state 				= models.CharField(max_length=50, blank=True, null=True)
	billing_zip_code 			= models.CharField(max_length=5, null=True, 
													blank=True, validators=[RegexValidator(r'^\d{1,5}$')])
	billing_country 			= models.CharField(max_length=200, blank=True, null=True)
	shipping_email 				= models.EmailField(verbose_name="shipping_email", max_length=60, unique=True, blank=True, null=True)
	shipping_first_name 	= models.CharField(max_length=100, blank=True, null=True)
	shipping_last_name 		= models.CharField(max_length=100, blank=True, null=True)
	shipping_phone 				= models.CharField(max_length=10, null=True, 
													blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
	shipping_fax 					= models.CharField(max_length=10, null=True, 
													blank=True, validators=[RegexValidator(r'^\d{1,10}$')])
	shipping_address 			= models.CharField(max_length=200, blank=True, null=True)
	shipping_address2 		= models.CharField(max_length=200, blank=True, null=True)
	shipping_city 				= models.CharField(max_length=200, blank=True, null=True)
	shipping_state 				= models.CharField(max_length=50, blank=True, null=True)
	shipping_zip_code 		= models.CharField(max_length=5, null=True, 
													blank=True, validators=[RegexValidator(r'^\d{1,5}$')])
	shipping_country 			= models.CharField(max_length=200, blank=True, null=True)
	description 					= models.TextField(blank=True, null=True)
	notes 								= models.TextField(blank=True, null=True)
	is_active 						= models.BooleanField(default=True, blank=True, null=True)
	global_id 						= models.UUIDField(primary_key=False, default=uuid4, editable=False)
	profile_img 		  		= models.ImageField(max_length=100, upload_to='merchant/profile/', null=True, blank=True)
	logo 		  						= models.ImageField(max_length=100, upload_to='merchant/logo/', null=True, blank=True)

	class Meta:
		ordering = ['name', 'date_added']

	def __str__(self):
		return str(self.name)

class EmailSettings(models.Model):
	merchant 				= models.ForeignKey(Merchant, on_delete=models.CASCADE)
	host 						= models.CharField(max_length=100)
	port 						= models.IntegerField()
	ssl 						= models.BooleanField(default=False)
	tls 						= models.BooleanField(default=False)
	username 				= models.CharField(max_length=100)
	password 				= models.CharField(max_length=100)

	class Meta:
		ordering = ['id']

	def __str__(self):
		return str(self.username)

class EmailTemplate(models.Model):
	merchant 						= models.ForeignKey(Merchant, on_delete=models.CASCADE)
	title 							= models.CharField(max_length=100)
	subject 						= models.CharField(max_length=100)
	date_added 					= models.DateTimeField(verbose_name="date added", auto_now_add=True)
	body 		  					= models.FileField(max_length=100, upload_to='merchant/email/templates/', null=True, blank=True)

	class Meta:
		ordering = ['title', 'date_added']

	def __str__(self):
		return str(self.title)
