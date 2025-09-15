import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTools, FaUser, FaCalendarAlt, FaCheck, FaSpinner } from 'react-icons/fa';
import '../../../CSSfolder/HostelMangement/Maintenance/UpdateMaintenance.css';

const UpdateMaintenance = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    status: '',
    assignedTo: '',
    completionNotes: ''
  });
  const [request, setRequest] = useState(null);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [requestRes, staffRes] = await Promise.all([
          axios.get(`/api/maintenance/${id}`),
          axios.get('/api/users?role=maintenance')
        ]);
        
        setRequest(requestRes.data.data);
        setStaff(staffRes.data.data);
        setFormData({
          status: requestRes.data.data.status,
          assignedTo: requestRes.data.data.assignedTo?._id || '',
          completionNotes: ''
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch maintenance request data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      const updateData = { ...formData };
      
      // If status is being updated to completed, set completion date
      if (formData.status === 'completed' && request.status !== 'completed') {
        updateData.completionDate = new Date().toISOString();
      }
      
      const response = await axios.put(`/api/maintenance/${id}`, updateData);
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/maintenance/${id}`);
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update maintenance request');
    } finally {
      setUpdating(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading maintenance request...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!request) {
    return <div className="error-message">Maintenance request not found</div>;
  }

  return (
    <div className="fade-in">
      <div className="card update-maintenance-card">
        <div className="card-header">
          <h2 className="card-title">
            <FaTools /> Update Maintenance Request
          </h2>
          <div className="actions">
            <button 
              onClick={() => navigate(`/maintenance/${id}`)} 
              className="btn btn-secondary"
            >
              Back to Details
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="request-overview">
            <h3>Request Overview</h3>
            <div className="overview-grid">
              <div className="overview-item">
                <span className="overview-label">Room:</span>
                <span className="overview-value">
                  {request.room?.roomNumber || 'N/A'} (Block {request.room?.block || 'N/A'}, Floor {request.room?.floor || 'N/A'})
                </span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Issue Type:</span>
                <span className="overview-value">{request.issueType || 'N/A'}</span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Priority:</span>
                <span className="overview-value">
                  <span className={`badge ${
                    request.priority === 'high' ? 'badge-danger' :
                    request.priority === 'medium' ? 'badge-warning' : 'badge-success'
                  }`}>
                    {request.priority}
                  </span>
                </span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Reported On:</span>
                <span className="overview-value">{formatDate(request.createdAt)}</span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Current Status:</span>
                <span className="overview-value">
                  <span className={`badge ${
                    request.status === 'pending' ? 'badge-secondary' :
                    request.status === 'in-progress' ? 'badge-primary' :
                    request.status === 'completed' ? 'badge-success' : 'badge-danger'
                  }`}>
                    {request.status.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                </span>
              </div>
              <div className="overview-item">
                <span className="overview-label">Assigned To:</span>
                <span className="overview-value">
                  {request.assignedTo?.name || 'Not assigned'}
                </span>
              </div>
            </div>
          </div>
          
          {success && (
            <div className="alert alert-success slide-up">
              Maintenance request updated successfully! Redirecting...
            </div>
          )}
          {error && (
            <div className="alert alert-danger slide-up">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Assign To</label>
                <select
                  name="assignedTo"
                  value={formData.assignedTo}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select Staff</option>
                  {staff.map(user => (
                    <option key={user._id} value={user._id}>
                      {user.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Completion Notes</label>
              <textarea
                name="completionNotes"
                value={formData.completionNotes}
                onChange={handleChange}
                className="form-control"
                rows="4"
                placeholder="Add any notes about the resolution..."
              ></textarea>
            </div>
            
            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={updating}
              >
                {updating ? (
                  <>
                    <FaSpinner className="spinner" /> Updating...
                  </>
                ) : (
                  'Update Request'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateMaintenance;