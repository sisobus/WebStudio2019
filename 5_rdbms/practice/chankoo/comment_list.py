from flask import request
from flask_restful import Resource
from models import db, Comment


class CommentList(Resource):
    def _get_comments(self):
        return Comment.query.all()

    def get(self):
        comments = self._get_comments()

        repr_str = ''
        for comment in comments:
            repr_str += comment.__repr__()
        return repr_str

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