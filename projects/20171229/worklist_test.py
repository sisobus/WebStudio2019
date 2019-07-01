from flask import Flask, request
from flask_restful import Api, Resource
from flask_cors import CORS
import json
import os
from models import db, User, Article, Comment, Like

basedir = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
app = Flask(__name__)
app.config.update({
    'SQLALCHEMY_TRACK_MODIFICATIONS': True,
    "SQLALCHEMY_DATABASE_URI": SQLALCHEMY_DATABASE_URI,
})

cors = CORS(app)
api = Api(app)
db.init_app(app)

def serializer(l):
    ret = ''
    for row in l:
        ret += row.serialize()
    return ret


class ArticleList(Resource):

    def get(self):
        if not os.path.exists('works.json'):
            return 'works.json is not exists'
        with open('works.json', 'r') as fp:
            r = json.loads(fp.read())
        s = ''
        for d in r:
            title = d['title']
            img = d['img']
            width = d['width']
            height = d['height']
            s += '[title: {}, img: {}, width {}, height {}]'.format(title, img, width, height)
        return s

    def post(self):
        r_json = request.get_json()
        title = r_json['title']
        img = r_json['img']
        width = d['width']
        height = d['height']
        r = []
        if os.path.exists('works.json'):
            with open('works.json', 'r') as fp:
                r = json.loads(fp.read())
        for d in r:
            if title == d['title']:
                return '{} is aleady exists'.format(title)
        r.append(r_json)
        with open('works.json', 'w') as fp:
            fp.write(json.dumps(r))
        return 'title: {}, pw: {}, width {}, height {}'.format(title, img, width, height)

    def put(self):
        return 'put method'

    def delete(self):
        return 'delete method'


api.add_resource(ArticleList, '/api/articles')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
