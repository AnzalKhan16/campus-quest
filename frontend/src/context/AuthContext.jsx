import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedToken = localStorage.getItem('token');

    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const login = async (email, password) => {
  setIsLoading(true);
  setError('');

  try {
    const response = await fetch(
      'https://campus-quest-production.up.railway.app/api/auth/login',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    let data;

    try {
      data = await response.json();
    } catch {
      data = {};
    }

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    setToken(data.token);
    setUser(data);

    localStorage.setItem('token', data.token);
    localStorage.setItem('email', data.email);

    return data;
  } catch (err) {
    setError(err.message);
    throw err;
  } finally {
    setIsLoading(false);
  }
};

  const register = async (email, password, fullName) => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(
        'https://campus-quest-production.up.railway.app/api/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            fullName,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();

      setToken(data.token);
      setUser(data);

      localStorage.setItem('token', data.token);
      localStorage.setItem('email', data.email);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem('token');
    localStorage.removeItem('email');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        error,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};