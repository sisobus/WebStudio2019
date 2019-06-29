import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button, DatePicker, Card, Icon, Avatar } from 'antd';
import Sider from './Sider'

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Meta } = Card;

function onChange(date, dateString) {
  console.log(date, dateString);
}

function App() {
	return (
		<div className="App">
			<div className="sider">
				<Sider/>
			</div>
			<div className="main-container">

				<div style={{padding: 20}}>
				<RangePicker onChange={onChange}/>
				</div>

				<div style={{padding: 20}}>
				<div style={{padding: 20}}>
					<Card
						style={{ width: 300 }}
						cover={<img alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />}
						actions={[<Icon type="setting" />, <Icon type="edit" />, <Icon type="ellipsis" />]}
					>
						<Meta
							avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
							title="Card title"
							description="This is the description"
						/>
					</Card>
				</div>
				<Button type="primary">Primary</Button>
				<Button>Default</Button>
				<Button type="dashed">Dashed</Button>
				<Button type="danger">Danger</Button>
				<Button type="link">Link</Button>
				</div>
			</div>
		</div>
	)
}

export default App;
