import React, { Component } from 'react';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';
import { Row, Col } from 'antd';



class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      reviews: []
    }
    const movie_id = this.props.match.params.movie_id

    fetch('http://localhost:5000/api/movies?movie_id=' + movie_id)
      .then(response => response.json())
      .then(rsp => this.setState({ movie: JSON.parse(rsp) }))

    fetch('http://localhost:5000/api/reviews?movie_id=' + movie_id)
      .then(response => response.json())
      .then(rsp => this.setState({ reviews: JSON.parse(rsp) }))
  }

  myCallback = () => {
    const movie_id = this.props.match.params.movie_id
    fetch('http://localhost:5000/api/reviews?movie_id=' + movie_id)
      .then(response => response.json())
      .then(rsp => this.setState({ reviews: JSON.parse(rsp) }))
  }

  render() {
    const movie = this.state.movie;
    const imagesource = 'http://localhost:5000/api/download?filename=' + this.state.movie.photo
    console.log(imagesource)
    return (
      <div>
        <div className='title'>
          {movie.name}
        </div>
        <br />
        <br />
        <div>
          <img src={imagesource} width='40%' />
        </div>
        <br />
        <br />
        <div>
          <ReviewForm movie_id={this.props.match.params.movie_id} callbackFromParent={this.myCallback} />
          <br />
          <br />
          <Row>
            <Col span={4}></Col>
            <Col span={16}><ReviewList reviews={this.state.reviews} /></Col>
            <Col span={4}></Col>
          </Row>
          <br/>
        </div>
      </div>
    );
  }
}

export default Page;
