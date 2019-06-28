# -*- coding: utf-8 -*-
from flask import Flask
from flask_restful import Api
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from datetime import timedelta
from api import WeatherNow, Weather5day, Users, ImageUpload, WeatherPast, Dailys, MyScraps, MyDailys, UserLogin, Cluster
from config import alchemy_uri


app = Flask(__name__)
app.config.update({
    'SQLALCHEMY_TRACK_MODIFICATIONS': False,
    'SQLALCHEMY_DATABASE_URI': alchemy_uri(),
    'SQLALCHEMY_ECHO': True,
    # 'SECRET_KEY': 'chankoo',
    'JWT_SECRET_KEY': 'doori',
    'JWT_ACCESS_TOKEN_EXPIRES': timedelta(minutes=15),
    'JWT_REFRESH_TOKEN_EXPIRES': timedelta(days=15),
})
cors = CORS(app)
api = Api(app)

# db.init_app(app)
db = SQLAlchemy(app)
db.create_all()
db.session.commit()

jwt = JWTManager(app)

api.add_resource(UserLogin, '/user/login')
api.add_resource(Users, '/users')
api.add_resource(WeatherNow, '/weather/now')
api.add_resource(Weather5day, '/weather/weekly')
api.add_resource(WeatherPast, '/weather/past')
api.add_resource(MyScraps, '/user/<int:user_id>/myscrap')
api.add_resource(MyDailys, '/user/<int:user_id>/mydaily')
api.add_resource(ImageUpload, '/daily/<int:user_id>/image-upload')

api.add_resource(Dailys,
                 # '/daily',
                 '/daily/<int:user_id>/<int:cluster>/<int:is_rain>',
                 '/daily/<int:user_id>'
                 )
api.add_resource(Cluster, '/weather/cluster')




@app.route('/', methods=['GET'])
def index():
    return 'Hello this is nginx_uwsgi_flask'

if __name__ == '__main__':
    # with app.app_context():
    #     db.create_all()
    #     db.session.commit()
    app.run(host='0.0.0.0', port=8080, debug=True)
