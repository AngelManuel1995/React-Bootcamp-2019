import React from 'react';
import moviesData from '../data/movies.json'
import MovieCard from '../components/MovieCard'
import MovieForm from '../components/MovieForm'
import axios from 'axios'
const API_KEY = 'dec367031ee9ef5cc3b22f155df2646d'


class Home extends React.Component {
  state = {
   ...moviesData,
  }

  deleteMovie = (movieId) => {
    this.setState((state, props) => {
      const movies = state.movies.filter((movie) => movie.id !== movieId)
      return  {
        movies
      }
    })
  }

  searchMovies = (text) => {
    const query = `https://api.themoviedb.org/3/search/movie?api_key=dec367031ee9ef5cc3b22f155df2646d&language=en-US&query=${text}&page=1&include_adult=false`
    axios.get(query).then(data => {
       return axios.get(`https://api.themoviedb.org/3/movie/${data.data.results[0].id}?api_key=dec367031ee9ef5cc3b22f155df2646d&language=en-US`)
    }).then(movie => {
      const movies = [movie.data]
      this.setState({movies: movies})
    })
  }

  addMovie = (movie) => {
    // console.log(movie)
    const movies = this.state.movies
    movies.push(movie)
    this.setState({ movies })
  }

  //La mejor parte para hacer las peticiones
  componentDidMount(){
    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
    .then((res) => res.json())
    .then(data => {
      // console.log(data.results)
      this.setState(() => { 
        return this.state.movies = { movies : data.results.slice(5) }
      })
    })
  }


  render() {
        const { movies } = this.state
        return <div>
        <h1 className='main-title'>Movie App</h1>
        { /* <MovieForm onSubmit = {this.addMovie} /> */ }
        <Searcher searchMovies = {this.searchMovies}/>
        <div className='content'>
          {movies.map((movie) => <MovieCard deleteMovie={this.deleteMovie} key={movie.id} {...movie} />)}
        </div>
      </div>
    }
}

class Searcher extends React.Component {

  handleSearch = (e) => {
    e.preventDefault()

    this.props.searchMovies(e.target.elements.textSearch.value)

  }

  render(){
    return (
      <div className="container">
      
          <form onSubmit={this.handleSearch} className="col-md-12">
            <div className="row">
              <div className="col-md-10">
                <input className="form-control" name="textSearch" type="text" placeholder="Ingrese un nombre de película"/>
              </div>
              <div className="col-md-2">
                <input type="submit" className="btn btn-danger" value="Search"/> 
              </div>
              </div>
          </form>
      </div>
    ); 
  }
}

export default Home