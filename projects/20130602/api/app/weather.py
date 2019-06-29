import requests

API_KEY = '60efa98fd883262c59309ae9e81183a4'

def query_now(city, country):
    try:
        URL = 'http://api.openweathermap.org/data/2.5/weather?q={},{}&mode=json&units=metric&appid={}'
        res = requests.get(URL.format(city, country, API_KEY))
        data = res.json()
        print("query_now res<{}>".format(res.status_code))
    except Exception as e:
        print(e)
        data = None

    return data


def query_5day(city, country):
    try:
        URL = 'https://api.openweathermap.org/data/2.5/forecast?q={},{}&appid={}&units=metric'
        res = requests.get(URL.format(city, country, API_KEY))
        data = res.json()
        print("query_5day res<{}>".format(res.status_code))
    except Exception as e:
        print(e)
        data = None

    return data
