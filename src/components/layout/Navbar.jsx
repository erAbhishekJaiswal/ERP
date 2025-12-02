
import { isAuthorized, getDefaultRoute } from '../../utils/authRoutes';
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { CgProfile } from "react-icons/cg";
import { 
  FaBars, 
  FaUserCircle, 
  FaSignOutAlt, 
  FaUserEdit,
  FaKey,
  FaUserPlus,
  FaSignInAlt,
  FaChevronDown,
  FaBell,
  FaCog
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { IoIosNotificationsOutline } from "react-icons/io";
import "../../CSSfolder/navbar.css";
import apiClient from '../../services/axios';

function Navbar({ toggleSidebar, isSidebarOpen }) {
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [notificationDropdown, setNotificationDropdown] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const token = localStorage.getItem("token");
  const theme = localStorage.getItem("theme");
  const username = localStorage.getItem('username');
  const studentid = localStorage.getItem('profileid');
  const role = localStorage.getItem('role');
  const navigate = useNavigate();
  const location = useLocation();

  // Mock notifications data
  const mockNotifications = [
    { id: 1, message: "New assignment posted in Mathematics", time: "5 min ago", read: false, type: "assignment" },
    { id: 2, message: "Your grade has been updated", time: "1 hour ago", read: false, type: "grade" },
    { id: 3, message: "Faculty meeting scheduled", time: "2 hours ago", read: true, type: "meeting" },
    { id: 4, message: "Library book due tomorrow", time: "1 day ago", read: true, type: "reminder" }
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeProfileDropdown();
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        closeNotificationDropdown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Load notifications
  useEffect(() => {
    if (token) {
      setNotifications(mockNotifications);
      const unread = mockNotifications.filter(notif => !notif.read).length;
      setUnreadCount(unread);
    }
  }, [token]);

  const toggleProfileDropdown = () => {
    if (profileDropdown) {
      closeProfileDropdown();
    } else {
      setProfileDropdown(true);
      setIsClosing(false);
      closeNotificationDropdown();
    }
  };

  const toggleNotificationDropdown = () => {
    if (notificationDropdown) {
      closeNotificationDropdown();
    } else {
      setNotificationDropdown(true);
      closeProfileDropdown();
      // Mark notifications as read when dropdown opens
      setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
      setUnreadCount(0);
    }
  };

  const closeProfileDropdown = () => {
    setIsClosing(true);
    setTimeout(() => {
      setProfileDropdown(false);
      setIsClosing(false);
    }, 200);
  };

  const closeNotificationDropdown = () => {
    setNotificationDropdown(false);
  };

  const handleLogout = async () => {
    try {
      await apiClient.get('/api/auth/logout', {
        withCredentials: true
      });
      localStorage.clear();
      closeProfileDropdown();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigateAuthorized = (path) => {
    if (isAuthorized(role, path)) {
      navigate(path);
      closeProfileDropdown();
    } else {
      alert("You don't have permission to access this page");
      navigate(getDefaultRoute(role));
    }
  };

  // Render only authorized links
  const renderAuthorizedLink = (path, icon, text) => {
    if (!isAuthorized(role, path)) return null;
    
    return (
      <li className="navbar-dropdown__item">
        <button
          className="navbar-dropdown__link"
          onClick={() => navigateAuthorized(path)}
        >
          {icon}
          <span>{text}</span>
        </button>
      </li>
    );
  };

  const getRoleBadgeColor = () => {
    switch(role) {
      case 'admin': return '#e74c3c';
      case 'faculty': return '#3498db';
      case 'student': return '#2ecc71';
      default: return '#95a5a6';
    }
  };

  const getRoleDisplayName = () => {
    switch(role) {
      case 'admin': return 'Administrator';
      case 'faculty': return 'Faculty';
      case 'student': return 'Student';
      default: return 'User';
    }
  };

  return (
    <nav className={`navbar-main ${theme === "dark" ? "navbar-main--dark" : "navbar-main--light"}`}>
      <div className="navbar-main__container">
        {/* Left Section */}
        <div className="navbar-main__left">
          <button 
            onClick={toggleSidebar} 
            className="navbar-main__toggle"
            aria-label="Toggle sidebar"
          >
            <FaBars
              className={`navbar-main__toggle-icon ${isSidebarOpen ? "navbar-main__toggle-icon--open" : ""}`}
            />
          </button>
          
          <Link to="/" className="navbar-main__brand">
            <div className="navbar-main__logo">
              <div className="navbar-main__logo-icon">A</div>
              <h1 className="navbar-main__logo-text">Academigo</h1>
            </div>
          </Link>

          {/* Navigation Links for Desktop */}
          {/* <div className="navbar-main__navigation">
            <Link 
              to="/" 
              className={`navbar-main__nav-link ${location.pathname === '/' ? 'navbar-main__nav-link--active' : ''}`}
            >
              Dashboard
            </Link>
            {isAuthorized(role, '/courses') && (
              <Link 
                to="/courses" 
                className={`navbar-main__nav-link ${location.pathname.includes('/courses') ? 'navbar-main__nav-link--active' : ''}`}
              >
                Courses
              </Link>
            )}
            {isAuthorized(role, '/grades') && (
              <Link 
                to="/grades" 
                className={`navbar-main__nav-link ${location.pathname.includes('/grades') ? 'navbar-main__nav-link--active' : ''}`}
              >
                Grades
              </Link>
            )}
          </div> */}
        </div>

        {/* Right Section */}
        <div className="navbar-main__right">
          {token ? (
            <>
              {/* Notifications */}
              <div className="navbar-main__notifications" ref={notificationRef}>
                <button
                  className="navbar-main__notification-btn"
                  onClick={toggleNotificationDropdown}
                  aria-label="Notifications"
                >
                  <IoIosNotificationsOutline className="navbar-main__notification-icon" />
                  {unreadCount > 0 && (
                    <span className="navbar-main__notification-badge">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {notificationDropdown && (
                  <div className="navbar-main__notification-dropdown">
                    <div className="navbar-main__notification-header">
                      <h3>Notifications</h3>
                      <span className="navbar-main__notification-count">
                        {unreadCount} unread
                      </span>
                    </div>
                    <div className="navbar-main__notification-list">
                      {notifications.slice(0, 5).map(notification => (
                        <div 
                          key={notification.id} 
                          className={`navbar-main__notification-item ${!notification.read ? 'navbar-main__notification-item--unread' : ''}`}
                        >
                          <div className="navbar-main__notification-message">
                            {notification.message}
                          </div>
                          <div className="navbar-main__notification-time">
                            {notification.time}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="navbar-main__notification-footer">
                      <button className="navbar-main__notification-view-all">
                        View All Notifications
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Dropdown */}
              <div className="navbar-main__profile" ref={dropdownRef}>
                <button
                  className="navbar-main__profile-btn"
                  onClick={toggleProfileDropdown}
                  aria-expanded={profileDropdown}
                  aria-label="Profile menu"
                >
                  <div className="navbar-main__profile-content">
                    <div className="navbar-main__avatar">
                      <FaUserCircle className="navbar-main__avatar-icon" />
                    </div>
                    <div className="navbar-main__user-info">
                      <span className="navbar-main__username">{username}</span>
                      <span 
                        className="navbar-main__user-role"
                        style={{ color: getRoleBadgeColor() }}
                      >
                        {getRoleDisplayName()}
                      </span>
                    </div>
                    <FaChevronDown className={`navbar-main__dropdown-arrow ${profileDropdown ? 'navbar-main__dropdown-arrow--open' : ''}`} />
                  </div>
                </button>

                {profileDropdown && (
                  <div className={`navbar-main__dropdown ${isClosing ? "navbar-main__dropdown--closing" : ""}`}>
                    {/* User Info in Dropdown */}
                    <div className="navbar-main__dropdown-header">
                      <div className="navbar-main__dropdown-avatar">
                        <FaUserCircle className="navbar-main__dropdown-avatar-icon" />
                      </div>
                      <div className="navbar-main__dropdown-user">
                        <div className="navbar-main__dropdown-username">{username}</div>
                        <div 
                          className="navbar-main__dropdown-role"
                          style={{ backgroundColor: getRoleBadgeColor() }}
                        >
                          {getRoleDisplayName()}
                        </div>
                      </div>
                    </div>

                    <div className="navbar-main__dropdown-divider"></div>

                    {/* Dropdown Menu Items */}
                    <ul className="navbar-main__dropdown-list">
                      {renderAuthorizedLink(
                        `/student-profile/${studentid}`,
                        <FaUserEdit className="navbar-main__dropdown-item-icon" />,
                        "My Profile"
                      )}
                      
                      {renderAuthorizedLink(
                        '/change-password',
                        <FaKey className="navbar-main__dropdown-item-icon" />,
                        "Change Password"
                      )}
                      
                      {renderAuthorizedLink(
                        '/settings',
                        <FaCog className="navbar-main__dropdown-item-icon" />,
                        "Settings"
                      )}

                      {/* Profile Link */}
                      {(role === 'student' || role === 'faculty') && (
                        <li className="navbar-main__dropdown-item">
                          <Link 
                            className="navbar-main__dropdown-link" 
                            to={role === 'student' ? `/student/profile/${studentid}` : `/faculty/faculty-profile/${studentid}`}
                            onClick={closeProfileDropdown}
                          >
                            <CgProfile className="navbar-main__dropdown-item-icon"/>
                            <span>Profile</span>
                          </Link>
                        </li>
                      )}
                    </ul>

                    <div className="navbar-main__dropdown-divider"></div>

                    {/* Logout */}
                    <ul className="navbar-main__dropdown-list">
                      <li className="navbar-main__dropdown-item">
                        <button
                          className="navbar-main__dropdown-link navbar-main__dropdown-link--logout"
                          onClick={handleLogout}
                        >
                          <FaSignOutAlt className="navbar-main__dropdown-item-icon" />
                          <span>Logout</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Auth Buttons for non-logged in users */
            <div className="navbar-main__auth">
              <Link 
                to="/register" 
                className="navbar-main__auth-link navbar-main__auth-link--register"
              >
                <FaUserPlus className="navbar-main__auth-icon" />
                <span>Register</span>
              </Link>
              <Link 
                to="/login" 
                className="navbar-main__auth-link navbar-main__auth-link--login"
              >
                <FaSignInAlt className="navbar-main__auth-icon" />
                <span>Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;