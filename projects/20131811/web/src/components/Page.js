import React, { Component } from 'react';
import ReviewList from './ReviewList';
import ReviewForm from './ReviewForm';



class Page extends Component {
  //제일 처음 실행
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      reviews: []
    }
    //영화 하나 불러와서 movie에 저장
    //일단 아이디는 2로 지정 함. 여기다 어떻게 전달할지가 과제
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

  //Article에 데이터 전달
  render() {

    const movie = this.state.movie;
    return (
      <div>
        <div>
          영화 아이디 : {movie.id}
          영화 이름 : {movie.name}
          <br />
        </div>
        <div>
          여기 리뷰 입력 폼
          <ReviewForm movie_id={this.props.match.params.movie_id} callbackFromParent={this.myCallback} />
          <br />
          <ReviewList reviews={this.state.reviews} />
        </div>
      </div>
    );
  }
}

export default Page;
