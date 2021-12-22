import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';
import SearchForm from '../components/SearchForm/SearchForm';
import { toast } from 'react-toastify';
import MoviesList from '../components/MoviesList/MoviesList';
import Loader from 'react-loader-spinner';

import { createBrowserHistory } from 'history';
let history = createBrowserHistory();

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default function MoviesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  // const [error, setError] = useState(null);
  const [movies, setMovies] = useState([]);
  const [status, setStatus] = useState(Status.IDLE);
  const location = useLocation();
  let { pathname } = useLocation();
  //   let [urlSearchParams] = useSearchParams();
  // console.log([urlSearchParams])
  const handleSearchbarSubmit = searchQuery => {
    setSearchQuery(searchQuery);

    history.push({
      pathname: `${location.pathname}`,
      search: `query=${searchQuery}`,
    });
  };
  const searchViaUrl = new URLSearchParams(location.search).get('query');

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