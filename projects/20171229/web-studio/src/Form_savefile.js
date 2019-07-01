import React from 'react';
import './App.css';

import { Form, Select, Input, Button, Card, Drawer } from 'antd';


const { Option } = Select;




class send extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleSelectChange = value => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  };

  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (

      <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
        <Form.Item label="Your Email">
          {getFieldDecorator('Your Email', {
            rules: [{ required: true, message: 'Please input your Email!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Favorite Work">
          {getFieldDecorator('Favorite Work', {
            rules: [{ required: true, message: 'Please select your pick!' }],
          })(
            <Select
              placeholder="Select a option and change input text above"
              onChange={this.handleSelectChange}
            >
              <Option value="male">male</Option>
              <Option value="female">female</Option>
              <Option value="others">others</Option>

            </Select>,
          )}


        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Form.Item drawer>
          <Button type="primary" onClick={this.showDrawer}>
            Check the works
          </Button>
          <Drawer
            title="Basic Drawer"
            width={520}
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <p><img src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"></img></p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </Form.Item>

        <Form.Item Card style = {{ width: 600 }}>
          <p>다양한 시각예술작품을 만드는 배하영입니다.
메이크업, 일러스트레이션, 그래픽 다자인, 설치 및 인스톨레이션, 사진 아트웍 등의 매체를 통해 신화적 사고를 이미지로서 표현하는 작업을 주로 진행합니다. 다양한 형식에 도전하며 재미있는 이미지를 만들어내는 것에 관심이 많습니다.

포트폴리오에 올라온 카테고리 외에도 패션, 영상 등의 방법론들에도 많은 흥미가 있으며 협업을 통해 서로가 새로운 지점에 도달하기를 희망합니다.

같이 작업을 하기를 희망하시는 분들은 편하게 연락주시기 바랍니다.</p>
        </Form.Item>
      </Form>


    );
  }
}

const WrappedApp = Form.create({ name: 'coordinated' })(send);
export default WrappedApp;
