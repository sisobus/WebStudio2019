from flask import request
from flask_restful import Resource
from models import db, User

class UserList(Resource):
    def _get_users(self):
        users = User.query.all()
        return users

    def get(self):
        users = self._get_users()

        repr_str = ''
        for user in users: # users 리스트를 순회하며 user 정보 가져와 스트링으로 쌓는다
            repr_str += user.__repr__()
        return repr_str

    def post(self):
        r_json = request.get_json() # request의 data(json)를 dict 형태로 가져온다
        email = r_json['email']
        password = r_json['password'].encode('utf-8')
        user = User.query.filter_by(email=email).first()
        if user is not None:
            return '{} is already exists!'.format(email)

        new_user = User(email, password)
        db.session.add(new_user)
        db.session.commit()
        return 'create {}'.format(new_user.__repr__())

    def put(self):
        r_json = request.get_json()
        put_id = r_json['id']
        password = r_json['password']

        user = User.query.filter_by(id = put_id).first()
        if user is None:
            return '{} does not exist'.format(put_id)

        user.password  = password
        db.session.commit()
        return 'update password successfully'

    def delete(self):
        r_json = request.get_json()
        del_id = r_json['id']

        user = User.query.filter_by(id=del_id).first()
        if user is None:
            return '{} does not exist'.format(del_id)

        db.session.delete(user)
        db.session.commit()
        return '{} deleted successfully'.format(del_id)





