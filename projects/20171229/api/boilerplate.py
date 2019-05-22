from flask import Flask, request
from flask_restful import Api, Resource

app = Flask(__name__)

api = Api(app)
db.init_app(app)

class UserList(Resource):
    def get_users(self):

        return ''

    def get(self):
        
        return ''

api.add_resource(UserList, '/api/users')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5003, debug=True)
