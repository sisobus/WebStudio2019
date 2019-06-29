from flask import request
from flask_restful import Resource
from models import db, Article


class ArticleList(Resource):
    def _get_articles(self):
        return Article.query.all()

    def get(self):
        articles = self._get_articles()

        repr_str = ''
        for article in articles:
            repr_str += article.__repr__()
        return repr_str

    def post(self):
        r_json = request.get_json()
        user_id = r_json['user_id']
        title = r_json['title']
        content = r_json['content']

        new_article = Article(user_id, title, content)
        db.session.add(new_article)
        db.session.commit()
        return 'create {}'.format(new_article.__repr__())

    def put(self):
        r_json = request.get_json()
        put_id = r_json['id']
        title = r_json['title']
        content = r_json['content']

        article = Article.query.filter_by(id = put_id).first()
        if article is None:
            return '{} does not exist'.format(put_id)
        article.title = title
        article.content = content

        db.session.commit()
        return 'update article successfully'

    def delete(self):
        r_json = request.get_json()
        del_id = r_json['id']

        article = Article.query.filter_by(id=del_id).first()
        if article is None:
            return '{} does not exist'.format(del_id)

        db.session.delete(article)
        db.session.commit()
        return '{} deleted successfully'.format(del_id)