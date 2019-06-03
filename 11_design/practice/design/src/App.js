import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Timeline, Slider, Button, Calendar } from 'antd';

function get() {
  fetch('/api/list')
    .then(rsp => {

    })
}
//       

class App extends React.Component {
  render() {
  return (
    <div className="App">
      <div className="sider">
        <Button id="primary-key" type="primary">Primary</Button>
        <Button type="primary">Primary</Button>
        <Button type="primary">2</Button>
        <Button type="primary">Primary3</Button>
        <Button type="primary">Primary4</Button>
        <Button type="primary">Primary5</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
        <br />
        <Slider defaultValue={30} />
        <br />
      </div>
      <div className="main">
      <Timeline>
        <Timeline.Item>1990-05-07 탄생</Timeline.Item>
        <Timeline.Item>2011-03-02 입학</Timeline.Item>
        <Timeline.Item>2015-02-28 졸업</Timeline.Item>
        <Timeline.Item>2017-02-28 졸업2</Timeline.Item>
      </Timeline>
      <br />
      <Calendar  />,
      </div>
    </div>
  );
  }
}

export default App;
