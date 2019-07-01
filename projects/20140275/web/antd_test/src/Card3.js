import React, { Component } from 'react';
import { Card } from 'antd';
 const { Meta } = Card;



class Card3 extends Component {
    render() {
        return (
           

<Card>
<Card
    hoverable
    style={{ width: 300 }}
    cover={<img alt="example" src="http://thumb.mtstarnews.com/06/2019/02/2019020711044194690_1.jpg" />}
  >
    <Meta title="태민" description="Want" />
  </Card>

<Card
hoverable
style={{ width: 300 }}
cover={<img alt="example" src="http://newsimg.hankookilbo.com/2017/10/25/201710250946302139_1.jpg" />}
>
<Meta title="태민" description="MOVE" />
</Card>
  
<Card
hoverable
style={{ width: 300 }}
cover={<img alt="example" src="http://www.stardailynews.co.kr/news/photo/201706/152621_182240_2644.jpg" />}
>
<Meta title="Key" description="공항" />
</Card>

</Card>
        );
    }
}

export default Card3;