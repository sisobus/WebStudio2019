import React from 'react'
import './Article.css'

class Article extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
  }
  render() {
    return (
      <div className="article">
        <h1 className="title">{this.props.title}</h1>
        <p className="author">{this.props.author}</p>
        <p className="content">{this.props.content}</p>
      </div>
    )
  }
}

export default Article
