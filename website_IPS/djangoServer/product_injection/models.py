from django.db import models

# Create your models here.
class Product(models.Model):
    barcode = models.CharField(max_length=20)
    type = models.CharField(max_length=100)
    product_name = models.CharField(max_length=100)
    price_main = models.FloatField()
    price1 = models.CharField(max_length=100)
    price2 = models.CharField(max_length=100)
    price3 = models.CharField(max_length=100)
    quantity = models.IntegerField()
    expired_day = models.DateField()

    class Meta:
        managed = False
        db_table = 'product'

    def __str__(self):
        return self.barcode