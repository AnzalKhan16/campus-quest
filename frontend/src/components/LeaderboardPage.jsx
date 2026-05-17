import Navbar from './Navbar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const currentUserEmail = localStorage.getItem('email');

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Fetch top users
        const response = await api.get('/api/leaderboard/weekly');
        setLeaderboard(response.data);

        // Fetch current user's rank
        try {
          const rankResponse = await api.get('/api/leaderboard/rank');
          setUserRank(rankResponse.data);
        } catch (err) {
          console.error('Failed to fetch user rank:', err);
        }
      } catch (error) {
        console.error('Failed to fetch leaderboard:', error);
        setError('Failed to load leaderboard');
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) {
    return <div style={styles.loadingText}>Loading leaderboard...</div>;
  }

  if (error) {
    return <div style={styles.errorText}>{error}</div>;
  }

  return (
    <div style={styles.container}>
      <Navbar />
      {/* Header */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>🏆 Leaderboard</h1>
          <p style={styles.subtitle}>Top players this week</p>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          style={styles.backButton}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* User Rank Card */}
      {userRank && (
        <div style={styles.userRankCard}>
          <div style={styles.rankCardText}>
            <span style={styles.rankCardLabel}>Your Rank:</span>
            <span style={styles.rankCardValue}>#{userRank}</span>
          </div>
        </div>
      )}

      {/* Leaderboard Table */}
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.th}>Rank</th>
              <th style={styles.th}>Player</th>
              <th style={styles.th}>Level</th>
              <th style={styles.th}>Total XP</th>
              <th style={styles.th}>Streak</th>
            </tr>
          </thead>

          <tbody>
            {leaderboard.map((entry, index) => {
              const isCurrentUser =
                entry.fullName === currentUserEmail?.split('@')[0];

              return (
                <tr
                  key={index}
                  style={{
                    ...styles.row,
                    ...(isCurrentUser ? styles.currentUserRow : {}),
                  }}
                >
                  <td style={styles.td}>
                    <span style={styles.rankBadge}>#{entry.rank}</span>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.playerName}>{entry.fullName}</span>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.levelBadge}>
                      Lvl {entry.level}
                    </span>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.xpText}>
                      {entry.totalXP.toLocaleString()} XP
                    </span>
                  </td>

                  <td style={styles.td}>
                    <span style={styles.streakBadge}>
                      🔥 {entry.dailyStreak}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {leaderboard.length === 0 && (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>No leaderboard data available</p>
          </div>
        )}
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
  subtitle: {
    fontSize: '14px',
    color: '#999',
    margin: '0.5rem 0 0',
  },
  backButton: {
    padding: '10px 20px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '500',
  },
  userRankCard: {
    maxWidth: '1000px',
    margin: '0 auto 1.5rem',
    background: 'white',
    padding: '1.5rem',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    border: '2px solid #667eea',
  },
  rankCardText: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  rankCardLabel: {
    fontSize: '14px',
    color: '#666',
    fontWeight: '500',
  },
  rankCardValue: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#667eea',
  },
  tableWrapper: {
    maxWidth: '1000px',
    margin: '0 auto',
    background: 'white',
    borderRadius: '12px',
    boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  headerRow: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  th: {
    color: 'white',
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
    fontSize: '13px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  row: {
    borderBottom: '1px solid #eee',
    transition: 'background 0.2s',
  },
  currentUserRow: {
    background: '#f0f4ff',
    fontWeight: '500',
  },
  td: {
    padding: '1rem',
    fontSize: '14px',
    color: '#333',
  },
  rankBadge: {
    display: 'inline-block',
    background: '#667eea',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  playerName: {
    fontWeight: '500',
    color: '#333',
  },
  levelBadge: {
    display: 'inline-block',
    background: '#e3f2fd',
    color: '#1976d2',
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '500',
  },
  xpText: {
    color: '#666',
    fontWeight: '500',
  },
  streakBadge: {
    display: 'inline-block',
    background: '#fff3e0',
    color: '#ff6f00',
    padding: '4px 12px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: '600',
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
  emptyState: {
    textAlign: 'center',
    padding: '2rem',
  },
  emptyText: {
    color: '#999',
    fontSize: '14px',
  },
};