from flask import Flask, request
from flask_restful import Api, Resource
import json
import os

app = Flask(__name__)
api = Api(app)

class UserList(Resource):
    filename = 'users.json'

    def get_users(self):
        users = []
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
            s += '[email: {}, pw: {}]'.format(email, password)
        return s

    def post(self):
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        r = self.get_users()
        for d in r:
            if email == d['email']:
                return '{} is aleady exists'.format(email)
        _id = 0
        for d in r:
            _id = max(_id, d['id'])
        _id = _id + 1
        r_json['id'] = _id
        r.append(r_json)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(r))
        return 'email: {}, pw: {}'.format(email, password)

    def put(self):
        r_json = request.get_json()
        _id = r_json['id']
        password = r_json['password']
        users = self.get_users()
        found = False
        for idx, _ in enumerate(users):
            if users[idx]['id'] == _id:
                found = True
                users[idx]['password'] = password
        if not found:
            return '{} is not exists'.format(_id)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(users))
        return 'update password successfully'

    def delete(self):
        r_json = request.get_json()
        _id = r_json['id']
        users = self.get_users()
        found = False
        for idx, _ in enumerate(users):
            if users[idx]['id'] == _id:
                found = True
                del users[idx]
        if not found:
            return '{} is not exists'.format(_id)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(users))
        return '{} deleted successfully'.format(_id)


class ArticleList(Resource):
    filename = 'articles.json'  #File Name

    def get_article(self):
        article = []
        if os.path.exists(self.filename):
            with open(self.filename, 'r') as fp: 
                article = json.loads(fp.read())
        return article

    def get(self):
        if not os.path.exists(self.filename):
            return 'articles.json is not exists'
        r = self.get_article()
        s = ''
        for d in r:
            user_id = d['user_id']
            title = d['title']
            content = d['content']
            s += '[user_id: {}, title: {}, content: {}]'.format(user_id, title, content)
        return s


    def post(self):
        r_json = request.get_json()
        user_id = r_json['user_id']
        title = r_json['title']
        content = r_json['content']
        r = self.get_article()
        article_id = 0
        for d in r:
            article_id = max(article_id, d['article_id'])
        article_id = article_id + 1
        r_json['article_id'] = article_id
        r.append(r_json)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(r))
        return 'user_id: {}, title: {} content:{}'.format(user_id, title, content)

    def put(self): 
        r_json = request.get_json()
        article_id = r_json['article_id']
        title = r_json['title']
        content = r_json['content']
        article_i = self.get_article()
        found = False
        for idx, _ in enumerate(article_i):
            if article[idx]['article_id'] == article_id:
                found = True
                article_i[idx]['title'] = title
                article[idx]['content'] = content
        if not found:
            return '{} is not exists'.format(article_id)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(article_i))
        return 'update article successfully'


    def delete(self):
        r_json = request.get_json()
        article_id = r_json['article_id']
        article_id = self.get_article()
        found = False
        for idx, _ in enumerate(article_id):
            if article_id[idx]['id'] == article_id:
                found = True
                del article_id[idx]
        if not found:
            return '{} is not exists'.format(article_id)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(article_id))
        return '{} deleted article successfully'.format(article_id)


class CommentList(Resource):
    filename = 'comments.json'

    def get_'comment(slef):
        comment = []
        if os.path.exists(self.filename):
            with open(self.filename, 'r') as fp:
                users = json.loads(fp.read())
        return comment

    def get(self):
        if not os.path.exists(self.filename):
            return 'comments.json is not exists'
        r = self.get_article()
        s = ''
        for d in r:
            user_id = d['user_id']
            title = d['article_id']
            content = d['content']
            s += '[user_id: {}, article_id: {}, content: {}]'.format(user_id, title, content)
        return s

    def post(self):
        #First, we assume that all input is received by the user. If not, you can connect by DB adress
        #Calling another class variable -> http://schoolofweb.net/blog/posts/%ED%8C%8C%EC%9D%B4%EC%8D%AC-oop-part-3-%ED%81%B4%EB%9E%98%EC%8A%A4-%EB%B3%80%EC%88%98class-variable/
        r_json = request.get_json()
        user_id = r_json['user_id']
        article_id = r_json['article_id']
        content = r_json['content']
        r = self.get_comment()
        article_id = 0
         for d in r:
            comment_id = max(comment_id, d['comment_id'])
        comment_id = comment_id + 1
        r_json['comment_id'] = comment_id
        r.append(r_json)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(r))
        return 'user_id: {}, article_id: {} content:{}'.format(user_id, article_id, content)

    def put(self):
        r_json = request.get_json()
        comment_id = r_json['comment_id']
        content = r_json['content']
        comment_i = self.get_comment()
        found = False
        for idx, _ in enumerate(article_i):
            if article[idx]['comment_id'] == comment_id:
                found = True
                article[idx]['content'] = content
        if not found:
            return '{} is not exists'.format(comment_id)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(comment_i))
        return 'update comment successfully'

    def delete(self):
        r_json = request.get_json()
        comment_id = r_json['comment_id']
        comment_id = self.get_article()
        found = False
        for idx, _ in enumerate(comment_id):
            if  comment_id[idx]['comment_id'] ==  comment_id:
                found = True
                del  comment_id[idx]
        if not found:
            return '{} is not exists'.format( comment_id)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(comment_id))
        return '{} deleted comment successfully'.format(comment_id)

class LikeList(Resource):
    def get(self):
        return ""

    def post(self):
        return ""

    def put(self):
        return ""

    def delete(self):
        return ""


api.add_resource(UserList, '/api/users')
api.add_resource(ArticleList, '/api/articles')
api.add_resource(CommentList, '/api/comments')
api.add_resource(LikeList, '/api/likes')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)


