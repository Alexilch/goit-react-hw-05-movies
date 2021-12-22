import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';
import MoviesList from '../components/MoviesList/MoviesList';

export default function HomePage() {
  let { pathname } = useLocation();
  pathname = '/movies';
  // console.log(pathname)
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    moviesAPI.fetchTrandings().then(responce => {
      setMovies([...responce.results]);
    });
  }, []);

  return (
    <>
      <h1>Tranding today</h1>
      <MoviesList movies={movies} pathname={pathname}></MoviesList>
    </>
  );
}
