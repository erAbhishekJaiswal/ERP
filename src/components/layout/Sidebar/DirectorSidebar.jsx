import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaUserTie, 
  FaAngleRight,
  FaClipboardCheck,
  FaUserCheck,
  FaUsers,
  FaGraduationCap,
  FaChartLine,
  FaUniversity,
  FaFileContract,
  FaBalanceScale
} from "react-icons/fa";
import { 
  FiTrendingUp, 
  FiBarChart2, 
  FiSettings,
  FiAward
} from "react-icons/fi";
import "./SidebarCSS/DirectorSidebar.css";
import "../../../CSSfolder/CommonCSS/sidebar.css";

const DirectorSidebar = ({ expandedItems, toggleExpand, handleNavigation, currentPath }) => {
  const theme = localStorage.getItem("theme");
  const username = localStorage.getItem("username");

  // Menu items data structure
  const menuSections = [
    {
      id: 'dashboard',
      label: 'Director Dashboard',
      icon: <FaUserTie className="director-sidebar__section-icon" />,
      path: '/director/directordash'
    },
    {
      id: 'academic-oversight',
      label: 'Academic Oversight',
      icon: <FaUniversity className="director-sidebar__section-icon" />,
      items: [
        { 
          label: 'Course Review', 
          path: '/director/coursesreview', 
          icon: <FaClipboardCheck />,
          description: 'Review and approve courses'
        },
        { 
          label: 'Curriculum Audit', 
          path: '/director/curriculum-audit', 
          icon: <FaFileContract />,
          description: 'Academic program evaluation'
        },
        { 
          label: 'Academic Standards', 
          path: '/director/academic-standards', 
          icon: <FaBalanceScale />,
          description: 'Quality assurance monitoring'
        }
      ]
    },
    {
      id: 'faculty-management',
      label: 'Faculty Management',
      icon: <FaUserCheck className="director-sidebar__section-icon" />,
      items: [
        { 
          label: 'Assign Faculty Roles', 
          path: '/director/assignfacultyrole', 
          icon: <FaUserCheck />,
          description: 'Manage faculty responsibilities'
        },
        { 
          label: 'All Faculty List', 
          path: '/director/facultylist', 
          icon: <FaUsers />,
          description: 'Complete faculty directory'
        },
        { 
          label: 'Faculty Performance', 
          path: '/director/faculty-performance', 
          icon: <FiTrendingUp />,
          description: 'Teaching effectiveness reports'
        }
      ]
    },
    {
      id: 'student-oversight',
      label: 'Student Oversight',
      icon: <FaGraduationCap className="director-sidebar__section-icon" />,
      items: [
        { 
          label: 'All Student List', 
          path: '/director/allstudentlist', 
          icon: <FaUsers />,
          description: 'Complete student registry'
        },
        { 
          label: 'Student Performance', 
          path: '/director/student-performance', 
          icon: <FiAward />,
          description: 'Academic achievement tracking'
        },
        { 
          label: 'Enrollment Analytics', 
          path: '/director/enrollment-analytics', 
          icon: <FiBarChart2 />,
          description: 'Admission and retention data'
        }
      ]
    },
    {
      id: 'institutional-analytics',
      label: 'Institutional Analytics',
      icon: <FaChartLine className="director-sidebar__section-icon" />,
      path: '/director/institutional-analytics'
    },
    {
      id: 'strategic-planning',
      label: 'Strategic Planning',
      icon: <FiSettings className="director-sidebar__section-icon" />,
      path: '/director/strategic-planning'
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
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'D';
  };

  // Mock institutional data
  const institutionalStats = {
    totalStudents: 1250,
    totalFaculty: 85,
    programs: 12,
    approvalRate: 94
  };

  return (
    <div className="director-sidebar">
      {/* Director Profile Header */}
      <div className="director-sidebar__profile">
        <div className="director-sidebar__avatar">
          <div className="director-sidebar__avatar-initials">
            {getInitials(username)}
          </div>
          <div className="director-sidebar__status-indicator"></div>
        </div>
        <div className="director-sidebar__user-info">
          <div className="director-sidebar__username">{username || 'Director'}</div>
          <div className="director-sidebar__user-role">Director</div>
          <div className="director-sidebar__institution">Academic Institution</div>
        </div>
      </div>

      <div className="director-sidebar__header">
        <FaUserTie className="director-sidebar__header-icon" />
        <span className="director-sidebar__header-title">Executive Portal</span>
      </div>

      <nav className="director-sidebar__nav">
        <ul className="director-sidebar__menu">
          {menuSections.map((section) => (
            <li key={section.id} className="director-sidebar__menu-item">
              {section.items ? (
                // Expandable section with submenu
                <>
                  <button
                    className={`director-sidebar__section-btn ${
                      isSectionActive(section) ? 'director-sidebar__section-btn--active' : ''
                    } ${expandedItems[section.id] ? 'director-sidebar__section-btn--expanded' : ''}`}
                    onClick={() => toggleExpand(section.id)}
                  >
                    <div className="director-sidebar__section-content">
                      {section.icon}
                      <span className="director-sidebar__section-label">{section.label}</span>
                    </div>
                    <FaAngleRight className={`director-sidebar__expand-icon ${
                      expandedItems[section.id] ? 'director-sidebar__expand-icon--expanded' : ''
                    }`} />
                  </button>

                  {expandedItems[section.id] && (
                    <ul className="director-sidebar__submenu">
                      {section.items.map((item, index) => (
                        <li key={index} className="director-sidebar__submenu-item">
                          <Link
                            to={item.path}
                            className={`director-sidebar__submenu-link ${
                              isItemActive(item.path) ? 'director-sidebar__submenu-link--active' : ''
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation(item.path);
                            }}
                          >
                            <div className="director-sidebar__submenu-content">
                              <span className="director-sidebar__submenu-icon">{item.icon}</span>
                              <div className="director-sidebar__submenu-text">
                                <span className="director-sidebar__submenu-label">{item.label}</span>
                                <span className="director-sidebar__submenu-description">
                                  {item.description}
                                </span>
                              </div>
                            </div>
                            {isItemActive(item.path) && (
                              <div className="director-sidebar__active-indicator"></div>
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
                  className={`director-sidebar__single-link ${
                    isSectionActive(section) ? 'director-sidebar__single-link--active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(section.path);
                  }}
                >
                  <div className="director-sidebar__single-content">
                    {section.icon}
                    <span className="director-sidebar__single-label">{section.label}</span>
                  </div>
                  {isSectionActive(section) && (
                    <div className="director-sidebar__active-indicator"></div>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Institutional Overview */}
      {/* <div className="director-sidebar__overview">
        <h4 className="director-sidebar__overview-title">Institutional Overview</h4>
        <div className="director-sidebar__stats-grid">
          <div className="director-sidebar__stat-item">
            <div className="director-sidebar__stat-icon director-sidebar__stat-icon--students">
              <FaGraduationCap />
            </div>
            <div className="director-sidebar__stat-info">
              <div className="director-sidebar__stat-value">
                {institutionalStats.totalStudents.toLocaleString()}
              </div>
              <div className="director-sidebar__stat-label">Students</div>
            </div>
          </div>
          <div className="director-sidebar__stat-item">
            <div className="director-sidebar__stat-icon director-sidebar__stat-icon--faculty">
              <FaUserTie />
            </div>
            <div className="director-sidebar__stat-info">
              <div className="director-sidebar__stat-value">
                {institutionalStats.totalFaculty}
              </div>
              <div className="director-sidebar__stat-label">Faculty</div>
            </div>
          </div>
          <div className="director-sidebar__stat-item">
            <div className="director-sidebar__stat-icon director-sidebar__stat-icon--programs">
              <FaUniversity />
            </div>
            <div className="director-sidebar__stat-info">
              <div className="director-sidebar__stat-value">
                {institutionalStats.programs}
              </div>
              <div className="director-sidebar__stat-label">Programs</div>
            </div>
          </div>
          <div className="director-sidebar__stat-item">
            <div className="director-sidebar__stat-icon director-sidebar__stat-icon--approval">
              <FiAward />
            </div>
            <div className="director-sidebar__stat-info">
              <div className="director-sidebar__stat-value">
                {institutionalStats.approvalRate}%
              </div>
              <div className="director-sidebar__stat-label">Approval Rate</div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Quick Actions */}
      <div className="director-sidebar__quick-actions">
        <h4 className="director-sidebar__actions-title">Executive Actions</h4>
        <div className="director-sidebar__actions-grid">
          <button 
            className="director-sidebar__action-btn"
            onClick={() => handleNavigation('/director/coursesreview')}
          >
            <FaClipboardCheck />
            <span>Review Courses</span>
          </button>
          <button 
            className="director-sidebar__action-btn"
            onClick={() => handleNavigation('/director/assignfacultyrole')}
          >
            <FaUserCheck />
            <span>Assign Roles</span>
          </button>
          <button 
            className="director-sidebar__action-btn"
            onClick={() => handleNavigation('/director/institutional-analytics')}
          >
            <FaChartLine />
            <span>View Analytics</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="director-sidebar__footer">
        <div className="director-sidebar__performance">
          <div className="director-sidebar__performance-label">
            Institutional Performance
          </div>
          <div className="director-sidebar__performance-bar">
            <div 
              className="director-sidebar__performance-fill"
              style={{ width: '88%' }}
            ></div>
          </div>
          <div className="director-sidebar__performance-metrics">
            <span className="director-sidebar__performance-value">88%</span>
            <span className="director-sidebar__performance-text">Excellent</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DirectorSidebar;