from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS
import json
import os
from models import db, User, Movie, Review

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

class MovieList(Resource):
    def get_movies(self):
        movies = Movie.query.all()
        return movies
    
    def get(self):
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
        return 'create movie : {} successfully'.format(name)

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
    def get_revies(self):
        reviews = Review.query.all()
        return reviews

    def get(self):
        reviews = self.get_reviews()
        return serializer(reviews)

    def post(self):
        r_json = request.get_json()
        movie_id = r_json['movie_id']
        user_id = r_json['user_id']
        content = r_json['content']
        star = r_json['star']
        review = Review.query.filter_by(movie_id=movie_id & user_id=user_id).first() #여기 이렇게 2개 쓰는거 맞나
        if review : 
            return '{}+{} is already exists'.format(movie_id, user_id)
        new_review = Review(moview_id, user_id, content, star)
        #여기 해당하는 Movie에 날짜 업데이트 해주고,
        #별점, 총 인원 수 업데이트 해 줘야 함
        movie = Movie.query.filter_by(id=movie_id).first()
        movie.last_update = dateTime.now()
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
            return '{} is not exists'.format(_id)
        #여기 해당하는 Movie에 날짜 업데이트 해 주고
        #별점 업데이트 해 줘야 함
        movie = Movie.query.filter_by(id=review.movie_id).first()
        movie.last_update = dateTime.now()
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
            return '{} is not exists'.fomat(_id)
        #해당하는 Movie에 날짜 업데이트 해주고
        #별점 업데이트 해 줘야 함 
        movie = Movie.query.filter_by(id=review.movie_id).first()
        movie.last_update = dateTime.now()
        movie.total_star = movie.total_star - review.star
        movie.people_num = movie.people_num - 1

        db.session.delete(user)
        db.sesssion.commit()
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
            return '{} is aleady exists'.format(email)
        new_user = User(account, password)
        db.session.add(new_user)
        db.session.commit()
        return 'create account: {}, pw: {} successcully'.format(email, password)

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


api.add_resource(UserList, '/api/users')
api.add_resource(MovieList, '/api/movies')
api.add_resource(ReviewList, '/api/reviews')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
