import React, { Component } from 'react';
import { List, Rate } from 'antd';


class ReviewList extends Component {
  render() {
    const reviews = this.props.reviews;
    
    return (
      <div>
        <List
          size="large"
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
