import React, { Component } from 'react';
import './App.css';
import Movie from './Movie'


class App extends Component{

	state = {}

	componentDidMount(){
	fetch('https://yts.lt/api/v2/list_movies.json?sort_by=rating')
	.then(potato => potato.json())
	.then(json => console.log(json))
	.catch(err => console.log(err))
	}

	_renderMovies = () => {
		const movies = this.state.movies.map((movie) => {
			console.log(movie)
			return <Movie 
			title={movie.title_english} 
			poster={movie.large_cover_image} 
			key={movie.id}
			genres={movie.genres}
			/>
		})
		return movies
	}

	_getMovies = async () => {

		const movies = await this._callApi()
		this.setState({
			movies
		})
	}

	_callApi = () => {
		return fetch('https://yts.lt/api/v2/list_movies.json?sort_by=rating')
		.then(potato => potato.json())
		.then(json => json.data.movies)
		.catch(err => console.log(err))
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
