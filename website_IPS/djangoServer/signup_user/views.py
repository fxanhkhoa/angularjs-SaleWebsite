from django.shortcuts import render
from django.http import HttpResponse
from authenticate_user.models import User
from django.views.decorators.csrf import csrf_exempt

import json

@csrf_exempt 
def signup(request):
    if request.method == "POST":
        obj = json.loads(request.body.decode('utf-8'))
        try:
            ufind = User.objects.filter(email=obj["email"])
            if (ufind):
                return HttpResponse("0") 
            u = User(email = obj["email"], password = obj["password"], role = obj["role"], name = obj["name"])
            u.save()
            return HttpResponse("1")
        except:
            return HttpResponse("0") 
    return HttpResponse("Sign up") 
