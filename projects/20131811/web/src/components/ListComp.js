import React, { Component } from 'react';
import { List, Icon, Rate } from 'antd';
import { Link } from "react-router-dom";

const IconText = ({ type, text }) => (
    <span>
        <Icon type={type} style={{ marginRight: 8 }} />
        {text}
    </span>
);

class ListComp extends Component {
    //제일 처음 실행
    /*
    constructor(props) {
        super(props);
    }
    */
    calculate = (star, people) => {
        if (people == 0) {
            return 0
        } else {
            return star / people
        }
    }
    //Article에 데이터 전달
    render() {
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
                    dataSource={this.props.movie}
                    footer={
                        <div>
                            아래쪽에 올 부분
                        </div>
                    }
                    renderItem={item => (
                        <List.Item
                            key={item.name}
                            actions={[
                                //'이부분에 총 별점과 사람수 넣기',
                                <IconText type="star-o" text={item.total_star} />,
                                //<IconText type="like-o" text="156" />,
                                <IconText type="message" text={item.people_num} />,
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
                                //avatar={<Avatar src={item.avatar} />}
                                //title={<a href={item.href}>{item.title}</a>}
                                title={<Link to={`/page/${item.id}`}>{item.name}</Link>}
                            //description={item.name}
                            />
                            <Rate disabled value={this.calculate(item.total_star, item.people_num)} />
                        </List.Item>
                    )}
                />
            </div>
        );
    }
}

export default ListComp;