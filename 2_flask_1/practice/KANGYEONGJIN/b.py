from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello():
   return 'fucwefwefwefewfewfkkkkkkkkk!'

@app.route('/abc')
def abc():
 return 'abc'
 

if __name__ == '__main__':
   app.run(debug=True)




