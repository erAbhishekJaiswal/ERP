// import React from 'react'
// import { Routes, Route } from 'react-router-dom';
// import './MainPage.css';
// import AdminRoutes from '../Admin/AdminPages.jsx';
// import CommonRoutes from '../Auth/CommonRoutes.jsx';
// import StudentPages from '../Student/StudentPages.jsx';
// import DirectorPages from '../Director/DirectorPages.jsx';
// import FacultyRoutes from '../Faculty/FacultyPages.jsx';
// import DeanPages from '../Dean/DeanPages.jsx';
// import AccountantPages from '../Finance/AccountantPages.jsx';
// import NotFound from '../../components/NotFound.jsx';
// const MainPage = ({ isSidebarOpen }) => {
//   return (
//     <main className={`hero ${isSidebarOpen ? 'sidebar-open' : ''}`}>
//       {/* <div className="hero-content"> */}
//         <Routes>
//         <Route path="/*" element={<CommonRoutes />} />
//         <Route path="/admin/*" element={<AdminRoutes />} />
//         <Route path="/student/*" element={<StudentPages />} />
//         <Route path="/faculty/*" element={<FacultyRoutes />} />
//         <Route path="/director/*" element={<DirectorPages />} />
//         <Route path="/dean/*" element={<DeanPages />} />
//         <Route path="/accountant/*" element={<AccountantPages />} />
//         {/* Fallback route */}
//         {/* <Route path="/notfound" element={<NotFound />} /> */}
//         </Routes>
//     </main>
//   )
// }
// export default MainPage

// MainPage.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import "./MainPage.css";
import AdminRoutes from "../Admin/AdminPages.jsx";
import CommonRoutes from "../Auth/CommonRoutes.jsx";
// import StudentPages from "../Student/StudentPages.jsx";
import StudentPages from "../Student/StudentPages.jsx";
import DirectorPages from "../Director/DirectorPages.jsx";
import FacultyRoutes from "../Faculty/FacultyPages.jsx";
import DeanPages from "../Dean/DeanPages.jsx";
import AccountantPages from "../Finance/AccountantPages.jsx";
import NotFound from "../../components/NotFound.jsx";
import Unauthorized from "../../components/Unauthorized.jsx";
import ProtectedRoute from "../../components/ProtectedRoute.jsx";
import Ecourse from "../Student/Ecourse.jsx";
import { Navigate } from "react-router-dom";

const MainPage = ({ isSidebarOpen, onOverlayClick }) => {
  return (
    <main className={`hero ${isSidebarOpen ? "sidebar-open" : ""}`}  onClick={onOverlayClick}>
      <Routes>
        <Route path="/*" element={<CommonRoutes />} />

        {/* Admin routes - only accessible by Registrar */}
        <Route path="/admin/*" element={<ProtectedRoute allowedRoles={["Registrar"]} >
        <AdminRoutes />
        </ProtectedRoute>}>
        </Route>

        {/* Student routes */}
        {/* <Route element={<ProtectedRoute allowedRoles={["student"]} />}> */}
        {/* <Route path="/student/studentdash/*" element={<StudentPages />} /> */}
        {/* <Route path="/student/e-course" element={< Ecourse/>} /> */}
        {/* <Route path="/student" element={<Navigate to="studentdash" replace />} />
          <Route path="/student/studentdash/*" element={<StudentPages />} /> */}
        {/* <Route
          path="/student"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <Navigate to="studentdash" replace />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/student/*"
          element={
            <ProtectedRoute allowedRoles={["student"]}>
              <StudentPages />
            </ProtectedRoute>
          }
        />
        {/* </Route> */}

        {/* Faculty routes */}
        {/* <Route element={<ProtectedRoute allowedRoles={["faculty"]} />}>
          <Route path="/faculty/*" element={<FacultyRoutes />} />
        </Route> */}

         <Route
          path="/faculty/*"
          element={
            <ProtectedRoute allowedRoles={["faculty"]}>
              <FacultyRoutes />
            </ProtectedRoute>
          }
        />

        {/* Director routes */}
        {/* <Route element={<ProtectedRoute allowedRoles={["Director"]} />}>
          <Route path="/director/*" element={<DirectorPages />} />
        </Route> */}

        <Route
          path="/director/*"
          element={
            <ProtectedRoute allowedRoles={["Director"]}>
              <DirectorPages />
            </ProtectedRoute>
          }
        />

        {/* Dean routes */}
        {/* <Route element={<ProtectedRoute allowedRoles={["Dean"]} />}>
          <Route path="/dean/*" element={<DeanPages />} />
        </Route> */}

        <Route
          path="/dean/*"
          element={
            <ProtectedRoute allowedRoles={["Dean"]}>
              <DeanPages />
            </ProtectedRoute>
          }
        />

        {/* Accountant routes */}
        {/* <Route element={<ProtectedRoute allowedRoles={["Accountant"]} />}>
          <Route path="/accountant/*" element={<AccountantPages />} />
        </Route> */}

        <Route
          path="/accountant/*"
          element={
            <ProtectedRoute allowedRoles={["Accountant"]}>
              <AccountantPages />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<NotFound />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </main>
  );
};

export default MainPage;
