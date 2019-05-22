from flask_sqlalchemy import SQLAlchemy
from werkzeug import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship, backref
import json

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    account = db.Column(db.String(300))
    password = db.Column(db.String(300))

    def __init__(self, account, password):
        self.account = account
        self.set_password(password)

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'account': self.account,
            'password': self.password
        })

class Movie(db.Model):
    __tablename__ = 'movie'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(300))
    photo = db.Column() #이거 
    total_star = db.Column(db.실수) #이거
    people_num = db.Column(db.Integer)
    last_update = db.Colume(db.DateTime) #이거  

    def __init(self, name, photo):
        self.name = name
        self.photo = photo
        last_update = datetime.now() #현재시간

    def serialize(self):
        return json.dumps({
            'id' : self.id,
            'name' : self.name,
            'photo' : self.photo,
            'total_star' : self.total_star,
            'people_num' : self.people_num,
            'last_update' : self.last_update
        })
    
class Review(db.Model):
    __tablename__ = 'review'
    id = db.Column(db.Integer, primary_key=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movie.id'))
    user_id = db.COlumn(db.Integer, db.FOreignKey('user.id'))
    content = db.Column(db.Text)
    star = db.Column(db.Integer)

    movie = relationship('Movie', backref=backref('reviews', order_by=id))
    user = relationship('User', backref=backref('users', order_by=id))

    def __init(self, movie_id, user_id, content, star):
        self.movie_id = movie_id
        self.user_id = user_id
        self.content = content
        self.star = star

    def serialize(self):
        return json.dumps({
            'id' : self.id,
            'movie_id' : self.movie_id,
            'user_id' : self.user_id,
            'content' : self.content,
            'star' : self.star
        })