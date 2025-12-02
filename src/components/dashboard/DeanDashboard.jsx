import React from 'react';
import '../../CSSfolder/CommonCSS/allfile.css';
import '../../CSSfolder/DeanCSS/deandashboard.css'

const DeanDashboard = () => {
    return (
        <div className='allcontainer'>
            <h1>Dean Dashboard</h1>
            <div className="deandashbox">
                <div className="acdmicbox">
                    <h3>Academic Performance (e.g., GPA averages, graduation rates)</h3>
                    <p>Display department- or course-level metrics, such as average grades, graduation rates, retention rates, etc.</p>
                </div>
                <div className="facultybox">
                    <h3>Faculty and Student Insights</h3>
                    <p>Faculty performance data (e.g., student evaluations, absenteeism rates).</p>
                    <p> Student performance data (e.g., pass/fail rates, GPA distribution).</p>
                </div>
                <div className="alartbox">
                    <h3>Alerts/Notifications:</h3>
                    <p> Immediate notifications about issues (e.g., failing students, faculty absenteeism, low performance in specific departments or courses).
                        Reminders for important academic deadlines (e.g., report submission, faculty evaluations).</p>

                </div>
                <div className="quicklink">
                    <h3>Quick Access Links</h3>
                    <p>Easy access to other areas such as Role Assignment, Subject Assignment, Timetable Review, etc.</p>

                </div>
            </div>
        </div>
    );
};

export default DeanDashboard;
