from django.shortcuts import render
from django.http import HttpResponse
from django.core import serializers
from .models import Product
from django.views.decorators.csrf import csrf_exempt
import dateutil.parser

import json

@csrf_exempt 
def product_injection(request):
    if request.method == "POST":
        obj = json.loads(request.body.decode('utf-8'))
        # print(obj)
        if (obj['request'] == 'add'):
            ufind = Product.objects.filter(barcode=obj["barcode"])
            if (ufind):
                # print("Có")
                return HttpResponse("Sản phẩm đã tồn tại!") #fail signal response
            else:
                # print("Không")
                try:
                    print(obj['expired_day'])
                    temp_date = dateutil.parser.parse(obj['expired_day'])
                    print(temp_date)
                    u = Product(
                        barcode = obj['barcode'],
                        type = obj['type'],
                        product_name = obj['product_name'],
                        price_main = obj['price_main'],
                        price1 = obj['price1'],
                        price2 = obj['price2'],
                        price3 = obj['price3'],
                        quantity = obj['quantity'],
                        expired_day = temp_date
                    )
                    u.save()
                    return HttpResponse("1")
                except Exception as e:
                    print(e)
                    return HttpResponse("Lỗi: không thêm được")
        elif (obj['request'] == 'find_with_barcode'):
            try:
                u = Product.objects.filter(barcode = obj['barcode'])
                item_json = serializers.serialize('json', u)
                return HttpResponse(item_json, content_type='application/json')
            except Exception as e:
                print(e)
                return HttpResponse("0")
        elif (obj['request'] == 'find_number_product'):
            try:
                page_num = int(obj["number_product"], 10)
                quantity = obj["quantity"]
                from_num = (page_num -1 ) * (quantity)
                to_num = ((page_num -1 ) * (quantity) + quantity)
                if to_num > Product.objects.count():
                    to_num = Product.objects.count()
                print(from_num, to_num)
                items = Product.objects.all()[from_num : to_num]
                items_json = serializers.serialize('json', items)
                print(items_json)
                return HttpResponse(items_json, content_type='application/json')
            except Exception as e:
                print(e)
        elif (obj['request'] == 'count_page'):
            try:
                count = Product.objects.count() / obj["quantity"]
                if (Product.objects.count() % obj["quantity"] > 0):
                    count = int(count + 1)
                return HttpResponse(count)
            except Exception as e:
                print(e)
        elif (obj['request'] == 'modify'):
            try:
                temp_date = dateutil.parser.parse(obj['expired_day'])
                u = Product.objects.get(barcode = obj['barcode'])
                
                u.type = obj['type']
                u.product_name = obj['product_name']
                u.price_main = obj['price_main']
                u.price1 = obj['price1']
                u.price2 = obj['price2']
                u.price3 = obj['price3']
                u.quantity = obj['quantity']
                u.expired_day = temp_date

                u.save()
                
                return HttpResponse("1")
            except Exception as e:
                print(e)
                return HttpResponse("0")
        elif (obj['request'] == 'remove_with_barcode'):
            try:
                Product.objects.filter(barcode = obj['barcode']).delete()
                return HttpResponse("1")
            except Exception as e:
                print(e)
                return HttpResponse("0")
    return HttpResponse("product") 
