import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import * as moviesAPI from '../../services/movie-api';

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

      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${pathname}/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
