from flask import Flask, request
from flask_restful import Api, Resource
import json
import os

app = Flask(__name__)
api = Api(app)

class UserList(Resource) :
    def get(self) :
        if not os.path.exists('users.json') :
            return 'users.json is not exists'
        with open('users.json','r') as fp:
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
        r_json['id']=0
        idl=[]
        found = False
        r = []
        if os.path.exists('users.json'):
            with open('users.json','r') as fp:
                r = json.loads(fp.read())
        usnum=len(r)
        for d in r :
            if email == d['email'] :
                found = True
            idl.append(d['id'])
        if found : 
            return '{} is aleady exists'.format(email)
        else :
            r_json['id'] = usnum
            if usnum>1:
                r_json['id']=max(idl)+1 
            r.append(r_json)
        with open('users.json','w') as fp :
            fp.write(json.dumps(r))
        return 'email: {}, password: {}, id: {}'.format(email, password,r_json['id'])

    def put(self):
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        r = []
        efound = False
        pfound = False
        if os.path.exists('users.json'):
            with open('users.json','r') as fp:
                r = json.loads(fp.read())
        for d in r :
            if email == d['email'] :
                efound = True
                if password == d['password'] :
                    pfound= True
                d['password'] = str(password)
                with open('users.json','w') as fp:
                    fp.write(json.dumps(r))
        if not efound :
            return '{} is not exist'.format(email)
        if efound and pfound :
            return '{} is already exist'.format(email)
        if efound and not  pfound :
            return '\'{}\' is your new password'.format(password)
        with open('users.json', 'w') as fp:
            fp.write(json.dumps(r))

    def delete(self):
        r_json = request.get_json()
        email = r_json['email']
        r = []
        found = False
        if os.path.exists('users.json'):
            with open('users.json','r') as fp:
                r = json.loads(fp.read())
        new_users = []
        for d in r :
            if email == d['email'] :
                found = True
            else:
                new_users.append(d)
                """
                del d
                with open('users.json','w') as fp:
                    fp.write(json.dumps(r))
                """
        with open('users.json', 'w') as fp:
            fp.write(json.dumps(new_users))
        if found :
            return 'User \'{}\'is deleted'.format(email), r
        if not found :
            return '{} is not exist'.format(email)


api.add_resource(UserList, '/api/users')

if __name__=='__main__':
    app.run(host='0.0.0.0', port=5012, debug=True)
                                                  
