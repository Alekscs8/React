import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';

const initialState = {
  title: '',
  genre: '',
  year: new Date().getFullYear(),
  rating: 8,
  description: '',
  image: '',
};

export default function AddMovie() {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.image.startsWith('http')) {
      setError('Image must be a valid URL.');
      return;
    }

    const createdMovie = await api.createMovie({
      ...formData,
      id: crypto.randomUUID(),
      year: Number(formData.year),
      rating: Number(formData.rating),
    });

    navigate(`/movies/${createdMovie.id}`);
  };

  return (
    <section className="auth-card wide">
      <h1>Add new movie</h1>
      <p className="muted">This form sends a POST request to the REST API.</p>
      {error && <p className="form-error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Title<input name="title" value={formData.title} onChange={handleChange} required /></label>
        <label>Genre<input name="genre" value={formData.genre} onChange={handleChange} required /></label>
        <label>Year<input name="year" type="number" value={formData.year} onChange={handleChange} required /></label>
        <label>Rating<input name="rating" type="number" min="1" max="10" step="0.1" value={formData.rating} onChange={handleChange} required /></label>
        <label>Description<textarea name="description" value={formData.description} onChange={handleChange} required /></label>
        <label>Image URL<input name="image" value={formData.image} onChange={handleChange} required /></label>
        <button type="submit" className="button full">Save movie</button>
      </form>
    </section>
  );
}
