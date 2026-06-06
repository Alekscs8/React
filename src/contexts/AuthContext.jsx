import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { api } from '../services/api.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('cinehub-user');
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const login = async ({ email, password }) => {
    const existingUser = await api.findUserByEmail(email);
    if (!existingUser || existingUser.password !== password) {
      throw new Error('Invalid email or password');
    }

    const safeUser = {
      id: existingUser.id,
      name: existingUser.name,
      email: existingUser.email,
    };
    localStorage.setItem('cinehub-user', JSON.stringify(safeUser));
    setUser(safeUser);
    return safeUser;
  };

  const register = async ({ name, email, password }) => {
    const existingUser = await api.findUserByEmail(email);
    if (existingUser) throw new Error('User with this email already exists');

    const createdUser = await api.createUser({
      id: crypto.randomUUID(),
      name,
      email,
      password,
    });

    const safeUser = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
    };
    localStorage.setItem('cinehub-user', JSON.stringify(safeUser));
    setUser(safeUser);
    return safeUser;
  };

  const logout = () => {
    localStorage.removeItem('cinehub-user');
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, register, logout, isAuthenticated: Boolean(user) }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
