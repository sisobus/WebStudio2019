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
    ret = []
    for row in l:
        ret.append(json.loads(row.serialize()))
    return json.dumps(ret)


class ArticleList(Resource):
    def get_articles(self):
        articles = Article.query.all()
        return articles

    def get(self):
        articles = self.get_articles()
        return serializer(articles)

    def post(self):
        r_json = request.get_json()
        user_id = r_json['user_id']
        title = r_json['title']
        content = r_json['content']
        email = r_json['email']

        new_article = Article(user_id, title, content)
        db.session.add(new_article)
        db.session.commit()
        return "write successfully"


api.add_resource(ArticleList, '/api/articles')


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
