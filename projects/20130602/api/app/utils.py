import json

def serializer(l):
    ret = []
    for row in l:
        ret.append(json.loads(row.serialize()))
    return json.dumps(ret)

def dictionalizer(l):
    ret = []
    for row in l:
        ret.append(json.loads(row.serialize()))
    return ret


def is_person(daily):
    from gluoncv import data, utils
    import pickle
    import os

    try:
        # https://github.com/dmlc/gluon-cv, pretrained faster_rcnn_resnet50_v1b_voc
        with open('../static/faster_rcnn_resnet50_v1b_voc.pkl', 'rb') as fp:
            net = pickle.load(fp)
    except Exception:
        import urllib.request
        urllib.request.urlretrieve('https://project-lookmorning.s3.ap-northeast-2.amazonaws.com/faster_rcnn_resnet50_v1b_voc.pkl','faster_rcnn_resnet50_v1b_voc.pkl')
        with open('../static/faster_rcnn_resnet50_v1b_voc.pkl', 'rb') as fp:
            net = pickle.load(fp)

    im_fname = utils.download(daily['img_path'])
    x, orig_img = data.transforms.presets.rcnn.load_test(im_fname)
    box_ids, scores, bboxes = net(x)

    labels = box_ids[0].asnumpy()
    scores = scores[0].asnumpy()
    for i, bbox in enumerate(bboxes[0]):
        if labels is not None and labels.flat[i] != 14:  # box_id 14 is 'person'
            continue
        if scores is not None and scores.flat[i] < 0.7:  # Let thresh = 0.7
            continue
        return True

    # delete downloaded file
    os.remove(im_fname)

    return False