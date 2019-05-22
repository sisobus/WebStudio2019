# -*- coding: utf-8 -*-
import os
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from models import db
from api import Users
from api import req_weather_by_city

basedir = os.path.dirname(os.path.abspath(__file__))
SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')
app = Flask(__name__)
app.config.update({
    'SQLALCHEMY_TRACK_MODIFICATIONS': True,
    'SQLALCHEMY_DATABASE_URI': SQLALCHEMY_DATABASE_URI,
    'SECRET_KEY': 'chankoo',
})
cors = CORS(app)
api = Api(app)
db.init_app(app)

app = Flask(__name__)

# api.add_resource(Auth, '/login/')
# api.add_resource(Users, '/users/')


if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', port=5000, debug=True)
