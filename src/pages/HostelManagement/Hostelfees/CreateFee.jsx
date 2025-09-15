import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../../CSSfolder/HostelMangement/fees/CreateFee.css';

const CreateFee = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    student: '',
    month: '',
    year: new Date().getFullYear(),
    amount: '',
    paymentMethod: 'Cash',
    transactionId: '',
    status: 'paid'
  });
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('/api/students');
        setStudents(response.data.data);
      } catch (err) {
        console.error('Error fetching students:', err);
      }
    };

    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/fees', formData);
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/fees');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create fee payment');
    } finally {
      setLoading(false);
    }
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <div className="fade-in">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Create New Fee Payment</h2>
          <div className="actions">
            <button 
              onClick={() => navigate('/fees')} 
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="card-body">
          {success && (
            <div className="alert alert-success slide-up">
              Fee payment created successfully! Redirecting...
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
                <label className="form-label">Student</label>
                <select
                  name="student"
                  value={formData.student}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Student</option>
                  {students?.map(student => (
                    <option key={student._id} value={student._id}>
                      {student.name} - {student.roomAllocated?.roomNumber || 'No Room'}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Month</label>
                <select
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Month</option>
                  {months.map(month => (
                    <option key={month} value={month}>{month}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Year</label>
                <select
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Amount (₹)</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter amount"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="Cash">Cash</option>
                  <option value="Card">Card</option>
                  <option value="Net Banking">Net Banking</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Transaction ID</label>
                <input
                  type="text"
                  name="transactionId"
                  value={formData.transactionId}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter transaction ID"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control"
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Create Fee Payment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFee;