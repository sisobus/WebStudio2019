import React from 'react';
import {Button, Layout} from 'antd';
import { ChatForm } from "./chat-server"
//import {history} from './History';
import './MainPage.css';

const { Header, Sider, Content, Footer } = Layout;

class MainPage extends React.Component {
    render() {
        
        return(
            <div>
            <Layout>
                <Header>Header</Header>
                <Layout>
                    <Content>Content</Content>
                    <Sider>Sider</Sider>
                </Layout>
                <Footer>
                    <ChatForm></ChatForm>
                </Footer>
            </Layout>
        </div> 
        );

    }
}

export default MainPage