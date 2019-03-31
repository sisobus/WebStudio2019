from flask import Flask, request
from flask_restful import Api, Resource
import os
import json

app = Flask(__name__)
api = Api(app)

article_pages = 0

class UserList(Resource):
	filename = 'users.json'
	def Open_json(self):
		users = []
		if os.path.exists(self.filename):
			with open(self.filename, 'r') as fp:
				users = json.loads(fp.read())
		return users
	
#	def Write_json(self):
#		with open(self.filename, 'w') as fp:
#			fp.write(json.dumps(self))
	

	def get(self):
		if not os.path.exists(self.filename):
			return 'users.json is not exists, get out.'
		r = self.Open_json()
		s = ''
		for d in r:
			email = d['email']
			password = d['password']
			s += '[email: {}, password: {}]'.format(email, password)
		return s

	def post(self):
		r_json = request.get_json()
		email = r_json['email']
		password = r_json['password']
		r = []
		if os.path.exists(self.filename):
			r = self.Open_json()
		for d in r:
			if email == d['email']:
				return '{} is aleady exists'.format(email)
		_id = 0
		for d in r:
			_id = max(_id, d['id'])
		_id = _id + 1
		r_json['id'] = _id
		r.append(r_json)
#		r.Write_json()
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(r))
		return 'email: {}, password: {}, is granted entry'.format(email, password)

	def put(self):
		r_json = request.get_json()
		email = r_json['email']
		password = r_json['password']
		r = []
		found = False
		if os.path.exists('users.json'):
			r = self.Open_json()
		for idx, _ in enumerate(r):
			if r[idx]['email'] == email:
				found = True
				r[idx]['password'] = password
		if not found:
			return '{} is not exists'.format(email)
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(r))
		return 'Password has changed to {}'.format(password)		

	def delete(self):
		r_json = request.get_json()
		email = r_json['email']
		r = self.Open_json()
		found = False
		for idx, _ in enumerate(r):
			if r[idx]['email'] == email:
				found = True
				del r[idx]
		if not found:
		 	return 'Email doent exist'
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(r))
		return 'remote successfully'


class ArticleList(Resource):
	filename = 'Articles.json'
    
	def Open_json(self):
		article = []
		if os.path.exists(self.filename):
			with open(self.filename, 'r') as fp:
				article = json.loads(fp.read())
		return article
 
	def get(self):
		if not os.path.exists(self.filename):
			return 'there is no article'
		r = self.Open_json()
		s = ''
		for d in r:
			article_id = d['article_id']
			user_id = d['user_id']
			title = d['title']
			content = d['content']
			s += '[Article_number : {}, Writer : {}, Title : {}, Content :{}]'.format(article_id, user_id, title, content)
		return s
 
	def post(self):
		r_json = request.get_json()
		user_id = r_json['user_id']
		title = r_json['title']
		content = r_json['content']
		r = self.Open_json()
		article_id = 0
		for d in r:
			article_id = max(article_id, d['article_id'])
		article_id = article_id + 1
		r_json['article_id'] = article_id
		article_pages = articles_id
		r.append(r_json)
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(r))
		return 'Article_number : {}, Title : {}, Content : {} is successfully uploaded'.format(article_id, title, content)

	def put(self):
		r_json = request.get_json()
		article_id = r_json['article_id']
		title = r_json['title']
		content = r_json['content']
		r = self.Open_json()
		found = False
		for idx, _ in enumerate(r):
			if r[idx]['article_id'] == article_id:
				found = True
				r[idx]['title'] = title
				r[idx]['content'] = content
		if not found:
			return 'Article_number {} is not exists'.format(article_id)
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(r))
		return 'The article is successfullyi fixed'

	def delete(self):
		r_json = request.get_json()
		article_id = r_json['article_id']
		r = self.Open_json()
		found = False
		for idx, _ in enumerate(r):
			if r[idx]['article_id'] == article_id:
				found = True
				del r[idx]
		if not found:
			return 'Article_number {} is not exists'.format(article_id)
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(r))
		return 'Article_number {} is successfully deleted'.format(article_id)


class CommentList(Resource):
	filename = 'Comments.json'

	def Open_json(self):
		comments = []
		if os.path.exists(self.filename):
			with open(self.filename, 'r') as fp:
				comments = json.loads(fp.read())
		return comments

	def get(self):
		if not os.path.exists(self.filename):
			return 'there is no comment'
		r = self.Open_json()
		s = ''
		for d in r:
			user_id = d['user_id']
			comment_id = d['comment_id']
			article_id = d['article_id']
			content = d['content']
			s += '[Comment_id: {}, Article_number: {}, User_ID: {}, Content: {}]'.format(comment_id, article_id, user_id, content)
		return s

	def post(self):
		r_json = request.get_json()
		user_id = r_json['user_id']
		article_id = r_json['article_id']
		content = r_json['content']
		r = self.Open_json()

		articleList = []
		if os.path.exists('Articles.json'):
			with open('Articles.json', 'r') as fp:
				articleList = json.loads(fp.read())
		
		found = False
		for idx, _ in enumerate(articleList):
			if articleList[idx]['article_id'] == article_id:
				found = True
				continue
		if not found:
			return 'there is no article_number {}'.format(article_id)

		comment_id = 0
		for d in r:
			comment_id = max(comment_id, d['comment_id'])
		comment_id = comment_id + 1
		r_json['comment_id'] = comment_id
		r.append(r_json)
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(r))
		return 'user_id: {}, article_number: {}, content: {} is successfully updated.'.format(user_id, article_id, content)

	def put(self):
		r_json = request.get_json()
		comment_id = r_json['comment_id']
		content = r_json['content']
		r = self.Open_json()
		found = False
		for idx, _ in enumerate(r):
			if r[idx]['comment_id'] == comment_id:
				found = True
				r[idx]['content'] = content
		if not found:
			return 'comment_id {} is not exists.'.format(comment_id)
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(r))
		return 'Successfully updated'

	def delete(self):
		r_json = request.get_json()
		comment_id = r_json['comment_id']
		r = self.Open_json()
		found = False
		for idx, _ in enumerate(r):
			if r[idx]['comment_id'] == comment_id:
				found = True
				del r[idx]
		if not found:
		 	return 'comment_id {} is not exists.'.format(comment_id)
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(r))
		return 'comment_id {} is successfully deleted.'.format(comment_id)


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

api.add_resource(UserList, '/api/users')
api.add_resource(ArticleList, '/api/articles')
api.add_resource(CommentList, '/api/comments')
api.add_resource(ArticleHasCommentList, '/api/articles/<int:article_number>/comments')

if __name__ == '__main__':
	app.run(host='0.0.0.0', port=5002, debug=True)
