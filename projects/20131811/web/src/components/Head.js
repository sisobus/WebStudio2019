import React, {Component} from 'react';


class Head extends Component {

    //제일 처음 실행
    constructor(props) {
      super(props);
      this.state = {
          datas: []
      }
      /*
      fetch('http://localhost:8080/article/list')
      .then(res => res.json())
      .then(data => this.setState({
          datas: data
      }))
      .then(console.log(this.state));
      */
    }
    //그다음 실행
    componentWillMount() {
    }
  
    //Article에 데이터 전달
    render () {
      return (
        <div>
            
        </div>
      );
    }
  }
  
  export default Head;
  