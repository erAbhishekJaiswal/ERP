// pages/attendance/edit/[subjectId]/[date].js
import React, { useState } from 'react';
// import { useRouter } from 'next/router';
import { useNavigate, useParams} from 'react-router-dom';

// Mock data
const mockAttendance = {
  _id: 'att1',
  subject: {
    _id: 'sub1',
    name: 'Mathematics',
    code: 'MATH101'
  },
  faculty: {
    _id: 'fac1',
    name: 'Dr. Smith',
    employeeId: 'FAC001'
  },
  sessionType: 'Lecture',
  attendance: {
    date: '2023-06-15T00:00:00.000Z',
    datewisePresent: 45,
    datewiseAbsent: 5,
    attendancedata: [
      {
        studentId: {
          _id: 'stu1',
          fullName: 'John Doe',
          rollNumber: 'S001'
        },
        status: 'Present'
      },
      {
        studentId: {
          _id: 'stu2',
          fullName: 'Jane Smith',
          rollNumber: 'S002'
        },
        status: 'Absent'
      }
    ]
  }
};

const UpdateAttendance = () => {
//   const router = useRouter();
const navigate = useNavigate();
  const { subjectId, date } = useParams();
  const [attendance, setAttendance] = useState(mockAttendance);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Mock API call
      console.log('Updating attendance:', attendance);
      setTimeout(() => {
        navigate(`/attendance/date/${subjectId}/${date}`);
      }, 1000);
    } catch (err) {
      alert('Error updating attendance');
    } finally {
      setSaving(false);
    }
  };

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="edit-attendance-container">
      <div className="header">
        <h1>Edit Attendance</h1>
        <h2>{formattedDate}</h2>
        
        <div className="subject-info">
          <span className="subject-name">{attendance.subject.name}</span>
          <span className="subject-code">{attendance.subject.code}</span>
        </div>
      </div>
      
      <div className="meta-info">
        <div className="info-item">
          <span className="info-label">Faculty:</span>
          <span className="info-value">{attendance.faculty.name}</span>
        </div>
        
        <div className="info-item">
          <span className="info-label">Session Type:</span>
          <span className="info-value">{attendance.sessionType}</span>
        </div>
      </div>
      
      <div className="stats-summary">
        <div className="stat present">
          <span className="stat-value">{attendance.attendance.datewisePresent}</span>
          <span className="stat-label">Present</span>
        </div>
        
        <div className="stat absent">
          <span className="stat-value">{attendance.attendance.datewiseAbsent}</span>
          <span className="stat-label">Absent</span>
        </div>
        
        <div className="stat total">
          <span className="stat-value">
            {attendance.attendance.datewisePresent + attendance.attendance.datewiseAbsent}
          </span>
          <span className="stat-label">Total</span>
        </div>
      </div>
      
      <div className="attendance-table-container">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {attendance.attendance.attendancedata.map((record, index) => (
              <tr key={record.studentId._id}>
                <td>{record.studentId.fullName}</td>
                <td>{record.studentId.rollNumber}</td>
                <td>
                  <select
                    className={`status-select ${record.status.toLowerCase()}`}
                    value={record.status}
                    onChange={(e) => {
                      const updated = {...attendance};
                      updated.attendance.attendancedata[index].status = e.target.value;
                      
                      // Update counts
                      if (record.status === 'Present' && e.target.value !== 'Present') {
                        updated.attendance.datewisePresent -= 1;
                        updated.attendance.datewiseAbsent += 1;
                      } else if (record.status !== 'Present' && e.target.value === 'Present') {
                        updated.attendance.datewisePresent += 1;
                        updated.attendance.datewiseAbsent -= 1;
                      }
                      
                      setAttendance(updated);
                    }}
                  >
                    <option value="Present">Present</option>
                    <option value="Absent">Absent</option>
                    <option value="Leave">Leave</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="action-buttons">
        <button 
          className="cancel-btn"
          onClick={() => router.push(`/attendance/date/${subjectId}/${date}`)}
        >
          Cancel
        </button>
        
        <button 
          className="save-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <style jsx>{`
        .edit-attendance-container {
          max-width: 900px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .header h1 {
          color: #2c3e50;
          margin-bottom: 5px;
        }
        
        .header h2 {
          color: #7f8c8d;
          font-size: 1.2rem;
          margin-top: 0;
        }
        
        .subject-info {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-top: 10px;
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
        
        .meta-info {
          display: flex;
          gap: 30px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eee;
        }
        
        .info-item {
          display: flex;
          gap: 10px;
        }
        
        .info-label {
          font-weight: 600;
          color: #34495e;
        }
        
        .info-value {
          color: #7f8c8d;
        }
        
        .stats-summary {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-bottom: 30px;
        }
        
        .stat {
          text-align: center;
          padding: 15px 25px;
          border-radius: 8px;
          min-width: 100px;
        }
        
        .present {
          background-color: #d5f5e3;
          color: #27ae60;
        }
        
        .absent {
          background-color: #fadbd8;
          color: #e74c3c;
        }
        
        .total {
          background-color: #d6eaf8;
          color: #2980b9;
        }
        
        .stat-value {
          display: block;
          font-size: 1.8rem;
          font-weight: 700;
        }
        
        .stat-label {
          font-size: 0.9rem;
          text-transform: uppercase;
        }
        
        .attendance-table-container {
          margin-bottom: 30px;
          overflow-x: auto;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        
        .attendance-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .attendance-table th,
        .attendance-table td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        .attendance-table th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #2c3e50;
        }
        
        .attendance-table tr:hover {
          background-color: #f9f9f9;
        }
        
        .status-select {
          padding: 8px 12px;
          border-radius: 4px;
          border: 1px solid #ddd;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .status-select.present {
          background-color: #d5f5e3;
          border-color: #2ecc71;
        }
        
        .status-select.absent {
          background-color: #fadbd8;
          border-color: #e74c3c;
        }
        
        .status-select.leave {
          background-color: #fdebd0;
          border-color: #f39c12;
        }
        
        .action-buttons {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
        }
        
        .save-btn, .cancel-btn {
          padding: 10px 20px;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
        }
        
        .save-btn {
          background-color: #27ae60;
          color: white;
          border: none;
          min-width: 150px;
        }
        
        .save-btn:hover {
          background-color: #219653;
        }
        
        .save-btn:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
        }
        
        .cancel-btn {
          background-color: transparent;
          border: 1px solid #bdc3c7;
          color: #7f8c8d;
        }
        
        .cancel-btn:hover {
          background-color: #f5f5f5;
        }
      `}</style>
    </div>
  );
};

export default UpdateAttendance;