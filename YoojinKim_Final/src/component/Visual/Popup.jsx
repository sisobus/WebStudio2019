import React from 'react'
import './Popup.css'
import { Modal, Button } from 'antd';

class Popup extends React.Component {
  state = { 
  	visible: false ,
  	currentImageIndex: 0,
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  constructor(props) {
    super(props)
    console.log(props)
  }

  render() {
    return (
      <div>
        <img src={this.props.image} 
        className="pop-image"
        onClick={this.showModal} />
        <Modal
          title={this.props.title}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        	<img src={this.props.image} />
        </Modal>
      </div>
    );
  }
}

export default Popup