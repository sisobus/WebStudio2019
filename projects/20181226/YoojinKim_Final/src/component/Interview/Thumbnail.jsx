import React from 'react'
import ThumbnailText from './ThumbnailText'
//import Image from './Image'
import './Thumbnail.css'
// import Comment from './Comment'
import image1 from '../BWR.svg';
import image2 from '../BLSG.svg';
import image3 from '../406project.svg';

import { Link } from "react-router-dom"

class Thumbnail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: [
        {
          title: "Artist Interview#1 벤치위레오",
          author: "Interviewer 김수빈",
          text: "19.05.10 펫사운즈 이태원에서 벤치위레오의 취중진담(?)을 듣다!",
          // like: 0,
          image: image1,
          link: '/interview/benchwereo',
        },
        {
          title: "Artist Interview#2 분리수거",
          author: "Interviewer 김수빈",
          text: "19.05.13 분리수거의 의외로(?) 진솔한 모습을 보고 오다!",
          image: image2,
          link: '/interview/blsg',
        },
        {
          title: "Artist Interview#3 406호 프로젝트",
          author: "Interviewer 김수빈",
          text: "19.05.18 그린플러그드 가기 직전의 406호 프로젝트!",
          image: image3,
          link: '',
        },
      ]
    }
  
  //   fetch('http://localhost:5000/api/interviews', {
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //   })
  //     .then(response => response.json())
  //     .then(articles => this.setState({ articles }))
  //   this.handleLike = this.handleLike.bind(this)
 }

  handleLike(idx){
    let nextStateArticle = [...this.state.articles]
    nextStateArticle[idx].like = nextStateArticle[idx].like + 1

    this.setState({
      articles: nextStateArticle
    })
  }


  render() {
    return (
      <div className="content-container">
      {this.state.articles &&
        this.state.articles.map((article, idx)  => (
          <div>
          <div class="image-container">
            <img src={article.image} />
          </div>
          <div class="text-container">
            <Link to = {article.link}>
          <ThumbnailText 
            title={article.title}
            author={article.author}
            text={article.text}
            // like={article.like}
            key={idx}
            idx={idx}
            onClick={this.handleLike}
            // id={article.id}
          />
          </Link>
          </div>
          {/* <Comment /> */}
          </div>
        ))
      }
      </div>
    )
  }
}

export default Thumbnail