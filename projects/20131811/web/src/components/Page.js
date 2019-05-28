import React, {Component} from 'react';


class Page extends Component {
    //제일 처음 실행
    constructor(props) {
      super(props);
      this.state = {
        reviews : []
      }

      //일단 전체 리뷰 수 불러옴
      //
      fetch('http://localhost:5000/api/movies')
      .then(response => response.json())
      .then(rsp => this.setState({ movies: JSON.parse(rsp) }))
    }

    //Article에 데이터 전달
    render () {
      const movie = this.props.movie;
      return (
        <div>
            이름 : {movie.name}
        </div>
      );
    }
  }
  
  export default Page;
  