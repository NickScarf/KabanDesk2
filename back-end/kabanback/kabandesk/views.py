from django.shortcuts import render
from .models import Task, User
from .serializers import TaskSerializer, UserSerializer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.renderers import JSONRenderer

@api_view(['GET'])
def task_get_all_by_status(request,user_id,status):
    objects = Task.objects.filter(owner=user_id,status=status)
    serializer = TaskSerializer(objects, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def task_get_all_by_user_id(request,user_id):
    objects = Task.objects.filter(owner=user_id)
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

@api_view(['PUT'])
def task_status_increase(request,key):
    try:
        object = Task.objects.get(pk=key)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if object.state < 3:
        object.state += 1

    object.save()
    return Response(object.state)


@api_view(['PUT'])
def task_status_decrease(request, key):
    try:
        object = Task.objects.get(pk=key)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if object.state > 0:
        object.state -= 1

    object.save()
    return Response(object.state)



@api_view(['PUT'])
def task_update(request,key):
    try:
        object = Task.objects.get(pk=key)
    except Task.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = TaskSerializer(object,data=request.data,partial=True)
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

@api_view(['GET'])
def user_validate(request,username,password):
    try:
        object = User.objects.filter(username=username,password=password)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    serializer = UserSerializer(object,many=True)
    if (len(JSONRenderer().render(serializer.data)) > 2):
        return Response(serializer.data)
    else:
        return Response(status=status.HTTP_204_NO_CONTENT)
