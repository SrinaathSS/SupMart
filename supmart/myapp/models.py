from django.db import models

# Admin model
class Admin(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

    def __str__(self):
        return self.username

# Employee model
class Employee(models.Model):
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    contact_number = models.CharField(max_length=15)
    role = models.CharField(max_length=100)

    def __str__(self):
        return self.username

# Customer model
class Customer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    mobile = models.CharField(max_length=15)
    address = models.CharField(max_length=255)
    purchase_details = models.CharField(max_length=255)
    last_purchase_date = models.DateField()
    total_spent = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.name

# Product model
class Product(models.Model):
    name = models.CharField(max_length=100)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.CharField(max_length=255, default='Unknown')

    def __str__(self):
        return self.name

# Sales model
class Sale(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity_sold = models.IntegerField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.product.name} - {self.quantity_sold} units"
