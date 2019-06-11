from flask_sqlalchemy import SQLAlchemy
from werkzeug import generate_password_hash, check_password_hash
from sqlalchemy.orm import relationship, backref
import json

db = SQLAlchemy()

class Article(db.Model):
    __tablename__ = 'article'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200))
    image = db.Column(db.String(200))
    category = db.Column(db.String(200))
    content = db.Column(db.Text)


    def __init__(self, title, image, category, content):
        self.title = title
        self.image = image
        self.category = category
        self.content = content

    def serialize(self):
        return json.dumps({
            'id': self.id,
            'title': self.title,
            'image': self.image,
            'category' : self.category,
            'content': self.content
        })
