from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref
import json
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(80))

    def __init__(self, name, password):
        self.name = name
        self.set_password(password)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'name': self.name,
            'password': self.password,
        })


class Daily(db.Model):
    __tablename__ = 'daily'

    id = db.Column(db.Integer, primary_key=True)
    weather_id = db.Column(db.Integer, db.ForeignKey('weather.id'))
    img_path = db.Column(db.String)
    satis = db.Column(db.Integer)

    weather = relationship('Weather', backref=backref('daily', order_by=id))

    def __init__(self, weather_id, img_path, satis):
        self.weather_id = weather_id
        self.img_path = img_path
        self.satis = satis

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'weather_id': self.weather_id,
            'img_path': self.img_path,
            'satis': self.satis
        })


class Weather(db.Model):
    __tablename__ = 'weather'

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String)
    datetime = db.Column(db.String)
    cluster = db.Column(db.Integer)
    is_rain = db.Column(db.Boolean)

    def __init__(self, city, datetime, cluster, is_rain):
        self.city = city
        self.cluster = cluster
        self.datetime = datetime
        self.is_rain = is_rain

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'city': self.city,
            'datetime': self.datetime,
            'cluster': self.cluster,
            'is_rain': self.is_rain
        })


class MyDaily(db.Model):
    __tablename__ = 'mydaily'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    daily_id = db.Column(db.Integer, db.ForeignKey('daily.id'))

    user = relationship('User', backref=backref('mydaily', order_by=id))
    daily = relationship('Daily', backref=backref('mydaily', order_by=id))

    def __init__(self, user_id, daily_id):
        self.user_id = user_id
        self.daily_id = daily_id

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'user_id': self.user_id,
            'daily_id': self.daily_id,
        })


class MyScrap(db.Model):
    __tablename__ = 'myscrap'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    daily_id = db.Column(db.Integer, db.ForeignKey('daily.id'))

    user = relationship('User', backref=backref('myscrap', order_by=id))
    daily = relationship('Daily', backref=backref('myscrap', order_by=id))

    def __init__(self, user_id, daily_id):
        self.user_id = user_id
        self.daily_id = daily_id

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'user_id': self.user_id,
            'daily_id': self.daily_id,
        })


class LoginSession(db.Model):
    __tablename_ = 'login_session'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    jti = db.Column(db.Text)

    user = relationship('User')

    def __init__(self, user_id, jti):
        self.user_id = user_id
        self.jti = jti

