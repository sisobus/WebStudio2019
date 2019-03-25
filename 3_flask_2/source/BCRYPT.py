import bcrypt

salt = bcrypt.gensalt()
print(salt)
password = '1234qwer'.encode('utf-8')
hashed_password = bcrypt.hashpw(password, salt)
print(hashed_password)

print(hashed_password == bcrypt.hashpw(password, hashed_password))
