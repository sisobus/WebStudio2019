# -*- coding: utf-8 -*-
import os
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from .models import db
from .api import WeatherNow, Weather5day

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

with app.app_context():
    db.create_all()

# api.add_resource(Auth, '/login/')
# api.add_resource(Users, '/users/')
api.add_resource(WeatherNow, '/weather')
api.add_resource(Weather5day, '/weather5day')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
