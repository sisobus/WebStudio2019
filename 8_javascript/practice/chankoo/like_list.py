from flask import request
from flask_restful import Resource
from models import db, Like
from utils import serializer

class LikeList(Resource):
    def get(self):
        article_id = request.args.get('article_id')
        user_id = request.args.get('user_id')

        if article_id and user_id: # 게시글과 유저 정보를 모두 쿼리받은 경우
            likes = Like.query.filter_by(article_id=article_id, user_id=user_id).all()
        elif article_id:
            likes = Like.query.filter_by(article_id=article_id).all()
        elif article_id:
            likes = Like.query.filter_by(user_id=user_id).all()
        else:
            likes = Like.query.all()

        return serializer(likes)

    def post(self):
        r_json = request.get_json()
        user_id = r_json['user_id']
        article_id = r_json['article_id']

        like = Like.query.filter_by(user_id=user_id, article_id=article_id).first()
        if like is not None: # like 존재하면
            db.session.delete(like)
            db.session.commit()
            return 'unliked successfully'

        new_like = Like(user_id, article_id)
        db.session.add(new_like)
        db.session.commit()
        return 'liked successfully'

