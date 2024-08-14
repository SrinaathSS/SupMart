from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AdminViewSet, EmployeeViewSet, CustomerViewSet, ProductViewSet, SaleViewSet

router = DefaultRouter()
router.register(r'admins', AdminViewSet)
router.register(r'employees', EmployeeViewSet)
router.register(r'customers', CustomerViewSet)
router.register(r'products', ProductViewSet)
router.register(r'sales', SaleViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
