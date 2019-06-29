from flask import Flask, request
from flask_restful import Api, Resource
import json, os
from models import db, Comment, Article


class CommentList(Resource):

	def get_comment(self):
		comments = Comment.query.all()
		return comments

	def get(self):
		comments = self.get_comment()
		s = ''
		for comment in comments:
			s += '[Comment_id: {}, Article_number: {}, User_ID: {}, Content: {}]'.format(comment.id, comment.article_id, comment.user_id, comment.content)
		return s

	def post(self):
		r_json = request.get_json()
		user_id = r_json['user_id']
		article_id = r_json['article_id']
		content = r_json['content']
		article = Article.query.filter_by(id=article_id).first()
		if not article:
			return 'There is no article.'
		new_comment = Comment(user_id, article_id, content)
		db.session.add(new_comment)
		db.session.commit()
		return 'user_id: {}, article_number: {}, content: {} is successfully updated.'.format(user_id, article_id, content)

	def put(self):
		r_json = request.get_json()
		comment_id = r_json['id']
		content = r_json['content']
		comment = Comment.query.filter_by(id=comment_id).first()
		if not comment:
			return '{} is not exists'.format(comment_id)
		comment.content = content
		db.session.commit()
		return 'Successfully updated'

	def delete(self):
		r_json = request.get_json()
		comment_id = r_json['id']
		comment = Comment.query.filter_by(id=comment_id).first()
		if not comment:
			return '{} is not exists'.format(comment_id)
		db.session.delete(comment)
		db.session.commit()
		return 'comment_id {} is successfully deleted.'.format(comment_id)
