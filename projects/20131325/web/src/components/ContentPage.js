import React from 'react';
import { Layout } from 'antd';
import { Row, Col } from 'antd';

import Images from "./Images";
import Footers from "./Footers";

export default class ContentPage extends React.Component {
  constructor(props) {
    super(props)
    const { match } = props
    this.state = {
      text: "", images: []
    }

    fetch(`http://localhost:5000/api/articles?article_id=${match.params.id}`, {
      header: {
        'content-type': 'application/json'
      }
    }).then(response => response.json().then(res => res[0]).then(({ text }) => 
      this.setState({ text })
    ))
    fetch(`http://localhost:5000/api/comments?article_id=${match.params.id}`, {
      header: {
        'content-type': 'application/json'
      }
    }).then(response => response.json().then(images => 
      this.setState({ images })
    ))
  }

  render() {
    const { match } = this.props;
    const { Header, Content, Footer } = Layout;

    return (
      <div>
        <Content className="contentpage" style={{ background: '#fff', padding: '0 10% 50px 10%' }}>
          <div className="contentdiv" >
            <Row>
              <Col span={12} push={2}>
                <p dangerouslySetInnerHTML={ {__html: this.state.text} }></p>
              </Col>
              <Col span={12}>
                <Images imgs={this.state.images}></Images>
              </Col>
            </Row>   
          </div>                        
        </Content>
        <Footers/>
      </div>
    
    );
  }
}
