import React, { Component } from 'react';
import { List, Avatar, Icon } from 'antd';

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class ListComp extends Component {
    //제일 처음 실행
    constructor(props) {
        super(props);
    }

    //Article에 데이터 전달
    render() {
        const movie = this.props.movie;
        console.log(movie)
        return (
            <div>
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={movie}
                    footer={
                        <div>
                            아래쪽에 올 부분
                        </div>
                    }
                    renderItem={item => (
                        <List.Item
                            key={item.name}
                            actions={[
                                '이부분에 별점 넣기',
                                <IconText type="star-o" text="156" />,
                                <IconText type="like-o" text="156" />,
                                <IconText type="message" text="2" />,
                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                />
                            }
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar} />}
                                title={<a href={item.href}>{item.title}</a>}
                                description={item.name}
                            />
                            별 넣기
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default ListComp;
