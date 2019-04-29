import React from 'react'
import Article from './Article'
import './Articles.css'

class Articles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [
        {
          title: "updated title [1]",
          author: "Sangkeun Kim",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          like: 0
        },
        {
          title: "updated title [2]",
          author: "Sangkeun Kim",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          like: 0
        },
        {
          title: "updated title [3]",
          author: "Sangkeun Kim",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          like: 0
        },
      ]
    }
  }
  render() {
    return (
      <div className="article-container">
      {this.state.articles &&
        this.state.articles.map(article => (
          <Article 
            title={article.title}
            author={article.author}
            content={article.content}
          />
        ))
      }
      </div>
    )
  }
}

export default Articles
