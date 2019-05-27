import React from 'react';
import logo from './logo.svg';
import { Menu, Dropdown } from 'antd';
import { Affix, Button } from 'antd';
import './App.css';


function App() {
  return (

    <div className="App">
  
    <Affix offsetTop={100} onChange={affixed => console.log(affixed)}>
    <Dropdown overlay={
      <Menu>
      <Menu.Item>
        <m1 target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        Designed
        </m1>
      </Menu.Item>
      <Menu.Item>
        <m1 target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        Illustrated
        </m1>
      </Menu.Item>
      <Menu.Item>
        <m1 target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Programmed
        </m1>
      </Menu.Item>
      <Menu.Item>
        <m1 target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        VR / AR
        </m1>
      </Menu.Item>
      <Menu.Item>
        <m1 target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3D Modeling / Animation
        </m1>
      </Menu.Item>
      <Menu.Item>
        <m1 target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Photographed
        </m1>
      </Menu.Item>
      <Menu.Item>
        <m1 target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        Filmed
        </m1>
      </Menu.Item>
      <Menu.Item>
        <m1 target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        __________ of Jindogliani in Korea.
        </m1>
      </Menu.Item>
    </Menu>}>
      <Button>__________ by Jindogliani in Korea.</Button>
    </Dropdown>
    </Affix>
  

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
          __________ by Jindogliani in Korea.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );

}

export default App;
