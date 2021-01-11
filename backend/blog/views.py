from .models import Blog
from rest_framework import viewsets
from .serializers import BlogSerializer

# Create your views here.
class BlogViewset(viewsets.ModelViewSet):
	# def perform_create(self, serializer):
	# 	serializer.save(created_by=self.request.user)
	queryset = Blog.objects.all()
	serializer_class = BlogSerializer