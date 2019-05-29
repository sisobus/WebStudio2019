from flask import Flask, request
from flaks_restful import Api, Resource
import json
import os
from data import db, User
from socket import MySocketIO

basedir = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, app.db)
app = Flask(__name__)
app.config.update({
		'SQLALCHEMY_TRACK_MODIFICATIONS' : True,
		"SQLALCHEMY_DATABASE_URI" : SQLALCHEMY_DATABASE_URI,
		})
api = Api(app)
db.init_app(app)
socketio = MySocketIO(app)


class Userlist(Resource):
	
	def get(self):
		users = User.query.all()
		return users

	def post(self):
		r_json = request.get_json()
		email = r_json['email']
		nickname = r_json['nickname']
		password = r_json['password']
		user = User.query.filter_by(email=email).first()
		if user:
			return '{} is aleady exists'.format(email)
		new_user = User(email,nickname, password)
		db.session.add(new_user)
		db.session.commit()
		return 'your account is successsfully updated'

	def delete(self):
		r_json = request.get_json()
		_id = r_json['id']
		db.session.delete(user)
		db.session.commit()
		return 'your account has been deleted'

if __name__ == '__main__':
	with app.app_context():
		db.create_all()
	socketio.run(app)
