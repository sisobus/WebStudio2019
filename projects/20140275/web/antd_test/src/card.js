import React, { Component } from 'react';
import { Card } from 'antd';
 const { Meta } = Card;



class PostCard extends Component {
    render() {
        return (
<Card>

  <Card
    hoverable
    style={{ width: 300 }}
    cover={<img alt="example" src="https://pm1.narvii.com/6149/8d2c96a4e3218e2188560edcaf5019fa7c18d690_hq.jpg" />}
  >
    <Meta title="MARK" description="일곱번째 감각" />
  </Card>

  <Card
    hoverable
    style={{ width: 300 }}
    cover={<img alt="example2" src="https://vignette.wikia.nocookie.net/neoculturetechnology/images/0/06/Mark_We_Go_Up_photo.png/revision/latest/scale-to-width-down/620?cb=20180906191605" />}
  >
    <Meta title="MARK" description="???" />
  </Card>

  <Card
    hoverable
    style={{ width: 300 }}
    cover={<img alt="example3" src="https://vignette.wikia.nocookie.net/neoculturetechnology/images/3/3f/Mark_TOUCH_photo.jpg/revision/latest/scale-to-width-down/620?cb=20180607183712" />}
  >
    <Meta title="MARK" description="touch" />
  </Card>

  <Card
    hoverable
    style={{ width: 300 }}
    cover={<img alt="example" src="https://vignette.wikia.nocookie.net/kpop/images/1/14/NCT_127_Mark_We_Are_Superhuman_promo_photo_%281%29.png/revision/latest?cb=20190524233818" />}
  >
    <Meta title="MARK" description="super human" />
  </Card>

  <Card
    hoverable
    style={{ width: 300 }}
    cover={<img alt="example" src="https://uploads.disquscdn.com/images/9664574f7ce114b3af8adaaa21c0250765146ea658a0f5f3c1db235a0a1eeb2e.jpg?w=600&h=1011" />}
  >
    <Meta title="MARK" description="???" />
  </Card>

  </Card>


        );
    }
}

export default PostCard;


