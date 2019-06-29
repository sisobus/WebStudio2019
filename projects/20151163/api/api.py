from flask import Flask, request, jsonify
from flask_restful import Api, Resource
from flask_cors import CORS
import json, os

from models import db, User
from UserList import UserList
from PicturesList import Picture, PicturesList, Uploader

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

api.add_resource(UserList, '/api/users')
api.add_resource(PicturesList, '/api/pictures')
api.add_resource(Picture, '/api/pictures/<name>')
api.add_resource(Uploader, '/api/pictures/new')


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
