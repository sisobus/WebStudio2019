import React from 'react';
import { Layout } from 'antd';
import { ChatForm } from "./ChatServer"
//import {history} from './History';
import './MainPage.css';
import { ChatWindow } from './ChatWindow';

const { Header, Sider, Content, Footer } = Layout;

class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        
        return(
            <Layout>
                <Header>Header</Header>
                <Layout>
                    <Content>
                        <ChatWindow></ChatWindow>
                    </Content>
                    <Sider>Sider</Sider>
                </Layout>
                <Footer>
                    <ChatForm></ChatForm>
                </Footer>
            </Layout>
        );

    }
}

export default MainPage