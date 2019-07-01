from bs4 import BeautifulSoup
import requests

req = requests.get('http://sogang.ac.kr/index.do')

data = req.text

soup = BeautifulSoup(data, 'html.parser')

title_data = soup.find_all('p')

for i in title_data :
    print(i)
    print(i.get_text())


