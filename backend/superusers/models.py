from django.db import models
from project.settings import base
from django.core.validators import RegexValidator

from users.models import User


class SuperUserManager(models.Manager):
	def create_superuser(self, *args, **kwargs):
		print('create_superuser kwargs', kwargs)
		
		superuser = self.model(**kwargs)
		
		superuser.save(using=self._db)

		#Get User instance and set is_superuser to True
		user = User.objects.get(id=superuser.user.id)
		user.is_superuser = True
		user.is_active = True
		user.save()
		# setattr(superuser.user, 'is_active', True)
		# setattr(superuser.user, 'is_superuser', True)

		return superuser

class SuperUser(models.Model):
	user              = models.OneToOneField(base.AUTH_USER_MODEL, on_delete=models.CASCADE)
	profile_img 		  = models.ImageField(max_length=100, upload_to='superusers/profile/', null=True, blank=True)
	
	objects	= SuperUserManager()

	class Meta:
		ordering = ['user__last_name']

	def __str__(self):
		return str(self.user.full_name)
