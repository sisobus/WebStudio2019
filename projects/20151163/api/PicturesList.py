import os
from flask import Flask, flash, request, redirect, url_for, send_from_directory, render_template
from flask_uploads import UploadSet, IMAGES
from flask_restful import Api, Resource
from werkzeug.utils import secure_filename
from os import listdir
from os.path import isfile, join
import glob
from flask_cors import CORS

UPLOAD_FOLDER = '/Users/JihyunLee/WebStudio2019/projects/20151163/api/images'
ALLOWED_EXTENSIONS = set(['pdf', 'png', 'jpg', 'jpeg', 'gif'])
BASE_URL = 'http://localhost:5000'

app = Flask(__name__)
cors = CORS(app)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
	return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

class Picture(Resource):
    def get(self, name):
        return send_from_directory(UPLOAD_FOLDER, name)

class PicturesList(Resource):

    @app.route('/pictures')
    def get(self):
        return [{ 'name': f, 'path': BASE_URL + "/api/pictures/" + f } for f in listdir(UPLOAD_FOLDER) if isfile(join(UPLOAD_FOLDER, f))]
        # return glob.glob(UPLOAD_FOLDER+'/*')


class Uploader(Resource):	

    def get(self):
        return render_template('upload.html')

    def post(self):
        if request.method == 'POST':
            if 'file' not in request.files:
                flash('No file part')
                return redirect(request.url)
            file = request.files['file']
            if file.filename == '':
                flash('No file selected for uploading')
                return redirect(request.url)
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
                flash('File(s) successfully uploaded')
                return redirect('/pictures/new')
