import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUsers, FiUser, FiBook, FiCalendar, FiClipboard, 
  FiFileText, FiHome, FiSettings, FiAward, FiClock,
  FiLayers, FiBookmark, FiGrid, FiPieChart, FiPlus,
  FiTrendingUp, FiActivity, FiRefreshCw
} from 'react-icons/fi';
import { FcDepartment } from "react-icons/fc";
import { BsPeopleFill, BsBuilding, BsJournalBookmark, BsArrowRight } from 'react-icons/bs';
import { RiUserSettingsLine } from 'react-icons/ri';
import "../../CSSfolder/AdminCSS/RegistrarDashboard.css"
import apiClient from '../../services/axios';

const RegistrarDashboard = () => {
  const [admindashboardData, setAdminDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const adminId = localStorage.getItem('userid');

  const fetchDashboardData = async (adminId) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/api/dashboard/admin/${adminId}`);
      setAdminDashboardData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(adminId);
  }, [adminId, refresh]);

  // Stats data
  const stats = {
    totalStudents: admindashboardData?.studentCount || 0,
    totalFaculty: admindashboardData?.facultyCount || 0,
    activeCourses: admindashboardData?.courseCount || 0,
    upcomingExams: admindashboardData?.subjectCount || 0,
    totalDepartments: admindashboardData?.departmentCount || 0,
    totalDesignations: admindashboardData?.designationCount || 0
  };

  // Quick actions data
  const quickActions = [
    {
      title: "Register New Student",
      icon: <FiUser />,
      path: "/admin/newstudentregistration",
      color: "#4f46e5",
      description: "Add new student to the system"
    },
    {
      title: "Register New Faculty",
      icon: <FiUsers />,
      path: "/admin/newfacultyregistration",
      color: "#059669",
      description: "Add new faculty member"
    },
    {
      title: "Create New Exam",
      icon: <FiFileText />,
      path: "/admin/createexam",
      color: "#dc2626",
      description: "Schedule new examination"
    },
    {
      title: "Create Timetable",
      icon: <FiClock />,
      path: "/admin/newtimetable",
      color: "#7c3aed",
      description: "Generate class schedule"
    },
    {
      title: "Add New Subject",
      icon: <BsJournalBookmark />,
      path: "/admin/createsubject",
      color: "#ea580c",
      description: "Create new course subject"
    },
    {
      title: "Academic Calendar",
      icon: <FiCalendar />,
      path: "/admin/createacadmiccalender",
      color: "#0891b2",
      description: "Set academic schedule"
    },
    {
      title: "Attendance Create",
      icon: <FiBook />,
      path: "/admin/create-attendance",
      color: "#65a30d",
      description: "Manage attendance records"
    }
  ];

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  if (loading) {
    return (
      <div className="registrar-dashboard-loading">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading Dashboard...</h2>
          <p>Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="registrar-dashboard-modern">
      {/* Header Section */}
      <div className="registrar-dashboard-modern-header">
        <div className="header-content-wrapper">
          <div className="header-text-content">
            <h1 className="dashboard-main-title">
              Registrar Dashboard
            </h1>
            <p className="dashboard-subtitle">
              Manage your institution's academic operations efficiently
            </p>
          </div>
          <div className="header-actions">
            <button className="refresh-btn" onClick={handleRefresh}>
              <FiRefreshCw className="refresh-icon" />
              Refresh Data
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
        <div className="section-header-modern">
          <h2 className="section-title-modern">
            <FiActivity className="section-title-icon" />
            Overview Statistics
          </h2>
          <div className="stats-summary">
            Total Records: {stats.totalStudents + stats.totalFaculty + stats.activeCourses}
          </div>
        </div>
        
        <div className="stats-grid-modern">
          <Link to="/admin/allstudentlist" className="stat-card-modern student-stat">
            <div className="stat-card-header">
              <div className="stat-icon-modern">
                <FiUser />
              </div>
              <div className="stat-trend positive">
                <FiTrendingUp />
                +12%
              </div>
            </div>
            <div className="stat-content-modern">
              <h3 className="stat-value">{stats.totalStudents}</h3>
              <p className="stat-label">Total Students</p>
              <div className="stat-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min((stats.totalStudents / 1000) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {Math.min((stats.totalStudents / 1000) * 100, 100).toFixed(1)}% capacity
                </span>
              </div>
            </div>
            <div className="stat-arrow">
              <BsArrowRight />
            </div>
          </Link>

          <Link to="/admin/facultylist" className="stat-card-modern faculty-stat">
            <div className="stat-card-header">
              <div className="stat-icon-modern">
                <FiUsers />
              </div>
              <div className="stat-trend positive">
                <FiTrendingUp />
                +8%
              </div>
            </div>
            <div className="stat-content-modern">
              <h3 className="stat-value">{stats.totalFaculty}</h3>
              <p className="stat-label">Total Faculty</p>
              <div className="stat-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min((stats.totalFaculty / 200) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {Math.min((stats.totalFaculty / 200) * 100, 100).toFixed(1)}% capacity
                </span>
              </div>
            </div>
            <div className="stat-arrow">
              <BsArrowRight />
            </div>
          </Link>

          <Link to="/admin/courselist" className="stat-card-modern course-stat">
            <div className="stat-card-header">
              <div className="stat-icon-modern">
                <FiBook />
              </div>
              <div className="stat-trend neutral">
                <FiTrendingUp />
                +3%
              </div>
            </div>
            <div className="stat-content-modern">
              <h3 className="stat-value">{stats.activeCourses}</h3>
              <p className="stat-label">Active Courses</p>
              <div className="stat-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min((stats.activeCourses / 50) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {Math.min((stats.activeCourses / 50) * 100, 100).toFixed(1)}% offered
                </span>
              </div>
            </div>
            <div className="stat-arrow">
              <BsArrowRight />
            </div>
          </Link>

          <Link to="/admin/courselist" className="stat-card-modern department-stat">
            <div className="stat-card-header">
              <div className="stat-icon-modern">
                <FcDepartment />
              </div>
              <div className="stat-trend neutral">
                <FiTrendingUp />
                +0%
              </div>
            </div>
            <div className="stat-content-modern">
              <h3 className="stat-value">{stats.totalDepartments}</h3>
              <p className="stat-label">Total Departments</p>
              <div className="stat-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min((stats.totalDepartments / 10) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {Math.min((stats.totalDepartments / 10) * 100, 100).toFixed(1)}% utilization
                </span>
              </div>
            </div>
            <div className="stat-arrow">
              <BsArrowRight />
            </div>
          </Link>

          <Link to="/admin/allexams" className="stat-card-modern subject-stat">
            <div className="stat-card-header">
              <div className="stat-icon-modern">
                <FiFileText />
              </div>
              <div className="stat-trend positive">
                <FiTrendingUp />
                +15%
              </div>
            </div>
            <div className="stat-content-modern">
              <h3 className="stat-value">{stats.upcomingExams}</h3>
              <p className="stat-label">Total Subjects</p>
              <div className="stat-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min((stats.upcomingExams / 100) * 100, 100)}%` }}
                  ></div>
                </div>
                <span className="progress-text">
                  {Math.min((stats.upcomingExams / 100) * 100, 100).toFixed(1)}% available
                </span>
              </div>
            </div>
            <div className="stat-arrow">
              <BsArrowRight />
            </div>
          </Link>

          <div className="stat-card-modern summary-stat">
            <div className="stat-card-header">
              <div className="stat-icon-modern">
                <FiPieChart />
              </div>
              <div className="stat-trend positive">
                <FiTrendingUp />
                +9%
              </div>
            </div>
            <div className="stat-content-modern">
              <h3 className="stat-value">
                {stats.totalStudents + stats.totalFaculty}
              </h3>
              <p className="stat-label">Total Users</p>
              <div className="user-breakdown">
                <div className="breakdown-item">
                  <span className="breakdown-label">Students</span>
                  <span className="breakdown-value">{stats.totalStudents}</span>
                </div>
                <div className="breakdown-item">
                  <span className="breakdown-label">Faculty</span>
                  <span className="breakdown-value">{stats.totalFaculty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-modern">
        <div className="section-header-modern">
          <h2 className="section-title-modern">
            <FiGrid className="section-title-icon" />
            Quick Actions
          </h2>
          <p className="section-description">
            Frequently used administrative tasks
          </p>
        </div>
        
        <div className="actions-grid-modern">
          {quickActions.map((action, index) => (
            <Link 
              to={action.path} 
              className="action-card-modern" 
              key={index}
              style={{ '--accent-color': action.color }}
            >
              <div className="action-card-header">
                <div 
                  className="action-icon-modern" 
                  style={{ backgroundColor: `${action.color}15`, color: action.color }}
                >
                  {action.icon}
                </div>
                <div className="action-badge">New</div>
              </div>
              
              <div className="action-content-modern">
                <h3 className="action-title">{action.title}</h3>
                <p className="action-description">{action.description}</p>
              </div>
              
              <div className="action-footer">
                <span className="action-cta">
                  Get Started
                  <BsArrowRight className="cta-arrow" />
                </span>
              </div>
              
              <div className="action-hover-effect"></div>
            </Link>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="system-status-modern">
        <div className="status-grid">
          <div className="status-card online">
            <div className="status-indicator"></div>
            <div className="status-content">
              <h3>System Status</h3>
              <p>All systems operational</p>
            </div>
          </div>
          
          <div className="status-card performance">
            <div className="status-content">
              <h3>Performance</h3>
              <p>Excellent response time</p>
            </div>
          </div>
          
          <div className="status-card updates">
            <div className="status-content">
              <h3>Last Updated</h3>
              <p>{new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrarDashboard;