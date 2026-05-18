import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('anzal@example.com');
  const [password, setPassword] = useState('password123');
  const [error, setError] = useState('');

  const { login, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // 1. Register user first (safe if already exists)
    await fetch('https://campus-quest-production.up.railway.app/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        fullName: 'Anzal',
      }),
    });

    // 2. Then login
    await login(email, password);

    navigate('/dashboard');
  } catch (err) {
    setError('Login failed. Check backend server.');
    console.error(err);
  }
};

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎮 Campus Quest</h1>

        <h2 style={styles.subtitle}>Login to Your Account</h2>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email Address</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={styles.input}
              required
            />
          </div>

          <button type="submit" style={styles.button}>
            {isLoading ? '⏳ Logging in...' : '✨ Login'}
          </button>
        </form>

        <div style={styles.footer}>
          Don't have an account?{' '}
          <a href="/register" style={styles.link}>
            Register here
          </a>
        </div>

        <div style={styles.testCredentials}>
          <strong>Test Account:</strong>
          <br />
          Email: anzal@example.com
          <br />
          Password: password123
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '1rem',
  },

  card: {
    background: 'white',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    width: '100%',
    maxWidth: '420px',
  },

  title: {
    fontSize: '32px',
    fontWeight: 'bold',
    margin: 0,
    marginBottom: '0.5rem',
    color: '#333',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: '18px',
    color: '#666',
    margin: '0 0 1.5rem',
    textAlign: 'center',
    fontWeight: 'normal',
  },

  form: {
    marginTop: '2rem',
  },

  formGroup: {
    marginBottom: '1.5rem',
  },

  label: {
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    marginBottom: '0.5rem',
    color: '#333',
  },

  input: {
    width: '100%',
    padding: '12px 14px',
    fontSize: '14px',
    border: '2px solid #ddd',
    borderRadius: '8px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    outline: 'none',
  },

  button: {
    width: '100%',
    padding: '14px',
    fontSize: '16px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginTop: '1.5rem',
    transition: 'transform 0.2s',
  },

  error: {
    background: '#fee',
    color: '#c33',
    padding: '12px 14px',
    borderRadius: '8px',
    marginBottom: '1rem',
    fontSize: '14px',
    border: '1px solid #fcc',
  },

  footer: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '14px',
    color: '#666',
  },

  link: {
    color: '#667eea',
    textDecoration: 'none',
    fontWeight: 'bold',
  },

  testCredentials: {
    marginTop: '1.5rem',
    padding: '1rem',
    background: '#f5f5f5',
    borderRadius: '8px',
    fontSize: '13px',
  },
};