import React from 'react'
import Article from './Article'
import './Articles.css'

class Articles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [
        {
          title: "경성 탐정 이상 시리즈",
          author: "Sangkeun Kim",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          like: 0
        },
        {
          title: "하드보일드 탐정",
          author: "Sangkeun Kim",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          like: 0
        },
        {
          title: "빨간 마스크",
          author: "Sangkeun Kim",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          like: 0
        },
      ]
    }
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
      <div className="article-container">
      {this.state.articles &&
        this.state.articles.map((article, idx) => (
          <Article 
            title={article.title}
            author={article.author}
            content={article.content}
            like={article.like}
            key={idx}
            idx={idx}
            onClick={this.handleLike}
          />
        ))
      }
      </div>
    )
  }
}

export default Articles
