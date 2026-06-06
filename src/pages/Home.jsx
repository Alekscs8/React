import MovieCard from '../components/MovieCard.jsx';
import { api } from '../services/api.js';
import { useFetch } from '../hooks/useFetch.js';

export default function Home() {
  const { data: movies, loading, error } = useFetch(api.getMovies, []);

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">React course project</p>
          <h1>Discover, review and save your favorite movies.</h1>
          <p>
            CineHub is a small REST API React application with routing, forms,
            authentication, reusable components and custom hooks.
          </p>
        </div>
      </section>

      <section className="section-title">
        <h2>Movie Collection</h2>
        <p>Dynamically rendered from the REST API database.</p>
      </section>

      {loading && <p className="status">Loading movies...</p>}
      {error && <p className="status error">{error}</p>}
      {movies && (
        <div className="grid">
          {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}
    </>
  );
}
