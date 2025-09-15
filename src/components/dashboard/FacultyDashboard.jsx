// import React, { useState } from 'react';
// import styles from '../../CSSfolder/FacultyCSS/FacultyDashboard.module.css';

// const FacultyDashboard = () => {
//   const [activeTab, setActiveTab] = useState('courses');
//   const [notifications] = useState(3);

//   // Mock data
//   const courses = [
//     { id: 1, name: "Advanced Algorithms", avgGrade: 85, assignmentsDue: 2, students: 45 },
//     { id: 2, name: "Database Systems", avgGrade: 78, assignmentsDue: 1, students: 32 },
//   ];

//   const studentGrades = [
//     { id: 1, name: "John Doe", course: "Advanced Algorithms", assignment: "Midterm", grade: 88, status: "Graded" },
//     { id: 2, name: "Jane Smith", course: "Database Systems", assignment: "Project 1", grade: null, status: "Pending" },
//   ];

//   const schedule = [
//     { id: 1, type: "Lecture", course: "Advanced Algorithms", time: "Mon 9:00 AM", location: "Room 101" },
//     { id: 2, type: "Office Hours", course: null, time: "Wed 2:00 PM", location: "Office 205" },
//   ];

//   return (
//     <div className={styles.dashboard}>
//       {/* Header */}
//       <header className={styles.header}>
//         <h1>Faculty Dashboard</h1>
//         {/* <div className={styles.headerActions}>
//           <div className={styles.notificationBadge}>
//             <span className={styles.bellIcon}>🔔</span>
//             {notifications > 0 && <span className={styles.badge}>{notifications}</span>}
//           </div>
//           <button className={styles.profileButton}>Profile</button>
//         </div> */}
//       </header>

//       {/* Navigation Tabs */}
//       <nav className={styles.tabs}>
//         <button 
//           className={`${styles.tab} ${activeTab === 'courses' ? styles.active : ''}`}
//           onClick={() => setActiveTab('courses')}
//         >
//           Your Courses
//         </button>
//         <button 
//           className={`${styles.tab} ${activeTab === 'grades' ? styles.active : ''}`}
//           onClick={() => setActiveTab('grades')}
//         >
//           Student Grades
//         </button>
//         <button 
//           className={`${styles.tab} ${activeTab === 'schedule' ? styles.active : ''}`}
//           onClick={() => setActiveTab('schedule')}
//         >
//           Timetable
//         </button>
//       </nav>

//       {/* Main Content */}
//       <main className={styles.content}>
//         {/* Courses Tab */}
//         {activeTab === 'courses' && (
//           <div className={styles.coursesContainer}>
//             <h2>Your Active Courses</h2>
//             <div className={styles.courseGrid}>
//               {courses.map(course => (
//                 <div key={course.id} className={styles.courseCard}>
//                   <h3>{course.name}</h3>
//                   <div className={styles.courseStats}>
//                     <div>
//                       <span>Avg Grade</span>
//                       <span className={styles.highlight}>{course.avgGrade}%</span>
//                     </div>
//                     <div>
//                       <span>Assignments Due</span>
//                       <span className={styles.highlight}>{course.assignmentsDue}</span>
//                     </div>
//                     <div>
//                       <span>Students</span>
//                       <span className={styles.highlight}>{course.students}</span>
//                     </div>
//                   </div>
//                   <button className={styles.actionButton}>View Course</button>
//                 </div>
//               ))}
//             </div>

//             <div className={styles.performanceSection}>
//               <h2>Student Performance Overview</h2>
//               <div className={styles.chartPlaceholder}>
//                 [Performance Chart Visualization]
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Grades Tab */}
//         {activeTab === 'grades' && (
//           <div className={styles.gradesContainer}>
//             <h2>Student Grades</h2>
//             <div className={styles.gradeActions}>
//               <input type="text" placeholder="Search students..." className={styles.searchInput} />
//               <button className={styles.primaryButton}>Export Grades</button>
//             </div>
//             <table className={styles.gradesTable}>
//               <thead>
//                 <tr>
//                   <th>Student</th>
//                   <th>Course</th>
//                   <th>Assignment</th>
//                   <th>Grade</th>
//                   <th>Status</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {studentGrades.map(grade => (
//                   <tr key={grade.id}>
//                     <td>{grade.name}</td>
//                     <td>{grade.course}</td>
//                     <td>{grade.assignment}</td>
//                     <td>{grade.grade || '-'}</td>
//                     <td>
//                       <span className={`${styles.status} ${grade.status === 'Pending' ? styles.pending : styles.graded}`}>
//                         {grade.status}
//                       </span>
//                     </td>
//                     <td>
//                       <button className={styles.smallButton}>
//                         {grade.grade ? 'Edit' : 'Grade'}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Schedule Tab */}
//         {activeTab === 'schedule' && (
//           <div className={styles.scheduleContainer}>
//             <h2>Your Schedule</h2>
//             <div className={styles.scheduleGrid}>
//               {schedule.map(item => (
//                 <div key={item.id} className={styles.scheduleCard}>
//                   <div className={styles.scheduleHeader}>
//                     <h3>{item.type}</h3>
//                     <span className={styles.time}>{item.time}</span>
//                   </div>
//                   {item.course && <p className={styles.courseName}>{item.course}</p>}
//                   <p className={styles.location}>{item.location}</p>
//                   <div className={styles.scheduleActions}>
//                     <button className={styles.smallButton}>Details</button>
//                     {item.type === 'Lecture' && <button className={styles.smallButton}>Materials</button>}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// };

// export default FacultyDashboard;











import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, Outlet, useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiUsers, FiCalendar, FiClock, FiCheckSquare, FiBook, FiFileText, FiAward, FiBarChart2, FiLogOut } from 'react-icons/fi';
import apiClient from '../../services/axios';
import axios from 'axios';

const FacultyDashboard = () => {
  return (
    <>
       <Home />
    </>
  );
};


const Home = () => {
  const [dashboard,setdashboard]= useState([]);
  // const [stats, setStats] = useState([
  //   { title: 'Total Students', value: '142', icon: <FiUsers />, color: 'var(--primary)' },
  //   { title: 'Pending Attendance', value: '3', icon: <FiCheckSquare />, color: 'var(--warning)' },
  //   { title: 'Assignments to Grade', value: '7', icon: <FiBook />, color: 'var(--danger)' },
  //   { title: 'Upcoming Quizzes', value: '2', icon: <FiFileText />, color: 'var(--success)' }
  // ]);

  const facultyId = localStorage.getItem('profileid'); // Assuming you store faculty ID in localStorage
   const fetchStats = async (facultyId) => {
      try {
        const response = await apiClient.get(`/api/dashboard/faculty/${facultyId}`);
        // const response = await axios.get(`http://localhost:5000/api/dashboard/faculty/${facultyId}`);
        setdashboard(response.data);
        console.log('Fetched stats:', response.data);
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };
  useEffect(() => {
    fetchStats(facultyId);
  }, [facultyId]);
  
  const stats = [
    { title: 'Total Students', value: dashboard.studentCount ||'142', icon: <FiUsers />, color: 'var(--primary)' },
    { title: 'Pending Attendance', value: dashboard.attendanceCount ||'3', icon: <FiCheckSquare />, color: 'var(--warning)' },
    { title: 'Assignments to Grade', value: dashboard.assignmentCount || '7', icon: <FiBook />, color: 'var(--danger)' },
    { title: 'Upcoming Quizzes', value: dashboard.quizCount ||'2', icon: <FiFileText />, color: 'var(--success)' }
  ];

  return (
    <div className="home-container">
      <h2 className="page-title">Dashboard Overview</h2>
      
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderLeft: `4px solid ${stat.color}` }}>
            <div className="stat-icon" style={{ color: stat.color }}>{stat.icon}</div>
            <div className="stat-info">
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="dashboard-sections">
        <div className="section upcoming-classes">
          <h3>Upcoming Classes</h3>
          <ul>
            {dashboard?.upcomingClasses?.map((classItem, index) => (
              <li key={index}>
                <span className="time">{classItem.className || 'N/A'}</span>
                <span className="subject">{classItem.date || 'N/A'}</span>
                <span className="room">{classItem.day || 'N/A'}</span>
              </li>
            ))}
            {/* <li>
              <span className="time">09:00 AM - 10:30 AM</span>
              <span className="subject">Data Structures (CS-201)</span>
              <span className="room">Room 302</span>
            </li>
            <li>
              <span className="time">11:00 AM - 12:30 PM</span>
              <span className="subject">Algorithms (CS-301)</span>
              <span className="room">Room 415</span>
            </li> */}
          </ul>
        </div>
        
        <div className="section recent-activities">
          <h3>Recent Activities</h3>
          <ul>
            <li>Assignment #3 graded for CS-201</li>
            <li>Quiz #2 created for CS-301</li>
            <li>Attendance marked for CS-201 (05/20/2023)</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

// const Profile = () => {
//   const facultyData = {
//     name: "Dr. John Smith",
//     email: "john.smith@university.edu",
//     department: "Computer Science",
//     position: "Associate Professor",
//     phone: "+1 (555) 123-4567",
//     office: "Building A, Room 205",
//     joiningDate: "August 2015"
//   };

//   return (
//     <div className="profile-container">
//       <h2 className="page-title">Faculty Profile</h2>
      
//       <div className="profile-card">
//         <div className="profile-header">
//           <div className="profile-avatar">
//             <img src="https://randomuser.me/api/portraits/men/1.jpg" alt="Faculty" />
//           </div>
//           <div className="profile-info">
//             <h3>{facultyData.name}</h3>
//             <p>{facultyData.position}</p>
//             <p>{facultyData.department} Department</p>
//           </div>
//         </div>
        
//         <div className="profile-details">
//           <div className="detail-group">
//             <h4>Contact Information</h4>
//             <div className="detail-item">
//               <span>Email:</span>
//               <span>{facultyData.email}</span>
//             </div>
//             <div className="detail-item">
//               <span>Phone:</span>
//               <span>{facultyData.phone}</span>
//             </div>
//             <div className="detail-item">
//               <span>Office:</span>
//               <span>{facultyData.office}</span>
//             </div>
//           </div>
          
//           <div className="detail-group">
//             <h4>Professional Information</h4>
//             <div className="detail-item">
//               <span>Department:</span>
//               <span>{facultyData.department}</span>
//             </div>
//             <div className="detail-item">
//               <span>Position:</span>
//               <span>{facultyData.position}</span>
//             </div>
//             <div className="detail-item">
//               <span>Joining Date:</span>
//               <span>{facultyData.joiningDate}</span>
//             </div>
//           </div>
//         </div>
        
//         <button className="edit-profile-btn">Edit Profile</button>
//       </div>
//     </div>
//   );
// };

// const StudentList = () => {
//   const students = [
//     { id: 1, name: 'Alice Johnson', rollNo: 'CS-101', email: 'alice@university.edu', program: 'BSCS', semester: '5th' },
//     { id: 2, name: 'Bob Williams', rollNo: 'CS-102', email: 'bob@university.edu', program: 'BSCS', semester: '5th' },
//     { id: 3, name: 'Charlie Brown', rollNo: 'CS-103', email: 'charlie@university.edu', program: 'BSCS', semester: '5th' },
//     { id: 4, name: 'Diana Miller', rollNo: 'CS-104', email: 'diana@university.edu', program: 'BSCS', semester: '5th' },
//     { id: 5, name: 'Ethan Davis', rollNo: 'CS-105', email: 'ethan@university.edu', program: 'BSCS', semester: '5th' },
//   ];

//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredStudents = students.filter(student =>
//     student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     student.rollNo.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="student-list-container">
//       <h2 className="page-title">Student List</h2>
      
//       <div className="student-list-actions">
//         <div className="search-box">
//           <input
//             type="text"
//             placeholder="Search by name or roll no..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <div className="filter-options">
//           <select>
//             <option>All Programs</option>
//             <option>BSCS</option>
//             <option>BSSE</option>
//             <option>BSIT</option>
//           </select>
//           <select>
//             <option>All Semesters</option>
//             <option>1st</option>
//             <option>3rd</option>
//             <option>5th</option>
//             <option>7th</option>
//           </select>
//         </div>
//       </div>
      
//       <div className="student-table-container">
//         <table className="student-table">
//           <thead>
//             <tr>
//               <th>Roll No</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Program</th>
//               <th>Semester</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredStudents.map(student => (
//               <tr key={student.id}>
//                 <td>{student.rollNo}</td>
//                 <td>{student.name}</td>
//                 <td>{student.email}</td>
//                 <td>{student.program}</td>
//                 <td>{student.semester}</td>
//                 <td>
//                   <button className="view-btn">View</button>
//                   <button className="email-btn">Email</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       <div className="table-footer">
//         <div className="pagination">
//           <button disabled>Previous</button>
//           <span>Page 1 of 5</span>
//           <button>Next</button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const TimeTable = () => {
//   const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
//   const timeSlots = ['08:00-09:30', '09:30-11:00', '11:00-12:30', '12:30-14:00', '14:00-15:30'];

//   const timetableData = {
//     Monday: ['CS-201 (Room 302)', 'CS-301 (Room 415)', 'Office Hours', '', ''],
//     Tuesday: ['', 'CS-201 (Lab 2)', 'CS-301 (Room 415)', 'Department Meeting', ''],
//     Wednesday: ['CS-201 (Room 302)', 'CS-301 (Room 415)', '', 'Research Time', ''],
//     Thursday: ['', 'CS-201 (Lab 2)', 'CS-301 (Room 415)', '', 'Faculty Seminar'],
//     Friday: ['CS-201 (Room 302)', 'CS-301 (Room 415)', 'Office Hours', '', '']
//   };

//   return (
//     <div className="timetable-container">
//       <h2 className="page-title">Time Table</h2>
      
//       <div className="timetable-actions">
//         <div className="semester-selector">
//           <label>Select Semester:</label>
//           <select>
//             <option>Spring 2023</option>
//             <option>Fall 2022</option>
//             <option>Summer 2022</option>
//           </select>
//         </div>
//         <button className="print-btn">Print Time Table</button>
//       </div>
      
//       <div className="timetable-grid">
//         <table>
//           <thead>
//             <tr>
//               <th>Time/Day</th>
//               {days.map(day => (
//                 <th key={day}>{day}</th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {timeSlots.map((time, timeIndex) => (
//               <tr key={time}>
//                 <td>{time}</td>
//                 {days.map(day => (
//                   <td key={`${day}-${time}`}>
//                     {timetableData[day][timeIndex] || '-'}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       <div className="timetable-legend">
//         <div className="legend-item">
//           <span className="color-box cs-201"></span>
//           <span>CS-201 - Data Structures</span>
//         </div>
//         <div className="legend-item">
//           <span className="color-box cs-301"></span>
//           <span>CS-301 - Algorithms</span>
//         </div>
//         <div className="legend-item">
//           <span className="color-box other"></span>
//           <span>Other Activities</span>
//         </div>
//       </div>
//     </div>
//   );
// };

// const AcademicCalendar = () => {
//   const events = [
//     { date: '2023-05-15', title: 'Midterm Exams Begin', type: 'exam' },
//     { date: '2023-05-20', title: 'Last Day to Drop Courses', type: 'deadline' },
//     { date: '2023-05-25', title: 'Faculty Development Workshop', type: 'event' },
//     { date: '2023-06-05', title: 'Final Exams Begin', type: 'exam' },
//     { date: '2023-06-15', title: 'Semester Ends', type: 'deadline' },
//     { date: '2023-06-20', title: 'Grades Due', type: 'deadline' }
//   ];

//   return (
//     <div className="calendar-container">
//       <h2 className="page-title">Academic Calendar</h2>
      
//       <div className="calendar-actions">
//         <div className="calendar-navigation">
//           <button>Previous</button>
//           <h3>May 2023</h3>
//           <button>Next</button>
//         </div>
//         <div className="calendar-view">
//           <button className="active">Month</button>
//           <button>List</button>
//         </div>
//       </div>
      
//       <div className="calendar-month-view">
//         <div className="calendar-header">
//           {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//             <div key={day} className="calendar-day-header">{day}</div>
//           ))}
//         </div>
        
//         <div className="calendar-days">
//           {/* Placeholder for calendar days - in a real app, you would generate these dynamically */}
//           {Array.from({ length: 35 }).map((_, index) => (
//             <div key={index} className="calendar-day">
//               <div className="day-number">{index < 30 ? index + 1 : ''}</div>
//               {index === 14 && (
//                 <div className="calendar-event exam">Midterm Exams Begin</div>
//               )}
//               {index === 19 && (
//                 <div className="calendar-event deadline">Last Day to Drop</div>
//               )}
//               {index === 24 && (
//                 <div className="calendar-event event">Faculty Workshop</div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
      
//       <div className="calendar-list-view">
//         <h3>Upcoming Events</h3>
//         <ul>
//           {events.map((event, index) => (
//             <li key={index} className={`event-item ${event.type}`}>
//               <div className="event-date">{event.date}</div>
//               <div className="event-title">{event.title}</div>
//               <div className="event-type">{event.type}</div>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// const Attendance = () => {
//   const [selectedSubject, setSelectedSubject] = useState('CS-201');
//   const [selectedDate, setSelectedDate] = useState('2023-05-15');
  
//   const attendanceData = {
//     'CS-201': {
//       '2023-05-15': {
//         present: ['CS-101', 'CS-102', 'CS-104'],
//         absent: ['CS-103', 'CS-105']
//       },
//       '2023-05-10': {
//         present: ['CS-101', 'CS-102', 'CS-103', 'CS-105'],
//         absent: ['CS-104']
//       }
//     },
//     'CS-301': {
//       '2023-05-16': {
//         present: ['CS-101', 'CS-103', 'CS-105'],
//         absent: ['CS-102', 'CS-104']
//       }
//     }
//   };

//   const subjects = ['CS-201', 'CS-301'];
//   const dates = ['2023-05-15', '2023-05-10', '2023-05-16'];

//   const currentAttendance = attendanceData[selectedSubject]?.[selectedDate] || { present: [], absent: [] };

//   return (
//     <div className="attendance-container">
//       <h2 className="page-title">View Attendance</h2>
      
//       <div className="attendance-filters">
//         <div className="filter-group">
//           <label>Select Subject:</label>
//           <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
//             {subjects.map(subject => (
//               <option key={subject} value={subject}>{subject}</option>
//             ))}
//           </select>
//         </div>
        
//         <div className="filter-group">
//           <label>Select Date:</label>
//           <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
//             {dates.map(date => (
//               <option key={date} value={date}>{new Date(date).toLocaleDateString()}</option>
//             ))}
//           </select>
//         </div>
        
//         <button className="export-btn">Export to Excel</button>
//       </div>
      
//       <div className="attendance-summary">
//         <div className="summary-card">
//           <h4>Total Students</h4>
//           <p>{currentAttendance.present.length + currentAttendance.absent.length}</p>
//         </div>
//         <div className="summary-card present">
//           <h4>Present</h4>
//           <p>{currentAttendance.present.length}</p>
//         </div>
//         <div className="summary-card absent">
//           <h4>Absent</h4>
//           <p>{currentAttendance.absent.length}</p>
//         </div>
//         <div className="summary-card percentage">
//           <h4>Attendance %</h4>
//           <p>{
//             ((currentAttendance.present.length / 
//               (currentAttendance.present.length + currentAttendance.absent.length)) * 100 || 0).toFixed(1)
//           }%</p>
//         </div>
//       </div>
      
//       <div className="attendance-details">
//         <div className="present-list">
//           <h3>Present Students</h3>
//           <ul>
//             {currentAttendance.present.map(rollNo => (
//               <li key={rollNo}>{rollNo}</li>
//             ))}
//           </ul>
//         </div>
        
//         <div className="absent-list">
//           <h3>Absent Students</h3>
//           <ul>
//             {currentAttendance.absent.map(rollNo => (
//               <li key={rollNo}>{rollNo}</li>
//             ))}
//           </ul>
//         </div>
//       </div>
      
//       <div className="attendance-chart">
//         <h3>Attendance Trend</h3>
//         <div className="chart-placeholder">
//           {/* In a real app, you would use a charting library here */}
//           <p>Attendance chart visualization would appear here</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// const MarkAttendance = () => {
//   const [selectedSubject, setSelectedSubject] = useState('CS-201');
//   const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
//   const [students, setStudents] = useState([
//     { id: 1, rollNo: 'CS-101', name: 'Alice Johnson', present: true },
//     { id: 2, rollNo: 'CS-102', name: 'Bob Williams', present: true },
//     { id: 3, rollNo: 'CS-103', name: 'Charlie Brown', present: false },
//     { id: 4, rollNo: 'CS-104', name: 'Diana Miller', present: true },
//     { id: 5, rollNo: 'CS-105', name: 'Ethan Davis', present: false }
//   ]);

//   const toggleAttendance = (id) => {
//     setStudents(students.map(student => 
//       student.id === id ? { ...student, present: !student.present } : student
//     ));
//   };

//   const handleSubmit = () => {
//     // Submit attendance to backend
//     alert('Attendance marked successfully!');
//   };

//   return (
//     <div className="mark-attendance-container">
//       <h2 className="page-title">Mark Attendance</h2>
      
//       <div className="attendance-form">
//         <div className="form-group">
//           <label>Subject:</label>
//           <select value={selectedSubject} onChange={(e) => setSelectedSubject(e.target.value)}>
//             <option value="CS-201">CS-201 - Data Structures</option>
//             <option value="CS-301">CS-301 - Algorithms</option>
//           </select>
//         </div>
        
//         <div className="form-group">
//           <label>Date:</label>
//           <input 
//             type="date" 
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//           />
//         </div>
//       </div>
      
//       <div className="attendance-list">
//         <table>
//           <thead>
//             <tr>
//               <th>Roll No</th>
//               <th>Name</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students.map(student => (
//               <tr key={student.id}>
//                 <td>{student.rollNo}</td>
//                 <td>{student.name}</td>
//                 <td>
//                   <span className={`status ${student.present ? 'present' : 'absent'}`}>
//                     {student.present ? 'Present' : 'Absent'}
//                   </span>
//                 </td>
//                 <td>
//                   <button 
//                     onClick={() => toggleAttendance(student.id)}
//                     className={student.present ? 'absent-btn' : 'present-btn'}
//                   >
//                     {student.present ? 'Mark Absent' : 'Mark Present'}
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       <div className="attendance-actions">
//         <button className="save-btn" onClick={handleSubmit}>Save Attendance</button>
//         <button className="cancel-btn">Cancel</button>
//       </div>
//     </div>
//   );
// };

// const Assignments = () => {
//   const [activeTab, setActiveTab] = useState('create');
//   const [assignments, setAssignments] = useState([
//     { id: 1, title: 'Assignment 1', subject: 'CS-201', dueDate: '2023-05-20', submissions: 42, totalStudents: 45, graded: 38 },
//     { id: 2, title: 'Assignment 2', subject: 'CS-301', dueDate: '2023-05-25', submissions: 40, totalStudents: 45, graded: 25 },
//     { id: 3, title: 'Assignment 3', subject: 'CS-201', dueDate: '2023-06-01', submissions: 35, totalStudents: 45, graded: 0 }
//   ]);

//   const [newAssignment, setNewAssignment] = useState({
//     title: '',
//     subject: 'CS-201',
//     description: '',
//     dueDate: '',
//     totalMarks: 100
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAssignment({ ...newAssignment, [name]: value });
//   };

//   const handleCreateAssignment = (e) => {
//     e.preventDefault();
//     const assignment = {
//       id: assignments.length + 1,
//       title: newAssignment.title,
//       subject: newAssignment.subject,
//       dueDate: newAssignment.dueDate,
//       submissions: 0,
//       totalStudents: 45,
//       graded: 0
//     };
//     setAssignments([...assignments, assignment]);
//     setNewAssignment({
//       title: '',
//       subject: 'CS-201',
//       description: '',
//       dueDate: '',
//       totalMarks: 100
//     });
//     alert('Assignment created successfully!');
//   };

//   return (
//     <div className="assignments-container">
//       <h2 className="page-title">Assignments</h2>
      
//       <div className="assignments-tabs">
//         <button 
//           className={activeTab === 'create' ? 'active' : ''}
//           onClick={() => setActiveTab('create')}
//         >
//           Create Assignment
//         </button>
//         <button 
//           className={activeTab === 'view' ? 'active' : ''}
//           onClick={() => setActiveTab('view')}
//         >
//           View Assignments
//         </button>
//       </div>
      
//       {activeTab === 'create' ? (
//         <div className="create-assignment">
//           <form onSubmit={handleCreateAssignment}>
//             <div className="form-group">
//               <label>Title:</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={newAssignment.title}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Subject:</label>
//               <select
//                 name="subject"
//                 value={newAssignment.subject}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="CS-201">CS-201 - Data Structures</option>
//                 <option value="CS-301">CS-301 - Algorithms</option>
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label>Description:</label>
//               <textarea
//                 name="description"
//                 value={newAssignment.description}
//                 onChange={handleInputChange}
//                 rows="5"
//                 required
//               />
//             </div>
            
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Due Date:</label>
//                 <input
//                   type="date"
//                   name="dueDate"
//                   value={newAssignment.dueDate}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label>Total Marks:</label>
//                 <input
//                   type="number"
//                   name="totalMarks"
//                   value={newAssignment.totalMarks}
//                   onChange={handleInputChange}
//                   min="1"
//                   required
//                 />
//               </div>
//             </div>
            
//             <div className="form-actions">
//               <button type="submit" className="submit-btn">Create Assignment</button>
//               <button type="button" className="cancel-btn">Cancel</button>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <div className="view-assignments">
//           <div className="assignment-list">
//             {assignments.map(assignment => (
//               <div key={assignment.id} className="assignment-card">
//                 <div className="assignment-header">
//                   <h3>{assignment.title}</h3>
//                   <span className="subject-badge">{assignment.subject}</span>
//                 </div>
                
//                 <div className="assignment-details">
//                   <p><strong>Due Date:</strong> {assignment.dueDate}</p>
//                   <p><strong>Submissions:</strong> {assignment.submissions}/{assignment.totalStudents}</p>
//                   <p><strong>Graded:</strong> {assignment.graded}/{assignment.submissions}</p>
//                 </div>
                
//                 <div className="assignment-progress">
//                   <div className="progress-bar">
//                     <div 
//                       className="progress-fill submissions" 
//                       style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
//                     ></div>
//                   </div>
//                   <span>Submissions: {Math.round((assignment.submissions / assignment.totalStudents) * 100)}%</span>
//                 </div>
                
//                 <div className="assignment-actions">
//                   <button className="view-btn">View Submissions</button>
//                   <button className="grade-btn">Grade Assignments</button>
//                   <button className="details-btn">Details</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const Quizzes = () => {
//   const [activeTab, setActiveTab] = useState('create');
//   const [quizzes, setQuizzes] = useState([
//     { id: 1, title: 'Quiz 1', subject: 'CS-201', date: '2023-05-18', duration: 30, attempts: 42, totalStudents: 45, averageScore: 75 },
//     { id: 2, title: 'Quiz 2', subject: 'CS-301', date: '2023-05-22', duration: 45, attempts: 40, totalStudents: 45, averageScore: 68 },
//     { id: 3, title: 'Quiz 3', subject: 'CS-201', date: '2023-05-29', duration: 60, attempts: 0, totalStudents: 45, averageScore: 0 }
//   ]);

//   const [newQuiz, setNewQuiz] = useState({
//     title: '',
//     subject: 'CS-201',
//     description: '',
//     date: '',
//     duration: 30,
//     totalMarks: 100,
//     questions: []
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewQuiz({ ...newQuiz, [name]: value });
//   };

//   const handleCreateQuiz = (e) => {
//     e.preventDefault();
//     const quiz = {
//       id: quizzes.length + 1,
//       title: newQuiz.title,
//       subject: newQuiz.subject,
//       date: newQuiz.date,
//       duration: newQuiz.duration,
//       attempts: 0,
//       totalStudents: 45,
//       averageScore: 0
//     };
//     setQuizzes([...quizzes, quiz]);
//     setNewQuiz({
//       title: '',
//       subject: 'CS-201',
//       description: '',
//       date: '',
//       duration: 30,
//       totalMarks: 100,
//       questions: []
//     });
//     alert('Quiz created successfully!');
//   };

//   return (
//     <div className="quizzes-container">
//       <h2 className="page-title">Quizzes</h2>
      
//       <div className="quizzes-tabs">
//         <button 
//           className={activeTab === 'create' ? 'active' : ''}
//           onClick={() => setActiveTab('create')}
//         >
//           Create Quiz
//         </button>
//         <button 
//           className={activeTab === 'view' ? 'active' : ''}
//           onClick={() => setActiveTab('view')}
//         >
//           View Quizzes
//         </button>
//       </div>
      
//       {activeTab === 'create' ? (
//         <div className="create-quiz">
//           <form onSubmit={handleCreateQuiz}>
//             <div className="form-group">
//               <label>Title:</label>
//               <input
//                 type="text"
//                 name="title"
//                 value={newQuiz.title}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
            
//             <div className="form-group">
//               <label>Subject:</label>
//               <select
//                 name="subject"
//                 value={newQuiz.subject}
//                 onChange={handleInputChange}
//                 required
//               >
//                 <option value="CS-201">CS-201 - Data Structures</option>
//                 <option value="CS-301">CS-301 - Algorithms</option>
//               </select>
//             </div>
            
//             <div className="form-group">
//               <label>Description:</label>
//               <textarea
//                 name="description"
//                 value={newQuiz.description}
//                 onChange={handleInputChange}
//                 rows="5"
//                 required
//               />
//             </div>
            
//             <div className="form-row">
//               <div className="form-group">
//                 <label>Date:</label>
//                 <input
//                   type="date"
//                   name="date"
//                   value={newQuiz.date}
//                   onChange={handleInputChange}
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label>Duration (minutes):</label>
//                 <input
//                   type="number"
//                   name="duration"
//                   value={newQuiz.duration}
//                   onChange={handleInputChange}
//                   min="1"
//                   required
//                 />
//               </div>
              
//               <div className="form-group">
//                 <label>Total Marks:</label>
//                 <input
//                   type="number"
//                   name="totalMarks"
//                   value={newQuiz.totalMarks}
//                   onChange={handleInputChange}
//                   min="1"
//                   required
//                 />
//               </div>
//             </div>
            
//             <div className="questions-section">
//               <h3>Questions</h3>
//               <div className="question-list">
//                 {/* In a real app, you would have dynamic question management */}
//                 <p>Question management interface would appear here</p>
//               </div>
//               <button type="button" className="add-question-btn">Add Question</button>
//             </div>
            
//             <div className="form-actions">
//               <button type="submit" className="submit-btn">Create Quiz</button>
//               <button type="button" className="cancel-btn">Cancel</button>
//             </div>
//           </form>
//         </div>
//       ) : (
//         <div className="view-quizzes">
//           <div className="quiz-list">
//             {quizzes.map(quiz => (
//               <div key={quiz.id} className="quiz-card">
//                 <div className="quiz-header">
//                   <h3>{quiz.title}</h3>
//                   <span className="subject-badge">{quiz.subject}</span>
//                 </div>
                
//                 <div className="quiz-details">
//                   <p><strong>Date:</strong> {quiz.date}</p>
//                   <p><strong>Duration:</strong> {quiz.duration} minutes</p>
//                   {/* <p><strong>Attempts:</strong> {quiz.attempts}/{quiz.totalStudents}</p> */}
//                                     <p><strong>Attempts:</strong> {quiz.attempts}/{quiz.totalStudents}</p>
//                   <p><strong>Average Score:</strong> {quiz.averageScore}%</p>
//                 </div>
                
//                 <div className="quiz-progress">
//                   <div className="progress-bar">
//                     <div 
//                       className="progress-fill attempts" 
//                       style={{ width: `${(quiz.attempts / quiz.totalStudents) * 100}%` }}
//                     ></div>
//                   </div>
//                   <span>Participation: {Math.round((quiz.attempts / quiz.totalStudents) * 100)}%</span>
//                 </div>
                
//                 <div className="quiz-actions">
//                   <button className="view-btn">View Results</button>
//                   <button className="edit-btn">Edit Quiz</button>
//                   <button className="delete-btn">Delete</button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// CSS Styles


const styles = `
:root {
  --primary: #3498db;
  --secondary: #2ecc71;
  --danger: #e74c3c;
  --warning: #f39c12;
  --info: #1abc9c;
  --dark: #2c3e50;
  --light: #ecf0f1;
  --gray: #95a5a6;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.dashboard-container {
  display: flex;
  min-height: 100vh;
  background-color: #f5f7fa;
}

.sidebar {
  width: 250px;
  background-color: var(--dark);
  color: white;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
}

.sidebar-collapsed .sidebar {
  width: 70px;
}

.sidebar-header {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h2 {
  font-size: 1.2rem;
  white-space: nowrap;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
}

.sidebar-nav {
  flex: 1;
  padding: 20px 0;
}

.sidebar-nav ul {
  list-style: none;
}

.sidebar-nav li {
  margin-bottom: 5px;
}

.sidebar-nav a {
  display: flex;
  align-items: center;
  padding: 12px 20px;
  color: var(--light);
  text-decoration: none;
  transition: all 0.2s;
}

.sidebar-nav a:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.nav-icon {
  margin-right: 10px;
  font-size: 1.2rem;
}

.nav-text {
  white-space: nowrap;
}

.sidebar-collapsed .nav-text {
  display: none;
}

.sidebar-collapsed .sidebar-nav a {
  justify-content: center;
}

.sidebar-collapsed .nav-icon {
  margin-right: 0;
  font-size: 1.4rem;
}

.sidebar-footer {
  padding: 15px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.logout-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px;
  background: none;
  border: none;
  color: var(--light);
  cursor: pointer;
  transition: all 0.2s;
}

.logout-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.top-bar {
  background-color: white;
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.top-bar h1 {
  font-size: 1.5rem;
  color: var(--dark);
}

.user-info {
  display: flex;
  align-items: center;
}

.user-info span {
  margin-right: 15px;
  color: var(--gray);
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
}

.user-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-area {
  flex: 1;
  padding: 25px;
  overflow-y: auto;
}

.page-title {
  margin-bottom: 20px;
  color: var(--dark);
}

/* Home Page Styles */
.home-container {
  max-width: 1200px;
  margin: 0 auto;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.stat-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
}

.stat-icon {
  font-size: 2rem;
  margin-right: 15px;
}

.stat-info h3 {
  font-size: 1rem;
  color: var(--gray);
  margin-bottom: 5px;
}

.stat-info p {
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--dark);
}

.dashboard-sections {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.section {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  overflow: auto;
}

.section h3 {
  margin-bottom: 15px;
  color: var(--dark);
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.upcoming-classes li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.upcoming-classes li:last-child {
  border-bottom: none;
}

.upcoming-classes .time {
  color: var(--primary);
  font-weight: bold;
  width: 120px;
}

.upcoming-classes .subject {
  flex: 1;
  padding: 0 10px;
}

.upcoming-classes .room {
  color: var(--gray);
  width: 80px;
  text-align: right;
}

.recent-activities li {
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  list-style-type: none;
  padding-left: 20px;
  position: relative;
}

.recent-activities li:last-child {
  border-bottom: none;
}

.recent-activities li::before {
  content: '•';
  color: var(--primary);
  position: absolute;
  left: 0;
}

/* Profile Page Styles */
.profile-container {
  max-width: 800px;
  margin: 0 auto;
}

.profile-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.profile-header {
  display: flex;
  align-items: center;
  padding: 30px;
  background-color: var(--primary);
  color: white;
}

.profile-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
  border: 3px solid white;
}

.profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.profile-info h3 {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.profile-info p {
  opacity: 0.9;
}

.profile-details {
  padding: 30px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
}

.detail-group h4 {
  margin-bottom: 15px;
  color: var(--primary);
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
}

.detail-item {
  display: flex;
  margin-bottom: 10px;
}

.detail-item span:first-child {
  font-weight: bold;
  width: 120px;
  color: var(--dark);
}

.detail-item span:last-child {
  color: var(--gray);
}

.edit-profile-btn {
  display: block;
  width: 200px;
  margin: 20px auto;
  padding: 10px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.edit-profile-btn:hover {
  background-color: #2980b9;
}

/* Student List Styles */
.student-list-container {
  max-width: 1200px;
  margin: 0 auto;
}

.student-list-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.search-box input {
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 300px;
}

.filter-options select {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-left: 10px;
}

.student-table-container {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.student-table {
  width: 100%;
  border-collapse: collapse;
}

.student-table th, .student-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.student-table th {
  background-color: #f9f9f9;
  color: var(--dark);
  font-weight: 600;
}

.student-table tr:hover {
  background-color: #f5f5f5;
}

.view-btn, .email-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 5px;
}

.view-btn {
  background-color: var(--primary);
  color: white;
}

.email-btn {
  background-color: var(--gray);
  color: white;
}

.table-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}

.pagination {
  display: flex;
  align-items: center;
}

.pagination button {
  padding: 5px 10px;
  margin: 0 5px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.pagination span {
  margin: 0 10px;
}

/* Time Table Styles */
.timetable-container {
  max-width: 1200px;
  margin: 0 auto;
}

.timetable-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.semester-selector {
  display: flex;
  align-items: center;
}

.semester-selector label {
  margin-right: 10px;
}

.semester-selector select {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.print-btn {
  padding: 8px 15px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.timetable-grid {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: auto;
}

.timetable-grid table {
  width: 100%;
  border-collapse: collapse;
}

.timetable-grid th, .timetable-grid td {
  padding: 12px 15px;
  text-align: center;
  border: 1px solid #eee;
}

.timetable-grid th {
  background-color: #f9f9f9;
  color: var(--dark);
  font-weight: 600;
}

.timetable-grid td {
  min-width: 150px;
  height: 60px;
  vertical-align: middle;
}

.cs-201 {
  background-color: #e3f2fd;
  color: #1976d2;
}

.cs-301 {
  background-color: #e8f5e9;
  color: #388e3c;
}

.other {
  background-color: #fff8e1;
  color: #ffa000;
}

.timetable-legend {
  display: flex;
  margin-top: 20px;
  justify-content: center;
}

.legend-item {
  display: flex;
  align-items: center;
  margin: 0 15px;
}

.color-box {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  margin-right: 8px;
}

.cs-201 {
  background-color: #e3f2fd;
  border: 1px solid #1976d2;
}

.cs-301 {
  background-color: #e8f5e9;
  border: 1px solid #388e3c;
}

.other {
  background-color: #fff8e1;
  border: 1px solid #ffa000;
}

/* Academic Calendar Styles */
.calendar-container {
  max-width: 1200px;
  margin: 0 auto;
}

.calendar-actions {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.calendar-navigation {
  display: flex;
  align-items: center;
}

.calendar-navigation h3 {
  margin: 0 15px;
}

.calendar-navigation button {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
}

.calendar-view {
  display: flex;
}

.calendar-view button {
  padding: 5px 15px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
}

.calendar-view button.active {
  background-color: var(--primary);
  color: white;
  border-color: var(--primary);
}

.calendar-month-view {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.calendar-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 15px 0;
  text-align: center;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-day {
  min-height: 100px;
  padding: 10px;
  border-right: 1px solid #eee;
  border-bottom: 1px solid #eee;
}

.calendar-day:nth-child(7n) {
  border-right: none;
}

.day-number {
  font-weight: bold;
  margin-bottom: 5px;
}

.calendar-event {
  font-size: 0.8rem;
  padding: 3px 5px;
  margin-bottom: 3px;
  border-radius: 3px;
  cursor: pointer;
}

.exam {
  background-color: #ffebee;
  color: #d32f2f;
}

.deadline {
  background-color: #e3f2fd;
  color: #1976d2;
}

.event {
  background-color: #e8f5e9;
  color: #388e3c;
}

.calendar-list-view {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 20px;
}

.calendar-list-view h3 {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.event-item {
  display: flex;
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
}

.event-item:last-child {
  border-bottom: none;
}

.event-date {
  width: 120px;
  font-weight: bold;
}

.event-title {
  flex: 1;
}

.event-type {
  width: 100px;
  text-align: right;
  text-transform: capitalize;
}

/* Attendance Styles */
.attendance-container {
  max-width: 1200px;
  margin: 0 auto;
}

.attendance-filters {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
}

.filter-group label {
  margin-right: 10px;
  white-space: nowrap;
}

.filter-group select, .filter-group input {
  padding: 8px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.export-btn {
  padding: 8px 15px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-left: auto;
}

.attendance-summary {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.summary-card {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.summary-card h4 {
  color: var(--gray);
  margin-bottom: 10px;
}

.summary-card p {
  font-size: 1.8rem;
  font-weight: bold;
  color: var(--dark);
}

.present {
  border-top: 4px solid var(--secondary);
}

.absent {
  border-top: 4px solid var(--danger);
}

.percentage {
  border-top: 4px solid var(--primary);
}

.attendance-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.present-list, .absent-list {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.present-list h3, .absent-list h3 {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.present-list ul, .absent-list ul {
  list-style: none;
}

.present-list li, .absent-list li {
  padding: 8px 0;
  border-bottom: 1px solid #f5f5f5;
}

.present-list li:last-child, .absent-list li:last-child {
  border-bottom: none;
}

.attendance-chart {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 30px;
}

.attendance-chart h3 {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border-radius: 4px;
  color: var(--gray);
}

/* Mark Attendance Styles */
.mark-attendance-container {
  max-width: 800px;
  margin: 0 auto;
}

.attendance-form {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}

.form-group {
  flex: 1;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--dark);
}

.form-group select, .form-group input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.attendance-list {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  margin-bottom: 20px;
}

.attendance-list table {
  width: 100%;
  border-collapse: collapse;
}

.attendance-list th, .attendance-list td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.attendance-list th {
  background-color: #f9f9f9;
  color: var(--dark);
  font-weight: 600;
}

.status {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.status.present {
  background-color: #e8f5e9;
  color: #388e3c;
}

.status.absent {
  background-color: #ffebee;
  color: #d32f2f;
}

.present-btn, .absent-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.present-btn {
  background-color: #388e3c;
  color: white;
}

.absent-btn {
  background-color: #d32f2f;
  color: white;
}

.attendance-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.save-btn {
  padding: 10px 20px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  padding: 10px 20px;
  background-color: var(--gray);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

/* Assignments Styles */
.assignments-container {
  max-width: 1200px;
  margin: 0 auto;
}

.assignments-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.assignments-tabs button {
  padding: 10px 20px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
}

.assignments-tabs button.active {
  color: var(--primary);
  font-weight: bold;
}

.assignments-tabs button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary);
}

.create-assignment form {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  color: var(--dark);
}

.form-group input, .form-group select, .form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.form-row {
  display: flex;
  gap: 20px;
}

.form-row .form-group {
  flex: 1;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.submit-btn {
  padding: 10px 20px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  padding: 10px 20px;
  background-color: var(--gray);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.view-assignments {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.assignment-list {
  display: grid;
  gap: 20px;
}

.assignment-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
}

.assignment-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.assignment-header h3 {
  flex: 1;
}

.subject-badge {
  padding: 3px 8px;
  background-color: #e3f2fd;
  color: #1976d2;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: bold;
}

.assignment-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 15px;
}

.assignment-details p {
  font-size: 0.9rem;
}

.assignment-details strong {
  color: var(--dark);
}

.progress-bar {
  height: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
  margin-bottom: 5px;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
}

.submissions {
  background-color: var(--primary);
}

.assignment-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.view-btn, .grade-btn, .details-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.view-btn {
  background-color: var(--primary);
  color: white;
}

.grade-btn {
  background-color: var(--secondary);
  color: white;
}

.details-btn {
  background-color: var(--gray);
  color: white;
}

/* Quizzes Styles */
.quizzes-container {
  max-width: 1200px;
  margin: 0 auto;
}

.quizzes-tabs {
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
}

.quizzes-tabs button {
  padding: 10px 20px;
  background: none;
  border: none;
  cursor: pointer;
  position: relative;
}

.quizzes-tabs button.active {
  color: var(--primary);
  font-weight: bold;
}

.quizzes-tabs button.active::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary);
}

.create-quiz form {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.questions-section {
  margin-top: 30px;
}

.questions-section h3 {
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.question-list {
  min-height: 100px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 4px;
  margin-bottom: 15px;
}

.add-question-btn {
  padding: 8px 15px;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.view-quizzes {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.quiz-list {
  display: grid;
  gap: 20px;
}

.quiz-card {
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
}

.quiz-header {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.quiz-header h3 {
  flex: 1;
}

.quiz-details {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 15px;
}

.quiz-details p {
  font-size: 0.9rem;
}

.quiz-details strong {
  color: var(--dark);
}

.attempts {
  background-color: var(--info);
}

.quiz-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 15px;
}

.view-btn, .edit-btn, .delete-btn {
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.view-btn {
  background-color: var(--primary);
  color: white;
}

.edit-btn {
  background-color: var(--warning);
  color: white;
}

.delete-btn {
  background-color: var(--danger);
  color: white;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .dashboard-sections {
    grid-template-columns: 1fr;
  }
  
  .attendance-details {
    grid-template-columns: 1fr;
  }
  
  .form-row {
    flex-direction: column;
    gap: 15px;
  }
  
  .assignment-details, .quiz-details {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }
  
  .attendance-summary {
    grid-template-columns: 1fr 1fr;
  }
  
  .assignment-details, .quiz-details {
    grid-template-columns: 1fr;
  }
  
  .student-list-actions, .timetable-actions, .calendar-actions, .attendance-filters {
    flex-direction: column;
    gap: 10px;
  }
  
  .export-btn, .print-btn {
    margin-left: 0;
    align-self: flex-start;
  }
  
  .profile-details {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }
  
  .attendance-summary {
    grid-template-columns: 1fr;
  }
  
  .sidebar-collapsed .sidebar {
    width: 0;
    overflow: hidden;
  }
  
  .sidebar-collapsed .main-content {
    margin-left: 0;
  }
  
  .top-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .user-info {
    margin-top: 10px;
  }
  
  .assignment-actions, .quiz-actions {
    flex-direction: column;
    gap: 5px;
  }
  
  .assignment-actions button, .quiz-actions button {
    width: 100%;
  }
}
`;

// Create a style element and append the CSS to it
const styleElement = document.createElement('style');
styleElement.textContent = styles;
document.head.appendChild(styleElement);

export default FacultyDashboard;