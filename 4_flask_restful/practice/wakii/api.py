from flask import Flask, request
from flask_restful import Api, Resource
import json
import os

app = Flask(__name__)
api = Api(app)

def get_id(l):
	_id = 0
	for d in l:
		_id = max(d['id'],_id)
	return _id +1	
class UserList(Resource):
	filename = 'users.json'

	def get_users(self):
		users= []
		if os.path.exists(self.filename):
			with open(self.filename, 'r') as fp:
				users = json.loads(fp.read())
		return users

	def get(self):
		if not os.path.exists(self.filename):
			return 'users.json is not exists'
		r = self.get_users()
		s = ''
		for d in r:
			email = d['email']
			password = d['password']
			s += '[email : {}, pw: {}]'.format(email,password)
		return s

	def post(self):
		r_json = request.get_json()
		email = r_json['email']
		password = r_json['password']
		r = self.get_users()
#		_id = 0
		for d in r:
			if email == d['email']:
				return '{} already exists.' 
#			_id = max(_id,d['id'])
#		_id +=1
		_id = get_id(r)		
		r_json['id'] = _id	
		r.append(r_json)
		with open(self.filename, 'w') as fp:
			fp.write(json.dump(r))
		return 'email: {}, pw: {}'.format(email,password)

	def put(self):
		r_json = request.get_json()
	#	email = r_json['email']
		_id = r_json['id']
		password = r_json['password']
		users = self.get_users()
		found = False
		for idx, _ in enumerate(users):
			if users[idx]['id'] == _id:
				found = True
				users[idx]['password'] == password
		if not found :
			return '{} not exists'.format(_id)
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(users))
		return 'update password successfully'
		
	def delete(self):
		r_json = request.get_json()
	#	email = r_json('email')
		_id = r_json['id']
		users = self.get_user()
		found = False
		for idx, _ in enumerate(users):
			if users[idx]['id'] == _id:
				found = True
				del users[idx]
		if not found:
			return '{} not exists'.format(_id)
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(users))
		return '{} deleted successfully'.format(_id)

class Article(Resource):
	filename = 'articles.json'

	def get_articles(self):
		articles = []
		if os.path.exists(self.filename):
			with open(self.filename, 'r') as fp:
				articles = json.loads(fp.read())
		return articles

	def get(self):
		if not os.path.exists(self.filename):
			return 'File \'Articles.json\' not exists'
	#	r = self.get_articles()
	#	s = ''
	#	for d in r:
	#		s+= '\n [User_id :{}, Title : {}, Content : {}]'.format(d['user_id'],d['title'],d['content'])
	#	return s 
		return json.dumps(self.get_articles())	
	
	def post(self):
		r_json = request.get_json()
		user_id = r_json['user_id']
		title = r_json['title']
		content = r_json['content']
		articles = self.get_articles() # 오답노트
		_id = get_id(articles)		
		r_json['id'] = _id
		articles.append(r_json)	
		with open(self.filename, 'w') as fp :
			fp.write(json.dumps(articles))
		return '{} has written down the content : {}, \'{}\''.format(user_id,title,content)
			
	def put(self):
		r_json = request.get_json()
		_id = r_json['id']
		title = r_json['title']
		content = r_json['content']
		articles = self.get_articles()
		for d in articles:
			if d['id'] == _id:
				d['title'] = title
				d['content'] = content
			break
		else :
			return 'Article {} has not found.'.format(_id)
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(articles))
		return 'Update Completed'
		
				
	def delete(self):
		r_json = request.get_json()
		_id = r_json['id']
		articles = self.get_articles()
		for d in articles:
			if d['id'] == _id:
				articles.remove(d)
				break
		else :
			return 'Article {} has not found.'.format(_id)
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(articles))
		return '{} has been deleted.'.format(_id)
		
class CommentList(Resource):
	filename = 'comments.json'

	def get_comments(self):
		comments = []
		if os.path.exists(self.filename):
			with open(self.filename, 'r') as fp:
				comments = json.loads(fp.read())
		return comments
	
	def get(self):
		if not os.path.exists(self.filename):
			return 'File \'comments.json\' not exists.'
#		r = self.get_comments()
#		s = ''
#		for d in r:
#			s += '\n [User ID : {}, Article ID : {}, Content : {}]'
#		return s
		return json.dumps(self.get_comments())
	
	def post(self):
		r_json = request.get_json()
		user_id = r_json['user_id']
		article_id = r_json['article_id']
		content = r_json['content']
		comments = self.get_comments()
		_id = get_id(comments)
		r_json['id'] = _id
		comments.append(r_json)
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(comments))
		return '{} has written down the comment on article {}'.format(user_id, article_id)
		
	def put(self):
		r_json = request.get_json()
		_id = r_json['id']
		content = r_json['content']
		comments = self.get_comments()
		for d in comments:
			if d['id'] == _id:
				d['content'] = content
			break
		else :
			return 'Comment {} has not found.'.format(_id)
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(comments))
		return 'Update completed'
		
	def delete(self):
		r_json = request.get_json()
		_id = r_json['id']
		comments = self.get_comments()
		new_comments = []
		for comment in comments:
			if comment['id'] == _id:
				continue
			new_comments.append(comment)
		with open(self.filename, 'w') as fp :
			fp.write(json.dumps(new_comments))
		return '{} has been deleted.'.format(_id)			
			
class LikeList(Resource):
	filename = 'likes.json'
	
	def get_likes(self):
		likes = []
		if os.path.exists(self.filename):
			with open(self.filename, 'r') as fp:
				likes = json.loads(fp.read())
		return likes
	
	def get(self):
		return json.dumps(self.get_likes())

	def post(self):
		r_json = request.get_json()
		user_id = r_json['user_id']
		articles_id = r_json['article_id']
		likes = self.get_likes()
		new_likes = []
		found = True
		for like in likes:
			if like['user_id'] == user_id and articles_id == like['article_id'] :
				found = True
				continue
			new_likes.append(like)
		if not found :
			_id = get_id(likes)
			r_json['id'] = _id
			new_likes.append(r_json)
		if found :
			return "Unlike Successfully"
		with open(self.filename, 'w') as fp:
			fp.write(json.dumps(new_likes))
		return "like Successfully"
		


api.add_resource(UserList, '/api/users/')
api.add_resource(Article, '/api/articles')
api.add_resource(CommentList, '/api/comments')
api.add_resource(LikeList, '/api/likes')

if __name__ == '__main__':
	app.run(host='0.0.0.0', port = 5000, debug=True)
	











