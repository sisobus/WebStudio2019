# /users api test
if [ -f users.json ]; then
  rm users.json
fi

curl -X POST -H "Content-Type: application/json" -d '{"email": "sisobus1@vuno.co", "password": "1234qwer"}' "127.0.0.1:5000/api/users"
curl -X POST -H "Content-Type: application/json" -d '{"email": "sisobus1@vuno.co", "password": "1234qwer"}' "127.0.0.1:5000/api/users"
curl -X POST -H "Content-Type: application/json" -d '{"email": "sisobus2@vuno.co", "password": "1234qwer"}' "127.0.0.1:5000/api/users"
curl -X POST -H "Content-Type: application/json" -d '{"email": "sisobus3@vuno.co", "password": "1234qwer"}' "127.0.0.1:5000/api/users"
curl "127.0.0.1:5000/api/users"

curl -X PUT -H "Content-Type: application/json" -d '{"id": 2, "password": "987654321"}' "127.0.0.1:5000/api/users"
curl "127.0.0.1:5000/api/users"
curl -X DELETE -H "Content-Type: application/json" -d '{"id": 1}' "127.0.0.1:5000/api/users"
curl "127.0.0.1:5000/api/users"

# /articles api test
if [ -f articles.json ]; then
  rm articles.json
fi

curl -X POST -H "Content-Type: application/json" -d '{"user_id": 2, "title": "test title1", "content": "test content1"}' ":5000/api/articles"
curl -X POST -H "Content-Type: application/json" -d '{"user_id": 3, "title": "test title2", "content": "test content2"}' "127.0.0.1:5000/api/articles"
curl -X POST -H "Content-Type: application/json" -d '{"user_id": 3, "title": "test title3", "content": "test content3"}' "127.0.0.1:5000/api/articles"
curl -X POST -H "Content-Type: application/json" -d '{"user_id": 2, "title": "test title4", "content": "test content4"}' "127.0.0.1:5000/api/articles"
curl "127.0.0.1:5000/api/articles"

curl -X PUT -H "Content-Type: application/json" -d '{"id": 2, "title": "updated title", "content": "updated content"}' "127.0.0.1:5000/api/articles"
curl "127.0.0.1:5000/api/articles"
curl -X DELETE -H "Content-Type: application/json" -d '{"id": 1}' "127.0.0.1:5000/api/articles"
curl "127.0.0.1:5000/api/articles"

# /comments api test
if [ -f comments.json ]; then
  rm comments.json
fi


curl -X POST -H "Content-Type: application/json" -d '{"user_id": 2, "article_id": 2, "content": "test comment content1"}' "127.0.0.1:5000/api/comments"
curl -X POST -H "Content-Type: application/json" -d '{"user_id": 2, "article_id": 3, "content": "test comment content1"}' "127.0.0.1:5000/api/comments"
curl -X POST -H "Content-Type: application/json" -d '{"user_id": 3, "article_id": 4, "content": "test comment content1"}' "127.0.0.1:5000/api/comments"
curl -X POST -H "Content-Type: application/json" -d '{"user_id": 3, "article_id": 2, "content": "test comment content1"}' "127.0.0.1:5000/api/comments"
curl "127.0.0.1:5000/api/comments"

curl -X PUT -H "Content-Type: application/json" -d '{"id": 1, "content": "updated comment content1"}' "127.0.0.1:5000/api/comments"
curl "127.0.0.1:5000/api/comments"
curl -X DELETE -H "Content-Type: application/json" -d '{"id": 3}' "127.0.0.1:5000/api/comments"
curl "127.0.0.1:5000/api/comments"

# /likes api test
if [ -f likes.json ]; then
  rm likes.json
fi

curl -X POST -H "Content-Type: application/json" -d '{"user_id": 2, "article_id": 2}' "127.0.0.1:5000/api/likes"
curl "127.0.0.1:5000/api/likes"
curl -X POST -H "Content-Type: application/json" -d '{"user_id": 2, "article_id": 2}' "127.0.0.1:5000/api/likes"
curl "127.0.0.1:5000/api/likes"
