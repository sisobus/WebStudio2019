from flask import Flask
from flask_restful import Api, Resource

app = Flask(__name__)
api = Api(app)

class UserList(Resource):
	def get(self):
		return 'get method'

	def post(self):
		return 'post method'

	def put(self):
		return 'put method'

	def delete(self):
		return 'delete method'

api.add_resource(UserList, '/api/users')

if __name__=='':
	app.run(host='0.0.0.0', port=5000, debug=True)
