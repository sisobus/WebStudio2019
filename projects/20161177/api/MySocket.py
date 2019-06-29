import os
from flask import Flask, render_template, session
from flask_socketio import SocketIO, emit

user_no = 1

class MySocketIO:
	def __init__(self, app):
		self.socketio = SocketIO(app)
		self.app = app
		@app.before_request
		def before_request():
			global user_no
			if 'session' in session and 'user-id' in session:
				pass
			else:
				session['session'] = os.urandom(24)
				session['username'] = 'user'+str(user_no)
				user_no += 1

		@self.app.route('/main')
		def index():
			return render_template('index.html')

		@self.socketio.on('connect', namespace='/mynamespace')
		def connect():
			print('connect')
			emit("response", {'data': 'connected', 'username': session['username']})

		@self.socketio.on('disconnect', namespace='/mynamespace')
		def disconnect():
			print('disconnect')
			session.clear()
			print("Disconnected")

		@self.socketio.on('request', namespace='/mynamespace')
		def request(message):
			print('request')
			emit("response", {'data': message['data'], 'username': session['username']}, broadcast = True)
		
	def run(self):
		self.socketio.run(self.app, debug=True)



	
