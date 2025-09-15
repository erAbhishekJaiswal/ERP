// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const CreateAttendance = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     subjectId: '',
//     facultyId: '',
//     date: new Date().toISOString().split('T')[0],
//     sessionType: 'Lecture',
//     attendanceData: []
//   });
//   const [students, setStudents] = useState([]);
//   const [allStudents, setAllStudents] = useState([]); // Store all students
//   // const [studentList, setStudentList] = useState([]);
//   const [faculties, setFaculties] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [allFaculties, setAllFaculties] = useState([]);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         const subjectsRes = await axios.get('http://localhost:5000/api/features/subjectlist');
//         setSubjects(subjectsRes.data.allSubject);        
//         console.log(subjectsRes.data.allSubject);
        
//         const facultiesRes = await axios.get('http://localhost:5000/api/faculty/allfacultyname');
//         setAllFaculties(facultiesRes.data);
//         // console.log(facultiesRes.data);

//         const studentsRes = await axios.get('http://localhost:5000/api/student/list');
//         setAllStudents(studentsRes.data);
//         console.log(studentsRes.data);
        
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setError('Failed to load initial data');
//         setLoading(false);
//       }
//     };
//     fetchInitialData();
//   }, []);

//   const handleSubjectChange = async (e) => {
//     const subjectId = e.target.value;
//     setFormData({ ...formData, subjectId });
    
//     try {
//       setLoading(true);
//       setError('');
      
//       // Find the selected subject
//       const selectedSubject = subjects.find(sub => sub._id === subjectId);
      
//       if (!selectedSubject) {
//         setError("Selected subject not found");
//         setStudents([]);
//         setFaculties([]);
//         return;
//       }
      
//       // Set faculty if available
//       if (selectedSubject.faculty?.facultyId) {
//         const faculty = allFaculties.find(f => f._id === selectedSubject.faculty.facultyId);
//         if (faculty) {
//           setFaculties([faculty]);
//           setFormData(prev => ({ ...prev, facultyId: faculty._id }));
//         } else {
//           setFaculties([]);
//           setFormData(prev => ({ ...prev, facultyId: '' }));
//         }
//       } else {
//         setFaculties([]);
//         setFormData(prev => ({ ...prev, facultyId: '' }));
//       }
      
//       // Filter enrolled students from allStudents
//       if (selectedSubject.studentsEnrolled?.length > 0) {
//         const enrolledStudentIds = selectedSubject.studentsEnrolled.map(s => s.studentId);
//         const enrolledStudents = allStudents.filter(student => 
//           enrolledStudentIds.includes(student._id)
//         );
        
//         setStudents(enrolledStudents);
        
//         // Initialize attendance data
//         setFormData(prev => ({
//           ...prev,
//           attendanceData: enrolledStudents.map(student => ({
//             studentId: student._id,
//             status: 'Present'
//           }))
//         }));
//       } else {
//         setStudents([]);
//         setFormData(prev => ({ ...prev, attendanceData: [] }));
//       }
//     } catch (error) {
//       console.error(error);
//       setError('Failed to load subject details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const handleSubjectChange = async (e) => {
//   //   const subjectId = e.target.value;
//   //   setFormData({ ...formData, subjectId });
    
//   //   try {
//   //     setLoading(true);
//   //     setError('');
      
//   //     // Find the selected subject
//   //     const selectedSubject = subjects.find(sub => sub._id === subjectId);
//   //     console.log(selectedSubject.studentsEnrolled);
      
//   //     if (!selectedSubject) {
//   //       setError("Selected subject not found");
//   //       setStudents([]);
//   //       setFaculties([]);
//   //       return;
//   //     }
      
//   //     // Set faculty if available
//   //     if (selectedSubject.faculty?.facultyId) {
//   //       const faculty = allFaculties.find(f => f._id === selectedSubject.faculty.facultyId);
//   //       if (faculty) {
//   //         setFaculties([faculty]);
//   //         setFormData(prev => ({ ...prev, facultyId: faculty._id }));
//   //       } else {
//   //         setFaculties([]);
//   //         setFormData(prev => ({ ...prev, facultyId: '' }));
//   //       }
//   //     } else {
//   //       setFaculties([]);
//   //       setFormData(prev => ({ ...prev, facultyId: '' }));
//   //     }
      
//   //     // Fetch enrolled students if any
//   //     if (selectedSubject.studentsEnrolled?.length > 0) {
//   //       const studentIds = selectedSubject.studentsEnrolled.map(s => s.studentId);
//   //       console.log(studentIds.toString());
//   //       console.log(students.map(s => s._id));
        

//   //       const student = students.find(f => f._id === studentIds.toString());
//   //       setStudents(student);
//   //       console.log(student);
        
        
//   //       // const studentsRes = await axios.get('http://localhost:5000/api/student/list', {
//   //       //   params: { ids: studentIds.join(',') }
//   //       // });
//   //       // console.log(studentsRes.data);

        
//   //       // setStudents(studentsRes.data);
        
//   //       // Initialize attendance data
//   //       setFormData(prev => ({
//   //         ...prev,
//   //         attendanceData: students.map(student => ({
//   //           studentId: student._id,
//   //           status: 'Present'
//   //         }))
//   //       }));
//   //     } else {
//   //       setStudents([]);
//   //       setFormData(prev => ({ ...prev, attendanceData: [] }));
//   //     }
//   //   } catch (error) {
//   //     console.error(error);
//   //     setError('Failed to load subject details');
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const handleStatusChange = (studentId, newStatus) => {
//     setFormData(prev => {
//       const studentIndex = prev.attendanceData.findIndex(
//         item => item.studentId === studentId
//       );
      
//       if (studentIndex !== -1) {
//         const newAttendanceData = [...prev.attendanceData];
//         newAttendanceData[studentIndex] = {
//           ...newAttendanceData[studentIndex],
//           status: newStatus
//         };
//         return {
//           ...prev,
//           attendanceData: newAttendanceData
//         };
//       }
      
//       return {
//         ...prev,
//         attendanceData: [
//           ...prev.attendanceData,
//           { studentId, status: newStatus }
//         ]
//       };
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await axios.post('http://localhost:5000/api/attendance', formData);
      
//       // Update student profiles with attendance records
//       await axios.put('http://localhost:5000/api/student/update-attendance', {
//         attendanceRecords: formData.attendanceData.map(record => ({
//           studentId: record.studentId,
//           subjectId: formData.subjectId,
//           date: formData.date,
//           status: record.status
//         }))
//       });
      
//       navigate(`/attendance/subject/${formData.subjectId}`);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to create attendance');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="attendance-container">
//       <h1 className="page-title">Create New Attendance</h1>
      
//       {error && <div className="error-message">{error}</div>}
      
//       <form onSubmit={handleSubmit} className="attendance-form">
//         <div className="form-group">
//           <label htmlFor="subject">Subject</label>
//           <select 
//             id="subject" 
//             value={formData.subjectId}
//             onChange={handleSubjectChange}
//             required
//             disabled={loading}
//           >
//             <option value="">Select Subject</option>
//             {subjects.map(subject => (
//               <option key={subject._id} value={subject._id}>
//                 {subject.name} ({subject.code}) - {subject.department?.department_name || 'No Department'}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="form-group">
//           <label htmlFor="faculty">Faculty</label>
//           {faculties.length > 0 ? (
//             <select
//               id="faculty"
//               value={formData.facultyId}
//               onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
//               required
//               disabled={loading}
//             >
//               <option value="">Select Faculty</option>
//               {faculties.map(faculty => (
//                 <option key={faculty._id} value={faculty._id}>
//                   {faculty.personal_details.first_name} {faculty.personal_details.last_name}
//                 </option>
//               ))}
//             </select>
//           ) : (
//             <div className="no-faculty-message">
//               No faculty assigned for this subject
//             </div>
//           )}
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="date">Date</label>
//             <input 
//               type="date" 
//               id="date" 
//               value={formData.date}
//               onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//               required
//               disabled={loading}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="sessionType">Session Type</label>
//             <select 
//               id="sessionType" 
//               value={formData.sessionType}
//               onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
//               disabled={loading}
//             >
//               <option value="Lecture">Lecture</option>
//               <option value="Lab">Lab</option>
//               <option value="Tutorial">Tutorial</option>
//             </select>
//           </div>
//         </div>

//         {students?.length > 0 ? (
//           <div className="students-list">
//             <h3>Enrolled Students ({students.length})</h3>
//             <table className="attendance-table">
//               <thead>
//                 <tr>
//                   <th>Student Name</th>
//                   <th>Enrollment Number</th>
//                   <th>Department</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {students?.map((student) => {
//                   const attendanceRecord = formData?.attendanceData?.find(
//                     item => item?.studentId === student?._id
//                   );
//                   const status = attendanceRecord?.status || 'Present';
                  
//                   return (
//                     <tr key={student?._id}>
//                       <td>
//                         {student.personal_details?.first_name || 'N/A'} 
//                         {student.personal_details?.last_name || ''}
//                       </td>
//                       <td>{student.academic_details?.enrollment_number || 'N/A'}</td>
//                       <td>{student.academic_details?.department_name || 'N/A'}</td>
//                       <td>
//                         <select
//                           value={status}
//                           onChange={(e) => handleStatusChange(student._id, e.target.value)}
//                           disabled={loading}
//                         >
//                           <option value="Present">Present</option>
//                           <option value="Absent">Absent</option>
//                           <option value="Leave">Leave</option>
//                         </select>
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <div className="no-students-message">
//             No students enrolled in this subject
//           </div>
//         )}

//         <button 
//           type="submit" 
//           className="submit-btn" 
//           disabled={loading || !formData.subjectId || !formData.facultyId || students.length === 0}
//         >
//           {loading ? 'Creating...' : 'Create Attendance'}
//         </button>
//       </form>

//       <style jsx>{`
//         .attendance-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 20px;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }
        
//         .page-title {
//           color: #2c3e50;
//           text-align: center;
//           margin-bottom: 30px;
//         }
        
//         .error-message {
//           color: #e74c3c;
//           background-color: #fadbd8;
//           padding: 10px;
//           border-radius: 5px;
//           margin-bottom: 20px;
//           text-align: center;
//         }
        
//         .attendance-form {
//           background: #fff;
//           padding: 30px;
//           border-radius: 8px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//         }
        
//         .form-row {
//           display: flex;
//           gap: 20px;
//           margin-bottom: 20px;
//         }
        
//         .form-group {
//           flex: 1;
//           margin-bottom: 0;
//         }
        
//         .form-group label {
//           display: block;
//           margin-bottom: 8px;
//           font-weight: 600;
//           color: #34495e;
//         }
        
//         .form-group select,
//         .form-group input {
//           width: 100%;
//           padding: 10px;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           font-size: 16px;
//         }
        
//         .no-faculty-message,
//         .no-students-message {
//           color: #e74c3c;
//           font-weight: bold;
//           padding: 10px;
//           background-color: #fadbd8;
//           border-radius: 4px;
//           text-align: center;
//         }
        
//         .students-list {
//           margin-top: 30px;
//           overflow-x: auto;
//         }
        
//         .students-list h3 {
//           color: #2c3e50;
//           margin-bottom: 15px;
//         }
        
//         .attendance-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 20px;
//         }
        
//         .attendance-table th,
//         .attendance-table td {
//           padding: 12px;
//           text-align: left;
//           border-bottom: 1px solid #ddd;
//         }
        
//         .attendance-table th {
//           background-color: #f8f9fa;
//           font-weight: 600;
//         }
        
//         .attendance-table tr:hover {
//           background-color: #f5f5f5;
//         }
        
//         .attendance-table select {
//           padding: 8px;
//           border-radius: 4px;
//           border: 1px solid #ddd;
//         }
        
//         .submit-btn {
//           background-color: #3498db;
//           color: white;
//           border: none;
//           padding: 12px 20px;
//           font-size: 16px;
//           border-radius: 4px;
//           cursor: pointer;
//           width: 100%;
//           transition: background-color 0.3s;
//         }
        
//         .submit-btn:hover {
//           background-color: #2980b9;
//         }
        
//         .submit-btn:disabled {
//           background-color: #95a5a6;
//           cursor: not-allowed;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CreateAttendance;




// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const CreateAttendance = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     subjectId: '',
//     facultyId: '',
//     date: new Date().toISOString().split('T')[0],
//     sessionType: 'Lecture',
//     attendanceData: []
//   });
//   const [enrolledStudents, setEnrolledStudents] = useState([]);
//   const [allStudents, setAllStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [faculties, setFaculties] = useState([]);
//   const [subjects, setSubjects] = useState([]);
//   const [departments, setDepartments] = useState([]);
//   const [allFaculties, setAllFaculties] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [filters, setFilters] = useState({
//     departmentId: '',
//     semester: ''
//   });
//   const [showAllStudents, setShowAllStudents] = useState(false);

//   useEffect(() => {
//     const fetchInitialData = async () => {
//       try {
//         setLoading(true);
//         const [subjectsRes, facultiesRes, studentsRes, deptsRes] = await Promise.all([
//           axios.get('http://localhost:5000/api/features/subjectlist'),
//           axios.get('http://localhost:5000/api/faculty/allfacultyname'),
//           axios.get('http://localhost:5000/api/student/list'),
//           axios.get('http://localhost:5000/api/features/getDepartmentlist')
//         ]);
        
//         setSubjects(subjectsRes.data.allSubject);        
//         setAllFaculties(facultiesRes.data);
//         setAllStudents(studentsRes.data);
//         console.log(studentsRes.data);
//         setFilteredStudents(studentsRes.data);
//         setDepartments(deptsRes.data.departments);
//         console.log(deptsRes.data.departments);
//         setLoading(false);
//       } catch (error) {
//         console.error(error);
//         setError('Failed to load initial data');
//         setLoading(false);
//       }
//     };
//     fetchInitialData();
//   }, []);

//   // useEffect(() => {
//   //   // Filter students based on department and semester
//   //   const filtered = allStudents.filter(student => {
//   //     const matchesDepartment = !filters.departmentId || 
//   //       student.academic_details?.department_id === filters.departmentId;
//   //     const matchesSemester = !filters.semester || 
//   //       student.academic_details?.current_semester == filters.semester;
//   //     return matchesDepartment && matchesSemester;
//   //   });
//   //   setFilteredStudents(filtered);
//   // }, [filters, allStudents]);


//   useEffect(() => {
//     const filtered = allStudents.filter(student => {
//       const matchesDepartment =
//         !filters.departmentId ||
//         student.academic_details?.department_id?.toString() === filters.departmentId;
  
//       const matchesSemester =
//         !filters.semester ||
//         student.academic_details?.current_semester?.toString() === filters.semester;
  
//       return matchesDepartment && matchesSemester;
//     });
  
//     setFilteredStudents(filtered);
//   }, [filters, allStudents]);
  

//   const handleSubjectChange = async (e) => {
//     const subjectId = e.target.value;
//     setFormData({ ...formData, subjectId });
    
//     try {
//       setLoading(true);
//       setError('');
      
//       const selectedSubject = subjects.find(sub => sub._id === subjectId);
      
//       if (!selectedSubject) {
//         setError("Selected subject not found");
//         setEnrolledStudents([]);
//         console.log("Enrolled student", enrolledStudents);
//         setFaculties([]);
//         return;
//       }
      
//       // Set faculty if available
//       if (selectedSubject.faculty?.facultyId) {
//         const faculty = allFaculties.find(f => f._id === selectedSubject.faculty.facultyId);
//         if (faculty) {
//           setFaculties([faculty]);
//           setFormData(prev => ({ ...prev, facultyId: faculty._id }));
//         } else {
//           setFaculties([]);
//           setFormData(prev => ({ ...prev, facultyId: '' }));
//         }
//       } else {
//         setFaculties([]);
//         setFormData(prev => ({ ...prev, facultyId: '' }));
//       }
      
//       // Set enrolled students
//       if (selectedSubject.studentsEnrolled?.length > 0) {
//         const enrolledStudentIds = selectedSubject.studentsEnrolled.map(s => s.studentId);
//         const enrolledStudents = allStudents.filter(student => 
//           enrolledStudentIds.includes(student._id)
//         );
        
//         setEnrolledStudents(enrolledStudents);
        
//         // Initialize attendance data with enrolled students
//         setFormData(prev => ({
//           ...prev,
//           attendanceData: enrolledStudents.map(student => ({
//             studentId: student._id,
//             status: 'Present'
//           }))
//         }));
//       } else {
//         setEnrolledStudents([]);
//         setFormData(prev => ({ ...prev, attendanceData: [] }));
//       }
//     } catch (error) {
//       console.error(error);
//       setError('Failed to load subject details');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleStatusChange = (studentId, newStatus) => {
//     setFormData(prev => {
//       const studentIndex = prev.attendanceData.findIndex(
//         item => item.studentId === studentId
//       );
      
//       if (studentIndex !== -1) {
//         const newAttendanceData = [...prev.attendanceData];
//         newAttendanceData[studentIndex] = {
//           ...newAttendanceData[studentIndex],
//           status: newStatus
//         };
//         return {
//           ...prev,
//           attendanceData: newAttendanceData
//         };
//       }
      
//       return {
//         ...prev,
//         attendanceData: [
//           ...prev.attendanceData,
//           { studentId, status: newStatus }
//         ]
//       };
//     });
//   };

//   const handleAddStudent = (studentId) => {
//     // Check if student already exists in attendance data
//     const exists = formData.attendanceData.some(item => item.studentId === studentId);
//     if (!exists) {
//       handleStatusChange(studentId, 'Present');
//     }
//   };

//   const handleRemoveStudent = (studentId) => {
//     setFormData(prev => ({
//       ...prev,
//       attendanceData: prev.attendanceData.filter(item => item.studentId !== studentId)
//     }));
//   };

//   const handleFilterChange = (e) => {
//     const { name, value } = e.target;
//     setFilters(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       console.log(formData);
      
//       const response = await axios.post('http://localhost:5000/api/attendance/attendance-create', formData);
//       console.log(response.data);
      
//       // await axios.put('http://localhost:5000/api/student/update-attendance' );
//       //  console.log( {
//       //   attendanceRecords: formData.attendanceData.map(record => ({
//       //     studentId: record.studentId,
//       //     subjectId: formData.subjectId,
//       //     date: formData.date,
//       //     status: record.status
//       //   }))
//       // })
    
      
//       // navigate(`/attendance/subject/${formData.subjectId}`);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to create attendance');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="attendance-container">
//       <h1 className="page-title">Create New Attendance</h1>
      
//       {error && <div className="error-message">{error}</div>}
      
//       <form onSubmit={handleSubmit} className="attendance-form">
//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="subject">Subject</label>
//             <select 
//               id="subject" 
//               value={formData.subjectId}
//               onChange={handleSubjectChange}
//               required
//               disabled={loading}
//             >
//               <option value="">Select Subject</option>
//               {subjects.map(subject => (
//                 <option key={subject._id} value={subject._id}>
//                   {subject.name} ({subject.code}) - {subject.department?.department_name || 'No Department'}
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="form-group">
//             <label htmlFor="faculty">Faculty</label>
//             {faculties.length > 0 ? (
//               <select
//                 id="faculty"
//                 value={formData.facultyId}
//                 onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
//                 required
//                 disabled={loading}
//               >
//                 <option value="">Select Faculty</option>
//                 {faculties.map(faculty => (
//                   <option key={faculty._id} value={faculty._id}>
//                     {faculty.personal_details.first_name} {faculty.personal_details.last_name}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <div className="no-faculty-message">
//                 No faculty assigned for this subject
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="form-row">
//           <div className="form-group">
//             <label htmlFor="date">Date</label>
//             <input 
//               type="date" 
//               id="date" 
//               value={formData.date}
//               onChange={(e) => setFormData({ ...formData, date: e.target.value })}
//               required
//               disabled={loading}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="sessionType">Session Type</label>
//             <select 
//               id="sessionType" 
//               value={formData.sessionType}
//               onChange={(e) => setFormData({ ...formData, sessionType: e.target.value })}
//               disabled={loading}
//             >
//               <option value="Lecture">Lecture</option>
//               <option value="Lab">Lab</option>
//               <option value="Tutorial">Tutorial</option>
//             </select>
//           </div>
//         </div>

//         <div className="toggle-section">
//           <button 
//             type="button" 
//             className={`toggle-button ${!showAllStudents ? 'active' : ''}`}
//             onClick={() => setShowAllStudents(false)}
//           >
//             Enrolled Students
//           </button>
//           <button 
//             type="button" 
//             className={`toggle-button ${showAllStudents ? 'active' : ''}`}
//             onClick={() => setShowAllStudents(true)}
//           >
//             All Students
//           </button>
//         </div>

//         {!showAllStudents ? (
//           enrolledStudents.length > 0 ? (
//             <div className="students-list">
//               <h3>Enrolled Students ({enrolledStudents.length})</h3>
//               <table className="attendance-table">
//                 <thead>
//                   <tr>
//                     <th>Student Name</th>
//                     <th>Enrollment Number</th>
//                     <th>Department</th>
//                     <th>Semester</th>
//                     <th>Status</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {enrolledStudents.map((student) => {
//                     const attendanceRecord = formData.attendanceData.find(
//                       item => item.studentId === student._id
//                     );
//                     const status = attendanceRecord?.status || 'Present';
                    
//                     return (
//                       <tr key={student._id}>
//                         <td>
//                           {student.personal_details?.fname || 'N/A'} 
//                           {student.personal_details?.lname || ''}
//                         </td>
//                         <td>{student.academic_details?.enrollment_number || 'N/A'}</td>
//                         <td>{student.academic_details?.department_name || 'N/A'}</td>
//                         <td>{student.academic_details?.current_semester || 'N/A'}</td>
//                         <td>
//                           <select
//                             value={status}
//                             onChange={(e) => handleStatusChange(student._id, e.target.value)}
//                             disabled={loading}
//                           >
//                             <option value="Present">Present</option>
//                             <option value="Absent">Absent</option>
//                             <option value="Leave">Leave</option>
//                           </select>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             <div className="no-students-message">
//               No students enrolled in this subject
//             </div>
//           )
//         ) : (
//           <div className="all-students-section">
//             <div className="filter-controls">
//               <div className="form-group">
//                 <label htmlFor="department">Department</label>
//                 <select
//                   id="department"
//                   name="departmentId"
//                   value={filters.departmentId}
//                   onChange={handleFilterChange}
//                   disabled={loading}
//                 >
//                   <option value="">All Departments</option>
//                   {departments.map(dept => (
//                     <option key={dept._id} value={dept._id}>{dept.name}</option>
//                   ))}
//                 </select>
//               </div>

//               <div className="form-group">
//                 <label htmlFor="semester">Semester</label>
//                 <select
//                   id="semester"
//                   name="semester"
//                   value={filters.semester}
//                   onChange={handleFilterChange}
//                   disabled={loading}
//                 >
//                   <option value="">All Semesters</option>
//                   {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
//                     <option key={sem} value={sem}>Semester {sem}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className="students-list">
//               <h3>Available Students ({filteredStudents.length})</h3>
//               <table className="attendance-table">
//                 <thead>
//                   <tr>
//                     <th>Student Name</th>
//                     <th>Enrollment Number</th>
//                     <th>Department</th>
//                     <th>Semester</th>
//                     <th>Action</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {filteredStudents.map((student) => {
//                     const isAdded = formData.attendanceData.some(
//                       item => item.studentId === student._id
//                     );
                    
//                     return (
//                       <tr key={student._id}>
//                         <td>
//                           {student.personal_details?.fname || 'N/A'} 
//                           {student.personal_details?.lname || ''}
//                         </td>
//                         <td>{student.academic_details?.enrollment_number || 'N/A'}</td>
//                         <td>{student.academic_details?.department_name || 'N/A'}</td>
//                         <td>{student.academic_details?.current_semester || 'N/A'}</td>
//                         <td>
//                           {isAdded ? (
//                             <button 
//                               type="button" 
//                               className="remove-btn"
//                               onClick={() => handleRemoveStudent(student._id)}
//                               disabled={loading}
//                             >
//                               Remove
//                             </button>
//                           ) : (
//                             <button 
//                               type="button" 
//                               className="add-btn"
//                               onClick={() => handleAddStudent(student._id)}
//                               disabled={loading}
//                             >
//                               Add
//                             </button>
//                           )}
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         )}

//         {formData.attendanceData.length > 0 && (
//           <div className="selected-students">
//             <h3>Selected for Attendance ({formData.attendanceData.length})</h3>
//             <ul>
//               {formData.attendanceData.map(item => {
//                 const student = [...enrolledStudents, ...filteredStudents].find(
//                   s => s._id === item.studentId
//                 );
//                 return student ? (
//                   <li key={item.studentId}>
//                     {student.personal_details?.fname} {student.personal_details?.lname} - 
//                     {student.academic_details?.enrollment_number} ({item.status})
//                   </li>
//                 ) : null;
//               })}
//             </ul>
//           </div>
//         )}

//         <button 
//           type="submit" 
//           className="submit-btn" 
//           disabled={loading || !formData.subjectId || !formData.facultyId || formData.attendanceData.length === 0}
//         >
//           {loading ? 'Creating...' : 'Create Attendance'}
//         </button>
//       </form>

//       <style jsx>{`
//         .attendance-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 20px;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }
        
//         .page-title {
//           color: #2c3e50;
//           text-align: center;
//           margin-bottom: 30px;
//         }
        
//         .error-message {
//           color: #e74c3c;
//           background-color: #fadbd8;
//           padding: 10px;
//           border-radius: 5px;
//           margin-bottom: 20px;
//           text-align: center;
//         }
        
//         .attendance-form {
//           background: #fff;
//           padding: 30px;
//           border-radius: 8px;
//           box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
//         }
        
//         .form-row {
//           display: flex;
//           gap: 20px;
//           margin-bottom: 20px;
//         }
        
//         .form-group {
//           flex: 1;
//           margin-bottom: 0;
//         }
        
//         .form-group label {
//           display: block;
//           margin-bottom: 8px;
//           font-weight: 600;
//           color: #34495e;
//         }
        
//         .form-group select,
//         .form-group input {
//           width: 100%;
//           padding: 10px;
//           border: 1px solid #ddd;
//           border-radius: 4px;
//           font-size: 16px;
//         }
        
//         .toggle-section {
//           display: flex;
//           margin: 20px 0;
//           border-bottom: 1px solid #ddd;
//         }
        
//         .toggle-button {
//           padding: 10px 20px;
//           background: none;
//           border: none;
//           border-bottom: 3px solid transparent;
//           cursor: pointer;
//           font-weight: 600;
//           color: #7f8c8d;
//         }
        
//         .toggle-button.active {
//           color: #3498db;
//           border-bottom-color: #3498db;
//         }
        
//         .no-faculty-message,
//         .no-students-message {
//           color: #e74c3c;
//           font-weight: bold;
//           padding: 10px;
//           background-color: #fadbd8;
//           border-radius: 4px;
//           text-align: center;
//           margin: 20px 0;
//         }
        
//         .filter-controls {
//           display: flex;
//           gap: 20px;
//           margin-bottom: 20px;
//         }
        
//         .students-list {
//           margin-top: 30px;
//           overflow-x: auto;
//         }
        
//         .students-list h3 {
//           color: #2c3e50;
//           margin-bottom: 15px;
//         }
        
//         .attendance-table {
//           width: 100%;
//           border-collapse: collapse;
//           margin-bottom: 20px;
//         }
        
//         .attendance-table th,
//         .attendance-table td {
//           padding: 12px;
//           text-align: left;
//           border-bottom: 1px solid #ddd;
//         }
        
//         .attendance-table th {
//           background-color: #f8f9fa;
//           font-weight: 600;
//         }
        
//         .attendance-table tr:hover {
//           background-color: #f5f5f5;
//         }
        
//         .attendance-table select {
//           padding: 8px;
//           border-radius: 4px;
//           border: 1px solid #ddd;
//         }
        
//         .add-btn {
//           background-color: #2ecc71;
//           color: white;
//           border: none;
//           padding: 6px 12px;
//           border-radius: 4px;
//           cursor: pointer;
//         }
        
//         .remove-btn {
//           background-color: #e74c3c;
//           color: white;
//           border: none;
//           padding: 6px 12px;
//           border-radius: 4px;
//           cursor: pointer;
//         }
        
//         .selected-students {
//           margin: 20px 0;
//           padding: 15px;
//           background-color: #f8f9fa;
//           border-radius: 4px;
//         }
        
//         .selected-students h3 {
//           margin-bottom: 10px;
//           color: #2c3e50;
//         }
        
//         .selected-students ul {
//           list-style: none;
//           padding: 0;
//         }
        
//         .selected-students li {
//           padding: 5px 0;
//           border-bottom: 1px solid #eee;
//         }
        
//         .submit-btn {
//           background-color: #3498db;
//           color: white;
//           border: none;
//           padding: 12px 20px;
//           font-size: 16px;
//           border-radius: 4px;
//           cursor: pointer;
//           width: 100%;
//           transition: background-color 0.3s;
//         }
        
//         .submit-btn:hover {
//           background-color: #2980b9;
//         }
        
//         .submit-btn:disabled {
//           background-color: #95a5a6;
//           cursor: not-allowed;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default CreateAttendance;














import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../../services/axios';

const CreateAttendance = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subjectId: '',
    facultyId: '',
    date: new Date().toISOString().split('T')[0],
    sessionType: 'Lecture',
    attendanceData: []
  });
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [allFaculties, setAllFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    departmentId: '',
    semester: ''
  });
  const [showAllStudents, setShowAllStudents] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [subjectsRes, facultiesRes, studentsRes, deptsRes] = await Promise.all([
          apiClient.get('/api/features/subjectlist'),
          apiClient.get('/api/faculty/allfacultyname'),
          apiClient.get('/api/student/list'),
          apiClient.get('/api/features/getDepartmentlist')
        ]);
        
        setSubjects(subjectsRes.data.allSubject);        
        setAllFaculties(facultiesRes.data);
        setAllStudents(studentsRes.data);
        console.log(studentsRes.data);
        setFilteredStudents(studentsRes.data);
        console.log(studentsRes.data);
        setDepartments(deptsRes.data.departments);
        console.log(deptsRes.data.departments);
        
        setLoading(false);
      } catch (error) {
        console.error(error);
        setError('Failed to load initial data');
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  useEffect(() => {
    const filtered = allStudents.filter(student => {
      // Check if student has academic_details
      if (!student.academic_details) return false;
      
      const matchesDepartment = 
        !filters.departmentId || 
        student.academic_details.department_name?.toString() === filters.departmentId;
      
      const matchesSemester = 
        !filters.semester || 
        student.academic_details.semester?.toString() === filters.semester;
      
      return matchesDepartment && matchesSemester;
    });
    
    setFilteredStudents(filtered);
  }, [filters, allStudents]);

  const handleSubjectChange = async (e) => {
    const subjectId = e.target.value;
    setFormData({ ...formData, subjectId });
    
    try {
      setLoading(true);
      setError('');
      
      const selectedSubject = subjects.find(sub => sub._id === subjectId);
      
      if (!selectedSubject) {
        setError("Selected subject not found");
        setEnrolledStudents([]);
        setFaculties([]);
        return;
      }
      
      // Set faculty if available
      if (selectedSubject.faculty?.facultyId) {
        const faculty = allFaculties.find(f => f._id === selectedSubject.faculty.facultyId);
        if (faculty) {
          setFaculties([faculty]);
          setFormData(prev => ({ ...prev, facultyId: faculty._id }));
        } else {
          setFaculties([]);
          setFormData(prev => ({ ...prev, facultyId: '' }));
        }
      } else {
        setFaculties([]);
        setFormData(prev => ({ ...prev, facultyId: '' }));
      }
      
      // Set enrolled students
      if (selectedSubject.studentsEnrolled?.length > 0) {
        const enrolledStudentIds = selectedSubject.studentsEnrolled.map(s => s.studentId);
        const enrolledStudents = allStudents.filter(student => 
          enrolledStudentIds.includes(student._id)
        );
        
        setEnrolledStudents(enrolledStudents);
        
        // Initialize attendance data with enrolled students
        setFormData(prev => ({
          ...prev,
          attendanceData: enrolledStudents.map(student => ({
            studentId: student._id,
            status: 'Present'
          }))
        }));
      } else {
        setEnrolledStudents([]);
        setFormData(prev => ({ ...prev, attendanceData: [] }));
      }
    } catch (error) {
      console.error(error);
      setError('Failed to load subject details');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (studentId, newStatus) => {
    setFormData(prev => {
      const studentIndex = prev.attendanceData.findIndex(
        item => item.studentId === studentId
      );
      
      if (studentIndex !== -1) {
        const newAttendanceData = [...prev.attendanceData];
        newAttendanceData[studentIndex] = {
          ...newAttendanceData[studentIndex],
          status: newStatus
        };
        return {
          ...prev,
          attendanceData: newAttendanceData
        };
      }
      
      return {
        ...prev,
        attendanceData: [
          ...prev.attendanceData,
          { studentId, status: newStatus }
        ]
      };
    });
  };

  const handleAddStudent = (studentId) => {
    // Check if student already exists in attendance data
    const exists = formData.attendanceData.some(item => item.studentId === studentId);
    if (!exists) {
      handleStatusChange(studentId, 'Present');
    }
  };

  const handleRemoveStudent = (studentId) => {
    setFormData(prev => ({
      ...prev,
      attendanceData: prev.attendanceData.filter(item => item.studentId !== studentId)
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    // here give the error if they repete the same student which already exists
    try {
      const response = await apiClient.post(
        '/api/attendance/attendance-create', 
        formData
      );
      console.log(response.data);
      alert('Attendance created successfully!');
      navigate(`/attendance/subject/${formData.subjectId}`);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to create attendance');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="attendance-container">
      <h1 className="page-title">Create New Attendance</h1>
      
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="attendance-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <select 
              id="subject" 
              value={formData.subjectId}
              onChange={handleSubjectChange}
              required
              disabled={loading}
            >
              <option value="">Select Subject</option>
              {subjects.map(subject => (
                <option key={subject._id} value={subject._id}>
                  {subject.name} ({subject.code}) - {subject.department?.department_name || 'No Department'}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="faculty">Faculty</label>
            {faculties.length > 0 ? (
              <select
                id="faculty"
                value={formData.facultyId}
                onChange={(e) => setFormData({ ...formData, facultyId: e.target.value })}
                required
                disabled={loading || faculties.length !== 0}
              >
                <option value="">Select Faculty</option>
                {faculties.map(faculty => (
                  <option key={faculty._id} value={faculty._id}>
                    {faculty.personal_details.first_name} {faculty.personal_details.last_name}
                  </option>
                ))}
              </select>
            ) : (
              <div className="no-faculty-message">
                No faculty assigned for this subject
              </div>
            )}
          </div>
        </div>

        <div className="form-row">
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

        <div className="toggle-section">
          <button 
            type="button" 
            className={`toggle-button ${!showAllStudents ? 'active' : ''}`}
            onClick={() => setShowAllStudents(false)}
            disabled={loading}
          >
            Enrolled Students
          </button>
          <button 
            type="button" 
            className={`toggle-button ${showAllStudents ? 'active' : ''}`}
            onClick={() => setShowAllStudents(true)}
            disabled={loading}
          >
            All Students
          </button>
        </div>

        {!showAllStudents ? (
          enrolledStudents.length > 0 ? (
            <div className="students-list">
              <h3>Enrolled Students ({enrolledStudents.length})</h3>
              <table className="attendance-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Enrollment Number</th>
                    <th>Department</th>
                    <th>Semester</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {enrolledStudents.map((student) => {
                    const attendanceRecord = formData.attendanceData.find(
                      item => item.studentId === student._id
                    );
                    const status = attendanceRecord?.status || 'Present';
                    
                    return (
                      <tr key={student._id}>
                        <td>
                          {student.personal_details?.fname || 'N/A'} {" "}
                          {student.personal_details?.lname || ''}
                        </td>
                        <td>{student.academic_details?.enrollment_number || 'N/A'}</td>
                        <td>
                          {student.academic_details?.department_name || 'N/A'}
                        </td>
                        <td>{student.academic_details?.semester || 'N/A'}</td>
                        <td>
                          <select
                            value={status}
                            onChange={(e) => handleStatusChange(student._id, e.target.value)}
                            disabled={loading}
                          >
                            <option value="Present">Present</option>
                            <option value="Absent">Absent</option>
                            <option value="Leave">Leave</option>
                          </select>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="no-students-message">
              No students enrolled in this subject
            </div>
          )
        ) : (
          <div className="all-students-section">
            <div className="filter-controls">
              <div className="form-group">
                <label htmlFor="department">Department</label>
                <select
                  id="department"
                  name="departmentId"
                  value={filters.departmentId}
                  onChange={handleFilterChange}
                  disabled={loading}
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept._id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="semester">Semester</label>
                <select
                  id="semester"
                  name="semester"
                  value={filters.semester}
                  onChange={handleFilterChange}
                  disabled={loading}
                >
                  <option value="">All Semesters</option>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                    <option key={sem} value={sem.toString()}>Semester {sem}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="students-list">
              <h3>Available Students ({filteredStudents.length})</h3>
              {filteredStudents.length > 0 ? (
                <table className="attendance-table">
                  <thead>
                    <tr>
                      <th>Student Name</th>
                      <th>Enrollment Number</th>
                      <th>Department</th>
                      <th>Semester</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student) => {
                      const isAdded = formData.attendanceData.some(
                        item => item.studentId === student._id
                      );
                      
                      return (
                        <tr key={student._id}>
                          <td>
                            {student.personal_details?.fname || 'N/A'} {' '}
                            {student.personal_details?.lname || ''}
                          </td>
                          <td>{student.academic_details?.enrollment_number || 'N/A'}</td>
                          <td>
                            {departments.find(d => d.name === student.academic_details?.department_name)?.name || 'N/A'}
                          </td>
                          <td>{student.academic_details?.semester || 'N/A'}</td>
                          <td>
                            {isAdded ? (
                              <button 
                                type="button" 
                                className="remove-btn"
                                onClick={() => handleRemoveStudent(student._id)}
                                disabled={loading}
                              >
                                Remove
                              </button>
                            ) : (
                              <button 
                                type="button" 
                                className="add-btn"
                                onClick={() => handleAddStudent(student._id)}
                                disabled={loading}
                              >
                                Add
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <div className="no-students-message">
                  No students match the current filters
                </div>
              )}
            </div>
          </div>
        )}

        {formData.attendanceData.length > 0 && (
          <div className="selected-students">
            <h3>Selected for Attendance ({formData.attendanceData.length})</h3>
            <ul>
              {formData.attendanceData.map(item => {
                const student = [...enrolledStudents, ...filteredStudents].find(
                  s => s._id === item.studentId
                );
                return student ? (
                  <li key={item.studentId}>
                    {student.personal_details?.fname} {student.personal_details?.lname} - 
                    {student.academic_details?.enrollment_number} ({item.status})
                  </li>
                ) : null;
              })}
            </ul>
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
            disabled={loading || !formData.subjectId || !formData.facultyId || formData.attendanceData.length === 0}
          >
            {loading ? 'Creating...' : 'Create Attendance'}
          </button>
        </div>
      </form>

      <style jsx>{`
        .attendance-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .page-title {
          color: #2c3e50;
          text-align: center;
          margin-bottom: 30px;
        }
        
        .error-message {
          color: #e74c3c;
          background-color: #fadbd8;
          padding: 10px;
          border-radius: 5px;
          margin-bottom: 20px;
          text-align: center;
        }
        
        .attendance-form {
          background: #fff;
          padding: 30px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .form-row {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .form-group {
          flex: 1;
          margin-bottom: 0;
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
        
        .toggle-section {
          display: flex;
          margin: 20px 0;
          border-bottom: 1px solid #ddd;
        }
        
        .toggle-button {
          padding: 10px 20px;
          background: none;
          border: none;
          border-bottom: 3px solid transparent;
          cursor: pointer;
          font-weight: 600;
          color: #7f8c8d;
        }
        
        .toggle-button.active {
          color: #3498db;
          border-bottom-color: #3498db;
        }
        
        .no-faculty-message,
        .no-students-message {
          color: #e74c3c;
          font-weight: bold;
          padding: 10px;
          background-color: #fadbd8;
          border-radius: 4px;
          text-align: center;
          margin: 20px 0;
        }
        
        .filter-controls {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .students-list {
          margin-top: 30px;
          overflow-x: auto;
        }
        
        .students-list h3 {
          color: #2c3e50;
          margin-bottom: 15px;
        }
        
        .attendance-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        
        .attendance-table th,
        .attendance-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        
        .attendance-table th {
          background-color: #f8f9fa;
          font-weight: 600;
        }
        
        .attendance-table tr:hover {
          background-color: #f5f5f5;
        }
        
        .attendance-table select {
          padding: 8px;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
        
        .add-btn {
          background-color: #2ecc71;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .remove-btn {
          background-color: #e74c3c;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .selected-students {
          margin: 20px 0;
          padding: 15px;
          background-color: #f8f9fa;
          border-radius: 4px;
        }
        
        .selected-students h3 {
          margin-bottom: 10px;
          color: #2c3e50;
        }
        
        .selected-students ul {
          list-style: none;
          padding: 0;
        }
        
        .selected-students li {
          padding: 5px 0;
          border-bottom: 1px solid #eee;
        }
        
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 15px;
          margin-top: 20px;
        }
        
        .submit-btn {
          background-color: #3498db;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .submit-btn:hover {
          background-color: #2980b9;
        }
        
        .submit-btn:disabled {
          background-color: #95a5a6;
          cursor: not-allowed;
        }
        
        .cancel-btn {
          background-color: #95a5a6;
          color: white;
          border: none;
          padding: 10px 20px;
          font-size: 16px;
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .cancel-btn:hover {
          background-color: #7f8c8d;
        }
      `}</style>
    </div>
  );
};

export default CreateAttendance;