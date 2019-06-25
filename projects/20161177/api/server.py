from flask import Flask, jsonify, abort, request
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
		_users = serializer(users)
		return jsonify({'all users': _users})

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
		return jsonify({'message': 'Your account is successfully updated'})

	def delete(self):
		r_json = request.get_json()
		_id = r_json['id']
		user = User.query.filter_by(id=_id).first()
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
		user.login = 1
		db.session.commit()

		_user = json.loads(user.serialize())
		print(_user)
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

@socketio.on('connect')
def connect():
	print('user connect')
	emit('connect', {'data' : 'connected'})

@socketio.on('sending')
def sending(data):
	nickname = data.get('nickname')
	message = data.get('message')
	emit("response", {'nickname': nickname, 'message': message}, broadcast = True)
	print('recieve messages', nickname, message)

@socketio.on('login_list')
def users_login():
	users = User.query.filter_by(login=1).all()
	_users = serializer(users)
	emit('login_users', _users, boradcast = True)
	print(_users)
	print('유저 목록을 불러왔습니다')
	
@socketio.on('user_logout')
def logout(data):
	_id = data.get('id')
	user = User.query.filter_by(id=_id).first()
	user.login = 0
	db.session.commit()
	print('로그아웃 하였습니다')

@socketio.on('game_start')
def game_start():
	print('gamestart')


if __name__ == '__main__':
	with app.app_context():
		db.create_all()
	socketio.run(app, port=5003, debug=True)
	# app.run(host='0.0.0.0', port=5002, debug=True )
