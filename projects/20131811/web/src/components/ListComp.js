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
        if (people === 0) {
            return 0
        } else {
            return star / people
        }
    }

    getUrl = (filename) => {
        return 'http://localhost:5000/api/download?filename=' + filename;
    }

    //Article에 데이터 전달
    render() {
        return (
            <div >
                <List 
                    itemLayout="horizontal"
                    size="large"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={this.props.movie}
                    /*
                    footer={
                        <div>
                            아래쪽에 올 부분
                        </div>
                    }
                    */
                    renderItem={item => (
                        <List.Item
                            key={item.name}
                            actions={[
                                <br/>
                                //<IconText type="message" text={item.people_num} />
                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src = {this.getUrl(item.photo)}
                                />
                            }
                        >
                            <List.Item.Meta 
                                //avatar={<Avatar src={item.avatar} />}
                                //title={<a href={item.href}>{item.title}</a>}
                                title={<Link  to={`/page/${item.id}`}>{item.name}</Link>}
                            //description={item.name}
                            />
                            <Rate disabled value={this.calculate(item.total_star, item.people_num)} />
                        </List.Item>
                    )}
                />
                <br/>
                <br/>
            </div>
        );
    }
}

export default ListComp;