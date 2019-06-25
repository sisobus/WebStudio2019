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

    gameStart() {
        io.emit('game_start')
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
            this.gameStart()
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
                <div>
                    {savedMessages.map((data, i) => {
                        return(
                            <li key = {i}> {data.nickname} : {data.message} </li>
                        )
                    })}
                
                </div>
            );
        } else {
        
            return(
                <div>
                    No Message
                </div>
            )
        }
    }
}


export { ChatWindow }