import { Link } from 'react-router-dom';

export default function MovieCard({ movie }) {
  return (
    <article className="movie-card">
      <img src={movie.image} alt={movie.title} />
      <div className="movie-card-content">
        <span className="badge">{movie.genre}</span>
        <h3>{movie.title}</h3>
        <p>{movie.description}</p>
        <div className="movie-meta">
          <span>{movie.year}</span>
          <strong>★ {movie.rating}</strong>
        </div>
        <Link to={`/movies/${movie.id}`} className="button">Детайли</Link>
      </div>
    </article>
  );
}
