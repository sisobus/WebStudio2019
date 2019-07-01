from flask import Flask
import os
from datetime import datetime

@app.route('/current_date')

def current_date():
	current = datetime.now()
	return current.strftime("%Y-%m-%d %H:%M:%S")

if __name__ == '__main__' :
	app.run(debug=True)


