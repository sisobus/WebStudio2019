from flask import request
from flask_restful import Resource
import json, os
import bcrypt
import utils

class UserList(Resource):
    def get(self):
        if not os.path.exists('users.json'):
            return 'users.json is not exists'
        with open('users.json', 'r') as fp:
            users = json.load(fp)

        repr_str = ''
        for user in users: # users 리스트를 순회하며 user 정보 가져와 스트링으로 쌓는다
            email = user['email']
            password = user['password']
            user_id = user['id']
            repr_str += '[id: {}, email: {}, pw: {}]'.format(user_id, email, password)

        return repr_str


    def post(self):
        r_json = request.get_json() # request의 data(json)를 dict 형태로 가져온다
        email = r_json['email']
        password = r_json['password'].encode('utf-8')

        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password,salt)
        r_json['password'] = hashed.decode('utf-8') # hash 된 비밀번호를 저장한다

        users = []
        if os.path.exists('users.json'):
            with open('users.json', 'r') as fp:
                users = json.load(fp)

        for user in users: # 입력받은 자원이 기존 userlist에 존재하는지 검사한다
            if email == user['email']:
                return '{} is aleady exists'.format(email)

        r_json['id'] = utils.get_id(users)
        users.append(r_json) # 새로운 자원을 추가한다
        with open('users.json', 'w') as fp:
            json.dump(users,fp)
        return 'id: {}, email: {}, pw: {}'.format(r_json['id'], email, password.decode('utf-8'))


    def put(self):
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password'].encode('utf-8')

        if os.path.exists('users.json'):
            with open('users.json', 'r') as fp:
                users = json.load(fp)
        else:
            return "user list does not exist!"

        for user in users: # 기존의 유저정보를 순회하며
            if user['email']==email: # 요청 데이터의 이메일과 같은 유저의
                hashed = bcrypt.hashpw(password, bcrypt.gensalt())
                user['password'] = hashed.decode('utf-8') # 패스워드를 업데이트한다
                with open('users.json','w') as fp:
                    json.dump(users,fp)
                return 'password updated'

        return 'email unmatched!' # 일치하는 이메일이 없는 경우


    def delete(self):
        r_json = request.get_json()
        email = r_json['email']
        if os.path.exists('users.json'):
            with open('users.json', 'r') as fp:
                users = json.loads(fp.read())
        else:
            return "user list does not exist!"

        for i,user in enumerate(users):
            if user['email'] == email:
                users.pop(i)
                with open('users.json','w') as fp:
                    json.dump(users,fp)
                return 'user {} is deleted'.format(email)

        return 'email unmatched!'





