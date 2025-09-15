import React , { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  FiUsers, FiUser, FiBook, FiCalendar, FiClipboard, 
  FiFileText, FiHome, FiSettings, FiAward, FiClock,
  FiLayers, FiBookmark, FiGrid, FiPieChart, FiPlus
} from 'react-icons/fi';
import { FcDepartment } from "react-icons/fc";
import { BsPeopleFill, BsBuilding, BsJournalBookmark } from 'react-icons/bs';
import { RiUserSettingsLine } from 'react-icons/ri';
import "../../CSSfolder/AdminCSS/RegistrarDashboard.css"
import apiClient from '../../services/axios';

const RegistrarDashboard = () => {
  const [admindashboardData, setAdminDashboardData] = useState(null);
  const adminId = localStorage.getItem('userid');

  // Fetch dashboard data from API (mocked for now) 
     const fetchDashboardData = async (adminId) => {
      try {
        // Replace with actual API call
        const response = await apiClient.get(`/api/dashboard/admin/${adminId}`);
        // const data = await response.json();
        setAdminDashboardData(response.data);
        console.log(response.data);
        
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
  useEffect(() => {
    fetchDashboardData(adminId);
  }, [adminId]);
  // Mock stats data - replace with actual API data
  const stats = {
    totalStudents: admindashboardData?.studentCount || 0,
    totalFaculty: admindashboardData?.facultyCount || 0,
    activeCourses: admindashboardData?.courseCount || 0,
    upcomingExams: admindashboardData?.subjectCount || 0,
    totalDepartments: admindashboardData?.departmentCount || 0,
    totalDesignations: admindashboardData?.designationCount || 0
  };

  return (
    <div className="registrar-dashboard">
      {/* Sidebar Navigation */}
      {/* <div className="sidebar">
        <div className="sidebar-header">
          <h2>Registrar Portal</h2>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section">
            <h3 className="nav-section-title">Core</h3>
            <Link to="/registrar/dashboard" className="nav-link active">
              <FiHome className="nav-icon" />
              <span>Dashboard</span>
            </Link>
          </div>

          <div className="nav-section">
            <h3 className="nav-section-title">People Management</h3>
            <Link to="/registrar/faculty-list" className="nav-link">
              <FiUsers className="nav-icon" />
              <span>Faculty List</span>
            </Link>
            <Link to="/registrar/student-list" className="nav-link">
              <FiUser className="nav-icon" />
              <span>Student List</span>
            </Link>
            <Link to="/registrar/user-list" className="nav-link">
              <RiUserSettingsLine className="nav-icon" />
              <span>User List</span>
            </Link>
            <Link to="/registrar/new-student" className="nav-link">
              <FiPlus className="nav-icon" />
              <span>New Student</span>
            </Link>
            <Link to="/registrar/new-faculty" className="nav-link">
              <FiPlus className="nav-icon" />
              <span>New Faculty</span>
            </Link>
          </div>

          <div className="nav-section">
            <h3 className="nav-section-title">Academic Management</h3>
            <Link to="/registrar/create-exam" className="nav-link">
              <FiFileText className="nav-icon" />
              <span>Create Exam</span>
            </Link>
            <Link to="/registrar/all-exams" className="nav-link">
              <FiClipboard className="nav-icon" />
              <span>All Exams</span>
            </Link>
            <Link to="/registrar/create-attendance" className="nav-link">
              <FiCalendar className="nav-icon" />
              <span>Attendance Create</span>
            </Link>
            <Link to="/registrar/create-timetable" className="nav-link">
              <FiClock className="nav-icon" />
              <span>Create Timetable</span>
            </Link>
            <Link to="/registrar/all-timetables" className="nav-link">
              <FiGrid className="nav-icon" />
              <span>All Timetables</span>
            </Link>
          </div>

          <div className="nav-section">
            <h3 className="nav-section-title">System Configuration</h3>
            <Link to="/registrar/department-form" className="nav-link">
              <BsBuilding className="nav-icon" />
              <span>Department Form</span>
            </Link>
            <Link to="/registrar/department-list" className="nav-link">
              <BsBuilding className="nav-icon" />
              <span>Department List</span>
            </Link>
            <Link to="/registrar/designation-form" className="nav-link">
              <FiAward className="nav-icon" />
              <span>Designation Form</span>
            </Link>
            <Link to="/registrar/designation-list" className="nav-link">
              <FiAward className="nav-icon" />
              <span>Designation List</span>
            </Link>
            <Link to="/registrar/create-subject" className="nav-link">
              <BsJournalBookmark className="nav-icon" />
              <span>Create Subject</span>
            </Link>
            <Link to="/registrar/subject-list" className="nav-link">
              <BsJournalBookmark className="nav-icon" />
              <span>Subject List</span>
            </Link>
            <Link to="/registrar/course-form" className="nav-link">
              <FiBook className="nav-icon" />
              <span>Course Form</span>
            </Link>
            <Link to="/registrar/course-list" className="nav-link">
              <FiBook className="nav-icon" />
              <span>Course List</span>
            </Link>
          </div>

          <div className="nav-section">
            <h3 className="nav-section-title">Academic Calendar</h3>
            <Link to="/registrar/create-calendar" className="nav-link">
              <FiCalendar className="nav-icon" />
              <span>Create Academic Calendar</span>
            </Link>
            <Link to="/registrar/view-calendar" className="nav-link">
              <FiCalendar className="nav-icon" />
              <span>View Academic Calendar</span>
            </Link>
          </div>
        </nav>
      </div> */}

      {/* Main Content */}
      <div className="main-content">
        {/* Top Navigation */}
        {/* <header className="top-nav">
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
          </div>
          <div className="user-profile">
            <div className="profile-info">
              <span className="user-name">Registrar Admin</span>
              <span className="user-role">Registrar</span>
            </div>
            <div className="profile-avatar">
              <FiUser />
            </div>
          </div>
        </header> */}

        {/* Dashboard Content */}
        <div className="admin-dashboard-content">
          <h1 className="dashboard-title">Registrar Dashboard</h1>
          
          {/* Stats Cards */}
          <div to={`/admin/allstudentlist`} className="admin-stats-container">
            <Link  className="stat-card">
              <div className="stat-icon students">
                <FiUser />
              </div>
              <div className="stat-info">
                <h3>Total Students</h3>
                <p>{stats.totalStudents}</p>
              </div>
            </Link>
            
            <Link to={`/admin/facultylist`} className="stat-card">
              <div className="stat-icon faculty">
                <FiUsers />
              </div>
              <div className="stat-info">
                <h3>Total Faculty</h3>
                <p>{stats.totalFaculty}</p>
              </div>
            </Link>
            
            <Link to={`/admin/courselist`} className="stat-card">
              <div className="stat-icon courses">
                <FiBook />
              </div>
              <div className="stat-info">
                <h3>Total Courses</h3>
                <p>{stats.activeCourses}</p>
              </div>
            </Link>

            <Link to={`/admin/courselist`} className="stat-card">
              <div className="stat-icon courses">
                <FcDepartment />
              </div>
              <div className="stat-info">
                <h3>Total Department</h3>
                <p>{stats.totalDepartments}</p>
              </div>
            </Link>
            
            <Link to={`/admin/allexams`} className="stat-card">
              <div className="stat-icon exams">
                <FiFileText />
              </div>
              <div className="stat-info">
                <h3>Total Subjects</h3>
                <p>{stats.upcomingExams}</p>
              </div>
            </Link>
          </div>

          {/* Quick Actions */}
          <div className="registrar-quick-actions">
            <h2 className="section-title">Quick Actions</h2>
            <div className="actions-grid">
              <Link to="/admin/newstudentregistration" className="action-card">
                <FiUser className="action-icon" />
                <span>Register New Student</span>
              </Link>
              
              <Link to="/admin/newfacultyregistration" className="action-card">
                <FiUsers className="action-icon" />
                <span>Register New Faculty</span>
              </Link>
              
              <Link to="/admin/createexam" className="action-card">
                <FiFileText className="action-icon" />
                <span>Create New Exam</span>
              </Link>
              
              <Link to="/admin/newtimetable" className="action-card">
                <FiClock className="action-icon" />
                <span>Create Timetable</span>
              </Link>
              
              <Link to="/admin/createsubject" className="action-card">
                <BsJournalBookmark className="action-icon" />
                <span>Add New Subject</span>
              </Link>
              
              <Link to="/admin/createacadmiccalender" className="action-card">
                <FiCalendar className="action-icon" />
                <span>Create Academic Calendar</span>
              </Link>


              <Link to="/admin/create-attendance" className="action-card">
                <FiBook className="action-icon" />
                <span>Attendance Create</span>
              </Link>

              
            </div>
          </div>

          {/* Recent Activities */}
          {/* <div className="recent-activities">
            <h2 className="section-title">Recent Activities</h2>
            <div className="activities-list">
              <div className="activity-item">
                <div className="activity-icon">
                  <FiUser />
                </div>
                <div className="activity-details">
                  <p>New student registered - John Doe (CS2023001)</p>
                  <span className="activity-time">10 minutes ago</span>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">
                  <FiUsers />
                </div>
                <div className="activity-details">
                  <p>New faculty added - Dr. Smith (Mathematics)</p>
                  <span className="activity-time">2 hours ago</span>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">
                  <FiFileText />
                </div>
                <div className="activity-details">
                  <p>New exam created - Semester 5 Final Exams</p>
                  <span className="activity-time">Yesterday</span>
                </div>
              </div>
              
              <div className="activity-item">
                <div className="activity-icon">
                  <FiCalendar />
                </div>
                <div className="activity-details">
                  <p>Academic calendar updated for 2023-24</p>
                  <span className="activity-time">2 days ago</span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default RegistrarDashboard;