import os
from flask import Flask, render_template, session
from flask_socketio import SocketIO, emit

class MySocketIO:
	def __init__(self, app):
		self.socketio = SocketIO(app)
		self.app = app
	def run(self):
		self.socketio.run(self.app)

user_no = 1

@app.before_request
def before_request():
	global user_no
	if 'session' in session and 'user-id' in session:
		pass
	else:
		session['session'] = os.urandom(24)
		session['username'] = 'user'+str(user_no)
		user_no += 1

@app.route('/main')
def index():
	return render_template('index.html')

@socketio.on('connect', namespace='/mynamespace')
def connect():
	print('connect')
	emit("response", {'data': 'connected', 'username': session['username']})

@socketio.on('disconnect', namespace='/mynamespace')
def disconnect():
	print('disconnect')
	session.clear()
	print("Disconnected")

@socketio.on("request", namespace='/mynamespace')
def request(message):
	print('request')
	emit("response", {'data': message['data'], 'username': session['username']}, broadcast = True)

