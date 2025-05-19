from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = [field.name for field in User._meta.fields]
    list_filter = ['id', 'username', 'email', 'password','is_active','date_joined']
    search_fields = ['name', 'email']

    



admin.site.register(User, UserAdmin)

# Register your models here.
