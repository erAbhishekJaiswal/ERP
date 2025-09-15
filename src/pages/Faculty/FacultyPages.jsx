import { Routes, Route } from "react-router-dom";
import AllQuiz from "./AllQuiz";
import EditFacultyprofile from "./EditFacultyprofile";
import Facultyprofile from "./Facultyprofile";
import LeaveRequest from "./LeaveRequest";
import Setquiz from "./Setquiz";
// import StudentAttendence from "./StudentAttendence";
// import StudentMarks from "./StudentMarks";
import Studentdetail from "../Student/StudentProfile";
import StudentList from "../Admin/AllStudentlist";
import Timetable from "./Timetable";
// import ViewTimetable from "./ViewTimetable";
import AttendanceRecording from "../AttendanceManagement/AttendanceRecording";
import AttendanceReports from "../AttendanceManagement/AttendanceReports";
import AttendanceDashboard from "../AttendanceManagement/AttendanceDashboard";
import AssignmentForm from "../AssignmentManage/AssignmentCreation/AssignmentForm";
import ClassDashboard from "../AssignmentManage/ClassManagement/ClassDashboard";
import GradingTool from "../AssignmentManage/GradingFeedback/GradingTool";
import PlagiarismReports from "../AssignmentManage/PlagiarismChecking/PlagiarismReports";
import FacultyMessaging from "../AssignmentManage/Communication/FacultyMessaging";
import ViewAcademicCalendar from "../Admin/ViewAcademicCalendar";
import ViewTimetable from "../Admin/ViewallTimetable";
import CreateAttendance from "../AttendanceManagement/CreateAttendance";
import MarkAttendance from "../AttendanceManagement/MarkAttendance";
import AttendanceByDate from "../AttendanceManagement/AttendanceByDate";
import AttendanceReportByDate from "../AttendanceManagement/AttendanceReportByDate";
import SubjectAttendance from "../AttendanceManagement/SubjectAttendance";
import StudentAttendance from "../AttendanceManagement/StudentAttendance";
import UpdateAttendance from "../AttendanceManagement/UpdateAttendance";
import AssignmentsPage from "../AssignmentManage/AssignmentsPage";
import FacultyDashboard from "../../components/dashboard/FacultyDashboard";
import ViewOneTimetable from "../Admin/ViewOneTimetable";
import AssignmentDetail from "../AssignmentManage/AssignmentDetail";
import AssignmentSubmission from "../AssignmentManage/AssignmentSubmission";
import SubmissionsList from "../AssignmentManage/SubmissionsList";
import Quiz from "../Student/Quiz";
import StudentsQuiz from "../Student/StudentsQuiz";



const FacultyPages = () => {
  return (
    <Routes>
      {/*****************************Faculty Profile******************************** */}
      <Route path="facultydash" element={<FacultyDashboard/>} />
      <Route path={`faculty-profile/:id`} element={<Facultyprofile />} />
      <Route path="edit-facultyprofile" element={<EditFacultyprofile />} />

      <Route path="leave-request" element={<LeaveRequest />} />
      <Route path='viewacadmic-calender' exact Component={ViewAcademicCalendar}/>

      {/* <Route path="student-attendence" element={<StudentAttendence />} /> */}

      {/* <Route path="student-marks" element={<StudentMarks />} /> */}
      <Route path="student-profile/:id" element={<Studentdetail />} />
      <Route path="student-list" element={<StudentList />} />

      {/* *****************************Timetable******************************** */}
      <Route path="timetable/:id" element={<Timetable />} />
      <Route path="view-timetable" element={<ViewTimetable />} />
      <Route path="viewonetimetable/:id" element={<ViewOneTimetable />} />

      {/* *****************************Quiz******************************** */}

      <Route path="all-quiz" element={<AllQuiz />} />
      <Route path="quiz/:id" element={<Quiz />} />
        {/* <Route path="studentsquiz" element={<StudentsQuiz />} /> */}
      <Route path="set-quiz" element={<Setquiz />} />

      {/*********************************Attendence **************** */}
      <Route path="attendance-recording" element={<AttendanceRecording />} />
      <Route path="attendance-reports" element={<AttendanceReports />} />
      <Route path="attendance-dashboard" element={<AttendanceDashboard />} />

      {/*****************************Assignment *************************************/}

      <Route path="create-assignment" element={<AssignmentForm />} />
      {/* <Route path="class-management" element={<ClassDashboard />} /> */}
      <Route path="assignment-page" element={<AssignmentsPage />} />
      <Route path="assignment-detail/:id" element={<AssignmentDetail />} />
      <Route path="assignment-submission/:id" element={<AssignmentSubmission />} />
      <Route path="assignment-submissions/:id" element={<SubmissionsList />} />
      <Route path="grading-feedback" element={<GradingTool />} />
      <Route path="plagiarism-check" element={<PlagiarismReports />} />
      <Route path="communication" element={<FacultyMessaging />} />

      {/*********************************Attendence *******************************/}
      {/* <Route path="create-attendance" element={<CreateAttendance />} /> */}
      <Route path="mark-attendance" element={<MarkAttendance/>} />
      <Route path={`attendance/:subjectid/:date`} element={<AttendanceByDate />} />
      <Route path="attendance-by-date" element={<AttendanceReportByDate />} />
      <Route path="attendance-by-subject" element={<SubjectAttendance />} />
      <Route path="student-attendance" element={<StudentAttendance />} />
      <Route path="update-attendance" element={<UpdateAttendance />} />
    </Routes>
  );
};

export default FacultyPages;
