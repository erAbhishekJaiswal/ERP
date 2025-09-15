// pages/attendance/student/[studentId].js
import React, { useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';

// Mock data
const mockStudent = {
  _id: 'stu1',
  personal_details: {
    first_name: 'John',
    last_name: 'Doe'
  },
  academic_details: {
    enrollment_number: 'S001'
  }
};

const mockAttendanceRecords = [
  {
    date: '2023-06-15T00:00:00.000Z',
    subjectId: 'sub1',
    subjectName: 'Mathematics',
    subjectCode: 'MATH101',
    status: 'Present'
  },
  {
    date: '2023-06-14T00:00:00.000Z',
    subjectId: 'sub1',
    subjectName: 'Mathematics',
    subjectCode: 'MATH101',
    status: 'Present'
  },
  {
    date: '2023-06-10T00:00:00.000Z',
    subjectId: 'sub1',
    subjectName: 'Mathematics',
    subjectCode: 'MATH101',
    status: 'Absent'
  },
  {
    date: '2023-06-08T00:00:00.000Z',
    subjectId: 'sub2',
    subjectName: 'Physics',
    subjectCode: 'PHY101',
    status: 'Present'
  }
];

const mockSummary = [
  {
    subjectId: 'sub1',
    subjectName: 'Mathematics',
    subjectCode: 'MATH101',
    totalClasses: 3,
    presentCount: 2,
    absentCount: 1,
    attendancePercentage: '66.67'
  },
  {
    subjectId: 'sub2',
    subjectName: 'Physics',
    subjectCode: 'PHY101',
    totalClasses: 1,
    presentCount: 1,
    absentCount: 0,
    attendancePercentage: '100.00'
  }
];

const StudentAttendance = () => {
//   const router = useRouter();
const navigate = useNavigate();
  const { studentId } = useParams();
  const [student, setStudent] = useState(mockStudent);
  const [activeTab, setActiveTab] = useState('summary');
  const [attendanceRecords, setAttendanceRecords] = useState(mockAttendanceRecords);
  const [summary, setSummary] = useState(mockSummary);

  const studentName = `${student.personal_details.first_name} ${student.personal_details.last_name}`;
  const rollNumber = student.academic_details.enrollment_number;

  return (
    <div className="student-attendance-container">
      <div className="student-header">
        <h1>{studentName}</h1>
        <h2>Roll Number: {rollNumber}</h2>
      </div>
      
      <div className="tabs">
        <button 
          className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
          onClick={() => setActiveTab('summary')}
        >
          Summary
        </button>
        <button 
          className={`tab-btn ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Detailed Records
        </button>
      </div>
      
      {activeTab === 'summary' && (
        <div className="summary-section">
          <h3>Attendance Summary by Subject</h3>
          
          <div className="summary-cards">
            {summary.map((subject, index) => (
              <div key={subject.subjectId} className="subject-card">
                <div className="subject-header">
                  <h4>{subject.subjectName}</h4>
                  <span className="subject-code">{subject.subjectCode}</span>
                </div>
                
                <div className="attendance-stats">
                  <div className="stat">
                    <span className="stat-value">{subject.presentCount}</span>
                    <span className="stat-label">Present</span>
                  </div>
                  
                  <div className="stat">
                    <span className="stat-value">{subject.absentCount}</span>
                    <span className="stat-label">Absent</span>
                  </div>
                  
                  <div className="stat">
                    <span className="stat-value">{subject.totalClasses}</span>
                    <span className="stat-label">Total Classes</span>
                  </div>
                </div>
                
                <div className="attendance-percentage">
                  <div className="percentage-bar-container">
                    <div 
                      className="percentage-bar"
                      style={{ width: `${subject.attendancePercentage}%` }}
                    ></div>
                  </div>
                  <span className="percentage-text">{subject.attendancePercentage}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeTab === 'details' && (
        <div className="details-section">
          <h3>Detailed Attendance Records</h3>
          
          <div className="table-container">
            <table className="records-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords.map((record, index) => (
                  <tr key={index}>
                    <td>
                      {new Date(record.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        weekday: 'short'
                      })}
                    </td>
                    <td>
                      {record.subjectName} ({record.subjectCode})
                    </td>
                    <td>
                      <span className={`status-badge ${record.status.toLowerCase()}`}>
                        {record.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <style jsx>{`
        .student-attendance-container {
          max-width: 1000px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .student-header {
          text-align: center;
          margin-bottom: 30px;
        }
        
        .student-header h1 {
          color: #2c3e50;
          margin-bottom: 5px;
        }
        
        .student-header h2 {
          color: #7f8c8d;
          font-size: 1.2rem;
          margin-top: 0;
        }
        
        .tabs {
          display: flex;
          border-bottom: 1px solid #ddd;
          margin-bottom: 30px;
        }
        
        .tab-btn {
          padding: 10px 20px;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          color: #7f8c8d;
        }
        
        .tab-btn.active {
          color: #3498db;
          border-bottom-color: #3498db;
          font-weight: 600;
        }
        
        .tab-btn:hover {
          color: #2980b9;
        }
        
        .summary-section h3,
        .details-section h3 {
          color: #2c3e50;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
        
        .summary-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }
        
        .subject-card {
          background: #fff;
          border-radius: 8px;
          padding: 20px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .subject-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .subject-header h4 {
          margin: 0;
          color: #2c3e50;
        }
        
        .subject-code {
          background-color: #f1f1f1;
          padding: 3px 8px;
          border-radius: 4px;
          font-size: 0.9rem;
          color: #7f8c8d;
        }
        
        .attendance-stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-value {
          display: block;
          font-size: 1.5rem;
          font-weight: 600;
          color: #2c3e50;
        }
        
        .stat-label {
          font-size: 0.8rem;
          color: #7f8c8d;
          text-transform: uppercase;
        }
        
        .attendance-percentage {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .percentage-bar-container {
          flex-grow: 1;
          height: 10px;
          background-color: #ecf0f1;
          border-radius: 5px;
          overflow: hidden;
        }
        
        .percentage-bar {
          height: 100%;
          background-color: #27ae60;
        }
        
        .percentage-text {
          font-weight: 600;
          color: #2c3e50;
          min-width: 50px;
        }
        
        .details-section {
          margin-top: 20px;
        }
        
        .table-container {
          overflow-x: auto;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
        }
        
        .records-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .records-table th,
        .records-table td {
          padding: 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        .records-table th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #2c3e50;
        }
        
        .records-table tr:hover {
          background-color: #f9f9f9;
        }
        
        .status-badge {
          display: inline-block;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        }
        
        .status-badge.present {
          background-color: #d5f5e3;
          color: #27ae60;
        }
        
        .status-badge.absent {
          background-color: #fadbd8;
          color: #e74c3c;
        }
      `}</style>
    </div>
  );
};

export default StudentAttendance;