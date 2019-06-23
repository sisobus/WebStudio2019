import React from 'react'
import { Input, Form, Button } from 'antd';
import { io } from './ChatServer'


class ChatWindow extends React.Component {
    state = {
        nickname: '',
        message: ''
    }

    recieveMessage() {
        io.on('response', (data) => {
            this.state.nickname = data['nickname']
            this.state.message = data['message']
            console.log(this.state)
        })
    }

    componentDidMount() {
        this.recieveMessage()
    }

    render () {
        return(
            <Form>
                {this.state.nickname}
                {this.state.message}
            </Form>
        );
    }
}

export { ChatWindow }