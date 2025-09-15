import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import '../../../CSSfolder/HostelMangement/fees/StudentFees.css';

const StudentFees = () => {
  const { studentId } = useParams();
  const [fees, setFees] = useState([]);
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [studentRes, feesRes] = await Promise.all([
          axios.get(`/api/students/${studentId}`),
          axios.get(`/api/fees/student/${studentId}`)
        ]);
        
        setStudent(studentRes.data.data);
        setFees(feesRes.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch student fee data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, [studentId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return <div className="loading">Loading student fee data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="fade-in">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">
            Fee Payments for {student?.name || 'Student'}
          </h2>
          <div className="actions">
            <Link to="/fees" className="btn btn-secondary">
              Back to All Fees
            </Link>
            <Link 
              to={`/fees/create?studentId=${studentId}`} 
              className="btn btn-primary"
            >
              Add New Payment
            </Link>
          </div>
        </div>
        <div className="card-body">
          {student && (
            <div className="student-info">
              <div className="info-item">
                <span className="info-label">Room:</span>
                <span className="info-value">
                  {student.roomAllocated?.roomNumber || 'Not Assigned'}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Monthly Fee:</span>
                <span className="info-value">
                  ₹{student.roomAllocated?.feePerMonth?.toLocaleString() || '0'}
                </span>
              </div>
            </div>
          )}

          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Month/Year</th>
                  <th>Amount</th>
                  <th>Payment Date</th>
                  <th>Method</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {fees?.length > 0 ? (
                  fees.map((fee) => (
                    <tr key={fee._id} className="slide-up">
                      <td>{fee.month} {fee.year}</td>
                      <td>₹{fee.amount?.toLocaleString() || '0'}</td>
                      <td>{formatDate(fee.paymentDate)}</td>
                      <td>{fee.paymentMethod || 'N/A'}</td>
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
                    <td colSpan="6" className="no-data">
                      No fee payments found for this student
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentFees;