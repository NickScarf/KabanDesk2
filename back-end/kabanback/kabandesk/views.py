from django.shortcuts import render
from .models import Task, User
from .serializers import TaskSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET'])
def task_get_all_by_status(request,user_id,status):
    objects = Task.objects.get(owner=user_id,status=status)
    serializer = TaskSerializer(objects, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def task_get(request,key):
    object = Task.objects.get(pk=key)
    serializer = TaskSerializer(object)
    return Response(serializer.data)

@api_view(['POST'])
def task_create(request):
    serializer = TaskSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def task_state_increase(request,key):
    try:
        object = Task.objects.get(pk=key)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if object.data['state'] < 3:
        object.data['state'] += 1

    serializer = TaskSerializer(object)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data['state'])
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def task_state_decrease(request, key):
    try:
        object = Task.objects.get(pk=key)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if object.data['state'] > 0:
        object.data['state'] -= 1

    serializer = TaskSerializer(object)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data['state'])
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)



@api_view(['PUT'])
def task_update(request,key):
    try:
        object = Task.objects.get(pk=key)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TaskSerializer(object,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def task_delete(request,key):
    try:
        object = Task.objects.get(pk=key)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    object.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def user_get(request,key):
    object = User.objects.get(pk=key)
    serializer = UserSerializer(object)
    return Response(serializer.data)

