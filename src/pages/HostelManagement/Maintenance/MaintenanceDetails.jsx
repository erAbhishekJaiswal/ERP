import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaTools, FaUser, FaCalendarAlt, FaCheck, FaClock, FaExclamationTriangle } from 'react-icons/fa';
import '../../../CSSfolder/HostelMangement/Maintenance/MaintenanceDetails.css';

const MaintenanceDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusHistory, setStatusHistory] = useState([]);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(`/api/maintenance/${id}`);
        setRequest(response.data.data);
        
        // Simulate status history (you would get this from your API)
        const history = [
          { status: 'pending', date: response.data.data.createdAt, by: 'System' },
          { status: response.data.data.status, date: response.data.data.completionDate || new Date(), by: 'Admin' }
        ];
        setStatusHistory(history);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch maintenance request details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchRequest();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="status-icon pending" />;
      case 'in-progress':
        return <FaTools className="status-icon in-progress" />;
      case 'completed':
        return <FaCheck className="status-icon completed" />;
      case 'rejected':
        return <FaExclamationTriangle className="status-icon rejected" />;
      default:
        return <FaClock className="status-icon pending" />;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <span className="badge badge-danger pulse">High Priority</span>;
      case 'medium':
        return <span className="badge badge-warning">Medium Priority</span>;
      case 'low':
        return <span className="badge badge-success">Low Priority</span>;
      default:
        return <span className="badge badge-secondary">{priority}</span>;
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading maintenance request details...</p>
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
      <div className="card maintenance-details-card">
        <div className="card-header">
          <h2 className="card-title">
            <FaTools /> Maintenance Request Details
          </h2>
          <div className="actions">
            <Link to="/maintenance" className="btn btn-secondary">
              Back to List
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="details-grid">
            <div className="detail-section">
              <h3 className="section-title">
                <FaUser /> Request Information
              </h3>
              <div className="detail-item">
                <span className="detail-label">Room:</span>
                <span className="detail-value">
                  {request.room?.roomNumber || 'N/A'} (Block {request.room?.block || 'N/A'}, Floor {request.room?.floor || 'N/A'})
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Reported By:</span>
                <span className="detail-value">
                  {request.reportedBy || 'N/A'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Reported On:</span>
                <span className="detail-value">
                  {formatDate(request.createdAt)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Issue Type:</span>
                <span className="detail-value">
                  {request.issueType || 'N/A'}
                </span>
              </div>
            </div>

            <div className="detail-section">
              <h3 className="section-title">
                <FaTools /> Issue Details
              </h3>
              <div className="detail-item">
                <span className="detail-label">Priority:</span>
                <span className="detail-value">
                  {getPriorityBadge(request.priority)}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className="detail-value status-value">
                  {getStatusIcon(request.status)}
                  <span className={`status-text ${request.status}`}>
                    {request.status.split('-').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </span>
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Assigned To:</span>
                <span className="detail-value">
                  {request.assignedTo?.name || 'Not assigned'}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Completion Date:</span>
                <span className="detail-value">
                  {formatDate(request.completionDate)}
                </span>
              </div>
            </div>

            <div className="detail-section full-width">
              <h3 className="section-title">Description</h3>
              <div className="description-box">
                {request.description || 'No description provided'}
              </div>
            </div>

            {request.images && request.images.length > 0 && (
              <div className="detail-section full-width">
                <h3 className="section-title">Attached Images</h3>
                <div className="image-gallery">
                  {request.images.map((image, index) => (
                    <div key={index} className="image-thumbnail">
                      <img src={image} alt={`Maintenance issue ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="detail-section full-width">
              <h3 className="section-title">
                <FaCalendarAlt /> Status History
              </h3>
              <div className="timeline">
                {statusHistory.map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker">
                      {getStatusIcon(item.status)}
                    </div>
                    <div className="timeline-content">
                      <div className="timeline-status">
                        {item.status.split('-').map(word => 
                          word.charAt(0).toUpperCase() + word.slice(1)
                        ).join(' ')}
                      </div>
                      <div className="timeline-date">{formatDate(item.date)}</div>
                      <div className="timeline-by">Updated by: {item.by}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaintenanceDetails;