from flask import Flask, request
from flask_restful import Api, Resource
import json
import os
  
app = Flask(__name__)
api = Api(app)

class UserList(Resource):

    def get(self):
    # 리소스를 클라이언트한테 가져다 주는 GET 메소드

        if not os.path.exists('users.json'):
            return 'users.json is not exists'

        with open('users.json', 'r') as fp:
            r = json.loads(fp.read())
        s = ''
        for d in r:
            email = d['email']
            password = d['password']
            s += '[email: {}, pw: {}]'.format(email, password)
        return s


    def post(self):
    # 데이터가 서버에 들어가야함을 의미(리소스를 새로만들거나 수정하기 위해 또는 클라이언트로 돌려보낼 임시문서를 생성하기 위해서)
    # 데이터를 일단 받아온다
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
   
    # 이메일이 이미 등록되어 있을 때
        r = []
        if os.path.exists('users.json'):
            with open('users.json', 'r') as fp:
                r = json.loads(fp.read())
        for d in r:
            if email == d['email']:
                return '{} already exists'.format(email)

    # 이메일이 등록되어 있지 않을 때
        r.append(r_json)
        with open('users.json', 'w') as fp:
            fp.write(json.dumps(r))
        return 'email: {}, pw: {}'.format(email, password)


    def put(self):
    # PUT 메소드_ Replace all current representations of the target resource with the uploaded content.
    # 데이터를 일단 받아온다
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
    
    # 등록되어 있는 이메일의 경우- 비밀번호를 바꾼다
        r = []
        if os.path.exists('users.json'):
            with open('users.json','r') as fp:
                r = json.loads(fp.read())
        for d in r:
            if email == d['email']:
                r.pop(r.index(d))
                r.append(r_json)
                with open('users.json', 'w') as fp:
                    fp.write(json.dumps(r))
                return 'email: {}, pw: {}'.format(email, password)
    
     # 등록되어 있지 않은 이메일의 경우- 등록되어 있지 않다고 말한다
        return '{} does not exist'.format(email)   


    def delete(self):
    # 데이터를 일단 받아온다   
        r_json = request.get_json()
        email = r_json['email']

    # 등록되어 있으면 유저삭제
        r = []
        if os.path.exists('users.json'):
            with open('users.json','r') as fp:
                r = json.loads(fp.read())
        for d in r: 
            if email == d['email']:
                r.remove(d)
                with open('users.json', 'w') as fp:
                    fp.write(json.dumps(r))
                return '{} is deleted successfully'.format(email)

     # 등록되어 있지 않은 이메일의 경우- 등록되어 있지 않다고 말한다 
        return '{} does not exist'.format(email)   

api.add_resource(UserList, '/api/users')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
