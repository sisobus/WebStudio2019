import os

mysql_config = {
    'host': os.environ.get('MYSQL_HOST', '127.0.0.1'),
	'user': os.environ.get('MYSQL_USER', 'root'),
	'pass': os.environ.get('MYSQL_PASS', '1234'),
	'db':   os.environ.get('MYSQL_DB', 'test'),
}

def alchemy_uri():
	return 'mysql://{}:{}@{}:3306/{}?charset=utf8'.format(mysql_config['user'], mysql_config['pass'], mysql_config['host'], mysql_config['db'])

S3_BUCKET = os.environ.get('S3_BUCKET')
S3_KEY = os.environ.get('S3_KEY')
S3_SECRET = os.environ.get('S3_SECRET')