
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUserGraduate,
  FaClipboardList,
  FaAngleRight,
  FaBookOpen,
  FaUserCircle,
  FaCalendarCheck,
  FaTasks,
  FaGraduationCap,
  FaChartLine,
  FaFileAlt,
  FaBookReader
} from "react-icons/fa";
import { IoMdAttach } from "react-icons/io";
import "./SidebarCSS/StudentSidebar.css";

const StudentSidebar = ({ expandedItems, toggleExpand, handleNavigation, currentPath }) => {
  const theme = localStorage.getItem("theme");
  const studentid = localStorage.getItem("profileid");
  const username = localStorage.getItem("username");

  // Menu items data structure
  const menuSections = [
    {
      id: 'dashboard',
      label: 'Student Dashboard',
      icon: <FaUserGraduate className="student-sidebar__section-icon" />,
      path: '/student/studentdash'
    },
    {
      id: 'profile',
      label: 'My Profile',
      icon: <FaUserCircle className="student-sidebar__section-icon" />,
      path: `/student/profile/${studentid}`
    },
    {
      id: 'academics',
      label: 'Academic Resources',
      icon: <FaBookReader className="student-sidebar__section-icon" />,
      items: [
        { 
          label: 'E-Resources', 
          path: '/student/e-course', 
          icon: <FaBookOpen />,
          description: 'Course materials and resources'
        },
        { 
          label: 'Assignments', 
          path: '/student/assignment-page', 
          icon: <FaTasks />,
          description: 'View and submit assignments'
        },
        { 
          label: 'Quizzes & Tests', 
          path: '/student/studentsquiz', 
          icon: <FaFileAlt />,
          description: 'Take quizzes and tests'
        }
      ]
    },
    {
      id: 'attendance',
      label: 'Attendance',
      icon: <FaCalendarCheck className="student-sidebar__section-icon" />,
      path: '/student/attendence'
    },
    {
      id: 'performance',
      label: 'Performance',
      icon: <FaChartLine className="student-sidebar__section-icon" />,
      items: [
        { 
          label: 'Grades', 
          path: '/student/grades', 
          icon: <FaGraduationCap />,
          description: 'View your grades'
        },
        { 
          label: 'Progress Report', 
          path: '/student/progress', 
          icon: <FaChartLine />,
          description: 'Track your academic progress'
        }
      ]
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
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'S';
  };

  return (
    <div className="student-sidebar">
      {/* Student Profile Header */}
      {/* <div className="student-sidebar__profile">
        <div className="student-sidebar__avatar">
          <div className="student-sidebar__avatar-initials">
            {getInitials(username)}
          </div>
        </div>
        <div className="student-sidebar__user-info">
          <div className="student-sidebar__username">{username || 'Student'}</div>
          <div className="student-sidebar__user-role">Student</div>
        </div>
      </div> */}

      <div className="student-sidebar__header">
        <FaUserGraduate className="student-sidebar__header-icon" />
        <span className="student-sidebar__header-title">Student Portal</span>
      </div>

      <nav className="student-sidebar__nav">
        <ul className="student-sidebar__menu">
          {menuSections.map((section) => (
            <li key={section.id} className="student-sidebar__menu-item">
              {section.items ? (
                // Expandable section with submenu
                <>
                  <button
                    className={`student-sidebar__section-btn ${
                      isSectionActive(section) ? 'student-sidebar__section-btn--active' : ''
                    } ${expandedItems[section.id] ? 'student-sidebar__section-btn--expanded' : ''}`}
                    onClick={() => toggleExpand(section.id)}
                  >
                    <div className="student-sidebar__section-content">
                      {section.icon}
                      <span className="student-sidebar__section-label">{section.label}</span>
                    </div>
                    <FaAngleRight className={`student-sidebar__expand-icon ${
                      expandedItems[section.id] ? 'student-sidebar__expand-icon--expanded' : ''
                    }`} />
                  </button>

                  {expandedItems[section.id] && (
                    <ul className="student-sidebar__submenu">
                      {section.items.map((item, index) => (
                        <li key={index} className="student-sidebar__submenu-item">
                          <Link
                            to={item.path}
                            className={`student-sidebar__submenu-link ${
                              isItemActive(item.path) ? 'student-sidebar__submenu-link--active' : ''
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation(item.path);
                            }}
                          >
                            <div className="student-sidebar__submenu-content">
                              <span className="student-sidebar__submenu-icon">{item.icon}</span>
                              <div className="student-sidebar__submenu-text">
                                <span className="student-sidebar__submenu-label">{item.label}</span>
                                <span className="student-sidebar__submenu-description">
                                  {item.description}
                                </span>
                              </div>
                            </div>
                            {isItemActive(item.path) && (
                              <div className="student-sidebar__active-indicator"></div>
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
                  className={`student-sidebar__single-link ${
                    isSectionActive(section) ? 'student-sidebar__single-link--active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(section.path);
                  }}
                >
                  <div className="student-sidebar__single-content">
                    {section.icon}
                    <span className="student-sidebar__single-label">{section.label}</span>
                  </div>
                  {isSectionActive(section) && (
                    <div className="student-sidebar__active-indicator"></div>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Quick Stats */}
      <div className="student-sidebar__stats">
        <div className="student-sidebar__stat-item">
          <div className="student-sidebar__stat-icon">
            <FaBookOpen />
          </div>
          <div className="student-sidebar__stat-info">
            <div className="student-sidebar__stat-value">5</div>
            <div className="student-sidebar__stat-label">Active Courses</div>
          </div>
        </div>
        <div className="student-sidebar__stat-item">
          <div className="student-sidebar__stat-icon">
            <FaTasks />
          </div>
          <div className="student-sidebar__stat-info">
            <div className="student-sidebar__stat-value">3</div>
            <div className="student-sidebar__stat-label">Pending Assignments</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="student-sidebar__footer">
        <div className="student-sidebar__academic-progress">
          <div className="student-sidebar__progress-label">Academic Progress</div>
          <div className="student-sidebar__progress-bar">
            <div 
              className="student-sidebar__progress-fill"
              style={{ width: '75%' }}
            ></div>
          </div>
          <div className="student-sidebar__progress-percentage">75%</div>
        </div>
      </div>
    </div>
  );
};

export default StudentSidebar;