from flask import Flask
import os

@app.route('/counter')
def counter():
	filename = 'visit_count.txt'
	count = 0
	if not os.path.exists(filename) :
		with open(filename, 'w') as fp :
			fp.write(str(count))
	with open(filename, 'r') af fp :
		count = int(fp.read())
		count += 1
	with open(filename, 'w') as fp : 
		fp.write(str(count))
	return str(count)

if __name__ == '__main__' :
	app.run(debug = True)

