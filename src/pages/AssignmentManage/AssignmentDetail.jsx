import React from 'react';
import styles from './AssignmentDetail.module.css';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { MdAttachEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { FaFileDownload, FaCalendarAlt, FaUserGraduate, FaBook, FaUniversity, FaChalkboardTeacher } from 'react-icons/fa';
import apiClient from '../../services/axios';
const AssignmentDetail = () => {
    const { id } = useParams();
    const [assignment, setAssignment] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const role = localStorage.getItem('role');

    React.useEffect(() => {
        const fetchAssignment = async () => {
            try {
                const response = await apiClient.get(`/api/assignment/${id}`);
                setAssignment(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to load assignment details');
                setLoading(false);
                console.error('Error fetching assignment:', err);
            }
        };
        fetchAssignment();
    }, [id]);

    if (loading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.spinner}></div>
                <p>Loading assignment details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className={styles.errorContainer}>
                <div className={styles.errorIcon}>!</div>
                <h3>{error}</h3>
                <p>Please try again later.</p>
            </div>
        );
    }

    if (!assignment) {
        return (
            <div className={styles.notFound}>
                <h3>Assignment not found</h3>
                <p>The requested assignment could not be found.</p>
            </div>
        );
    }

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>{assignment.title}</h1>
                <div className={styles.meta}>
                    <span className={styles.course}> Course ID : {assignment.course || 'N/A'}</span>
                    <span className={styles.dueDate}>
                        <FaCalendarAlt className={styles.icon} />
                        Due: {formatDate(assignment.dueDate)}
                    </span>
                </div>
            </div>

            <div className={styles.detailsGrid}>
                <div className={styles.detailCard}>
                    <FaUniversity className={styles.detailIcon} />
                    <div>
                        <h4>Department</h4>
                        <p>{assignment.department?.name || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.detailCard}>
                    <FaBook className={styles.detailIcon} />
                    <div>
                        <h4>Subject</h4>
                        <p>{assignment.subject?.name || 'N/A'} ({assignment.subject?.code || 'N/A'})</p>
                    </div>
                </div>

                <div className={styles.detailCard}>
                    <FaUserGraduate className={styles.detailIcon} />
                    <div>
                        <h4>Semester</h4>
                        <p>Semester {assignment.semester}</p>
                    </div>
                </div>

                <div className={styles.detailCard}>
                    <FaChalkboardTeacher className={styles.detailIcon} />
                    <div>
                        <h4>Instructor</h4>
                        <p>{assignment.instructor?.personal_details?.first_name + ' ' + assignment.instructor?.personal_details?.last_name || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.detailCard}>
                    <MdAttachEmail className={styles.detailIcon} />
                    <div>
                        <h4>Email</h4>
                        <p>{assignment.instructor?.personal_details?.email || 'N/A'}</p>
                    </div>
                </div>

                <div className={styles.detailCard}>
                    <FaPhone className={styles.detailIcon} />
                    <div>
                        <h4>Mobile</h4>
                        <p>{assignment.instructor?.personal_details?.mobile || 'N/A'}</p>
                    </div>
                </div>
            </div>

            <div className={styles.contentSection}>
                <h2 className={styles.sectionTitle}>Description</h2>
                <div className={styles.description}>
                    {assignment.description}
                </div>
            </div>

            {assignment.guidelines && (
                <div className={styles.contentSection}>
                    <h2 className={styles.sectionTitle}>Submission Guidelines</h2>
                    <div className={styles.guidelines}>
                        {assignment.guidelines}
                    </div>
                </div>
            )}

            {assignment.attachments?.length > 0 && (
                <div className={styles.contentSection}>
                    <h2 className={styles.sectionTitle}>Attachments</h2>
                    <div className={styles.attachments}>
                        {assignment.attachments.map((file, index) => (
                            <a 
                                key={index} 
                                href={file.url} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className={styles.attachmentItem}
                            >
                                <div className={styles.fileIcon}>
                                    <FaFileDownload />
                                </div>
                                <div className={styles.fileInfo}>
                                    <span className={styles.fileName}>{file.name}</span>
                                    <span className={styles.fileSize}>Click to download</span>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {assignment.rubric?.length > 0 && (
                <div className={styles.contentSection}>
                    <h2 className={styles.sectionTitle}>Grading Rubric</h2>
                    <div className={styles.rubric}>
                        <table className={styles.rubricTable}>
                            <thead>
                                <tr>
                                    <th>Criteria</th>
                                    <th>Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {assignment.rubric.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item.criteria}</td>
                                        <td>{item.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <div 
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color:'white'}} 
            // className='submit-btn'
            >
                <Link to={`/${role}/assignment-submission/${id}`} className="submit-btn" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                Submit the Assignment
                </Link>
            </div>

            { role && role === 'faculty' &&
            <div 
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color:'white'}} 
            // className='submit-btn'
            >
                <Link to={`/faculty/assignment-submissions/${id}`} className="submit-btn" style={{display:'flex', alignItems:'center', justifyContent:'center',backgroundColor:'green'}}>
                Assignment SubmissionList
                </Link>
            </div>
            }




            <div className={styles.footer}>
                <p className={styles.createdAt}>
                    Created: {formatDate(assignment.createdAt)}
                </p>
            </div>
        </div>
    );
};

export default AssignmentDetail;