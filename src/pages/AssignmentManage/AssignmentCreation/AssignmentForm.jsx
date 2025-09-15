import React, { useState, useEffect } from 'react';
import styles from './AssignmentForm.module.css';
import axios from 'axios';
import apiClient from '../../../services/axios';

const AssignmentForm = () => {
    const [assignment, setAssignment] = useState({
        id: Date.now(),
        title: '',
        description: '',
        dueDate: '',
        course: '',
        department: '',
        subject: '',
        semester: '',
        attachments: [],
        rubric: [],
        guidelines: ''
    });
    
    const [courselist, setCourselist] = useState([]);
    const [departmentlist, setDepartmentlist] = useState([]);
    const [subjectlist, setSubjectlist] = useState([]);
    const [loading, setLoading] = useState({
        courses: true,
        departments: true,
        subjects: true
    });
    const [error, setError] = useState('');
    const [semesterOptions] = useState([1, 2, 3, 4, 5, 6, 7, 8]);
    const profileid = localStorage.getItem('profileid');

    useEffect(() => {
        const fetchInitialData = async () => {
            try {
                // Fetch all required data in parallel
                const [coursesRes, deptsRes] = await Promise.all([
                    apiClient.get('/api/features/getcoursecodenamelist'),
                    apiClient.get('/api/features/getDepartmentlist')
                ]);

                setCourselist(coursesRes.data.courseNames);
                setDepartmentlist(deptsRes.data.departments);
                
                setLoading(prev => ({
                    ...prev,
                    courses: false,
                    departments: false
                }));
            } catch (err) {
                setError('Failed to load initial data');
                console.error('Error fetching data:', err);
                setLoading({
                    courses: false,
                    departments: false,
                    subjects: false
                });
            }
        };
        fetchInitialData();
    }, []);

    useEffect(() => {
        if (assignment.department) {
            const fetchSubjects = async () => {
                try {
                    setLoading(prev => ({ ...prev, subjects: true }));
                    const res = await apiClient.get(`/api/features/subjectlist?department=${assignment.department}`);
                    setSubjectlist(res.data.allSubject);
                    setLoading(prev => ({ ...prev, subjects: false }));
                } catch (err) {
                    setError('Failed to load subjects');
                    console.error('Error fetching subjects:', err);
                    setLoading(prev => ({ ...prev, subjects: false }));
                }
            };
            fetchSubjects();
        }
    }, [assignment.department]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAssignment(prev => ({ ...prev, [name]: value }));
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setAssignment(prev => ({
            ...prev,
            attachments: [...prev.attachments, ...files]
        }));
    };

    const addRubricItem = () => {
        setAssignment(prev => ({
            ...prev,
            rubric: [...prev.rubric, { criteria: '', points: 0 }]
        }));
    };

    const handleRubricChange = (index, field, value) => {
        const updatedRubric = [...assignment.rubric];
        updatedRubric[index][field] = field === 'points' ? parseInt(value) || 0 : value;
        setAssignment(prev => ({ ...prev, rubric: updatedRubric }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!assignment.course || !assignment.department || !assignment.subject || !assignment.semester) {
            alert('Please fill all required fields');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('title', assignment.title);
            formData.append('course', assignment.course);
            formData.append('department', assignment.department);
            formData.append('subject', assignment.subject);
            formData.append('semester', assignment.semester);
            formData.append('dueDate', assignment.dueDate);
            formData.append('description', assignment.description);
            formData.append('guidelines', assignment.guidelines);
            formData.append('rubric', JSON.stringify(assignment.rubric));
            formData.append('instructor', profileid);
            
            // Append each file
            assignment.attachments.forEach(file => {
                formData.append('attachments', file);
            });

            const response = await apiClient.post('/api/assignment/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Assignment created:', response.data);
            
            // Reset form
            setAssignment({
                id: Date.now(),
                title: '',
                description: '',
                dueDate: '',
                course: '',
                department: '',
                subject: '',
                semester: '',
                attachments: [],
                rubric: [],
                guidelines: ''
            });
            
            alert('Assignment created successfully!');
        } catch (error) {
            console.error('Error creating assignment:', error);
            alert(`Error: ${error.response?.data?.message || 'Failed to create assignment'}`);
        }
    };

    if (loading.courses || loading.departments) {
        return <div className={styles.loading}>Loading initial data...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Create New Assignment</h1>
            <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>Course</label>
                        <select
                            name="course"
                            value={assignment.course}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a course</option>
                            {courselist.map((course) => (
                                <option key={course._id} value={course._id}>
                                    {course.code} - {course.courseName}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Department</label>
                        <select
                            name="department"
                            value={assignment.department}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select department</option>
                            {departmentlist.map((dept) => (
                                <option key={dept._id} value={dept._id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                        <label>Subject</label>
                        <select
                            name="subject"
                            value={assignment.subject}
                            onChange={handleChange}
                            required
                            disabled={!assignment.department || loading.subjects}
                        >
                            <option value="">{loading.subjects ? 'Loading subjects...' : 'Select subject'}</option>
                            {subjectlist.map((subject) => (
                                <option key={subject._id} value={subject._id}>
                                    {subject.name} ({subject.code})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Semester</label>
                        <select
                            name="semester"
                            value={assignment.semester}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select semester</option>
                            {semesterOptions.map(sem => (
                                <option key={sem} value={sem}>Semester {sem}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Assignment Title</label>
                    <input
                        type="text"
                        name="title"
                        value={assignment.title}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Due Date</label>
                    <input
                        type="datetime-local"
                        name="dueDate"
                        value={assignment.dueDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Description & Instructions</label>
                    <textarea
                        name="description"
                        value={assignment.description}
                        onChange={handleChange}
                        rows={6}
                        required
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Submission Guidelines</label>
                    <textarea
                        name="guidelines"
                        value={assignment.guidelines}
                        onChange={handleChange}
                        rows={4}
                    />
                </div>

                <div className={styles.formGroup}>
                    <label>Attachments</label>
                    <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className={styles.fileInput}
                    />
                    <div className={styles.fileList}>
                        {assignment.attachments.map((file, index) => (
                            <div key={index} className={styles.fileItem}>
                                {file.name}
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.rubricSection}>
                    <h3>Grading Rubric</h3>
                    <button
                        type="button"
                        onClick={addRubricItem}
                        className={styles.addButton}
                    >
                        Add Rubric Item
                    </button>
                    {assignment.rubric.map((item, index) => (
                        <div key={index} className={styles.rubricItem}>
                            <input
                                type="text"
                                placeholder="Criteria"
                                value={item.criteria}
                                onChange={(e) => handleRubricChange(index, 'criteria', e.target.value)}
                                className={styles.rubricInput}
                            />
                            <input
                                type="number"
                                placeholder="Points"
                                value={item.points}
                                onChange={(e) => handleRubricChange(index, 'points', e.target.value)}
                                className={styles.rubricPoints}
                                min="0"
                            />
                        </div>
                    ))}
                </div>

                <div className={styles.formFooter}>
                    <div className={styles.instructorInfo}>
                        Instructor: {profileid}
                    </div>
                    <button type="submit" className={styles.submitButton}>
                        Create Assignment
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AssignmentForm;



















// import React, { useState, useEffect } from 'react';
// import styles from './AssignmentForm.module.css';
// import axios from 'axios';

// const AssignmentForm = () => {
//     const [assignments, setAssignments] = useState([]);
//     const [assignment, setAssignment] = useState({
//         id: Date.now(),
//         title: '',
//         description: '',
//         dueDate: '',
//         course: '',
//         attachments: [],
//         rubric: [],
//         guidelines: ''
//     });
//     const [courselist, setCourselist] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState('');

//     useEffect(() => {
//         const fetchCourses = async () => {
//             try {
//                 const res = await axios.get('http://localhost:5000/api/features/getcoursecodenamelist');
//                 setCourselist(res.data.courseNames);
//                 console.log(res.data.courseNames);
//                 setLoading(false);
//             } catch (err) {
//                 setError('Failed to load courses');
//                 setLoading(false);
//                 console.error('Error fetching courses:', err);
//             }
//         };
//         fetchCourses();
//     }, []);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setAssignment(prev => ({ ...prev, [name]: value }));
//     };

//     const handleFileUpload = (e) => {
//         const files = Array.from(e.target.files);
//         setAssignment(prev => ({
//             ...prev,
//             attachments: [...prev.attachments, ...files]
//         }));
//     };

//     const addRubricItem = () => {
//         setAssignment(prev => ({
//             ...prev,
//             rubric: [...prev.rubric, { criteria: '', points: 0 }]
//         }));
//     };

//     const handleRubricChange = (index, field, value) => {
//         const updatedRubric = [...assignment.rubric];
//         updatedRubric[index][field] = field === 'points' ? parseInt(value) || 0 : value;
//         setAssignment(prev => ({ ...prev, rubric: updatedRubric }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         if (!assignment.course) {
//             alert('Please select a course');
//             return;
//         }

//         try {
//             const formData = new FormData();
//             formData.append('title', assignment.title);
//             formData.append('course', assignment.course);
//             formData.append('dueDate', assignment.dueDate);
//             formData.append('description', assignment.description);
//             formData.append('guidelines', assignment.guidelines);
//             formData.append('rubric', JSON.stringify(assignment.rubric));
            
//             // Append each file
//             assignment.attachments.forEach(file => {
//                 formData.append('attachments', file);
//             });

//             const response = await axios.post('http://localhost:5000/api/assignment/', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                 },
//             });

//             console.log('Assignment created:', response.data);
            
//             // Reset form
//             setAssignment({
//                 id: Date.now(),
//                 title: '',
//                 description: '',
//                 dueDate: '',
//                 course: '',
//                 attachments: [],
//                 rubric: [],
//                 guidelines: ''
//             });
            
//             alert('Assignment created successfully!');
//         } catch (error) {
//             console.error('Error creating assignment:', error);
//             alert(`Error: ${error.response?.data?.message || 'Failed to create assignment'}`);
//         }
//     };

//     if (loading) {
//         return <div className={styles.loading}>Loading courses...</div>;
//     }

//     if (error) {
//         return <div className={styles.error}>{error}</div>;
//     }

//     return (
//         <div className={styles.container}>
//             <h1 className={styles.header}>Create New Assignment</h1>
//             <form onSubmit={handleSubmit} className={styles.form} encType="multipart/form-data">
//                 <div className={styles.formGroup}>
//                     <label>Assignment Title</label>
//                     <input
//                         type="text"
//                         name="title"
//                         value={assignment.title}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className={styles.formGroup}>
//                     <label>Course</label>
//                     <select
//                         name="course"
//                         value={assignment.course}
//                         onChange={handleChange}
//                         required
//                     >
//                         <option value="">Select a course</option>
//                         {courselist.map((course) => (
//                             <option key={course._id} value={course._id}>
//                                 {course.code} - {course.courseName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 <div className={styles.formGroup}>
//                     <label>Due Date</label>
//                     <input
//                         type="datetime-local"
//                         name="dueDate"
//                         value={assignment.dueDate}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>

//                 <div className={styles.formGroup}>
//                     <label>Description & Instructions</label>
//                     <textarea
//                         name="description"
//                         value={assignment.description}
//                         onChange={handleChange}
//                         rows={6}
//                         required
//                     />
//                 </div>

//                 <div className={styles.formGroup}>
//                     <label>Submission Guidelines</label>
//                     <textarea
//                         name="guidelines"
//                         value={assignment.guidelines}
//                         onChange={handleChange}
//                         rows={4}
//                     />
//                 </div>

//                 <div className={styles.formGroup}>
//                     <label>Attachments</label>
//                     <input
//                         type="file"
//                         multiple
//                         onChange={handleFileUpload}
//                         className={styles.fileInput}
//                     />
//                     <div className={styles.fileList}>
//                         {assignment.attachments.map((file, index) => (
//                             <div key={index} className={styles.fileItem}>
//                                 {file.name}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 <div className={styles.rubricSection}>
//                     <h3>Grading Rubric</h3>
//                     <button
//                         type="button"
//                         onClick={addRubricItem}
//                         className={styles.addButton}
//                     >
//                         Add Rubric Item
//                     </button>
//                     {assignment.rubric.map((item, index) => (
//                         <div key={index} className={styles.rubricItem}>
//                             <input
//                                 type="text"
//                                 placeholder="Criteria"
//                                 value={item.criteria}
//                                 onChange={(e) => handleRubricChange(index, 'criteria', e.target.value)}
//                                 className={styles.rubricInput}
//                             />
//                             <input
//                                 type="number"
//                                 placeholder="Points"
//                                 value={item.points}
//                                 onChange={(e) => handleRubricChange(index, 'points', e.target.value)}
//                                 className={styles.rubricPoints}
//                                 min="0"
//                             />
//                         </div>
//                     ))}
//                 </div>

//                 <button type="submit" className={styles.submitButton}>
//                     Create Assignment
//                 </button>
//             </form>
//         </div>
//     );
// };

// export default AssignmentForm;