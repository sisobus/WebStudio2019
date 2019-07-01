import React from 'react'
import './Article.css'

class Article extends React.Component {
	constructor(props) {
		super(props)
		console.log(props)

		this.handleClick = this.handleClick.bind(this)
	}
	handleClick() {
		this.props.onClick(this.props.id)
	}
	
	render() {
		return (
			<div className="article">
				<h1 className="title">{this.props.title}
				</h1>
				<img src={this.props.image} alt="" className="img"></img>
				<h2 className="category">{this.props.category}</h2>
				<p className="content">{this.props.content}</p>
			</div>
		)
	}
}

export default Article
