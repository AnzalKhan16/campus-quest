import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axiosConfig';

export default function DashboardPage() {
  const navigate = useNavigate();
  const { token, logout } = useContext(AuthContext);

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) return;

    const fetchProfile = async () => {
      try {
        const response = await api.get('/api/users/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div style={styles.loadingText}>
        Loading your profile...
      </div>
    );
  }

  if (error || !user) {
    return (
      <div style={styles.errorText}>
        <p>{error || 'Failed to load profile'}</p>

        <button onClick={logout} style={styles.logoutButton}>
          Logout
        </button>
      </div>
    );
  }

  const xpProgress = (user.currentLevelXP / 1000) * 100;
  const xpNeeded = 1000 - user.currentLevelXP;

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <Navbar />
      <nav style={styles.navbar}>
        <h1 style={styles.navTitle}>🎮 Campus Quest</h1>

        <div style={styles.navRight}>
          <span style={styles.userName}>
            {user.fullName}
          </span>

          <button onClick={logout} style={styles.logoutButton}>
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main style={styles.content}>
        {/* Welcome Section */}
        <h2 style={styles.welcome}>
          Welcome back, {user.fullName}! 👋
        </h2>

        {/* Stats Grid */}
        <div style={styles.grid}>
          {/* Level Card */}
          <div style={styles.card}>
            <div style={styles.cardLabel}>Level</div>

            <div style={styles.cardValue}>
              {user.level}
            </div>

            <div style={styles.cardSubtext}>
              Keep grinding!
            </div>
          </div>

          {/* Total XP Card */}
          <div style={styles.card}>
            <div style={styles.cardLabel}>Total XP</div>

            <div style={styles.cardValue}>
              {user.totalXP.toLocaleString()}
            </div>

            <div style={styles.cardSubtext}>
              Experience earned
            </div>
          </div>

          {/* Streak Card */}
          <div style={styles.card}>
            <div style={styles.cardLabel}>
              Daily Streak 🔥
            </div>

            <div style={styles.cardValue}>
              {user.dailyStreak}
            </div>

            <div style={styles.cardSubtext}>
              days
            </div>
          </div>

          {/* Badges Card */}
          <div style={styles.card}>
            <div style={styles.cardLabel}>Badges</div>

            <div style={styles.cardValue}>
              {user.badges}
            </div>

            <div style={styles.cardSubtext}>
              Achievements
            </div>
          </div>
        </div>

        {/* XP Progress Section */}
        <section style={styles.progressSection}>
          <div style={styles.progressHeader}>
            <span>
              Progress to Level {user.level + 1}
            </span>

            <span style={styles.progressXp}>
              {user.currentLevelXP} / 1000 XP
            </span>
          </div>

          <div style={styles.progressBar}>
            <div
              style={{
                ...styles.progressFill,
                width: `${xpProgress}%`,
              }}
            />
          </div>

          <div style={styles.progressText}>
            {xpNeeded} XP to next level
          </div>
        </section>

        {/* Quick Actions */}
        <section style={styles.actionsSection}>
          <h3 style={styles.actionsTitle}>
            Quick Actions
          </h3>

          <div style={styles.actionsGrid}>
           <button
  onClick={() => navigate('/courses')}
  style={styles.actionButton}
>
  📚 Browse Courses
</button>

           <button
  onClick={() => navigate('/leaderboard')}
  style={styles.actionButton}
>
  🏆 View Leaderboard
</button>

           <button
  onClick={() => navigate('/profile')}
  style={styles.actionButton}
>
  👤 View Profile
</button>

            <button
  onClick={() => navigate('/settings')}
  style={styles.actionButton}
>
  ⚙️ Settings
</button>
          </div>
        </section>
      </main>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f7fa',
  },

  navbar: {
    background: 'white',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    padding: '1rem 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  navTitle: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#333',
  },

  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  userName: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500',
  },

  logoutButton: {
    padding: '8px 16px',
    background: '#ff6b6b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '500',
  },

  content: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },

  welcome: {
    fontSize: '28px',
    color: '#333',
    marginBottom: '2rem',
    margin: '0 0 2rem',
  },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem',
  },

  card: {
    background: 'white',
    padding: '2rem 1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    textAlign: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },

  cardLabel: {
    fontSize: '12px',
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: '0.75rem',
    fontWeight: '600',
    letterSpacing: '0.5px',
  },

  cardValue: {
    fontSize: '48px',
    fontWeight: 'bold',
    color: '#667eea',
    margin: '0.5rem 0',
  },

  cardSubtext: {
    fontSize: '12px',
    color: '#ccc',
  },

  progressSection: {
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    marginBottom: '2rem',
  },

  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    fontSize: '14px',
    fontWeight: '500',
    color: '#333',
  },

  progressXp: {
    color: '#999',
  },

  progressBar: {
    width: '100%',
    height: '12px',
    background: '#eee',
    borderRadius: '6px',
    overflow: 'hidden',
    marginBottom: '0.75rem',
  },

  progressFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    transition: 'width 0.5s ease',
  },

  progressText: {
    fontSize: '12px',
    color: '#999',
    textAlign: 'right',
  },

  actionsSection: {
    marginBottom: '2rem',
  },

  actionsTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    margin: '0 0 1rem',
  },

  actionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
  },

  actionButton: {
    padding: '1rem',
    background: 'white',
    border: '2px solid #667eea',
    color: '#667eea',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
    transition: 'all 0.2s',
  },

  loadingText: {
    textAlign: 'center',
    padding: '2rem',
    color: '#666',
    fontSize: '16px',
  },

  errorText: {
    textAlign: 'center',
    padding: '2rem',
    color: '#c33',
    fontSize: '16px',
  },
};