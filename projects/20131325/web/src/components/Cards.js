import React, {Component} from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

class Cards extends Component {
  constructor(props) {
    super(props);
    
  }
  render () {
    const { Meta } = Card;

    var lists = [];
    var data = this.props.data;
    var i = 0;
    while(i < data.length){
      lists.push(  
        <Link to={"/content/" + data[i].id}>
        <Card className="card_component"
          hoverable
          style={{ width: '370px', margin : '0px auto 30px auto', padding : '10 10 5 10' }}
          cover={<img alt="example" src={data[i].thumb} />}
        >
          <Meta 
            title={data[i].title}
            description={data[i].desc}
          />
        </Card>
        </Link>
      );  
      i = i + 1;
    }

    return (
          <div style={{ background: '#fff', padding: '0 15 15 15' }}>
            {lists}
            {this.props.test}
          </div>
    );
  }
}

export default Cards;