import React, {Component} from 'react';
import { Card } from 'antd';

class Images extends Component {
  constructor(props) {
    super(props);
    
  }
  render () {
    const { Meta } = Card;

    var lists = [];
    var imgs = this.props.imgs;
    
    var i = 0;
    while(i < imgs.length){
      lists.push(  
        <Card className="card_component"
          style={{ width: '370px', margin : '0px auto 30px auto', padding : '10 10 5 10' }}
          cover={<img alt="example" src={imgs[i].content} />}
        >
          <Meta 
            title={imgs[i].title}
            description={imgs[i].desc}
          />
        </Card>
      );  
      i = i + 1;
    }

    return (
          <div style={{ background: '#fff', padding: 15 }}>
            {lists}
            {this.props.test}
          </div>
    );
  }
}

export default Images;