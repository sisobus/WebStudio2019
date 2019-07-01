import React from 'react';
import './App.css';
import { Form, Select, Input, Button, DatePicker, Popover } from 'antd';
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

      <div className ="main-container">


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
