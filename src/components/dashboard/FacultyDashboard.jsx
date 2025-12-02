
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiHome, FiUser, FiUsers, FiCalendar, FiClock, 
  FiCheckSquare, FiBook, FiFileText, FiAward, 
  FiBarChart2, FiLogOut, FiTrendingUp, FiActivity,
  FiRefreshCw, FiArrowRight, FiBell, FiSearch
} from 'react-icons/fi';
import { BsArrowRight, BsGraphUp } from 'react-icons/bs';
import apiClient from '../../services/axios';
import '../../CSSfolder/FacultyCSS/FacultyDashboard.css';

const FacultyDashboard = () => {
  const [dashboard, setDashboard] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const facultyId = localStorage.getItem('profileid');

  const fetchStats = async (facultyId) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/api/dashboard/faculty/${facultyId}`);
      setDashboard(response.data);
      console.log('Fetched stats:', response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats(facultyId);
  }, [facultyId]);

  const stats = [
    { 
      title: 'Total Students', 
      value: dashboard.studentCount || '142', 
      icon: <FiUsers />, 
      color: '#4f46e5',
      trend: '+12%',
      description: 'Enrolled students',
      path: '/faculty/students'
    },
    { 
      title: 'Pending Attendance', 
      value: dashboard.attendanceCount || '3', 
      icon: <FiCheckSquare />, 
      color: '#f59e0b',
      trend: 'Due today',
      description: 'Requires marking',
      path: '/faculty/attendance'
    },
    { 
      title: 'Assignments to Grade', 
      value: dashboard.assignmentCount || '7', 
      icon: <FiBook />, 
      color: '#ef4444',
      trend: '+3 new',
      description: 'Awaiting evaluation',
      path: '/faculty/assignments'
    },
    { 
      title: 'Upcoming Quizzes', 
      value: dashboard.quizCount || '2', 
      icon: <FiFileText />, 
      color: '#10b981',
      trend: 'This week',
      description: 'Scheduled assessments',
      path: '/faculty/quizzes'
    }
  ];

  const quickActions = [
    {
      title: 'Mark Attendance',
      icon: <FiCheckSquare />,
      path: '/faculty/mark-attendance',
      color: '#4f46e5',
      description: 'Take today\'s attendance'
    },
    {
      title: 'Create Assignment',
      icon: <FiBook />,
      path: '/faculty/create-assignment',
      color: '#f59e0b',
      description: 'New assignment task'
    },
    {
      title: 'Schedule Quiz',
      icon: <FiFileText />,
      path: '/faculty/create-quiz',
      color: '#ef4444',
      description: 'Plan new assessment'
    },
    {
      title: 'Upload Materials',
      icon: <FiAward />,
      path: '/faculty/upload-materials',
      color: '#10b981',
      description: 'Share study resources'
    }
  ];

  const recentActivities = [
    {
      action: 'Assignment #3 graded',
      course: 'CS-201',
      time: '2 hours ago',
      type: 'assignment',
      icon: <FiBook />
    },
    {
      action: 'Quiz #2 created',
      course: 'CS-301',
      time: '1 day ago',
      type: 'quiz',
      icon: <FiFileText />
    },
    {
      action: 'Attendance marked',
      course: 'CS-201',
      time: '1 day ago',
      type: 'attendance',
      icon: <FiCheckSquare />
    },
    {
      action: 'Lecture notes uploaded',
      course: 'CS-301',
      time: '2 days ago',
      type: 'material',
      icon: <FiAward />
    }
  ];

  if (loading) {
    return (
      <div className="faculty-dashboard-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading Your Dashboard</h2>
          <p>Preparing your teaching overview...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="faculty-dashboard-modern">
      {/* Header Section */}
      <div className="faculty-dashboard-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="dashboard-main-title">
              Faculty Dashboard
            </h1>
            <p className="dashboard-subtitle">
              Welcome back! Here's your teaching overview for today.
            </p>
          </div>
          <div className="header-actions">
            <button className="refresh-btn" onClick={() => fetchStats(facultyId)}>
              <FiRefreshCw className="refresh-icon" />
              Refresh
            </button>
            <div className="date-display">
              <FiCalendar className="date-icon" />
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="stats-overview-section">
        <div className="section-header">
          <h2 className="section-title">
            <FiActivity className="section-title-icon" />
            Teaching Overview
          </h2>
          <div className="view-all-link">
            <Link to="/faculty/analytics">View Analytics <BsArrowRight /></Link>
          </div>
        </div>
        
        <div className="stats-grid-modern">
          {stats.map((stat, index) => (
            <Link 
              to={stat.path} 
              className="stat-card-modern" 
              key={index}
              style={{ '--accent-color': stat.color }}
            >
              <div className="stat-card-header">
                <div 
                  className="stat-icon-modern" 
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <div className="stat-trend" style={{ color: stat.color, backgroundColor: `${stat.color}15` }}>
                  {stat.trend}
                </div>
              </div>
              
              <div className="stat-content-modern">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.title}</p>
                <span className="stat-description">{stat.description}</span>
              </div>
              
              <div className="stat-arrow">
                <BsArrowRight />
              </div>
              
              <div className="stat-hover-effect"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-main-content">
        {/* Left Column */}
        <div className="content-left-column">
          {/* Quick Actions */}
          <div className="quick-actions-section">
            <div className="section-header">
              <h2 className="section-title">
                <FiClock className="section-title-icon" />
                Quick Actions
              </h2>
              <p className="section-description">Frequently used tasks</p>
            </div>
            
            <div className="actions-grid-modern">
              {quickActions.map((action, index) => (
                <Link 
                  to={action.path} 
                  className="action-card-modern" 
                  key={index}
                  style={{ '--action-color': action.color }}
                >
                  <div 
                    className="action-icon-modern"
                    style={{ backgroundColor: `${action.color}15`, color: action.color }}
                  >
                    {action.icon}
                  </div>
                  <div className="action-content">
                    <h4>{action.title}</h4>
                    <p>{action.description}</p>
                  </div>
                  <div className="action-arrow">
                    <FiArrowRight />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Upcoming Classes */}
          <div className="upcoming-classes-section">
            <div className="section-header">
              <h2 className="section-title">
                <FiCalendar className="section-title-icon" />
                Today's Schedule
              </h2>
              <Link to="/faculty/schedule" className="view-all-link">
                Full Schedule <BsArrowRight />
              </Link>
            </div>
            
            <div className="classes-list-modern">
              {dashboard?.upcomingClasses?.length > 0 ? (
                dashboard.upcomingClasses.map((classItem, index) => (
                  <div className="class-item-modern" key={index}>
                    <div className="class-time-indicator">
                      <FiClock className="time-icon" />
                      <span className="class-time">{classItem.time || '10:00 AM'}</span>
                    </div>
                    <div className="class-details">
                      <h4 className="class-name">{classItem.className || 'Advanced Programming'}</h4>
                      <p className="class-subject">{classItem.subject || 'CS-301'}</p>
                      <div className="class-meta">
                        <span className="class-room">{classItem.room || 'Room 302'}</span>
                        <span className="class-duration">90 min</span>
                      </div>
                    </div>
                    <div className="class-status upcoming">
                      Upcoming
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-classes">
                  <FiCalendar className="no-data-icon" />
                  <p>No classes scheduled for today</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="content-right-column">
          {/* Recent Activities */}
          <div className="recent-activities-section">
            <div className="section-header">
              <h2 className="section-title">
                <FiActivity className="section-title-icon" />
                Recent Activities
              </h2>
              <Link to="/faculty/activity" className="view-all-link">
                View All <BsArrowRight />
              </Link>
            </div>
            
            <div className="activities-list-modern">
              {recentActivities.map((activity, index) => (
                <div className={`activity-item-modern ${activity.type}-activity`} key={index}>
                  <div 
                    className="activity-icon-modern"
                    style={{ backgroundColor: `${getActivityColor(activity.type)}15`, color: getActivityColor(activity.type) }}
                  >
                    {activity.icon}
                  </div>
                  <div className="activity-content">
                    <p className="activity-action">{activity.action}</p>
                    <div className="activity-meta">
                      <span className="activity-course">{activity.course}</span>
                      <span className="activity-time">{activity.time}</span>
                    </div>
                  </div>
                  <div className="activity-badge"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="performance-metrics-section">
            <div className="section-header">
              <h2 className="section-title">
                <BsGraphUp className="section-title-icon" />
                Performance Metrics
              </h2>
            </div>
            
            <div className="metrics-grid">
              <div className="metric-card">
                <div className="metric-icon attendance">
                  <FiCheckSquare />
                </div>
                <div className="metric-content">
                  <h3>94%</h3>
                  <p>Average Attendance</p>
                  <span className="metric-trend positive">+2% this week</span>
                </div>
              </div>
              
              <div className="metric-card">
                <div className="metric-icon grades">
                  <FiAward />
                </div>
                <div className="metric-content">
                  <h3>86%</h3>
                  <p>Assignment Completion</p>
                  <span className="metric-trend positive">+5% this month</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="notifications-section">
            <div className="section-header">
              <h2 className="section-title">
                <FiBell className="section-title-icon" />
                Notifications
              </h2>
            </div>
            
            <div className="notifications-list">
              <div className="notification-item important">
                <div className="notification-icon">
                  <FiBook />
                </div>
                <div className="notification-content">
                  <p>3 assignments pending review</p>
                  <span>Due tomorrow</span>
                </div>
              </div>
              
              <div className="notification-item info">
                <div className="notification-icon">
                  <FiUsers />
                </div>
                <div className="notification-content">
                  <p>Department meeting scheduled</p>
                  <span>Friday, 3:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper function to get activity colors
const getActivityColor = (type) => {
  const colors = {
    assignment: '#4f46e5',
    quiz: '#f59e0b',
    attendance: '#10b981',
    material: '#ef4444'
  };
  return colors[type] || '#6b7280';
};

export default FacultyDashboard;