from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
    return '2019 web studio fighting T_T'

@app.route('/abc')
def abc():
    return 'abc'

@app.route('/variable/<input_string>')
def variable(input_string):
    return '<h1>{}</h1>'.format(input_string)


if __name__ == '__main__':
    app.run(debug=True)

