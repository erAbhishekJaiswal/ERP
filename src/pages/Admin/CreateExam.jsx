// import React, { useEffect, useState } from 'react';
// import '../../CSSfolder/CommonCSS/allfile.css';
// import '../../CSSfolder/AdminCSS/exams.css'
// // import api from '../api';
// import axios from 'axios';

// const CreateExam = () => {
//     const [examName, setExamName] = useState('');
//     const [examDate, setExamDate] = useState('');
//     const [examTime, setExamTime] = useState('');
//     const [subject, setSubject] = useState('');
//     const [department, setDepartment] = useState('');
//     const [year, setYear] = useState('');
//     const [semester, setSemester] = useState('');

//     const handleCreateExam = async () => {
//         try {
//             await axios.post('http://localhost:5000/api/registrar/exam', {
//                 examName,
//                 examDate,
//                 examTime,
//                 subject,
//                 department,
//                 year,
//                 semester,
//             });
//             alert('Exam created and hall tickets issued');
//         } catch (error) {
//             console.error('Failed to create exam or issue hall tickets', error);
//         }
//     };

//     return (
//         <div className='allcontainer'>
//             <div className="createexambox">
//                 <div className="innerbox">
//                     <div className='examhead'>Create Exam</div>
//                     <div className="inputsection">
//                         <label className='elabel'>Exam Name:</label>
//                         <input className='einput' type="text" value={examName} onChange={(e) => setExamName(e.target.value)} placeholder="Exam Name" />
//                     </div>
//                     <div className="inputsection">
//                         <label className='elabel'>Exam Date:</label>
//                         <input className='einput' type="date" value={examDate} onChange={(e) => setExamDate(e.target.value)} />
//                     </div>
//                     <div className="inputsection">
//                         <label className='elabel'>Exam Time:</label>
//                         <input className='einput' type="time" value={examTime} onChange={(e) => setExamTime(e.target.value)} />
//                     </div>
//                     <div className="inputsection">
//                         <label className='elabel'>Subject:</label>
//                         <input className='einput' type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
//                     </div>
//                     <div className="inputsection">
//                         <label className='elabel'>Department: </label>
//                         <select name="department" id="department" value={department} onChange={(e) => setDepartment(e.target.value)}>
//                             <option className='doption' value="CSE">Computer Science and Engineering</option>
//                             <option className='doption' value="ECE"> Electronics and Communication Engineering</option>
//                             {/* <option className='doption' value="ECE">ECE</option> */}
//                             <option className='doption' value="EEE">Electrical and Electronics Engineering</option>
//                             <option className='doption' value="MECH">Mechanical Engineering</option>
//                             <option className='doption' value="CIVIL">Civil Engineering</option>
//                             <option className='doption' value="IT">Information Technology</option>
//                             <option className='doption' value="CHEMICAL">Chemical Engineering</option>
//                         </select>
//                         {/* <input className='einput' type="text" value={studentIds} onChange={(e) => setStudentIds(e.target.value)} placeholder="Student IDs (comma-separated)" /> */}
//                     </div>
//                     <div className="inputsection">
//                         <label className='elabel'>Year :</label>
//                         <select name="year" id="" value={year} onChange={(e) => setYear(e.target.value)}>
//                             <option className='doption' value="1">1st Year</option>
//                             <option className='doption' value="2">2nd Year</option>
//                             <option className='doption' value="3">3rd Year</option>
//                             <option className='doption' value="4">4th Year</option>
//                         </select>
//                         {/* <input className='einput' type="text" value={studentIds} onChange={(e) => setStudentIds(e.target.value)} placeholder="Student IDs (comma-separated)" /> */}
//                     </div>
//                     <div className="inputsection">
//                         <label className='elabel'>Semester :</label>
//                         <select name="semester" id="" value={semester} onChange={(e) => setSemester(e.target.value)}>
//                             <option className='doption' value="1">1st Semester</option>
//                             <option className='doption' value="2">2nd Semester</option>
//                             <option className='doption' value="3">3rd Semester</option>
//                             <option className='doption' value="4">4th Semester</option>
//                             <option className='doption' value="5">5th Semester</option>
//                             <option className='doption' value="6">6th Semester</option>
//                             <option className='doption' value="7">7th Semester</option>
//                             <option className='doption' value="8">8th Semester</option>
//                         </select>
//                         {/* <input className='einput' type="text" value={studentIds} onChange={(e) => setStudentIds(e.target.value)} placeholder="Student IDs (comma-separated)" /> */}
//                     </div>
//                     {/* <div className="inputsection">
//                         <label className='elabel'>Student IDs <span className='extext'>(comma-separated)</span> :</label>
//                         <input className='einput' type="text" value={studentIds} onChange={(e) => setStudentIds(e.target.value)} placeholder="Student IDs (comma-separated)" />
//                     </div> */}
//                     <button className='ebutton' onClick={handleCreateExam}>Create Exam</button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CreateExam;











import React, { useState } from 'react';
import axios from 'axios';
import '../../CSSfolder/AdminCSS/CreateExam.css';
import apiClient from '../../services/axios';

const CreateExam = () => {
    const [formData, setFormData] = useState({
        examName: '',
        examDate: '',
        examTime: '',
        subject: '',
        department: '',
        year: '',
        semester: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const departments = [
        { value: "CSE", label: "Computer Science and Engineering" },
        { value: "ECE", label: "Electronics and Communication Engineering" },
        { value: "EEE", label: "Electrical and Electronics Engineering" },
        { value: "MECH", label: "Mechanical Engineering" },
        { value: "CIVIL", label: "Civil Engineering" },
        { value: "IT", label: "Information Technology" },
        { value: "CHEMICAL", label: "Chemical Engineering" }
    ];

    const years = [
        { value: "1", label: "1st Year" },
        { value: "2", label: "2nd Year" },
        { value: "3", label: "3rd Year" },
        { value: "4", label: "4th Year" }
    ];

    const semesters = [
        { value: "1", label: "1st Semester" },
        { value: "2", label: "2nd Semester" },
        { value: "3", label: "3rd Semester" },
        { value: "4", label: "4th Semester" },
        { value: "5", label: "5th Semester" },
        { value: "6", label: "6th Semester" },
        { value: "7", label: "7th Semester" },
        { value: "8", label: "8th Semester" }
    ];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSuccessMessage('');
        
        try {
            const response = await apiClient.post('/api/registrar/exam', formData);

            setSuccessMessage('Exam created successfully! Hall tickets have been issued.');
            console.log(response.data);
            
            // Reset form
            setFormData({
                examName: '',
                examDate: '',
                examTime: '',
                subject: '',
                department: '',
                year: '',
                semester: ''
            });
        } catch (error) {
            console.error('Failed to create exam:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="exam-page">
            <div className="exam-container">
                <div className="exam-header">
                    <div className="header-icon">
                        <svg viewBox="0 0 24 24">
                            <path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1c-1.3 0-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm2 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                        </svg>
                    </div>
                    <h1>Create New Exam</h1>
                    <p>Schedule exams and automatically issue hall tickets to students</p>
                </div>
                
                <form onSubmit={handleSubmit} className="exam-form">
                    <div className="form-grid">
                        <div className="form-group floating">
                            <input
                                type="text"
                                name="examName"
                                value={formData.examName}
                                onChange={handleChange}
                                className="form-input"
                                placeholder=" "
                                required
                            />
                            <label className="form-label">Exam Name</label>
                            <span className="input-icon">
                                {/* <svg viewBox="0 0 24 24">
                                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
                                </svg> */}
                            </span>
                        </div>

                        <div className="form-group floating">
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                className="form-input"
                                placeholder=" "
                                required
                            />
                            <label className="form-label">Subject</label>
                            <span className="input-icon">
                                {/* <svg viewBox="0 0 24 24">
                                    <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
                                </svg> */}
                            </span>
                        </div>

                        <div className="form-group floating">
                            <input
                                type="date"
                                name="examDate"
                                value={formData.examDate}
                                onChange={handleChange}
                                className="form-input"
                                placeholder=" "
                                required
                            />
                            <label className="form-label">Exam Date</label>
                            <span className="input-icon">
                                {/* <svg viewBox="0 0 24 24">
                                    <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm-8 4H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z"/>
                                </svg> */}
                            </span>
                        </div>

                        <div className="form-group floating">
                            <input
                                type="time"
                                name="examTime"
                                value={formData.examTime}
                                onChange={handleChange}
                                className="form-input"
                                placeholder=" "
                                required
                            />
                            <label className="form-label">Exam Time</label>
                            <span className="input-icon">
                                {/* <svg viewBox="0 0 24 24">
                                    <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
                                </svg> */}
                            </span>
                        </div>

                        <div className="form-group floating select-options">
                            <select
                            style={{backgroundColor:"white"}}
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="form-input"
                                required
                            >
                                <option style={{backgroundColor:"white"}} value="">Select Department</option>
                                {departments.map(dept => (
                                    <option style={{backgroundColor:"white"}} key={dept.value} value={dept.value}>
                                        {dept.label}
                                    </option>
                                ))}
                            </select>
                            <label className="form-label">Department</label>
                            <span className="input-icon">
                                <svg viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                                </svg>
                            </span>
                        </div>

                        <div className="form-group floating select-options">
                            <select
                            style={{backgroundColor:"white"}}
                                name="year"
                                value={formData.year}
                                onChange={handleChange}
                                className="form-input"
                                required
                            >
                                <option style={{backgroundColor:"white"}} value="">Select Year</option>
                                {years.map(year => (
                                    <option style={{backgroundColor:"white"}} key={year.value} value={year.value}>
                                        {year.label}
                                    </option>
                                ))}
                            </select>
                            <label className="form-label">Year</label>
                            <span className="input-icon">
                                <svg viewBox="0 0 24 24">
                                    <path d="M9 4v3h5v12h3V7h5V4H9zm-6 4h3v12h3V8h3V4H3v4z"/>
                                </svg>
                            </span>
                        </div>

                        <div className="form-group floating select-options">
                            <select
                            style={{backgroundColor:"white"}}
                                name="semester"
                                value={formData.semester}
                                onChange={handleChange}
                                className="form-input"
                                required
                            >
                                <option style={{backgroundColor:"white"}} value="">Select Semester</option>
                                {semesters.map(sem => (
                                    <option style={{backgroundColor:"white"}} key={sem.value} value={sem.value}>
                                        {sem.label}
                                    </option>
                                ))}
                            </select>
                            <label className="form-label">Semester</label>
                            <span className="input-icon">
                                <svg viewBox="0 0 24 24">
                                    <path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"/>
                                </svg>
                            </span>
                        </div>
                    </div>

                    {successMessage && (
                        <div className="success-message">
                            <svg viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            {successMessage}
                        </div>
                    )}

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="submit-button"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner"></span>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <svg viewBox="0 0 24 24">
                                        <path d="M17 3H7c-1.1 0-1.99.9-1.99 2L5 21l7-3 7 3V5c0-1.1-.9-2-2-2zm0 15l-5-2.18L7 18V5h10v13z"/>
                                    </svg>
                                    Create Exam & Issue Hall Tickets
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateExam;