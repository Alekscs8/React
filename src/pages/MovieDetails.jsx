import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { api } from '../services/api.js';
import { useFetch } from '../hooks/useFetch.js';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function MovieDetails() {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { data: movie, loading, error } = useFetch(() => api.getMovie(id), [id]);
  const { data: reviews, setData: setReviews } = useFetch(() => api.getReviewsByMovie(id), [id]);
  const [reviewForm, setReviewForm] = useState({ comment: '', score: 10 });
  const [formError, setFormError] = useState('');

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!reviewForm.comment.trim()) {
      setFormError('Please write a short comment.');
      return;
    }

    const newReview = await api.createReview({
      id: crypto.randomUUID(),
      movieId: id,
      userEmail: user.email,
      comment: reviewForm.comment,
      score: Number(reviewForm.score),
    });

    setReviews([...(reviews || []), newReview]);
    setReviewForm({ comment: '', score: 10 });
  };

  if (loading) return <p className="status">Loading movie...</p>;
  if (error) return <p className="status error">Movie not found.</p>;
  if (!movie) return null;

  return (
    <section className="details-layout">
      <img className="details-image" src={movie.image} alt={movie.title} />
      <div className="details-content">
        <Link to="/" className="back-link">← Върни се към филмите</Link>
        <span className="badge">{movie.genre}</span>
        <h1>{movie.title}</h1>
        <p className="muted">{movie.year} · Rating: ★ {movie.rating}</p>
        <p>{movie.description}</p>

        <div className="reviews-box">
          <h2>Reviews</h2>
          {reviews?.length ? reviews.map((review) => (
            <article key={review.id} className="review">
              <strong>{review.userEmail}</strong>
              <span>Score: {review.score}/10</span>
              <p>{review.comment}</p>
            </article>
          )) : <p className="muted">No reviews yet.</p>}

          {isAuthenticated ? (
            <form onSubmit={handleReviewSubmit} className="review-form">
              {formError && <p className="form-error">{formError}</p>}
              <label>
                Comment
                <textarea value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} />
              </label>
              <label>
                Score
                <input type="number" min="1" max="10" value={reviewForm.score} onChange={(e) => setReviewForm({ ...reviewForm, score: e.target.value })} />
              </label>
              <button className="button" type="submit">Add review</button>
            </form>
          ) : (
            <p className="muted"><Link to="/login">Login</Link> to add a review.</p>
          )}
        </div>
      </div>
    </section>
  );
}
