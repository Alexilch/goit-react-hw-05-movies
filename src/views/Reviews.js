import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as moviesAPI from '../services/movie-api';
import notfound from '../images/notfound.png';

export default function Review() {
  let { movieId } = useParams();
  // console.log(movieId);
  const [review, setReview] = useState([]);

  useEffect(() => {
    moviesAPI.fetchMovieReviews(movieId).then(responce => {
      setReview([...responce.results]);
    });
  }, [movieId]);
  // console.log(review)
  return (
    <>
      {review && (
        <ul>
          {review.map(review => (
            <li key={review.id}>
              <img
                width="45"
                src={
                  review.author_details.avatar_path
                    ? `https://image.tmdb.org/t/p/w45${review.author_details.avatar_path}`
                    : notfound
                }
                alt=""
              />
              <h2>{review.author}</h2>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
