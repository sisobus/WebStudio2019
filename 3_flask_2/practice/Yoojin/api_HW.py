from flask import Flask, request
from flask_restful import Api, Resource
import json
import os

app = Flask(__name__)
api = Api(app)

class UserList(Resource) :
    def get(self) :
        if not os.path.exists('users_2.json') :
            return 'users_2.json is not exists'
        with open('users_2.json','r') as fp:
            r = json.loads(fp.read())
        s = ""
        for d in r :
            email = d['email']
            password = d['password']
            s +='[email: {}, password: {}]'.format(email, password)
        return s
    def post(self):
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        r = []
        if os.path.exists('users_2.json'):
            with open('users_2.json','r') as fp:
                r = json.loads(fp.read())
        for d in r :
            if email == d['email'] :
                return '{} is aleady exists'.format(email)
        r.append(r_json)
        with open('users_2.json','w') as fp :
            fp.write(json.dumps(r))
        return 'email: {}, password: {}'.format(email, password)

    def put(self):
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        r = []
        if os.path.exists('users_2.json'):
            with open('users_2.json','r') as fp:
                r = json.loads(fp.read())
        for d in r :
            if email == d['email'] :
                if password == d['password'] :
                    return '{} is aleady exists'.format(email)
                else :
                   d['password'] = password
                   with open('users_2.json','w') as fp:
                       fp.write(json.dumps(r))
                   return 'password is changed, password: {}'.format(password)
            else :
                r.append(r_json)
                with open('users_2.json','w') as fp :
                    fp.write(json.dumps(r))
                return 'new user, email: {}, password: {}'.format(email, password)

    def delete(self):
        r_json = request.get_json()
        email = r_json['email']
        r = []
        if os.path.exists('users_2.json'):
            with open('users_2.json','r') as fp:
                r = json.loads(fp.read())
        for d in r :
            if email == d['email'] :
                r.enumerate(r_json)
                with open('users_2.json','w') as fp:
                    fp.write(json.dumps(r))
                return 'User \'{}\'is deleted'.format(email)

api.add_resource(UserList, '/api/users')

if __name__=='__main__':
    app.run(host='0.0.0.0', port=5012, debug=True)
                                                   
