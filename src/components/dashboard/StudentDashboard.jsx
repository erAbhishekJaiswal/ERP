// import React from 'react';
// import { Link } from 'react-router-dom';
// import "../../CSSfolder/StudentCSS/studentdashboard.css";

// const StudentDashboard = () => {
//   // Mock data - replace with actual data from your API
//   const studentData = {
//     name: "Sneha Patil",
//     rollNumber: "EN20230001",
//     department: "Computer Science",
//     semester: "5th",
//     upcomingAssignments: 3,
//     pendingQuizzes: 2,
//     attendancePercentage: 85,
//     ongoingCourses: 4
//   };

//   return (
//     <div className="student-dashboard">
//       {/* Header Section */}
//       <div className="dashboard-header">
//         <div className="student-profile">
//           <div className="avatar">RS</div>
//           <div className="student-info">
//             <h2>Welcome back, {studentData.name}</h2>
//             <p>{studentData.rollNumber} | {studentData.department} | {studentData.semester}</p>
//           </div>
//         </div>
//         <div className="quick-stats">
//           <div className="dashboard-stat-card">
//             <div className="stat-icon assignment">📝</div>
//             <div className="stat-content">
//               <h3>{studentData.upcomingAssignments}</h3>
//               <p>Upcoming Assignments</p>
//             </div>
//           </div>
//           <div className="dashboard-stat-card">
//             <div className="stat-icon quiz">🧠</div>
//             <div className="stat-content">
//               <h3>{studentData.pendingQuizzes}</h3>
//               <p>Pending Quizzes</p>
//             </div>
//           </div>
//           <div className="dashboard-stat-card">
//             <div className="stat-icon attendance">✅</div>
//             <div className="stat-content">
//               <h3>{studentData.attendancePercentage}%</h3>
//               <p>Attendance</p>
//             </div>
//           </div>
//           <div className="dashboard-stat-card">
//             <div className="stat-icon course">📚</div>
//             <div className="stat-content">
//               <h3>{studentData.ongoingCourses}</h3>
//               <p>Ongoing Courses</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="dashboard-content">
//         {/* Modules Section */}
//         <div className="modules-section">
//           <h2 className="section-title">Your Modules</h2>
//           <div className="modules-grid">
//             {/* Assignment Module */}
//             <Link to="/assignments" className="module-card assignment">
//               <div className="module-icon">📝</div>
//               <h3>Assignments</h3>
//               <p>View and submit your assignments</p>
//               <div className="module-badge">{studentData.upcomingAssignments} new</div>
//             </Link>

//             {/* Attendance Module */}
//             <Link to="/attendance" className="module-card attendance">
//               <div className="module-icon">✅</div>
//               <h3>Attendance</h3>
//               <p>Check your attendance records</p>
//               <div className="progress-circle">
//                 <div className="circle-progress" style={{ '--percentage': `${studentData.attendancePercentage}%` }}>
//                   <span>{studentData.attendancePercentage}%</span>
//                 </div>
//               </div>
//             </Link>

//             {/* ECourse Module */}
//             <Link to="/ecourses" className="module-card ecourse">
//               <div className="module-icon">🎓</div>
//               <h3>E-Courses</h3>
//               <p>Access your online courses</p>
//               <div className="module-badge">{studentData.ongoingCourses} active</div>
//             </Link>

//             {/* Quiz Module */}
//             <Link to="/quizzes" className="module-card quiz">
//               <div className="module-icon">🧠</div>
//               <h3>Quizzes</h3>
//               <p>Take your scheduled quizzes</p>
//               <div className="module-badge">{studentData.pendingQuizzes} pending</div>
//             </Link>
//           </div>
//         </div>

//         {/* Recent Activity Section */}
//         <div className="activity-section">
//           <h2 className="section-title">Recent Activity</h2>
//           <div className="activity-list">
//             <div className="activity-item">
//               <div className="activity-icon">📝</div>
//               <div className="activity-content">
//                 <p>Submitted <strong>Data Structures Assignment 3</strong></p>
//                 <span className="activity-time">2 hours ago</span>
//               </div>
//             </div>
//             <div className="activity-item">
//               <div className="activity-icon">✅</div>
//               <div className="activity-content">
//                 <p>Marked present in <strong>Database Systems</strong></p>
//                 <span className="activity-time">Yesterday</span>
//               </div>
//             </div>
//             <div className="activity-item">
//               <div className="activity-icon">🧠</div>
//               <div className="activity-content">
//                 <p>Completed <strong>Operating Systems Quiz 2</strong> with 85%</p>
//                 <span className="activity-time">2 days ago</span>
//               </div>
//             </div>
//             <div className="activity-item">
//               <div className="activity-icon">🎓</div>
//               <div className="activity-content">
//                 <p>Started new course <strong>Computer Networks</strong></p>
//                 <span className="activity-time">3 days ago</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FiBook, FiCheckCircle, FiClipboard, FiAward, FiClock, FiUser } from 'react-icons/fi';
// import { BsGraphUp, BsCalendarCheck } from 'react-icons/bs';
// import { RiFilePaper2Line, RiQuillPenLine } from 'react-icons/ri';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import "../../CSSfolder/StudentCSS/studentdashboard.css";

// const StudentDashboard = () => {
//   // Mock data - replace with actual data from your API
//   const studentData = {
//     name: "Sneha Patil",
//     rollNumber: "EN20230001",
//     department: "Computer Science",
//     semester: "5th Semester",
//     upcomingAssignments: 3,
//     pendingQuizzes: 2,
//     attendancePercentage: 85,
//     ongoingCourses: 4,
//     courses: [
//       { code: "CS501", name: "Advanced Algorithms", progress: 65 },
//       { code: "CS502", name: "Database Systems", progress: 80 },
//       { code: "CS503", name: "Computer Networks", progress: 45 },
//       { code: "CS504", name: "Machine Learning", progress: 30 }
//     ]
//   };

//   const recentActivities = [
//     {
//       icon: <RiFilePaper2Line />,
//       title: "Submitted Data Structures Assignment 3",
//       time: "2 hours ago",
//       type: "assignment"
//     },
//     {
//       icon: <FiCheckCircle />,
//       title: "Marked present in Database Systems",
//       time: "Yesterday",
//       type: "attendance"
//     },
//     {
//       icon: <RiQuillPenLine />,
//       title: "Completed Operating Systems Quiz 2 with 85%",
//       time: "2 days ago",
//       type: "quiz"
//     },
//     {
//       icon: <FiBook />,
//       title: "Started new course Computer Networks",
//       time: "3 days ago",
//       type: "course"
//     }
//   ];

//   return (
//     <div className="student-dashboard">
//       {/* Header Section */}
//       <header className="dashboard-header">
//         <div className="header-content">
//           <div className="student-profile">
//             <div className="avatar">
//               <FiUser />
//             </div>
//             <div className="student-info">
//               <h1>Welcome back, <span>{studentData.name}</span></h1>
//               <p className="student-meta">
//                 <span>{studentData.rollNumber}</span>
//                 <span className="divider">|</span>
//                 <span>{studentData.department}</span>
//                 <span className="divider">|</span>
//                 <span>{studentData.semester}</span>
//               </p>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Quick Stats */}
//       <div className="quick-stats-container">
//         <div className="quick-stats">
//           <div className="dashboard-stat-card">
//             <div className="stat-icon assignment">
//               <FiClipboard />
//             </div>
//             <div className="stat-content">
//               <h3>{studentData.upcomingAssignments}</h3>
//               <p>Upcoming Assignments</p>
//             </div>
//           </div>
//           <div className="dashboard-stat-card">
//             <div className="stat-icon quiz">
//               <RiQuillPenLine />
//             </div>
//             <div className="stat-content">
//               <h3>{studentData.pendingQuizzes}</h3>
//               <p>Pending Quizzes</p>
//             </div>
//           </div>
//           <div className="dashboard-stat-card">
//             <div className="stat-icon attendance">
//               <BsCalendarCheck />
//             </div>
//             <div className="stat-content">
//               <h3>{studentData.attendancePercentage}%</h3>
//               <p>Attendance</p>
//             </div>
//           </div>
//           <div className="dashboard-stat-card">
//             <div className="stat-icon course">
//               <FiBook />
//             </div>
//             <div className="stat-content">
//               <h3>{studentData.ongoingCourses}</h3>
//               <p>Ongoing Courses</p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="dashboard-content">
//         {/* Left Column */}
//         <div className="content-left">
//           {/* Modules Section */}
//           <section className="modules-section">
//             <div className="section-header">
//               <h2>Quick Access</h2>
//               <div className="section-actions"></div>
//             </div>
//             <div className="modules-grid">
//               <Link to="/student/assignment-page" className="module-card assignment">
//                 <div className="module-icon">
//                   <FiClipboard />
//                 </div>
//                 <div className="module-content">
//                   <h3>Assignments</h3>
//                   <p>View and submit your assignments</p>
//                 </div>
//                 <div className="module-badge">{studentData.upcomingAssignments} new</div>
//               </Link>

//               <Link to="/student/attendence" className="module-card attendance">
//                 <div className="module-icon">
//                   <FiCheckCircle />
//                 </div>
//                 <div className="module-content">
//                   <h3>Attendance</h3>
//                   <p>Check your attendance records</p>
//                 </div>
//                 <div className="progress-circle">
//                   <CircularProgressbar
//                     value={studentData.attendancePercentage}
//                     text={`${studentData.attendancePercentage}%`}
//                     styles={{
//                       path: {
//                         stroke: `#4CAF50`,
//                       },
//                       text: {
//                         fill: '#4CAF50',
//                         fontSize: '24px',
//                         fontWeight: 'bold',
//                       },
//                     }}
//                   />
//                 </div>
//               </Link>

//               <Link to="/student/e-course" className="module-card ecourse">
//                 <div className="module-icon">
//                   <FiBook />
//                 </div>
//                 <div className="module-content">
//                   <h3>E-Courses</h3>
//                   <p>Access your online courses</p>
//                 </div>
//                 <div className="module-badge">{studentData.ongoingCourses} active</div>
//               </Link>

//               <Link to="/student/studentsquiz" className="module-card quiz">
//                 <div className="module-icon">
//                   <RiQuillPenLine />
//                 </div>
//                 <div className="module-content">
//                   <h3>Quizzes</h3>
//                   <p>Take your scheduled quizzes</p>
//                 </div>
//                 <div className="module-badge">{studentData.pendingQuizzes} pending</div>
//               </Link>
//             </div>
//           </section>

//           {/* Courses Progress Section */}
//           {/* <section className="courses-section">
//             <div className="section-header">
//               <h2>Your Courses Progress</h2>
//               <Link to="/courses" className="view-all">View All</Link>
//             </div>
//             <div className="courses-list">
//               {studentData.courses.map((course, index) => (
//                 <div className="course-item" key={index}>
//                   <div className="course-info">
//                     <h3>{course.code}</h3>
//                     <p>{course.name}</p>
//                   </div>
//                   <div className="course-progress">
//                     <div className="progress-bar">
//                       <div
//                         className="progress-fill"
//                         style={{ width: `${course.progress}%` }}
//                       ></div>
//                     </div>
//                     <span className="progress-percent">{course.progress}%</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section> */}
//         </div>

//         {/* Right Column */}
//         {/* <div className="content-right">
//           Recent Activity Section
//           <section className="activity-section">
//             <div className="section-header">
//               <h2>Recent Activity</h2>
//               <Link to="/activity" className="view-all">View All</Link>
//             </div>
//             <div className="activity-list">
//               {recentActivities.map((activity, index) => (
//                 <div className={`activity-item ${activity.type}`} key={index}>
//                   <div className="activity-icon">{activity.icon}</div>
//                   <div className="activity-content">
//                     <p>{activity.title}</p>
//                     <div className="activity-meta">
//                       <FiClock className="time-icon" />
//                       <span>{activity.time}</span>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>

//           Performance Summary
//           <section className="performance-section">
//             <div className="section-header">
//               <h2>Performance Summary</h2>
//             </div>
//             <div className="performance-card">
//               <div className="performance-metric">
//                 <div className="metric-icon">
//                   <BsGraphUp />
//                 </div>
//                 <div className="metric-content">
//                   <h3>Overall Grade</h3>
//                   <p className="grade">A-</p>
//                   <p className="change positive">↑ 2.5% from last term</p>
//                 </div>
//               </div>
//               <div className="performance-metric">
//                 <div className="metric-icon">
//                   <FiAward />
//                 </div>
//                 <div className="metric-content">
//                   <h3>Rank in Department</h3>
//                   <p className="rank">12th</p>
//                   <p className="change positive">↑ 3 positions</p>
//                 </div>
//               </div>
//             </div>
//           </section>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiBook,
  FiCheckCircle,
  FiClipboard,
  FiAward,
  FiClock,
  FiUser,
} from "react-icons/fi";
import { BsGraphUp, BsCalendarCheck } from "react-icons/bs";
import { RiFilePaper2Line, RiQuillPenLine } from "react-icons/ri";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "../../CSSfolder/StudentCSS/studentdashboard.css";
import apiClient from '../../services/axios'

const StudentDashboard = () => {
  const [data, setData] = React.useState({
    studentdashboard: {
      student: {
        fullname: "",
        email: "",
        mobile: "",
        enrollment_number: "",
        current_semester: "",
        department_name: "",
      },
      assignments: [
            {
                assignment_id: "",
                assignment_name: "",
                upcoming: false
            }
        ],
        upcommingassignments: null,
        subjects: [
            {
                subject_id: "",
                subject_code: "",
                subject_name: ""
            }
        ],
        quiz: [
            {
                quiz_id: "",
                quiz_name: ""
            }
        ],
        totalpercentage: "00",
        exam: [
            {
                name: ""
            }
        ]
    },
  });
  const id = localStorage.getItem("profileid");
  useEffect(() => {
    const studentdata = async (id) => {
      try {
        const response = await apiClient.get(
          `/api/student/studentdashboard/${id}`
        );
        // const responseData = await response.json();
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    studentdata(id);
  }, [id]);
  // Destructure the API response data
  const {
    fullname,
    email,
    mobile,
    enrollment_number,
    current_semester,
    department_name,
  } = data?.studentdashboard?.student;

  const {
    assignments,
    upcommingassignments,
    subjects,
    quiz,
    totalpercentage,
    exam,
  } = data.studentdashboard;

  // Prepare recent activities from the data
  const recentActivities = [
    ...assignments.filter(a => !a.upcoming).map(a => ({
      icon: <RiFilePaper2Line />,
      title: `Submitted ${a.assignment_name}`,
      time: "Recently",
      type: "assignment"
    })),
    ...quiz.map(q => ({
      icon: <RiQuillPenLine />,
      title: `Completed ${q.quiz_name}`,
      time: "Recently",
      type: "quiz"
    }))
  ].slice(0, 4); // Limit to 4 most recent activities

  return (
    <div className="student-dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="student-profile">
            <div className="avatar">
              <FiUser />
            </div>
            <div className="student-info">
              <h1>Welcome back, <span>{fullname}</span></h1>
              <p style={{color:'white'}} className="student-meta">
                <span>{enrollment_number}</span>
                <span className="divider">|</span>
                <span>{department_name}</span>
                <span className="divider">|</span>
                <span>Semester {current_semester}</span>
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Quick Stats */}
      <div className="quick-stats-container">
        <div className="quick-stats">
          <div className="dashboard-stat-card">
            <div className="stat-icon assignment">
              <FiClipboard />
            </div>
            <div className="stat-content">
              <h3 style={{color:'black'}}>{upcommingassignments}</h3>
              <p>Upcoming Assignments</p>
            </div>
          </div>
          <div className="dashboard-stat-card">
            <div className="stat-icon quiz">
              <RiQuillPenLine />
            </div>
            <div className="stat-content">
              <h3 style={{color:'black'}}>{quiz.length}</h3>
              <p>Pending Quizzes</p>
            </div>
          </div>
          <div className="dashboard-stat-card">
            <div className="stat-icon attendance">
              <BsCalendarCheck />
            </div>
            <div className="stat-content">
              <h3 style={{color:'black'}}>{totalpercentage}%</h3>
              <p>Attendance</p>
            </div>
          </div>
          <div className="dashboard-stat-card">
            <div className="stat-icon course">
              <FiBook />
            </div>
            <div className="stat-content">
              <h3 style={{color:'black'}}>{subjects.length}</h3>
              <p>Ongoing Courses</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Left Column */}
        <div className="content-left">
          {/* Modules Section */}
          <section className="modules-section">
            <div className="section-header">
              <h2>Quick Access</h2>
              <div className="section-actions"></div>
            </div>
            <div className="modules-grid">
              <Link to="/student/assignment-page" className="module-card assignment">
                <div className="module-icon">
                  <FiClipboard />
                </div>
                <div className="module-content">
                  <h3>Assignments</h3>
                  <p>View and submit your assignments</p>
                </div>
                <div className="module-badge">{upcommingassignments} new</div>
              </Link>

              <Link to="/student/attendence" className="module-card attendance">
                <div className="module-icon">
                  <FiCheckCircle />
                </div>
                <div className="module-content">
                  <h3>Attendance</h3>
                  <p>Check your attendance records</p>
                </div>
                <div className="progress-circle">
                  <CircularProgressbar 
                    value={parseFloat(totalpercentage)} 
                    text={`${totalpercentage}%`}
                    styles={{
                      path: {
                        stroke: `#4CAF50`,
                      },
                      text: {
                        fill: '#4CAF50',
                        fontSize: '24px',
                        fontWeight: 'bold',
                      },
                    }}
                  />
                </div>
              </Link>

              <Link to="/student/e-course" className="module-card ecourse">
                <div className="module-icon">
                  <FiBook />
                </div>
                <div className="module-content">
                  <h3>E-Courses</h3>
                  <p>Access your online courses</p>
                </div>
                <div className="module-badge">{subjects.length} active</div>
              </Link>

              <Link to="/student/studentsquiz" className="module-card quiz">
                <div className="module-icon">
                  <RiQuillPenLine />
                </div>
                <div className="module-content">
                  <h3>Quizzes</h3>
                  <p>Take your scheduled quizzes</p>
                </div>
                <div className="module-badge">{quiz.length} pending</div>
              </Link>
            </div>
          </section>

          {/* Courses Progress Section */}
          <section className="courses-section">
            <div className="section-header">
              <h2>Your Subjects</h2>
              {/* <Link to="/student/subjects" className="view-all">View All</Link> */}
            </div>
            <div className="courses-list">
              {subjects.map((subject, index) => (
                <div className="course-item" key={index}>
                  <div className="course-info">
                    <h3>{subject.subject_code}</h3>
                    <p>{subject.subject_name}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="content-right">
          {/* Recent Activity Section */}
          <section className="activity-section">
            <div className="section-header">
              <h2>Recent Activity</h2>
              {/* <Link to="/student/activity" className="view-all">View All</Link> */}
            </div>
            <div className="activity-list">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div className={`activity-item ${activity.type}`} key={index}>
                    <div className="activity-icon">{activity.icon}</div>
                    <div className="activity-content">
                      <p>{activity.title}</p>
                      <div className="activity-meta">
                        <FiClock className="time-icon" />
                        <span>{activity.time}</span>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-activities">
                  <p>No recent activities found</p>
                </div>
              )}
            </div>
          </section>

          {/* Exams Section */}
          <section className="performance-section">
            <div className="section-header">
              <h2>Upcoming Exams</h2>
            </div>
            <div className="performance-card">
              {exam.length > 0 ? (
                exam.map((examItem, index) => (
                  <div className="performance-metric" key={index}>
                    <div className="metric-icon">
                      <FiAward />
                    </div>
                    <div className="metric-content">
                      <h3>{examItem.name}</h3>
                      <p className="grade">Prepare your notes</p>
                      <p className="change positive">Upcoming</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-exams">
                  <p>No upcoming exams scheduled</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
