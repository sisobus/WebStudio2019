import React from 'react'
import { io } from './ChatServer'



class ChatWindow extends React.Component {
    state = {
        nickname : null,
        message : null
    }


    recieveMessage () {
        io.on('response', (data) => {
            this.setState({
                nickname : data['nickname'], 
                message : data['message'], 
            })
            localStorage.setItem('new message', JSON.stringify(this.state));
        })
    }
    

    loadMessages () {
        var savedMessages = JSON.parse(localStorage.getItem('saved messages'));
        if(savedMessages == null) savedMessages = [];
        var newMessage = this.state;
        savedMessages.push(newMessage);
        localStorage.setItem('saved messages', JSON.stringify(savedMessages));
    } 
    
    checkSentence() {
        var a = this.state.message.split(" ")
    }

    componentDidMount() {
        this.recieveMessage()
    }


    render() {

        const { GameMode } = this.props
        var GameStart = false
        if (GameMode && GameStart === false) {
            GameStart = true
            localStorage.removeItem('saved messages')
            return (
                <div>
                    Game Start
                </div>
            )
        }

        var newMessage = this.state

        if(GameStart) {
            this.checkSentence()
        }
        
        if (newMessage.message !== null) {
            this.loadMessages()
            var savedMessages = JSON.parse(localStorage.getItem('saved messages'))
            return(
                <div className='chat-window' id='align-left'>
                    {savedMessages.map((data, i) => {
                        return(
                            <li key = {i}> {data.nickname} : {data.message} </li>
                        )
                    })}
                
                </div>
            );
        } else {
        
            return(
                <div className='chat-window'>
                    <h1>No Message</h1>
                </div>
            )
        }
    }
}


export { ChatWindow }