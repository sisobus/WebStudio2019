import json

d = {
    "email": "sisobus@vuno.co",
    "password": "dksdkffuwnwlfhd"
}
with open('auth.json', 'w') as fp:
    fp.write(json.dumps(d))
