from django import forms
from .models import Impassionuser 
from django.contrib.auth.hashers import check_password

class LoginForm(forms.Form):
    useremail=forms.CharField(
        error_messages={
            'required': '이메일을 입력해주세요.'
        },
        max_length=64, label="사용자 이메일")
    password=forms.CharField(
            error_messages={
            'required': '비밀번호를 입력해주세요.'
        },
        widget=forms.PasswordInput, label="비밀번호")  

    def clean(self):
        cleaned_data = super().clean()
        useremail = cleaned_data.get('useremail')
        password = cleaned_data.get('password')

        if useremail and password:
            try:
                impassionuser = Impassionuser.objects.get(useremail=useremail)
            except Impassionuser.DoesNotExist:
                self.add_error('useremail', '계정이 존재하지 않습니다')
                return
            impassionuser = Impassionuser.objects.get(useremail=useremail)
            if not check_password(password, impassionuser.password):
                self.add_error('password', '비밀번호를 틀렸습니다.')
            else:
                self.useremail=impassionuser.useremail
