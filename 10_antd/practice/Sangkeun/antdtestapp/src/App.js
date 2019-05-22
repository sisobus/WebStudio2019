import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Timeline, Slider, Button, Calendar } from 'antd';

function App() {
  return (
    <div className="App">
      <Button type="primary">Primary</Button>
      <Button>Default</Button>
      <Button type="dashed">Dashed</Button>
      <Button type="danger">Danger</Button>
      <Button type="link">Link</Button>
      <br />
      <Slider defaultValue={30} />
      <br />
      <Calendar  />,
      <Timeline>
        <Timeline.Item>1990-05-07 탄생</Timeline.Item>
        <Timeline.Item>2011-03-02 입학</Timeline.Item>
        <Timeline.Item>2015-02-28 졸업</Timeline.Item>
        <Timeline.Item>2017-02-28 졸업2</Timeline.Item>
      </Timeline>
    </div>
  );
}

export default App;
