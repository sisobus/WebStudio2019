from flask import request
from flask_restful import Resource
from models import db, Like


class LikeList(Resource):
    def _get_likes(self):
        return Like.query.all()

    def get(self):
        likes = self._get_likes()

        repr_str = ''
        for like in likes:
            repr_str += like.__repr__()
        return repr_str

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

