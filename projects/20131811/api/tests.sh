# /users api test
if [ -f users.json ]; then
  rm users.json
fi

curl -X POST -H "Content-Type: application/json" -d '{"account": "첫번째로 넣은거 (있으면 안된다)", "password": "1234qwer"}' "0.0.0.0:5000/api/users"
curl -X POST -H "Content-Type: application/json" -d '{"account": "두번째로 넣은거", "password": "1234qwer"}' "0.0.0.0:5000/api/users"
curl "0.0.0.0:5000/api/users"

curl -X PUT -H "Content-Type: application/json" -d '{"id": 2, "password": "바꾼비밀번호"}' "0.0.0.0:5000/api/users"
curl "0.0.0.0:5000/api/users"
curl -X DELETE -H "Content-Type: application/json" -d '{"id": 1}' "0.0.0.0:5000/api/users"
curl "0.0.0.0:5000/api/users"

# /moviess api test
if [ -f movies.json ] ; then
  rm movies.json
fi

curl -X POST -H "Content-Type: application/json" -d '{"name": "첫번째로 넣은거 (있으면 안된다)", "photo": "first_image.jpg"}' "0.0.0.0:5000/api/movies"
curl -X POST -H "Content-Type: application/json" -d '{"name": "두번째로 넣은거", "photo": "second_image.jpg"}' "0.0.0.0:5000/api/movies"
curl "0.0.0.0:5000/api/users"

curl -X PUT -H "Content-Type: application/json" -d '{"id": 2, "photo": "changed_image"}' "0.0.0.0:5000/api/movies"
curl "0.0.0.0:5000/api/users"
curl -X DELETE -H "Content-Type: application/json" -d '{"id": 1}' "0.0.0.0:5000/api/movies"
curl "0.0.0.0:5000/api/users"