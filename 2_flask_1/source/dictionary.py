d = {
    'my_name': 'Sangkeun Kim',
    'age': 30,
    'emails': [
        {
            'comment': 'private mail',
            'email': 'sisobus@naver.com'
        },
        {
            'comment': 'public mail',
            'email': 'sisobus1@gmail.com'
        },
        {
            'comment': 'company mail',
            'email': 'sisobus@vuno.co'
        }
    ]
}
print(d['my_name'])              # Sangkeun Kim
print(d['emails'][1]['comment']) # public mail
