import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { token, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  // Don't show navbar on login/register pages
  if (
    !token ||
    location.pathname === '/login' ||
    location.pathname === '/register'
  ) {
    return null;
  }

  const navItems = [
    { path: '/dashboard', label: '📊 Dashboard' },
    { path: '/leaderboard', label: '🏆 Leaderboard' },
    { path: '/courses', label: '📚 Courses' },
    { path: '/profile', label: '👤 Profile' },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.container}>
        {/* Logo */}
        <Link to="/dashboard" style={styles.logo}>
          🎮 Campus Quest
        </Link>

        {/* Desktop Menu */}
        <div style={styles.desktopMenu}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                ...styles.navLink,
                ...(isActive(item.path) ? styles.navLinkActive : {}),
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right Section */}
        <div style={styles.rightSection}>
          <span style={styles.userName}>
            {localStorage.getItem('email')?.split('@')[0]}
          </span>

          <button
            onClick={handleLogout}
            style={styles.logoutButton}
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={styles.mobileMenuButton}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={styles.mobileMenu}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                ...styles.mobileNavLink,
                ...(isActive(item.path)
                  ? styles.mobileNavLinkActive
                  : {}),
              }}
            >
              {item.label}
            </Link>
          ))}

          <button
            onClick={handleLogout}
            style={styles.mobileLogoutButton}
          >
            🚪 Logout
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  navbar: {
    background:
      'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },

  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '70px',
  },

  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: 'white',
    textDecoration: 'none',
  },

  desktopMenu: {
    display: 'flex',
    gap: '2rem',
    alignItems: 'center',
    flexGrow: 1,
    marginLeft: '3rem',
  },

  navLink: {
    color: 'rgba(255,255,255,0.8)',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: '500',
    padding: '0.5rem 0',
    borderBottom: '2px solid transparent',
  },

  navLinkActive: {
    color: 'white',
    borderBottomColor: 'white',
  },

  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },

  userName: {
    color: 'white',
    fontSize: '13px',
    fontWeight: '500',
  },

  logoutButton: {
    padding: '8px 16px',
    background: 'rgba(255,255,255,0.2)',
    color: 'white',
    border: '1px solid rgba(255,255,255,0.3)',
    borderRadius: '6px',
    cursor: 'pointer',
  },

  mobileMenuButton: {
    display: 'none',
    background: 'none',
    border: 'none',
    color: 'white',
    fontSize: '24px',
    cursor: 'pointer',
  },

  mobileMenu: {
    background: 'rgba(0,0,0,0.1)',
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },

  mobileNavLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.75rem 1rem',
    borderRadius: '6px',
  },

  mobileNavLinkActive: {
    background: 'rgba(255,255,255,0.2)',
  },

  mobileLogoutButton: {
    padding: '0.75rem 1rem',
    background: '#ff6b6b',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
};