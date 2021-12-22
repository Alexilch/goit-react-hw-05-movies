// import './App.css';
import { Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';
import HomePage from './components/HomePage/HomePage';
import MoviesPage from './components/MoviesPage/MoviesPage';
import MovieDetailsPage from './views/MovieDetailsPage';

function App() {
  return (
    <Container>
      <AppBar />
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />} />

        {/* </Route> */}
      </Routes>
    </Container>
  );
}

export default App;
