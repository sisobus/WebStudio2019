def get_id(lst):
    _id = 0
    for dic in lst:
        _id = max(dic['id'], _id)
    return _id + 1