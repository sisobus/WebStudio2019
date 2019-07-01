# /articles api test
if [ -f articles.json ]; then
  rm articles.json
fi

curl -X POST -H "Content-Type: application/json" -d '{“user_id”: “Native Witch”, “title”: “m1-1”, “content”: 300, “email”: 300}' ":5000/api/articles"
curl -X POST -H "Content-Type: application/json" -d '{“user_id”: “Cold”, “title”: “m1-2”, “content”: 300, “email”: 300}' "127.0.0.1:5000/api/articles"
curl -X POST -H "Content-Type: application/json" -d '{“user_id”: “MUDANG”, “title”: “m1-3”, “content”: 300, “email”: 300}' "127.0.0.1:5000/api/articles"
curl -X POST -H "Content-Type: application/json" -d '{“user_id”: “GENIE”, “title”: “m2-1”, “content”: 300, “email”: 300}' "127.0.0.1:5000/api/articles"

curl "127.0.0.1:5000/api/articles"


curl -X PUT -H "Content-Type: application/json" -d '{"user_id": 2, "title": "updated title", "content": "updated content"}' "127.0.0.1:5000/api/articles"
curl "127.0.0.1:5000/api/articles"
curl -X DELETE -H "Content-Type: application/json" -d '{"id": 1}' "127.0.0.1:5000/api/articles"
curl "127.0.0.1:5000/api/articles"
