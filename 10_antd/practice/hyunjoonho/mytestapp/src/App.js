import React from 'react';
import './App.css';
import { Button, Card, Tag } from 'antd';
import Sider from './Sider';

const { Meta } = Card;

function log(e) {
	console.log(e);
}

function preventDefault(e) {
	  e.preventDefault();
	  console.log('Clicked! But prevent default.');
}

function App() {
	return (
		<div className="App">
			<div className="sider">
				<Sider />
			</div>
			<div className="main-container">
				<div style={{ padding: 20 }}>
					<Button type="primary">Primary</Button>
		    			<Button>Default</Button>
		   			<Button type="dashed">Dashed</Button>
		    			<Button type="danger">Danger</Button>
		    			<Button type="link">Link</Button>
				</div>
				<div style={{ padding: 20 }}>
					<Card
			    			hoverable
			    			style={{ width: 240 }}
			    			cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
		  			>
						<Meta
					      		 title="Europe Street beat"
				     			 description="www.instagram.com"
						 />
				 	</Card>	
				</div>
				<div>
					<Tag>Europe</Tag>
		   			<Tag><a href="https://github.com/ant-design/ant-design/issues/1862">Link</a></Tag>
		    			<Tag closable onClose={log}>street</Tag>
		    			<Tag closable onClose={preventDefault}>fashion</Tag>
				</div>
			</div>
		</div>
		)
}

export default App;
