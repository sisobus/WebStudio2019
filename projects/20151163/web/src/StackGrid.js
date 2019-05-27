import React, { Component } from 'react';
import StackGrid from "react-stack-grid";
import './App.css';

class MyComponent extends Component {
	
	render() {
	  return (
		<StackGrid
		  columnWidth={150}
		>
			<div className="picture-blocks">
				<div className="item">
					<img src="/images/IMG_4801.JPG" alt="A Smiling Baby" height= "300px" ></img>
				</div>
				
				<div className="item">
					<img src="/images/IMG_4802.JPG" alt="A Smiling Kid" height="300px"></img>
				</div>
				
				<div className="item">
					<img src="/images/IMG_4803.JPG" alt="A Smiling Kid" height="300px"></img>
				</div>
			</div>
		</StackGrid>
	  );
	}
  }

export default MyComponent;
