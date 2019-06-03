import React, {Component} from 'react';

class UserForm extends Component {
    state = {
        email: '',
        password: '',
        nickname: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
 }

export default UserForm;