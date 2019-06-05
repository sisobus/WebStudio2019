import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { history } from './history'

import { Button, Modal, Form, Input, Rate } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends Component {
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="새로운 리뷰 등록하기"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={onCreate}
                >
                    <Form layout="vertical">
                        <Form.Item label="Review">
                            {getFieldDecorator('review', {
                                rules: [{ required: true, message: 'Please input the review of collection!' }],
                            })(<Input />)}
                        </Form.Item>
                        <Form.Item label="Star">
                            {getFieldDecorator('star', {
                                rules: []
                            })(<Rate allowHalf Value={0} />)
                            }
                        </Form.Item>

                    </Form>
                </Modal>
            );
        }
    },
);

class ReviewForm extends Component {
    state = {
        visible: false
    };

    showModal = () => {
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);
            const content = values.review
            const star = values.star == undefined ? 0 : values.star
            //임시 유저아이디
            const user_id = 56
            const movie_id = this.props.movie_id
            const jsons = {
                'content': content,
                'star': star,
                'user_id': user_id,
                'movie_id': movie_id
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(jsons)
            }
            fetch('http://localhost:5000/api/reviews', requestOptions)
                .then(response => response.json())
                .then(rsp => console.log(rsp))
                .then(() => {
                    this.setState({ visible: false });
                    form.resetFields();
                    this.props.callbackFromParent();
                })
        });
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    New Review
        </Button>
                <CollectionCreateForm
                    wrappedComponentRef={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}
export default ReviewForm;
