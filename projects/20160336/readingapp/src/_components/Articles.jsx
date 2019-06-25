import React from 'react'
import Article from './Article'
import './Articles.css'

class Articles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [
        {
          title: "Good Omens  ",
          image: "https://images-na.ssl-images-amazon.com/images/I/41OkgiyRskL.jpg",
          author: "User",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          like: 0
        },
        {
          title: "Good Omens  ",
          image: "https://images-na.ssl-images-amazon.com/images/I/51hULWlc1TL._SX260_.jpg",
          author: "User",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          like: 0
        },
        {
          title: "Good Omens  ",
          image: "https://images-na.ssl-images-amazon.com/images/I/41axkeEpgxL._SX258_BO1,204,203,200_.jpg",
          author: "User",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          like: 0
        }
      ]
    }
    this.handleLike = this.handleLike.bind(this)

    fetch('http://127.0.0.1:5000/api/users')
       .then(response => {
         response.json().then(rsp=> {this.setState({ articles: rsp })})
    })

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
        ))}
      </div>
    )
  }
}

export default Articles
