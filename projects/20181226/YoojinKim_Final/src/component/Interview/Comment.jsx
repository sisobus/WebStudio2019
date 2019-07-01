import { Typography } from 'antd';
import React from 'react'

const { Paragraph } = Typography;

class Comment extends React.Component {
  state = {
    str: '댓글을 작성해보세요!',
  };

  onChange = str => {
    console.log('Content change:', str);
    this.setState({ str });
  };

  render() {
    return (
      <div>
        <Paragraph editable={{ onChange: this.onChange }}>{this.state.str}</Paragraph>
      </div>
    );
  }
}

export default Comment