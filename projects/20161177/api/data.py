from flask_sqlalchemy import SQLAlchemy
from werkzeug import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship, backref
import json

db = SQLAlchemy()

class User(db.Model):
	__tablename__ = 'user'
	id = db.Column(db.Integer, primary_key=True)
	email = db.Column(db.String(300))
	nickname = db.Column(db.String(300))
	password = db.Column(db.String(300))

	def __init(self, email, password, nickname):
		self.email = email
		self.set_password(password)
		self.nickname = nickname
		
	def set_password(self, password):
		self.password = generate_password_hash(password)

	def check_password(self, password):
		return check_password_hash(password)
	
	def serialize(self):
		return json.dumps({
			'id': self.id,
			'email': self.email,
			'password': self.password,
			'nickname': self.nickname
		})

