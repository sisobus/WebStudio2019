from flask import request, make_response
from flask_restful import Resource
from models import db, User, Daily, Weather
from utils import serializer
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
import requests


class Users(Resource):
    # method_decorators = {
    #     'get': [token_required],
    #     'delete': [token_required],
    #     }

    def _get_user(self):
        users = User.query.all()
        return users

    def get(self):
        print(request.get_json())
        users = self._get_user()
        data = request.get_json()
        # return all users
        return serializer(users)

    def post(self):
        data = request.get_json()
        print(data)
        hashed_pwd = generate_password_hash(data['password'], method='sha256')
        new_user = User(name=data['name'], password=hashed_pwd)

        db.session.add(new_user)
        db.session.commit()
        return serializer([new_user])

    def delete(self):
        data = request.get_json()
        print(data)
        del_user = User.query.filter_by(public_id=data['public_id']).first()
        if del_user is None:
            return 'user public_id {} does not exist'.format(data['public_id'])

        db.session.delete(del_user)
        db.session.commit()
        return 'deleted successfully'


def req_weather_by_city(city_name):
    base = 'http://api.openweathermap.org/data/2.5/weather?q='
    key = '60efa98fd883262c59309ae9e81183a4'
    url = base + city_name + "&APPID=" + key
    print(requests.get(url))





















# def token_required(f):
#     @wraps(f)
#     def decorated(*args, **kwargs):
#         token = None
#
#         # request header에 토큰이 있으면 진행
#         if 'Authorization' in request.headers:
#             token = request.headers['Authorization']
#
#         if not token:
#             print('if not token')
#             return make_response('{"msg":"Token is missing"}', 401)
#
#         try:
#             data = jwt.decode(token, 'chankoo')  # decoded with secret key
#         except:
#             return make_response('{"msg":"Token is invalid"}', 401)
#
#         return f(*args, **kwargs)  # user 오브젝트를 route에 넘겨주기위해 return
#
#     return decorated