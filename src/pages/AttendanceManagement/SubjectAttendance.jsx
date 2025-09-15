// // pages/attendance/subject/[subjectId].js
// import React, { useState } from 'react';
// // import { useRouter } from 'next/router';
// // import Link from 'next/link';
// import { Link, useParams, useNavigate } from 'react-router-dom';

// // Mock data
// const mockSubject = {
//   _id: 'sub1',
//   name: 'Mathematics',
//   code: 'MATH101',
//   faculty: {
//     _id: 'fac1',
//     name: 'Dr. Smith'
//   }
// };

// const mockAttendanceRecords = [
//   {
//     date: '2023-06-15T00:00:00.000Z',
//     datewisePresent: 45,
//     datewiseAbsent: 5,
//     attendancedata: [
//       {
//         studentId: {
//           _id: 'stu1',
//           personal_details: { first_name: 'John', last_name: 'Doe' },
//           rollNumber: 'S001'
//         },
//         status: 'Present'
//       }
//     ]
//   },
//   {
//     date: '2023-06-10T00:00:00.000Z',
//     datewisePresent: 42,
//     datewiseAbsent: 8,
//     attendancedata: [
//       {
//         studentId: {
//           _id: 'stu1',
//           personal_details: { first_name: 'John', last_name: 'Doe' },
//           rollNumber: 'S001'
//         },
//         status: 'Present'
//       }
//     ]
//   }
// ];

// const SubjectAttendance = () => {
//   const navigate = useNavigate();
//   const { subjectId } = useParams();
//   const [subject, setSubject] = useState(mockSubject);
//   const [attendanceRecords, setAttendanceRecords] = useState(mockAttendanceRecords);
//   const [totalPresent, setTotalPresent] = useState(87);
//   const [totalAbsent, setTotalAbsent] = useState(13);

//   return (
//     <div className="subject-attendance-container">
//       <div className="header">
//         <h1>{subject.name} Attendance</h1>
//         <div className="subject-info">
//           <span className="subject-code">{subject.code}</span>
//           <span className="faculty-name">Faculty: {subject.faculty.name}</span>
//         </div>
//       </div>
      
//       <div className="summary-section">
//         <div className="summary-card total-classes">
//           <div className="card-value">{attendanceRecords.length}</div>
//           <div className="card-label">Total Classes</div>
//         </div>
        
//         <div className="summary-card present">
//           <div className="card-value">{totalPresent}</div>
//           <div className="card-label">Total Present</div>
//         </div>
        
//         <div className="summary-card absent">
//           <div className="card-value">{totalAbsent}</div>
//           <div className="card-label">Total Absent</div>
//         </div>
        
//         <div className="summary-card percentage">
//           <div className="card-value">
//             {Math.round((totalPresent / (totalPresent + totalAbsent)) * 100)}%
//           </div>
//           <div className="card-label">Overall Attendance</div>
//         </div>
//       </div>
      
//       <div className="actions-section">
//         <Link href={`/attendance/mark?subjectId=${subjectId}`}>
//           <a className="mark-attendance-btn">
//             Mark New Attendance
//           </a>
//         </Link>
        
//         <button className="export-btn">
//           Export to Excel
//         </button>
//       </div>
      
//       <div className="attendance-records">
//         <h2>Attendance Records</h2>
        
//         <div className="table-container">
//           <table className="records-table">
//             <thead>
//               <tr>
//                 <th>Date</th>
//                 <th>Present</th>
//                 <th>Absent</th>
//                 <th>Attendance %</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {attendanceRecords.map((record, index) => {
//                 const attendancePercentage = Math.round(
//                   (record.datewisePresent / (record.datewisePresent + record.datewiseAbsent)) * 100
//                 );
                
//                 return (
//                   <tr key={index}>
//                     <td>
//                       {new Date(record.date).toLocaleDateString('en-US', {
//                         weekday: 'short',
//                         year: 'numeric',
//                         month: 'short',
//                         day: 'numeric'
//                       })}
//                     </td>
//                     <td>{record.datewisePresent}</td>
//                     <td>{record.datewiseAbsent}</td>
//                     <td>
//                       <div className="percentage-bar-container">
//                         <div 
//                           className="percentage-bar"
//                           style={{ width: `${attendancePercentage}%` }}
//                         ></div>
//                         <span className="percentage-text">{attendancePercentage}%</span>
//                       </div>
//                     </td>
//                     <td>
//                       <Link href={`/attendance/date/${subjectId}/${record.date.split('T')[0]}`}>
//                         <a className="view-btn">View Details</a>
//                       </Link>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <style jsx>{`
//         .subject-attendance-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 20px;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }
        
//         .header {
//           margin-bottom: 30px;
//           text-align: center;
//         }
        
//         .header h1 {
//           color: #2c3e50;
//           margin-bottom: 10px;
//         }
        
//         .subject-info {
//           display: flex;
//           justify-content: center;
//           gap: 20px;
//           color: #7f8c8d;
//         }
        
//         .subject-code {
//           background-color: #f1f1f1;
//           padding: 3px 10px;
//           border-radius: 4px;
//           font-weight: 500;
//         }
        
//         .faculty-name {
//           font-style: italic;
//         }
        
//         .summary-section {
//           display: grid;
//           grid-template-columns: repeat(4, 1fr);
//           gap: 20px;
//           margin-bottom: 30px;
//         }
        
//         .summary-card {
//           padding: 20px;
//           border-radius: 8px;
//           text-align: center;
//           box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//         }
        
//         .total-classes {
//           background-color: #d6eaf8;
//           color: #2980b9;
//         }
        
//         .present {
//           background-color: #d5f5e3;
//           color: #27ae60;
//         }
        
//         .absent {
//           background-color: #fadbd8;
//           color: #e74c3c;
//         }
        
//         .percentage {
//           background-color: #ebdef0;
//           color: #8e44ad;
//         }
        
//         .card-value {
//           font-size: 2.2rem;
//           font-weight: 700;
//           margin-bottom: 5px;
//         }
        
//         .card-label {
//           font-size: 0.9rem;
//           text-transform: uppercase;
//           letter-spacing: 1px;
//         }
        
//         .actions-section {
//           display: flex;
//           justify-content: flex-end;
//           gap: 15px;
//           margin-bottom: 30px;
//         }
        
//         .mark-attendance-btn, .export-btn {
//           padding: 10px 20px;
//           border-radius: 4px;
//           font-size: 1rem;
//           cursor: pointer;
//           transition: all 0.3s;
//         }
        
//         .mark-attendance-btn {
//           background-color: #27ae60;
//           color: white;
//           text-decoration: none;
//           border: none;
//         }
        
//         .mark-attendance-btn:hover {
//           background-color: #219653;
//         }
        
//         .export-btn {
//           background-color: #f39c12;
//           color: white;
//           border: none;
//         }
        
//         .export-btn:hover {
//           background-color: #e67e22;
//         }
        
//         .attendance-records h2 {
//           color: #2c3e50;
//           margin-bottom: 20px;
//           padding-bottom: 10px;
//           border-bottom: 1px solid #eee;
//         }
        
//         .table-container {
//           overflow-x: auto;
//           box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
//           border-radius: 8px;
//         }
        
//         .records-table {
//           width: 100%;
//           border-collapse: collapse;
//         }
        
//         .records-table th,
//         .records-table td {
//           padding: 15px;
//           text-align: left;
//           border-bottom: 1px solid #eee;
//         }
        
//         .records-table th {
//           background-color: #f8f9fa;
//           font-weight: 600;
//           color: #2c3e50;
//         }
        
//         .records-table tr:hover {
//           background-color: #f9f9f9;
//         }
        
//         .percentage-bar-container {
//           display: flex;
//           align-items: center;
//           gap: 10px;
//         }
        
//         .percentage-bar {
//           height: 8px;
//           background-color: #27ae60;
//           border-radius: 4px;
//           min-width: 20px;
//         }
        
//         .percentage-text {
//           min-width: 40px;
//           text-align: right;
//         }
        
//         .view-btn {
//           color: #3498db;
//           text-decoration: none;
//           font-weight: 500;
//           transition: color 0.3s;
//         }
        
//         .view-btn:hover {
//           color: #2980b9;
//           text-decoration: underline;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SubjectAttendance;








// pages/attendance/subject/[subjectId].js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {Link} from 'react-router-dom';
import apiClient from '../../services/axios';

const SubjectAttendance = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [subject, setSubject] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [totalPresent, setTotalPresent] = useState(0);
  const [totalAbsent, setTotalAbsent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [subjectsList, setSubjectsList] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(subjectId);
  const facultyid = localStorage.getItem('profileid');

  // Fetch subjects list
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        // Replace with your actual API endpoint for fetching subjects
        const response = await apiClient.get('/api/features/subjectlist');

         // Filter subjects where faculty is assigned
      const facultySubjects = response.data.allSubject.filter(
        subject => subject.faculty?.facultyId === facultyid
      );

      setSubjectsList(facultySubjects);
        // setSubjectsList(response.data.allSubject);
        // console.log(response.data.allSubject);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching subjects:', err);
      }
    };
    
    fetchSubjects();
  }, []);

  // Fetch attendance data when subjectId changes
  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        // setLoading(true);
        const response = await apiClient.get(
          `/api/attendance/subject/${selectedSubject}`
        );

        console.log(response.data);
        
        
        const { subject, faculty, totalPresent, totalAbsent, attendanceRecords } = response.data;
        
        setSubject({
          ...subject,
          faculty: faculty
        });
        console.log(subject);
        setAttendanceRecords(attendanceRecords);
        console.log(attendanceRecords);
        
        setTotalPresent(totalPresent);
        console.log(totalPresent);
        setTotalAbsent(totalAbsent);
        console.log(totalAbsent);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching attendance data:', err);
        setError('Failed to load attendance data');
        setLoading(false);
      }
    };
    
    if (selectedSubject) {
      fetchAttendanceData();
      // Update URL when subject changes
      // navigate(`/attendance/subject/${selectedSubject}`, { replace: true });
    }
  }, [selectedSubject, navigate]);

  const handleSubjectChange = (e) => {
    setSelectedSubject(e.target.value);
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
        <p className="error-message">{error}</p>
        <button onClick={() => window.location.reload()}>Retry</button>
      </div>
    );
  }

  // if (!subject) {
  //   return (
  //     <div className="no-data-container">
  //       <p>No subject data available</p>
  //     </div>
  //   );
  // }

  return (
    <div className="subject-attendance-container">
      <div className="header">
        <div className="subject-selector">
          <label htmlFor="subject-select">Select Subject: </label>
          <select 
            id="subject-select"
            value={selectedSubject}
            onChange={handleSubjectChange}
          >
            <option value="">-- Select a Subject --</option>
            {subjectsList?.map((sub) => (
              <option key={sub?._id} value={sub?._id}>
                {sub?.name} ({sub?.code})
              </option>
            ))}
          </select>
        </div>
        
        <h1>{subject?.name} Attendance</h1>
        <div className="subject-info">
          <span className="subject-code">{subject?.code}</span>
          {/* {subject?.faculty && (
            <span className="faculty-name">Faculty: {subject?.faculty?.facultyId || 'Not specified'}</span>
          )} */}
        </div>
      </div>
      
       <div className="summary-section">
        <div className="summary-card total-classes">
          <div className="card-value">{attendanceRecords?.length}</div>
          <div className="card-label">Total Classes</div>
        </div>
        
        <div className="summary-card present">
          <div className="card-value">{totalPresent}</div>
          <div className="card-label">Total Present</div>
        </div>
        
        <div className="summary-card absent">
          <div className="card-value">{totalAbsent}</div>
          <div className="card-label">Total Absent</div>
        </div>
        
        <div className="summary-card percentage">
          <div className="card-value">
            {totalPresent + totalAbsent > 0 
              ? Math.round((totalPresent / (totalPresent + totalAbsent)) * 100)
              : 0}%
          </div>
          <div className="card-label">Overall Attendance</div>
        </div>
      </div>
      
     <div className="actions-section">
        <Link to={`/attendance/mark?subjectId=${selectedSubject}`}>
          <button className="mark-attendance-btn">
            Mark New Attendance
          </button>
        </Link>
        
        {/* <button className="export-btn">
          Export to Excel
        </button> */}
      </div>
      
      <div className="attendance-records">
        <h2>Attendance Records</h2>
        
        {attendanceRecords?.length > 0 ? (
          <div className="table-container">
            <table className="records-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Present</th>
                  <th>Absent</th>
                  <th>Attendance %</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {attendanceRecords?.map((record, index) => {
                  const attendancePercentage = Math.round(
                    (record?.datewisePresent / (record?.datewisePresent + record?.datewiseAbsent)) * 100
                  );
                  
                  return (
                    <tr key={index}>
                      <td>
                        {new Date(record?.date).toLocaleDateString('en-US', {
                          weekday: 'short',
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td>{record?.datewisePresent}</td>
                      <td>{record?.datewiseAbsent}</td>
                      <td>
                        <div className="percentage-bar-container">
                          <div 
                            className="percentage-bar"
                            style={{ width: `${attendancePercentage}%` }}
                          ></div>
                          <span className="percentage-text">{attendancePercentage}%</span>
                        </div>
                      </td>
                      <td>
                        <Link to={`/faculty/attendance/${selectedSubject}/${record.date.split('T')[0]}`}>
                          <span className="att-view-btn">View Details</span>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="no-records">No attendance records found for this subject.</p>
        )}
      </div>

        <style jsx>{`
        .subject-attendance-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .header {
          margin-bottom: 30px;
          text-align: center;
        }
        
        .subject-selector {
          margin-bottom: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .subject-selector label {
          margin-bottom: 8px;
          font-weight: 500;
        }
        
        .subject-dropdown {
          padding: 10px 15px;
          border-radius: 6px;
          border: 1px solid #ddd;
          font-size: 1rem;
          width: 100%;
          max-width: 400px;
          background-color: white;
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
          background-repeat: no-repeat;
          background-position: right 10px center;
          background-size: 1em;
        }
        
        .header h1 {
          color: #2c3e50;
          margin-bottom: 10px;
          font-size: 1.8rem;
        }
        
        .subject-info {
          display: flex;
          justify-content: center;
          gap: 20px;
          color: #7f8c8d;
          flex-wrap: wrap;
        }
        
        .subject-code {
          background-color: #f1f1f1;
          padding: 5px 12px;
          border-radius: 20px;
          font-weight: 500;
          font-size: 0.9rem;
        }
        
        .summary-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 15px;
          margin-bottom: 30px;
        }
        
        .summary-card {
          padding: 15px;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }
        
        .summary-card:hover {
          transform: translateY(-3px);
        }
        
        .total-classes {
          background-color: #d6eaf8;
          color: #2980b9;
        }
        
        .present {
          background-color: #d5f5e3;
          color: #27ae60;
        }
        
        .absent {
          background-color: #fadbd8;
          color: #e74c3c;
        }
        
        .percentage {
          background-color: #ebdef0;
          color: #8e44ad;
        }
        
        .card-value {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 5px;
        }
        
        .card-label {
          font-size: 0.85rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-weight: 600;
        }
        
        .actions-section {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }
        
        .mark-attendance-btn, .export-btn {
          padding: 10px 20px;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: all 0.3s;
          border: none;
          font-weight: 500;
        }
        
        .mark-attendance-btn {
          background-color: #27ae60;
          color: white;
        }
        
        .mark-attendance-btn:hover {
          background-color: #219653;
        }
        
        .export-btn {
          background-color: #f39c12;
          color: white;
        }
        
        .export-btn:hover {
          background-color: #e67e22;
        }
        
        .attendance-records h2 {
          color: #2c3e50;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
          font-size: 1.5rem;
        }
        
        .table-container {
          overflow-x: auto;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          background-color: white;
          margin-bottom: 30px;
        }
        
        .records-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 600px;
        }
        
        .records-table th,
        .records-table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        .records-table th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #2c3e50;
          position: sticky;
          top: 0;
        }
        
        .records-table tr:hover {
          background-color: #f5f5f5;
        }
        
        .percentage-bar-container {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        
        .percentage-bar {
          height: 8px;
          background-color: #27ae60;
          border-radius: 4px;
          min-width: 20px;
        }
        
        .percentage-text {
          min-width: 40px;
          text-align: right;
        }
        
        .view-btn {
          color: #3498db;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s;
          cursor: pointer;
          padding: 5px 10px;
          border-radius: 4px;
          background-color: rgba(52, 152, 219, 0.1);
        }
        
        .view-btn:hover {
          color: #2980b9;
          background-color: rgba(52, 152, 219, 0.2);
        }
        
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 200px;
        }
        
        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #3498db;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 20px;
        }
        
        .error-container {
          text-align: center;
          padding: 40px 20px;
          max-width: 500px;
          margin: 0 auto;
        }
        
        .error-message {
          color: #e74c3c;
          margin-bottom: 20px;
          font-size: 1.1rem;
        }
        
        .retry-btn {
          padding: 10px 25px;
          background-color: #3498db;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .retry-btn:hover {
          background-color: #2980b9;
        }
        
        .no-records {
          text-align: center;
          padding: 30px;
          color: #7f8c8d;
          font-style: italic;
          background-color: #f9f9f9;
          border-radius: 8px;
        }
        
        /* Responsive adjustments */
        @media (max-width: 768px) {
          .subject-attendance-container {
            padding: 15px;
          }
          
          .header h1 {
            font-size: 1.5rem;
          }
          
          .summary-card {
            padding: 12px;
          }
          
          .card-value {
            font-size: 1.5rem;
          }
          
          .actions-section {
            justify-content: center;
          }
          
          .records-table th,
          .records-table td {
            padding: 10px 12px;
            font-size: 0.9rem;
          }
        }
        
        @media (max-width: 480px) {
          .subject-selector {
            width: 100%;
          }
          
          .subject-dropdown {
            max-width: 100%;
          }
          
          .summary-section {
            grid-template-columns: 1fr 1fr;
          }
          
          .actions-section {
            flex-direction: column;
            align-items: stretch;
          }
          
          .mark-attendance-btn, .export-btn {
            width: 100%;
          }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SubjectAttendance;