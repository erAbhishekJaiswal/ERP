
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaUserCog, 
  FaAngleRight,
  FaUsers,
  FaCalendarAlt,
  FaClipboardList,
  FaBook,
  FaUniversity,
  FaUserTie,
  FaChalkboardTeacher,
  FaBed,
  FaMoneyBillWave,
  FaTools,
  FaHome,
  FaGraduationCap,
  FaClock,
  FaFileAlt
} from "react-icons/fa";
import "../../../CSSfolder/CommonCSS/sidebar.css";

const AdminSidebar = ({ expandedItems, toggleExpand, handleNavigation, currentPath}) => {
  const theme = localStorage.getItem("theme");

  // Menu items data structure for better maintainability
  const menuSections = [
    {
      id: 'admin-dashboard',
      label: 'Admin Dashboard',
      icon: <FaHome className="admin-sidebar__section-icon" />,
      path: '/admin/registrardash',
      items: [
        { label: 'Faculty List', path: '/admin/facultylist', icon: <FaChalkboardTeacher /> },
        { label: 'All Student List', path: '/admin/allstudentlist', icon: <FaUsers /> },
        { label: 'User List', path: '/admin/userslist', icon: <FaUserTie /> },
        { label: 'Create Exam', path: '/admin/createexam', icon: <FaFileAlt /> },
        { label: 'All Exams', path: '/admin/allexams', icon: <FaClipboardList /> },
        { label: 'Attendance Create', path: '/admin/create-attendance', icon: <FaClock /> }
      ]
    },
    {
      id: 'admission-management',
      label: 'Admission Management',
      icon: <FaGraduationCap className="admin-sidebar__section-icon" />,
      items: [
        { label: 'New Student Register', path: '/admin/newstudentregistration', icon: <FaUsers /> },
        { label: 'New Faculty Register', path: '/admin/newfacultyregistration', icon: <FaUserTie /> }
      ]
    },
    {
      id: 'timetable',
      label: 'Time Table Management',
      icon: <FaClock className="admin-sidebar__section-icon" />,
      items: [
        { label: 'Create Timetable', path: '/admin/newtimetable', icon: <FaCalendarAlt /> },
        { label: 'View All Timetables', path: '/admin/viewalltimetables', icon: <FaClipboardList /> }
      ]
    },
    {
      id: 'department-management',
      label: 'Department Management',
      icon: <FaUniversity className="admin-sidebar__section-icon" />,
      items: [
        { label: 'Department Form', path: '/admin/departmentform', icon: <FaFileAlt /> },
        { label: 'Department List', path: '/admin/departmentlist', icon: <FaClipboardList /> }
      ]
    },
    {
      id: 'designation-management',
      label: 'Designation Management',
      icon: <FaUserTie className="admin-sidebar__section-icon" />,
      items: [
        { label: 'Designation Form', path: '/admin/designationform', icon: <FaFileAlt /> },
        { label: 'Designation List', path: '/admin/designationlist', icon: <FaClipboardList /> }
      ]
    },
    {
      id: 'subject-management',
      label: 'Subject Management',
      icon: <FaBook className="admin-sidebar__section-icon" />,
      items: [
        { label: 'Create Subject', path: '/admin/createsubject', icon: <FaFileAlt /> },
        { label: 'Subject List', path: '/admin/subjectslist', icon: <FaClipboardList /> }
      ]
    },
    {
      id: 'course-management',
      label: 'Course Management',
      icon: <FaGraduationCap className="admin-sidebar__section-icon" />,
      items: [
        { label: 'Course Form', path: '/admin/createcourse', icon: <FaFileAlt /> },
        { label: 'Course List', path: '/admin/courselist', icon: <FaClipboardList /> }
      ]
    },
    {
      id: 'academic-calendar',
      label: 'Academic Calendar',
      icon: <FaCalendarAlt className="admin-sidebar__section-icon" />,
      items: [
        { label: 'Create Academic Calendar', path: '/admin/createacadmiccalender', icon: <FaFileAlt /> },
        { label: 'View Academic Calendar', path: '/admin/viewacadmiccalender', icon: <FaClipboardList /> }
      ]
    },
    {
      id: 'hostel-rooms',
      label: 'Hostel Rooms',
      icon: <FaBed className="admin-sidebar__section-icon" />,
      items: [
        { label: 'Create Room', path: '/admin/createroom', icon: <FaFileAlt /> },
        { label: 'Rooms List', path: '/admin/rooms', icon: <FaClipboardList /> },
        { label: 'Update Room', path: '/admin/updateroom', icon: <FaTools /> },
        { label: 'Allocate Room', path: '/admin/allocateroom', icon: <FaUserCog /> }
      ]
    },
    {
      id: 'hostel-fees',
      label: 'Hostel Fees',
      icon: <FaMoneyBillWave className="admin-sidebar__section-icon" />,
      items: [
        { label: 'Create Fee', path: '/admin/fee/create', icon: <FaFileAlt /> },
        { label: 'Fee Report', path: '/admin/fee/duereport', icon: <FaClipboardList /> },
        { label: 'Fee List', path: '/admin/fee/list', icon: <FaMoneyBillWave /> },
        { label: 'Fee Student', path: '/admin/fee/student', icon: <FaUsers /> }
      ]
    },
    {
      id: 'hostel-maintenance',
      label: 'Hostel Maintenance',
      icon: <FaTools className="admin-sidebar__section-icon" />,
      items: [
        { label: 'Create Maintenance', path: '/admin/maintenance/create', icon: <FaFileAlt /> },
        { label: 'Maintenance List', path: '/admin/maintenance/list', icon: <FaClipboardList /> }
      ]
    }
  ];

  // const isSectionActive = (section) => {
  //   if (section.path && currentPath === section.path) return true;
  //   if (section.items) {
  //     return section.items.some(item => currentPath.startsWith(item.path));
  //   }
  //   return false;
  // };
  const isSectionActive = (section) => {
  if (section.path && currentPath?.startsWith(section.path)) return true;
  if (section.items) {
    return section.items.some(item => item.path && currentPath?.startsWith(item.path));
  }
  return false;
};


  const isItemActive = (itemPath) => {
    return currentPath.startsWith(itemPath);
  };

  return (
    <div className="admin-sidebar">
      <div className="admin-sidebar__header">
        <FaUserCog className="admin-sidebar__header-icon" />
        <span className="admin-sidebar__header-title">Administration</span>
      </div>

      <nav className="admin-sidebar__nav">
        <ul className="admin-sidebar__menu">
          {menuSections.map((section) => (
            <li key={section.id} className="admin-sidebar__menu-item">
              {/* Single Item or Expandable Section */}
              {section.items ? (
                <>
                  <button
                    className={`admin-sidebar__section-btn ${
                      isSectionActive(section) ? 'admin-sidebar__section-btn--active' : ''
                    } ${expandedItems?.[section.id] ? 'admin-sidebar__section-btn--expanded' : ''}`}
                    onClick={() => toggleExpand(section.id)}
                  >
                    <div className="admin-sidebar__section-content">
                      {section.icon}
                      <span className="admin-sidebar__section-label">{section.label}</span>
                    </div>
                    <FaAngleRight className={`admin-sidebar__expand-icon ${
                      expandedItems?.[section.id] ? 'admin-sidebar__expand-icon--expanded' : ''
                    }`} />
                  </button>

                  {/* Submenu Items */}
                  {expandedItems?.[section.id] && (
                    <ul className="admin-sidebar__submenu">
                      {section.items.map((item, index) => (
                        <li key={index} className="admin-sidebar__submenu-item">
                          <Link
                            to={item.path}
                            className={`admin-sidebar__submenu-link ${
                              isItemActive(item.path) ? 'admin-sidebar__submenu-link--active' : ''
                            }`}
                            onClick={(e) => {
                              e.preventDefault();
                              handleNavigation(item.path);
                            }}
                          >
                            <div className="admin-sidebar__submenu-content">
                              <span className="admin-sidebar__submenu-icon">{item.icon}</span>
                              <span className="admin-sidebar__submenu-label">{item.label}</span>
                            </div>
                            {isItemActive(item.path) && (
                              <div className="admin-sidebar__active-indicator"></div>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                // Single item without submenu
                <Link
                  to={section.path}
                  className={`admin-sidebar__single-link ${
                    isSectionActive(section) ? 'admin-sidebar__single-link--active' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(section.path);
                  }}
                >
                  <div className="admin-sidebar__single-content">
                    {section.icon}
                    <span className="admin-sidebar__single-label">{section.label}</span>
                  </div>
                  {isSectionActive(section) && (
                    <div className="admin-sidebar__active-indicator"></div>
                  )}
                </Link>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Quick Stats or System Status */}
      <div className="admin-sidebar__footer">
        <div className="admin-sidebar__status">
          <div className="admin-sidebar__status-item">
            <div className="admin-sidebar__status-dot admin-sidebar__status-dot--online"></div>
            <span className="admin-sidebar__status-text">System Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;