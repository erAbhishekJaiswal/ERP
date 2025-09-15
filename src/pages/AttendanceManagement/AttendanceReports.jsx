import React, { useState } from 'react';
import "./AttendenceStyles.css";
// import './FacultyStyles.css';

const AttendanceReports = () => {
  const [reportType, setReportType] = useState('class');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const sampleReportData = {
    'CS-3A': {
      'Data Structures': { present: 45, absent: 5, late: 3, excused: 2 },
      'Algorithms': { present: 42, absent: 8, late: 2, excused: 3 }
    },
    'CS-3B': {
      'Database Systems': { present: 38, absent: 7, late: 5, excused: 0 }
    }
  };

  return (
    <div className="reports-container">
      <h2>Attendance Reports</h2>
      
      <div className="report-filters">
        <div className="filter-group">
          <label>Report Type</label>
          <select value={reportType} onChange={(e) => setReportType(e.target.value)}>
            <option value="class">Class Report</option>
            <option value="department">Department Report</option>
            <option value="subject">Subject Report</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Date Range</label>
          <div className="date-range">
            <input 
              type="date" 
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              placeholder="Start Date"
            />
            <span>to</span>
            <input 
              type="date" 
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              placeholder="End Date"
            />
          </div>
        </div>

        <button className="btn generate-btn">
          Generate Report
        </button>
      </div>

      <div className="report-results">
        <h3>Attendance Summary</h3>
        
        {Object.entries(sampleReportData).map(([className, subjects]) => (
          <div key={className} className="class-report">
            <h4>{className}</h4>
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Late</th>
                  <th>Excused</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(subjects).map(([subject, stats]) => {
                  const total = stats.present + stats.absent + stats.late + stats.excused;
                  const percentage = ((stats.present + stats.excused * 0.5) / total * 100).toFixed(1);
                  
                  return (
                    <tr key={subject}>
                      <td>{subject}</td>
                      <td>{stats.present}</td>
                      <td>{stats.absent}</td>
                      <td>{stats.late}</td>
                      <td>{stats.excused}</td>
                      <td>
                        <div className="percentage-bar">
                          <div 
                            className="bar-fill" 
                            style={{ width: `${percentage}%` }}
                          ></div>
                          <span>{percentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="report-actions">
        <button className="btn export-btn">
          <i className="fas fa-file-pdf"></i> Export as PDF
        </button>
        <button className="btn export-btn">
          <i className="fas fa-file-csv"></i> Export as CSV
        </button>
      </div>
    </div>
  );
};

export default AttendanceReports;