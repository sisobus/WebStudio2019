import os
from flask import Flask, flash, request, redirect, url_for, send_from_directory
from flask_restful import Api, Resource
from werkzeug.utils import secure_filename
from os import listdir
from os.path import isfile, join
import glob

UPLOAD_FOLDER = '/Users/JihyunLee/WebStudio2019/projects/20151163/api/images'
ALLOWED_EXTENSIONS = set(['pdf', 'png', 'jpg', 'jpeg', 'gif'])
BASE_URL = 'http://localhost:5000'

#app = Flask(__name__)#
#app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER#

class Picture(Resource):
    def get(self, name):
        return send_from_directory(UPLOAD_FOLDER, name)

class PicturesList(Resource):

    #@app.route('/files/<path:path>')#
    def get(self):
        return [{ 'name': f, 'path': BASE_URL + "/api/pictures/" + f } for f in listdir(UPLOAD_FOLDER) if isfile(join(UPLOAD_FOLDER, f))]
        # return glob.glob(UPLOAD_FOLDER+'/*')

    #@app.route('/', methods=['GET', 'POST'])#
    def post(self):
        if request.method == 'POST':
            # check if the post request has the file part
            if 'file' not in request.files:
                flash('No file part')
                return redirect(request.url)
            file = request.files['file']
            # if user does not select file, browser also
            # submit an empty part without filename
            if file.filename == '':
                flash('No selected file')
                return redirect(request.url)
           # if file and allowed_file(file.filename):#
           #     filename = secure_filename(file.filename)#
           #     file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))#
           #     return redirect(url_for('uploaded_file', filename=filename))#
        return '''

        <!doctype html>
        <title>Upload new File</title>
        <h1>Upload new File</h1>
        <form method=post enctype=multipart/form-data>
        <input type=file name=file>
        <input type=submit value=Upload>
        </form>
        '''
