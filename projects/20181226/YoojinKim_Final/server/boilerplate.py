#-*- coding:utf-8 -*-
from flask import Flask, request, jsonify, send_from_directory
from flask_restful import Api, Resource
from flask_cors import CORS
import json
import os
from models import db, Article, Visual

basedir = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
IMAGE_PATH = os.path.join(basedir, 'images')

app = Flask(__name__)
app.config.update({
    'SQLALCHEMY_TRACK_MODIFICATIONS': True,
    "SQLALCHEMY_DATABASE_URI": SQLALCHEMY_DATABASE_URI,
    'ENV': 'development'
})
api = Api(app)
cors = CORS(app)
db.init_app(app)

def serializer(l):
    ret = []
    for row in l:
        ret.append(json.loads(row.serialize()))
    return ret

def get_id(l):
    _id = 0
    for d in l:
        _id = max(d['id'], _id)
    return _id + 1


# class UserList(Resource):
#     def get_users(self):
#         users = User.query.all()
#         return users

#     def get(self):
#         users = self.get_users()
#         ret = ''
#         for user in users:
#             ret += '[email: {}, password: {}]'.format(user.email, user.password)
#         return ret

#     def post(self):
#         r_json = request.get_json()
#         email = r_json['email']
#         password = r_json['password']
#         user = User.query.filter_by(email=email).first()
#         if user:
#             return '{} is aleady exists'.format(email)
#         new_user = User(email, password)
#         db.session.add(new_user)
#         db.session.commit()
#         return 'create email: {}, pw: {} successcully'.format(email, password)

#     def put(self):
#         r_json = request.get_json()
#         _id = r_json['id']
#         password = r_json['password']
#         user = User.query.filter_by(id=_id).first()
#         if not user:
#             return '{} is not exists'.format(_id)
#         user.password = password
#         db.session.commit()
#         return 'update password successfully'

#     def delete(self):
#         r_json = request.get_json()
#         _id = r_json['id']
#         user = User.query.filter_by(id=_id).first()
#         if not user:
#             return '{} is not exists'.format(_id)
#         db.session.delete(user)
#         db.session.commit()
#         return '{} deleted successfully'.format(_id)

class Image(Resource):
    def get(self, name):
        return send_from_directory(IMAGE_PATH, name)

# class InterviewList(Resource):
#     def get(self):
#         article_id = request.args.get('article_id')
#         if article_id:
#             articles = Interview.query.filter_by(id=article_id).all()
#         else:
#             articles = Interview.query.all()

#         return jsonify(serializer(articles))

#     def post(self):
#         r_json = request.get_json()
#         id = r_json['id']
#         user = r_json['user']
#         title = r_json['title']
#         text = r_json['text']
#         like = r_json['like']
#         image = r_json['image']

#         new_article = Interview(id, user, password, title, text, like, image)
#         db.session.add(new_article)
#         db.session.commit()

#         return "write successfully"

class VisualList(Resource):
    def get(self):
        articles = Visual.query.all()
        return jsonify(serializer(articles))

    def post(self):
        r_json = request.get_json()
        title = r_json['title']
        image = r_json['image']

        new_article = Visual(title, image)
        db.session.add(new_article)
        db.session.commit()

        return "write successfully"

class ArticleList(Resource):
    def get_articles(self):
        article_id = request.args.get('article_id')
        if article_id:
            articles = Article.query.filter_by(id=article_id).all()
        else:
            articles = Article.query.all()

        return articles

    def get(self):
        articles = self.get_articles()
        return jsonify(serializer(articles))

    def post(self):
        r_json = request.get_json()
        print(r_json)
        user = r_json['user']
        password = r_json['password']
        title = r_json['title']
        # thumbnail = r_json['thumbnail']
        text = r_json['text']

        new_article = Article(user, password, title, text)
        db.session.add(new_article)
        db.session.commit()

        return "write successfully"

    # def put(self):
    #     r_json = request.get_json()
    #     user = r_json['user']
    #     password = r_json['password']
    #     title = r_json['title']
    #     new_title = r_json['new_title']
    #     new_text = r_json['new_text']
    #     articles = self.get_articles()

    #     for article in articles:
    #         if article['user'] == user & article['password'] == password & article['title'] == title :
    #             article['title'] = new_title
    #             article['text'] = new_text
    #     with open(self.filename, 'w') as fp:
    #         fp.write(json.dumps(articles))
    #     return "update successfully"

    def delete(self):
        r_json = request.get_json()
        user = r_json['user']
        password = r_json['password']
        new_articles = []
        articles = self.get_articles()
        for article in articles:
            if article['id'] == _id:
                continue
            new_articles.append(article)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(new_articles))
        return "delete successfully"


class CommentList(Resource):
    filename = 'comments.json'

    def get_comments(self):
        ret = []
        if os.path.exists(self.filename):
            with open(self.filename, 'r') as fp:
                ret = json.loads(fp.read())
        return ret

    def get(self):
        return json.dumps(self.get_comments())

    def post(self):
        r_json = request.get_json()
        user_id = r_json['user_id']
        article_id = r_json['article_id']
        content = r_json['content']
        comments = self.get_comments()
        _id = get_id(comments)
        r_json['id'] = _id

        comments.append(r_json)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(comments))
        return "write successfully"

    def put(self):
        r_json = request.get_json()
        _id = r_json['id']
        content = r_json['content']
        comments = self.get_comments()

        for comment in comments:
            if comment['id'] == _id:
                comment['content'] = content
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(comments))

        return "update successfully"

    def delete(self):
        r_json = request.get_json()
        _id = r_json['id']
        comments = self.get_comments()
        new_comments = []
        
        for comment in comments:
            if comment['id'] == _id:
                continue
            new_comments.append(comment)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(new_comments))
        return "delete successfully"


class LikeList(Resource):
    filename = 'likes.json'

    def get_likes(self):
        ret = []
        if os.path.exists(self.filename):
            with open(self.filename, 'r') as fp:
                ret = json.loads(fp.read())
        return ret

    def get(self):
        return json.dumps(self.get_likes())

    def post(self):
        r_json = request.get_json()
        user_id = r_json['user_id']
        article_id = r_json['article_id']
        likes = self.get_likes()
        new_likes = []
        found = False
        for like in likes:
            if like['user_id'] == user_id and like['article_id'] == article_id:
                found = True
                continue
            new_likes.append(like)
        if not found:
            _id = get_id(likes)
            r_json['id'] = _id
            new_likes.append(r_json)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(new_likes))
        if found:
            return "unlike successfully"
        return "like successfully"


# api.add_resource(UserList, '/api/users')
api.add_resource(ArticleList, '/api/articles')
# api.add_resource(InterviewList, '/api/interviews')
api.add_resource(CommentList, '/api/comments')
api.add_resource(LikeList, '/api/likes')
api.add_resource(Image, '/api/images/<name>')
api.add_resource(VisualList, '/api/visuals')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)