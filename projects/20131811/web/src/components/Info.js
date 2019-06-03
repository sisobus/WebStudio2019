import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';


class Info extends Component {

    //제일 처음 실행
    constructor(props) {
        super(props);
        this.state = {
            information: []
        }

        fetch('http://localhost:5000/api/login')
            .then(response => response.json())
            .then(res => {
                const result = JSON.parse(res)
                console.log(result)
                if (result == 'fail'){
                    <Redirect to="/login"/>
                }
                this.setState({ information: result })
                console.log(result)
            }
            )

    }

    render() {
        const info = this.state.information;

        return (
            <div>
                사용자 이름 : {this.info.account}

            </div>
        );
    }
}

export default Info;
