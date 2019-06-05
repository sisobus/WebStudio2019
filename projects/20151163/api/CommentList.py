from flask import Flask, request, jsonify
from flask_restful import Api, Resource
import json
import cal_id
from models import db, Comment, CommentSchema

comment_schema = CommentSchema()
comments_schema = CommentSchema(many=True)

class CommentList(Resource):

	def get_comments(self):
		comments = Comment.query.all()
		return comments

	def get(self):
		comments = self.get_comments()
		result = comments_schema.dump(comments)
		return jsonify(result.data)

	def post(self):
		r_json = request.get_json()
		user_id = r_json['user_id']
		article_id = r_json['article_id']
		content = r_json['content']
		new_comment = Comment(user_id, article_id, content)
		db.session.add(new_comment)
		db.session.commit()
		return "Comment written successfully"

	def put(self):
		r_json = request.get_json()
		_id = r_json['id']
		content = r_json['content']
		comment = Comment.query.filter_by(id=_id).first()
		if not comment:
			return '{} does not exist'.format(_id)
		comment.content = content
		db.session.commit()
		return "Comment # {} Updated successfully".format(_id)

	def delete(self):
		r_json = request.get_json()
		_id = r_json['id']
		comment = Comment.query.filter_by(id=_id).first()
		if not comment:
			return '{} does not exist'.format(_id)
		db.session.delete(comment)
		db.session.commit()
		return "{} Deleted successfully".format(_id)
