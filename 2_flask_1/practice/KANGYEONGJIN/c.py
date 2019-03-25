from flask import Flask

app = Flask(__name__)

@app.route('/')
def king():
   return 'king'


if __name__ == '__main__':
	app.run(debug =True)





