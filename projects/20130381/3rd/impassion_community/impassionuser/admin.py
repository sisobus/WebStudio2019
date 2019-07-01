from django.contrib import admin
from .models import Impassionuser
# Register your models here.

class ImpassionuserAdmin(admin.ModelAdmin):
    list_display=('username','password')
    
admin.site.register(Impassionuser, ImpassionuserAdmin)
