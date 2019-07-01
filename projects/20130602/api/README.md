## DB
![스크린샷, 2019-06-28 23-01-48](https://user-images.githubusercontent.com/38183218/60347675-de2de680-99f8-11e9-9839-4867babfa801.png)

## 데이터 처리 과정
### weather
1. 약 1년(2018.06~ 2019.06) 간 서울의 시간별 날씨 데이터(기온, 풍속, 습도, 전운량, 강수량 등)를 수집
2. 기온을 제외한 변수에 Standard Scaler 적용
3. 강수 여부로 구분하여 각각 KMeans Clustering을 진행
4. weather 테이블에 할당된 클러스터와 함께 저장

> without rain, k=20
>![tsne_km0](https://user-images.githubusercontent.com/38183218/60348203-0833d880-99fa-11e9-87ae-525db48da147.png)

> with rain, k=7
> ![tsne_km1](https://user-images.githubusercontent.com/38183218/60348204-0833d880-99fa-11e9-8f25-71ae1f56306c.png)

### daily
1. 'dailylook' 태그로 더미 데이터 수집
2. 이미지의 메타 데이터에서 촬영 당시 timestamp를 가져와 날씨와 매칭
3. 해당 날씨의 id를 weather_id 컬럼으로 함께 저장

### Look Now
1. 현재 날씨 데이터를 API 통해 받아옴
2. 역시 변수에 대한 Standard Scale 진행(mean 과 std는 기존의 historical data 기준)
3. 앞서 도출된 클러스터의 centroid와 비교해 현재 날씨에 클러스터를 할당
4. 같은 클러스터에 속한 weather_id를 쿼리해 해당하는 daily를 노출


## mysql
```bash
# docker mysql

docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=1234 --name db mysql:latest

docker exec -it db bash

mysql -u root -p
```

```mysql
# DDL

CREATE DATABASE lookmorning default CHARACTER SET UTF8; 

USE lookmorning;

CREATE TABLE user (id INT PRIMARY KEY AUTO_INCREMENT, name VARCHAR(50) NOT NULL, password VARCHAR(256) ) ENGINE=INNODB;

CREATE TABLE weather (id INT PRIMARY KEY AUTO_INCREMENT, city VARCHAR(30), datetime VARCHAR(50) NOT NULL, cluster INT(8) NOT NULL, is_rain TINYINT NOT NULL ) ENGINE=INNODB;

CREATE TABLE daily (id INT PRIMARY KEY AUTO_INCREMENT, weather_id INT, img_path VARCHAR(256), satis INT, FOREIGN KEY (weather_id) REFERENCES weather (id) ) ENGINE=INNODB;

CREATE TABLE myscrap (id INT PRIMARY KEY AUTO_INCREMENT, user_id INT, daily_id INT, FOREIGN KEY (user_id) REFERENCES user (id), FOREIGN KEY (daily_id) REFERENCES daily (id) ) ENGINE=INNODB;

CREATE TABLE mydaily (id INT PRIMARY KEY AUTO_INCREMENT, user_id INT, daily_id INT, FOREIGN KEY (user_id) REFERENCES user (id), FOREIGN KEY (daily_id) REFERENCES daily (id) ) ENGINE=INNODB;

CREATE TABLE login_session (id INT PRIMARY KEY AUTO_INCREMENT, user_id INT, jti VARCHAR(500), FOREIGN KEY (user_id) REFERENCES user (id)) ENGINE=INNODB;
```