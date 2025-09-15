// // pages/attendance/mark.js
// import React, { useState, useEffect } from 'react';
// import { useNavigate,useParams } from 'react-router-dom';
// import axios from 'axios';

// // Mock data
// const mockStudents = [
//   { _id: 'stu1', personal_details: { first_name: 'John', last_name: 'Doe' }, rollNumber: 'S001' },
//   { _id: 'stu2', personal_details: { first_name: 'Jane', last_name: 'Smith' }, rollNumber: 'S002' },
//   { _id: 'stu3', personal_details: { first_name: 'Robert', last_name: 'Johnson' }, rollNumber: 'S003' }
// ];

// const mockSubject = {
//   _id: 'sub1',
//   name: 'Mathematics',
//   code: 'MATH101'
// };

// const MarkAttendance = () => {
//   const navigate = useNavigate();
//   const { subjectId } = useParams();
//   const [formData, setFormData] = useState({
//     date: new Date().toISOString().split('T')[0],
//     sessionType: 'Lecture',
//     attendanceData: []
//   });
//   const [students, setStudents] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [subject, setSubject] = useState(null);

//   useEffect(() => {
//     try {
//       const fetchData = async () => {
//         const response = await axios.get(`http://localhost:5000/api/features/subjectlist`);
//         setSubject(response.data.allSubject);
//         console.log(response.data.allSubject);
//       }
//       fetchData();
//     } catch (error) {
//       console.log(error);
//     }
   
//   }, [subjectId]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       // Mock API call
//       console.log('Marking attendance:', { subjectId, ...formData });
//       setTimeout(() => {
//         navigate(`/attendance/subject/${subjectId}`);
//       }, 1000);
//     } catch (err) {
//       alert('Error marking attendance');
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!subject) return <div>Loading...</div>;

//   return (
//     <div className="mark-attendance-container">
//       <div className="header">
//         <h1>Mark Attendance</h1>
//         <h2>{subject.name} ({subject.code})</h2>
//       </div>
      
//       <form onSubmit={handleSubmit} className="attendance-form">
//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="date">Date</label>
//             <input 
//               type="date" 
//               id="date" 
//               value={formData.date}
//               onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//               required
//             />
//           </div>
          
//           <div className="form-group">
//             <label htmlFor="sessionType">Session Type</label>
//             <select 
//               id="sessionType" 
//               value={formData.sessionType}
//               onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
//             >
//               <option value="Lecture">Lecture</option>
//               <option value="Lab">Lab</option>
//               <option value="Tutorial">Tutorial</option>
//             </select>
//           </div>
//         </div>
        
//         <div className="attendance-sheet">
//           <h3>Attendance Sheet</h3>
//           <div className="table-container">
//             <table className="student-table">
//               <thead>
//                 <tr>
//                   <th>No.</th>
//                   <th>Student Name</th>
//                   <th>Roll No.</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students.map((student, index) => (
//                   <tr key={student._id}>
//                     <td>{index + 1}</td>
//                     <td>{student.personal_details.first_name} {student.personal_details.last_name}</td>
//                     <td>{student.rollNumber}</td>
//                     <td>
//                       <select
//                         className={`status-select ${formData.attendanceData[index]?.status.toLowerCase()}`}
//                         value={formData.attendanceData[index]?.status || 'Present'}
//                         onChange={(e) => {
//                           const newData = [...formData.attendanceData];
//                           newData[index].status = e.target.value;
//                           setFormData({ ...formData, attendanceData: newData });
//                         }}
//                       >
//                         <option value="Present">Present</option>
//                         <option value="Absent">Absent</option>
//                         <option value="Leave">Leave</option>
//                       </select>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
        
//         <div className="form-actions">
//           <button type="button" className="cancel-btn" onClick={() => router.back()}>
//             Cancel
//           </button>
//           <button type="submit" className="submit-btn" disabled={loading}>
//             {loading ? (
//               <>
//                 <span className="spinner"></span> Saving...
//               </>
//             ) : (
//               'Save Attendance'
//             )}
//           </button>
//         </div>
//       </form>

//       <style jsx>{`
//         .mark-attendance-container {
//           max-width: 900px;
//           margin: 0 auto;
//           padding: 20px;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }
        
//         .header {
//           text-align: center;
//           margin-bottom: 30px;
//         }
        
//         .header h1 {
//           color: #2c3e50;
//           margin-bottom: 5px;
//         }
        
//         .header h2 {
//           color: #7f8c8d;
//           font-size: 1.2rem;
//           margin-top: 0;
//         }
        
//         .attendance-form {
//           background: #fff;
//           padding: 25px;
//           border-radius: 8px;
//           box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
//         }
        
//         .form-row {
//           display: flex;
//           gap: 20px;
//           margin-bottom: 20px;
//         }
        
//         .form-group {
//           flex: 1;
//         }
        
//         .form-group label {
//           display: block;
//           margin-bottom: 8px;
//           font-weight: 600;
//           color: #34495e;
//         }
        
//         .form-group input,
//         .form-group select {
//           width: 100%;
//           padding: 10px;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           font-size: 16px;
//         }
        
//         .attendance-sheet {
//           margin: 30px 0;
//         }
        
//         .attendance-sheet h3 {
//           color: #2c3e50;
//           margin-bottom: 15px;
//           padding-bottom: 10px;
//           border-bottom: 1px solid #eee;
//         }
        
//         .table-container {
//           overflow-x: auto;
//         }
        
//         .student-table {
//           width: 100%;
//           border-collapse: collapse;
//         }
        
//         .student-table th,
//         .student-table td {
//           padding: 12px 15px;
//           text-align: left;
//           border-bottom: 1px solid #eee;
//         }
        
//         .student-table th {
//           background-color: #f8f9fa;
//           font-weight: 600;
//           color: #2c3e50;
//         }
        
//         .student-table tr:hover {
//           background-color: #f9f9f9;
//         }
        
//         .status-select {
//           padding: 8px 12px;
//           border-radius: 4px;
//           border: 1px solid #ddd;
//           font-size: 14px;
//           cursor: pointer;
//           transition: all 0.2s;
//         }
        
//         .status-select.present {
//           background-color: #d5f5e3;
//           border-color: #2ecc71;
//         }
        
//         .status-select.absent {
//           background-color: #fadbd8;
//           border-color: #e74c3c;
//         }
        
//         .status-select.leave {
//           background-color: #fdebd0;
//           border-color: #f39c12;
//         }
        
//         .form-actions {
//           display: flex;
//           justify-content: flex-end;
//           gap: 15px;
//           margin-top: 20px;
//         }
        
//         .submit-btn, .cancel-btn {
//           padding: 10px 20px;
//           border-radius: 4px;
//           font-size: 16px;
//           cursor: pointer;
//           transition: all 0.3s;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }
        
//         .submit-btn {
//           background-color: #27ae60;
//           color: white;
//           border: none;
//           min-width: 150px;
//         }
        
//         .submit-btn:hover {
//           background-color: #219653;
//         }
        
//         .submit-btn:disabled {
//           background-color: #95a5a6;
//           cursor: not-allowed;
//         }
        
//         .cancel-btn {
//           background-color: transparent;
//           border: 1px solid #bdc3c7;
//           color: #7f8c8d;
//         }
        
//         .cancel-btn:hover {
//           background-color: #f5f5f5;
//         }
        
//         .spinner {
//           display: inline-block;
//           width: 16px;
//           height: 16px;
//           border: 2px solid rgba(255, 255, 255, 0.3);
//           border-radius: 50%;
//           border-top-color: white;
//           animation: spin 1s ease-in-out infinite;
//           margin-right: 8px;
//         }
        
//         @keyframes spin {
//           to { transform: rotate(360deg); }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default MarkAttendance;





// pages/attendance/mark.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../services/axios';

const MarkAttendance = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    sessionType: 'Lecture',
    attendanceData: [],
    selectedSubject: ''
  });
  const [students, setStudents] = useState([]);
  const [allstudent,setAllstudent] = useState([]);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [fetchingStudents, setFetchingStudents] = useState(false);
  const facultyid = localStorage.getItem('profileid');
  const [isAuthorized, setIsAuthorized] = useState(true);

  // Modify the fetchSubjects function
  // const fetchSubjects = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axios.get(`http://localhost:5000/api/features/subjectlist`);
      
  //     // Filter subjects where faculty is assigned
  //     const facultySubjects = response.data.allSubject.filter(
  //       subject => subject.faculty?.facultyId === facultyid
  //     );
      
  //     setSubjects(facultySubjects);

  //     // If subjectId is provided in URL params, verify authorization
  //     if (subjectId) {
  //       const selectedSubject = response.data.allSubject.find(sub => sub._id === subjectId);
        
  //       if (selectedSubject) {
  //         if (selectedSubject.faculty?.facultyId !== facultyid) {
  //           setIsAuthorized(false);
  //           return;
  //         }
          
  //         setFormData(prev => ({ ...prev, selectedSubject: subjectId }));
  //         fetchStudents(subjectId);
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error fetching subjects:', error);
  //     alert('Failed to load subjects');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/api/features/subjectlist`);
        // setSubjects(response.data.allSubject);

         // Filter subjects where faculty is assigned
      const facultySubjects = response.data.allSubject.filter(
        subject => subject.faculty?.facultyId === facultyid
      );
      setSubjects(facultySubjects);

        const allstudentList = await apiClient.get(`/api/student/list`);
        setAllstudent(allstudentList.data);
        // console.log(allstudentList.data);
        
        
        // If subjectId is provided in URL params, set it as selected
        // if (subjectId) {
        //   setFormData(prev => ({ ...prev, selectedSubject: subjectId }));
        //   fetchStudents(subjectId);
        // }


         // If subjectId is provided in URL params, verify authorization
      if (subjectId) {
        const selectedSubject = response.data.allSubject.find(sub => sub._id === subjectId);
        
        if (selectedSubject) {
          if (selectedSubject.faculty?.facultyId !== facultyid) {
            setIsAuthorized(false);
            return;
          }
          
          setFormData(prev => ({ ...prev, selectedSubject: subjectId }));
          fetchStudents(subjectId);
        }
      }
      } catch (error) {
        console.error('Error fetching subjects:', error);
        alert('Failed to load subjects');
      } finally {
        setLoading(false);
      }
    };
    
    fetchSubjects();
  }, [subjectId]);

  const fetchStudents = async (subjectId) => {
    if (!subjectId) return;
    
    try {
      setFetchingStudents(true);
      // Find the selected subject to get enrolled students
      const selectedSubject = subjects.find(sub => sub._id === subjectId);

      console.log(selectedSubject);
      
      if (!selectedSubject) return;
      
      // Extract student IDs from the subject
      const studentIds = selectedSubject.studentsEnrolled.map(enrollment => enrollment.studentId);
      
      if (studentIds.length === 0) {
        setStudents([]);
        setFormData(prev => ({ ...prev, attendanceData: [] }));
        return;
      }
      
      // Fetch enrolled students
      const slist = allstudent.filter(student => studentIds.includes(student._id));
      console.log(slist);
      
      // const studentsResponse = await axios.get(`http://localhost:5000/api/student/list/${slist.map(s => s._id).join(',')}`);
      
      setStudents(slist);
      
      // Initialize attendance data for each student
      const initialAttendanceData = slist.map(student => ({
        studentId: student._id,
        status: 'Present'
      }));
      
      setFormData(prev => ({
        ...prev,
        attendanceData: initialAttendanceData
      }));
    } catch (error) {
      console.error('Error fetching students:', error);
      alert('Failed to load enrolled students');
    } finally {
      setFetchingStudents(false);
    }
  };

  const handleSubjectChange = (e) => {
    const selectedSubjectId = e.target.value;
    setFormData(prev => ({ ...prev, selectedSubject: selectedSubjectId }));
    fetchStudents(selectedSubjectId);
  };

  const handleStatusChange = (index, value) => {
    const newAttendanceData = [...formData.attendanceData];
    newAttendanceData[index].status = value;
    setFormData(prev => ({ ...prev, attendanceData: newAttendanceData }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.selectedSubject) {
      alert('Please select a subject');
      return;
    }
    
    if (formData.attendanceData.length === 0) {
      alert('No students to mark attendance for');
      return;
    }
    
    setLoading(true);
    try {
      // Prepare the data to send
      const attendanceRecord = {
        subjectId: formData.selectedSubject,
        date: formData.date,
        sessionType: formData.sessionType,
        attendanceData: formData.attendanceData,
        facultyId: facultyid
      };

      console.log(attendanceRecord);
      
      
      // Send to API
      const response = await apiClient.post(
        '/api/attendance/mark',
        attendanceRecord
      );
      console.log(response.data);
      
      
      alert('Attendance marked successfully!');
      // navigate(`/attendance/subject/${formData.selectedSubject}`);
    } catch (err) {
      console.error('Error marking attendance:', err);
      alert('Error marking attendance');
    } finally {
      setLoading(false);
    }
  };

    // Add this at the beginning of your return statement
    if (!isAuthorized) {
      return (
        <div className="unauthorized-container">
          <div className="unauthorized-card">
            <h2>Access Denied</h2>
            <p>You are not authorized to mark attendance for this subject.</p>
            <button 
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              Back to Dashboard
            </button>
          </div>
  
          <style jsx>{`
            .unauthorized-container {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 80vh;
            }
            .unauthorized-card {
              background: white;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 500px;
            }
            .unauthorized-card h2 {
              color: #e74c3c;
              margin-bottom: 15px;
            }
            .unauthorized-card p {
              margin-bottom: 25px;
              font-size: 16px;
            }
            .back-btn {
              background: #3498db;
              color: white;
              border: none;
              padding: 10px 20px;
              border-radius: 4px;
              cursor: pointer;
              font-size: 16px;
            }
          `}</style>
        </div>
      );
    }

  return (
    <div className="mark-attendance-container">
      <div className="header">
        <h1>Mark Attendance</h1>
      </div>
      
      <form onSubmit={handleSubmit} className="attendance-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select
              id="subject"
              value={formData.selectedSubject}
              onChange={handleSubjectChange}
              required
              disabled={loading}
            >
              <option value="">Select a subject</option>
              {subjects.map(subject => (
                <option key={subject._id} value={subject._id}>
                  {subject.name} ({subject.code})
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input 
              type="date" 
              id="date" 
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="sessionType">Session Type</label>
            <select 
              id="sessionType" 
              value={formData.sessionType}
              onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
              disabled={loading}
            >
              <option value="Lecture">Lecture</option>
              <option value="Lab">Lab</option>
              <option value="Tutorial">Tutorial</option>
            </select>
          </div>
        </div>
        
        {fetchingStudents ? (
          <div className="loading-students">
            <div className="spinner"></div>
            <p>Loading students...</p>
          </div>
        ) : (
          <div className="attendance-sheet">
            <h3>Attendance Sheet</h3>
            {students?.length > 0 ? (
              <div className="table-container">
                <table className="student-table">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Student Name</th>
                      <th>Enrollment No</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {students?.map((student, index) => (
                      <tr key={student._id}>
                        <td>{index + 1}</td>
                        <td>{student.personal_details?.fname} {student.personal_details?.lname}</td>
                        <td>{student.academic_details?.enrollment_number}</td>
                        <td>
                          <select
                            className={`status-select ${formData.attendanceData[index]?.status.toLowerCase()}`}
                            value={formData.attendanceData[index]?.status || 'Present'}
                            onChange={(e) => handleStatusChange(index, e.target.value)}
                            disabled={loading}
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
            ) : (
              formData.selectedSubject && (
                <div className="no-students">
                  <p>No students enrolled in this subject.</p>
                </div>
              )
            )}
          </div>
        )}
        
        <div className="form-actions">
          <button 
            type="button" 
            className="cancel-btn" 
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="submit-btn" 
            disabled={loading || !formData.selectedSubject || students.length === 0}
          >
            {loading ? (
              <>
                <span className="spinner"></span> Saving...
              </>
            ) : (
              'Save Attendance'
            )}
          </button>
        </div>
      </form>

      <style jsx>{`
        .mark-attendance-container {
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
        
        .attendance-form {
          background: #fff;
          padding: 25px;
          border-radius: 8px;
          box-shadow: 0 2px 15px rgba(0, 0, 0, 0.1);
        }
        
        .form-row {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .form-group {
          flex: 1;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #34495e;
        }
        
        .form-group input,
        .form-group select {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        
        .attendance-sheet {
          margin: 30px 0;
        }
        
        .attendance-sheet h3 {
          color: #2c3e50;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid #eee;
        }
        
        .table-container {
          overflow-x: auto;
        }
        
        .student-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .student-table th,
        .student-table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        .student-table th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #2c3e50;
        }
        
        .student-table tr:hover {
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
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 20px;
        }
        
        .submit-btn, .cancel-btn {
          padding: 10px 20px;
          border-radius: 4px;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .submit-btn {
          background-color: #27ae60;
          color: white;
          border: none;
          min-width: 150px;
        }
        
        .submit-btn:hover {
          background-color: #219653;
        }
        
        .submit-btn:disabled {
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
        
        .cancel-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .spinner {
          display: inline-block;
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
          margin-right: 8px;
        }
        
        .loading-students {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 40px 0;
        }
        
        .loading-students .spinner {
          width: 40px;
          height: 40px;
          border-width: 4px;
          margin-bottom: 15px;
        }
        
        .no-students {
          text-align: center;
          padding: 20px;
          background-color: #f8f9fa;
          border-radius: 4px;
          color: #7f8c8d;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default MarkAttendance;