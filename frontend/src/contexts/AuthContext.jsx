import { createContext, useContext, useState, useEffect } from 'react';
import api from '../lib/axios';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await api.get('/me');
          setUser(data);
        } catch (error) {
          console.error('Failed to load user', error);
          localStorage.removeItem('token');
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (identifier, password) => {
    const { data } = await api.post('/login', { identifier, password });
    if (data.requires_2fa) {
      return data; // Returns requires_2fa, email, dev_2fa_code
    }
    localStorage.setItem('token', data.access_token);
    setUser(data.user);
    return data;
  };

  const verify2FA = async (email, code) => {
    const { data } = await api.post('/login/verify-2fa', { email, code });
    localStorage.setItem('token', data.access_token);
    setUser(data.user);
    return data;
  };

  const register = async (userData) => {
    const { data } = await api.post('/register', userData);
    return data; // Returns message and dev_verification_code, no token yet
  };

  const verifyAccount = async (email, code) => {
    const { data } = await api.post('/verify-email', { email, code });
    localStorage.setItem('token', data.access_token);
    setUser(data.user);
    return data.user;
  };

  const forgotPassword = async (email) => {
    const { data } = await api.post('/forgot-password', { email });
    return data;
  };

  const resetPassword = async (token, email, password, password_confirmation) => {
    const { data } = await api.post('/reset-password', { token, email, password, password_confirmation });
    return data;
  };

  const logout = async () => {
    try {
      await api.post('/logout');
    } catch (e) {
      console.error(e);
    }
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, verify2FA, register, verifyAccount, forgotPassword, resetPassword, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// Force Vite HMR reload
