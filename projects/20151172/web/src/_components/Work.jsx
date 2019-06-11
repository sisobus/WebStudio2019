import React from 'react';
import './Work.css';
import Article from './Article'
import { Link } from "react-router-dom"
import { Icon } from 'antd'

class Workpage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			articles: [] 
		}
		this.handleLike = this.handleLike.bind(this)

	fetch('http://localhost:5000/api/articles')
		.then (response => {
			console.log(response)
			response.json().then(rsp => {
				this.setState({ articles: rsp })
			})
		})
	}

	handleLike(id) {
		let nextStateArticle = [...this.state.articles]
		nextStateArticle[id].like = nextStateArticle[id].like+1
		this.setState({
			articles: nextStateArticle
		})
	}

	render() {
		return (
			<div className = "work">
				<div className = "back">
					<Link to = "/" className = "link">
						<Icon type="left-circle" className="home" />
					</Link>
				</div>
				<div className = "article-container">
				{this.state.articles &&
					this.state.articles.map((article, id) => (
						<Article
							title={article.title}
							image={article.image}
							category={article.category}
							content={article.content}
							onClick={this.handleLike}
						/>
					))
				}
				</div>
			</div>
		)
	}
}

export default Workpage
