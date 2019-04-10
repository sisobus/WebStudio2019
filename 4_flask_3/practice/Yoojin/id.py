from flask import Flask, request
from flask_restful import Api, Resource
import json
import os

app = Flask(__name__)
api = Api(app)

"""
"""

class UserList(Resource) :
    def get(self) :
        if not os.path.exists('users.json') :
            return 'users.json is not exists'
        with open('users.json','r') as fp:
            r = json.loads(fp.read())
        s = ""
        for d in r :
            email = d['email']
            password = d['password']
            s +='[email: {}, password: {}]'.format(email, password)
        return s
    def post(self):
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        r_json['id']=0
        idl=[]
        found = False
        r = []
        if os.path.exists('users.json'):
            with open('users.json','r') as fp:
                r = json.loads(fp.read())
        usnum=len(r)
        for d in r :
            if email == d['email'] :
                found = True
            idl.append(d['id'])
        if found : 
            return '{} is aleady exists'.format(email)
        else :
            r_json['id'] = usnum
            if usnum>1:
                r_json['id']=max(idl)+1 
            r.append(r_json)
        with open('users.json','w') as fp :
            fp.write(json.dumps(r))
        return 'email: {}, password: {}, id: {}'.format(email, password,r_json['id'])

    def put(self):
        r_json = request.get_json()
        email = r_json['email']
        password = r_json['password']
        r = []
        efound = False
        pfound = False
        if os.path.exists('users.json'):
            with open('users.json','r') as fp:
                r = json.loads(fp.read())
        for d in r :
            if email == d['email'] :
                efound = True
                if password == d['password'] :
                    pfound= True
                d['password'] = str(password)
                with open('users.json','w') as fp:
                    fp.write(json.dumps(r))
        if not efound :
            return '{} is not exist'.format(email)
        if efound and pfound :
            return '{} is already exist'.format(email)
        if efound and not  pfound :
            return '\'{}\' is your new password'.format(password)
        with open('users.json', 'w') as fp:
            fp.write(json.dumps(r))

    def delete(self):
        r_json = request.get_json()
        email = r_json['email']
        r = []
        found = False
        if os.path.exists('users.json'):
            with open('users.json','r') as fp:
                r = json.loads(fp.read())
        new_users = []
        for d in r :
            if email == d['email'] :
                found = True
            else:
                new_users.append(d)
                """
                del d
                with open('users.json','w') as fp:
                    fp.write(json.dumps(r))
                """
        with open('users.json', 'w') as fp:
            fp.write(json.dumps(new_users))
        if found :
            return 'User \'{}\'is deleted'.format(email), r
        if not found :
            return '{} is not exist'.format(email)

"""
"""

class ArticleList(Resource) :
    filename = 'articles.json'

    def get_articles(self):
        ret = []
        if os.path.exists('articles.json'):
            with open('articles.json','r') as fp:
                ret = json.loads(fp.read())
        return ret

    def get_uid(self):
        gid = []
        if os.path.exists('users.json'):
            with open('users.json', 'r') as fp:
                gid = json.loads(fp.read())
        return gid

    def get(self):
        return json.dumps(self.get_articles())

    def post(self):
        email = r_json['user_id']
        title = r_json['title']
        content = r_json['content']
        r_json['arid'] = 0
        r_json['uid'] = 0
        r_json['arid']=0
        r_json['uid']=0
        uid = 0
        users = self.get_uid()
        articles = self.get_articles()
        users = self.get_uid()
        """
        get user id & email
        """
        idl = []
        arnum = len(articles)
        found = False

        """
        to check if the email is user
        """
        articles = self.get_articles()
        arnum = len(articles)
        """
        to start first id """

        for d in articles :
            idl.append(d['arid'])

        r_json['arid']=arnum
        if arnum>1:
            r_json['arid'] = max(idl)+1

        r_json['arid'] = arnum

        if arnum>1 :
            r_json['arid'] = max(idl) + 1

        for d in users :
            if email == d['email'] :
                found = True
                uid = d['id']

        r_json['uid']=uid

        if not found :
            return "Sorry, {} is not our user".format(email)

        articles.append(r_json)
        with opein('articles.json','w') as fp :
            fp.write(json.dumps(articles))
        return "write successfully, title: {}, content: {}".format(title,content)
        with open('articles.json','w') as fp :
            fp.write(json.dumps(r))

    def put(self):
        r_json = request.get_json()
        email = r_json['user_id']
        arid = r_json['arid']
        title = r_json['title']
        content = r_json['content']
        articles = self.get_articles()  
        uid = 0
        ufound = False
        afound = False

        articles = self.get_articles()
        users = self.get_uid()

        for d in users :
            if email == d['email'] :
                uid = d['id']

        for a in articles :
            if a['arid'] == arid :
                afound = True
                if a['uid'] == uid :
                    ufound = True
                    a['title']=title
                    a['content']=content
        if not afound :
            return "There is no article \"{}\"".format(arid)
        elif not ufound :
            return "User id is not same"
        else :
            "update successfully, title: {}, content: {}".format(title,contect)
        with open('articles.json','w') as fp :
            fp.write(json.dumps(articles))



api.add_resource(UserList, '/api/users')
api.add_resource(ArticleList, '/api/articles')

if __name__=='__main__':
    app.run(host='0.0.0.0', port=5012, debug=True)                                       
