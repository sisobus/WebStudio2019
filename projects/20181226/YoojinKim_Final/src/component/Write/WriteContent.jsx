import React from 'react';
import { Form, Input, Tooltip, Icon, Button } from 'antd';
import './WriteContent.css'

const { TextArea } = Input;


class WriteContent extends React.Component{
	createArticle(data) {
		console.log('create Interview')
		fetch('http://localhost:5000/api/articles', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json'},
			// body: JSON.stringify({
			// 				user: 5,
			// 				password: 1234 ,
			// 				title: 'testtttt',
			// 				text: '????'
			// 			})
			body: JSON.stringify(data),
		}).then(response => {
			console.log(response)
		}).catch(error => {
			console.log(error)
		})
		fetch('http://localhost:5000/api/articles', {
			method: 'GET',
			headers: { 'Content-Type': 'application/json'},
		}).then(response => {
			console.log(response.json())
		}).catch(error => {
			console.log(error)
		})
	}

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.createArticle(values)
      }
    });
  };

  render(){
    const { getFieldDecorator } = this.props.form;
    return(
  <div className="write-container">
	  <Form onSubmit={this.handleSubmit}>
	        <Form.Item label="user">
	          {getFieldDecorator('user', {
	            rules: [
	              {
	                required: true,
	                message: 'Please input user name!',
	              },
	            ],
	          })(<Input
				  className = "user"
				    placeholder="user"
				    prefix={
				    	<Icon 
				    	type="user" 
				    	style={{ color: 'rgba(0,0,0,.25)' }} 
				    	/>
				    }
				    suffix={
				      <Tooltip title="Extra information">
				        <Icon 
				        type="info-circle" 
				        style={{ color: 'rgba(0,0,0,.45)' }} 
				        />
				      </Tooltip>
				   	}
				  />)}
	        </Form.Item>
	        <Form.Item label="password">
	          {getFieldDecorator('password', {
	            rules: [
	              {
	                required: true,
	                message: 'Please input password!',
	              },
	            ],
	          })(<Input.Password 
				  className = "password"
				  placeholder="input password" />)}
	        </Form.Item>
	        <Form.Item label="title">
	          {getFieldDecorator('title', {
	            rules: [
	              {
	                required: true,
	                message: 'Please input <Interview> title!',
	              },
	            ],
	          })(<TextArea
		    className="title"
		      placeholder="write title"
		      autosize={{ minRows: 1 , maxRows: 1}}
		      />)}
	        </Form.Item>
			{/* <Form.Item label="thumbnail">
	          {getFieldDecorator('thumbnail', {
	            rules: [
	              {
	                required: true,
	                message: 'Please input <Interview> thumbnail!',
	              },
	            ],
	          })(<TextArea
		    className="thumbnail"
		      placeholder="write thumbnail"
		      autosize={{ minRows: 1 , maxRows: 1}}
		      />)}
	        </Form.Item> */}
	        <Form.Item label="text">
	          {getFieldDecorator('text', {
	            rules: [
	              {
	                required: true,
	                message: 'Please input <Interview> text!',
	              },
	            ],
	          })( <TextArea
			    className="text"
			      placeholder="write text"
			      autosize={{ minRows: 10 }}
			    />)}
	        </Form.Item>
	        <Button type="primary" htmlType="submit" className="login-form-button">Create</Button>
	  </Form>
</div>
);
 }
}

const WrapperForm = Form.create({ name: 'normal_login' })(WriteContent);

export default WrapperForm