import { Routes, Route } from 'react-router-dom';
import ApprovePromotion from "./ApprovePromotion"
import AssignFacultyToCourse from "./AssignFacultyToCourse"
import LeaveManagement from "./LeaveManagement"
import PayrollManagement from "./PayrollManagement"
import ViewCourses from "./ViewCourses"
import ViewDepartmentBudget from "./ViewDepartmentBudget"

// Time Table Management
import EditTimetable from "../Admin/EditTimetable";
import NewTimetable from "../Admin/NewTimetable";
import ViewOneTimetable from "../Admin/ViewOneTimetable";
import ViewallTimetable from "../Admin/ViewallTimetable";
// import ViewLeaveRequests from "./ViewLeaveRequests";

// 
import CreateAcademicCalendar from "../Admin/CreateAcademicCalendar";
import ViewAcademicCalendar from "../Admin/ViewAcademicCalendar";
// 
import CreateExam from "../Admin/CreateExam";
import EvaluateExam from "../Admin/EvaluateExam";
import Allexams from "../Admin/Allexams";

// import RegistrarDashboard from "../";
// Subject Management
// import SubjectAssignedFaculty from "./SubjectManagment/SubjectAssignedFaculty";
import SubjectCreation from "../Admin/SubjectManagment/SubjectCreation";
import SubjectDetail from "../Admin/SubjectManagment/SubjectDetail";
import SubjectsList from "../Admin/SubjectManagment/SubjectsList";
import EditSubject from "../Admin/SubjectManagment/SubjectEdit"

// Department Management
import DepartmentForm from "../Admin/Department/DepartmentForm";
import DepartmentList from "../Admin/Department/DepartmentList";
import DepartmentDetail from "../Admin/Department/DepartmentDetail";

// Designation Management
import DesignationForm from "../Admin/Designation/DesignationForm";
import DesignationList from "../Admin/Designation/DesignationList";
import DesignationDetail from "../Admin/Designation/DesignationDetail";

// Exam Management

import ViewExamDetails from "../Admin/ViewExamDetails";

import DeanDashboard from "../../components/dashboard/DeanDashboard"

// Faculty
import AllFacultylist from "../Admin/AllFacultylist";
import FacultyProfile from "../Faculty/Facultyprofile";

// Student Management
import AllStudentlist from "../Admin/AllStudentlist";
import StudentProfile from "../Student/StudentProfile";

const DeanPages = () => {
  return (
    <Routes>
        <Route path="deandashboard" exact Component={DeanDashboard} />
        <Route path="approve-promotion" element={<ApprovePromotion />} />
        <Route path="assign-faculty-to-course" element={<AssignFacultyToCourse />} />
        <Route path="leave-management" element={<LeaveManagement />} />
        <Route path="payroll-management" element={<PayrollManagement />} />
        <Route path="view-courses" element={<ViewCourses />} />
        <Route path="view-department-budget" element={<ViewDepartmentBudget />} />

        {/* ************** Faculty routes ************** */}
        <Route path="facultylist" exact Component={AllFacultylist} />
       <Route path='faculty-profile/:id'exact Component={FacultyProfile}/>

       {/* ********************************* Student control ***************************** */}
      <Route path="allstudentlist" exact Component={AllStudentlist} />
      <Route path="student-profile/:id" exact Component={StudentProfile}/>


        {/********************************** Department *********************** */}
        <Route path="departmentform" exact Component={DepartmentForm} />
      <Route path="departmentlist" exact Component={DepartmentList} />
      <Route path="departmentdetail/:id" exact Component={DepartmentDetail} />

      {/********************************** Deginations *********************** */}

      <Route path="designationform" exact Component={DesignationForm} />
      <Route path="designationlist" exact Component={DesignationList} />
      <Route
        path="designationdetail/:id"
        exact
        Component={DesignationDetail}
      />

      {/********************************** Subject *********************** */}
      <Route path="createsubject" exact Component={SubjectCreation} />
      <Route path="subjectslist" exact Component={SubjectsList} />
      <Route path="subjectdetail/:id" exact Component={SubjectDetail} />
      <Route path="editsubject/:id" exact Component={EditSubject} />

      {/************************************ Exam *********************** */}
      <Route path="createexam" exact Component={CreateExam} />
      <Route path="viewexamdetails/:id" exact Component={ViewExamDetails} />
      <Route
        path="evaluateexam/:examid/:studentid"
        exact
        Component={EvaluateExam}
      />
      <Route path="allexams" exact Component={Allexams} />

      {/************************************ Academic Calender *********************** */}
      <Route
        path="createacadmiccalender"
        exact
        Component={CreateAcademicCalendar}
      />
      <Route
        path="viewacadmiccalender"
        exact
        Component={ViewAcademicCalendar}
      />

      {/************************************ Time Table *********************** */}

      <Route path="newtimetable" exact Component={NewTimetable} />
      <Route path="viewalltimetables" exact Component={ViewallTimetable} />
      <Route path="edittimetable/:id" exact Component={EditTimetable} />
      <Route path="viewonetimetable/:id" exact Component={ViewOneTimetable} />
     
    </Routes>
  );
};

export default DeanPages;