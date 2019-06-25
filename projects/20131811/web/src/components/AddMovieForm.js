import React, { Component } from 'react';
import { Form, Input, Button, Upload, message, Icon } from 'antd';
import { history } from './history'

class AddMovieForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                const data = new FormData();
                data.append('file', values.image.file.originFileObj)
                data.append('filename', values.title)
                const filename = values.image.file.name

                fetch('http://localhost:5000/api/upload', {
                    method: 'POST',
                    body: data
                }).then(response => {
                        const jsons = {
                            'name': values.title,
                            'photo': filename
                        }
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(jsons)
                        }
                        fetch('http://localhost:5000/api/movies', requestOptions)
                            .then(response => response.json())
                            .then(rsp => {
                                console.log(rsp)
                                history.push('/page/' + rsp)
                            }
                            )

                    })
                /*
                                const jsons = {
                                    'name': values.title,
                                    'photo': values.image.file
                                }
                                const requestOptions = {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(jsons)
                                }
                                fetch('http://localhost:5000/api/movies', requestOptions)
                                    .then(response => response.json())
                                    .then(rsp => {
                                        console.log(rsp)
                                        history.push('/page/' + rsp)
                                    }
                                    )
                */
            }
        });
    };

    handleSelectChange = value => {
        console.log(value);
        this.props.form.setFieldsValue({
            note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
    };
    render() {

        const { getFieldDecorator } = this.props.form;


        const props = {
            name: 'file',
            action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            headers: {
                authorization: 'authorization-text',
            },
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    message.success(`${info.file.name} file uploaded successfully`);
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            },
        };

        return (
            <div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                    
                <div>
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                        <Form.Item label="Title">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input title!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Image">
                            {getFieldDecorator('image', {
                                rules: [{ required: true, message: 'Please select image file!' }],
                            })(
                                //<Input />
                                <Upload {...props}>
                                    <Button>
                                        <Icon type="upload" /> Click to Upload
                                    </Button>
                                </Upload>
                            )}
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
            </div>
        )
    }
}


export default Form.create()(AddMovieForm);
