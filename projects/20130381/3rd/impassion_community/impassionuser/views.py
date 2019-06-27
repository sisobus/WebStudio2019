from django.shortcuts import render, redirect
from .models import Impassionuser
from django.http import HttpResponse
from django.contrib.auth.hashers import make_password, check_password
from .forms import LoginForm

# Create your views here.
def home(request):
    return render(request, 'home.html')

def about_us(request):
    return render(request, 'about_us.html')


def open_session(request):
    return render(request, 'open_session.html')


def login(request):
    if request.method =='POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            impassionuser = Impassionuser.objects.get(useremail=form.useremail)
            request.session['user']= impassionuser.id
            return redirect('/')
    else:
        form=LoginForm()

    return render(request, 'login.html', {'form': form})

def logout(request):
    if request.session.get('user'):
        del(request.session['user'])
    return redirect('/')

def register(request):
    if request.method == 'GET':
        return render(request, 'register.html')
    elif request.method == 'POST':
        username = request.POST.get('username', None)
        useremail = request.POST.get('useremail', None)
        password = request.POST.get('password', None)
        re_password = request.POST.get('re-password', None)
        cardinal_number=request.POST.get('cardinal_number', None)

        res_data={}

        if not (username and useremail and password and re_password and cardinal_number):
            res_data['error'] = '모든 값을 입력해야합니다.'
        elif password != re_password:
            res_data['error'] = '비밀번호가 다릅니다.' 
        else:
            impassionuser = Impassionuser(
                username=username,
                useremail=useremail,
                password=make_password(password),
                cardinal_number=cardinal_number
            )

            impassionuser.save()


        return render(request, 'register.html', res_data)
    
