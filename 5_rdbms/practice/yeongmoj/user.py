from flask import Flask, request
from flask_restful import Api, Resource
import json
import os
from models import db, User, Article, Comment, Like

class UserList(Resource):
    def get_users(self):
        users = User.query.all()
        return users

    def get(self):
        users = self.get_users()
        ret = ''
        for user in users:
            ret += '[email: {}, password: {}]'.format(user.email, user.password)
        return ret

    def post(self):
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        user = User.query.filter(User.email == email).first()
        # user = User.query.filter_by(email=email).first()
        if user:
            return '{} is aleady exists'.format(email)
        new_user = User(email, password)
        db.session.add(new_user)
        db.session.commit()
        return 'create email: {}, pw: {} successcully'.format(email, password)

    def put(self):
        r_json = request.get_json()
        _id = r_json['id']
        password = r_json['password']
        user = User.query.filter_by(id=_id).first()
        if not user:
            return '{} is not exists'.format(_id)
        user.password = password
        db.session.commit()
        return 'update password successfully'

    def delete(self):
        r_json = request.get_json()
        _id = r_json['id']
        user = User.query.filter_by(id=_id).first()
        if not user:
            return '{} is not exists'.format(_id)
        db.session.delete(user)
        db.session.commit()
        return '{} deleted successfully'.format(_id)
