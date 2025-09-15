import { Routes, Route } from "react-router-dom";

import RegistrarDashboard from "../../components/dashboard/RegistrarDashboard"
import AdminLogin from "../Auth/AdminLogin";
import AdminForgotPassword from "../Auth/AdminForgotPassword";
import AdminResetPassword from "../Auth/AdminResetPassword";

// Addmition Management
import NewFacultyRegistration from "../Faculty/NewFacultyRegistration";
import NewStudentRegistration from "../Student/NewStudentRegistration"

// Faculty Management
import AllFacultylist from "./AllFacultylist";
import FacultyProfile from "../Faculty/Facultyprofile";

import AllLeaves from "./AllLeaves";
import AllStatus from "./AllStatus";
// Student Management
import AllStudentlist from "./AllStudentlist";
import StudentProfile from "../Student/StudentProfile";

// Time Table Management
import EditTimetable from "./EditTimetable";
import NewTimetable from "./NewTimetable";
import ViewOneTimetable from "./ViewOneTimetable";
import ViewallTimetable from "./ViewallTimetable";
// import ViewLeaveRequests from "./ViewLeaveRequests";

// 
import CreateAcademicCalendar from "./CreateAcademicCalendar";
import ViewAcademicCalendar from "./ViewAcademicCalendar";
// 
import CreateExam from "./CreateExam";
import EvaluateExam from "./EvaluateExam";
import Allexams from "./Allexams";

// import RegistrarDashboard from "../";
// Subject Management
import SubjectAssignedFaculty from "./SubjectManagment/SubjectAssignedFaculty";
import SubjectCreation from "./SubjectManagment/SubjectCreation";
import SubjectDetail from "./SubjectManagment/SubjectDetail";
import SubjectsList from "./SubjectManagment/SubjectsList";
import EditSubject from "./SubjectManagment/SubjectEdit"
import AddStudentToSubject from "./SubjectManagment/AddStudentToSubject";
import BulkEnrollment from "./SubjectManagment/BulkEnrollment";
import EnrolledStudentsList from "./SubjectManagment/EnrolledStudentsList";

// Department Management
import DepartmentForm from "./Department/DepartmentForm";
import DepartmentList from "./Department/DepartmentList";
import DepartmentDetail from "./Department/DepartmentDetail";

// Designation Management
import DesignationForm from "./Designation/DesignationForm";
import DesignationList from "./Designation/DesignationList";
import DesignationDetail from "./Designation/DesignationDetail";

// Exam Management
import ViewExamDetails from "../Admin/ViewExamDetails";

// Course Management
import CreateCourse from "../CourseManagement/CreateCourse";
import CourseList from "../CourseManagement/CourseList";
import CourseDetail from "../CourseManagement/CourseDetail";
import EditCourse from "../CourseManagement/EditCourse";
import AllUsersList from "./AllUsersList";
import Userdetail from "./Userdetail";
import UserEdit from "./UserEdit";
import UpdateStudentRecord from "./UpdateStudentRecord";
import FacultyProfileEdit from "../Faculty/FacultyProfileEdit";
import CreateAttendance from "../AttendanceManagement/CreateAttendance";

// Hostel Management
// Room
import RoomList from "../HostelManagement/Rooms/RoomList";
import RoomDetails from "../HostelManagement/Rooms/RoomDetails";
import CreateRoom from "../HostelManagement/Rooms/CreateRoom";
import UpdateRoom from "../HostelManagement/Rooms/UpdateRoom";
import AllocateRoom from "../HostelManagement/Rooms/AllocateRoom";
// Mentainence
import CreateMaintenance from "../HostelManagement/Maintenance/CreateMaintenance"
import UpdateMaintenance from "../HostelManagement/Maintenance/UpdateMaintenance"
import MaintenanceList from "../HostelManagement/Maintenance/MaintenanceList"
import MaintenanceDetails from "../HostelManagement/Maintenance/MaintenanceDetails";
// Fee
import CreateFee from "../HostelManagement/Hostelfees/CreateFee"
import DueFeesReport from "../HostelManagement/Hostelfees/DueFeesReport"
import FeeDetails from "../HostelManagement/Hostelfees/FeeDetails"
import FeeList from "../HostelManagement/Hostelfees/FeeList"
import StudentFees from "../HostelManagement/Hostelfees/StudentFees"

const AdminPages = () => {
  return (
    <Routes>
      {/* <Route path="/faculty-profile/:id" exact Component={Facultyprofile} /> */}
    
      {/* <Route path="/admindash" exact Component={AdminDashboard} /> */}
      {/* <Route path="/attendence" exact Component={Attendence}/> */}
      {/* <Route path="/admissionsdash" exact Component={AdmissionsDashboard}/> */}

      <Route path="login" exact Component={AdminLogin}/>
      <Route path="forgot-password" exact Component={AdminForgotPassword} />
      <Route path="reset-password" exact Component={AdminResetPassword} />

      {/********************************* Admin control ***************************** */}
      <Route path="registrardash" exact Component={RegistrarDashboard} />
      <Route
        path="subjectassignedfaculty/:id"
        exact
        Component={SubjectAssignedFaculty}
      />
      <Route path="userslist" exact Component={AllUsersList}/>
      <Route path="userdetail/:id" exact Component={Userdetail} />
      <Route path="useredit/:id" exact Component={UserEdit} />
      <Route path="create-attendance" exact Component={CreateAttendance} />

      {/* ********************************* Addmition Management ***************************** */}
      <Route path="newstudentregistration" exact Component={NewStudentRegistration} />
      <Route path="newfacultyregistration" exact Component={NewFacultyRegistration} />

      {/* ********************************* Student control ***************************** */}
      <Route path="allstudentlist" exact Component={AllStudentlist} />
      <Route path="student-profile/:id" exact Component={StudentProfile}/>
      <Route path="student/edit/:id" exact Component={UpdateStudentRecord} />
      {/* <Route path="student/:id" exact Component={Studentdetail}/> */}

      {/* ************** Faculty routes ************** */}
      <Route path="facultylist" exact Component={AllFacultylist} />
       <Route path='faculty-profile/:id'exact Component={FacultyProfile}/>
       <Route path="faculty/edit/:id" exact Component={FacultyProfileEdit} />

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


      {/********************************** Course *********************** */}
      <Route path="createcourse" exact Component={CreateCourse} />
      <Route path="courseedit/:id" exact Component={EditCourse} />
      <Route path="courselist" exact Component={CourseList} />
      <Route path="coursedetail/:id" exact Component={CourseDetail} />

      {/********************************** Subject *********************** */}
      <Route path="createsubject" exact Component={SubjectCreation} />
      <Route path="subjectslist" exact Component={SubjectsList} />
      <Route path="subjectdetail/:id" exact Component={SubjectDetail} />
      <Route path="editsubject/:id" exact Component={EditSubject} />
      <Route path="subject/:subjectId" exact Component={AddStudentToSubject} />
      <Route path="enrolledstudentlist/:subjectId" exact Component={EnrolledStudentsList} />
      <Route path="bulk-enrollment/:subjectId" exact Component={BulkEnrollment} />

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


      {/* Hostel Management */}

      <Route path="rooms" exact Component={RoomList}/>
      <Route path="rooms/:id" exact Component={RoomDetails}/>
      <Route path="createroom" exact Component={CreateRoom}/>
      <Route path="updateroom" exact Component={UpdateRoom}/>
      <Route path="/allocate/:id" exact Component={AllocateRoom}/>

      <Route path="maintenance/create" exact Component={CreateMaintenance}/>
      <Route path="maintenance/update" exact Component={UpdateMaintenance}/>
      <Route path="maintenance/list" exact Component={MaintenanceList}/>
      <Route path="maintenance/id" exact Component={MaintenanceDetails}/>

      <Route path="fee/create" exact Component={CreateFee}/>
      <Route path="fee/duereport" exact Component={DueFeesReport}/>
      <Route path="fee/id" exact Component={FeeDetails}/>
      <Route path="fee/list" exact Component={FeeList}/>
      <Route path="fee/student" exact Component={StudentFees}/>


      {/* Leave Management */}
  {/* <Route path="viewleaverequest" exact Component={ViewLeaveRequests} /> */}
      <Route path="leavemanagement" exact Component={AllLeaves} />
      <Route path="allstatus" exact Component={AllStatus} />
    </Routes>
  );
};

export default AdminPages;
