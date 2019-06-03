import React, { Component } from 'react';
import ListComp from './ListComp';


class MovieList extends Component {

  //제일 처음 실행
  constructor(props) {
    super(props);
    this.state = {
      movies: []
    }
    //일단 그냥 전체 리스트 불러옴.
    //다음에 날짜순으로 정렬하게 불러와야 함 
    const order_by = this.props.match.params.order_by


    fetch('http://localhost:5000/api/movies?order='+order_by)
      .then(response => response.json())
      .then(rsp => this.setState({ movies: JSON.parse(rsp) }))
  }
  //Article에 데이터 전달
  render() {
    const movieArr = this.state.movies;

    return (
      <div>
        <div>
          머릿글
        </div>
        <div>
          <ListComp movie={movieArr}/>
        </div>
      </div>
    );
  }
}

export default MovieList;
