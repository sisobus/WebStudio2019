from flask import Flask

@app.route('/variable/<input_string>')
def variable(input_string):
	return '<h1>{}</h1>'.format(input_string)

if __name__ == '__main__':
	app.run(debug=True)

