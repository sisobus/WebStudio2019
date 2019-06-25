import React, { Component } from 'react';
import './App.css';
import Movie from './Movie'




class App extends Component{

	state = {
		greeting: 'Hello!'
	}

	componentDidMount(){
		setTimeout(() => {
			this.setState({
				movies:  [
					{
						title : "Matrix",
						poster : "https://upload.wikimedia.org/wikipedia/de/thumb/3/36/Matrixreloaded-logo.svg/1200px-Matrixreloaded-logo.svg.png"
					},
					{
						title: "Full Metal Jacket",
						poster: "https://upload.wikimedia.org/wikipedia/en/9/99/Full_Metal_Jacket_poster.jpg"
					},
					{
						title: "OldBoy",
						poster: "http://movie.phinf.naver.net/20111222_177/1324537084439rmrVk_JPEG/movie_image.jpg"
					},
					{
						title: "Star Wars",
						poster: "https://cdn3.movieweb.com/i/article/bNWjlxGFZ7Dlx8GV7F1sTvvCzctzVu/798:50/Star-Wars-9-Rumors-Traitor-Twist.jpg"
					},
					{
						title:"Trainspotting",
						poster:"https://upload.wikimedia.org/wikipedia/en/7/71/Trainspotting_ver2.jpg"
					}

				]
			})
	}, 5000)
	}

	_renderMovies = () => {
		const movies = this.state.movies.map((movie, index) => {
			return <Movie title={movie.title} poster={movie.poster} key={index}/>
		})
		return movies
	}

	render(){
		return(
			<div className="App">
				{this.state.movies ? this._renderMovies() : 'Loading'}
			</div>
		);
	}	
}
export default App;
