'''register폼에서 받는거 구현 필요'''
from flask import Flask, request, jsonify
from flask_restful import Api, Resource
import json
import cal_id
from models import db, User, UserSchema

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class UserList(Resource):
    def get_users(self):
        users = User.query.all()
        return users

    def get(self):
        users = self.get_users()
        result = users_schema.dump(users)
        return jsonify(result.data)


    def post(self):
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        user = User.query.filter_by(email=email).first()
        if user:
            return '{} aleady exists'.format(email)
        new_user = User(email, password)
        db.session.add(new_use현)
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
