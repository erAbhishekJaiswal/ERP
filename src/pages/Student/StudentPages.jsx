import { Routes, Route } from "react-router-dom";
import StudentProfile from "./StudentProfile";
import Ecourse from "./Ecourse";
import Ecoureseitem from "./Ecoureseitem";
import Quiz from "./Quiz";
import StudentsQuiz from "./StudentsQuiz";
import Attendence from "./Attendence";
import AssignmentPages from "../AssignmentManage/AssignmentsPage";
// import { Navigate } from "react-router-dom";
// import ProtectedRoute from "../../components/ProtectedRoute";
import StudentDashboard from "../../components/dashboard/StudentDashboard";
import AssignmentDetail from "../AssignmentManage/AssignmentDetail";
import AssignmentSubmission from "../AssignmentManage/AssignmentSubmission";
import QuizAttempt from "./QuizAttempt";

const StudentPages = () => {
  console.log("StudentPages rendered at:", window.location.pathname);
  return (
    <Routes>
        <Route index element={<h1>Student Dashboard</h1>} /> 
        <Route path="studentdash" element={<StudentDashboard />}/>
        <Route path="profile" element={<h1>Profile Page</h1>} /> {/* Test */}
        <Route path="profile/:id" element={<StudentProfile />} />
        <Route path="e-course" element={<Ecourse />} />
        <Route path="e-course/:id" element={<Ecoureseitem />} />
        <Route path="quiz/:id" element={<QuizAttempt/>} />
        <Route path="studentsquiz" element={<StudentsQuiz />} />
        <Route path="attendence" element={<Attendence />} />
        <Route path="quiz-results" element={<h1>Quiz Results</h1>} />
        <Route path="assignment-page" element={<AssignmentPages />} />
        <Route path="assignment-detail/:id" element={<AssignmentDetail />} />
        <Route path="assignment-submission/:id" element={<AssignmentSubmission />} />
    </Routes>
  );
};

export default StudentPages;
