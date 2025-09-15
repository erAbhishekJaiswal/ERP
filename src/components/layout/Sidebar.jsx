// import React from "react";
// import { Link , useNavigate} from "react-router-dom";
// import { useState, useEffect } from "react";
// import "../../CSSfolder/CommonCSS/sidebar.css";
// import FacultySidebar from "./Sidebar/FacultySidebar";
// import AdminSidebar from "./Sidebar/AdminSidebar";
// import StudentSidebar from "./Sidebar/StudentSidebar";
// import DirectorSidebar from "./Sidebar/DirectorSidebar";
// import DeanSidebar from "./Sidebar/DeanSidebar";
// import AccountantSidebar from "./Sidebar/AccountantSidebar";
// import Home from "../Home";


// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import "../../CSSfolder/CommonCSS/sidebar.css";
// import FacultySidebar from "./Sidebar/FacultySidebar";
// import AdminSidebar from "./Sidebar/AdminSidebar";
// import StudentSidebar from "./Sidebar/StudentSidebar";
// import DirectorSidebar from "./Sidebar/DirectorSidebar";
// import DeanSidebar from "./Sidebar/DeanSidebar";
// import AccountantSidebar from "./Sidebar/AccountantSidebar";
// import { toast } from 'react-toastify';

// const Sidebar = ({ isOpen }) => {
//   //   const [adminlist, setAdminlist] = useState("none");
//   // const [studentlist, setstudentlist] = useState("none");
//   // const [facultylist, setfacultylist] = useState("none");

//   // const [status, setstatus] = useState("none");
//   // const role = localStorage.getItem("role");
//   // const token = localStorage.getItem("token");

//   // useEffect(() => {
//   //   if (token && role === "Registrar") {
//   //     // setAdminlist("block");
//   //     setstatus("Registrar");
//   //   } else if (token && role === "faculty") {
//   //     // setfacultylist("block");
//   //     setstatus("faculty");
//   //   } else if (token && role === "student") {
//   //     // setstudentlist("block");
//   //     setstatus("student");
//   //   } else if (token && role === "Director") {
//   //     // setstudentlist("block");
//   //     setstatus("Director");
//   //   } else if (token && role === "Dean") {
//   //     // setstudentlist("block");
//   //     setstatus("Dean");
//   //   } else if (token && role === "Accountant") {
//   //     // setstudentlist("block");
//   //     setstatus("Accountant");
//   //   }
//   // }, [role, token]);

//   const [status, setstatus] = useState(null);
//   const role = localStorage.getItem("role");
//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (token && role) {
//       setstatus(role);
//     }
//   }, [role, token]);
//   const handleNavigation = (path, requiredRole) => {
//     if (!requiredRole || role === requiredRole) {
//       navigate(path);
//     } else {
//       toast.error("You don't have permission to access this page");
//     }
//   };

//   return (
//     <aside className={`sidebar ${isOpen ? "open" : ""}`}>
//       {token && status === "Registrar" && <AdminSidebar />}
//       {token && status === "faculty" && <FacultySidebar />}
//       {token && status === "student" && <StudentSidebar />}
//       {token && status === "Director" && <DirectorSidebar />}
//       {token && status === "Dean" && <DeanSidebar />}
//       {token && status === "Accountant" && <AccountantSidebar />}
//       <Link className="arrow-list" style={{color:"white",textDecoration:"none", listStyleType:'none',paddingLeft:"10px"}} to="/">
//         <li>Home</li>
//       </Link>
//        {status === "student" && (
//         <Link 
//           className="sidebar-link"
//           to="/student/e-course"
//           onClick={(e) => {
//             e.preventDefault();
//             handleNavigation("/student/e-course", "student");
//           }}
//         >
//           <li>My Courses</li>
//         </Link>
//       )}
//     </aside>
//   );
// };

// export default Sidebar;







// Sidebar.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../../CSSfolder/CommonCSS/sidebar.css";
import FacultySidebar from "./Sidebar/FacultySidebar";
import AdminSidebar from "./Sidebar/AdminSidebar";
import StudentSidebar from "./Sidebar/StudentSidebar";
import DirectorSidebar from "./Sidebar/DirectorSidebar";
import DeanSidebar from "./Sidebar/DeanSidebar";
import AccountantSidebar from "./Sidebar/AccountantSidebar";
import { toast } from 'react-toastify';

const Sidebar = ({ isOpen }) => {
  const [status, setstatus] = useState(null);
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (token && role) {
      setstatus(role);
    }
  }, [role, token]);

  // Function to handle navigation with role check
  const handleNavigation = (path, requiredRole) => {
    if (!requiredRole || role === requiredRole) {
      navigate(path);
    } else {
      toast.error("You don't have permission to access this page");
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      {/* Render appropriate sidebar based on role */}
      {token && status === "Registrar" && <AdminSidebar />}
      {token && status === "faculty" && <FacultySidebar />}
      {token && status === "student" && <StudentSidebar />}
      {token && status === "Director" && <DirectorSidebar />}
      {token && status === "Dean" && <DeanSidebar />}
      {token && status === "Accountant" && <AccountantSidebar />}
      
      {/* Common links */}
      <Link 
        className="sidebar-link" 
        to="/"
        onClick={(e) => {
          e.preventDefault();
          handleNavigation("/");
        }}
      >
        <li>Home</li>
      </Link>
      
      {/* Example of role-specific link that won't show for other roles */}
      {status === "student" && (
        <Link 
          className="sidebar-link"
          to="/student/e-course"
          onClick={(e) => {
            e.preventDefault();
            handleNavigation("/student/e-course", "student");
          }}
        >
          <li>My Courses</li>
        </Link>
      )}
    </aside>
  );
};

export default Sidebar;