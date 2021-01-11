from rest_framework import serializers

from blog.models import Blog


# from datacom.models import Datacom
# from partners.models import Partner
# from companies.models import Company
# from employees.models import Employee


class BlogSerializer(serializers.ModelSerializer):
    # datacom = serializers.PrimaryKeyRelatedField(queryset=Datacom.objects.all(), required=False, allow_null=True)
    # partner = serializers.PrimaryKeyRelatedField(queryset=Partner.objects.all(), required=False, allow_null=True)
    # company = serializers.PrimaryKeyRelatedField(queryset=Company.objects.all(), required=False, allow_null=True)
    # employee = serializers.PrimaryKeyRelatedField(queryset=Employee.objects.all(), required=False, allow_null=True)
    
    class Meta:
        model = Blog
        fields = ['__all__']