import React from 'react'
import io from 'socket.io-client'
import { Input, Form, Button } from 'antd';
import { getUser } from "../authentication"

console.log('socket io is working');
console.log(io);

var socket = io.connect("http://localhost:5003");
export { socket as io }

socket.on('connect', (data) => {
    console.log(data);
})

class ChatForm extends React.Component {
    state = {
        nickname: '',
        message: ''
    }

    setUsername () {
        const username = getUser()
        this.state.nickname = username['nickname']
    }

    handleChange = (e) => {
        this.setState({
            message : e.target.value
        })
    }
    
    sendMessage = () => {
        socket.emit('sending', {nickname: this.state.nickname, message: this.state.message})
    }
/*
    recieveMessage() {
        socket.on('response', (data) => {
            this.state.nickname = data['nickname']
            this.state.message = data['message']
        })
    }
*/
    componentDidMount() {
        this.setUsername()
        //this.recieveMessage()
    }

    render () {
        return(
            <Form>
                <Input 
                    placeholder="message"
                    value = {this.state.message}
                    onChange = {this.handleChange} 
                    onPressEnter={this.sendMessage}
                />
            </Form>
        );
    }
}

export { ChatForm }