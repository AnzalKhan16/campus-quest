import Navbar from './Navbar';
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axiosConfig';

export default function ProfilePage() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Password change form
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Email change form
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [newEmail, setNewEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailSuccess, setEmailSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userResponse = await api.get('/api/users/profile');
        setUser(userResponse.data);

        const badgesResponse = await api.get('/api/users/badges');
        setBadges(badgesResponse.data);
      } catch (error) {
        console.error('Failed to fetch profile:', error);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setPasswordSuccess('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      return;
    }

    try {
      await api.post('/api/auth/change-password', {
        oldPassword,
        newPassword,
      });

      setPasswordSuccess('Password changed successfully!');
      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setShowPasswordForm(false);

      setTimeout(() => setPasswordSuccess(''), 3000);
    } catch (error) {
      setPasswordError(
        error.response?.data || 'Failed to change password'
      );
    }
  };

  const handleChangeEmail = async (e) => {
    e.preventDefault();
    setEmailError('');
    setEmailSuccess('');

    if (!newEmail || !emailPassword) {
      setEmailError('All fields are required');
      return;
    }

    if (!newEmail.includes('@')) {
      setEmailError('Invalid email address');
      return;
    }

    try {
      await api.post('/api/auth/change-email', {
        newEmail,
        password: emailPassword,
      });

      setEmailSuccess('Email changed successfully!');
      localStorage.setItem('email', newEmail);
      setUser({ ...user, email: newEmail });

      setNewEmail('');
      setEmailPassword('');
      setShowEmailForm(false);

      setTimeout(() => setEmailSuccess(''), 3000);
    } catch (error) {
      setEmailError(error.response?.data || 'Failed to change email');
    }
  };

  if (loading) {
    return <div style={styles.loadingText}>Loading profile...</div>;
  }

  if (error || !user) {
    return (
      <div style={styles.errorText}>
        {error || 'Failed to load profile'}
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <Navbar />
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>👤 My Profile</h1>

        <button
          onClick={() => navigate('/dashboard')}
          style={styles.backButton}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* User Stats */}
      <div style={styles.statsGrid}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Level</div>
          <div style={styles.statValue}>{user.level}</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total XP</div>
          <div style={styles.statValue}>
            {user.totalXP.toLocaleString()}
          </div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statLabel}>Daily Streak 🔥</div>
          <div style={styles.statValue}>{user.dailyStreak}</div>
        </div>

        <div style={styles.statCard}>
          <div style={styles.statLabel}>Badges</div>
          <div style={styles.statValue}>{user.badges}</div>
        </div>
      </div>

      {/* Badges */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>🎖️ Your Badges</h2>

        {badges.length > 0 ? (
          <div style={styles.badgesGrid}>
            {badges.map((badge, index) => (
              <div key={index} style={styles.badgeItem}>
                <div style={styles.badgeIcon}>{badge.badgeIcon}</div>
                <div style={styles.badgeName}>{badge.badgeName}</div>
                <div style={styles.badgeDate}>
                  {new Date(badge.earnedAt).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={styles.noBadges}>
            No badges earned yet. Keep learning!
          </div>
        )}
      </div>

      {/* Settings */}
      <div style={styles.section}>
        <h2 style={styles.sectionTitle}>⚙️ Settings</h2>

        {/* Email */}
        <div style={styles.settingBlock}>
          <div style={styles.settingHeader}>
            <div>
              <div style={styles.settingLabel}>Email Address</div>
              <div style={styles.settingValue}>{user.email}</div>
            </div>

            <button
              onClick={() => setShowEmailForm(!showEmailForm)}
              style={styles.settingButton}
            >
              {showEmailForm ? 'Cancel' : 'Change'}
            </button>
          </div>
        </div>

        {/* Password */}
        <div style={styles.settingBlock}>
          <div style={styles.settingHeader}>
            <div>
              <div style={styles.settingLabel}>Password</div>
              <div style={styles.settingValue}>••••••••</div>
            </div>

            <button
              onClick={() =>
                setShowPasswordForm(!showPasswordForm)
              }
              style={styles.settingButton}
            >
              {showPasswordForm ? 'Cancel' : 'Change'}
            </button>
          </div>
        </div>

        {/* Logout */}
        <div style={styles.logoutSection}>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            style={styles.logoutButton}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f7fa',
    padding: '2rem 1rem',
  },
  header: {
    maxWidth: '1000px',
    margin: '0 auto 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '32px',
    color: '#333',
    margin: 0,
  },
  backButton: {
    padding: '10px 20px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  statsGrid: {
    maxWidth: '1000px',
    margin: '0 auto 2rem',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1rem',
  },
  statCard: {
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: '12px',
    color: '#999',
    marginBottom: '0.5rem',
  },
  statValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#667eea',
  },
  section: {
    maxWidth: '1000px',
    margin: '0 auto 2rem',
    background: 'white',
    padding: '2rem',
    borderRadius: '12px',
  },
  sectionTitle: {
    fontSize: '20px',
    marginBottom: '1.5rem',
  },
  badgesGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '1rem',
  },
  badgeItem: {
    textAlign: 'center',
    padding: '1rem',
    background: '#f5f7fa',
    borderRadius: '12px',
  },
  badgeIcon: { fontSize: '32px' },
  badgeName: { fontWeight: '600', marginTop: '0.5rem' },
  badgeDate: { fontSize: '10px', color: '#999' },
  noBadges: { color: '#999' },
  settingBlock: {
    marginBottom: '1.5rem',
  },
  settingHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingLabel: { fontWeight: '600' },
  settingValue: { color: '#999' },
  settingButton: {
    padding: '8px 16px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  logoutSection: {
    marginTop: '2rem',
  },
  logoutButton: {
    width: '100%',
    padding: '12px',
    background: '#ff6b6b',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  loadingText: {
    textAlign: 'center',
    padding: '2rem',
  },
  errorText: {
    textAlign: 'center',
    padding: '2rem',
    color: '#c33',
  },
};