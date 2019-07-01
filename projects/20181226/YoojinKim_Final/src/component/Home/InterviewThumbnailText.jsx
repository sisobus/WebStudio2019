import React from 'react'
import './InterviewThumbnailText.css'

class InterviewThumbnailText extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.onClick(this.props.idx)
  }
  render() {
    return (
      <div className="article"
      style={{border:0}}>
        <h1 className="title">{this.props.title}
          <button
            onClick={this.handleClick}
          >♥</button>
        </h1>
        <p className="author">{this.props.author} [{this.props.like}]</p>
        <p className="content">{this.props.content}</p>
      </div>
    )
  }
}

export default InterviewThumbnailText