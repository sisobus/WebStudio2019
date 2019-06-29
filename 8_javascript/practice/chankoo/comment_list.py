from flask import request
from flask_restful import Resource
from models import db, Comment
from utils import serializer


class CommentList(Resource):
    def get(self):
        # article_id 를 쿼리로 받아 해당하는 아티클의 코멘트를 조회한다
        # 쿼리가 없으면 전체 코멘트를 조회한다
        article_id = request.args.get('article_id')
        if article_id:
            comments = Comment.query.filter_by(article_id = article_id).all()
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
        return 'create {}'.format(new_comment.__repr__())

    def put(self):
        r_json = request.get_json()
        put_id = r_json['id']
        content = r_json['content']

        comment = Comment.query.filter_by(id = put_id).first()
        if comment is None:
            return '{} does not exist'.format(put_id)
        comment.content = content

        db.session.commit()
        return 'update comment successfully'

    def delete(self):
        r_json = request.get_json()
        del_id = r_json['id']

        comment = Comment.query.filter_by(id=del_id).first()
        if comment is None:
            return '{} does not exist'.format(del_id)

        db.session.delete(comment)
        db.session.commit()
        return '{} deleted successfully'.format(del_id)