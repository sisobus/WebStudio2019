from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
from models import db, User, Article, Comment, Like, ArticleSchema, UserSchema,CommentSchema, LikeSchema
import os
from UserList import UserList
from ArticleList import ArticleList
from CommentList import CommentList
from LikeList import LikeList

basedir = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
app = Flask(__name__)
app.config.update({
    'SQLALCHEMY_TRACK_MODIFICATIONS': True,
    "SQLALCHEMY_DATABASE_URI": SQLALCHEMY_DATABASE_URI,
})

cors = CORS(app)
api = Api(app)
db.init_app(app)

user_schema = UserSchema()
users_schema = UserSchema(many=True)
article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)
comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)
like_schema = LikeSchema()
likes_schema = LikeSchema(many=True)

api.add_resource(UserList, '/api/users')
api.add_resource(ArticleList, '/api/articles')
api.add_resource(CommentList, '/api/comments')
api.add_resource(LikeList, '/api/likes')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
