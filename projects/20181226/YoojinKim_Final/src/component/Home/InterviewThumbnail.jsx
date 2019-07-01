import React from 'react'
import InterviewThumbnailText from './InterviewThumbnailText'
//import Image from './Image'
import './InterviewThumbnail.css'

class InterviewThumbnail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      articles: []
    }
  
    fetch('http://localhost:5000/api/interviews', {
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(articles => this.setState({ articles }))
    this.handleLike = this.handleLike.bind(this)
  }
  handleLike(idx) {
    let nextStateArticle = [...this.state.articles]
    nextStateArticle[idx].like = nextStateArticle[idx].like + 1

    this.setState({
      articles: nextStateArticle
    })
  }
  render() {
    return (
      <div className="content-container">
      <p class="Title1"> Interview 미리보기 </p>
      <div className="all">
      {this.state.articles &&
        this.state.articles.map((article, idx)  => (
          <div className="view">
          <div className="image">
            <img src={article.image} />
          </div>
          <div className="text">
          <InterviewThumbnailText 
            title={article.title}
            author={article.author}
            content={article.content}
            like={article.like}
            key={idx}
            idx={idx}
            onClick={this.handleLike}
          /></div>
          </div>
        ))
      }
      </div>
      </div>
    )
  }
}

export default InterviewThumbnail