from flask_sqlalchemy import SQLAlchemy
from werkzeug import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship, backref
import json

from marshmallow_sqlalchemy import ModelSchema

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(300))
    password = db.Column(db.String(300))

    def __init__(self, email, password):
        self.email = email
        self.set_password(password)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


class UserSchema(ModelSchema):
    class Meta:
        model = User

class Article(db.Model):
    __tablename__ = 'article'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(200))
    content = db.Column(db.Text)

    def __init__(self, user_id, title, content):
        self.user_id = user_id
        self.title = title
        self.content = content


class ArticleSchema(ModelSchema):
    class Meta:
        model = Article


class Comment(db.Model):
	__tablename__ = 'comment'
	id = db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	article_id = db.Column(db.Integer, db.ForeignKey('article.id'))
	content = db.Column(db.Text)

	def __init__(self, user_id, article_id, content):
		self.user_id = user_id
		self.article_id = article_id
		self.content = content

class CommentSchema(ModelSchema):
    class Meta:
        model = Comment

class Like(db.Model):
	__tablename__ = 'like'
	id =db.Column(db.Integer, primary_key=True)
	user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
	article_id = db.Column(db.Integer, db.ForeignKey('article.id'))

	def __init__(self, user_id, article_id):
		self.user_id = user_id
		self.article_id = article_id

class LikeSchema(ModelSchema):
    class Meta:
        model = Like


class Picture(db.Model):
    __tablename__ = 'picture'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    title = db.Column(db.String(200))
    content = db.Column(db.String)

    def __init__(self, user_id, title, content):
        self.user_id = user_id
        self.title = title
        self.content = content


class PictureSchema(ModelSchema):
    class Meta:
        model = Picture