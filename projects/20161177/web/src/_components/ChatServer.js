import React from 'react'
import io from 'socket.io-client'
import { Input, Form } from 'antd';
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
        message: []
    }

    setUsername () {
        const username = getUser()
        this.setState ({
            nickname : username['nickname']
        }) 
    }

    handleChange = (e) => {
        this.setState({
            message : e.target.value
        })
    }
    
    sendMessage = () => {
        socket.emit('sending', {nickname: this.state.nickname, message: this.state.message})
    }

    componentDidMount() {
        this.setUsername()
    }

    render () {
        return(
            <Form className = 'chatForm'>
                <Input 
                    placeholder="message"
                    defaultValue = ''
                    value = {this.state.message}
                    onChange = {this.handleChange} 
                    onPressEnter={this.sendMessage}
                    addonAfter='send'
                />
            </Form>
        );
    }
}

export { ChatForm }