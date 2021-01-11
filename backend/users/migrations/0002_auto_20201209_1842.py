# Generated by Django 3.0.7 on 2020-12-09 18:42

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='zip',
            new_name='zip_code',
        ),
        migrations.RemoveField(
            model_name='user',
            name='pin',
        ),
        migrations.RemoveField(
            model_name='user',
            name='username',
        ),
        migrations.AddField(
            model_name='user',
            name='date_closed',
            field=models.DateTimeField(blank=True, null=True, verbose_name='date closed'),
        ),
        migrations.AddField(
            model_name='user',
            name='dob',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='is_merchant',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='notes',
            field=models.TextField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='user',
            name='ssn',
            field=models.CharField(blank=True, max_length=9, null=True, validators=[django.core.validators.RegexValidator('^\\d{1,9}$')]),
        ),
    ]