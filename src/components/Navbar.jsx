import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <Link to="/" className="brand">CineHub</Link>
      <nav>
        <NavLink to="/">Home</NavLink>
        {isAuthenticated && <NavLink to="/add">Add Movie</NavLink>}
        {!isAuthenticated && <NavLink to="/login">Login</NavLink>}
        {!isAuthenticated && <NavLink to="/register">Register</NavLink>}
        {isAuthenticated && <span className="user-chip">Hi, {user.name}</span>}
        {isAuthenticated && <button onClick={handleLogout} className="link-button">Logout</button>}
      </nav>
    </header>
  );
}
