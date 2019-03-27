from flask import Flask, request
from flask_restful import Api, Resource
import json

app = Flask(__name__)
api = Api(app)

class UserLisfrom flask import Flask, request
from flask_restful import Api, Resource
import json

app = Flask(__name__)
api = Api(app)

class UserList(Resource) :
    def get(self) :
        return 'get method'

    def post(self) :
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        with open('users.json','w') as fp :
            fp.write(json.dumps([r_json]))
            return 'email : {}, pw: {}'.format(email, password)
    def put(self):
        return 'put method'
    def delete(self):
        return 'delete method'

api.add_resource(UserList, '/api/users')

if __name__=='__main__':
    app.run(host='0.0.0.0', port=5012, debug=True)
