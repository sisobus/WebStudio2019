from flask import Flask, request
from flask_restful import Api, Resource import json
import os
from models import db, User, Article
basedir = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
app = Flask(__name__)
app.config.update({
'SQLALCHEMY_TRACK_MODIFICATIONS': True,
    "SQLALCHEMY_DATABASE_URI": SQLALCHEMY_DATABASE_URI,
})
api = Api(app)
db.init_app(app)
if __name__ == '__main__': with app.app_context():
db.create_all()
app.run(host='0.0.0.0', port=5000, debug=True)
