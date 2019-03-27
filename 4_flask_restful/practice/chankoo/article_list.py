from flask import request
from flask_restful import Resource
import json, os


class ArticleList(Resource):
    def get(self):

        if not os.path.exists('articles.json'):
            return "articles does not exist!"

        with open('articles.json', 'r') as fp:
            articles = json.load(fp)

        repr_str=''
        for article in articles:
            repr_str += '[id:{},user_id:{},title:{},content:{}]'.format(article['id'], article['user_id'], article['title'], article['content'])

        return repr_str


    def post(self):
        r_json = request.get_json()

        articles = []
        if os.path.exists('articles.json'):
            with open('articles.json', 'r') as fp:
                articles = json.load(fp)

        id_cnt = len(articles)
        r_json['id'] = id_cnt + 1
        articles.append(r_json)

        with open('articles.json', 'w') as fp:
            json.dump(articles, fp)

        return 'id:{}, user_id: {}, title: {}, content: {}'.format(id_cnt+1, r_json['user_id'], r_json['title'], r_json['content'])


    def put(self):
        r_json = request.get_json()

        if os.path.exists('articles.json'):
            with open('articles.json', 'r') as fp:
                articles = json.load(fp)
        else:
            return "articles list does not exist!"

        for article in articles:  # 기존의 아티클 정보를 순회하며
            if article['id'] == r_json['id']:  # 요청 데이터의 article_id와 같은 아티클의
                article['title'] = r_json['title']  # 글 제목과 내용을 업데이트한다
                article['content'] = r_json['content']

                with open('articles.json', 'w') as fp:
                    json.dump(articles, fp)
                return 'article updated'

        return 'article_id unmatched!' # 일치하는 id 없는 경우



    def delete(self):
        r_json = request.get_json()

        if os.path.exists('articles.json'):
            with open('articles.json', 'r') as fp:
                articles = json.load(fp)
        else:
            return "articles list does not exist!"

        for i, article in enumerate(articles):  # 기존의 아티클 정보를 순회하며
            del_id = r_json['id']
            if article['id'] == r_json['id']:  # 요청 데이터의 article_id와 같은 아티클의
                articles.pop(i)
                with open('articles.json', 'w') as fp:
                    json.dump(articles, fp)
                return 'article_id {} is deleted'.format(del_id)

        return 'article_id unmatched!' # 일치하는 id 없는 경우
