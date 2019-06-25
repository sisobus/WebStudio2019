import React from 'react';
import './App.css';

import { Form, Select, Alert, Input, Button, Card, Drawer, Popover } from 'antd';


const { Option } = Select;

const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);


class send extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values, typeof(values));
      }

      fetch('http://127.0.0.1:5000/api/mentions', {
        method: 'POST',
        mode: 'no-cors',
        headers:{ 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(values)
      }).then(res=>res.json())
        .then(res => console.log(res));
        
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
      <div style={{ marginLeft: 420 }}>
        <Form.Item label="Your Email">
          {getFieldDecorator('Your Email', {
            rules: [{ required: true, message: 'Please input your Email!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Mention">
          {getFieldDecorator('Mention', {
            rules: [{ required: true, message: 'Please input your Mention!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Favorite Work">
          {getFieldDecorator('Favorite Work', {
            rules: [{ required: true, message: 'Please select your pick!' }],
          })(
            <Select
              placeholder="What fascinated you?"
              onChange={this.handleSelectChange}
            >
              <Option value="No specific works">No specific works</Option>
              <Option value="Makeup: SHAMAN">Makeup: SHAMAN</Option>
              <Option value="fMakeup: Ethnic">Makeup: Ethnic</Option>
              <Option value="Makeup: Vivid">Makeup: Vivid</Option>
              <Option value="Graphics: ULCHOO">Graphics: ULCHOO</Option>
              <Option value="Graphics: Classic">Graphics: Classic</Option>
              <Option value="Graphics: Texture">Graphics: Texture</Option>
              <Option value="Illustration: Myth&Religion">Illustration: Myth&Religion</Option>
              <Option value="Illustration: Icon">Illustration: Icon</Option>
              <Option value="Illustration: Characters">Illustration: Characters</Option>
              <Option value="Spatial Dynamics">Spatial Dynamics</Option>
              <Option value="Installation">Installation</Option>
              <Option value="Processing">Processing</Option>

            </Select>,

          )}


        </Form.Item>
        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>

          <Button htmlType="submit">
            Submit
          </Button>

        </Form.Item>
        </div>

        <Form.Item drawer>
        <div style={{ marginLeft: 680 }}>
          <Button onClick={this.showDrawer}>

            Check the works

          </Button>
          </div>
          <Drawer
            title="Works"
            width={620}
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
          >
            <p>
            <Popover title="Makeup: SHAMAN">
            <img src="https://i.pinimg.com/564x/f1/31/50/f13150d07597fc71dee15b4f1b4a5f5c.jpg"></img>
            </Popover></p>
            <p>
            <Popover title="Makeup: Ethnic">
            <img src="https://i.pinimg.com/564x/e5/dd/7f/e5dd7fa238a81fabe854f94e11069b10.jpg"></img>
            </Popover></p>
            <p>
            <Popover title="Makeup: Vivid">
            <img src="https://i.pinimg.com/564x/3c/52/13/3c52134ee3ddbbf27c8d2e261772f28d.jpg"></img>
            </Popover></p>
            <p>
            <Popover title="Graphics: ULCHOO">
            <img src="https://i.pinimg.com/564x/0a/e7/1a/0ae71a50b772653695acb240ff19c377.jpg"></img>
            </Popover></p>
            <p>
            <Popover title="Graphics: Classic">
            <img src="https://i.pinimg.com/564x/82/21/72/822172823bf623ca724e3abf7cf65714.jpg"></img>
            </Popover></p>
            <p>
            <Popover title="Graphics: Texture">
            <img src="https://i.pinimg.com/564x/88/9e/9c/889e9c7bce65c1406b40866186bfc05e.jpg"></img>
            </Popover></p>
            <p>
            <Popover title="Illustration: Myth & Religion">
            <img src="https://i.pinimg.com/564x/24/da/10/24da10298ce7f7d08edffe4d01faf959.jpg"></img>
            </Popover></p>
            <p>
            <Popover title="Illustration: Icon">
            <img src="https://i.pinimg.com/564x/0f/2a/e8/0f2ae85ad7c373aed3a2bc88d0352230.jpg"></img>
            </Popover></p>
            <p>
            <Popover title="Illustration: Characters">
            <img src="https://i.pinimg.com/564x/57/28/d5/5728d587815cc4f9f31a31e1a986311a.jpg"></img>
            </Popover></p>
            <p>
            <Popover title="Spatial Dynamics">
            <img src="https://i.pinimg.com/564x/db/e6/9a/dbe69aaf0f7ff56674a17817fff6ba5b.jpg"></img>
            </Popover></p>
            <p>
            <Popover title="Installation">
            <img src="https://i.pinimg.com/564x/41/0d/93/410d93f1715abf46a75e8c32e994818e.jpg"></img>
            </Popover></p>
            <p>
            <Popover title="Processing">
            <img src="https://i.pinimg.com/564x/ff/89/57/ff89571e58205f4bcdc07b2670c0ccf5.jpg"></img>
            </Popover></p>
          </Drawer>
        </Form.Item>


        <div style={{ marginTop: 50 }}>
        <div style={{ marginLeft: 50 }}>
        <Form.Item Card style = {{ width: 1200 }}>
          <p>여러 시각예술작품을 만드는 배하영입니다.
메이크업, 일러스트레이션, 그래픽 디자인, 인스톨레이션, 사진 아트웍, 코딩 등의 매체를 통해 신화적 사고를 이미지로서 표현하는 작업을 주로 진행합니다.
다양한 형식에 도전하며 재미있는 이미지를 만들어내는 것에 관심이 있습니다.

포트폴리오에 올라온 카테고리 외에도 패션, 영상 등의 방법론들에도 흥미가 있으며 협업을 통해 서로가 새로운 지점에 도달하기를 희망합니다.

같이 작업을 하기를 희망하시는 분들은 상단 기능을 통해 연락주시기 바랍니다.</p>
          <p> I'm Baehatrice who make various visual art works. My real name is Bae Hayoung and I'm based on Seoul, Korea.
          Throughout many media like makeup, illustration, graphic design, installation, photo artwork and coding, I try to express mythical thinking as an image.
          I'm interested in making attractive images with several styles.
          I also have interests in other methods like fashion and video. I hope we can reach the new spot with collaboration.
          If you want to make a work with me, please contact with upper function. </p>

        </Form.Item>
        </div>
        </div>
      </Form>


    );
  }
}



const WrappedApp = Form.create({ name: 'coordinated' })(send);
export default WrappedApp;
