from flask import Flask, request
from flask_restful import Api, Resource
import json
import os 

app = Flask(__name__)
api = Api(app)

class UserList(Resource) :
    def get(self) :
        return 'get method'

    def post(self) :
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        r = []
        if os.path.exists('users.json'):
            with open('users.json','r') as fp :
                r=json.loads(fp.read())
        for d in r:
            if email == d['email'] :
                return '{} is aleady exists'.format(email)
        else :
            r.append(r_json)
            with open('users.json','w') as fp :
                fp.write(json.dumps([r_json]))
            return 'email : {}, password : {}, users: {}'.format(email, password, r)

    def put(self) :
        return 'put method'

    def delete(self) :
        return 'delete method'

api.add_resource(UserList, '/api/users')

if __name__=='__main__':
    app.run(host='0.0.0.0', port=5012, debug=True)

