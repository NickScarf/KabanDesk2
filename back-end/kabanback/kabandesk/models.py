from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.models import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(db_index=True, unique=True, max_length=15)
    email = models.EmailField(db_index=True, unique=True,default='')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    #created_at = models.DateTimeField(auto_now_add=True)
    #updated_at = models.DateTimeField(auto_now=True)

    USERNAME_FIELD = 'username'
    objects = UserManager()

class Task(models.Model):
    description = models.CharField(max_length=50)
    owner = models.ForeignKey('User',on_delete=models.PROTECT,default=0)
    start_time = models.CharField(max_length=12)
    end_time = models.CharField(max_length=12)
    state = models.IntegerField(default=0)

