from flask import Flask, request
from flask_restful import Api, Resource
import json
import os

app = Flask(__name__)
api = Api(app)

def get_id(l):
    _id = 0
    for d in l:
        _id = max(d['id'], _id)
    return _id + 1


class UserList(Resource):
    filename = 'users.json'

    def get_users(self):
        users = []
        if os.path.exists(self.filename):
            with open(self.filename, 'r') as fp:
                users = json.loads(fp.read())
        return users

    def get(self):
        return json.dumps(self.get_users())

    def post(self):
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        r = self.get_users()
        for d in r:
            if email == d['email']:
                return '{} is aleady exists'.format(email)
        _id = get_id(r)
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
        ret = []
        if os.path.exists(self.filename):
            with open(self.filename, 'r') as fp:
                ret = json.loads(fp.read())
        return ret

    def get(self):
        return json.dumps(self.get_articles())

    def post(self):
        r_json = request.get_json()
        user_id = r_json['user_id']
        title = r_json['title']
        content = r_json['content']
        articles = self.get_articles()

        _id = get_id(articles)
        r_json['id'] = _id
        articles.append(r_json)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(articles))
        return "write successfully"

    def put(self):
        r_json = request.get_json()
        _id = r_json['id']
        title = r_json['title']
        content = r_json['content']
        articles = self.get_articles()

        for article in articles:
            if article['id'] == _id:
                article['title'] = title
                article['content'] = content
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(articles))
        return "update successfully"

    def delete(self):
        r_json = request.get_json()
        _id = r_json['id']
        new_articles = []
        articles = self.get_articles()
        for article in articles:
            if article['id'] == _id:
                continue
            new_articles.append(article)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(new_articles))
        return "delete successfully"


class CommentList(Resource):
    filename = 'comments.json'

    def get_comments(self):
        ret = []
        if os.path.exists(self.filename):
            with open(self.filename, 'r') as fp:
                ret = json.loads(fp.read())
        return ret

    def get(self):
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
        return "write successfully"

    def put(self):
        r_json = request.get_json()
        _id = r_json['id']
        content = r_json['content']
        comments = self.get_comments()

        for comment in comments:
            if comment['id'] == _id:
                comment['content'] = content
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(comments))

        return "update successfully"

    def delete(self):
        r_json = request.get_json()
        _id = r_json['id']
        comments = self.get_comments()
        new_comments = []
        
        for comment in comments:
            if comment['id'] == _id:
                continue
            new_comments.append(comment)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(new_comments))
        return "delete successfully"


class LikeList(Resource):
    filename = 'likes.json'

    def get_likes(self):
        ret = []
        if os.path.exists(self.filename):
            with open(self.filename, 'r') as fp:
                ret = json.loads(fp.read())
        return ret

    def get(self):
        return json.dumps(self.get_likes())

    def post(self):
        r_json = request.get_json()
        user_id = r_json['user_id']
        article_id = r_json['article_id']
        likes = self.get_likes()
        new_likes = []
        found = False
        for like in likes:
            if like['user_id'] == user_id and like['article_id'] == article_id:
                found = True
                continue
            new_likes.append(like)
        if not found:
            _id = get_id(likes)
            r_json['id'] = _id
            new_likes.append(r_json)
        with open(self.filename, 'w') as fp:
            fp.write(json.dumps(new_likes))
        if found:
            return "unlike successfully"
        return "like successfully"


api.add_resource(UserList, '/api/users')
api.add_resource(ArticleList, '/api/articles')
api.add_resource(CommentList, '/api/comments')
api.add_resource(LikeList, '/api/likes')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
