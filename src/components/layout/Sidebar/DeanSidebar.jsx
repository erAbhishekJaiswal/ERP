import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SidebarCSS/DeanSidebar.css";
// import AllFacultylist from "./AllFacultylist";
import { FaUserTie, FaAngleRight } from "react-icons/fa";

const DeanSidebar = () => {
  const [deanlist, setDeanlist] = useState("none");
  const [departmentlist, setdepartmentlist] = useState("none");
  const [designationlist, setdesignationlist] = useState("none");
  const [subjectlist, setsubjectlist] = useState("none");
  // const [timetablelist, settimetablelist] = useState("none");
  const [acadmicCalelist, setacadmicCalelist] = useState("none");
  const theme = localStorage.getItem("theme");

  const deantoggleList = () => {
    setDeanlist(deanlist === "none" ? "block" : "none");
  };

  const Departmentlistdisplay = () => {
    setdepartmentlist(departmentlist === "none" ? "block" : "none");
  };

  const Designationlistdisplay = () => {
    setdesignationlist(designationlist === "none" ? "block" : "none");
  };

  const Subjectlistdisplay = () => {
    setsubjectlist(subjectlist === "none" ? "block" : "none");
  };

  // const Timetablelistdisplay = () => {
  //   settimetablelist(timetablelist === "none" ? "block" : "none");
  // };

  const acadmiclistdisplay = () => {
    setacadmicCalelist(acadmicCalelist === "none" ? "block" : "none");
  };

  return (
    <div className="sidebar-content">
      <h2>Dean Menu</h2>
      <div className="sidebar-scrollable">

        <li className="arrow-list"><Link to="/dean/deandashboard">
            <div className="ad-min" style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
              <FaUserTie />
              Dean Dashboard
            </div>
        </Link> 
        
        <button
          onClick={deantoggleList}
          className="student-toggle-btn"
          style={{ transform: deanlist !== "block" ? "" : "rotate(90deg)" }}
        >
          <FaAngleRight />
        </button>
        </li>
      <ul className="sidebar-links" style={{ display: deanlist }}>

      <Link to="/dean/facultylist">
          <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
            All Faculty List
          </li>
        </Link>

        <Link to="/dean/allstudentlist">
          <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
            All Student List
          </li>
        </Link>

        <Link to="/dean/viewcourses">
          <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
            ViewCourses
          </li>
        </Link>

        <Link to="/dean/assignfacultycourse">
          <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
            AssignFacultyCourse
          </li>
        </Link>

        <Link to="/dean/approvepromotion">
          <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
            ApprovePromotion
          </li>
        </Link>

        <Link to="/dean/viewdepartmentbudget">
          <li style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}>
            ViewDepartmentBudget
          </li>
        </Link>

        <Link to="/dean/viewalltimetables">
        <li>View AllTimetable</li>
        </Link>

      </ul>

        {/* ****************Department Management************* */}
              <li className="arrow-list">
                <Link to="/registrardash">
                  <div
                    className="ad-min"
                    style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
                  >
                    Department Management
                  </div>
                </Link>
                <button
                  onClick={Departmentlistdisplay}
                  className="student-toggle-btn"
                  style={{
                    transform: departmentlist !== "block" ? "" : "rotate(90deg)",
                  }}
                >
                  <FaAngleRight />
                </button>
              </li>
              <ul className="sidebar-links" style={{ display: departmentlist }}>
                <Link to="/admin/departmentform">
                  <li>Department Form</li>
                </Link>
                <Link to="/admin/departmentlist">
                  <li> Department List</li>
                </Link>
                <Link to="/admin/departmentdetail/:id">
                  <li> Department Detail</li>
                </Link>
              </ul>
      
              {/* ****************Designation Management************* */}
              <li className="arrow-list">
                <Link to="/registrardash">
                  <div
                    className="ad-min"
                    style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
                  >
                    Designation Management
                  </div>
                </Link>
                <button
                  onClick={Designationlistdisplay}
                  className="student-toggle-btn"
                  style={{
                    transform: designationlist !== "block" ? "" : "rotate(90deg)",
                  }}
                >
                  <FaAngleRight />
                </button>
              </li>
              <ul className="sidebar-links" style={{ display: designationlist }}>
                <Link to="/admin/designationform">
                  <li> Designation Form</li>
                </Link>
                <Link to="/admin/designationlist">
                  <li> Designation List</li>
                </Link>
                <Link to="/admin/designationdetail/:id">
                  <li> Designation Detail</li>
                </Link>
              </ul>
      
              {/* ****************Subject Management************* */}
              <li className="arrow-list">
                <Link to="/registrardash">
                  <div
                    className="ad-min"
                    style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
                  >
                    Subject Management
                  </div>
                </Link>
                <button
                  onClick={Subjectlistdisplay}
                  className="student-toggle-btn"
                  style={{
                    transform: subjectlist !== "block" ? "" : "rotate(90deg)",
                  }}
                >
                  <FaAngleRight />
                </button>
              </li>
              <ul className="sidebar-links" style={{ display: subjectlist }}>
                <Link to="/admin/createsubject">
                  <li> Create Subject</li>
                </Link>
                <Link to="/admin/subjectslist">
                  <li> Subject List</li>
                </Link>
                <Link to="/admin/subjectdetail/:id">
                  <li> Subject Detail</li>
                </Link>
                <Link to="/admin/editsubject/:id">
                  <li> Edit Subject</li>
                </Link>
                <Link to="/admin/subjectassignedfaculty">
                  <li> SubjectAssignedFaculty</li>
                </Link>
              </ul>
      
              {/* ****************Acadmic Calender************* */}
              <li className="arrow-list" onClick={acadmiclistdisplay}>   
                  <div
                    className="ad-min"
                    style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
                  >
                    Acadmic Calender
                  </div>
                <button
                  className="student-toggle-btn"
                  style={{
                    transform: acadmicCalelist !== "block" ? "" : "rotate(90deg)",
                  }}
                >
                  <FaAngleRight />
                </button>
              </li>
              <ul className="sidebar-links" style={{ display: acadmicCalelist }}>
                <Link to="/admin/createacadmiccalender">
                  <li>CreateAcademicCalendar</li>
                </Link>
                <Link to="/admin/viewacadmiccalender">
                  <li>ViewAcademicCalendar</li>
                </Link>
              </ul>
      </div>
    </div>
  );
};

export default DeanSidebar;