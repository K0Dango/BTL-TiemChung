from django.contrib import admin
from .models import User

class UserAdmin(admin.ModelAdmin):
    list_display = [field.name for field in User._meta.fields]
    list_filter = ['id', 'name', 'email', 'created_at']
    search_fields = ['name', 'email']

    



admin.site.register(User, UserAdmin)

# Register your models here.
