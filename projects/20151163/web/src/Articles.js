import React from 'react';

export default class Articles extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            articles: []
        }

        fetch('http://localhost:5000/api/articles')
            .then(response => 
                response.json().then(rsp => 
                    this.setState({ articles: rsp })
                )
            )
    }


    render() {
        return (
            <div className="article-container">
                {this.state.articles &&
                    this.state.articles.map((article, idx) => (
                        <Article
                            title={article.title}
                            content={article.content}
                            key={idx}
                            idx={idx}
                        />
                    ))
                }
            </div>
        )
    }
}

class Article extends React.Component {
    render() {
        return (
            <div className="article">
                <span>title: {this.props.title}</span>
                <span>cotnent: {this.props.content}</span>
            </div>
        )
    }
}
