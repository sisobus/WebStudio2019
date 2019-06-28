from flask import request, make_response, render_template, redirect, abort, jsonify
from flask_restful import Resource
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token,
    jwt_required, jwt_refresh_token_required, get_jwt_identity,
    get_jti, get_raw_jwt)
from werkzeug.utils import secure_filename
import boto3
import pandas as pd
import datetime, json, random, pickle
from PIL import Image
from PIL.ExifTags import TAGS
from models import db, User, Daily, Weather, MyScrap, MyDaily, LoginSession
from weather import query_now, query_5day
from utils import serializer, dictionalizer, is_person


class Users(Resource):
    def _get_user(self):
        users = User.query.all()
        return users

    def get(self):
        users = self._get_user()
        return serializer(users)

    def post(self):
        data = request.get_json()
        if User.query.filter_by(name=data['name']).first():
            return abort(409, description='user name already exists')

        new_user = User(name=data['name'], password=data['password'])
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message': 'successfully registered'})

    def delete(self):
        data = request.get_json()  # name, password
        del_user = User.query.filter_by(name=data['name']).first()

        if del_user is None:
            return jsonify({'message':'user name {} does not exist'.format(data['name'])})
        if not del_user.check_password(data['password']):
            jsonify({'message': 'password does not match'})

        db.session.delete(del_user)
        db.session.commit()
        return jsonify({'message': 'deleted successfully'})


class WeatherNow(Resource):
    def get(self):
        args = request.args
        data = query_now(args['city'], args['country'])
        return json.dumps(data)


class Weather5day(Resource):
    def get(self):
        args = request.args
        data = query_5day(args['city'], args['country'])
        return json.dumps(data)


class WeatherPast(Resource):
    def get(self):
        args = request.args  # city, datetime
        weather = Weather.query.filter_by(city=args['city'], datetime=args['datetime']).first()
        return serializer([weather])

    def post(self):
        data = request.get_json()  # city, datetime, cluster, is_rain
        new_weather = Weather(city=data['city'], datetime=data['datetime'], cluster=data['cluster'], is_rain=int(data['is_rain']))
        db.session.add(new_weather)
        db.session.commit()
        return serializer([new_weather])
        

class ImageUpload(Resource):
    def post(self, user_id):  # post img to s3 and return info to insert db
        if request.files:
            image = request.files['image']  # <class 'werkzeug.datastructures.FileStorage'>

            if image.filename == '':
                return redirect(request.url)

            # create filename according to userid, filename(raw), timestamp
            exifTS = ''
            fn = image.filename
            read_img = image.read()
            i = Image.open(image.stream)

            # find taken time info from exif meta data
            try:
                info = i._getexif()
                for tag, value in info.items():
                    decoded = TAGS.get(tag, tag)
                    if decoded == 'DateTimeOriginal':
                        exifTS = value
                        break
                    elif decoded == 'DateTimeDigitized':
                        exifTS = value
                        break
                    elif decoded == 'DateTime':
                        exifTS = value
                        break
            except Exception as e:
                print(e)
                pass

            if exifTS != '':
                dt = datetime.datetime.strptime(exifTS, '%Y:%m:%d %H:%M:%S').strftime('%Y-%m-%d %H')
            else:
                dt = datetime.datetime.now().strftime('%Y-%m-%d %H')  # dt as current time if not exist taken time

            file_name = secure_filename('_'.join([str(user_id), dt.split()[0], fn]))

            # upload to s3
            s3 = boto3.resource('s3')
            s3.Bucket('project-lookmorning').put_object(Key='dailylook/'+file_name, Body=read_img, ContentType='image/jpeg', ACL='public-read')
            return jsonify({
                'message': "Image {} Uploaded to S3".format(file_name),
                'filename': file_name,
                'dt': dt
                })

        return jsonify({'message': "ImageUpload fail"})


class Dailys(Resource):
    def get(self, user_id, cluster, is_rain):

        # dailys user created or scrapped must be excepted
        except_daily_ids = []
        mydailys = MyDaily.query.filter_by(user_id=user_id).all()
        myscraps = MyScrap.query.filter_by(user_id=user_id).all()
        for mydaily in mydailys:
            except_daily_ids.append(mydaily.daily_id)
        for myscrap in myscraps:
            except_daily_ids.append(myscrap.daily_id)

        # query weathers belong to the same cluster
        weathers = Weather.query.filter_by(cluster=cluster, is_rain=is_rain).all()
        dailys = []
        for weather in weathers:
            # query dailys taken in that datetime
            weather_dailys = Daily.query.filter_by(weather_id=weather.id).all()
            weather_dt = Weather.query.filter_by(id=weather.id).first().datetime

            for weather_daily in dictionalizer(weather_dailys):
                weather_daily['datetime'] = weather_dt
                if weather_daily['id'] in except_daily_ids:
                    continue
                dailys += [weather_daily]  # concat weather_daily in which datetime added

        random.shuffle(dailys)
        if len(dailys) > 100:
            dailys = dailys[:100]  # show maximal 100 images

        # daily images contain 'person' label with pretrained faster-RCNN model
        # Failed to allocate CPU Memory Error on EC2 free tier
        # filtered_dailys = []
        # for i, is_it in enumerate(list(map(is_person, dailys))):
        #     if is_it:
        #         filtered_dailys.append(dailys[i])

        return json.dumps(dailys)

    def post(self, user_id):
        data = request.get_json()

        # create daily record (id, weather_id, img_path, satis)
        img_path = 'https://project-lookmorning.s3.ap-northeast-2.amazonaws.com/dailylook/{}'.format(data['file_name'])
        satis = data['satis']
        dt = data['dt']
        city = data['city']

        weather = Weather.query.filter_by(city=city, datetime=dt).first()
        if weather:
            weather_id = weather.id
        else:
            pass

        new_daily = Daily(weather_id=weather_id, img_path=img_path, satis=satis)
        db.session.add(new_daily)
        db.session.commit()

        # create mydaily record (id, user_id, daily_id)
        daily_id = Daily.query.filter_by(img_path=img_path).first().id
        new_myDaily = MyDaily(user_id, daily_id)
        db.session.add(new_myDaily)
        db.session.commit()

        # insert dummy images to db
        # KST = datetime.timezone(datetime.timedelta(hours=9))
        # try:
        #     dt = datetime.datetime.fromtimestamp(data['timestamp'], tz=KST).strftime('%Y-%m-%d %H')
        #     weather_id = Weather.query.filter_by(city=data['city'], datetime=dt).first().id
        #     new_daily = Daily(weather_id=weather_id, img_path=data['img_path'], satis=data['satis'])
        #     db.session.add(new_daily)
        #     db.session.commit()
        # except Exception as e:
        #     print(e)
        #     return jsonify({'message': "fail to upload"})
        #
        # return jsonify({'message': "MyDaily uploaded"})


class MyDailys(Resource):
    @jwt_required
    def get(self, user_id):
        my_dailys = MyDaily.query.filter_by(
            user_id=user_id).all()

        dailys = []
        for my_daily in my_dailys:
            daily_ = Daily.query.filter_by(id=my_daily.daily_id).first()
            daily = {}
            daily['daily_id'] = daily_.id
            daily['img_path'] = daily_.img_path
            daily['datetime'] = Weather.query.filter_by(id=daily_.weather_id).first().datetime
            daily['satis'] = daily_.satis
            daily['is_scrap'] = False
            dailys.append(daily)
        return jsonify({"dailys": dailys, 'message': "get MyDaily successfully"})


class MyScraps(Resource):
    @jwt_required
    def get(self, user_id):
        scraps = MyScrap.query.filter_by(user_id=user_id).all()

        dailys = []
        for scrap in scraps:
            daily_ = Daily.query.filter_by(id=scrap.daily_id).first()
            daily_creater = MyDaily.query.filter_by(daily_id=scrap.daily_id).first()

            daily = {}
            daily['daily_id'] = daily_.id
            daily['img_path'] = daily_.img_path
            daily['datetime'] = Weather.query.filter_by(id=daily_.weather_id).first().datetime
            daily['satis'] = daily_.satis
            daily['is_scrap'] = True
            if daily_creater:
                daily['creater_id'] = daily_creater.user_id
            dailys.append(daily)
        return jsonify({"dailys": dailys, 'message': "get MyScrap successfully"})

    def post(self, user_id):
        data = request.get_json()
        daily_id = data['daily_id']

        if MyDaily.query.filter_by(
            user_id=user_id).filter_by(
            daily_id=daily_id).first():
            abort(400, "can not scrap your own image")
            return jsonify({"message": "can not scrap your own image"})

        scrap = MyScrap.query.filter_by(
            user_id=user_id).filter_by(
            daily_id=daily_id).first()

        if scrap:
            db.session.delete(scrap)
            db.session.commit()
            return jsonify({
                "message": "unscrap successfully",
                "data": {"is_scrap": False}
            })

        new_scrap = MyScrap(user_id, daily_id)
        db.session.add(new_scrap)
        db.session.commit()
        return jsonify({
            "message": "scrap successfully",
            "data": {"is_scrap": False}
        })


class UserLogin(Resource):
    def post(self):
        data = request.get_json()
        name = data['name']
        password = data['password']

        user = User.query.filter_by(name=name).first()
        if user is None:
            abort(400, 'User is not exists')
        if not user.check_password(password):
            abort(400, 'Password is incorrect')

        _user = json.loads(user.serialize())
        del _user['password']
        access_token = create_access_token(identity=_user)
        refresh_token = create_refresh_token(identity=_user)
        jti = get_jti(refresh_token)
        _user['token'] = access_token
        _user['refresh'] = refresh_token
        login_session = LoginSession.query.filter_by(user_id=user.id).first()

        if login_session:
            login_session.jti = jti
        else:
            new_login_session = LoginSession(user.id, jti)
            db.session.add(new_login_session)
        try:
            db.session.commit()
        except Exception as e:
            print(e)
            abort(400, e)

        return json.dumps({'message': 'login successfully', 'data': _user})


class Cluster(Resource):
    def post(self):  # assign cluster and return it
        data = request.get_json()

        if data['precipitation'] is not 0:
            is_rain = 1
            with open('../static/model_km1.pkl', 'rb') as fp:
                km = pickle.load(fp)
            with open('../static/stat_km1.pkl', 'rb') as fp:
                stat = pickle.load(fp)

        else:
            is_rain = 0
            with open('../static/model_km0.pkl', 'rb') as fp:
                km = pickle.load(fp)
            with open('../static/stat_km0.pkl', 'rb') as fp:
                stat = pickle.load(fp)

        # standard scale with raw data statistic
        weather = [data['temp'], ]
        for col in data.keys():
            if col in stat.index:
                weather.append((data[col] - stat.loc[col, 'mean']) / stat.loc[col, 'std'])

        cluster = km.predict(pd.np.array([weather]))[0]
        print('Assigned Cluster is', cluster)

        return jsonify({
            "message": "cluster assigned",
            "data": {
                "cluster": str(cluster),
                "is_rain": str(is_rain)
            }
        })