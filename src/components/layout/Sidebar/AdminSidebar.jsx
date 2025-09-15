import React from "react";
import { Link } from "react-router-dom";
import { FaUserCog, FaAngleRight } from "react-icons/fa";
import { useState } from "react";
import "../../../CSSfolder/CommonCSS/sidebar.css";

const AdminSidebar = () => {
  const [admitionlist, setadmitionlist] = useState ("none")
  const [adminlist, setAdminlist] = useState("block");
  const [attendencelist, setattendencelist] = useState("none");
  const [departmentlist, setdepartmentlist] = useState("none");
  const [designationlist, setdesignationlist] = useState("none");
  const [subjectlist, setsubjectlist] = useState("none");
  const [courselist, setcourselist] = useState("none");
  const [timetablelist, settimetablelist] = useState("none");
  const [acadmicCalelist, setacadmicCalelist] = useState("none");
  const [assignmentlist, setassignmentlist] = useState("none");
  const [hostelroom, setHostelroom] = useState("none")
  const [hostelfee, setHostelfee] = useState("none")
  const [hostelmaintanence, setHostelmaintanence] = useState("none")
  const theme = localStorage.getItem("theme");

  const Adminlistdisplay = () => {
    setAdminlist(adminlist === "none" ? "block" : "none");
  };

  const Attendencelistdisplay = () => {
    setattendencelist(attendencelist === "none" ? "block" : "none");
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

  const Courselistdisplay = () => {
    setcourselist(courselist === "none" ? "block" : "none");
  }

  const Timetablelistdisplay = () => {
    settimetablelist(timetablelist === "none" ? "block" : "none");
  };

  const acadmiclistdisplay = () => {
    setacadmicCalelist(acadmicCalelist === "none" ? "block" : "none");
  };

  const Assignmentlistdisplay = () => {
    setassignmentlist(assignmentlist === "none" ? "block" : "none");
  };

  const Admitionslistdisplay = () => {
    setadmitionlist(admitionlist === "none" ? "block" : "none");
  };
  const HostelRoomslistdisplay = () => {
    setHostelroom(hostelroom === "none" ? "block" : "none");
  }

    const Hostelfeeslistdisplay = () => {
    setHostelfee(hostelfee === "none" ? "block" : "none");
  }
    const Hostelmaintenancelistdisplay = () => {
    setHostelmaintanence(hostelmaintanence === "none" ? "block" : "none");
  }

  return (
    <div className="sidebar-content">
      <h2>Admin Menu</h2>
      <div className="sidebar-scrollable">


        {/* *************Admin Dashboard************ */}
        <li className="arrow-list">
          <Link to="/admin/registrardash">
            <div
              className="ad-min"
              style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
            >
              <FaUserCog />
              Admin Dashboard
            </div>
          </Link>
          <button
            onClick={Adminlistdisplay}
            className="student-toggle-btn"
            style={{
              transform: adminlist !== "block" ? "" : "rotate(90deg)",
            }}
          >
            <FaAngleRight />
          </button>
        </li>
        <ul className="sidebar-links" style={{ display: adminlist }}>
          <Link to="/admin/facultylist">
            <li>Facultylist</li>
          </Link>
          <Link to="/admin/allstudentlist">
            <li>AllStudentlist</li>
          </Link>
          <Link to="/admin/userslist">
            <li>User List</li>
          </Link>
          <Link to="/admin/createexam">
            <li>CreateExam</li>
          </Link>
          <Link to="/admin/allexams">
            <li>AllExams</li>
          </Link>
          <Link to="/admin/create-attendance">
            <li>Attendance Create</li>
          </Link>
        </ul>

        {/* *************Admition Magagment************ */}
        <li className="arrow-list" onClick={Admitionslistdisplay}>
            <div
              className="ad-min"
              style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
            >
              <FaUserCog />
              Admition Management
            </div>
          <button
            className="student-toggle-btn"
            style={{
              transform: admitionlist !== "block" ? "" : "rotate(90deg)",
            }}
          >
            <FaAngleRight />
          </button>
        </li>
        <ul className="sidebar-links" style={{ display: admitionlist }}>
          <Link to="/admin/newstudentregistration">
          <li>New Student Register</li>
          </Link>
          <Link to="/admin/newfacultyregistration">
          <li>New Faculty Register</li>
          </Link>
        </ul>

        {/* *************TimeTable Dashboard************ */}
        <li className="arrow-list" onClick={Timetablelistdisplay}>
            <div
              className="ad-min"
              style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
            >
              <FaUserCog />
              Time Table
            </div>
          <button
            className="student-toggle-btn"
            style={{
              transform: timetablelist !== "block" ? "" : "rotate(90deg)",
            }}
          >
            <FaAngleRight />
          </button>
        </li>
        <ul className="sidebar-links" style={{ display: timetablelist }}>
          <Link to="/admin/newtimetable">
            <li>Create Timetable</li>
          </Link>
          <Link to="/admin/viewalltimetables">
            <li>View AllTimetable</li>
          </Link>
        </ul>

        {/* ****************Attendance Management************* */}
        {/* <li className="arrow-list" onClick={Attendencelistdisplay}>
          <div
            className="ad-min"
            style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
          >
            Attendance Management
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
          <Link to="/attendance-dashboard">
            <li> Attendance Dashboard </li>
          </Link>
          <Link to="/attendance-recording">
            <li> Attendance Recording </li>
          </Link>
          <Link to="/attendance-reports">
            <li> Attendance Reports </li>
          </Link>
        </ul> */}

        {/* ****************Department Management************* */}
        <li className="arrow-list" onClick={Departmentlistdisplay}>
            <div
              className="ad-min"
              style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
            >
              Department Management
            </div>
          <button
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
          {/* <Link to="/admin/departmentdetail/:id">
            <li> Department Detail</li>
          </Link> */}
        </ul>

        {/* ****************Designation Management************* */}
        <li className="arrow-list" onClick={Designationlistdisplay}>
            <div
              className="ad-min"
              style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
            >
              Designation Management
            </div>
          <button
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
          {/* <Link to="/admin/designationdetail/:id">
            <li> Designation Detail</li>
          </Link> */}
        </ul>

        {/* ****************Subject Management************* */}
        <li className="arrow-list"  onClick={Subjectlistdisplay}>
            <div
              className="ad-min"
              style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
            >
              Subject Management
            </div>
          <button
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
          {/* <Link to="subject/:subjectId/addstudent/:id">
            <li> Add Student To Subject</li>
          </Link> */}
          {/* <Link to="enrolledstudentlist/:subjectId">
            <li> Enrolled Students List</li>
          </Link>
           <Link to="bulk-enrollment/:subjectId">
            <li> Bulk Enrollment</li>
          </Link> */}
        </ul>

        {/* ****************Course Management************* */}  
        <li className="arrow-list" onClick={Courselistdisplay}>
            <div
              className="ad-min"
              style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
            >
              Course Management
            </div>
          <button
            className="student-toggle-btn"
            style={{
              transform: courselist !== "block" ? "" : "rotate(90deg)",
            }}
          >
            <FaAngleRight />
          </button>
        </li>
        <ul className="sidebar-links" style={{ display: courselist }}>
          <Link to="/admin/createcourse">
            <li>Course Form</li>
          </Link>
          <Link to="/admin/courselist">
            <li> Course List</li>
          </Link>
          {/* <Link to="/admin/coursedetail/:id">
            <li> Course Detail</li>
          </Link>
          <Link to="/admin/editcourse/:id">
            <li> Edit Course</li>
          </Link> */}
          {/* <Link to="/admin/courseassignedsubject/:id">
            <li> CourseAssignedSubject</li>
          </Link> */}
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

        {/**********Hostel Management ******************/}

        {/* Rooms */}
        <li className="arrow-list" onClick={HostelRoomslistdisplay}>   
            <div
              className="ad-min"
              style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
            >
              Hostel Rooms
            </div>
          <button
            className="student-toggle-btn"
            style={{
              transform: hostelroom !== "block" ? "" : "rotate(90deg)",
            }}
          >
            <FaAngleRight />
          </button>
        </li>
         <ul className="sidebar-links" style={{ display: hostelroom }}>
          <Link to="/admin/createroom">
            <li>Create Room</li>
          </Link>
          <Link to="/admin/rooms">
            <li>RoomsList</li>
          </Link>
          <Link to="/admin/updateroom">
            <li>Update Room</li>
          </Link>
          <Link to="/admin/allocateroom">
            <li>Allocate Room</li>
          </Link>
        </ul>

      {/* Fee */}
       <li className="arrow-list" onClick={Hostelfeeslistdisplay}>   
            <div
              className="ad-min"
              style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
            >
              Hostel Fees
            </div>
          <button
            className="student-toggle-btn"
            style={{
              transform: hostelfee !== "block" ? "" : "rotate(90deg)",
            }}
          >
            <FaAngleRight />
          </button>
        </li>
         <ul className="sidebar-links" style={{ display: hostelfee }}>
          <Link to="/admin/fee/create">
            <li>Create Fee</li>
          </Link>
          <Link to="/admin/fee/duereport">
            <li>Fee Report</li>
          </Link>
          <Link to="/admin/fee/list">
            <li>Fee List</li>
          </Link>
          <Link to="/admin/fee/student">
            <li>Fee Student</li>
          </Link>
        </ul>

      {/* Maintanence */}
        <li className="arrow-list" onClick={Hostelmaintenancelistdisplay}>   
            <div
              className="ad-min"
              style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
            >
              Hostel Maintanence
            </div>
          <button
            className="student-toggle-btn"
            style={{
              transform: hostelmaintanence !== "block" ? "" : "rotate(90deg)",
            }}
          >
            <FaAngleRight />
          </button>
        </li>
         <ul className="sidebar-links" style={{ display: hostelmaintanence }}>
          <Link to="/admin/maintenance/create">
            <li>Create Maintenance</li>
          </Link>
          <Link to="/admin/maintenance/list">
            <li>Maintenance List</li>
          </Link>
        </ul>

        {/* ****************Assignament Calender************* */}
        {/* <li className="arrow-list" onClick={Assignmentlistdisplay}>
            <div
              className="ad-min"
              style={{ color: theme === "dark" ? "#000000" : "#ffffff" }}
            >
              Assignment Management
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
          <Link to="/create-assignment">
            <li> Create Assignment</li>
          </Link>

          <Link to="/class-management">
            <li> Class Management</li>
          </Link>

          <Link to="/communication">
            <li> Communication </li>
          </Link>
        </ul> */}

        {/* <ul className="sidebar-links">

              <Link to="/allstudentlist">
                <li>
                  <FaClipboardList />
                  Studentlist
                </li>
              </Link>
              <Link to="/viewalltimetables">
                <li>View TimeTable</li>
              </Link>
              <Link to="/setnewquiz">
                <li>Create Quiz</li>
              </Link>
              <Link to="/allquiz">
                <li>All Quizs</li>
              </Link>
  
        </ul> */}
      </div>
    </div>
  );
};

export default AdminSidebar;
