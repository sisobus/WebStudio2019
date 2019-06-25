import React, { Component } from 'react';
import { Row, Col } from 'antd';

import ListComp from './ListComp';


class MovieListDate extends Component {

  //제일 처음 실행
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
    //일단 그냥 전체 리스트 불러옴.
    //다음에 날짜순으로 정렬하게 불러와야 함 

    fetch('http://localhost:5000/api/movies?order=date')
      .then(response => response.json())
      .then(rsp => this.setState({ movies: JSON.parse(rsp) }))
  }
  //Article에 데이터 전달
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

export default MovieListDate;
