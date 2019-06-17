from flask import Flask, request, jsonify, abort
from flask_restful import Api, Resource
from flask_cors import CORS
import json
import os
from models import db, User, Article, Comment, Like, LoginSession
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token,
    jwt_required, jwt_refresh_token_required, get_jwt_identity,
    get_jti, get_raw_jwt)
from datetime import timedelta

basedir = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
app = Flask(__name__)
app.config.update({
    'SQLALCHEMY_TRACK_MODIFICATIONS': True,
    "SQLALCHEMY_DATABASE_URI": SQLALCHEMY_DATABASE_URI,
    'SECRET_KEY': 'THISISSECRETKEYOFTHISPROJECTHAHA',
    'JWT_ACCESS_TOKEN_EXPIRES': timedelta(minutes=15),
    'JWT_REFRESH_TOKEN_EXPIRES': timedelta(days=30)
})
cors = CORS(app)
api = Api(app)
db.init_app(app)
jwt = JWTManager(app)

def serializer(l):
    ret = []
    for row in l:
        ret.append(json.loads(row.serialize()))
    return ret


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
        return jsonify(serializer(articles))

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


class UserLogin(Resource):
    def post(self):
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        user = User.query.filter_by(email=email).first()
        if user is None:
            abort(400, 'User is not exists')
        if not user.check_password(password):
            abort(400, 'Password is incorrect')

        _user = json.loads(user.serialize())
        del _user['password']
        access_token = create_access_token(identity=_user)
        refresh_token = create_refresh_token(identity=_user)
        jti = get_jti(refresh_token)
        _user['token'] = access_token
        _user['refresh'] = refresh_token
        login_session = LoginSession.query.filter_by(
            user_id=user.id).first()
        if login_session:
            login_session.jti = jti
        else:
            new_login_session = LoginSession(
                user.id, jti)
            db.session.add(new_login_session)
        try:
            db.session.commit()
        except Exception as e:
            print(e)
            abort(400, e)
        return jsonify({ 'message': 'login successfully', 'data': _user })
        

class PrivateRoute(Resource):
    @jwt_required
    def get(self):
        return jsonify({ 'message': 'This is private route!'})


class UserRefresh(Resource):
    @jwt_refresh_token_required
    def post(self):
        current_user = get_jwt_identity()
        login_session = LoginSession.query.filter_by(
            user_id=current_user['id']).first()
        if login_session is None:
            abort(401)
        raw_jwt = get_raw_jwt()
        jti = raw_jwt['jti']
        if login_session.jti != jti:
            abort(401)
        ret = {
            'token': create_access_token(identity=current_user)
        }
        return jsonify({'message': 'Refresh successfully', 'data': ret})

api.add_resource(UserRefresh, '/api/auth/refresh')
api.add_resource(PrivateRoute, '/api/private/routes')
api.add_resource(UserLogin, '/api/auth/login')
api.add_resource(UserList, '/api/users')
api.add_resource(ArticleList, '/api/articles')
api.add_resource(CommentList, '/api/comments')
api.add_resource(LikeList, '/api/likes')


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
