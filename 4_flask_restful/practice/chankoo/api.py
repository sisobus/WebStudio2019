from flask import Flask
from flask_restful import Api
from userlist import UserList
from article_list import ArticleList
from comment_list import CommentList
from like_list import LikeList

app = Flask(__name__)
api = Api(app)

api.add_resource(UserList, '/api/users')
api.add_resource(ArticleList, '/api/articles')
api.add_resource(CommentList, '/api/comments')
api.add_resource(LikeList, '/api/likes')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
