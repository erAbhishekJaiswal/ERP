// import "./App.css";
// import { useState } from "react";
// import Navbar from "./components/layout/Navbar.jsx";
// import Footer from "./components/layout/Footer.jsx";
// import Sidebar from "./components/layout/Sidebar.jsx";
// import Home from "./components/Home.jsx";
// import Login from "./pages/Auth/Login.jsx";
// import Register from "./pages/Auth/Register.jsx";
// import StudentDashboard from "./components/dashboard/StudentDashboard.jsx";
// import FacultyDashboard from "./components/dashboard/FacultyDashboard.jsx";
// import AdminDashboard from "./components/dashboard/AdminDashboard.jsx";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Profiledetail from "./pages/Student/Profiledetail.jsx";
// import Ecourse from "./pages/Student/Ecourse.jsx";
// import Ecoureseitem from "./pages/Student/Ecoureseitem.jsx";
// import Quiz from "./pages/Student/Quiz.jsx";
// import QuizResults from "./pages/Student/QuizResults.jsx";
// import StudentProfile from "./pages/Student/StudentProfile.jsx";
// // import AllQuizs from './pages/Student/AllQuizs';
// import Attendence from "./pages/Student/Attendence.jsx";
// import AdmissionsDashboard from "./pages/Admission/AdmissionsDashboard.jsx";
// import AllFacultylist from "./pages/Admin/AllFacultylist.jsx";
// import AllLeaves from "./pages/Admin/AllLeaves.jsx";
// import AllStatus from "./pages/Admin/AllStatus.jsx";
// import AllStudentlist from "./pages/Admin/AllStudentlist.jsx";
// import Setquiz from "./pages/Faculty/Setquiz.jsx";
// import StudentAttendence from "./pages/Faculty/StudentAttendence.jsx";
// import Studentlist from "./pages/Faculty/Studentlist.jsx";
// import StudentMarks from "./pages/Faculty/StudentMarks.jsx";
// // import Timetable from './pages/Faculty/Timetable';
// import Studentdetail from "./pages/Faculty/Studentdetail.jsx";
// import NewTimetable from "./pages/Admin/NewTimetable.jsx";
// import Facultyprofile from "./pages/Faculty/Facultyprofile.jsx";
// import LeaveRequest from "./pages/Faculty/LeaveRequest.jsx";
// import ViewLeaveRequests from "./pages/Admin/ViewLeaveRequests.jsx";
// import ViewTimetable from "./pages/Faculty/ViewTimetable.jsx";
// import Timetable from "./pages/Faculty/Timetable.jsx";
// import ViewallTimetable from "./pages/Admin/ViewallTimetable.jsx";
// import EditTimetable from "./pages/Admin/EditTimetable.jsx";
// import ViewOneTimetable from "./pages/Admin/ViewOneTimetable.jsx";
// import Featureone from "./pages/Features/featureone.jsx";
// import CourseReview from "./pages/Director/CourseReview.jsx";
// import AssignFacultyRole from "./pages/Director/AssignFacultyRole.jsx";
// import DirectorDashboard from "./components/dashboard/DirectorDashboard.jsx";
// import DeanDashboard from "./components/dashboard/DeanDashboard.jsx";
// import ViewDepartmentBudget from "./pages/Dean/ViewDepartmentBudget.jsx";
// import ViewCourses from "./pages/Dean/ViewCourses.jsx";
// import AssignFacultyToCourse from "./pages/Dean/AssignFacultyToCourse.jsx";
// import ApprovePromotion from "./pages/Dean/ApprovePromotion.jsx";
// // import FacultyList from './pages/Dean/FacultyList.jsx';
// import CreateAcademicCalendar from "./pages/Admin/CreateAcademicCalendar.jsx";
// import RegistrarDashboard from "./components/dashboard/RegistrarDashboard.jsx";
// import ViewAcademicCalendar from "./pages/Admin/ViewAcademicCalendar.jsx";
// import CreateExam from "./pages/Admin/CreateExam.jsx";
// import ViewExamDetails from "./pages/Admin/ViewExamDetails.jsx";
// import EvaluateExam from "./pages/Admin/EvaluateExam.jsx";
// // import UpdateStudentRecord from './pages/Admin/UpdateStudentRecord.js';
// import ManageFeeRecords from "./pages/Finance/ManageFeeRecords.jsx";
// import ProcessFeePayment from "./pages/Finance/ProcessFeePayment.jsx";
// import IssueReceipt from "./pages/Finance/IssueReceipt.jsx";
// import ProcessFacultySalary from "./pages/Finance/ProcessFacultySalary.jsx";
// import GenerateFinancialReport from "./pages/Finance/GenerateFinancialReport.jsx";
// import ProcessVendorPayment from "./pages/Finance/ProcessVendorPayment.jsx";
// import CheckFinancialCompliance from "./pages/Finance/CheckFinancialCompliance.jsx";
// import AccountantDashboard from "./components/dashboard/AccountantDashboard.jsx";
// import Allexams from "./pages/Admin/Allexams.jsx";
// import AllQuizs from "./pages/Faculty/AllQuiz.jsx";
// import StudentsQuiz from "./pages/Student/StudentsQuiz.jsx";
// import EditFacultyprofile from "./pages/Faculty/EditFacultyprofile.jsx";
// import Setting from "./components/commonpage/Setting.jsx";

// // *********************************** Assignment **************************************
// import AssignmentForm from "./pages/AssignmentManage/AssignmentCreation/AssignmentForm.jsx";
// import ClassDashboard from "./pages/AssignmentManage/ClassManagement/ClassDashboard.jsx";
// import GradingTool from "./pages/AssignmentManage/GradingFeedback/GradingTool.jsx";
// import PlagiarismReports from "./pages/AssignmentManage/PlagiarismChecking/PlagiarismReports.jsx";
// import FacultyMessaging from "./pages/AssignmentManage/Communication/FacultyMessaging.jsx";

// import Assignments from "./pages/StudentAssignment/Assignments.jsx";
// import Submission from "./pages/StudentAssignment/Submission.jsx";
// import Grades from "./pages/StudentAssignment/Grades.jsx";
// import Collaboration from "./pages/StudentAssignment/Collaboration.jsx";

// // *********************************** Attendence **************************************
// import AttendanceDashboard from "./pages/AttendanceManagement/AttendanceDashboard.jsx";
// import AttendanceRecording from "./pages/AttendanceManagement/AttendanceRecording.jsx";
// import AttendanceReports from "./pages/AttendanceManagement/AttendanceReports.jsx";

// // *********************************** Subject Management **************************************
// import SubjectCreation from "./pages/Admin/SubjectManagment/SubjectCreation.jsx";
// import SubjectsList from "./pages/Admin/SubjectManagment/SubjectsList.jsx";
// import SubjectDetail from "./pages/Admin/SubjectManagment/SubjectDetail.jsx";
// import EditSubject from "./pages/Admin/SubjectManagment/SubjectEdit.jsx";
// import SubjectAssignedFaculty from "./pages/Admin/SubjectManagment/SubjectAssignedFaculty.jsx";

// // *********************************** Department Management **************************************
// import DepartmentForm from "./pages/Admin/Department/DepartmentForm.jsx";
// import DepartmentList from "./pages/Admin/Department/DepartmentList.jsx";
// import DepartmentDetail from "./pages/Admin/Department/DepartmentDetail.jsx";

// // *********************************** Designation Management **************************************
// import DesignationForm from "./pages/Admin/Designation/DesignationForm.jsx";
// import DesignationList from "./pages/Admin/Designation/DesignationList.jsx";
// import DesignationDetail from "./pages/Admin/Designation/DesignationDetail.jsx";

// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Default to open

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   const [dataFromChild, setDataFromChild] = useState("");
//   const theme = localStorage.getItem("theme");
//   function handleDataFromChild(data) {
//     setDataFromChild(data);
//   }
//   // console.log(dataFromChild);

//   return (
//     <>
//       <Router>
//         <div
//           className="App"
//           style={{
//             backgroundColor: theme === "dark" ? "#333" : "#fff",
//             color: theme === "dark" ? "#fff" : "#333",
//           }}
//         >
//           <Navbar
//              endtoapp={handleDataFromChild}
//             // toggleSidebar={toggleSidebar}
//             // isSidebarOpen={isSidebarOpen}
//           />
//           <section className="main">
//             <Sidebar name={dataFromChild} />
//             {/* <Sidebar isOpen={isSidebarOpen} /> */}
//             <div className="mainpageitem">
//               {/* style={{ marginLeft: dataFromChild === "block" ? "280px" : "0px"}} */}
//               <Routes>
//                 {/* ************** Common routes ************** */}
//                 <Route
//                   path="/"
//                   exact
//                   Component={Home}
//                   // isSidebarOpen={isSidebarOpen}
//                 />

//                 <Route path='/login' Component={Login} />
//             <Route path='/register' Component={Register} />
//             <Route path='/feature-one' Component={Featureone} />

//                 {/* ************** Director routes ************** */}
//                 <Route path='/diractordash' exact Component={DirectorDashboard} />
//             <Route path='/coursesreview' exact Component={CourseReview} />
//             <Route path='/assignfacultyrole' exact Component={AssignFacultyRole}/>

//                 {/* ************** Dean routes ************** */}

//                 <Route path='/deandash' exact Component={DeanDashboard} />
//             <Route path='/viewdepartmentbudget' exact Component={ViewDepartmentBudget} />
//             <Route path='/viewcourses' exact Component={ViewCourses} />
//             <Route path='/assignfacultycourse' exact Component={AssignFacultyToCourse} />
//             <Route path='/approvepromotion' exact Component={ApprovePromotion} />
//             <Route path='/facultylist' exact Component={AllFacultylist} />

//                 {/***************** accountant routes *****************/}
//                 <Route path='/accountantdash' exact Component={AccountantDashboard}/>
//             <Route path='/managefeerecords' exact Component={ManageFeeRecords}/>
//             <Route path='/processfeepayment' exact Component={ProcessFeePayment}/>
//             <Route path='/issuereceipt' exact Component={IssueReceipt}/>
//             <Route path='/processfacultysalary' exact Component={ProcessFacultySalary}/>
//             <Route path='/generatefinancialreport' exact Component={GenerateFinancialReport}/>
//             <Route path='/processvendorpayment' exact Component={ProcessVendorPayment}/>
//             <Route path='/checkfinancialcomplaince' exact Component={CheckFinancialCompliance}/>

//                 {/* ************** student routes ************** */}
//                 <Route path='/studentdash' exact Component={StudentDashboard} />
//             <Route path='/profileupdate/:id' exact Component={Profiledetail} /> 
//             <Route path='/e-course' exact Component={Ecourse} />
//             <Route path='/takecourse' exact Component={Ecoureseitem} />
//             <Route path="/quiz/:id" exact Component={Quiz}/>
//             <Route path="/studentsquiz" exact Component={StudentsQuiz}/>
//             <Route path="/quiz-results" exact Component={QuizResults}/>
//             <Route path="/student-profile/:id" exact Component={StudentProfile}/>

//                 {/*********************************************StudentAssignment*****************************/}

//                 <Route path="/student-assignment" element={<Assignments />} />
//               <Route path="/submission" element={<Submission />} />
//               <Route path="/grades" element={<Grades />} />
//               <Route path="/collaboration" element={<Collaboration />} />

//                 {/* ************** admin routes ************** */}

//                 <Route path="/admindash" exact Component={AdminDashboard} />
//             <Route path="/attendence" exact Component={Attendence}/>
//             <Route path="/admissionsdash" exact Component={AdmissionsDashboard}/>
//             <Route path="/facultylist" exact Component={AllFacultylist}/>
//             <Route path="/leavemanagement" exact Component={AllLeaves}/>
//             <Route path="/allstatus" exact Component={AllStatus}/>
//             <Route path="/allstudentlist" exact Component={AllStudentlist}/>
//             <Route path="/newtimetable" exact Component={NewTimetable}/>
//             <Route path="/viewalltimetables" exact Component={ViewallTimetable}/>
//             <Route path="/edittimetable/:id" exact Component={EditTimetable}/>
//             <Route path="/viewonetimetable/:id" exact Component={ViewOneTimetable}/>
//             <Route path="/faculty-profile/:id" exact Component={Facultyprofile}/>
//             <Route path="/viewleaverequest" exact Component={ViewLeaveRequests}/>
//             <Route path="/allexams" exact Component={Allexams}/>
//             <Route path='/registrardash' exact Component={RegistrarDashboard} />
//             <Route path='/createacadmiccalender' exact Component={CreateAcademicCalendar}/>
//             <Route path='/viewacadmiccalender' exact Component={ViewAcademicCalendar}/>
//             <Route path='/createexam' exact Component={CreateExam}/>
//             <Route path='/viewexamdetails/:id' exact Component={ViewExamDetails}/>
//             <Route path='/evaluateexam/:examid/:studentid' exact Component={EvaluateExam}/>
//             <Route path='/createsubject' exact Component={SubjectCreation}/>
//             <Route path='/subjectslist' exact Component={SubjectsList}/>
//             <Route path='/subjectdetail/:id' exact Component={SubjectDetail}/>
//             <Route path='/editsubject/:id' exact Component={EditSubject}/>
//             <Route path='/subjectassignedfaculty' exact Component={SubjectAssignedFaculty}/>
//             <Route path='/departmentform' exact Component={DepartmentForm}/>
//             <Route path='/departmentlist' exact Component={DepartmentList}/>
//             <Route path='/departmentdetail/:id' exact Component={DepartmentDetail}/>
//             <Route path='/designationform' exact Component={DesignationForm}/>
//             <Route path='/designationlist' exact Component={DesignationList}/>
//             <Route path='/designationdetail/:id' exact Component={DesignationDetail}/>

//                 {/* ************** Faculty routes ************** */}
//                 {/* <Route path='/faculty-profile/:id'exact Component={FacultyProfile}/> */}
//                 <Route path="/facultydash" exact Component={FacultyDashboard} />
//             <Route path="/allquiz" exact Component={AllQuizs}/>
            
//             <Route path="/setnewquiz" exact Component={Setquiz}/>
//             <Route path="/studentattendance" exact Component={StudentAttendence}/>
//             <Route path="/studentlist" exact Component={Studentlist}/>
//             <Route path="/studentmark" exact Component={StudentMarks}/>
//             <Route path="/viewtimetable" exact Component={ViewTimetable}/>
//             <Route path="/timetable" exact Component={Timetable}/>
//             <Route path="/timetable/:id" exact Component={Timetable}/>
//             <Route path="/studentdetail" exact Component={Studentdetail}/>
//             <Route path="/leaverequest" exact Component={LeaveRequest}/>    
//             <Route path="/editfacultyprofile/:id" exact Component={EditFacultyprofile}/>
//             <Route path="/setting" exact Component={Setting}/>

//                 {/*****************************Assignment *************************************/}

//                 <Route path="/create-assignment" element={<AssignmentForm />} />
//             <Route path="/class-management" element={<ClassDashboard />} />
//             <Route path="/grading-feedback" element={<GradingTool />} />
//             <Route path="/plagiarism-check" element={<PlagiarismReports />} />
//             <Route path="/communication" element={<FacultyMessaging />} />

//                 {/*********************************Attendence **************** */}
//                 <Route path="/attendance-recording" element={<AttendanceRecording />} />
//             <Route path="/attendance-reports" element={<AttendanceReports />} />
//             <Route path="/attendance-dashboard" element={<AttendanceDashboard />} />
//               </Routes>
//               <Footer />
//             </div>
//           </section>
//         </div>
//       </Router>
//     </>
//   );
// }

// export default App;






















// import React, { useState } from 'react';
// import Navbar from "./components/layout/Navbar.jsx";
// import Sidebar from "./components/layout/Sidebar.jsx";
// import MainPage from './pages/MainPage/MainPage.jsx';
// import { BrowserRouter as Router} from "react-router-dom";
// import './App.css';

// function App() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true); 

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen);
//   };

//   return (
//     <Router>
//     <div 
//     className="app"
//     >
//       <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
//       <Sidebar isOpen={isSidebarOpen} />
//       <MainPage isSidebarOpen={isSidebarOpen} />
//     </div>
//     </Router>
//   );
// }

// export default App;






















// App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from "./components/layout/Navbar.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import MainPage from './pages/MainPage/MainPage.jsx';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    
    // For mobile/tablet, add/remove class to body to prevent scrolling
    if (window.innerWidth <= 1024) {
      if (!isSidebarOpen) {
        document.body.classList.add('sidebar-open-mobile');
      } else {
        document.body.classList.remove('sidebar-open-mobile');
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      // Close sidebar on resize to desktop if it was open on mobile
      if (window.innerWidth > 1024 && isSidebarOpen) {
        setIsSidebarOpen(false);
        document.body.classList.remove('sidebar-open-mobile');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  // Close sidebar when clicking on overlay (mobile/tablet)
  const handleOverlayClick = () => {
    if (isMobile && isSidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Sidebar isOpen={isSidebarOpen} />
        <MainPage 
          isSidebarOpen={isSidebarOpen} 
          onOverlayClick={handleOverlayClick}
        />
      </div>
    </Router>
  );
}

export default App;