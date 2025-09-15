import { Routes, Route } from 'react-router-dom';
import AssignFacultyRole from "./AssignFacultyRole"
import CourseReview from "./CourseReview"
import StudentPerformance from "./StudentPerformance"

// Faculty
import AllFacultylist from "../Admin/AllFacultylist";
import FacultyProfile from "../Faculty/Facultyprofile";

// Student Management
import AllStudentlist from "../Admin/AllStudentlist";
import StudentProfile from "../Student/StudentProfile";

const DirectorPages = () => {
  return (
    <Routes>
      <Route path='directordash' element={<h1>Director Dashboard</h1>} />
        <Route path="assign-faculty-role" element={<AssignFacultyRole />} />
        <Route path="course-review" element={<CourseReview />} />
        <Route path="student-performance" element={<StudentPerformance />} />

         {/* ************** Faculty routes ************** */}
         <Route path="facultylist" exact Component={AllFacultylist} />
       <Route path='faculty-profile/:id'exact Component={FacultyProfile}/>

       {/* ********************************* Student control ***************************** */}
      <Route path="allstudentlist" exact Component={AllStudentlist} />
      <Route path="student-profile/:id" exact Component={StudentProfile}/>

    </Routes>
  );
};

export default DirectorPages;