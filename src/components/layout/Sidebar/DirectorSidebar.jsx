import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarCSS/DirectorSidebar.css";
import "../../../CSSfolder/CommonCSS/sidebar.css";
import { FaUserTie, FaAngleRight } from "react-icons/fa";

const DirectorSidebar = () => {
  const [directorlist, setDirectorlist] = useState("none");
  const theme = localStorage.getItem("theme");

  const dirctortoggleList = () => {
    setDirectorlist(directorlist === "none" ? "block" : "none");
  };

  return (
    // <div className="sidebar-content">
    //   <h2>Director Menu</h2>
    //   <div className="sidebar-scrollable">
    //     <Link to="/diractordash">
    //       <li className="arrow-list">
    //         <div className="ad-min" style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
    //           <FaUserTie /> DirectorDashboard
    //         </div>
    //       </li>
    //     </Link>
    //     <button
    //       onClick={toggleList}
    //       className="toggle-btn"
    //       style={{ transform: directorlist !== "block" ? "" : "rotate(90deg)" }}
    //     >
    //       <FaAngleRight />
    //     </button>

    //   <ul className="director-list" style={{ display: directorlist }}>
    //     <Link to="/coursesreview">
    //       <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
    //         CourseReview
    //       </li>
    //     </Link>
    //     <Link to="/assignfacultyrole">
    //       <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
    //         AssignFacultyRole
    //       </li>
    //     </Link>
    //   </ul>
    //    </div>
    // </div>
    <div className="sidebar-content">
      <h2>Director Menu</h2>
      <div className="sidebar-scrollable">
        <li className="arrow-list">
          <Link to="/director/diractordash">
            <div
              className="ad-min"
              style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
            >
              <FaUserTie />
              DirectorDashboard
            </div>
          </Link>
          <button
            onClick={dirctortoggleList}
            className="student-toggle-btn"
            style={{
              transform: directorlist !== "block" ? "" : "rotate(90deg)",
            }}
          >
            <FaAngleRight />
          </button>
        </li>

        <ul className="sidebar-links" style={{ display: directorlist }}>
          <Link to="/director/coursesreview">
            <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
              CourseReview
            </li>
          </Link>

          <Link to="/director/assignfacultyrole">
            <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
              AssignFacultyRole
            </li>
          </Link>

          <Link to="/director/facultylist">
            <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
              All Faculty List
            </li>
          </Link>

          <Link to="/director/allstudentlist">
            <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
              All Student List
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default DirectorSidebar;
