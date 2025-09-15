import React, { useState } from 'react';
import "./AttendenceStyles.css";
// import './FacultyStyles.css';

const AttendanceRecording = () => {
  const [selectedClass, setSelectedClass] = useState('CS-3A');
  const [selectedSubject, setSelectedSubject] = useState('Data Structures');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const students = [
    { id: 'S001', name: 'John Doe', status: 'present' },
    { id: 'S002', name: 'Jane Smith', status: 'present' },
    { id: 'S003', name: 'Robert Johnson', status: 'absent' },
    { id: 'S004', name: 'Emily Davis', status: 'late' },
  ];

  const handleStatusChange = (studentId, newStatus) => {
    // Update status logic here
  };

  const handleSubmit = () => {
    // Submit logic here
  };

  return (
    <div className="attendance-container">
      <h2>Record Attendance</h2>
      
      <div className="attendance-controls">
        <div className="form-group">
          <label>Department</label>
          <select>
            <option>Computer Science</option>
            <option>Electrical Engineering</option>
            <option>Mechanical Engineering</option>
          </select>
        </div>

        <div className="form-group">
          <label>Class</label>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option>CS-3A</option>
            <option>CS-3B</option>
            <option>CS-4A</option>
          </select>
        </div>

        <div className="form-group">
          <label>Subject</label>
          <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
            <option>Data Structures</option>
            <option>Algorithms</option>
            <option>Database Systems</option>
          </select>
        </div>

        <div className="form-group">
          <label>Date</label>
          <input 
            type="date" 
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
      </div>

      <div className="attendance-list">
        <h3>Students in {selectedClass}</h3>
        <table>
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map(student => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>
                  <select 
                    value={student.status}
                    onChange={(e) => handleStatusChange(student.id, e.target.value)}
                    className={`status-select ${student.status}`}
                  >
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                    <option value="late">Late</option>
                    <option value="excused">Excused</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="attendance-actions">
        <button className="btn save-btn" onClick={handleSubmit}>
          Save Attendance
        </button>
        <button className="btn cancel-btn">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AttendanceRecording;