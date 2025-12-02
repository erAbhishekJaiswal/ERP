
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FiHome, 
  FiUser, 
  FiUsers, 
  FiCalendar, 
  FiClock, 
  FiCheckSquare, 
  FiBook, 
  FiFileText, 
  FiAward, 
  FiBarChart2, 
  FiLogOut,
  FiBookOpen,
  FiEdit,
  FiList,
  FiTrendingUp
} from 'react-icons/fi';
import { FaChalkboardTeacher, FaClipboardCheck } from "react-icons/fa";
import "./SidebarCSS/FacultySidebar.css";

const FacultySidebar = ({ expandedItems, toggleExpand, handleNavigation, currentPath }) => {
  const theme = localStorage.getItem("theme");
  const id = localStorage.getItem("profileid");
  const username = localStorage.getItem("username");

  // Menu items data structure
  const menuSections = [
    {
      id: 'dashboard',
      label: 'Faculty Dashboard',
      icon: <FiHome className="faculty-sidebar__section-icon" />,
      path: '/faculty/facultydash'
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: <FiUser className="faculty-sidebar__section-icon" />,
      path: `/faculty/faculty-profile/${id}`
    },
    {
      id: 'academic',
      label: 'Academic Management',
      icon: <FaChalkboardTeacher className="faculty-sidebar__section-icon" />,
      items: [
        { 
          label: 'Student List', 
          path: '/faculty/student-list', 
          icon: <FiUsers />,
          description: 'View and manage students'
        },
        { 
          label: 'View Timetable', 
          path: '/faculty/view-timetable', 
          icon: <FiClock />,
          description: 'Check your schedule'
        },
        { 
          label: 'Academic Calendar', 
          path: '/faculty/viewacadmic-calender', 
          icon: <FiCalendar />,
          description: 'View academic schedule'
        }
      ]
    },
    {
      id: 'attendance',
      label: 'Attendance Management',
      icon: <FiCheckSquare className="faculty-sidebar__section-icon" />,
      items: [
        { 
          label: 'Mark Attendance', 
          path: '/faculty/mark-attendance', 
          icon: <FiEdit />,
          description: 'Record student attendance'
        },
        { 
          label: 'Attendance By Date', 
          path: '/faculty/attendance-by-date', 
          icon: <FiCalendar />,
          description: 'View attendance records'
        },
        { 
          label: 'Attendance By Subject', 
          path: '/faculty/attendance-by-subject', 
          icon: <FiBookOpen />,
          description: 'Subject-wise attendance'
        }
      ]
    },
    {
      id: 'assignments',
      label: 'Assignment Management',
      icon: <FiBook className="faculty-sidebar__section-icon" />,
      items: [
        { 
          label: 'Create Assignment', 
          path: '/faculty/create-assignment', 
          icon: <FiEdit />,
          description: 'Create new assignments'
        },
        { 
          label: 'Assignment List', 
          path: '/faculty/assignment-page', 
          icon: <FiList />,
          description: 'Manage all assignments'
        },
        { 
          label: 'Grade Assignments', 
          path: '/faculty/grade-assignments', 
          icon: <FaClipboardCheck />,
          description: 'Evaluate submissions'
        }
      ]
    },
    {
      id: 'quizzes',
      label: 'Quiz Management',
      icon: <FiFileText className="faculty-sidebar__section-icon" />,
      items: [
        { 
          label: 'Create Quiz', 
          path: '/faculty/set-quiz', 
          icon: <FiEdit />,
          description: 'Design new quizzes'
        },
        { 
          label: 'All Quizzes', 
          path: '/faculty/all-quiz', 
          icon: <FiList />,
          description: 'Manage your quizzes'
        },
        { 
          label: 'Quiz Results', 
          path: '/faculty/quiz-results', 
          icon: <FiTrendingUp />,
          description: 'View student performance'
        }
      ]
    },
    {
      id: 'analytics',
      label: 'Performance Analytics',
      icon: <FiBarChart2 className="faculty-sidebar__section-icon" />,
      path: '/faculty/analytics'
    }
  ];

  const isSectionActive = (section) => {
    if (section.path && currentPath === section.path) return true;
    if (section.items) {
      return section.items.some(item => currentPath.startsWith(item.path));
    }
    return false;
  };

  const isItemActive = (itemPath) => {
    return currentPath.startsWith(itemPath);
  };

  const getInitials = (name) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'F';
  };

  // Mock data for faculty stats
  const facultyStats = {
    pendingAssignments: 12,
    todayClasses: 3,
    students: 45
  };

  return (
    <div className="faculty-sidebar">
      {/* Faculty Profile Header */}
      {/* <div className="faculty-sidebar__profile">
        <div className="faculty-sidebar__avatar">
          <div className="faculty-sidebar__avatar-initials">
            {getInitials(username)}
          </div>
        </div>
        <div className="faculty-sidebar__user-info">
          <div className="faculty-sidebar__username">{username || 'Faculty'}</div>
          <div className="faculty-sidebar__user-role">Faculty</div>
        </div>
      </div> */}

      <div className="faculty-sidebar__header">
        <FaChalkboardTeacher className="faculty-sidebar__header-icon" />
        <span className="faculty-sidebar__header-title">Faculty Portal</span>
      </div>

      <nav className="faculty-sidebar__nav">
        <ul className="faculty-sidebar__menu">
          {menuSections.map((section) => (
            <li key={section.id} className="faculty-sidebar__menu-item">
              {section.items ? (
                // Expandable section with submenu
                <>
                  <button
                    className={`faculty-sidebar__section-btn ${
                      isSectionActive(section) ? 'faculty-sidebar__section-btn--active' : ''
                    } ${expandedItems[section.id] ? 'faculty-sidebar__section-btn--expanded' : ''}`}
                    onClick={() => toggleExpand(section.id)}
                  >
                    <div className="faculty-sidebar__section-content">
                      {section.icon}
                      <span className="faculty-sidebar__section-label">{section.label}</span>
                    </div>
                    <FiChevronRight className={`faculty-sidebar__expand-icon ${
                      expandedItems[section.id] ? 'faculty-sidebar__expand-icon--expanded' : ''
                    }`} />
                  </button>

                  {expandedItems[section.id] && (
                    <ul className="faculty-sidebar__submenu">
                      {section.items.map((item, index) => (
                        <li key={index} className="faculty-sidebar__submenu-item">
                          <Link
                            to={item.path}
                            className={`faculty-sidebar__submenu-link ${
                              isItemActive(item.path) ? 'faculty-sidebar__submenu-link--active' : ''
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation(item.path);
                            }}
                          >
                            <div className="faculty-sidebar__submenu-content">
                              <span className="faculty-sidebar__submenu-icon">{item.icon}</span>
                              <div className="faculty-sidebar__submenu-text">
                                <span className="faculty-sidebar__submenu-label">{item.label}</span>
                                <span className="faculty-sidebar__submenu-description">
                                  {item.description}
                                </span>
                              </div>
                            </div>
                            {isItemActive(item.path) && (
                              <div className="faculty-sidebar__active-indicator"></div>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // Single navigation item
                <Link
                  to={section.path}
                  className={`faculty-sidebar__single-link ${
                    isSectionActive(section) ? 'faculty-sidebar__single-link--active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(section.path);
                  }}
                >
                  <div className="faculty-sidebar__single-content">
                    {section.icon}
                    <span className="faculty-sidebar__single-label">{section.label}</span>
                  </div>
                  {isSectionActive(section) && (
                    <div className="faculty-sidebar__active-indicator"></div>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Faculty Quick Stats */}
      {/* <div className="faculty-sidebar__stats">
        <h4 className="faculty-sidebar__stats-title">Today's Overview</h4>
        <div className="faculty-sidebar__stats-grid">
          <div className="faculty-sidebar__stat-card">
            <div className="faculty-sidebar__stat-icon faculty-sidebar__stat-icon--classes">
              <FiClock />
            </div>
            <div className="faculty-sidebar__stat-info">
              <div className="faculty-sidebar__stat-value">{facultyStats.todayClasses}</div>
              <div className="faculty-sidebar__stat-label">Today's Classes</div>
            </div>
          </div>
          <div className="faculty-sidebar__stat-card">
            <div className="faculty-sidebar__stat-icon faculty-sidebar__stat-icon--assignments">
              <FiBook />
            </div>
            <div className="faculty-sidebar__stat-info">
              <div className="faculty-sidebar__stat-value">{facultyStats.pendingAssignments}</div>
              <div className="faculty-sidebar__stat-label">Pending to Grade</div>
            </div>
          </div>
          <div className="faculty-sidebar__stat-card">
            <div className="faculty-sidebar__stat-icon faculty-sidebar__stat-icon--students">
              <FiUsers />
            </div>
            <div className="faculty-sidebar__stat-info">
              <div className="faculty-sidebar__stat-value">{facultyStats.students}</div>
              <div className="faculty-sidebar__stat-label">Total Students</div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Quick Actions */}
      {/* <div className="faculty-sidebar__quick-actions">
        <h4 className="faculty-sidebar__actions-title">Quick Actions</h4>
        <div className="faculty-sidebar__actions-grid">
          <button 
            className="faculty-sidebar__action-btn"
            onClick={() => handleNavigation('/faculty/mark-attendance')}
          >
            <FiCheckSquare />
            <span>Mark Attendance</span>
          </button>
          <button 
            className="faculty-sidebar__action-btn"
            onClick={() => handleNavigation('/faculty/create-assignment')}
          >
            <FiEdit />
            <span>Create Assignment</span>
          </button>
          <button 
            className="faculty-sidebar__action-btn"
            onClick={() => handleNavigation('/faculty/set-quiz')}
          >
            <FiFileText />
            <span>Create Quiz</span>
          </button>
        </div>
      </div> */}

      {/* Footer */}
      {/* <div className="faculty-sidebar__footer">
        <div className="faculty-sidebar__workload">
          <div className="faculty-sidebar__workload-label">Weekly Workload</div>
          <div className="faculty-sidebar__workload-bar">
            <div 
              className="faculty-sidebar__workload-fill"
              style={{ width: '65%' }}
            ></div>
          </div>
          <div className="faculty-sidebar__workload-percentage">65%</div>
        </div>
      </div> */}
    </div>
  );
};

// Custom Chevron Right icon component since we're using react-icons/fi
const FiChevronRight = ({ className }) => (
  <svg 
    className={className}
    stroke="currentColor" 
    fill="none" 
    strokeWidth="2" 
    viewBox="0 0 24 24" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    height="1em" 
    width="1em" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <polyline points="9 18 15 12 9 6"></polyline>
  </svg>
);

export default FacultySidebar;