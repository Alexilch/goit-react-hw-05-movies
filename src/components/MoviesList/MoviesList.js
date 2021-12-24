import { Link, useLocation } from 'react-router-dom';

export default function MoviesList({ movies, pathname }) {
  const location = useLocation();
  return (
    <>
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${pathname}/${movie.id}`} state={{ from: location }}>
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
