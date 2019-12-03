from django.shortcuts import render
from django.http import HttpResponse
from .models import User
from django.views.decorators.csrf import csrf_exempt

import json

@csrf_exempt 
def index(request, *arg, **kwarg):
    # u1 = User.objects.filter(email='aaa@gmail.com').update(password='123456')
    # print(u)
    # if (u):
    #     print("HAVE!")
    print(request.body)
    if request.method == "POST":
        obj = json.loads(request.body.decode('utf-8'))
        # print(obj["email"])
        # print(obj["password"])
        try:
            u = User.objects.filter(email=obj["email"], password=obj["password"])
            print(u)
            if (u):
                return HttpResponse("1")
            else:
                return HttpResponse("0")
        except:
            return HttpResponse("0")
        print(request.user)
    return HttpResponse("Authentication")

    ## ####### ####  HttpResponse(json.dumps(response_data), content_type="application/json")