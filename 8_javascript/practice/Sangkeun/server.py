from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS
import json
import os
from models import db, User, Article, Comment, Like

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

def serializer(l):
    ret = []
    for row in l:
        ret.append(json.loads(row.serialize()))
    return json.dumps(ret)


class UserList(Resource):
    def get_users(self):
        users = User.query.all()
        return users

    def get(self):
        users = self.get_users()
        return serializer(users)

    def post(self):
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        user = User.query.filter_by(email=email).first()
        if user:
            return '{} is aleady exists'.format(email)
        new_user = User(email, password)
        db.session.add(new_user)
        db.session.commit()
        return 'create email: {}, pw: {} successcully'.format(email, password)

    def put(self):
        r_json = request.get_json()
        _id = r_json['id']
        password = r_json['password']
        user = User.query.filter_by(id=_id).first()
        if not user:
            return '{} is not exists'.format(_id)
        user.password = password
        db.session.commit()
        return 'update password successfully'

    def delete(self):
        r_json = request.get_json()
        _id = r_json['id']
        user = User.query.filter_by(id=_id).first()
        if not user:
            return '{} is not exists'.format(_id)
        db.session.delete(user)
        db.session.commit()
        return '{} deleted successfully'.format(_id)


class ArticleList(Resource):
    def get_articles(self):
        articles = Article.query.all()
        return articles 

    def get(self):
        articles = self.get_articles()
        for article in articles:
            print(article.comments)
        print(articles[0].comments[0].content)
        print(articles[0].comments[0].user.email)
        return serializer(articles)

    def post(self):
        r_json = request.get_json()
        user_id = r_json['user_id']
        title = r_json['title']
        content = r_json['content']

        new_article = Article(user_id, title, content)
        db.session.add(new_article)
        db.session.commit()
        return "write successfully"

    def put(self):
        r_json = request.get_json()
        _id = r_json['id']
        title = r_json['title']
        content = r_json['content']
        article = Article.query.filter_by(id=_id).first()
        if not article:
            return "article[:{}] is not exists".format(_id)
        article.title = title
        article.content = content
        db.session.commit()
        return "update successfully"

    def delete(self):
        r_json = request.get_json()
        _id = r_json['id']
        article = Article.query.filter_by(id=_id).first()
        if not article:
            return "article[:{}] is not exists".format(_id)
        db.session.delete(article)
        db.session.commit()
        return "delete successfully"


class CommentList(Resource):
    def get(self):
        article_id = request.args.get('article_id')
        if article_id:
            comments = Comment.query.filter_by(article_id=article_id).all()
        else:
            comments = Comment.query.all()
        return serializer(comments)

    def post(self):
        r_json = request.get_json()
        user_id = r_json['user_id']
        article_id = r_json['article_id']
        content = r_json['content']

        new_comment = Comment(user_id, article_id, content)
        db.session.add(new_comment)
        db.session.commit()
        return "write successfully"

    def put(self):
        r_json = request.get_json()
        _id = r_json['id']
        content = r_json['content']
        comment = Comment.query.filter_by(id=_id).first()

        if comment is None:
            return "comment[:{}] is not exists".format(_id)
        comment.content = content
        db.session.commit()
        return "update successfully"

    def delete(self):
        r_json = request.get_json()
        _id = r_json['id']
        comment = Comment.query.filter_by(id=_id).first()
        if not comment:
            return "comment[:{}] is not exists".format(_id)
        db.session.delete(comment)
        db.session.commit()
        return "delete successfully"


class LikeList(Resource):
    def get(self):
        article_id = request.args.get('article_id')
        user_id = request.args.get('user_id')
        if user_id and article_id:
            likes = Like.query.filter_by(
                    article_id=article_id).filter_by(
                            user_id=user_id).all()
        elif article_id:
            likes = Like.query.filter_by(
                    article_id=article_id).all()
        elif user_id:
            likes = Like.query.filter_by(
                    user_id=user_id).all()
        else:
            likes = Like.query.all()
        return serializer(likes)

    def post(self):
        r_json = request.get_json()
        user_id = r_json['user_id']
        article_id = r_json['article_id']
        like = Like.query.filter_by(
                user_id=user_id).filter_by(
                        article_id=article_id).first()
        if like:
            db.session.delete(like)
            db.session.commit()
            return "unlike successfully"
        new_like = Like(user_id, article_id)
        db.session.add(new_like)
        db.session.commit()
        return "like successfully"


api.add_resource(UserList, '/api/users')
api.add_resource(ArticleList, '/api/articles')
api.add_resource(CommentList, '/api/comments')
api.add_resource(LikeList, '/api/likes')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
