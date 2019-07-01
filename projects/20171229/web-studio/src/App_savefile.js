import React from 'react';
import './App.css';
import { Form, Select, Input, Button, DatePicker } from 'antd';
import Sider from './Sider';
import Forms from './Form';

const {RangePicker} = DatePicker;
const { Option } = Select;


function onChange(date, dateString) {
  console.log(date, dateString);
}

function App() {

  return (
    <div className="App">
      <div className="sider">
        <Sider />
      </div>
      <div className ="main-container">
        <div style={{ padding: 20}}>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
        </div>
      <div style={{ padding: 20}}>
        <RangePicker onChange={onChange} />
      </div>

      <div className ="form">
        <div style={{padding: 20}}>
          <Forms />
        </div>
      </div>

    </div>
  </div>
  )
}


export default App;
