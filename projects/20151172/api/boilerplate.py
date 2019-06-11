from flask import Flask, request, send_from_directory
from flask_restful import Api, Resource
import json
import os
from flask_cors import CORS
from models import db, Article

basedir = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
app = Flask(__name__)
app.config.update({
    'SQLALCHEMY_TRACK_MODIFICATIONS': True,
    "SQLALCHEMY_DATABASE_URI": SQLALCHEMY_DATABASE_URI,
})
api = Api(app)
cors = CORS(app)
db.init_app(app)
IMAGE_PATH = os.path.join(basedir, 'image')

def serializer(l):
    ret = []
    for row in l:
        ret.append(json.loads(row.serialize()))
    return ret  

class Picture(Resource):
    def get(self, name):
        return send_from_directory(IMAGE_PATH, name)

class ArticleList(Resource):
    def get_articles(self):
        articles = Article.query.all()
        return articles 

    def get(self):
        articles = self.get_articles()
        return serializer(articles)

    def post(self):
        r_json = request.get_json() 
        title = r_json['title']
        image = r_json['image']
        category = r_json['category']
        content = r_json['content']
        new_article = Article(title, image, category, content)
        db.session.add(new_article)
        db.session.commit()
        return "write successfully"

    def put(self):
        r_json = request.get_json()
        _id = r_json['id']
        title = r_json['title']
        image = r_json['image']
        category = r_json['category']
        content = r_json['content']
        article = Article.query.filter_by(id=_id).first()
        if not article:
            return "article[:{}] is not exists".format(_id)
        article.title = title
        article.image = image
        article.content = content
        db.session.commit()
        return "update successfully"

    def delete(self):
        r_json = request.get_json()
        _id = r_json['id']
        article = Article.query.filter_by(id=_id).first()
        if not article:
            return "article[:{}] is not exists".format(_id)
        db.session.delete(article)
        db.session.commit()
        return "delete successfully"

api.add_resource(ArticleList, '/api/articles')
api.add_resource(Picture, '/api/pictures/<name>')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)

