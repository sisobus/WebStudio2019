from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref
import json

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'
    __table_args__ = {'mysql_collate': 'utf8_general_ci'}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    password = db.Column(db.String(80))

    def __init__(self, name, password):
        self.name = name
        self.password = password


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
    img_name = db.Column(db.String)
    satis = db.Column(db.Integer)

    weather = relationship('Weather', backref=backref('daily', order_by=id))

    def __init__(self, weather_id, img_name, satis):
        self.weather_id = weather_id
        self.img_name = img_name
        self.satis = satis




class Weather(db.Model):
    __tablename__ = 'weather'

    id = db.Column(db.Integer, primary_key=True)
    city = db.Column(db.String)
    date = db.Column(db.DATE)
    time = db.Column(db.Integer)
    cluster = db.Column(db.Integer)

    def __init__(self, city, date, time, cluster):
        self.city = city
        self.date = date
        self.time = time
        self.cluster = cluster

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'city': self.city,
            'date': self.date,
            'time': self.time,
            'cluster': self.cluster
        })


class MyDaily(db.Model):
    __tablename__ = 'mydaily'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    daily_id = db.Column(db.Integer, db.ForeignKey('daily.id'))

    user = relationship('User', backref=backref('mydaily', order_by=id))
    daily = relationship('Daily', backref=backref('mydaily', order_by=id))


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