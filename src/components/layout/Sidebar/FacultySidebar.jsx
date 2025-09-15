import React, { useState } from "react";
import "../../../CSSfolder/CommonCSS/sidebar.css";
import { Link } from "react-router-dom";
import { FiHome, FiUser, FiUsers, FiCalendar, FiClock, FiCheckSquare, FiBook, FiFileText, FiAward, FiBarChart2, FiLogOut } from 'react-icons/fi';
// import "./SidebarCSS/FacultySidebar.css";
import {
  FaUserTie,
  FaClipboardList,
  FaAngleRight,
  FaBookOpen,
} from "react-icons/fa";
// import { MdDashboard } from "react-icons/md";
// import { FaUserTie, FaAngleRight } from "react-icons/fa";

const FacultySidebar = () => {
  const [facultylist, setFacultylist] = useState("none");
  const [attendencelist, setattendencelist] = useState("none");
  const [assignmentlist, setassignmentlist] = useState("none");
  const [quizlist, setquizlist] = useState("none");
  const theme = localStorage.getItem("theme");
  const id = localStorage.getItem("profileid");
  const facultytoggleList = () => {
    setFacultylist(facultylist === "none" ? "block" : "none");
  };

  const Attendencelistdisplay = () => {
    setattendencelist(attendencelist === "none" ? "block" : "none");
  };

  const Assignmentlistdisplay = () => {
    setassignmentlist(assignmentlist === "none" ? "block" : "none");
  };

  const Quizlistdisplay = () => {
    setquizlist(quizlist === "none" ? "block" : "none");
  };

  return (
    <div className="sidebar-content">
      <h2>Faculty Menu</h2>
      <div className="sidebar-scrollable">
        <li className="arrow-list">
          <Link to="/faculty/facultydash">
            <div
              className="ad-min"
              style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
            >
              <FiHome className="nav-icon" />
              Faculty Dashboard
            </div>
          </Link>
          <button
            onClick={facultytoggleList}
            className="student-toggle-btn"
            style={{
              transform: facultylist !== "block" ? "" : "rotate(90deg)",
            }}
          >
            <FaAngleRight />
          </button>
        </li>
        <ul className="sidebar-links" style={{ display: facultylist }}>
          <Link to={`/faculty/faculty-profile/${id}`}>
            <li><FiUser className="nav-icon" /> My Profile</li>
          </Link>
          <Link to="/faculty/student-list">
            <li>
              <FiUsers className="nav-icon" />
              Studentlist
            </li>
          </Link>
          <Link to="/faculty/view-timetable">
            <li>
              <FiClock className="nav-icon" />
              View TimeTable
              </li>
          </Link>
          <Link to="/faculty/viewacadmic-calender">
            <li>
              <FiCalendar className="nav-icon" /> AcademicCalendar
              </li>
          </Link>
        </ul>

        {/* ****************Attendance Management************* */}
        <li className="arrow-list" onClick={Attendencelistdisplay}>
          <div
            className="ad-min"
            style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
          >
            <FiCheckSquare className="nav-icon" />
            Attendance
          </div>
          <button
            className="student-toggle-btn"
            style={{
              transform: attendencelist !== "block" ? "" : "rotate(90deg)",
            }}
          >
            <FaAngleRight />
          </button>
        </li>
        <ul className="sidebar-links" style={{ display: attendencelist }}>
          <Link to="/faculty/mark-attendance">
            <li>Mark Attendance</li>
            </Link>
          <Link to="/faculty/attendance-by-date">
          <li>Attendance By Date</li>
          </Link>
            <Link to="/faculty/attendance-by-subject">
              <li>Attendance-by-Subject</li>
            </Link>
        </ul>

        {/* ****************Assignament Calender************* */}
        <li className="arrow-list" onClick={Assignmentlistdisplay}>
          <div
            className="ad-min"
            style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
          >
            <FiBook className="nav-icon" />
            Assignment
          </div>
          <button
            className="student-toggle-btn"
            style={{
              transform: assignmentlist !== "block" ? "" : "rotate(90deg)",
            }}
          >
            <FaAngleRight />
          </button>
        </li>
        <ul className="sidebar-links" style={{ display: assignmentlist }}>
          <Link to="/faculty/create-assignment">
            <li> Create Assignment</li>
          </Link>
          <Link to="/faculty/assignment-page">
            <li> Assignment List </li>
          </Link>
        </ul>

        {/* ****************Quiz ************* */}
        <li className="arrow-list" onClick={Quizlistdisplay}>
          <div
            className="ad-min"
            style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
          >
             <FiFileText className="nav-icon" />
            Quiz
          </div>
          <button
            className="student-toggle-btn"
            style={{
              transform: quizlist !== "block" ? "" : "rotate(90deg)",
            }}
          >
            <FaAngleRight />
          </button>
        </li>
        <ul className="sidebar-links" style={{ display: quizlist }}>
          <Link to="/faculty/set-quiz">
            <li>Create Quiz</li>
          </Link>
          <Link to="/faculty/all-quiz">
            <li>All Quizs</li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default FacultySidebar;

// <ul className="side-links">
//   {/* Faculty Dashboard */}
//   <div className="alist">
//     <Link to="/facultydash">
//       <li className="arrow-list">
//         <div className="ad-min" style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
//           <FaUserTie /> Faculty
//         </div>
//       </li>
//     </Link>
//     <button
//       onClick={() => toggleList(setFacultylist, facultylist)}
//       className="toggle-btn"
//       style={{ transform: facultylist !== "block" ? "" : "rotate(90deg)" }}
//     >
//       <FaAngleRight />
//     </button>
//   </div>
//   <ul className="faculty-list" style={{ display: facultylist }}>
//     <Link to="/allstudentlist">
//       <li>
//         <FaClipboardList />
//         Studentlist
//       </li>
//     </Link>
//     <Link to="/viewalltimetables">
//       <li>View TimeTable</li>
//     </Link>
//     <Link to="/setnewquiz">
//       <li>Create Quiz</li>
//     </Link>
//     <Link to="/allquiz">
//       <li>All Quizs</li>
//     </Link>
//   </ul>

//   {/* Attendance */}
//   <div className="alist">
//     <Link to="/attendence">
//       <li className="arrow-list">
//         <div className="ad-min" style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
//           Attendences
//         </div>
//       </li>
//     </Link>
//     <button
//       onClick={() => toggleList(setAttendanceshow, attendanceshow)}
//       className="toggle-btn"
//       style={{ transform: attendanceshow !== "block" ? "" : "rotate(90deg)" }}
//     >
//       <FaAngleRight />
//     </button>
//   </div>
//   <ul className="attendence-list" style={{ display: attendanceshow }}>
//     <Link to="/attendance-dashboard">
//       <li>Attendance Dashboard</li>
//     </Link>
//     <Link to="/attendance-recording">
//       <li>Attendance Recording</li>
//     </Link>
//     <Link to="/attendance-reports">
//       <li>Attendance Reports</li>
//     </Link>
//   </ul>

//   {/* Assignments */}
//   <div className="alist">
//     <Link to="/assignment">
//       <li className="arrow-list">
//         <div className="ad-min" style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
//           Assignments
//         </div>
//       </li>
//     </Link>
//     <button
//       onClick={() => toggleList(setAssignmentshow, assignmentshow)}
//       className="toggle-btn"
//       style={{ transform: assignmentshow !== "block" ? "" : "rotate(90deg)" }}
//     >
//       <FaAngleRight />
//     </button>
//   </div>
//   <ul className="assignment-list" style={{ display: assignmentshow }}>
//     <Link to="/create-assignment">
//       <li>Create Assignment</li>
//     </Link>
//     <Link to="/class-management">
//       <li>Class Management</li>
//     </Link>
//     <Link to="/communication">
//       <li>Communication</li>
//     </Link>
//   </ul>

//   {/* Subjects */}
//   <div className="alist">
//     <Link to="/attendence">
//       <li className="arrow-list">
//         <div className="ad-min" style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
//           Subjects
//         </div>
//       </li>
//     </Link>
//     <button
//       onClick={() => toggleList(setSubjectshow, subjectshow)}
//       className="toggle-btn"
//       style={{ transform: subjectshow !== "block" ? "" : "rotate(90deg)" }}
//     >
//       <FaAngleRight />
//     </button>
//   </div>
//   <ul className="subject-list" style={{ display: subjectshow }}>
//     <Link to="/createsubject">
//       <li>Create Subject</li>
//     </Link>
//     <Link to="/subjectslist">
//       <li>Subject List</li>
//     </Link>
//     <Link to="/subjectdetail/:id">
//       <li>Subject Detail</li>
//     </Link>
//     <Link to="/editsubject/:id">
//       <li>Edit Subject</li>
//     </Link>
//     <Link to="/subjectassignedfaculty">
//       <li>SubjectAssignedFaculty</li>
//     </Link>
//   </ul>

//   {/* Departments */}
//   <div className="alist">
//     <Link to="/attendence">
//       <li className="arrow-list">
//         <div className="ad-min" style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
//           Departments
//         </div>
//       </li>
//     </Link>
//     <button
//       onClick={() => toggleList(setDepartment, department)}
//       className="toggle-btn"
//       style={{ transform: department !== "block" ? "" : "rotate(90deg)" }}
//     >
//       <FaAngleRight />
//     </button>
//   </div>
//   <ul className="department-list" style={{ display: department }}>
//     <Link to="/departmentform">
//       <li>Department Form</li>
//     </Link>
//     <Link to="/departmentlist">
//       <li>Department List</li>
//     </Link>
//     <Link to="/departmentdetail/:id">
//       <li>Department Detail</li>
//     </Link>
//   </ul>

//   {/* Designations */}
//   <div className="alist">
//     <Link to="/attendence">
//       <li className="arrow-list">
//         <div className="ad-min" style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
//           Designations
//         </div>
//       </li>
//     </Link>
//     <button
//       onClick={() => toggleList(setDesignationshow, designationshow)}
//       className="toggle-btn"
//       style={{ transform: designationshow !== "block" ? "" : "rotate(90deg)" }}
//     >
//       <FaAngleRight />
//     </button>
//   </div>
//   <ul className="designation-list" style={{ display: designationshow }}>
//     <Link to="/designationform">
//       <li>Designation Form</li>
//     </Link>
//     <Link to="/designationlist">
//       <li>Designation List</li>
//     </Link>
//     <Link to="/designationdetail/:id">
//       <li>Designation Detail</li>
//     </Link>
//   </ul>
// </ul>
