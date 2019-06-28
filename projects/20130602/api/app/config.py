import os

mysql_config = {
	'host': os.environ.get('MYSQL_HOST', '127.0.0.1'),
	'user': os.environ.get('MYSQL_USER', 'root'),
	'pass': os.environ.get('MYSQL_PASS', '1234'),
	'db':   os.environ.get('MYSQL_DB', 'lookmorning'),
}

def alchemy_uri():
	return 'mysql://{}:{}@{}:3306/{}?charset=utf8'.format(mysql_config['user'], mysql_config['pass'], mysql_config['host'], mysql_config['db'])