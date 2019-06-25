import React, { Component } from 'react';
import { List, Rate } from 'antd';


class ReviewList extends Component {
  /*
  constructor(props) {
    super(props);
  }
*/
  //props 새로 넘어왔을때 별표가 업데이트 안되는 현상이 있음 이거 확인 
  render() {
    const reviews = this.props.reviews;
    
    return (
      <div>
        <List
          size="large"
          //header={<div>Header</div>}
          //footer={<div>Footer</div>}
          bordered
          dataSource={reviews}
          renderItem={item => <List.Item >
            <div><Rate disabled value={item.star} /></div>
            <div>{item.content}</div>
            </List.Item>}
        />
        <br/>
        <br/>
        <br/>
        <br/>

      </div>
    );
  }
}

export default ReviewList;
