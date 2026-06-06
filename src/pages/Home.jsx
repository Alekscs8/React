import MovieCard from '../components/MovieCard.jsx';
import { api } from '../services/api.js';
import { useFetch } from '../hooks/useFetch.js';

export default function Home() {
  const { data: movies, loading, error } = useFetch(api.getMovies, []);

  return (
    <>
      <section className="hero">
        <div>
          <p className="eyebrow">React проект</p>
          <h1>Открий, оцени и запази любимите си филми.</h1>
          <p>
            Проект по РЕАКТ на Александър Димитров 361ср
          </p>
        </div>
      </section>

      <section className="section-title">
        <h2>Колекция от филми</h2>
        <p></p>
      </section>

      {loading && <p className="status">Зареждане на филми...</p>}
      {error && <p className="status error">{error}</p>}
      {movies && (
        <div className="grid">
          {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
        </div>
      )}
    </>
  );
}
