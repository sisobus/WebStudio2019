import React from 'react'
import { io } from './ChatServer'

var NGword = [{
    nickname : '',
    NG : ''
}, {
    nickname : '',
    NG : ''
}]

class ChatWindow extends React.Component {
    state = {
        nickname : null,
        message : null,
        gamestart : false
    }

    handleChange() {
        this.setState({
            gamestart : true
        })
    }


    recieveMessage () {
        io.on("response", (data) => {
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

    
    /*
    checkSentence() {
        const check = this.state
        var word = check.message.split(" ")
        console.log(word)
        console.log(word.length)
        console.log(NGword[0].nickname)
        console.log(NGword.length)

        for(var z = 0; z<NGword.length; z++) {
            if (NGword[z].nickname === check.nickname) {
                for (var i = 0; i < word.length; i++) {
                    console.log('하고 있음')
                    if (NGword[z].NG === word[i]) {
                        console.log(check.nickname + 'is defeat')
                        this.setState({
                            losingGame : true
                        })
                    }
                }
            }
        }   
    }
*/
    gameSet() {
        io.on('game_over', () => {
            this.setState({
                gamestart : false
            })
            console.log(this.state.nickname + 'is losing the game')         
            //io.emit('sending', {nickname : 'notice', message : '***' + this.state.nickname + 'is losing the game ***'})
                  
        })      
    }

    changeGameMode() {
        this.props.callbackFromParent(this.state.gamestart)
    }

    gameStart() {
        io.on('open_room', (data) => {
            NGword = data
            console.log(NGword)
            //io.emit('sending', {nickname : 'notice', message : 'Game has been started!'})
        })
    }

    componentDidMount() {
        this.recieveMessage()
        this.gameStart()
        this.gameSet()
    }

    render() {
        var newMessage = this.state
        
        const { GameMode } = this.props
        if (GameMode) {
            this.handleChange()
            localStorage.removeItem('saved messages')
            this.changeGameMode()
            return (
                <div>
                    Game Start
                </div>
            )
        }

        
        if (newMessage.message !== null) {
            if (newMessage.gamestart) {
                //this.checkSentence()
            }
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