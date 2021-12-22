import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';
import SearchForm from '../components/SearchForm/SearchForm';
import { toast } from 'react-toastify';
import MoviesList from '../components/MoviesList/MoviesList';
import Loader from 'react-loader-spinner';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  // const [error, setError] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const location = useLocation();
  let navigate = useNavigate();

  const handleSearchbarSubmit = searchQuery => {
    setSearchQuery(searchQuery);
    // console.log({location})
    navigate({
      pathname: `${location.pathname}`,
      search: `${searchQuery}`,
    });
  };
  let { pathname } = useLocation();
  // console.log(pathname)
  const searchViaUrl = new URLSearchParams(location.search).get('search');

  useEffect(() => {
    setSearchQuery(searchViaUrl);
  }, [searchViaUrl]);

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setStatus(Status.PENDING);
    moviesAPI
      .fetchMovieByQuery(searchQuery)
      .then(responce => {
        // console.log(responce.results.length)
        if (responce.results.length === 0) {
          setStatus(Status.REJECTED);
          return;
        }
        setMovies([...responce.results]);
        setStatus(Status.RESOLVED);
      })
      .catch(error => {
        // setError(error);
        setStatus(Status.REJECTED);
      });
  }, [searchQuery]);

  if (status === Status.IDLE) {
    return <SearchForm onSubmit={handleSearchbarSubmit} />;
  }
  if (status === Status.PENDING) {
    return <Loader />;
  }
  if (status === Status.REJECTED) {
    return (
      toast.error(`Results for: ${searchQuery} not found.`, {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }),
      (
        <>
          <SearchForm onSubmit={handleSearchbarSubmit} />
        </>
      )
    );
  }
  if (status === Status.RESOLVED) {
    return (
      <>
        <SearchForm onSubmit={handleSearchbarSubmit} />
        <MoviesList movies={movies} pathname={pathname}></MoviesList>
      </>
    );
  }
}
