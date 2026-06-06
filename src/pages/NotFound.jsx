import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="auth-card">
      <h1>404</h1>
      <p className="muted">The page you are looking for does not exist.</p>
      <Link className="button full" to="/">Go home</Link>
    </section>
  );
}
