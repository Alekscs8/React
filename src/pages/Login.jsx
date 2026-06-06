import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(formData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="auth-card">
      <h1>Login</h1>
      <p className="muted">Demo account: demo@demo.com / 123456</p>
      {error && <p className="form-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={formData.password} onChange={handleChange} required minLength="6" />
        </label>
        <button type="submit" className="button full">Login</button>
      </form>
      <p className="muted">No profile yet? <Link to="/register">Create account</Link></p>
    </section>
  );
}
