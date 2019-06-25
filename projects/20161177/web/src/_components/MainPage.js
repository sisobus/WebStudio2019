import React from 'react';
import { Layout, Button } from 'antd';
import { ChatForm } from "./ChatServer"
import '../index.css';
import { ChatWindow } from './ChatWindow';
import { logout } from "../authentication";
import { LoginUsers } from './LoginUsers';
import logo from './LOGO.png'
import ButtonGroup from 'antd/lib/button/button-group';
import { io } from './ChatServer'
import { getUser } from "../authentication"

const { Header, Sider, Content, Footer } = Layout;

class MainPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            GameMode : false
        }
    this.matching = this.matching.bind(this)
    }

    handleChange () {
        this.setState({
            GameMode : true
        })
    }

    matching() {
        const user = getUser()
        console.log(user)
        io.emit('game_searching', user)
    }

    matchSuccess() {
        io.on('matched', (data) =>{
            io.emit('join_room', {room : 'game'})
        })
    }

    gameStart() {
        io.on('open_room', () => {
            console.log('Game Start!')
            this.handleChange()
        })
    }

    componentDidMount () {
        this.matchSuccess()
        this.gameStart()
    }



    render() {
        
        return(
            <Layout className='mainpage'>
                <Header>
                    <img src = {logo} id = 'logo-in-main'  alt = 'LOGO'/>
                </Header>
                <Layout>
                    <Content>
                        <ChatWindow
                        GameMode = {this.state.GameMode}
                        ></ChatWindow>
                    </Content>
                    <Sider>
                        <ButtonGroup size = 'small'>
                            <Button>
                                Info
                            </Button>
                            <Button
                                onClick = {logout}>
                                Logout
                            </Button>
                        </ButtonGroup>
                        
                        <LoginUsers></LoginUsers>
                    </Sider>
                </Layout>
                <Footer>
                    <ChatForm
                    GameMode = {this.state.GameMode}
                    >
                    </ChatForm>
                    <Button
                    onClick = { this.matching }
                    >GAME START!</Button>
                </Footer>
            </Layout>
        );

    }
}

export default MainPage