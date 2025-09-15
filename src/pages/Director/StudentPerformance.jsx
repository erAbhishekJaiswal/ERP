// import React, { useState, useEffect } from 'react';

// const StudentPerformance = () => {
//     const [performanceData, setPerformanceData] = useState([]);

//     useEffect(() => {
//         // Fetch student performance data from the API
//         setPerformanceData([
//             { id: 1, name: 'John Doe', grade: 'A' },
//             { id: 2, name: 'Jane Smith', grade: 'B+' },
//             // More performance data
//         ]);
//     }, []);

//     return (
//         <div className="analytics-page">
//             <h2>Student Performance</h2>
//             <ul>
//                 {performanceData.map(student => (
//                     <li key={student.id}>
//                         {student.name} - {student.grade}
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default StudentPerformance;





import React, { useState, useEffect } from 'react';
import '../../CSSfolder/CommonCSS/allfile.css'
// import axios from 'axios';
// import './StudentPerformance.css';

const StudentPerformance = () => {
    const [performanceData, setPerformanceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // useEffect(() => {
    //     const fetchPerformanceData = async () => {
    //         try {
    //             const response = await axios.get('/api/student/performance');
    //             setPerformanceData(response.data);
    //             setLoading(false);
    //         } catch (error) {
    //             setError('Failed to load performance data. Please try again.');
    //             setLoading(false);
    //         }
    //     };

    //     fetchPerformanceData();
    // }, []);

    // if (loading) {
    //     return <div>Loading...</div>;
    // }

    // if (error) {
    //     return <div className="error-message">{error}</div>;
    // }

    return (
        <div className="allcontainer">
            <h1>Student Performance</h1>
            {performanceData ? (
                <div>
                    <div className="performance-summary">
                        <h2>Summary</h2>
                        <p><strong>Overall GPA:</strong> {performanceData.gpa}</p>
                        <p><strong>Total Credits:</strong> {performanceData.totalCredits}</p>
                        <p><strong>Attendance Rate:</strong> {performanceData.attendanceRate}%</p>
                    </div>

                    <div className="grades-section">
                        <h2>Grades</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Grade</th>
                                    <th>Credits</th>
                                </tr>
                            </thead>
                            <tbody>
                                {performanceData.grades.length > 0 ? (
                                    performanceData.grades.map((course) => (
                                        <tr key={course.courseId}>
                                            <td>{course.courseName}</td>
                                            <td>{course.grade}</td>
                                            <td>{course.credits}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3">No grades available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="attendance-section">
                        <h2>Attendance</h2>
                        <table>
                            <thead>
                                <tr>
                                    <th>Course</th>
                                    <th>Attendance</th>
                                    <th>Total Classes</th>
                                    <th>Attended</th>
                                </tr>
                            </thead>
                            <tbody>
                                {performanceData.attendance.length > 0 ? (
                                    performanceData.attendance.map((course) => (
                                        <tr key={course.courseId}>
                                            <td>{course.courseName}</td>
                                            <td>{course.attendanceRate}%</td>
                                            <td>{course.totalClasses}</td>
                                            <td>{course.classesAttended}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4">No attendance records available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            ) : (
                <p>No performance data found.</p>
            )}
        </div>
    );
};

export default StudentPerformance;
