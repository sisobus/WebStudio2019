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
    filename = 'articles.json'

    def get_articles(self):
        articles = []
        if os.path.exists(self.filename):
            with open(self.filename, 'r') as fp:
                articles = json.loads(fp.read())
        return articles

    def get(self):
        if not os.path.exists(self.filename):
            return 'articles.json does not exist'
        r = self.get_articles()
        s = ''
        for d in r:
            id = d['id']
            user_id = d['user_id']
            title = d['title']
            content = d['content']
            s += '[id: {}, user_id: {}, title: {}, content: {}]'.format(id, user_id, title, content)
        return s

    def post(self):
        r_json = request.get_json()
        user_id = r_json['user_id']
        title = r_json['title']
        content = r_json['content']
        r = self.get_articles()

        for d in r:
            if title == d['title']:
                return '{} is already taken'.format(title)

        _id = 0
        for d in r:
            _id = max(_id, d['id'])
        _id = _id + 1
        r_json['id'] = _id
        r.append(r_json)

        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(r))
        return 'id: {}, user_id: {}, title: {}, content: {}'.format(id, user_id, title, content)


    def put (self):
        r_json = request.get_json()
        _id = r_json['id']
        title = r_json['title']
        content = r_json['content']
        articles = self.get_articles()
        found = False
        for idx, _ in enumerate(articles):
            if articles[idx]['id'] == _id:
                found = True
                articles[idx]['title'] = title
                articles[idx]['content']= content
                with open(self.filename,'w') as fp:
                    fp.write(json.dumps(articles))
                return 'Edited successfully'

        return '{} does not exist'.format(_id)

    def delete (self):
        r_json = request.get_json()
        _id = r_json['id']
        articles = self.get_articles()
        found = False
        for idx, _ in enumerate(articles):
            if articles[idx]['id'] == _id:
                found = True
                del articles[idx]
                with open(self.filename, 'w') as fp:
                    fp.write(json.dumps(articles))
                return 'Deleted successfully'

        return '{} does not exist'.format(_id)


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
            return 'comments.json does not exist'
        r = self.get_comments()
        s = ''
        for d in r:
            id = d['id']
            user_id = d['user_id']
            article_id = d['article_id']
            content = d['content']
            s += '[id: {}, user_id: {}, article_id: {}, content: {}]'.format(id, user_id, article_id, content)
        return s

    def post(self):
        r_json = request.get_json()
        user_id = r_json['user_id']
        article_id = r_json['article_id']
        content = r_json['content']
        r = self.get_comments()
        _id = 0
        for d in r:
            _id = max(_id, d['id'])
        _id = _id +1
        r_json['id'] = _id
        r. append(r_json)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(r))
        return 'user_id: {}, article_id: {}, content: {}'. format(user_id, article_id, content)
       
    def put(self):
        r_json = request.get_json()
        _id = r_json['id']
        content = r_json['content']
        comments = self.get_comments()
        found = False
        for idx, _ in enumerate(comments):
            if comments[idx]['id'] == _id:
                found = True
                comments[idx]['content'] =content
                with open(self.filename, 'w') as fp:
                    fp.write(json.dumps(comments))
                return 'Comments Edited successfully'
        return '{} does not exist'.format(_id)

    def delete(self):
        r_json = request.get_json()
        _id = r_json['id']
        comments = self.get_comments()
        found = False
        for idx, _ in enumerate(comments):
            if comments[idx]['id'] == _id:
                found = True
                del comments[idx]
                with open(self.filename, 'w') as fp:
                    fp.write(json.dumps(comments))
                return 'Deleted successfully'
        return '{} does not exist'.format(_id)
         
    
api.add_resource(UserList, '/api/users')
api.add_resource(ArticleList, '/api/articles')
api.add_resource(CommentList, '/api/comments')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
