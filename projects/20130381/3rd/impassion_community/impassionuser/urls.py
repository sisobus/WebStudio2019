from django.urls import path
from .import views

urlpatterns = [
    path('about_us/', views.about_us),
    path('open_session/', views.open_session),
    path('register/', views.register),
    path('login/', views.login),
    path('logout/', views.logout),
    path('', views.home),
]