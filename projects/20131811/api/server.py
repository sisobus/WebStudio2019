from flask import Flask, request, jsonify, abort
from flask_restful import Api, Resource
from flask_cors import CORS
from datetime import datetime, timedelta
from sqlalchemy import desc
from models import db, User, Movie, Review, LoginSession
from flask_jwt_extended import (
    JWTManager, create_access_token, create_refresh_token,
    jwt_required, jwt_refresh_token_required, get_jwt_identity,
    get_jti, get_raw_jwt)

import json
import os

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
    return json.dumps(ret, ensure_ascii=False)

class MovieList(Resource):
    def get_movies(self):
        movies = Movie.query.all()
        return movies
    
    def get(self):
        order_option = request.args.get('order')
        movie_id = request.args.get('movie_id')
        if movie_id is not None:
            movie = Movie.query.filter_by(id=movie_id).first()
            return json.dumps(json.loads(movie.serialize()), ensure_ascii=False)
        if order_option == 'date':
            movies = Movie.query.order_by(desc(Movie.last_update)).all()
        elif order_option == 'star':
            movies = Movie.query.order_by(desc(Movie.total_star/Movie.people_num)).all()
        else :
            movies = self.get_movies()
        return serializer(movies)

    def post(self):
        r_json = request.get_json()
        name = r_json['name']
        photo = r_json['photo'] #사진처리
        movie = Movie.query.filter_by(name=name).first()
        if movie:
            return '{} is already exists'.format(name)
        new_movie = Movie(name, photo)
        db.session.add(new_movie)
        db.session.commit()
        return new_movie.id

    def put(self):
        r_json = request.get_json()
        _id = r_json['id']
        photo = r_json['photo'] #사진처리
        movie = Movie.query.filter_by(id=_id).first()
        if not movie : 
            return '{} is not exists'.format(_id)
        movie.photo = photo
        db.session.commit()
        return 'update photo successfully'

    def delete(self):
        r_json = request.get_json()
        _id = r_json['id']
        movie = Movie.query.filter_by(id=_id).first()
        if not movie :
            return '{} is not exists'.format(_id)
        db.session.delete(movie)
        db.session.commit()
        return '{} deleted successfully'.format(_id)


class ReviewList(Resource):
    def get_reviews(self):
        reviews = Review.query.all()
        return reviews

    def get(self):
        movie_id = request.args.get('movie_id')
        if movie_id is not None:
            reviews = Review.query.filter_by(movie_id=movie_id).order_by(desc(Review.id)).all()
        else:
            reviews = self.get_reviews()
        return serializer(reviews)

    def post(self):
        r_json = request.get_json()
        movie_id = r_json['movie_id']
        user_id = r_json['user_id']
        content = r_json['content']
        star = r_json['star']
        review = Review.query.filter_by(movie_id=movie_id, user_id=user_id).first() 
        #여기 이렇게 2개 쓰는거 맞나
        if review : 
            return '{}+{} is already exists'.format(movie_id, user_id)
        new_review = Review(movie_id, user_id, content, star)
        #여기 해당하는 Movie에 날짜 업데이트 해주고,
        #별점, 총 인원 수 업데이트 해 줘야 함
        movie = Movie.query.filter_by(id=movie_id).first()
        if movie is None :
            return 'movie {} is not exist'.format(movie_id)
        movie.last_update = datetime.now()
        movie.total_star = movie.total_star + star
        movie.people_num = movie.people_num + 1

        db.session.add(new_review)
        db.session.commit()
        return 'create {}+{} successfully'.format(movie_id, user_id)
        

    def put(self):
        r_json = request.get_json()
        _id = r_json['id']
        content = r_json['content']
        star = r_json['star']
        review = Review.query.filter_by(id=_id).first()
        if not review:
            return 'review {} is not exists and failled put '.format(_id)
        #여기 해당하는 Movie에 날짜 업데이트 해 주고
        #별점 업데이트 해 줘야 함
        movie = Movie.query.filter_by(id=review.movie_id).first()
        movie.last_update = datetime.now()
        movie.total_star = movie.total_star - review.star + star
        
        review.content = content
        review.star = star
        db.session.commit()
        return 'update successfully'

    def delete(self):
        r_json = request.get_json()
        _id = r_json['id']
        review=  Review.query.filter_by(id=_id).first()
        if not review:
            return 'review {} is not exists and failed delete'.format(_id)
        #해당하는 Movie에 날짜 업데이트 해주고
        #별점 업데이트 해 줘야 함 
        movie = Movie.query.filter_by(id=review.movie_id).first()
        movie.last_update = datetime.now()
        movie.total_star = movie.total_star - review.star
        movie.people_num = movie.people_num - 1

        db.session.delete(review)
        db.session.commit()
        return '{} deleted successfully'.format(_id)
    

class UserList(Resource):
    def get_users(self):
        users = User.query.all()
        return users

    def get(self):
        users = self.get_users()
        return serializer(users)

    def post(self):
        r_json = request.get_json()
        account = r_json['account']
        password = r_json['password']
        user = User.query.filter_by(account=account).first()
        if user:
            return 'fail'.format(account)
        new_user = User(account, password)
        db.session.add(new_user)
        db.session.commit()
        return 'success'.format(account, password)

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


class UserLogin(Resource):
    def post(self):
        r_json = request.get_json()
        account = r_json['account']
        password = r_json['password']
        user = User.query.filter_by(account=account).first()
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


api.add_resource(UserList, '/api/users')
api.add_resource(MovieList, '/api/movies')
api.add_resource(ReviewList, '/api/reviews')
api.add_resource(UserLogin, '/api/auth/login')
api.add_resource(PrivateRoute, '/api/private/routes')
api.add_resource(UserRefresh, '/api/auth/refresh')



if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.secret_key = 'app secret key'
    app.config['SESSION_TYPE'] = 'filesystem'
    app.run(host='0.0.0.0', port=5000, debug=True)
