from flask import Flask, request
from flask_restful import Api, Resource
import json
import os
from models import db, User, Article, Comment, Like

class CommentList(Resource):
    def get_comments(self):
        comments = Comment.query.all()
        return comments

    def get(self):
        comments = self.get_comments()
        ret = ''
        for comment in comments:
            ret += '[user_id : {}, article_id : {}, content : {}]'.format(comment.user_id, comment.article_id, comment.content)
        return ret

    def post(self):
        r_json = request.get_json()
        user_id = r_json['user_id']
        article_id = r_json['article_id']
        content = r_json['content']
        new_comment = Comment(user_id, article_id, content)
        db.session.add(new_comment)
        db.session.commit()
        return 'create user_id : {}, article_id : {}, content : {} successcully'.format(user_id, article_id, content)

    def put(self):
        r_json = request.get_json()
        _id = r_json['id']
        content = r_json['content']
        comment = Comment.query.filter_by(id=_id).first()
        if not comment:
            return '{} is not exists'.format(_id)
        comment.content = content
        db.session.commit()
        return 'update comment successfully'

    def delete(self):
        r_json = request.get_json()
        _id = r_json['id']
        comment = Comment.query.filter_by(id=_id).first()
        if not comment:
            return '{} is not exists'.format(_id)
        db.session.delete(comment)
        db.session.commit()
        return '{} deleted successfully'.format(_id)
