import { Link } from 'react-router-dom';

export default function MoviesList({ movies, pathname }) {
  return (
    <>
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
