import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  useLocation,
  useNavigate,
  // useHistory,
  NavLink,
  Outlet,
  Routes,
  Route,
} from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';
import s from './MovieDetailsPage.module.css';
import Loader from '../components/Loader/Loader';
// import { createBrowserHistory } from 'history';

const Cast = lazy(() =>
  import('./Cast.js' /* webpackChunkName: "cast-page" */),
);
const Review = lazy(() =>
  import('./Reviews.js' /* webpackChunkName: "review-page" */),
);

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState([]);
  const location = useLocation();
  // console.log(location);
  let navigate = useNavigate();
  let { movieId } = useParams();
  //   console.log(movieId);
  const fallbackImage =
    'https://media.istockphoto.com/photos/single-dia-slide-35mm-film-snip-under-different-flash-light-settings-picture-id1323720288?b=1&k=20&m=1323720288&s=170667a&w=0&h=XCA6bix_4uuiWXqDj1_hsYMhAz_loXVFQ9jYx-F47qE=';

  useEffect(() => {
    moviesAPI.fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  const buttonHandler = () => {
    if (
      location.pathname.includes('cast') ??
      location.pathname.includes('reviews')
    ) {
      navigate(-2);
    } else if (location.pathname.includes('movie')) {
      navigate(-1);
    }
  };

  return (
    <>
      <div className={s.wrapper}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
              : fallbackImage
          }
          alt={movie.original_title}
        />
        <div className={s.description}>
          <h1>{movie.original_title}</h1>
          <p>User Score: {parseFloat(movie.vote_average) * 10}%</p>
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
      <button type="button" onClick={buttonHandler}>
        Back
      </button>
      <hr />
      <div className={s.additional_info}>
        Additional information
        <ul>
          <li className={s.additionalinfo_item}>
            <NavLink
              to="cast"
              // state={{from: location }}
              className={({ isActive }) => (isActive ? `${s.active}` : '')}
            >
              Cast
            </NavLink>
          </li>
          <li className={s.additionalinfo_item}>
            <NavLink
              to="reviews"
              // state={{from: location }}
              className={({ isActive }) => (isActive ? `${s.active}` : '')}
            >
              Review
            </NavLink>
          </li>
          <Outlet />
        </ul>
      </div>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Review />} />
        </Routes>
      </Suspense>
    </>
  );
}
