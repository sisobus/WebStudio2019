import React, { Component } from 'react';
import { Row, Col } from 'antd';

import ListComp from './ListComp';


class MovieListStar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
    
    fetch('http://localhost:5000/api/movies?order=star')
      .then(response => response.json())
      .then(rsp => this.setState({ movies: JSON.parse(rsp) }))
  }
  render() {

    return (
      <div >
        <Row>
          <Col span={4}></Col>
          <Col span={16}><ListComp movie={this.state.movies} /></Col>
          <Col span={4}></Col>
        </Row>
      </div>
    );
  }
}

export default MovieListStar;
