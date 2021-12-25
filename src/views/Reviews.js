import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';

export default function Review() {
  const { movieId } = useParams();
  const [review, setReview] = useState([]);

  useEffect(() => {
    moviesAPI.fetchMovieReviews(movieId).then(responce => {
      setReview([...responce.results]);
    });
  }, [movieId]);

  if (review.length === 0) {
    return (
      <>
        <h2>There is no review for this movie!</h2>
      </>
    );
  }
  return (
    <>
      {review && (
        <ul>
          {review.map(review => (
            <li key={review.id}>
              {/* <img
                width="45"
                src={
                    review.author_details.avatar_path
                    ? `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`
                    : notfound
                }
                alt=""
              /> */}
              <h2>{review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
