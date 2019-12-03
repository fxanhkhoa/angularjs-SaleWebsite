from django.shortcuts import render
from django.http import HttpResponse

def homepage_view(request, *arg, **kwarg):
    return render(request, 'homepage.html', {})