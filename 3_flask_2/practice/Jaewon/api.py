from flask import Flask, request
from flask_restful import Api, Resource
import json
import os
import bcrypt

app = Flask(__name__)
api = Api(app)

class UserList(Resource):
    def get(self):
        if not os.path.exists('users.json'):
            return 'users.json is not exists'
        with open('users.json', 'r') as fp:
            r = json.loads(fp.read())
        s = ''
        for d in r:
            email = d['email']
            password = d['password']
            s += '[email: {}, pw: {}]'.format(email, password)
        return s

    def post(self):
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        r = []
        if os.path.exists('users.json'):
            with open('users.json', 'r') as fp:
                r = json.loads(fp.read())
        for d in r:
            if email == d['email']:
                return '{} is aleady exists'.format(email)
        r.append({
            "email": email,
            "password": encrypt(password)
        })
        with open('users.json', 'w') as fp:
            fp.write(json.dumps(r))
        return 'email: {}, pw: {}'.format(email, password)

    def put(self):
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        r = []
        found = False
        if os.path.exists('users.json'):
            with open('users.json', 'r') as fp:
                r = json.loads(fp.read())
        for d in r:
            if email == d['email']:
                d['password'] = encrypt(password)
                found = True
        if found == False:
            return '{} not exists'.format(email)
        with open('users.json', 'w') as fp:
            fp.write(json.dumps(r))
        return 'email: {}, pw: {}'.format(email, password)

    def delete(self):
        r_json = request.get_json()
        email = r_json['email']
        r = []
        found = False
        if os.path.exists('users.json'):
            with open('users.json', 'r') as fp:
                r = json.loads(fp.read())
        for d in r:
            if email == d['email']:
                r.remove(d)
                found = True
        if found == False:
            return '{} not exists'.format(email)
        with open('users.json', 'w') as fp:
            fp.write(json.dumps(r))
        return '{} deleted'.format(email)

api.add_resource(UserList, '/api/users')

def encrypt(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

