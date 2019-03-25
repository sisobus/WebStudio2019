from flask import Flask
from flask_restful import Api
from userlist import UserList

app = Flask(__name__)
api = Api(app)

api.add_resource(UserList, '/api/users')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
