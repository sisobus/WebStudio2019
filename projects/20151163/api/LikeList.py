from flask import Flask, request, jsonify
from flask_restful import Api, Resource
import json
import cal_id
from models import db, Like, LikeSchema

like_schema = LikeSchema()
likes_schema = LikeSchema(many=True)

class LikeList(Resource):

	def get_likes(self):
		likes = Like.query.all()
		return likes

	def get(self):
		likes = self.get_likes()
		result = likes_schema.dump(likes)
		return jsonify(result.data)

	def post(self):
		r_json = request.get_json()
		user_id = r_json['user_id']
		article_id = r_json['article_id']
		like = Like.query.filter(user_id == user_id and article_id == article_id).first()
		if like:
			return 'Unlike successfully'
		new_like = Like(user_id, article_id)
		db.session.add(new_like)
		db.session.commit()
		return 'Like successfully'
