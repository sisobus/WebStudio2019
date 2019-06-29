# Look Morning

## Summary
피부에 와닿지 않는 날씨예보

이렇게 입으면 더울까? 추울까?

아침마다 고민하는 오늘의 옷차림

project Goal: 지금 날씨에 적절한 데일리룩을 보여주어 오늘의 코디 고민을 덜어보자


## Architecture
![arch](https://user-images.githubusercontent.com/38183218/60137151-0d6a0b00-97e1-11e9-836a-56c2721b025b.png)


## UI
> 현재 날씨
> ![스크린샷, 2019-06-26 06-14-53](https://user-images.githubusercontent.com/38183218/60135047-d47b6780-97db-11e9-8b32-475f32b7c39a.png)

> 유저 데일리룩 업로드
>![스크린샷, 2019-06-26 06-16-06](https://user-images.githubusercontent.com/38183218/60135048-d513fe00-97db-11e9-804d-1da1968e1675.png)

> 업로드 및 스크랩하여 데일리룩 저장
> ![](https://user-images.githubusercontent.com/38183218/60347673-de2de680-99f8-11e9-9fe3-3df0d51ca347.png)

> 현재 날씨에 맞는 데일리룩 노출
> ![스크린샷, 2019-06-26 06-50-19](https://user-images.githubusercontent.com/38183218/60136286-b9f6bd80-97de-11e9-994c-6362ad4ef33d.png)


## 환경 설정 및 빌드

#### npm 설치

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo bash -
sudo apt-get install -y nodejs
sudo npm cache clean -f
sudo npm install -g n
sudo n stable

```

#### 빌드
```bash
git clone https://github.com/chankoo/lookmorning.git

cd ./lookmorning/web
sudo npm install production
sudo npm install react-router-dom
sudo npm run build
sudo npm install -g serve
sudo serve -s build

```


## 활용 API

- [OpenWeatherMap](https://openweathermap.org/api)
- [기상자료개방포털](https://data.kma.go.kr/data/grnd/selectAsosRltmList.do?pgmNo=36)
- [rarcega/instagram-scraper](https://github.com/rarcega/instagram-scraper)
