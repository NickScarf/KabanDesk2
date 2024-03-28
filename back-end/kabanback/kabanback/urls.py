"""
URL configuration for kabanback project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from kabandesk import views


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/task/get_by_status/<int:user_id>/<int:status>', views.task_get_all_by_status, name='task_get_all_by_status'),
    path('api/task/get/<int:key>', views.task_get, name='task_get'),
    path('api/task/add/',views.task_create ,name='task_create'),
    path('api/task/update/<int:key>/',views.task_update ,name='task_update'),
    path('api/task/delete/<int:key>/',views.task_delete ,name='task_delete'),


]
