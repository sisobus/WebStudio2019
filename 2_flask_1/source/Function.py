def f(a, b, c):
    a = a + 1
    b.append(5)
    c['test'] = 'T_T'
_a = 5
b = [4, 3]
c = {}
f(_a, b, c)
print(_a, b, c) # 5 [4, 3, 5] {'test': 'T_T'}
