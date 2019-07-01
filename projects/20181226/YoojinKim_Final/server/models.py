#-*- coding:utf-8 -*-
from flask_sqlalchemy import SQLAlchemy
from werkzeug import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship, backref
import json

db = SQLAlchemy()

# class User(db.Model):
#     __tablename__ = 'user'
#     id = db.Column(db.Integer, primary_key=True)
#     email = db.Column(db.String(300))
#     password = db.Column(db.String(300))

#     def __init__(self, email, password):
#         self.email = email
#         self.set_password(password)

#     def set_password(self, password):
#         self.password = generate_password_hash(password)

#     def check_password(self, password):
#         return check_password_hash(self.password, password)

# class Interview(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     user = db.Column(db.Text)
#     password = db.Column(db.Text)
#     title = db.Column(db.Text)
#     text = db.Column(db.Text)
#     like = db.Column(db.Integer)
#     image = db.Column(db.Text)

#     def __init__(self, user, title, text, like, image):
#         self.id = id
#         self.user = user
#         self.password = password
#         self.title = title
#         self.text = text
#         self.like = 0
#         self.image = image

#     def serialize(self):
#         return json.dumps({
#             'id': self.id,
#             'user': self.user,
#             'password': self.password,
#             'title': self.title,
#             'text': self.text,
#             'like': self.like,
#             'image': self.image
#         })

class Visual(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.Text)
    image = db.Column(db.Text)

    def __init__(self, title, image):
        self.title = title
        self.image = image

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'title': self.title,
            'image': self.image
        })

class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user = db.Column(db.String(200))
    password = db.Column(db.String(200))
    title = db.Column(db.String(200))
    # thumbnail = db.Column(db.String(200))
    text = db.Column(db.Text)

    def __init__(self, user, password, title, text):
        self.user = user
        self.password = password
        self.title = title
        # self.thumbnail = thumbnail
        self.text = text

    def serialize(self):
        return json.dumps({
            'user': self.user,
            'password': self.password,
            'title': self.title,
            # 'thumbnail': self.thumbnail,
            'text': self.text
        })