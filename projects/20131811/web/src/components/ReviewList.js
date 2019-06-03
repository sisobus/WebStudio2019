import React, { Component } from 'react';
import { List, Rate } from 'antd';


class ReviewList extends Component {
  /*
  constructor(props) {
    super(props);
  }
*/
  render() {
    const reviews = this.props.reviews;
    
    return (
      <div>
        <List
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={reviews}
          renderItem={item => <List.Item>
            <Rate disabled defaultValue={item.star} /> | 유저 : {item.user_id} | {item.content}
            </List.Item>}
        />
      </div>
    );
  }
}

export default ReviewList;
