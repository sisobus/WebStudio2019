import React, { Component } from 'react';
import './LoginInfo.css'


class LoginInfo extends Component {

    render() {
        const user_info = JSON.parse(localStorage.getItem('USER'));

        return (
            <div className='layout'>
                <div className='loginInfo'>
                    user : {user_info.account}
                </div>
            </div>
        );
    }
}

export default LoginInfo;
