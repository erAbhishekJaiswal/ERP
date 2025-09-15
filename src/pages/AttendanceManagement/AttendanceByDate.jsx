// pages/attendance/date/[subjectId]/[date].js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../services/axios';

const AttendanceByDate = () => {
  const {subjectid, date} = useParams();
  const [attendance, setAttendance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(subjectid || '');
  const [selectedDate, setSelectedDate] = useState(date || '');

  // Fetch attendance when subject or date changes
  useEffect( () => {  
    const fetchAttendance = async () => {
       try {
      setLoading(true);
      setError(null);
      const response = await apiClient.get(
        `/api/attendance/subject/${subjectid}/date/${date}`
      );
      setAttendance(response.data);
      console.log(response.data);
    } catch (err) {
      console.error('Error fetching attendance:', err);
      setError('Failed to load attendance data');
      setAttendance(null);
    } finally {
      setLoading(false);
    }
  };
    if (subjectid && date) {
      fetchAttendance(); 
    } else {
      setAttendance(null);
    }
  }, [subjectid, date]);


  const handleStatusChange = (index, newStatus) => {
    const updated = { ...attendance };
    updated.attendance.attendancedata[index].status = newStatus;
    
    // Update counts if needed
    if (attendance.attendance.attendancedata[index].status !== newStatus) {
      const oldStatus = attendance.attendance.attendancedata[index].status;
      
      if (oldStatus === 'Present' && newStatus !== 'Present') {
        updated.attendance.datewisePresent -= 1;
        updated.attendance.datewiseAbsent += 1;
      } else if (oldStatus !== 'Present' && newStatus === 'Present') {
        updated.attendance.datewisePresent += 1;
        updated.attendance.datewiseAbsent -= 1;
      }
    }
    
    setAttendance(updated);
    console.log(updated);
    
  };

  const handleSaveAll = async () => {
    try {
      // console.log(attendance.attendance.attendancedata);
      setLoading(true);
      const res = await apiClient.put(
        `/api/attendance/${subjectid}/${date}`,
        {
          attendancedata: attendance.attendance.attendancedata,
          datewisePresent: attendance.attendance.datewisePresent,
          datewiseAbsent: attendance.attendance.datewiseAbsent
        }
      );
      console.log(res.data);
      
      setEditMode(false);
      alert('Attendance updated successfully!');
    } catch (err) {
      console.error('Error updating attendance:', err);
      alert('Failed to update attendance');
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : '';

  return (
    <div className="attendance-detail-container">
      <div className="header">
        <h1>Attendance Record</h1>
         {/* {selectedSubject && ( */}
              <Link to={`/faculty/attendance-by-subject`}>
                <li style={{listStyleType:"none"}} className="back-btn">Back to Subject</li>
              </Link>
            {/* )} */}
      </div>

      {
      loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading attendance data...</p>
        </div>

      ) : error ? (
        <div className="error-container">
          <p style={{display:"contents"}} className="error-message">{error}</p>
        </div>
      ) : !attendance ? (
        <div className="not-found-container">
          <p>No attendance record found for selected date</p>
        </div>
      ) : (
        <>

        {/* <h1>Attendance Record</h1> */}
        <div className="attendancedetailbox">
          <h2>{formattedDate}</h2>
          <div className="subject-info">
            <span className="subject-name">{attendance?.subject?.name}</span>
            <span className="subject-code">{attendance?.subject?.code}</span>
          </div>
          </div>
          
          <div className="summary-cards">
            <div className="card present-card">
              <div className="card-value">{attendance?.attendance?.datewisePresent}</div>
              <div className="card-label">Present</div>
            </div>
            
            <div className="card absent-card">
              <div className="card-value">{attendance?.attendance?.datewiseAbsent}</div>
              <div className="card-label">Absent</div>
            </div>
            
            <div className="card total-card">
              <div className="card-value">
                {attendance?.attendance?.datewisePresent + attendance?.attendance?.datewiseAbsent}
              </div>
              <div className="card-label">Total Students</div>
            </div>
          </div>
          
          <div className="meta-info">
            <div className="info-item">
              <span className="info-label">Faculty:</span>
              <span className="info-value">
                {attendance?.faculty?.fullName || 'Faculty ID: ' + attendance?.faculty?._id}
              </span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Session Type:</span>
              <span className="info-value">{attendance?.sessionType}</span>
            </div>
            
            <div className="info-item">
              <span className="info-label">Last Updated:</span>
              <span className="info-value">
                {new Date(attendance?.updatedAt).toLocaleString()}
              </span>
            </div>
          </div>
          
          <div className="attendance-table-container">
            <div className="table-header">
              <h3>Student Attendance</h3>
              <button 
                onClick={() => setEditMode(!editMode)}
                className="edit-btn"
                disabled={loading}
              >
                {editMode ? 'Cancel Edit' : 'Edit Attendance'}
              </button>
            </div>
            
            <table className="attendance-table">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Student Name</th>
                  <th>Roll Number</th>
                  <th>Status</th>
                  {editMode && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {attendance?.attendance?.attendancedata?.map((record, index) => (
                  <tr key={record?.studentId?._id}>
                    <td>{index + 1}</td>
                    <td>{record?.studentId?.fullName}</td>
                    <td>{record?.studentId?.rollNumber || 'N/A'}</td>
                    <td>
                      {editMode ? (
                        <select
                          className={`status-select ${record?.status?.toLowerCase()}`}
                          value={record?.status}
                          onChange={(e) => handleStatusChange(index, e.target.value)}
                          disabled={loading}
                        >
                          <option value="Present">Present</option>
                          <option value="Absent">Absent</option>
                          <option value="Leave">Leave</option>
                        </select>
                      ) : (
                        <span className={`status-badge ${record?.status?.toLowerCase()}`}>
                          {record?.status}
                        </span>
                      )}
                    </td>
                    {editMode && (
                      <td>
                        <button 
                          className="action-btn save-btn"
                          onClick={() => {
                            // Implement individual save if needed
                          }}
                          disabled={loading}
                        >
                          Save
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="action-buttons">
           
            
            {editMode && (
              <button 
                className="save-all-btn"
                onClick={handleSaveAll}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save All Changes'}
              </button>
            )}
          </div>
        </>
      )
      }

      <style>{`
  .attendance-detail-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .selection-fields {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin: 20px 0;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

  .form-group {
    flex: 1 1 100%;
  }

  @media (min-width: 600px) {
    .form-group {
      flex: 1;
    }
  }

  .form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: #34495e;
  }

  .form-group select,
  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }

  .selection-prompt,
  .loading-container,
  .error-container,
  .not-found-container {
    text-align: center;
    padding: 40px 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
    color: #7f8c8d;
    margin-top: 20px;
  }

  .spinner {
    display: inline-block;
    width: 40px;
    height: 40px;
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-radius: 50%;
    border-top-color: #3498db;
    animation: spin 1s ease-in-out infinite;
    margin-bottom: 20px;
  }

  .error-message {
    color: #e74c3c;
    font-size: 1.2rem;
    margin-bottom: 20px;
  }

  .header {
    text-align: center;
    margin-bottom: 10px;
  }

  .header h1 {
    color: #2c3e50;
    margin-bottom: 5px;
  }

  .header h2 {
    color: #7f8c8d;
    font-size: 1.3rem;
    margin-top: 0;
  }

  .subject-info {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin: 10px 0 20px;
  }

  .subject-name {
    font-size: 1.1rem;
    font-weight: 600;
    color: #3498db;
  }

  .subject-code {
    background-color: #f1f1f1;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.9rem;
    color: #7f8c8d;
  }

  .summary-cards {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    margin-bottom: 30px;
  }

  .card {
    flex: 1 1 100px;
    min-width: 100px;
    max-width: 160px;
    padding: 20px;
    border-radius: 8px;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .present-card { background-color: #d5f5e3; color: #27ae60; }
  .absent-card { background-color: #fadbd8; color: #e74c3c; }
  .total-card  { background-color: #d6eaf8; color: #2980b9; }

  .card-value {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 5px;
  }

  .card-label {
    font-size: 0.9rem;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  .meta-info {
    background-color: #f8f9fa;
    padding: 15px 20px;
    border-radius: 8px;
    margin-bottom: 30px;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;
  }

  .info-label {
    font-weight: 600;
    color: #34495e;
    margin-bottom: 4px;
  }

  .info-value {
    color: #7f8c8d;
  }

  @media (min-width: 600px) {
    .info-item {
      flex-direction: row;
    }

    .info-label {
      min-width: 120px;
    }
  }

  .attendance-table-container {
    margin-bottom: 30px;
    overflow-x: auto;
  }

  .table-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    margin-bottom: 15px;
  }

  @media (min-width: 600px) {
    .table-header {
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
    }
  }

  .table-header h3 {
    color: #2c3e50;
    margin: 0;
  }

  .edit-btn {
    background-color: #f39c12;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s;
  }

  .edit-btn:hover:not(:disabled) {
    background-color: #e67e22;
  }

  .edit-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .attendance-table {
    width: 100%;
    min-width: 600px;
    border-collapse: collapse;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }

  .attendance-table th,
  .attendance-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }

  .attendance-table th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #2c3e50;
  }

  .status-badge {
    display: inline-block;
    padding: 5px 10px;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }

  .status-badge.present { background-color: #d5f5e3; color: #27ae60; }
  .status-badge.absent  { background-color: #fadbd8; color: #e74c3c; }
  .status-badge.leave   { background-color: #fdebd0; color: #f39c12; }

  .status-select {
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid #ddd;
    font-size: 14px;
    cursor: pointer;
  }

  .status-select.present { background-color: #d5f5e3; border-color: #2ecc71; }
  .status-select.absent  { background-color: #fadbd8; border-color: #e74c3c; }
  .status-select.leave   { background-color: #fdebd0; border-color: #f39c12; }

  .action-btn {
    padding: 6px 12px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.85rem;
    transition: all 0.3s;
  }

  .save-btn {
    background-color: #27ae60;
    color: white;
  }

  .save-btn:hover {
    background-color: #219653;
  }

  .action-buttons {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
  }

  @media (min-width: 480px) {
    .action-buttons {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  .back-btn {
    background-color: transparent;
    color: #3498db;
    border: 1px solid #3498db;
    padding: 10px 20px;
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.3s;
  }

  .back-btn:hover {
    background-color: #ebf5fb;
  }

  .save-all-btn {
    background-color: #27ae60;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .save-all-btn:hover:not(:disabled) {
    background-color: #219653;
  }

  .save-all-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`}</style>

    </div>
  );
};

export default AttendanceByDate;








