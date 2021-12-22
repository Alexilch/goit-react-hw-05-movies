import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';
// import genresObj from '../db/genres.json'
import s from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  let { movieId } = useParams();
  console.log(movieId);

  const [movie, setMovie] = useState([]);

  useEffect(() => {
    moviesAPI.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      <div className={s.wrapper}>
        <img
          src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
          alt={movie.original_title}
        />
        <div className={s.description}>
          <h1>{movie.original_title}</h1>
          <p>User Score: {movie.popularity}</p>

          <h2>Overview</h2>
          <p>{movie.overview}</p>

          <h3>Genres</h3>

          {movie.genres && (
            <ul>
              {movie.genres.map(genre => (
                <li key={genre.id}>{genre.name}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={s.additional_info}>Additional information</div>
    </>
  );
}
