
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaUserTie, 
  FaAngleRight,
  FaUsers,
  FaGraduationCap,
  FaUniversity,
  FaUserCheck,
  FaChartLine,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaClipboardList,
  FaBook,
  FaChalkboardTeacher,
  FaAward,
  FaBalanceScale
} from "react-icons/fa";
import { 
  FiTrendingUp, 
  FiBarChart2, 
  FiSettings,
  FiCheckCircle,
  FiDollarSign
} from "react-icons/fi";
import "./SidebarCSS/DeanSidebar.css";
// import "../../../CSSfolder/CommonCSS/sidebar.css";

const DeanSidebar = ({ expandedItems, toggleExpand, handleNavigation, currentPath }) => {
  const theme = localStorage.getItem("theme");
  const username = localStorage.getItem("username");

  // Menu items data structure
  const menuSections = [
    {
      id: 'dashboard',
      label: 'Dean Dashboard',
      icon: <FaUserTie className="dean-sidebar__section-icon" />,
      path: '/dean/deandashboard'
    },
    {
      id: 'academic-leadership',
      label: 'Academic Leadership',
      icon: <FaGraduationCap className="dean-sidebar__section-icon" />,
      items: [
        { 
          label: 'All Faculty List', 
          path: '/dean/facultylist', 
          icon: <FaUsers />,
          description: 'Complete faculty directory'
        },
        { 
          label: 'All Student List', 
          path: '/dean/allstudentlist', 
          icon: <FaGraduationCap />,
          description: 'Student enrollment overview'
        },
        { 
          label: 'View Courses', 
          path: '/dean/viewcourses', 
          icon: <FaBook />,
          description: 'Course catalog management'
        },
        { 
          label: 'Assign Faculty to Courses', 
          path: '/dean/assignfacultycourse', 
          icon: <FaUserCheck />,
          description: 'Faculty course assignments'
        },
        { 
          label: 'Approve Promotions', 
          path: '/dean/approvepromotion', 
          icon: <FaAward />,
          description: 'Faculty promotion requests'
        }
      ]
    },
    {
      id: 'department-management',
      label: 'Department Management',
      icon: <FaUniversity className="dean-sidebar__section-icon" />,
      items: [
        { 
          label: 'Department Form', 
          path: '/admin/departmentform', 
          icon: <FaClipboardList />,
          description: 'Create new departments'
        },
        { 
          label: 'Department List', 
          path: '/admin/departmentlist', 
          icon: <FaUsers />,
          description: 'All academic departments'
        },
        { 
          label: 'Department Details', 
          path: '/admin/departmentdetail/:id', 
          icon: <FaUniversity />,
          description: 'Department information'
        },
        { 
          label: 'View Department Budget', 
          path: '/dean/viewdepartmentbudget', 
          icon: <FaMoneyBillWave />,
          description: 'Financial allocation review'
        }
      ]
    },
    {
      id: 'faculty-affairs',
      label: 'Faculty Affairs',
      icon: <FaChalkboardTeacher className="dean-sidebar__section-icon" />,
      items: [
        { 
          label: 'Designation Management', 
          path: '/admin/designationform', 
          icon: <FaUserTie />,
          description: 'Faculty rank and titles'
        },
        { 
          label: 'Designation List', 
          path: '/admin/designationlist', 
          icon: <FaClipboardList />,
          description: 'All faculty designations'
        },
        { 
          label: 'Designation Details', 
          path: '/admin/designationdetail/:id', 
          icon: <FaUserCheck />,
          description: 'Designation information'
        }
      ]
    },
    {
      id: 'curriculum-management',
      label: 'Curriculum Management',
      icon: <FaBook className="dean-sidebar__section-icon" />,
      items: [
        { 
          label: 'Create Subject', 
          path: '/admin/createsubject', 
          icon: <FaBook />,
          description: 'Add new academic subjects'
        },
        { 
          label: 'Subject List', 
          path: '/admin/subjectslist', 
          icon: <FaClipboardList />,
          description: 'All course subjects'
        },
        { 
          label: 'Subject Details', 
          path: '/admin/subjectdetail/:id', 
          icon: <FaBook />,
          description: 'Subject information'
        },
        { 
          label: 'Edit Subject', 
          path: '/admin/editsubject/:id', 
          icon: <FaBalanceScale />,
          description: 'Modify subject details'
        },
        { 
          label: 'Subject Faculty Assignment', 
          path: '/admin/subjectassignedfaculty', 
          icon: <FaUserCheck />,
          description: 'Assign faculty to subjects'
        }
      ]
    },
    {
      id: 'academic-calendar',
      label: 'Academic Calendar',
      icon: <FaCalendarAlt className="dean-sidebar__section-icon" />,
      items: [
        { 
          label: 'Create Academic Calendar', 
          path: '/admin/createacadmiccalender', 
          icon: <FaCalendarAlt />,
          description: 'Set academic schedule'
        },
        { 
          label: 'View Academic Calendar', 
          path: '/admin/viewacadmiccalender', 
          icon: <FaClipboardList />,
          description: 'Academic timeline'
        },
        { 
          label: 'View All Timetables', 
          path: '/dean/viewalltimetables', 
          icon: <FaChartLine />,
          description: 'Class schedule overview'
        }
      ]
    },
    {
      id: 'analytics-reports',
      label: 'Analytics & Reports',
      icon: <FiBarChart2 className="dean-sidebar__section-icon" />,
      path: '/dean/analytics'
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

  // Mock data for dean overview
  const deanOverview = {
    totalFaculty: 45,
    totalStudents: 1200,
    departments: 8,
    budgetUtilization: 78
  };

  return (
    <div className="dean-sidebar">
      {/* Dean Profile Header */}
      <div className="dean-sidebar__profile">
        <div className="dean-sidebar__avatar">
          <div className="dean-sidebar__avatar-initials">
            {getInitials(username)}
          </div>
          <div className="dean-sidebar__status-indicator"></div>
        </div>
        <div className="dean-sidebar__user-info">
          <div className="dean-sidebar__username">{username || 'Dean'}</div>
          <div className="dean-sidebar__user-role">Dean</div>
          <div className="dean-sidebar__faculty">Academic Affairs</div>
        </div>
      </div>

      <div className="dean-sidebar__header">
        <FaUserTie className="dean-sidebar__header-icon" />
        <span className="dean-sidebar__header-title">Dean's Portal</span>
      </div>

      <nav className="dean-sidebar__nav">
        <ul className="dean-sidebar__menu">
          {menuSections.map((section) => (
            <li key={section.id} className="dean-sidebar__menu-item">
              {section.items ? (
                // Expandable section with submenu
                <>
                  <button
                    className={`dean-sidebar__section-btn ${
                      isSectionActive(section) ? 'dean-sidebar__section-btn--active' : ''
                    } ${expandedItems[section.id] ? 'dean-sidebar__section-btn--expanded' : ''}`}
                    onClick={() => toggleExpand(section.id)}
                  >
                    <div className="dean-sidebar__section-content">
                      {section.icon}
                      <span className="dean-sidebar__section-label">{section.label}</span>
                    </div>
                    <FaAngleRight className={`dean-sidebar__expand-icon ${
                      expandedItems[section.id] ? 'dean-sidebar__expand-icon--expanded' : ''
                    }`} />
                  </button>

                  {expandedItems[section.id] && (
                    <ul className="dean-sidebar__submenu">
                      {section?.items?.map((item, index) => (
                        <li key={index} className="dean-sidebar__submenu-item">
                          <Link
                            to={item?.path}
                            className={`dean-sidebar__submenu-link ${
                              isItemActive(item.path) ? 'dean-sidebar__submenu-link--active' : ''
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation(item.path);
                            }}
                          >
                            <div className="dean-sidebar__submenu-content">
                              <span className="dean-sidebar__submenu-icon">{item.icon}</span>
                              <div className="dean-sidebar__submenu-text">
                                <span className="dean-sidebar__submenu-label">{item.label}</span>
                                <span className="dean-sidebar__submenu-description">
                                  {item.description}
                                </span>
                              </div>
                            </div>
                            {isItemActive(item.path) && (
                              <div className="dean-sidebar__active-indicator"></div>
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
                  to={section?.path}
                  className={`dean-sidebar__single-link ${
                    isSectionActive(section) ? 'dean-sidebar__single-link--active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(section.path);
                  }}
                >
                  <div className="dean-sidebar__single-content">
                    {section.icon}
                    <span className="dean-sidebar__single-label">{section.label}</span>
                  </div>
                  {isSectionActive(section) && (
                    <div className="dean-sidebar__active-indicator"></div>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Faculty Overview */}
      {/* <div className="dean-sidebar__overview">
        <h4 className="dean-sidebar__overview-title">Faculty Overview</h4>
        <div className="dean-sidebar__stats-grid">
          <div className="dean-sidebar__stat-item">
            <div className="dean-sidebar__stat-icon dean-sidebar__stat-icon--faculty">
              <FaChalkboardTeacher />
            </div>
            <div className="dean-sidebar__stat-info">
              <div className="dean-sidebar__stat-value">
                {deanOverview.totalFaculty}
              </div>
              <div className="dean-sidebar__stat-label">Faculty</div>
            </div>
          </div>
          <div className="dean-sidebar__stat-item">
            <div className="dean-sidebar__stat-icon dean-sidebar__stat-icon--students">
              <FaGraduationCap />
            </div>
            <div className="dean-sidebar__stat-info">
              <div className="dean-sidebar__stat-value">
                {deanOverview.totalStudents.toLocaleString()}
              </div>
              <div className="dean-sidebar__stat-label">Students</div>
            </div>
          </div>
          <div className="dean-sidebar__stat-item">
            <div className="dean-sidebar__stat-icon dean-sidebar__stat-icon--departments">
              <FaUniversity />
            </div>
            <div className="dean-sidebar__stat-info">
              <div className="dean-sidebar__stat-value">
                {deanOverview.departments}
              </div>
              <div className="dean-sidebar__stat-label">Departments</div>
            </div>
          </div>
          <div className="dean-sidebar__stat-item">
            <div className="dean-sidebar__stat-icon dean-sidebar__stat-icon--budget">
              <FiDollarSign />
            </div>
            <div className="dean-sidebar__stat-info">
              <div className="dean-sidebar__stat-value">
                {deanOverview.budgetUtilization}%
              </div>
              <div className="dean-sidebar__stat-label">Budget Used</div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Quick Actions */}
      <div className="dean-sidebar__quick-actions">
        <h4 className="dean-sidebar__actions-title">Quick Actions</h4>
        <div className="dean-sidebar__actions-grid">
          <button 
            className="dean-sidebar__action-btn"
            onClick={() => handleNavigation('/dean/approvepromotion')}
          >
            <FiCheckCircle />
            <span>Approve Promotions</span>
          </button>
          <button 
            className="dean-sidebar__action-btn"
            onClick={() => handleNavigation('/dean/assignfacultycourse')}
          >
            <FaUserCheck />
            <span>Assign Courses</span>
          </button>
          <button 
            className="dean-sidebar__action-btn"
            onClick={() => handleNavigation('/dean/viewdepartmentbudget')}
          >
            <FaMoneyBillWave />
            <span>Review Budget</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="dean-sidebar__footer">
        <div className="dean-sidebar__academic-health">
          <div className="dean-sidebar__health-label">
            Academic Health Score
          </div>
          <div className="dean-sidebar__health-bar">
            <div 
              className="dean-sidebar__health-fill"
              style={{ width: '82%' }}
            ></div>
          </div>
          <div className="dean-sidebar__health-metrics">
            <span className="dean-sidebar__health-value">82%</span>
            <span className="dean-sidebar__health-text">Strong</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeanSidebar;