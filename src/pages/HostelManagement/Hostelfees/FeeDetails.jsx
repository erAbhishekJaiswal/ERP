import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../../../CSSfolder/HostelMangement/fees/FeeDetails.css';

const FeeDetails = () => {
  const { id } = useParams();
  const [fee, setFee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFee = async () => {
      try {
        const response = await axios.get(`/api/fees/${id}`);
        setFee(response.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch fee details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchFee();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="loading">Loading fee details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!fee) {
    return <div className="error">Fee payment not found</div>;
  }

  return (
    <div className="fade-in">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Fee Payment Details</h2>
          <div className="actions">
            <Link to="/fees" className="btn btn-secondary">
              Back to List
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="fee-details-grid">
            <div className="detail-card">
              <h3>Student Information</h3>
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{fee.student?.name || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Room:</span>
                <span className="detail-value">{fee.room?.roomNumber || 'N/A'}</span>
              </div>
            </div>

            <div className="detail-card">
              <h3>Payment Information</h3>
              <div className="detail-item">
                <span className="detail-label">Amount:</span>
                <span className="detail-value">₹{fee.amount?.toLocaleString() || '0'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Month/Year:</span>
                <span className="detail-value">{fee.month} {fee.year}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Payment Date:</span>
                <span className="detail-value">{formatDate(fee.paymentDate)}</span>
              </div>
            </div>

            <div className="detail-card">
              <h3>Transaction Details</h3>
              <div className="detail-item">
                <span className="detail-label">Payment Method:</span>
                <span className="detail-value">{fee.paymentMethod || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Transaction ID:</span>
                <span className="detail-value">{fee.transactionId || 'N/A'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className={`detail-value badge badge-${fee.status}`}>
                  {fee.status}
                </span>
              </div>
              {fee.lateFee > 0 && (
                <div className="detail-item">
                  <span className="detail-label">Late Fee:</span>
                  <span className="detail-value">₹{fee.lateFee.toLocaleString()}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeDetails;