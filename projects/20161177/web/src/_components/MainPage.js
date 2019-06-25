import React from 'react';
import { Layout, Button } from 'antd';
import { ChatForm } from "./ChatServer"
import './MainPage.css';
import { ChatWindow } from './ChatWindow';
import { logout } from "../authentication";
import { LoginUsers } from './LoginUsers';
import GamePage from './GamePage'

const { Header, Sider, Content, Footer } = Layout;

class MainPage extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            GameMode : false
        }
    this.handleChange = this.handleChange.bind(this)
    }

    handleChange () {
        this.setState({
            GameMode : true
        })
    }

    render() {
        
        return(
            <Layout>
                <Header>Header</Header>
                <Layout>
                    <Content>
                        <ChatWindow
                        GameMode = {this.state.GameMode}
                        ></ChatWindow>
                    </Content>
                    <Sider>
                        <Button
                        type = 'primary'
                        onClick = {logout}>
                            Logout
                        </Button>
                        <LoginUsers></LoginUsers>
                    </Sider>
                </Layout>
                <Footer>
                    <ChatForm
                    GameMode = {this.state.GameMode}
                    ></ChatForm>
                    <Button
                    onClick = { this.handleChange }
                    >GAME START!</Button>
                </Footer>
            </Layout>
        );

    }
}

export default MainPage