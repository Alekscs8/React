const BASE_URL = 'http://localhost:3001';

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error('Request failed');
  }

  return response.json();
}

export const api = {
  getMovies: () => request('/movies'),
  getMovie: (id) => request(`/movies/${id}`),
  createMovie: (movie) => request('/movies', {
    method: 'POST',
    body: JSON.stringify(movie),
  }),
  getReviewsByMovie: (movieId) => request(`/reviews?movieId=${movieId}`),
  createReview: (review) => request('/reviews', {
    method: 'POST',
    body: JSON.stringify(review),
  }),
  findUserByEmail: async (email) => {
    const users = await request(`/users?email=${encodeURIComponent(email)}`);
    return users[0];
  },
  createUser: (user) => request('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  }),
};
