import React from 'react'
import './ThumbnailText.css'
import { Link } from 'react-router-dom';

class ThumbnailText extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.handleClick = this.handleClick.bind(this)
  }
  handleClick() {
    this.props.onClick(this.props.idx)
  }
  render() {
    const { id, title, author, text } = this.props;
    return (
      <div className="article">
        <h1 className="title">
          <Link to={`/interview/${id}`}>{title}</Link>
          {/* <button
            onClick={this.handleClick}
          >♥</button> */}
        </h1>
        <p className="author">{author}</p>
        <p className="text">{text}</p>
      </div>
    )
  }
}

export default ThumbnailText