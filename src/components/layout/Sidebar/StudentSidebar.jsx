import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarCSS/StudentSidebar.css";
import {
  FaUserGraduate,
  FaClipboardList,
  FaAngleRight,
  FaBookOpen,
} from "react-icons/fa";

const StudentSidebar = () => {
  const [studentlist, setStudentlist] = useState("none");
  const theme = localStorage.getItem("theme");
  const studentid = localStorage.getItem("profileid");

  const studenttoggleList = () => {
    setStudentlist(studentlist === "none" ? "block" : "none");
  };

  return (
    <div className="sidebar-content">
      <h2>Student Menu</h2>
      <div className="sidebar-scrollable">
        <li className="arrow-list">
          {/* <Link to="/student/studentdash">
            <div className="ad-min" style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
              <FaUserGraduate /> 
              Student
            </div>
        </Link> */}
          <Link to="/student/studentdash">
            {" "}
            {/* Updated to match route */}
            <div
              className="ad-min"
              style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
            >
              <FaUserGraduate />
              Student Dashboard
            </div>
          </Link>
          <button
            onClick={studenttoggleList}
            className="student-toggle-btn"
            style={{
              transform: studentlist !== "block" ? "" : "rotate(90deg)",
            }}
          >
            <FaAngleRight />
          </button>
        </li>

        <ul className="sidebar-links" style={{ display: studentlist }}>
          <Link to={`/student/profile/${studentid}`}>
            <li>
              {/* <FaClipboardList /> */}
              Profile
            </li>
          </Link>

          <Link to="/student/e-course">
            <li>{/* <FaBookOpen /> */}E Resource</li>
          </Link>

          <Link to="/student/attendence">
            <li>Attendence</li>
          </Link>

          {/* <Link to="/student/submission">
            <li>Submission</li>
          </Link> */}

          {/* <Link to="/student/grades">
            <li>Grades</li>
          </Link>

          <Link to="/student/collaboration">
            <li>Collaboration</li>
          </Link> */}

          <Link to="/student/assignment-page">
            <li>Assignment</li>
          </Link>

          <Link to="/student/studentsquiz">
            <li>StudentsQuiz</li>
          </Link>

          {/* <Link to="/student/feature-one">
            <li>Feature One</li>
          </Link> */}
        </ul>
      </div>
    </div>
  );
};

export default StudentSidebar;
