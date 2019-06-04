import React, { Component, history } from 'react';
import { Redirect } from "react-router-dom";


import { Button, Modal, Form, Input, Rate } from 'antd';

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
    // eslint-disable-next-line
    class extends Component {

        onSubmit = e => {
            console.log(2)
            const content=e.content;
            const star=e.star;
            console.log(content)
            console.log(star)
            return (
                <div>
                    <Redirect to='/movielist/date'/>
                </div>
            )
            
        }
        render() {
            const { visible, onCancel, onCreate, form } = this.props;
            const { getFieldDecorator } = form;
            return (
                <Modal
                    visible={visible}
                    title="새로운 리뷰 등록하기"
                    okText="Create"
                    onCancel={onCancel}
                    onOk={this.onSubmit}
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
                            }) (<Rate allowHalf Value={0} />)
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
        visible: false,
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
            form.resetFields();
            this.setState({ visible: false });
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
