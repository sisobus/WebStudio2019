import React, { Component } from 'react';
import { Button } from 'antd';
import { history } from './history'




class LoginInfo extends Component {

    click = () => {
        history.push('/login')
    }

    render() {
        const user_info = JSON.parse(localStorage.getItem('USER'));

        return (
            <div className='info'>
                {user_info.account} 님 환영합니다!
                <Button type="danger" onClick={this.click}>Logout</Button>
                <br />
                <br/>
            </div>
        );
    }
}

export default LoginInfo;
