import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Layout, Row, Col, Card, PageHeader, Steps, Rate,Spin } from 'antd';

const {
  Header, Footer, Sider, Content,
} = Layout;

const Step = Steps.Step;

const { Meta } = Card;

function App() {
  return (
    <div className="App">
        <Layout>
          <Header>
              <Spin size="small" />
              <Spin />
              <Spin size="large" />
          </Header>
          <Content>
            <Row>
                <Col span={6}>
                    <Card hoverable style={{ width: 240 } }
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                    <Meta
                          title=<Rate allowHalf defaultValue={2.5} />
                          description="www.instagram.com"
                    />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card hoverable style={{ width: 240 } }
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                    <Meta
                          title=<Rate allowHalf defaultValue={5} />
                          description="www.instagram.com"
                    />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card hoverable style={{ width: 240 } }
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                    <Meta
                          title=<Rate allowHalf defaultValue={4.5} />
                          description="www.instagram.com"
                    />
                    </Card>
                </Col>
                <Col span={6}>
                    <Card hoverable style={{ width: 240 } }
                        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
                    >
                    <Meta
                          title=<Rate allowHalf defaultValue={0} />
                          description="www.instagram.com"
                    />
                    </Card>
                </Col>
            </Row>


          </Content>
          <Footer>
            <Steps current={0}>
              <Step title="Start" description="시작" />
              <Step title="ing" description="중간" />
              <Step title="Finish" description="마지막" />
            </Steps>
          </Footer>
        </Layout>

    </div>
  );
}

export default App;
