import React from 'react';
import './App.css';
import { Layout, Menu, Icon, Modal, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router'



const { Header } = Layout;

class AllMenu extends React.Component{
    state = { 
        visible: false, 
        password : "",
        toUpload: false,
    };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
        if(this.state.password === "1234"){
            this.setState({
                visible : false,
              toUpload: true , 
            });
        } 
        else{
            console.log("Incorrect")}
    };
      
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };

    onChange = (e) =>{
        this.setState({
          password : e.target.value
        });
      }

	render () {
        return this.state.toUpload ? (<Redirect to="/upload"/>) : (

            <Header>
                <div className="logo"/><Icon type="smile"/>
                    <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}>
                        <Menu.Item key= "1" >
                            <Link to = '/'>All</Link>
                        </Menu.Item>

                        <Menu.Item key="2">
                            <Button type='link' onClick={this.showModal}>
                            Upload
                            </Button>
                            <Modal
                            title="Input the Upload Code"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            >
                            <Input.Password placeholder="input password" onChange={this.onChange} />
                            </Modal>
                        </Menu.Item>

                        <Menu.Item key="3">
                            <Link to = '/Request_Enroll'>Request Enrollment</Link>
                        </Menu.Item>
                    </Menu>
            </Header>
        )
    }
}
export default AllMenu;

class UploadMenu extends React.Component{
	render () {
		return(
            <Header>
                <div className="logo"/><Icon type="smile"/>
                    <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['2']}
                    style={{ lineHeight: '64px' }}>
                        <Menu.Item key= "1" >
                            <Link to = '/'>All</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Link to = '/Upload'>Upload</Link>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to = '/Request_Enroll'>Request Enrollment</Link>
                        </Menu.Item>
                    </Menu>
            </Header>
        )
    }
}


class RequestMenu extends React.Component{
    state = { 
        visible: false, 
        password : "",
        toUpload: false,
    };

    showModal = () => {
      this.setState({
        visible: true,
      });
    };
  
    handleOk = e => {
        if(this.state.password === "1234"){
            this.setState({
                visible : false,
              toUpload: true , 
            });
        } 
        else{
            console.log("Incorrect")}
    };
      
  
    handleCancel = e => {
      console.log(e);
      this.setState({
        visible: false,
      });
    };

    onChange = (e) =>{
        this.setState({
          password : e.target.value
        });
      }

	render () {
        return this.state.toUpload ? (<Redirect to="/upload"/>) : (
            <Header>
                <div className="logo"/><Icon type="smile"/>
                    <Menu
                    mode="horizontal"
                    defaultSelectedKeys={['3']}
                    style={{ lineHeight: '64px' }}>
                        <Menu.Item key= "1" >
                            <Link to = '/'>All</Link>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Button type='link' onClick={this.showModal}>
                            Upload
                            </Button>
                            <Modal
                            title="Input the Upload Code"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            >
                            <Input.Password placeholder="input password" onChange={this.onChange} />
                            </Modal>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <Link to = '/Request_Enroll'>Request Enrollment</Link>
                        </Menu.Item>
                    </Menu>
            </Header>
        )
    }
}

export { UploadMenu, RequestMenu };

