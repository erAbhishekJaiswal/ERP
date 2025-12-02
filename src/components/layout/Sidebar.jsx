// Sidebar.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { 
  FiHome, 
  FiChevronRight, 
  FiChevronDown,
  FiUser,
  FiBook,
  FiSettings,
  FiHelpCircle,
  FiLogOut
} from "react-icons/fi";
import "../../CSSfolder/CommonCSS/sidebar.css";
import FacultySidebar from "./Sidebar/FacultySidebar";
import AdminSidebar from "./Sidebar/AdminSidebar";
import StudentSidebar from "./Sidebar/StudentSidebar";
import DirectorSidebar from "./Sidebar/DirectorSidebar";
import DeanSidebar from "./Sidebar/DeanSidebar";
import AccountantSidebar from "./Sidebar/AccountantSidebar";

const Sidebar = ({ isOpen, onClose }) => {
  const [status, setStatus] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const profileId = localStorage.getItem("profileid");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token && role) {
      setStatus(role);
    }
  }, [role, token]);

  useEffect(() => {
    // Close sidebar when clicking outside on mobile
    const handleClickOutside = (event) => {
      if (window.innerWidth <= 768 && isOpen && !event.target.closest('.sidebar') && !event.target.closest('.navbar-main__toggle')) {
        onClose?.();
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen, onClose]);

  // Function to handle navigation with role check
  const handleNavigation = (path, requiredRole) => {
    if (!requiredRole || role === requiredRole) {
      navigate(path);
      // Close sidebar on mobile after navigation
      if (window.innerWidth <= 768) {
        onClose?.();
      }
    } else {
      toast.error("You don't have permission to access this page");
    }
  };

  const toggleExpand = (menuId) => {
    setExpandedItems(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const handleLogout = async () => {
    try {
      // Your logout logic here
      localStorage.clear();
      navigate('/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Error during logout');
    }
  };

  const getRoleDisplayName = () => {
    const roleMap = {
      'Registrar': 'Administrator',
      'faculty': 'Faculty',
      'student': 'Student',
      'Director': 'Director',
      'Dean': 'Dean',
      'Accountant': 'Accountant'
    };
    return roleMap[role] || 'User';
  };

  const getRoleColor = () => {
    const colorMap = {
      'Registrar': '#e74c3c',
      'faculty': '#3498db',
      'student': '#2ecc71',
      'Director': '#9b59b6',
      'Dean': '#f39c12',
      'Accountant': '#1abc9c'
    };
    return colorMap[role] || '#95a5a6';
  };

  // Common sidebar items that appear for all roles
  const commonSidebarItems = [
    {
      id: 'home',
      label: 'Home',
      icon: <FiHome className="sidebar-item__icon" />,
      path: '/',
      exact: true
    },
    // {
    //   id: 'profile',
    //   label: 'My Profile',
    //   icon: <FiUser className="sidebar-item__icon" />,
    //   path: role === 'student' ? `/student/profile/${profileId}` : 
    //         role === 'faculty' ? `/faculty/faculty-profile/${profileId}` : '/profile'
    // }
  ];

  const renderSidebarContent = () => {
    if (!token || !status) {
      return (
        <div className="sidebar-content">
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="sidebar-logo__icon">A</div>
              <span className="sidebar-logo__text">Academigo</span>
            </div>
          </div>
          <div className="sidebar-auth-prompt">
            <p>Please log in to access the menu</p>
            <button 
              className="sidebar-login-btn"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="sidebar-content">
        {/* Sidebar Header */}
        {/* <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="sidebar-logo__icon">A</div>
            <span className="sidebar-logo__text">Academigo</span>
          </div>
          <button 
            className="sidebar-close-btn"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            ×
          </button>
        </div> */}

        {/* User Profile Section */}
        {/* <div className="sidebar-user">
          <div className="sidebar-user__avatar">
            <FiUser className="sidebar-user__avatar-icon" />
          </div>
          <div className="sidebar-user__info">
            <div className="sidebar-user__name">{username || 'User'}</div>
            <div 
              className="sidebar-user__role"
              style={{ color: getRoleColor() }}
            >
              {getRoleDisplayName()}
            </div>
          </div>
        </div> */}

        {/* Navigation Menu */}
        <nav className="sidebar-nav">
          <ul className="sidebar-menu">
            {/* Common Items */}
            {/* {commonSidebarItems.map(item => (
              <li key={item.id} className="sidebar-menu__item">
                <Link
                  to={item.path}
                  className={`sidebar-menu__link ${
                    (item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)) 
                    ? 'sidebar-menu__link--active' 
                    : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(item.path);
                  }}
                >
                  {item.icon}
                  <span className="sidebar-menu__text">{item.label}</span>
                </Link>
              </li>
            ))} */}

            {/* Role-specific Sidebar Components */}
            <div className="sidebar-role-content">
              {status === "Registrar" && <AdminSidebar 
                expandedItems={expandedItems}
                toggleExpand={toggleExpand}
                handleNavigation={handleNavigation}
                currentPath={location.pathname}
              />}
              {status === "faculty" && <FacultySidebar 
                expandedItems={expandedItems}
                toggleExpand={toggleExpand}
                handleNavigation={handleNavigation}
                currentPath={location.pathname}
              />}
              {status === "student" && <StudentSidebar 
                expandedItems={expandedItems}
                toggleExpand={toggleExpand}
                handleNavigation={handleNavigation}
                currentPath={location.pathname}
              />}
              {status === "Director" && <DirectorSidebar 
                expandedItems={expandedItems}
                toggleExpand={toggleExpand}
                handleNavigation={handleNavigation}
                currentPath={location.pathname}
              />}
              {status === "Dean" && <DeanSidebar 
                expandedItems={expandedItems}
                toggleExpand={toggleExpand}
                handleNavigation={handleNavigation}
                currentPath={location.pathname}
              />}
              {status === "Accountant" && <AccountantSidebar 
                expandedItems={expandedItems}
                toggleExpand={toggleExpand}
                handleNavigation={handleNavigation}
                currentPath={location.pathname}
              />}
            </div>

            {/* Additional Common Items */}
            <li className="sidebar-menu__item">
              <Link
                to="/settings"
                className={`sidebar-menu__link ${
                  location.pathname.startsWith('/settings') ? 'sidebar-menu__link--active' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/settings');
                }}
              >
                <FiSettings className="sidebar-item__icon" />
                <span className="sidebar-menu__text">Settings</span>
              </Link>
            </li>

            <li className="sidebar-menu__item">
              <Link
                to="/help"
                className={`sidebar-menu__link ${
                  location.pathname.startsWith('/help') ? 'sidebar-menu__link--active' : ''
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation('/help');
                }}
              >
                <FiHelpCircle className="sidebar-item__icon" />
                <span className="sidebar-menu__text">Help & Support</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* Sidebar Footer */}
        {/* <div className="sidebar-footer">
          <button 
            className="sidebar-logout-btn"
            onClick={handleLogout}
          >
            <FiLogOut className="sidebar-logout-icon" />
            <span>Logout</span>
          </button>
        </div> */}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && <div className="sidebar-overlay" onClick={onClose} />}
      
      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        {renderSidebarContent()}
      </aside>
    </>
  );
};

export default Sidebar;