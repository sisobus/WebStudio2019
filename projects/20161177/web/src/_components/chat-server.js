import React from 'react'
import io from 'socket.io-client'
import {Input, Form} from 'antd';

const {TextArea} = Input;

console.log('socket io is working');
console.log(io);

var socket = io.connect("http://localhost:5003/mynamespace");

socket.on('connect', function() {
    socket.emit('my event', {data: 'I\'m connected!'});
});


class ChatForm extends React.Component {
    state = {
        nickname: '',
        message: ''
    }

    nameChaged(e) {
        this.setState({nickname: e.target.value})
    }
    messageChanged(e){
        this.setState({message: e.target.value})
    }
    
    send() {
        socket.emit('chat-msg', {
            nickname: this.state.nickname,
            message: this.state.message
        })
        this.setState({message: ''})
    }

    render() {
        return (
        <Form.Item>
            <TextArea 
                name="message"
                placeholder="message"
                value = {this.state.message}
                //onChange = {this.messageChanged}
                autosize />   
        </Form.Item>
        );
    }

    componentDidMount() {
        console.log(this.state)
    }
}



/*
socket.on('response', function(msg){ 
    console.log(msg);
}); 

socket.emit('request', {
    data: 'hihihi'
})

export { socket as io }
*/

export { ChatForm }

