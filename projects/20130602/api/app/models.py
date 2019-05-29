from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship, backref
import json

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'user'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    pwd = db.Column(db.String(80))

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
    satis = db.Column(db.Integer)
    like = db.Column(db.Integer)
    weather_id = db.Column(db.Integer, db.ForeignKey('weather.id'))

    weather = relationship('Weather', backref=backref('daily', order_by=id))


class Weather(db.Model):
    __tablename__ = 'weather'

    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DATE)
    time = db.Column(db.Integer)
    city = db.Column(db.String)
    cluster = db.Column(db.Integer)

    def __init__(self, date, time, city, cluster):
        self.date = date
        self.time = time
        self.city = city
        self.cluster = cluster

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'date': self.date,
            'time': self.time,
            'city': self.city,
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
