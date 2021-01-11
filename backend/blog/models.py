from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User
from project.settings import base

# from employees.models import Employee
# from companies.models import Company
# from datacom.models import Datacom
# from partners.models import Partner

# Create your models here.

class Blog(models.Model):
	# company           = models.ForeignKey(Company, on_delete=models.CASCADE, blank=True, null=True)
	# partner           = models.ForeignKey(Partner, on_delete=models.CASCADE, blank=True, null=True)
	# datacom           = models.ForeignKey(Datacom, on_delete=models.CASCADE, blank=True, null=True)
	# author 						= models.ForeignKey(Employee, on_delete=models.CASCADE)
	title 						= models.CharField(max_length=100, null=False)
	content 					= models.TextField()
	date_posted 			= models.DateTimeField(default=timezone.now)
	last_updated 			= models.DateTimeField(auto_now=True)
	slug 							= models.SlugField(max_length=50)
	blog_title_image 	= models.FileField(upload_to='uploads', blank='True')