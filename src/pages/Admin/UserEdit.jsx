import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../../CSSfolder/AdminCSS/UserEdit.css';
import apiClient from '../../services/axios';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    role: 'student',
    is_active: true
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get(`/api/auth/users/${id}`);
        // if (!response.ok) {
        //   throw new Error('Failed to fetch user data');
        // }
        // const data = await response.json();
        setUser(response.data);
        setFormData({
          username: response.data.username,
          email: response.data.email,
          role: response.data.role,
          is_active: response.data.is_active
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    setSuccessMessage(null);

    try {
      const response = await apiClient.put(`/api/auth/users/${id}`, {formData});

      // if (!response.ok) {
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || 'Failed to update user');
      // }

      // const updatedUser = await response.json();
      setUser(response.data);
      setSuccessMessage('User updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!window.confirm('Are you sure you want to reset this user\'s password?')) return;

    try {
      const response = await apiClient.post(`/api/auth/users/${id}/reset-password`, {
        email: user.email});

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to reset password');
      }

      const result = await response.json();
      alert(`Password reset successful. New temporary password: ${result.temporaryPassword}`);
    } catch (err) {
      alert(err.message);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleBackClick = () => {
    navigate(-1);
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
    <div className="user-edit-container">
      <button onClick={handleBackClick} className="back-button">
        <svg viewBox="0 0 24 24" width="20" height="20">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Back to Users
      </button>

      <div className="edit-header">
        <h1>Edit User</h1>
        <p>Update user information and permissions</p>
      </div>

      {successMessage && (
        <div className="success-alert">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          {successMessage}
        </div>
      )}

      {submitError && (
        <div className="error-alert">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          {submitError}
        </div>
      )}

      <div className="edit-content">
        <form onSubmit={handleSubmit} className="edit-form">
          <div className="form-section">
            <h3>Basic Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="role">Role</label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <option value="student">Student</option>
                  <option value="faculty">Faculty</option>
                </select>
              </div>

              <div className="form-group">
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="is_active"
                    name="is_active"
                    checked={formData.is_active}
                    onChange={handleChange}
                  />
                  <label htmlFor="is_active">Active Account</label>
                </div>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3>Security</h3>
            <div className="security-info">
              <div className="security-item">
                <span className="sec-label">Password Hash</span>
                <span className="security-value">
                  <code>{user.password.substring(0, 20)}...</code>
                </span>
              </div>
              <div className="security-item">
                <span className="sec-label">Admin Password</span>
                <span className="security-value">
                  <code>{user.adminpassword}</code>
                </span>
              </div>
              {/* <button 
                type="button" 
                className="reset-password-btn"
                onClick={handleResetPassword}
                disabled={isSubmitting}
              >
                Reset Password
              </button> */}
            </div>
          </div>

          <div className="form-section">
            <h3>Metadata</h3>
            <div className="metadata-grid">
              <div className="metadata-item">
                <span className="meta-label">User ID</span>
                <span className="metadata-value">{user._id}</span>
              </div>
              <div className="metadata-item">
                <span className="meta-label">Account Linked</span>
                <span className="metadata-value">{user.account_linked}</span>
              </div>
              <div className="metadata-item">
                <span className="meta-label">Created At</span>
                <span className="metadata-value">{formatDate(user.createdAt)}</span>
              </div>
              <div className="metadata-item">
                <span className="meta-label">Last Updated</span>
                <span className="metadata-value">{formatDate(user.updatedAt)}</span>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button 
              type="button" 
              onClick={handleBackClick}
              className="cancel-btn"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="save-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-small"></span>
                  Saving...
                </>
              ) : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserEdit;