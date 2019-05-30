import React, { Component } from 'react';


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
    const movie_id = 2

    fetch('http://localhost:5000/api/movies?movie_id='+movie_id)
      .then(response => response.json())
      .then(rsp => this.setState({ movie: JSON.parse(rsp) }))
      .then(console.log(this.state.movie))

    fetch('http://localhost:5000/api/reviews?movie_id'+movie_id)
      .then(response => response.json())
      .then(rsp => this.setState({ reviews: JSON.parse(rsp) }))
  }

  //Article에 데이터 전달
  render() {
    const movie = this.state.movie;
    const reviews = this.state.reviews;
    const review_list = reviews.map((review) => (
      <div>
        리뷰 아이디 : {review.id} / 
        리뷰 한 사람 : {review.user_id} /
        content : {review.content} /
        star : {review.star} <br/>
      </div>
    )
    )
    return (
      <div>
        영화 아이디 : {movie.id}
        영화 이름 : {movie.name}
        <br/>
        여기 리뷰 리스트 출력
        <br/>
        {review_list}

        </div>
    );
  }
}

export default Page;
