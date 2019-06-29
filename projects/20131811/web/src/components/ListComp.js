import React, { Component } from 'react';
import { List, Rate } from 'antd';
import { Link } from "react-router-dom";

class ListComp extends Component {
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
                    renderItem={item => (
                        <List.Item
                            key={item.name}
                            actions={[
                                <br/>
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
                                title={<Link  to={`/page/${item.id}`}>{item.name}</Link>}
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