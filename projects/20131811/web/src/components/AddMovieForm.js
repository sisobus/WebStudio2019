import React, { Component } from 'react';
import { Form, Select, Input, Button, Upload, message, Icon } from 'antd';
import { history } from './history'

class AddMovieForm extends Component {

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                const jsons = {
                    'name': values.title,
                    'photo': values.image
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
                        history.push('/page/'+rsp)
                    }
                    )

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
        return (
            <div>
                <div>
                    something
                </div>
                <div>
                    <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }} onSubmit={this.handleSubmit}>
                        <Form.Item label="Title">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input your note!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Image URL">
                            {getFieldDecorator('image', {
                                rules: [{ required: true, message: 'Please select your gender!' }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 12, offset: 5 }}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        )
    }
}


export default Form.create()(AddMovieForm);
