import React, { Component } from 'react';
import StackGrid from "react-stack-grid";
import './App.css';

class MyComponent extends Component {
	
	render() {
	  return (
		<StackGrid
		  columnWidth={150}
		>
			<div className="Wall">
				<span className='PictureBlock'>
					<figure className="image">
						<div className='img'>
							<img src="/images/IMG_4801.JPG" alt="A Smiling Baby" height= "300px" ></img>
						</div>
					</figure>
				</span>
				<span className='PictureBlock'>
					<figure className="image">
						<div className='img'>
							<img src="/images/IMG_4802.JPG" alt="A Smiling Baby" height= "300px" ></img>
						</div>
					</figure>
				</span>
				<span className='PictureBlock'>
					<figure className="image">
						<div className='img'>
							<img src="/images/IMG_4803.JPG" alt="A Smiling Baby" height= "300px" ></img>
						</div>
					</figure>
				</span>
				<span className='PictureBlock'>
					<figure className="image">
						<div className='img'>
							<img src="/images/IMG_4804.JPG" alt="A Smiling Baby" height= "300px" ></img>
						</div>
					</figure>
				</span>
			</div>	
		</StackGrid>
	  );
	}
  }

export default MyComponent;
