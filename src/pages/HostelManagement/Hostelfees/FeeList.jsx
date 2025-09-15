import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../../../CSSfolder/HostelMangement/fees/FeeList.css';

const FeeList = () => {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const fetchFees = async () => {
      try {
        const response = await axios.get('/api/fees');
        setFees(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching fees:', error);
        setLoading(false);
      }
    };

    fetchFees();
  }, []);

  const filteredFees = fees?.filter(fee => {
    const matchesSearch = fee.student?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         fee.room?.roomNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || fee.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="fade-in">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Fee Payments</h2>
          <div className="actions">
            <Link to="/fees/create" className="btn btn-primary">
              Add New Payment
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="filters">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search by student or room..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="status-filter">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Room</th>
                    <th>Month/Year</th>
                    <th>Amount</th>
                    <th>Payment Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredFees?.length > 0 ? (
                    filteredFees.map((fee) => (
                      <tr key={fee._id} className="slide-up">
                        <td>{fee.student?.name || 'N/A'}</td>
                        <td>{fee.room?.roomNumber || 'N/A'}</td>
                        <td>{fee.month} {fee.year}</td>
                        <td>₹{fee.amount?.toLocaleString() || '0'}</td>
                        <td>{formatDate(fee.paymentDate)}</td>
                        <td>
                          <span className={`badge badge-${fee.status}`}>
                            {fee.status}
                          </span>
                        </td>
                        <td>
                          <Link
                            to={`/fees/${fee._id}`}
                            className="btn btn-sm btn-secondary"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="no-data">
                        No fee payments found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeeList;