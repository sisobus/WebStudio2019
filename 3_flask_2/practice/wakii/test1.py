import json

d = {
	"email" : "sisobus@vuno.co",
	"password" : "sersettlwka"
}

with open('auth.json','w') as fp:
	fp.write(json.dumps(d))


