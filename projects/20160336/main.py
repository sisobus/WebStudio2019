from app import app
from flask import Flask 
import os
from datetime import datetime

@app.route('/counter') 
def counter():
	filename = 'visit_counter.txt'
	count = 0
	if not os.path.exists(filename):
		with open(filename, 'w') as fp:
			fp.write(str(count))

	with open(filename, 'r') as fp:
		count = int(fp.read())
	count+=1
	with open(filename, 'w') as fp:
		fp.write(str(count))
	return str(count)

@app.route('/current_date')
def current_date():
	current = datetime.now()
	return current.strftime("%Y-%m-%d %H:%M:%S" )

if __name__ == '__main__':
	 app.run(debug=True)


