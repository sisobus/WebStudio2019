import json

with open('auth.json','r') as fp :
	r = json.loads(fp.read())
print(r)

