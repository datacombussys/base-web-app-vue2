from django.db import models
from project.settings import base
from django.core.validators import RegexValidator
from django.contrib.postgres.fields.jsonb import JSONField

from users.models import User
from merchants.models import Merchant


class EmployeeManager(models.Manager):
	def create_employee(self, **kwargs):

		employee = self.model(**kwargs)
		employee.save(using=self._db)

		#Get User instance and set is_admin to True
		user = User.objects.get(id=employee.user.id)
		user.is_merchant = True
		user.is_active = True

		user.save()

		return employee



class Employee(models.Model):
	user              = models.OneToOneField(base.AUTH_USER_MODEL, on_delete=models.CASCADE)
	merchant 					= models.ForeignKey(Merchant, on_delete=models.CASCADE, blank=True, null=True)
	profile_img 		  = models.ImageField(max_length=100, upload_to='employees/profile/', null=True, blank=True)

	objects = EmployeeManager()

	class Meta:
		ordering = ['user__last_name']

	def __str__(self):
		return str(self.user.full_name)