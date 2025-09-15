// import React from 'react';
// import "./AttendenceStyles.css";
// // import './FacultyStyles.css';

// const FacultyDashboard = () => {
//   return (
//     <div className="faculty-container">
//       <header className="dashboard-header">
//         <h1>Faculty Dashboard</h1>
//         {/* <div className="user-profile">
//           <span>Welcome, Dr. Smith</span>
//           <div className="profile-pic">JS</div>
//         </div> */}
//       </header>

//       <div className="dashboard-content">
//         <div className="quick-actions">
//           <button className="action-btn primary">
//             <i className="fas fa-calendar-plus"></i> Take Attendance
//           </button>
//           <button className="action-btn secondary">
//             <i className="fas fa-chart-pie"></i> View Reports
//           </button>
//           <button className="action-btn tertiary">
//             <i className="fas fa-cog"></i> Manage Classes
//           </button>
//         </div>

//         <div className="stats-cards">
//           <div className="stat-card">
//             <h3>Today's Classes</h3>
//             <p className="stat-value">3</p>
//           </div>
//           <div className="stat-card">
//             <h3>Pending Records</h3>
//             <p className="stat-value">12</p>
//           </div>
//           <div className="stat-card">
//             <h3>Total Students</h3>
//             <p className="stat-value">187</p>
//           </div>
//         </div>

//         <div className="recent-activity">
//           <h2>Recent Attendance</h2>
//           <table className="activity-table">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Subject</th>
//                 <th>Class</th>
//                 <th>Status</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr>
//                 <td>15 Apr 2023</td>
//                 <td>Data Structures</td>
//                 <td>CS-3A</td>
//                 <td><span className="status recorded">Recorded</span></td>
//               </tr>
//               <tr>
//                 <td>14 Apr 2023</td>
//                 <td>Algorithms</td>
//                 <td>CS-3B</td>
//                 <td><span className="status pending">Pending</span></td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FacultyDashboard;






import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./AttendenceStyles.css";
import apiClient from '../../services/axios';

const FacultyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showManageClasses, setShowManageClasses] = useState(false);
  const [showReports, setShowReports] = useState(false);

  // Sample data
  const [classes, setClasses] = useState([
    { id: 1, name: 'CS-3A', subject: 'Data Structures', time: '9:00 AM' },
    { id: 2, name: 'CS-3B', subject: 'Algorithms', time: '11:00 AM' },
    { id: 3, name: 'CS-2A', subject: 'Database Systems', time: '2:00 PM' }
  ]);

  const handleTakeAttendance = () => {
    setShowAttendanceModal(true);
    // In a real app, you might navigate to a dedicated page:
    // navigate('/take-attendance');
  };

  const handleViewReports = () => {
    setShowReports(true);
    // navigate('/reports');
  };

  const handleManageClasses = () => {
    setShowManageClasses(true);
    // navigate('/manage-classes');
  };

  const closeModal = () => {
    setShowAttendanceModal(false);
    setShowManageClasses(false);
    setShowReports(false);
  };

  return (
    <div className="faculty-container">
      <header className="dashboard-header">
        <h1>Faculty Dashboard</h1>
      </header>

      <div className="dashboard-content-box">
        <div className="quick-actions">
          <button 
            className="action-btn primary" 
            onClick={handleTakeAttendance}
          >
            <i className="fas fa-calendar-plus"></i> Take Attendance
          </button>
          <button 
            className="action-btn secondary" 
            onClick={handleViewReports}
          >
            <i className="fas fa-chart-pie"></i> View Reports
          </button>
          <button 
            className="action-btn tertiary" 
            onClick={handleManageClasses}
          >
            <i className="fas fa-cog"></i> Manage Classes
          </button>
        </div>

        {/* Attendance Modal */}
        {showAttendanceModal && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Take Attendance</h2>
              <div className="modal-content">
                <p>Select a class to take attendance:</p>
                <ul className="class-list">
                  {classes.map(cls => (
                    <li key={cls.id} onClick={() => navigate(`/take-attendance/${cls.id}`)}>
                      {cls.name} - {cls.subject} ({cls.time})
                    </li>
                  ))}
                </ul>
              </div>
              <button className="close-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        )}

        {/* Manage Classes Modal */}
        {showManageClasses && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Manage Classes</h2>
              <div className="modal-content">
                <button className="add-class-btn">Add New Class</button>
                <table className="classes-table">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Subject</th>
                      <th>Time</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.map(cls => (
                      <tr key={cls.id}>
                        <td>{cls.name}</td>
                        <td>{cls.subject}</td>
                        <td>{cls.time}</td>
                        <td>
                          <button className="edit-btn">Edit</button>
                          <button className="delete-btn">Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button className="close-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        )}

        {/* Reports Modal */}
        {showReports && (
          <div className="modal-overlay">
            <div className="modal">
              <h2>Attendance Reports</h2>
              <div className="modal-content">
                <div className="report-filters">
                  <select>
                    <option>Select Class</option>
                    {classes.map(cls => (
                      <option key={cls.id} value={cls.id}>{cls.name}</option>
                    ))}
                  </select>
                  <input type="date" />
                  <button className="generate-btn">Generate Report</button>
                </div>
                <div className="report-preview">
                  <p>Report preview will appear here</p>
                  <button className="export-btn">Export as PDF</button>
                </div>
              </div>
              <button className="close-btn" onClick={closeModal}>Close</button>
            </div>
          </div>
        )}

        <div className="stats-cards">
          <div className="stat-card">
            <h3>Today's Classes</h3>
            <p className="stat-value">{classes.length}</p>
          </div>
          <div className="stat-card">
            <h3>Pending Records</h3>
            <p className="stat-value">12</p>
          </div>
          <div className="stat-card">
            <h3>Total Students</h3>
            <p className="stat-value">187</p>
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Attendance</h2>
          <table className="activity-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Subject</th>
                <th>Class</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>15 Apr 2023</td>
                <td>Data Structures</td>
                <td>CS-3A</td>
                <td><span className="status recorded">Recorded</span></td>
              </tr>
              <tr>
                <td>14 Apr 2023</td>
                <td>Algorithms</td>
                <td>CS-3B</td>
                <td><span className="status pending">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacultyDashboard;