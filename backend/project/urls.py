from django.contrib import admin
from django.urls import path
from django.conf.urls import re_path, include
from rest_framework import routers
from django.conf.urls.static import static
import project.settings.base as settings

from users.views import (UserViewset, 
                        UserListViewset, 
                        UserLoginAPIView, 
                        UserLogOutAPIView, )

router = routers.DefaultRouter()

router.register(r'django/users', UserViewset, basename="users-profile")
router.register(r'django/users-list', UserListViewset, basename="users-list")

urlpatterns = [
    re_path(r'^admin/', admin.site.urls),

    #Login & Logout
    path('django/login/', UserLoginAPIView.as_view(), name='login'),
		path('django/logout/', UserLogOutAPIView.as_view(), name='logout'),    

    #Registered Router APIView Routes
    path('', include(router.urls)),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
