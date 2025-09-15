import { Routes, Route } from 'react-router-dom';
import "./Assignments"
import "./Collaboration"
import "./Grades"
import "./Submission"

const AssignmentPages = () => {
  return (
    <Routes>
       <Route path="assignments" element={<Assignments />} />
       <Route path="collaboration" element={<Collaboration />} />
         <Route path="grades" element={<Grades />} />
         <Route path="submission" element={<Submission />} />
         
    </Routes>
  );
};

export default AssignmentPages;