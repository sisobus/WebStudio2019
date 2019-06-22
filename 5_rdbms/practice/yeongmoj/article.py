from flask import Flask, request
from flask_restful import Api, Resource
import json
import os
from models import db, User, Article, Comment, Like

class ArticleList(Resource):
    def get_articles(self):
        articles = Article.query.all()
        return articles

    def get(self):
        articles = self.get_articles()
        ret = ''
        for article in articles:
            ret += '[id : {}, user_id : {}, title : {}, content : {}]'.format(
            article.id, article.user_id, article.title, article.content)
        return ret

    def post(self):
        r_json = request.get_json()
        user_id = r_json['user_id']
        title = r_json['title']
        content = r_json['content']
        new_article = Article(user_id, title, content)
        db.session.add(new_article)
        db.session.commit()
        return 'create user_id : {}, title : {}, content : {}successcully'.format(
        user_id, title, content)

    def put(self):
        r_json = request.get_json()
        _id = r_json['id']
        title = r_json['title']
        content = r_json['content']
        article = Article.query.filter_by(id=_id).first()
        if not article:
            return '{} is not exists'.format(_id)
        article.title = title
        article.content = content
        db.session.commit()
        return 'update title, content successfully'

    def delete(self):
        r_json = request.get_json()
        _id = r_json['id']
        article = Article.query.filter_by(id=_id).first()
        if not article:
            return '{} is not exists'.format(_id)
        db.session.delete(article)
        db.session.commit()
        return '{} deleted successfully'.format(_id)
