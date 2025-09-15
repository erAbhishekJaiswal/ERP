import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../CSSfolder/AdminCSS/userdetail.css';
import axios from 'axios';
import apiClient from '../../services/axios';

const Userdetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get(`/api/auth/users/${id}`);
        console.log(response.data);
        setUser(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

// setUser(
//     {
//         "_id": "6813a012b0eb6ed3a1f07fea",
//         "username": "ENR2025001",
//         "email": "amit.verma@example.com",
//         "password": "$2a$10$BevJ/eKHTBIAlCv3hBIEcOCKQZi.SkjqPcwhcKj6HTmQnfwgWGJkG",
//         "role": "student",
//         "account_linked": "6813a012b0eb6ed3a1f07fe6",
//         "is_active": true,
//         "createdAt": "2025-05-01T16:23:46.430Z",
//         "updatedAt": "2025-05-08T04:54:55.006Z",
//         "__v": 0,
//         "adminpassword": "Abc@amic14f90"
//     }
// )

 const handelresetpassword = async () => {
    try {
      const response = await apiClient.put(`/api/auth/resetpassword`,{ email: user.email });
      console.log(response.data);
      window.location.reload()
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading user data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-alert">
          <h3>Error Loading User</h3>
          <p>{error}</p>
          <div className="error-actions">
            <button onClick={() => window.location.reload()}>Retry</button>
            <button onClick={handleBackClick} className="back-btn">Back to Users</button>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="not-found-container">
        <h2>User Not Found</h2>
        <p>The requested user could not be found.</p>
        <button onClick={handleBackClick} className="back-btn">Back to Users</button>
      </div>
    );
  }

  return (
    <div className="user-profile-container">
      <button onClick={handleBackClick} className="back-button">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Back to Users
      </button>

      <div className="profile-header">
        <div className="avatar">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div className="header-info">
          <h1>{user.username}</h1>
          <p className="user-email">{user.email}</p>
          <div className="user-meta">
            <span className={`role-badge ${user.role}`}>
              {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
            </span>
            <span className={`status-badge ${user.is_active ? 'active' : 'inactive'}`}>
              {user.is_active ? 'Active' : 'Inactive'}
            </span>
            <span className="user-id">ID: {user._id}</span>
          </div>
        </div>
        <div className="header-actions">
          <button onClick={() => navigate(`/admin/useredit/${user._id}`)} className="edit-btn">Edit Profile</button>
          {/* <button onClick={() => navigate(`/admin/userdelete/${user._id}`)} className="delete-btn">Delete User</button> */}
        </div>
      </div>

      <div className="userlist-tabs">
        <button 
          className={`userlist-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`userlist-tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          Security
        </button>
        <button 
          className={`userlist-tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="info-card">
              <h3>Basic Information</h3>
              <div className="info-grid">
                <div className="info-item">
                  <span className="userlist-info-label">Username</span>
                  <span className="info-value">{user.username}</span>
                </div>
                <div className="info-item">
                  <span className="userlist-info-label">Email</span>
                  <span className="info-value">{user.email}</span>
                </div>
                <div className="info-item">
                  <span className="userlist-info-label">Role</span>
                  <span className="info-value">
                    <span className={`role-badge ${user.role}`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </span>
                </div>
                <div className="info-item">
                  <span className="userlist-info-label">Status</span>
                  <span className="info-value">
                    <span className={`status-badge ${user.is_active ? 'active' : 'inactive'}`}>
                      {user.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </span>
                </div>
                <div className="info-item">
                  <span className="userlist-info-label">Account Created</span>
                  <span className="info-value">{formatDate(user.createdAt)}</span>
                </div>
                <div className="info-item">
                  <span className="userlist-info-label">Last Updated</span>
                  <span className="info-value">{formatDate(user.updatedAt)}</span>
                </div>
              </div>
            </div>

            <div className="info-card">
              <h3>Linked Account</h3>
              <div className="linked-account">
                <div className="account-id">
                  <span className="userlist-label">Account ID:</span>
                  <span className="value">{user.account_linked}</span>
                </div>
                <button className="view-account-btn">View Account Details</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="security-tab">
            <div className="info-card">
              <h3>Authentication Details</h3>
              <div className="security-grid">
                <div className="security-item">
                  <span className="userlist-security-label">Password Hash</span>
                  <span className="security-value">
                    <code>{user.password.substring(0, 20)}...</code>
                  </span>
                </div>
                <div className="security-item">
                  <span className="userlist-security-label">Admin Password</span>
                  <span className="security-value">
                    <code>{user.adminpassword}</code>
                  </span>
                </div>
              </div>
              <div className="security-actions">
                {/* <button className="reset-password-btn">Reset Password</button> */}
                <button className="regenerate-admin-btn" onClick={handelresetpassword} >Regenerate Password</button>
              </div>
            </div>

            <div className="info-card">
              <h3>Security Sessions</h3>
              <p className="user-no-sessions">No active sessions found</p>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="activity-tab">
            <div className="info-card">
              <h3>Recent Activity</h3>
              <div className="activity-item">
                <div className="activity-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                  </svg>
                </div>
                <div className="activity-details">
                  <p className="activity-title">Account created</p>
                  <p className="userlist-activity-time">{formatDate(user.createdAt)}</p>
                </div>
              </div>
              <div className="activity-item">
                <div className="activity-icon">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                  </svg>
                </div>
                <div className="activity-details">
                  <p className="activity-title">Last profile update</p>
                  <p className="userlist-activity-time">{formatDate(user.updatedAt)}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Userdetail;





