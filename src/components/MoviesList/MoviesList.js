import { Link, useLocation } from 'react-router-dom';
import slugify from 'slugify';

const toSlug = string =>
  slugify(string, { lower: true, remove: /[?$*_+~,.'"!\-:@]/ });

export default function MoviesList({ movies, pathname }) {
  const location = useLocation();
  return (
    <>
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={`${pathname}/${toSlug(`${movie.title}${movie.id}`)}`}
                state={{ from: location }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
