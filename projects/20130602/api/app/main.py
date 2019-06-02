# -*- coding: utf-8 -*-
import os
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
# from models import db
from api import WeatherNow, Weather5day, Users, Images
from config import alchemy_uri

from flask_sqlalchemy import SQLAlchemy

# basedir = os.path.dirname(os.path.abspath(__file__))
# SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'app.db')

app = Flask(__name__)
app.config.update({
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,
    'SQLALCHEMY_DATABASE_URI': alchemy_uri(),
    'SQLALCHEMY_ECHO': True,
    # 'SECRET_KEY': 'chankoo',
})

cors = CORS(app)
api = Api(app)
# db.init_app(app)

db = SQLAlchemy(app)
db.create_all()

# api.add_resource(Auth, '/login/')
api.add_resource(Users, '/users')
api.add_resource(WeatherNow, '/weather')
api.add_resource(Weather5day, '/weather5day')


@app.route('/', methods=['GET'])
def index():
    return 'Hello this is nginx_uwsgi_flask'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
