import Navbar from './Navbar';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

export default function CoursesPage() {
  const [courses, setCourses] = useState([]);
  const [userCourses, setUserCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [enrolledMessage, setEnrolledMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Fetch all courses
        const coursesResponse = await api.get('/api/courses');
        setCourses(coursesResponse.data);

        // Fetch user's enrolled courses
        try {
          const userCoursesResponse = await api.get('/api/users/courses');
          setUserCourses(userCoursesResponse.data);
        } catch (err) {
          console.error('Failed to fetch user courses:', err);
        }
      } catch (error) {
        console.error('Failed to fetch courses:', error);
        setError('Failed to load courses');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleEnroll = async (courseId, courseTitle) => {
    try {
      await api.post(`/api/courses/${courseId}/enroll`);

      setUserCourses([...userCourses, { courseId }]);

      setEnrolledMessage(`Enrolled in ${courseTitle}! 🎉`);
      setTimeout(() => setEnrolledMessage(''), 3000);
    } catch (error) {
      console.error('Failed to enroll:', error);
      setError('Failed to enroll in course');
    }
  };

  const isEnrolled = (courseId) => {
    return userCourses.some((uc) => uc.courseId === courseId);
  };

  const renderStars = (difficulty) => {
    return '★'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  };

  if (loading) {
    return <div style={styles.loadingText}>Loading courses...</div>;
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
          <h1 style={styles.title}>📚 Available Courses</h1>
          <p style={styles.subtitle}>
            {courses.length} courses available · Earn XP by completing them
          </p>
        </div>

        <button
          onClick={() => navigate('/dashboard')}
          style={styles.backButton}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Success Message */}
      {enrolledMessage && (
        <div style={styles.successMessage}>{enrolledMessage}</div>
      )}

      {/* Courses Grid */}
      <div style={styles.coursesGrid}>
        {courses.map((course) => {
          const enrolled = isEnrolled(course.id);

          return (
            <div key={course.id} style={styles.courseCard}>
              {/* Card Header */}
              <div style={styles.cardHeader}>
                <h3 style={styles.courseTitle}>{course.title}</h3>

                {enrolled && (
                  <span style={styles.enrolledBadge}>✓ Enrolled</span>
                )}
              </div>

              {/* Description */}
              <p style={styles.courseDescription}>{course.description}</p>

              {/* Meta Info */}
              <div style={styles.cardMeta}>
                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>Difficulty</span>
                  <span style={styles.difficulty}>
                    {renderStars(course.difficulty)}
                  </span>
                </div>

                <div style={styles.metaItem}>
                  <span style={styles.metaLabel}>Category</span>
                  <span style={styles.category}>{course.category}</span>
                </div>
              </div>

              {/* XP Reward */}
              <div style={styles.xpReward}>
                <span style={styles.xpLabel}>XP Reward</span>
                <span style={styles.xpValue}>+{course.xpReward} XP</span>
              </div>

              {/* Enroll Button */}
              <button
                onClick={() => handleEnroll(course.id, course.title)}
                disabled={enrolled}
                style={{
                  ...styles.enrollButton,
                  ...(enrolled ? styles.enrollButtonDisabled : {}),
                }}
              >
                {enrolled ? '✓ Already Enrolled' : 'Enroll Now'}
              </button>
            </div>
          );
        })}
      </div>

      {courses.length === 0 && (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No courses available yet</p>
        </div>
      )}
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
    maxWidth: '1200px',
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
  successMessage: {
    maxWidth: '1200px',
    margin: '0 auto 1.5rem',
    background: '#d4edda',
    color: '#155724',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #c3e6cb',
    fontSize: '14px',
    fontWeight: '500',
  },
  coursesGrid: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  courseCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
    display: 'flex',
    flexDirection: 'column',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '0.75rem',
    gap: '0.5rem',
  },
  courseTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: '#333',
    margin: 0,
  },
  enrolledBadge: {
    background: '#d4edda',
    color: '#155724',
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '12px',
    fontWeight: '600',
  },
  courseDescription: {
    fontSize: '13px',
    color: '#666',
    margin: '0 0 1rem',
    lineHeight: '1.5',
    flex: 1,
  },
  cardMeta: {
    display: 'flex',
    gap: '1.5rem',
    marginBottom: '1rem',
    paddingBottom: '1rem',
    borderBottom: '1px solid #eee',
  },
  metaItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem',
  },
  metaLabel: {
    fontSize: '11px',
    color: '#999',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  difficulty: {
    fontSize: '14px',
    color: '#ff6f00',
    fontWeight: '600',
  },
  category: {
    fontSize: '13px',
    color: '#667eea',
    fontWeight: '600',
  },
  xpReward: {
    background: '#f0f9ff',
    padding: '0.75rem 1rem',
    borderRadius: '8px',
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
  xpLabel: {
    fontSize: '12px',
    color: '#666',
    fontWeight: '500',
  },
  xpValue: {
    fontSize: '16px',
    color: '#00c896',
    fontWeight: 'bold',
  },
  enrollButton: {
    padding: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: '600',
  },
  enrollButtonDisabled: {
    background: '#ccc',
    cursor: 'not-allowed',
    opacity: 0.7,
  },
  loadingText: {
    textAlign: 'center',
    padding: '2rem',
    color: '#666',
  },
  errorText: {
    textAlign: 'center',
    padding: '2rem',
    color: '#c33',
  },
  emptyState: {
    textAlign: 'center',
    padding: '2rem',
  },
  emptyText: {
    color: '#999',
  },
};