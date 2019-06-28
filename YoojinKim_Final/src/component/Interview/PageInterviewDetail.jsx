import React from 'react';

export class PageInterviewDetail extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            article: null
        }

        const { id } = props.match.params

        fetch(`http://localhost:5000/api/interviews?article_id=${id}`, {
            headers: {
                'content-type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(articles => articles[0])
            .then(article => this.setState({ article }))
    }

    render() {
        const { article } = this.state
        return article && (
            <div>
                detailPage {article.id} {article.title} {article.content}
            </div>
        )
    }
}

export default PageInterviewDetail;