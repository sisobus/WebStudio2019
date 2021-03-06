from flask import Flask
from flask_restful import Api
import os, json

from userlist import UserList
from article_list import ArticleList
from comment_list import CommentList
from like_list import LikeList
from models import db


basedir = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' +os.path.join(basedir, 'app.db')
app = Flask(__name__)
app.config.update({
    'SQLALCHEMY_TRACK_MODIFICATIONS' : True,
    'SQLALCHEMY_DATABASE_URI' : SQLALCHEMY_DATABASE_URI,
})
api = Api(app)
db.init_app(app)

api.add_resource(UserList, '/api/users')
api.add_resource(ArticleList, '/api/articles')
api.add_resource(CommentList, '/api/comments')
api.add_resource(LikeList, '/api/likes')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
