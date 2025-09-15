import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../CSSfolder/HostelMangement/fees/DueFeesReport.css';

const DueFeesReport = () => {
  const [dueFees, setDueFees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentYear, setCurrentYear] = useState('');

  useEffect(() => {
    const fetchDueFees = async () => {
      try {
        const response = await axios.get('/api/fees/report/due');
        setDueFees(response.data.data);
        
        const currentDate = new Date();
        setCurrentMonth(currentDate.toLocaleString('default', { month: 'long' }));
        setCurrentYear(currentDate.getFullYear());
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching due fees:', error);
        setLoading(false);
      }
    };

    fetchDueFees();
  }, []);

  const sendReminders = async () => {
    try {
      // Implement reminder logic here
      alert('Reminders sent successfully!');
    } catch (error) {
      console.error('Error sending reminders:', error);
      alert('Failed to send reminders');
    }
  };

  return (
    <div className="fade-in">
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Due Fees Report</h2>
          <div className="actions">
            <button onClick={sendReminders} className="btn btn-primary">
              Send Reminders
            </button>
          </div>
        </div>
        <div className="card-body">
          <div className="report-header">
            <h3>
              Due Fees for {currentMonth} {currentYear}
            </h3>
            <div className="summary">
              <div className="summary-item">
                <span className="summary-label">Total Due:</span>
                <span className="summary-value">
                  ₹{dueFees?.reduce((sum, fee) => sum + (fee.amount || 0), 0).toLocaleString()}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Students:</span>
                <span className="summary-value">{dueFees?.length}</span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading">Loading due fees report...</div>
          ) : (
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Room</th>
                    <th>Contact</th>
                    <th>Amount Due</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {dueFees?.length > 0 ? (
                    dueFees.map((fee) => (
                      <tr key={fee._id} className="slide-up">
                        <td>
                          <div className="student-info">
                            <div className="student-name">{fee.student?.name || 'N/A'}</div>
                            <div className="student-email">{fee.student?.user?.email || 'N/A'}</div>
                          </div>
                        </td>
                        <td>{fee.room?.roomNumber || 'N/A'}</td>
                        <td>{fee.student?.contactNumber || 'N/A'}</td>
                        <td>₹{fee.amount?.toLocaleString() || '0'}</td>
                        <td>
                          <span className={`badge badge-${fee.status}`}>
                            {fee.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="no-data">
                        No due fees found for this month
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

export default DueFeesReport;