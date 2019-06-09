import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import './App.css';

class PicturesWall extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      previewVisible: false,
      previewImage: '',
      fileList: [
      ]
    }


    fetch('http://localhost:5000/api/pictures')
        .then(response =>
            response.json().then(rsp =>
                this.setState({ pictures: rsp })
            )
        )
  }


  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );


    return (
      <div className="clearfix">
        <Upload 
          action="http://localhost:5000/api/pictures/new"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default PicturesWall 
