import json

d = {
	"email" : "wakii@naver.com",
	"password" : "sersettlwka"
}

with open('auth.json', 'w') as fp:
	fp.write(json.dumps(d))


