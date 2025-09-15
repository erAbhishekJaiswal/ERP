import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaTools, FaSearch, FaFilter, FaPlus, FaClock, FaCheck, FaExclamation, FaTimes } from 'react-icons/fa';
import '../../../CSSfolder/HostelMangement/Maintenance/MaintenanceList.css';

const MaintenanceList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    issueType: 'all'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        let query = `page=${currentPage}`;
        
        if (searchTerm) {
          query += `&room.roomNumber=${searchTerm}`;
        }
        
        if (filters.status !== 'all') {
          query += `&status=${filters.status}`;
        }
        
        if (filters.priority !== 'all') {
          query += `&priority=${filters.priority}`;
        }
        
        if (filters.issueType !== 'all') {
          query += `&issueType=${filters.issueType}`;
        }
        
        const response = await axios.get(`/api/maintenance?${query}`);
        setRequests(response.data.data);
        setTotalPages(Math.ceil(response.data.count / 25));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching maintenance requests:', error);
        setLoading(false);
      }
    };

    fetchRequests();
  }, [searchTerm, filters, currentPage]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
    setCurrentPage(1);
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
        return <FaTimes className="status-icon rejected" />;
      default:
        return <FaClock className="status-icon pending" />;
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <span className="badge badge-danger">High</span>;
      case 'medium':
        return <span className="badge badge-warning">Medium</span>;
      case 'low':
        return <span className="badge badge-success">Low</span>;
      default:
        return <span className="badge badge-secondary">{priority}</span>;
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="fade-in">
      <div className="card maintenance-card">
        <div className="card-header">
          <h2 className="card-title">
            <FaTools className="header-icon" /> Maintenance Requests
          </h2>
          <div className="actions">
            <Link to="/maintenance/create" className="btn btn-primary">
              <FaPlus /> New Request
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="filters-container">
            <div className="search-filter">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by room number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="dropdown-filters">
              <div className="filter-group">
                <label>
                  <FaFilter /> Status:
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>
                  <FaFilter /> Priority:
                </label>
                <select
                  name="priority"
                  value={filters.priority}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>
                  <FaFilter /> Issue Type:
                </label>
                <select
                  name="issueType"
                  value={filters.issueType}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Types</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading-animation">
              <div className="spinner"></div>
              <p>Loading maintenance requests...</p>
            </div>
          ) : (
            <>
              <div className="table-responsive">
                <table className="maintenance-table">
                  <thead>
                    <tr>
                      <th>Room</th>
                      <th>Issue Type</th>
                      <th>Description</th>
                      <th>Priority</th>
                      <th>Status</th>
                      <th>Reported On</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests?.length > 0 ? (
                      requests.map((request) => (
                        <tr key={request._id} className="slide-up">
                          <td>
                            <div className="room-info">
                              <span className="room-number">{request.room?.roomNumber || 'N/A'}</span>
                              <span className="block-floor">
                                Block {request.room?.block || 'N/A'}, Floor {request.room?.floor || 'N/A'}
                              </span>
                            </div>
                          </td>
                          <td>
                            <span className="issue-type">{request.issueType || 'N/A'}</span>
                          </td>
                          <td>
                            <div className="description">
                              {request.description ? 
                                (request.description.length > 50 
                                  ? `${request.description.substring(0, 50)}...` 
                                  : request.description) 
                                : 'N/A'}
                            </div>
                          </td>
                          <td>
                            {getPriorityBadge(request.priority)}
                          </td>
                          <td>
                            <div className="status-cell">
                              {getStatusIcon(request.status)}
                              <span className={`status-text ${request.status}`}>
                                {request.status.split('-').map(word => 
                                  word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}
                              </span>
                            </div>
                          </td>
                          <td>
                            {formatDate(request.createdAt)}
                          </td>
                          <td>
                            <Link
                              to={`/maintenance/${request._id}`}
                              className="btn btn-sm btn-secondary"
                            >
                              View
                            </Link>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="7" className="no-requests">
                          No maintenance requests found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {requests?.length > 0 && (
                <div className="pagination">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MaintenanceList;