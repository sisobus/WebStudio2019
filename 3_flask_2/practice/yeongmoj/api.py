from flask import Flask, request
from flask_restful import Api, Resource
import json
import os

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
        r.append(r_json)
        with open('users.json', 'w') as fp:
            fp.write(json.dumps(r))
        return 'email: {}, pw: {}'.format(email, password)

    def put(self):
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        r = []
        if os.path.exists('users.json') :
            with open('users.json', 'r') as fp :
                r = json.loads(fp.read())
        isModified = False
        for d in r:
            if email == d['email'] :
                d['password'] = password
                isModified = True
        if isModified : 
            print(r)
            with open('users.json', 'w') as fp :
                fp.write(json.dumps(r))
            return 'email : {}\'s password is updated'.format(email)
        return 'email failed'

    def delete(self):
        r_json = request.get_json()
        email = r_json['email']
        r = []
        if os.path.exists('users.json') :
            with open('users.json', 'r') as fp :
                r = json.loads(fp.read())
        isDeleted = False
        i = -1
        for d in r:
            i = i+1
            if email == d['email'] : 
                isDeleted = True
        if isDeleted :
            del(r[i])
            with open('users.json', 'w') as fp :
                fp.write(json.dumps(r))
            return 'email : {} is deleted'.format(email)
        return 'delete failed'

api.add_resource(UserList, '/api/users')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5004, debug=True)
