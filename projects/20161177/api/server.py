from flask import Flask, request, jsonify, abort
from flask_restful import Api, Resource
from flask_cors import CORS
from flask_jwt_extended import (
	JWTManager, create_access_token, create_refresh_token,
	jwt_required, jwt_refresh_token_required,get_jwt_identity,
	get_jti, get_raw_jwt)
from datetime import timedelta
import json
import os
from data import db, User, LoginSession
from flask_socketio import SocketIO, emit
# from MySocket import MySocketIO

basedir = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
app = Flask(__name__)
cors = CORS(app)
#cors = CORS(app,resources={r"/*":{"origins":"*"}})
app.config.update({
		'SQLALCHEMY_TRACK_MODIFICATIONS' : True,
		"SQLALCHEMY_DATABASE_URI" : SQLALCHEMY_DATABASE_URI,
		'SECRET_KEY' : 'THISISSECRETKEYOFTHISPROJECT',
		'JWT_ACCESS_TOKEN_EXPIRES' : timedelta(minutes=15),
		'JWT_REFRESH_TOKEN_EXPIRES' : timedelta(days=30)
		})
api = Api(app)
db.init_app(app)
jwt = JWTManager(app)
socketio = SocketIO(app)
# socketio = MySocketIO(app)


def serializer(l):
    ret = []
    for row in l:
        ret.append(json.loads(row.serialize()))
    return ret



class Userlist(Resource):
	def get_users(self):
		users = User.query.all()
		return users

	def get(self):
		users = self.get_users()
		return serializer(users)

	def post(self):
		r_json = request.get_json()
		email = r_json['email']
		nickname = r_json['nickname']
		password = r_json['password']
		user = User.query.filter_by(email=email).first()
		if user:
			return '{} is aleady exists'.format(email)
		new_user = User(email, password, nickname)
		db.session.add(new_user)
		db.session.commit()
		return jsonify({'message': 'Your account is successfully updated', 'data': new_user})

	def delete(self):
		r_json = request.get_json()
		_id = r_json['id']
		db.session.delete(user)
		db.session.commit()
		return 'your account has been deleted'

class UserLogin(Resource) :
	def post(self) :
		r_json = request.get_json()
		email = r_json['email']
		password = r_json['password']
		user = User.query.filter_by(email=email).first()
		if user is None:
			abort(400, 'User is not exists')
		if not user.check_password(password):
			abort(400, 'Password is incorrect')
		
		_user = json.loads(user.serialize())
		del _user['password']
		access_token = create_access_token(identity = _user)
		refresh_token = create_refresh_token(identity = _user)
		jti = get_jti(refresh_token)
		_user['token'] = access_token
		_user['refresh'] = refresh_token
		login_session = LoginSession.query.filter_by(user_id=user.id).first()
		if login_session:
			login_session.jti = jti
		else:
			new_login_session = LoginSession(user.id, jti)
			db.session.add(new_login_session)
		try:
			db.session.commit()
		except Exception as e:
			print(e)
			abort(400, e)
		return jsonify({'message': 'login successfully', 'data': _user})

class PrivateRoute(Resource):
	@jwt_required
	def get(self):
		return jsonify({'message': 'This is private route'})

class UserRefresh(Resource):
	@jwt_refresh_token_required
	def post(self):
		current_user = get_jwt_identity()
		login_session = LoginSession.query.filter_by(user_id=current_user['id']).first()
		if login_session is None:
			abort(401)
		raw_jwt = get_raw_jwt()
		jti = raw_jwt['jti']
		if login_session.jti != jti:
			abort(401)
		ret = {
			'token': create_access_token(identity=current_user)
		}
		return jsonify({'message': 'Refresh successfully', 'data': ret})

api.add_resource(Userlist, '/api/users')
api.add_resource(PrivateRoute, '/api/private/routes')
api.add_resource(UserLogin, '/api/auth/login')
api.add_resource(UserRefresh, '/api/auth/refresh')

@socketio.on('connect', namespace='/mynamespace')
def connect():
	print('connect')
	#emit("response", {'data': 'connected', 'nickname': db.session['nickname']})

@socketio.on('disconnect', namespace='/mynamespace')
def disconnect():
	print('disconnect')
	#db.session.clear()
	print("Disconnected")

@socketio.on('request', namespace='/mynamespace')
def request(message):
	print('request')
	#emit("response", {'data': message['data'], 'nickname': db.session['nickname']}, broadcast = True)

if __name__ == '__main__':
	with app.app_context():
		db.create_all()
	socketio.run(app, port=5003, debug=True)
	# app.run(host='0.0.0.0', port=5002, debug=True )
