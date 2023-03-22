import React, {useState} from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies,setMovies] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error,setError] = useState(null);
  // function fetchMovieHandler() {
  //   fetch('https://swapi.dev/api/films')
  //   .then((response) => {
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log(data.results);
  //     const trasformeredMovies = data.results.map( (movieData) => {
  //       return {
  //         id : movieData.episode_id,
  //         title : movieData.title,
  //         openingText : movieData.opening_crawl,
  //         releaseDate : movieData.release_date,
  //       };
  //     });
  //     setMovies(trasformeredMovies);
  //   });
  // }
  async function fetchMovieHandler() {
    setIsLoading(true);
    setError(null);
    try{
      const response = await fetch('https://swapi.dev/api/film')
      const data = await response.json();

      if(!response.ok){
        throw new Error('Something Went Wrong');
      }
      const trasformeredMovies = data.results.map( (movieData) => {
        return {
          id : movieData.episode_id,
          title : movieData.title,
          openingText : movieData.opening_crawl,
          releaseDate : movieData.release_date,
        };
      });
      setMovies(trasformeredMovies);
    }
    catch(error){
      setError(error.message);
    }
    setIsLoading(false);
  }
  // const dummyMovies = [
  //   {
  //     id: 1,
  //     title: 'Some Dummy Movie',
  //     openingText: 'This is the opening text of the movie',
  //     releaseDate: '2021-05-18',
  //   },
  //   {
  //     id: 2,
  //     title: 'Some Dummy Movie 2',
  //     openingText: 'This is the second opening text of the movie',
  //     releaseDate: '2021-05-19',
  //   },
  // ];

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMovieHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} /> }
        {!isLoading && movies.length === 0 && <p>Found No Movie</p> }
        {!isLoading && error && <p>{error}</p>}
        {isLoading && <p>Loading..</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
