import React, {Component} from 'react';
import { Layout } from 'antd';

import Cards from "./Cards";
import Menus from "./Menus";
import Footers from "./Footers";

export default class MainPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      cards: [
        // {id:1, title:'FEW BY FEW PEOPLE™', desc:'BI design for FEW™', thumb:'https://universe3306.github.io/ive/img/content1/1.jpg'},
        // {id:2, title:'TIME LOUNGE™', desc:'Lounge Club Concept BI/Merch.', thumb:'https://universe3306.github.io/ive/img/content2/1.png'},
        // {id:3, title:'COMMONTALKS™', desc:'Social Chatting App UX/UI Design', thumb:'https://universe3306.github.io/ive/img/content3/1.jpg'},
        // {id:7, title:'P.O.E', desc:'-', thumb:'https://universe3306.github.io/ive/img/content7/1.jpg'},
        // {id:8, title:'Hustler2018 (CONCEPT)', desc:'-', thumb:'https://universe3306.github.io/ive/img/content8/1.jpg'},
        // {id:222, title:'Hustler2017™', desc:'-', thumb:'https://universe3306.github.io/ive/img/content6/1.jpg'},
        // {id:4, title:'Masterpiece, Reimagined', desc:'Film Exhibition Poster design', thumb:'https://universe3306.github.io/ive/img/content4/1.jpg'},
        // {id:5, title:'Hustler2018™', desc:'-', thumb:'https://universe3306.github.io/ive/img/content5/1.jpg'},
        // {id:9, title:'C R E D.™', desc:'-', thumb:'https://universe3306.github.io/ive/img/content9/1.jpg'},
        // {id:10, title:'I LOVE YA!™ Project', desc:'-', thumb:'https://universe3306.github.io/ive/img/content10/1.jpg'},
        // {id:11, title:'DACHAE™ Magazine', desc:'-', thumb:'https://universe3306.github.io/ive/img/content11/1.jpg'},
        // {id:12, title:'INVITATION™', desc:'-', thumb:'https://universe3306.github.io/ive/img/content12/1.jpg'},
        // {id:5, title:'Film', desc:'Some films by IVE', thumb:'https://universe3306.github.io/ive/img/thumbs/Shutter%20Island%20thumb.png'},
        // {id:6, title:'Photography', desc:'Some Photographies by IVE', thumb:'https://universe3306.github.io/ive/img/대지 111 사본.jpg'},
        // {id:6, title:'DRAWING', desc:'Some Drawings by IVE', thumb:'https://universe3306.github.io/ive/img/대지 111 사본 2.jpg'}
      ]      
    }
    
    fetch('http://localhost:5000/api/articles', {
      header: {
        'content-type': 'application/json'
      }
    })
      .then(response => {
        response.json().then(rsp => {
          this.setState({ cards: rsp })
          console.log(rsp);   
      })
    })
    // ~/api/articles로부터 컨텐츠 정보들을 fetch 받고
    // 그 'articles' 정보들을 'rsp'에 담음
    // 그 정보들을 'this.state.cards'에 담고
    // 그 'this.state.cards'를 저 아래 <Cards>에 담아 보냈음
  }

     
  render() {

    const { Header, Content } = Layout;

    return (
      <Layout className="layout">
        <Header style={{ position: 'fixed', zIndex: 1, width: '100%', background: 'none', Height: '0px'}} >
          <Menus/>
        </Header>
        <Content className="jb" style={{ background: '#fff', padding: '0 10% 50px 10%' }}>
          <Cards data={this.state.cards}></Cards>
        </Content>
        <Footers/>
      </Layout>             
    )
  }
}
