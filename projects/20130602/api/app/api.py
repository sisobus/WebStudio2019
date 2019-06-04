from flask import request, make_response, render_template, redirect
from flask_restful import Resource
from models import db, User, Daily, Weather, MyScrap
from utils import serializer
import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from weather import query_now, query_5day

import os
from werkzeug.utils import secure_filename

import boto3


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


class WeatherNow(Resource):
    def get(self):
        args = request.args
        print(args)
        return query_now(args['city'], args['country'])


class Weather5day(Resource):
    def get(self):
        args = request.args
        print(args)
        return query_5day(args['city'], args['country'])


class WeatherPast(Resource):
    def get(self):
        args = request.args # city, date, time
        weather = Weather.query.filter_by(city=args['city'],date=args['date'],time=args['time'])
        return weather.id


class ImageUpload(Resource):
    #---temp----------
    def get(self):
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template("upload_image_temp.html"), 200, headers)
    #--------------

    def post(self):
        if request.files:
            image = request.files['image']
            print(image)
            if image.filename == '':
                print("Image doesnt exist!!")
                return redirect(request.url)

            #------------
            # image.save(os.path.join('./../static/img', secure_filename(image.filename)))
            s3 = boto3.resource('s3')
            s3.Bucket('project-lookmorning').put_object(Key=image.filename, Body=image)

            #-------------
            print("Image saved")
            return "image {} has posted".format(image)
        return make_response(404)


class Dailys(Resource):
    def get(self):
        args = request.args
        print(args)

        # query by daily id
        if 'id' in args:
            daily = Daily.query.filter_by(id=args['id']).first()
            return serializer([daily])

        # query by weather cluster
        elif 'cluster' in args:
            weather_ids = Weather.query.filter_by(cluster=args['cluster'])
            dailys = []
            for w_id in weather_ids:
                dailys.append(Daily.query.filter_by(weather_id=w_id).first())
            return serializer(dailys)

    def post(self):
        data = request.get_json() # 도시, 시간, ,[만족도]
        print(data)

        ###
        image = request.files['image'] # 이미지파일
        print(image)
        if image.filename == '':
            print("Image doesnt exist!!")
            img_name = 'anonymous.JPG'
        else:
            img_name = secure_filename(image.filename)
            image.save(os.path.join('./../static/img', secure_filename(image.filename)))
            print("Image saved")
        ###

        weather_id = Weather.query.filter_by(city=data['city'], date=data['date'], time=data['time']).id
        new_daily = Daily(weather_id=weather_id, img_name=img_name, satis=None)

        db.session.add(new_daily)
        db.session.commit()
        return serializer([new_daily])


class Scraps(Resource):
    def get(self):
        daily_id = request.args.get('daily_id')
        user_id = request.args.get('user_id')

        if user_id and daily_id:
            scraps = MyScrap.query.filter_by(
                daily_id=daily_id).filter_by(
                user_id=user_id).all()
        elif daily_id:
            scraps = MyScrap.query.filter_by(
                article_id=daily_id).all()
        elif user_id:
            scraps = MyScrap.query.filter_by(
                user_id=user_id).all()
        else:
            scraps = MyScrap.query.all()
        return serializer(scraps)

    def post(self):
        data = request.get_json()
        user_id = data['user_id']
        daily_id = data['daily_id']
        scrap = MyScrap.query.filter_by(
            user_id=user_id).filter_by(
            daily_id=daily_id).first()

        if scrap:
            db.session.delete(scrap)
            db.session.commit()
            return "unlike successfully"
        new_scrap = MyScrap(user_id, daily_id)
        db.session.add(new_scrap)
        db.session.commit()
        return "like successfully"







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