from flask import request
from flask_restful import Resource
import json, os
import utils

class LikeList(Resource):
    f_name = 'likes.json'

    def _get_likes(self):
        likes = []
        if os.path.exists(self.f_name):
            with open(self.f_name, 'r') as fp:
                likes = json.load(fp)
        return likes

    def get(self):
        return json.dumps(self._get_likes())


    def post(self):
        r_json = request.get_json()
        likes = self._get_likes()

        # 기존 like 리스트에서 검색되면 unlike 처리
        for i, like in enumerate(likes):
            if like['article_id'] == r_json['article_id'] and like['user_id'] == r_json['user_id']: # 유저가 해당 게시글에 이미 like한 상태
                likes.pop(i)
                with open(self.f_name, 'w') as fp:
                    json.dump(likes, fp)
                return 'unliked successfully'

        # like 처리
        r_json['id'] = utils.get_id(likes)
        likes.append(r_json)

        with open(self.f_name, 'w') as fp:
            json.dump(likes, fp)

        return 'liked successfully'
