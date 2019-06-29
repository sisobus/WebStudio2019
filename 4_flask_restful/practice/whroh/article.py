from flask import Flask, request
from flask_restful import Api, Resource
import json
import os


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
      return '`articles.json` does not exist'
    r = self.get_articles()
    s = ''
    for d in r:
      user_id = d['user_id']
      title = d['title']
      content = d['content']
      s += '[{}] {}: {}'.format(user_id, title, content)
    return s

  def post(self):
    r_json = request.get_json()
    user_id = r_json['user_id']
    title = r_json['title']
    content = r_json['content']
    r = self.get_articles()

    _id = 0
    for d in r:
      _id = max(_id, d['id'])
    _id = _id + 1
    r_json['id'] = _id
    with open(self.filename, 'w') as fp:
      fp.write(json.dumps(r))
    return 'Your post has been successfully uploaded <{}>'.format(title)

  def put(self):
    r_json = request.get_json()
    _id = r_json('id')
    title = r_json['title']
    articles = self.get_articles()
    found_article = False

    for idx, _ in enumerate(articles):
      if articles[idx]['id'] == _id:
        found_article = True
        articles[idx]['title'] = title
    if not found_article:
      return 'The article you requested({}) is not found'.format(_id)
    with open(self.filename, 'w') as fp:
      fp.write(json.dumps(articles))
    return ''


  def put(self):

  def delete(self):