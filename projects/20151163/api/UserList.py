from flask import Flask, request
from flask_restful import Api, Resource
import json
import cal_id
from models import db, User

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
        user = User.query.filter_by(email=email).first()
        if user:
            return '{} aleady exists'.format(email)
        new_user = User(email, password)
        db.session.add(new_user)
        db.session.commit()
        return 'Create email: {}, pw: {} successcully'.format(email, password)

    def put(self):
        r_json = request.get_json()
        _id = r_json['id']
        password = r_json['password']
        user = User.query.filter_by(id=_id).first()
        if not user:
            return '{} does not exist'.format(_id)
        user.password = password
        db.session.commit()
        return 'Updated password successfully'

    def delete(self):
        r_json = request.get_json()
        _id = r_json['id']
        user = User.query.filter_by(id=_id).first()
        if not user:
            return '{} does not exist'.format(_id)
        db.session.delete(user)
        db.session.commit()
        return '{} Deleted successfully'.format(_id)
