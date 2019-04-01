from flask import request
from flask_restful import Resource
import json, os
import utils

class CommentList(Resource):
    def get(self):
        if not os.path.exists('comments.json'):
            return 'comments not exist'
        with open('comments.json', 'r') as fp:
            comments = json.load(fp)

        repr_str = ''
        for com in comments:
            repr_str += '[id:{},user_id:{},article_id:{},content:{}]'.format(com['id'], com['user_id'], com['article_id'], com['content'])

        return repr_str

    def post(self):
        r_json = request.get_json()

        comments = []
        if os.path.exists('comments.json'):
            with open('comments.json', 'r') as fp:
                comments = json.load(fp)

        r_json['id'] = utils.get_id(comments)
        comments.append(r_json)

        with open('comments.json', 'w') as fp:
            json.dump(comments, fp)

        return 'id:{}, user_id: {}, article_id: {}, content: {}'.format(r_json['id'], r_json['user_id'], r_json['article_id'],
                                                                     r_json['content'])

    def put(self):
        r_json = request.get_json()

        if not os.path.exists('comments.json'):
            return 'comments not exist'

        with open('comments.json', 'r') as fp:
            comments = json.load(fp)

        put_id = r_json['id']
        for com in comments:
            if com['id'] == put_id:
                com['content'] = r_json['content']
                with open('comments.json', 'w') as fp:
                    json.dump(comments, fp)
                    return "content of the comment updated"

        return "comment id unmatched!"

    def delete(self):
        r_json = request.get_json()

        if not os.path.exists('comments.json'):
            return 'comments not exist'

        with open('comments.json', 'r') as fp:
            comments = json.load(fp)

        del_id = r_json['id']
        for i, com in enumerate(comments):
            if com['id'] == del_id:
                comments.pop(i)
                with open('comments.json', 'w') as fp:
                    json.dump(comments, fp)
                return 'comment_id {} is deleted'.format(del_id)

        return "comment id unmatched!"