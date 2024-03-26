from django.shortcuts import render
from .models import Table, Task, User
from .serializers import TableSerializer, TaskSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status


@api_view(['GET'])
def task_get_all_by_id(request,user_id):
    objects = Task.objects.get(owner=user_id)
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
def table_get_by_id(request,key):
    object = Table.objects.get(pk=key)
    serializer = TableSerializer(object)
    return Response(serializer.data)

@api_view(['GET'])
def table_get_by_user(request,key):
    object = Table.objects.get(owner=key)
    serializer = TableSerializer(object)
    return Response(serializer.data)

@api_view(['POST'])
def table_create(request):
    serializer = TableSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def table_delete(request,key):
    try:
        object = Table.objects.get(pk=key)
    except Table.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    object.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

