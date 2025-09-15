import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiUpload, FiFile, FiCheckCircle, FiAlertCircle, FiClock, FiCalendar } from 'react-icons/fi';
import apiClient from '../../services/axios';

const AssignmentSubmission = () => {
    const {id } = useParams();
    const navigate = useNavigate();
    const [assined , setAssined] = useState();
    const [assignment, setAssignment] = useState(null);
    const [submission, setSubmission] = useState({
        files: [],
        comments: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(true);
    const role = localStorage.getItem('role');

    useEffect(() => {
        const fetchAssignment = async () => {
            try {
                setLoading(true);
                // Fetch the assignment details
                const response = await apiClient.get(`/api/assignment/${id}`);
                setAssignment(response.data);
                console.log(response.data);
                // Fetch the submission details for the current student
                const res2 = await apiClient.get(`/api/submission/assignment/${id}`);
                setAssined(res2.data.find(sub => sub.student === localStorage.getItem('profileid')));
                console.log(res2);
                
                setLoading(false);
            } catch (err) {
                setError('Failed to load assignment details');
                setLoading(false);
            }
        };
        fetchAssignment();
    }, [id]);

    const handleFileChange = (e) => {
        setSubmission({
            ...submission,
            files: Array.from(e.target.files)
        });
    };

    const handleCommentChange = (e) => {
        setSubmission({
            ...submission,
            comments: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        setSuccess('');

        try {
            const formData = new FormData();
            formData.append('assignment', id);
            formData.append('student', localStorage.getItem('profileid'));
            formData.append('comments', submission.comments);
            
            submission.files.forEach(file => {
                formData.append('files', file);
            });
            console.log(formData);
            for (let [key, value] of formData.entries()) {
            console.log(key, value);
            }
            

            const response = await apiClient.post('/api/submission/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            setSuccess('Submission successful!');
            setTimeout(() => {
                navigate(`/${role}/assignment-page`);
            }, 1500);
        } catch (err) {
            console.log(err);
            setError(err.response?.data?.message || 'Submission failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
                <p>Loading assignment details...</p>
            </div>
        );
    }

    if (!assignment) {
        return (
            <div className="error-container">
                <FiAlertCircle className="error-icon" />
                <h3>Assignment not found</h3>
                <p>The requested assignment could not be loaded.</p>
                <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
            </div>
        );
    }

    return (
        <div className="submission-container">
            <div className="assignment-header">
                <h1>{assignment.title}</h1>
                <div className="meta-info">
                    <span className="due-date">
                        <FiCalendar /> Due: {formatDate(assignment.dueDate)}
                    </span>
                    <span className="time-remaining">
                        <FiClock /> {getTimeRemaining(assignment.dueDate)}
                    </span>
                </div>
            </div>

            <div className="assignment-details">
                <div className="description-section">
                    <h3>Description</h3>
                    <p>{assignment.description}</p>
                </div>

                {assignment.guidelines && (
                    <div className="guidelines-section">
                        <h3>Submission Guidelines</h3>
                        <p>{assignment.guidelines}</p>
                    </div>
                )}

                {assignment.attachments?.length > 0 && (
                    <div className="attachments-section">
                        <h3>Assignment Files</h3>
                        <div className="files-list">
                            {assignment.attachments.map((file, index) => (
                                <a 
                                    key={index} 
                                    href={file.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="file-item"
                                >
                                    <FiFile /> {file.name}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="submission-form">
                <h2>Submit Your Work</h2>
                
                <div className="form-group">
                    <label htmlFor="files">Upload Files</label>
                    <div className="file-upload">
                        
                        {/* { assined.files.length !== 0 &&  */}
                        <label className="upload-btn">
                            <FiUpload /> Choose Files
                            <input 
                                type="file" 
                                id="files"
                                multiple
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                        </label>
                       {/* } */}
                        {submission.files.length > 0 ? (
                            <div className="selected-files">
                                {submission.files.map((file, index) => (
                                    <div key={index} className="file-info">
                                        <FiFile /> {file.name}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="no-files">No files selected</p>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="comments">Additional Comments</label>
                    <textarea
                        id="comments"
                        value={submission.comments}
                        onChange={handleCommentChange}
                        placeholder="Any additional notes for your instructor..."
                        rows={4}
                        // disabled={submission.comments.length !== 0}
                    />
                </div>

                {error && (
                    <div className="error-message">
                        <FiAlertCircle /> {error}
                    </div>
                )}

                {success && (
                    <div className="success-message">
                        <FiCheckCircle /> {success}
                    </div>
                )}

                {/* { submission.files.length === 0 &&  */}
                <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting || submission.files.length === 0}
                >
                    {isSubmitting ? 'Submitting...' : 'Submit Assignment'}
                </button>
                {/* } */}
            </form>

            <style>{`
                .submission-container {
                    max-width: 800px;
                    margin: 0 auto;
                    padding: 2rem;
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                }

                .assignment-header {
                    margin-bottom: 2rem;
                    padding-bottom: 1.5rem;
                    border-bottom: 1px solid #eee;
                }

                .assignment-header h1 {
                    color: #2c3e50;
                    margin-bottom: 0.5rem;
                }

                .meta-info {
                    display: flex;
                    gap: 1.5rem;
                    color: #555;
                    font-size: 0.95rem;
                }

                .meta-info span {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .assignment-details {
                    margin-bottom: 2.5rem;
                }

                .description-section,
                .guidelines-section,
                .attachments-section {
                    margin-bottom: 1.5rem;
                }

                .description-section h3,
                .guidelines-section h3,
                .attachments-section h3 {
                    color: #2c3e50;
                    margin-bottom: 0.75rem;
                }

                .description-section p,
                .guidelines-section p {
                    color: #555;
                    line-height: 1.6;
                }

                .files-list {
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .file-item {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #3498db;
                    text-decoration: none;
                    padding: 0.5rem;
                    border-radius: 4px;
                    transition: background-color 0.2s;
                }

                .file-item:hover {
                    background-color: #f5f5f5;
                    text-decoration: underline;
                }

                .submission-form {
                    background: white;
                    padding: 2rem;
                    border-radius: 8px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
                }

                .submission-form h2 {
                    color: #2c3e50;
                    margin-bottom: 1.5rem;
                    font-size: 1.5rem;
                }

                .form-group {
                    margin-bottom: 1.5rem;
                }

                .form-group label {
                    display: block;
                    margin-bottom: 0.5rem;
                    font-weight: 500;
                    color: #333;
                }

                .file-upload {
                    border: 2px dashed #ddd;
                    border-radius: 8px;
                    padding: 1.5rem;
                    text-align: center;
                }

                .upload-btn {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.75rem 1.5rem;
                    background-color: #3498db;
                    color: white;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .upload-btn:hover {
                    background-color: #2980b9;
                }

                .selected-files {
                    margin-top: 1rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                }

                .file-info {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem;
                    background-color: #f9f9f9;
                    border-radius: 4px;
                }

                .no-files {
                    color: #777;
                    margin-top: 1rem;
                }

                textarea {
                    width: 100%;
                    padding: 0.75rem;
                    border: 1px solid #ddd;
                    border-radius: 4px;
                    font-family: inherit;
                    resize: vertical;
                }

                .error-message {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #e74c3c;
                    margin-bottom: 1rem;
                    padding: 0.75rem;
                    background-color: #fdecea;
                    border-radius: 4px;
                }

                .success-message {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: #27ae60;
                    margin-bottom: 1rem;
                    padding: 0.75rem;
                    background-color: #e8f8f0;
                    border-radius: 4px;
                }

                .submit-btn {
                    width: 100%;
                    padding: 1rem;
                    background-color: #27ae60;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    font-size: 1rem;
                    cursor: pointer;
                    transition: background-color 0.2s;
                }

                .submit-btn:hover:not(:disabled) {
                    background-color: #219653;
                }

                .submit-btn:disabled {
                    background-color: #95a5a6;
                    cursor: not-allowed;
                }

                .loading-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 300px;
                }

                .spinner {
                    border: 4px solid rgba(0, 0, 0, 0.1);
                    border-radius: 50%;
                    border-top: 4px solid #3498db;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin-bottom: 1rem;
                }

                .error-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 300px;
                    text-align: center;
                }

                .error-icon {
                    font-size: 3rem;
                    color: #e74c3c;
                    margin-bottom: 1rem;
                }

                .back-btn {
                    padding: 0.75rem 1.5rem;
                    background-color: #3498db;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    margin-top: 1rem;
                    cursor: pointer;
                }

                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }

                @media (max-width: 768px) {
                    .submission-container {
                        padding: 1rem;
                    }

                    .meta-info {
                        flex-direction: column;
                        gap: 0.5rem;
                    }
                }
            `}</style>
        </div>
    );
};

function getTimeRemaining(dueDate) {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;
    
    if (diff <= 0) return 'Due date passed';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    return `${days}d ${hours}h remaining`;
}

export default AssignmentSubmission;