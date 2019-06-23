import React, { Component } from 'react';
import './App.css';
import Movie from './Movie'

const movie = [
	 {
	title : "Matrix",
	poster : "https://upload.wikimedia.org/wikipedia/de/thumb/3/36/Matrixreloaded-logo.svg/1200px-Matrixreloaded-logo.svg.png"
	},{
	title: "Fukll Mea",
	poster: "https://upload.wikimedia.org/wikipedia/en/9/99/Full_Metal_Jacket_poster.jpg"
	},{
	title: "OldBoy",
	poster: "http://movie.phinf.naver.net/20111222_177/1324537084439rmrVk_JPEG/movie_image.jpg"
	},{
	title: "Star Wars",
	poster: "https://cdn3.movieweb.com/i/article/bNWjlxGFZ7Dlx8GV7F1sTvvCzctzVu/798:50/Star-Wars-9-Rumors-Traitor-Twist.jpg"
	}
]


class App extends Component{
	render(){
		return(
			<div className="App">
				{movie.map(movie, index  => {
					return <Movie title={movie.title} poster={movie.poster} key={index}/>
				})}
			</div>
		);
	}	
}
export default App;
