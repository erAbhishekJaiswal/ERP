import React from 'react';
import CourseReview from '../../pages/Director/CourseReview';
import AssignFacultyRole from '../../pages/Director/AssignFacultyRole';
import '../../CSSfolder/CommonCSS/allfile.css'
// import CourseReview from './CourseReview';
// import AssignFacultyRole from './AssignFacultyRole';

const DirectorDashboard = () => {
    return (
        <div className='allcontainer'>
            <h1>Director Dashboard</h1>
            {/* <CourseReview />
           <AssignFacultyRole /> */}
            <div className="directorbox">
                <h3>Academic Performance (e.g., GPA averages, graduation rates)</h3>
                <h3>Financial Overview (e.g., current budget, pending fees)</h3>
                <h3>Faculty and Staff Assignments</h3>
                <h3>Notifications for Pending Tasks (approvals, requests)</h3>
                <h3>Quick Access Links</h3>
            </div>
        </div>
    );
};

export default DirectorDashboard;
