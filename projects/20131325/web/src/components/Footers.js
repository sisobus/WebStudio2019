import React, {Component} from 'react';
import { Layout } from 'antd';

class Footers extends Component {
  constructor(props) {
    super(props);
  }
  render () {
    const { Footer } = Layout;

    return (
        <Footer className="footer" style={{ position: 'fixed', zIndex: 1, bottom: '0', width: '100%', background: 'none', Height: '0px'}}> 
            I V E . WORKS © 2019 created by ive lee 
        </Footer>
    );
  }
}

export default Footers;