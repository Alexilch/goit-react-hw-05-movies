// import './App.css';
import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';

// import HomePage from './views/HomePage';
// import MoviesPage from './views/MoviesPage';
// import MovieDetailsPage from './views/MovieDetailsPage';
// import Cast from './views/Cast';
// import Review from './views/Reviews';
import { ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from './components/Loader/Loader';

const HomePage = lazy(() =>
  import('./views/HomePage.js' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('./views/MoviesPage.js' /* webpackChunkName: "movies-page" */),
);
const MovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage.js' /* webpackChunkName: "movies-detail-page" */
  ),
);
// const Cast = lazy(() =>
//   import('./views/Cast.js' /* webpackChunkName: "cast-page" */),
// );
// const Review = lazy(() =>
//   import('./views/Reviews.js' /* webpackChunkName: "review-page" */),
// );

function App() {
  return (
    <Container>
      <AppBar />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies/*" element={<MoviesPage />} />
          <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} />
          {/* <Route path="/movies/:movieId/cast" element={<Cast />} />
                <Route path="/movies/:movieId/reviews" element={<Review />} /> */}
          {/* </Route> */}
        </Routes>
      </Suspense>
      <ToastContainer transition={Slide} />
    </Container>
  );
}

export default App;
