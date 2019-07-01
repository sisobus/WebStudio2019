import React, { Component } from 'react';
import { Card } from 'antd';
 const { Meta } = Card;



class Card2 extends Component {
    render() {
        return (
           
<Card>
<Card
    hoverable
    style={{ width: 300 }}
    cover={<img alt="example" src="https://ssl.pstatic.net/mimgnews/image/311/2017/11/21/0000796733_001_20171121101337514.jpg?type=w430_q70" />}
  >
    <Meta title="재현" description="Try again" />
  </Card>

<Card
hoverable
style={{ width: 300 }}
cover={<img alt="example" src="https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile24.uf.tistory.com%2Fimage%2F99B7FB365BB8D71B2FB858" />}
>
<Meta title="재현" description="regular-irregualr" />
</Card>

<Card
hoverable
style={{ width: 300 }}
cover={<img alt="example" src="https://images.mir.pe/file/9627c7aa3043c211660bcef2e6fefd60" />}
>
<Meta title="재현" description="일곱번째 감각" />
</Card>

<Card
hoverable
style={{ width: 300 }}
cover={<img alt="example" src="http://img.mbn.co.kr/filewww/news/other/2018/02/16/306201026813.jpg" />}
>
<Meta title="재현" description="BOSS" />
</Card>
  </Card>
        );
    }
}

export default Card2;