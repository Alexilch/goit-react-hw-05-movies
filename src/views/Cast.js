import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';
import notfound from '../images/notfound.png';
import s from './Cast.module.css';

export default function Cast() {
  let { movieId } = useParams();
  // console.log(movieId);
  const [cast, setCast] = useState([]);

  useEffect(() => {
    moviesAPI.fetchMovieCredits(movieId).then(responce => {
      setCast([...responce.cast]);
    });
  }, [movieId]);
  // console.log(cast)
  return (
    <>
      {cast && (
        <ul className={s.castlist}>
          {cast.map(cast => (
            <li key={cast.id}>
              <img
                src={
                  cast.profile_path
                    ? `https://image.tmdb.org/t/p/w185${cast.profile_path}`
                    : notfound
                }
                alt={cast.name}
              />
              <p>{cast.name}</p>
              <p>Character: {cast.character}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
