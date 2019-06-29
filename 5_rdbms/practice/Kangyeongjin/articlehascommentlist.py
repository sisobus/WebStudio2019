from flask import Flask, request
from flask_restful import Api, Resource
import os
import json


class ArticleHasCommentList(Resource):
	def get(self, article_number):

		if not os.path.exists('comments.json'):
			return 'There is no comment'
		r = []
		if os.path.exists('comments.json'):
			with open('comments.json', 'r') as fp:
				r = json.loads(fp.read())
		s = ''
		found = False
		for idx, _ in enumerate(r):
			if r[idx]['article_id'] == article_number:
				found = True
				s += '[Article_number: {}, User_id: {}, content: {}]'.format(r[idx]['article_id'],r[idx]['user_id'],r[idx]['content'])
		if not found:
			return 'There are no comments or article'
		return s

