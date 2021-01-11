from django.db import models
from rest_framework import permissions


class AdminSuperAdmin(permissions.BasePermission):
	"""Allow user to edit their own profile"""

	def has_object_permission(self, request, view, obj):
		"""Check to see if user has permission to view/edit own profile"""
		if request.method in permissions.SAFE_METHODS:
			print("is_admin", obj.is_admin)
			if request.user.id == obj.id or request.user.is_superuser:
				return True
			return False

		if request.method in ["POST", "PUT", "PATCH", "DELETE"]:
			if obj.is_admin:
				if request.user.is_superuser == True:
					return True
				else:
					return False
			else:
				return True



