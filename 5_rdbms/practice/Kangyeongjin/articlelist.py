from flask import Flask, request
from flask_restful import Api, Resource
import json, os
from models import db, Article


class ArticleList(Resource):
	
	def get_article(self):
		articles = Article.query.all()
		return articles

	def get(self):
		articles = self.get_article()
		s = ''
		for article in articles:
			s += '[Article_number : {}, Writer : {}, Title : {}, Content :{}]'.format(article.id, article.user_id, article.title, article.content)
		return s

	def post(self):
		r_json = request.get_json()
		user_id = r_json['user_id']
		title = r_json['title']
		content = r_json['content']
		new_article = Article(user_id, title, content)
		db.session.add(new_article)
		db.session.commit()
		return 'Title : {}, Content : {} is successfully uploaded'.format(title, content)

	def put(self):
		r_json = request.get_json()
		article_id = r_json['id']
		title = r_json['title']
		content = r_json['content']
		article = Article.query.filter_by(id=article_id).first()
		if not article:
			return 'Article number {} is not exists.'.format(article_id)
		article.title = title
		article.content = content
		db.session.commit()
		return 'The article is successfullyi fixed'

	def delete(self):
		r_json = request.get_json()
		article_id = r_json['id']
		article = Article.query.filter_by(id=article_id).first()
		if not article:
			return 'Article number {} is not exists'.format(article_id)
		db.session.delete(article)
		db.session.commit()
		return 'Article_number {} is successfully deleted'.format(article_id)

