from flask_sqlalchemy import SQLAlchemy
from werkzeug import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship, backref
import json

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

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'email': self.email,
            'password': self.password
        })

class Article(db.Model):
    __tablename__ = 'article'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    content = db.Column(db.Text)
    thumb = db.Column(db.Text)
    text = db.Column(db.Text)

    def __init__(self, title, content, thumb, text):
        self.title = title
        self.content = content
        self.thumb = thumb
        self.text = text

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'title': self.title,
            'desc': self.content,
            'thumb': self.thumb,
            'text': self.text
        })

class Comment(db.Model):
    __tablename__ = 'comment'
    id = db.Column(db.Integer, primary_key=True)
    article_id = db.Column(db.Integer, db.ForeignKey('article.id'))
    content = db.Column(db.Text)

    article = relationship('Article', backref=backref('comments', order_by=id))

    def __init__(self, article_id, content):
        self.article_id = article_id
        self.content = content

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'article_id': self.article_id,
            'content': self.content
        })

class Like(db.Model):
    __tablename__ = 'like'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    article_id = db.Column(db.Integer, db.ForeignKey('article.id'))

    user = relationship('User', backref=backref('likes', order_by=id))
    article = relationship('Article', backref=backref('likes', order_by=id))

    def __init__(self, user_id, article_id):
        self.user_id = user_id
        self.article_id = article_id

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'user_id': self.user_id,
            'aritcle_id': self.article_id
        })
