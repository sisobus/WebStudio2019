class Wine:
    def __init__(self):
        self.is_alcohol = True
    def color(self):
        return 'Red or White or Sparkling'
class RedWine(Wine):
    def color(self):
        return 'Red'
wine = Wine()
print(wine.is_alcohol, wine.color()) # True Red or White or Sparkling
red_wine = RedWine()
print(red_wine.is_alcohol, red_wine.color()) # True Red
