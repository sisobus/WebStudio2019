from flask_sqlalchemy import SQLAlchemy
from werkzeug import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship, backref
import json

db = SQLAlchemy()

class User(db.Model):
	__tablename__ = 'user'
	id = db.Column(db.Integer, primary_key=True)
	email = db.Column(db.String(600))
	nickname = db.Column(db.String(300))
	password = db.Column(db.String(300))
	login = db.Column(db.Integer, nullable=False)

	def __init__(self, email, password, nickname):
		self.email = email
		self.set_password(password)
		self.nickname = nickname
		self.login = 0
		
	def set_password(self, password):
		self.password = generate_password_hash(password)

	def check_password(self, password):
		return check_password_hash(self.password, password)
	
	def serialize(self):
		return json.dumps({
			'id': self.id,
			'email': self.email,
			'password': self.password,
			'nickname': self.nickname,
			'login': self.login
		})


class LoginSession(db.Model):
	__tablename__ = 'login_session'
	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	jti = db.Column(db.Text)

	user = relationship('User')

	def __init__(self, user_id, jti):
		self.user_id = user_id
		self.jti = jti