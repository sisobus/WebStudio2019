import React from 'react';
import './App.css';
import { Button, DatePicker, Card} from 'antd'
import Sider from './Sider'

const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}

function App() {
  return (
    <div className="App">
      <div className="sider">
        <Sider />
      </div>
      <div className="main-container">
        <div style={{ padding: 20 }}>
          <Button type="primary">Primary</Button>
          <Button>Default</Button>
          <Button type="dashed">Dashed</Button>
          <Button type="danger">Danger</Button>
          <Button type="link">Link</Button>
        </div>
        <div style={{ padding: 20 }}>
          <RangePicker onChange={onChange} />
        </div>
        <div style={{ padding: 20 }}>
          <Card
            hoverable
            style={{ width: 240 }}
            cover={
              <img
                alt="example"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
              />
            }
          >
            <Card.Meta title="Europe Street beat" description="www.instagram.com" />
          </Card>
        </div>
      </div>
    </div>
  )
}

export default App;
