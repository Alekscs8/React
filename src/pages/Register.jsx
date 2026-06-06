import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Register() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section className="auth-card">
      <h1>Регистрация</h1>
      {error && <p className="form-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={formData.name} onChange={handleChange} required minLength="2" />
        </label>
        <label>
          Email
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input name="password" type="password" value={formData.password} onChange={handleChange} required minLength="6" />
        </label>
        <button type="submit" className="button full">Create account</button>
      </form>
      <p className="muted">Имаш регистрация? <Link to="/login">Login</Link></p>
    </section>
  );
}
