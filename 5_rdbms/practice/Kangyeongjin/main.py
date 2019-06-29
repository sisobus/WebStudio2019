from flask import Flask, request
from flask_restful import Api, Resource
import json, os

from userlist import UserList
from articlelist import ArticleList
from commentlist import CommentList
from articlehascommentlist import ArticleHasCommentList

from models import db, User, Article, Comment


basedir = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
app = Flask(__name__)
app.config.update({
    'SQLALCHEMY_TRACK_MODIFICATIONS': True,
    "SQLALCHEMY_DATABASE_URI": SQLALCHEMY_DATABASE_URI,
})
api = Api(app)
db.init_app(app)


api.add_resource(UserList, '/api/users')
api.add_resource(ArticleList, '/api/articles')
api.add_resource(CommentList, '/api/comments')
api.add_resource(ArticleHasCommentList, '/api/articles/<int:article_number>/comments')


if __name__ == '__main__':
	with app.app_context():
		db.create_all()
	app.run(host='0.0.0.0', port=5002, debug=True)



