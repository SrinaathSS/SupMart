from django.contrib import admin
from .models import Admin, Employee, Customer, Product, Sale

# Register your models here
admin.site.register(Admin)
admin.site.register(Employee)
admin.site.register(Customer)
admin.site.register(Product)
admin.site.register(Sale)