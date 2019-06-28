from flask import Flask, request
from flask_restful import Api, Resource
import json
import cal_id
from models import db, Article


class ArticleList(Resource):

	def get_articles(self):
		articles = Article.query.all()
		return articles

	def get(self):
		articles =self.get_articles()
		ret = ''
		for article in articles:
		    ret += '[id: {}, user_id: {}, title: {}, content: {}]'.format(article.id, article.user_id, article.title, article.content)
		return ret

	def post(self):
		r_json = request.get_json()
		user_id = r_json['user_id']
		title = r_json['title']
		content = r_json['content']
		article = Article.query.filter_by(title = title).first()
		if article: 
		    return '{} already exists'.format(title)
		new_article = Article(user_id, title, content)
		db.session.add(new_article)
		db.session.commit()
		return 'create user_id: {}, title: {}, content: {} successfully'.format(user_id, title,content)

	def put(self):
		r_json = request.get_json()
		_id = r_json['id']
		title = r_json['title']
		content = r_json['content']
		article = Article.query.filter_by(id=_id).first()
		if not article:
		    return '{} does not exist'.format(_id)
		article.title = title
		article.content = content
		db.session.commit()
		return '{} Updated successfully'.format(_id)

	def delete(self):
		r_json = request.get_json()
		_id = r_json['id']
		article = Article.query.filter_by(id=_id).first()
		if not article:
		    return '{} does not exist'.format(_id)
		db.session.delete(article)
		db.session.commit()
		return "{} Deleted successfully".format(_id)
