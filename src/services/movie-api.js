const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = '27301790c14c0a2d76e2a6b9dabbd03b';

async function fetchMovies(url = '', config = {}) {
  const response = await fetch(url, config);
  return response.ok
    ? await response.json()
    : Promise.reject(new Error('Not found'));
}

export function fetchTrandings() {
  return fetchMovies(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`);
}

export function fetchMovieById(movieId) {
  return fetchMovies(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMovieCredits(movieId) {
  return fetchMovies(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
}

export function fetchMovieReviews(movieId) {
  return fetchMovies(
    `${BASE_URL}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US`,
  );
}
