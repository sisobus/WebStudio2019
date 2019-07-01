import React from 'react'
import Article from './Article'
import './Articles.css'

class Articles extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      articles: [{
	title:'aaa',
	content: 'content!1!',
	author:'San',
	key:1,
	idx:1,
	},{
        title:'aaa',
        content: 'content!2!',
        author:'San',
        key:2,
        idx:2,
	},{
        title:'aaa',
        content: 'content!3!',
        author:'San',
        key:3,
        idx:3,
	{,{
        title:'aaa',
        content: 'content!4!',
        author:'San',
        key:4,
        idx:4,
	}]
    }
    this.handleLike = this.handleLike.bind(this)

    fetch('http://localhost:5000/api/articles')
      .then(response => {
        response.json().then(rsp => {
          this.setState({ articles: rsp })
        })
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
        ))
      }
      </div>
    )
  }
}

export default Articles
