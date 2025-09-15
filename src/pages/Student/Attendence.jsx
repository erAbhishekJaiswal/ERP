

// import React, { useState, useEffect } from 'react';
// import "../../CSSfolder/StudentCSS/attendence.css"
// import axios from 'axios';

// const Attendence = () => {
//   const [attendanceData, setAttendanceData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [activeTab, setActiveTab] = useState('summary');
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const studentId = localStorage.getItem('profileid');

//   useEffect(() => {
//     // Simulating API fetch
//     const fetchAttendanceData = async () => {
//       try {
//         // Replace with actual API call
//         // const response = await fetch('/api/attendance');
//         // const data = await response.json();
        
//         // Using mock data
//         // const mockData = {
//         //   "student": {
//         //     "id": "6802377c2856c00f8ae6b924",
//         //     "name": "Rahul Sharma",
//         //     "rollNumber": "EN20230001"
//         //   },
//         //   "attendanceRecords": [
//         //     {
//         //       "_id": "68036ddf68a18d140ad393f7",
//         //       "subjectId": "67f2471b30fb2746ed377832",
//         //       "date": "2025-05-01T00:00:00.000Z",
//         //       "subjectName": "Data Structures",
//         //       "subjectCode": "CS301",
//         //       "status": "Present",
//         //       "markedAt": "2025-05-06T17:11:46.682Z"
//         //     },
//         //     {
//         //       "_id": "68036ddf68a18d140ad393f7",
//         //       "subjectId": "67f2471b30fb2746ed377832",
//         //       "date": "2023-08-25T00:00:00.000Z",
//         //       "subjectName": "Data Structures",
//         //       "subjectCode": "CS301",
//         //       "status": "Present",
//         //       "markedAt": "2025-05-06T16:30:24.854Z"
//         //     },
//         //     {
//         //       "_id": "68036ddf68a18d140ad393f7",
//         //       "subjectId": "67f2471b30fb2746ed377832",
//         //       "date": "2023-08-16T00:00:00.000Z",
//         //       "subjectName": "Data Structures",
//         //       "subjectCode": "CS301",
//         //       "status": "Present",
//         //       "markedAt": "2025-04-19T09:58:33.543Z"
//         //     },
//         //     {
//         //       "_id": "68036ddf68a18d140ad393f7",
//         //       "subjectId": "67f2471b30fb2746ed377832",
//         //       "date": "2023-08-15T00:00:00.000Z",
//         //       "subjectName": "Data Structures",
//         //       "subjectCode": "CS301",
//         //       "status": "Present",
//         //       "markedAt": "2025-04-19T12:27:55.829Z"
//         //     }
//         //   ],
//         //   "summary": [
//         //     {
//         //       "subjectId": "67f2471b30fb2746ed377832",
//         //       "subjectName": "Data Structures",
//         //       "subjectCode": "CS301",
//         //       "totalClasses": 4,
//         //       "presentCount": 4,
//         //       "absentCount": 0,
//         //       "attendancePercentage": "100.00"
//         //     }
//         //   ]
//         // };

//         const res = await axios.get(`http://localhost:5000/api/attendance/${studentId}`);
//         console.log(res.data);

//         setAttendanceData(res.data);
//         setLoading(false);
//       } catch (err) {
//         console.log(err);
//         setError(err.message);
//         setLoading(false);
//       }
//     };

//     fetchAttendanceData();
//   }, []);

//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString(undefined, options);
//   };

//   const formatTime = (dateString) => {
//     const options = { hour: '2-digit', minute: '2-digit' };
//     return new Date(dateString).toLocaleTimeString(undefined, options);
//   };

//   const handleSubjectClick = (subject) => {
//     setSelectedSubject(subject);
//     setActiveTab('details');
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p>Loading attendance data...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-container">
//         <div className="error-icon">⚠️</div>
//         <h3>Error Loading Data</h3>
//         <p>{error}</p>
//         <button onClick={() => window.location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   if (!attendanceData || 
//       (!attendanceData.attendanceRecords || attendanceData.attendanceRecords.length === 0) && 
//       (!attendanceData.summary || attendanceData.summary.length === 0)) {
//     return (
//       <div className="no-data-container">
//         <div className="no-data-icon">📊</div>
//         <h3>No Attendance Records Found</h3>
//         <p>There are no attendance records available for this student.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="attendance-container">
//       <div className="student-header">
//         <div className="student-avatar">
//           {attendanceData.student.name.charAt(0)}
//         </div>
//         <div className="student-info">
//           <h2>{attendanceData.student.name}</h2>
//           <p>Roll Number: {attendanceData.student.rollNumber}</p>
//         </div>
//       </div>

//       <div className="tabs">
//         <button 
//           className={activeTab === 'summary' ? 'active' : ''}
//           onClick={() => setActiveTab('summary')}
//         >
//           Summary
//         </button>
//         <button 
//           className={activeTab === 'details' ? 'active' : ''}
//           onClick={() => setActiveTab('details')}
//           disabled={!selectedSubject && activeTab !== 'details'}
//         >
//           Details
//         </button>
//       </div>

//       {activeTab === 'summary' && (
//         <div className="summary-section">
//           <h3>Attendance Summary</h3>
//           <div className="summary-cards">
//             {attendanceData.summary.map((subject) => (
//               <div 
//                 key={subject.subjectId} 
//                 className="summary-card"
//                 onClick={() => handleSubjectClick(subject)}
//               >
//                 <div className="subject-header">
//                   <h4>{subject.subjectName}</h4>
//                   <span className="subject-code">{subject.subjectCode}</span>
//                 </div>
//                 <div className="attendance-percentage">
//                   <div 
//                     className="percentage-circle"
//                     style={{ 
//                       background: `conic-gradient(
//                         #4CAF50 0% ${subject.attendancePercentage}%, 
//                         #f0f0f0 ${subject.attendancePercentage}% 100%
//                       )`
//                     }}
//                   >
//                     <span>{subject.attendancePercentage}%</span>
//                   </div>
//                 </div>
//                 <div className="attendance-stats">
//                   <div className="stat">
//                     <span className="stat-label">Present</span>
//                     <span className="stat-value present">{subject.presentCount}</span>
//                   </div>
//                   <div className="stat">
//                     <span className="stat-label">Absent</span>
//                     <span className="stat-value absent">{subject.absentCount}</span>
//                   </div>
//                   <div className="stat">
//                     <span className="stat-label">Total</span>
//                     <span className="stat-value">{subject.totalClasses}</span>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {activeTab === 'details' && selectedSubject && (
//         <div className="details-section">
//           <div className="details-header">
//             <h3>{selectedSubject.subjectName} ({selectedSubject.subjectCode})</h3>
//             <button 
//               className="back-button"
//               onClick={() => setActiveTab('summary')}
//             >
//               ← Back to Summary
//             </button>
//           </div>
          
//           <div className="attendance-table-container">
//             <table className="attendance-table">
//               <thead>
//                 <tr>
//                   <th>Date</th>
//                   <th>Status</th>
//                   <th>Marked At</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {attendanceData.attendanceRecords
//                   .filter(record => record.subjectId === selectedSubject.subjectId)
//                   .sort((a, b) => new Date(b.date) - new Date(a.date))
//                   .map((record) => (
//                     <tr key={record._id}>
//                       <td>{formatDate(record.date)}</td>
//                       <td>
//                         <span className={`status-badge ${record.status.toLowerCase()}`}>
//                           {record.status}
//                         </span>
//                       </td>
//                       <td>
//                         {formatDate(record.markedAt)} at {formatTime(record.markedAt)}
//                       </td>
//                     </tr>
//                   ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Attendence;









import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaSearch, FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';
import "../../CSSfolder/StudentCSS/attendence.css"
import apiClient from '../../services/axios';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const statusColors = {
  present: '#4CAF50',
  absent: '#F44336',
  late: '#FFC107',
  excused: '#9C27B0'
};

const Attendence = () => {
  const studentid = localStorage.getItem('profileid');
  // console.log(studentid);
  
  // const { studentid } = useParams();
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'asc' });

  useEffect(() => {
    const fetchAttendanceData = async (studentid) => {
      try {
        const response = await apiClient.get(`/api/attendance/${studentid}`);
        setAttendanceData(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || 'Failed to fetch attendance data');
        setLoading(false);
      }
    };

    fetchAttendanceData(studentid);
  }, [studentid]);

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'present':
        return <FaCheckCircle style={{ color: statusColors.present }} />;
      case 'absent':
        return <FaTimesCircle style={{ color: statusColors.absent }} />;
      case 'late':
        return <FaQuestionCircle style={{ color: statusColors.late }} />;
      case 'excused':
        return <FaQuestionCircle style={{ color: statusColors.excused }} />;
      default:
        return null;
    }
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return <FaSort />;
    return sortConfig.direction === 'asc' ? <FaSortUp /> : <FaSortDown />;
  };

  const sortedData = () => {
    if (!attendanceData?.attendance) return [];

    let sortableItems = [...attendanceData.attendance];
    if (searchTerm) {
      sortableItems = sortableItems.filter(item =>
        item.subjectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.subjectCode.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sortableItems;
  };

  const getStatusDistribution = () => {
    if (!attendanceData?.attendance) return [];

    const statusCount = attendanceData.attendance.reduce((acc, record) => {
      acc[record.status] = (acc[record.status] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(statusCount).map(([name, value]) => ({
      name,
      value,
      color: statusColors[name.toLowerCase()] || '#8884d8'
    }));
  };

  const getSubjectDistribution = () => {
    if (!attendanceData?.attendance) return [];

    const subjectCount = attendanceData.attendance.reduce((acc, record) => {
      const key = `${record.subjectName} (${record.subjectCode})`;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(subjectCount).map(([name, value]) => ({
      name,
      value,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading attendance data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error}</p>
      </div>
    );
  }

  if (!attendanceData) {
    return (
      <div className="no-data-container">
        <h2>No Data Available</h2>
        <p>No attendance records found for this student.</p>
      </div>
    );
  }

  const statusData = getStatusDistribution();
  const subjectData = getSubjectDistribution();

  return (
    <div className="attendance-dashboard">
      <header className="dashboard-header">
        <h1>Attendance Dashboard</h1>
        <p className="student-id">Student ID: {attendanceData.studentId.toString()}</p>
      </header>

      <div className="stats-container">
        <div className="stat-card total">
          <h3>Total Records</h3>
          <p>{attendanceData.totalRecords}</p>
        </div>

        {statusData.map((status) => (
          <div 
            key={status.name} 
            className="stat-card" 
            style={{ borderLeft: `4px solid ${status.color}` }}
          >
            <h3>{status.name}</h3>
            <p>{status.value}</p>
          </div>
        ))}
      </div>

      <div className="charts-container">
        <div className="chart-card">
          <h3>Attendance Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {statusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Attendance by Subject</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={subjectData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Attendance Count">
                {subjectData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="data-table-container">
        <div className="table-header">
          <h2>Attendance Records</h2>
          <div className="search-box">
            
            <input
              type="text"
              placeholder="Search by subject..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            
          </div>
          {/* <FaSearch className="attendance-search-icon" /> */}
        </div>

        <div className="table-responsive">
          <table className="attendance-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('subjectName')}>
                  <div className="th-content">
                    Subject {getSortIcon('subjectName')}
                  </div>
                </th>
                <th onClick={() => handleSort('subjectCode')}>
                  <div className="th-content">
                    Code {getSortIcon('subjectCode')}
                  </div>
                </th>
                <th onClick={() => handleSort('sessionType')}>
                  <div className="th-content">
                    Session {getSortIcon('sessionType')}
                  </div>
                </th>
                <th onClick={() => handleSort('date')}>
                  <div className="th-content">
                    <FaCalendarAlt /> Date {getSortIcon('date')}
                  </div>
                </th>
                <th onClick={() => handleSort('status')}>
                  <div className="th-content">
                    Status {getSortIcon('status')}
                  </div>
                </th>
                <th>Marked At</th>
                {/* <th>Device Info</th> */}
              </tr>
            </thead>
            <tbody>
              {sortedData().map((record, index) => (
                <tr key={index}>
                  <td>{record.subjectName}</td>
                  <td>{record.subjectCode}</td>
                  <td>{record.sessionType}</td>
                  <td>{new Date(record.date).toLocaleDateString()}</td>
                  <td>
                    <span className="status-badge" style={{ backgroundColor: statusColors[record.status.toLowerCase()] || '#8884d8' }}>
                      {getStatusIcon(record.status)} {record.status}
                    </span>
                  </td>
                  <td>{new Date(record.markedAt).toLocaleString()}</td>
                  {/* <td>{record.deviceInfo || 'N/A'}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendence;