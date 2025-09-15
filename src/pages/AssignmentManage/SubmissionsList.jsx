// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FiFile, FiDownload, FiCheck, FiX, FiEdit, FiStar, 
//   FiMessageSquare, FiClock, FiUser, FiCalendar 
// } from 'react-icons/fi';

// const SubmissionsList = () => {
//   const { id } = useParams();
//   const [submissions, setSubmissions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [editingFeedback, setEditingFeedback] = useState(null);
//   const [feedbackText, setFeedbackText] = useState('');
//   const [grade, setGrade] = useState('');
//   const [expandedSubmission, setExpandedSubmission] = useState(null);

//   useEffect(() => {
//     const fetchSubmissions = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/submission/assignment/${id}`);
//         setSubmissions(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Failed to load submissions');
//         setLoading(false);
//       }
//     };
//     fetchSubmissions();
//   }, [id]);

//   const handleGradeSubmit = async (submissionId) => {
//     try {
//       await axios.patch(`http://localhost:5000/api/submission/${submissionId}`, {
//         grade,
//         feedback: feedbackText
//       });
      
//       setSubmissions(submissions.map(sub => 
//         sub._id === submissionId ? { 
//           ...sub, 
//           grade, 
//           feedback: feedbackText 
//         } : sub
//       ));
      
//       setEditingFeedback(null);
//       setFeedbackText('');
//       setGrade('');
//     } catch (err) {
//       setError('Failed to update grade and feedback');
//     }
//   };

//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     });
//   };

//   const toggleExpand = (submissionId) => {
//     setExpandedSubmission(expandedSubmission === submissionId ? null : submissionId);
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
//         <p>{error}</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">Student Submissions</h1>
      
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         {submissions.length === 0 ? (
//           <div className="p-8 text-center text-gray-500">
//             No submissions found for this assignment
//           </div>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {submissions.map((submission) => (
//               <li key={submission._id} className="p-6 hover:bg-gray-50 transition-colors">
//                 <div 
//                   className="flex justify-between items-center cursor-pointer"
//                   onClick={() => toggleExpand(submission._id)}
//                 >
//                   <div className="flex items-center space-x-4">
//                     <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
//                       <FiUser className="h-5 w-5 text-blue-600" />
//                     </div>
//                     <div>
//                       <h3 className="text-lg font-medium text-gray-900">
//                         Submission by Student ID: {submission.student}
//                       </h3>
//                       <p className="text-sm text-gray-500 flex items-center">
//                         <FiClock className="mr-1" />
//                         Submitted on {formatDate(submission.submittedAt)}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center">
//                     {submission.grade ? (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 mr-4">
//                         <FiStar className="mr-1" /> Grade: {submission.grade}
//                       </span>
//                     ) : (
//                       <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 mr-4">
//                         Ungraded
//                       </span>
//                     )}
//                     <svg
//                       className={`h-5 w-5 text-gray-500 transform transition-transform ${
//                         expandedSubmission === submission._id ? 'rotate-180' : ''
//                       }`}
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </div>
//                 </div>

//                 {expandedSubmission === submission._id && (
//                   <div className="mt-4 pl-14 space-y-4">
//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500">Comments</h4>
//                       <p className="mt-1 text-sm text-gray-900 bg-gray-100 p-3 rounded">
//                         {submission.comments || 'No comments provided'}
//                       </p>
//                     </div>

//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500">Submitted Files</h4>
//                       <ul className="mt-2 space-y-2">
//                         {submission.files.map((file) => (
//                           <li key={file._id} className="flex items-center justify-between bg-gray-50 p-3 rounded">
//                             <div className="flex items-center">
//                               <FiFile className="h-5 w-5 text-gray-400 mr-2" />
//                               <span className="text-sm font-medium text-gray-900 truncate max-w-xs">
//                                 {file.name}
//                               </span>
//                             </div>
//                             <a
//                               href={file.url}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               className="ml-4 inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                             >
//                               <FiDownload className="mr-1" /> Download
//                             </a>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>

//                     <div>
//                       <h4 className="text-sm font-medium text-gray-500">Feedback</h4>
//                       {editingFeedback === submission._id ? (
//                         <div className="mt-2 space-y-4">
//                           <div>
//                             <label htmlFor="grade" className="block text-sm font-medium text-gray-700">
//                               Grade
//                             </label>
//                             <input
//                               type="text"
//                               id="grade"
//                               value={grade}
//                               onChange={(e) => setGrade(e.target.value)}
//                               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                               placeholder="Enter grade (e.g., A, 95/100)"
//                             />
//                           </div>
//                           <div>
//                             <label htmlFor="feedback" className="block text-sm font-medium text-gray-700">
//                               Feedback
//                             </label>
//                             <textarea
//                               id="feedback"
//                               rows={3}
//                               value={feedbackText}
//                               onChange={(e) => setFeedbackText(e.target.value)}
//                               className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                               placeholder="Provide detailed feedback..."
//                             />
//                           </div>
//                           <div className="flex space-x-3">
//                             <button
//                               type="button"
//                               onClick={() => handleGradeSubmit(submission._id)}
//                               className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                             >
//                               <FiCheck className="mr-1" /> Save
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => {
//                                 setEditingFeedback(null);
//                                 setFeedbackText('');
//                                 setGrade('');
//                               }}
//                               className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                             >
//                               <FiX className="mr-1" /> Cancel
//                             </button>
//                           </div>
//                         </div>
//                       ) : (
//                         <div className="mt-2">
//                           {submission.feedback ? (
//                             <div className="bg-gray-50 p-4 rounded-md">
//                               <div className="flex justify-between items-start">
//                                 <div>
//                                   {submission.grade && (
//                                     <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800 mb-2">
//                                       <FiStar className="mr-1" /> Grade: {submission.grade}
//                                     </span>
//                                   )}
//                                   <p className="text-sm text-gray-900">{submission.feedback}</p>
//                                 </div>
//                                 <button
//                                   type="button"
//                                   onClick={() => {
//                                     setEditingFeedback(submission._id);
//                                     setFeedbackText(submission.feedback || '');
//                                     setGrade(submission.grade || '');
//                                   }}
//                                   className="text-blue-600 hover:text-blue-800 text-sm font-medium"
//                                 >
//                                   <FiEdit className="inline mr-1" /> Edit
//                                 </button>
//                               </div>
//                             </div>
//                           ) : (
//                             <button
//                               type="button"
//                               onClick={() => setEditingFeedback(submission._id)}
//                               className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
//                             >
//                               <FiMessageSquare className="mr-1" /> Add Feedback
//                             </button>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SubmissionsList;















// import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';
// import { 
//   FiFile, FiDownload, FiCheck, FiX, FiEdit, FiStar, 
//   FiMessageSquare, FiClock, FiUser, FiCalendar 
// } from 'react-icons/fi';


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FiFile, FiDownload, FiCheck, FiX, FiEdit, FiStar, FiMessageSquare, FiClock, FiUser } from 'react-icons/fi';
import './SubmissionsList.css';
import apiClient from '../../services/axios';

const SubmissionsList = () => {
  // ... (keep all your existing state and effect hooks)

    const { id } = useParams();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [feedbackText, setFeedbackText] = useState('');
  const [grade, setGrade] = useState('');
  const [expandedSubmission, setExpandedSubmission] = useState(null);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await apiClient.get(`/api/submission/assignment/${id}`);
        setSubmissions(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load submissions');
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, [id]);

  const handleGradeSubmit = async (submissionId) => {
    try {
      await apiClient.put(`/api/submission/${submissionId}/grade`, {
        grade,
        feedback: feedbackText
      });
      
      setSubmissions(submissions.map(sub => 
        sub._id === submissionId ? { 
          ...sub, 
          grade, 
          feedback: feedbackText 
        } : sub
      ));
      
      setEditingFeedback(null);
      setFeedbackText('');
      setGrade('');
    } catch (err) {
      setError('Failed to update grade and feedback');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleExpand = (submissionId) => {
    setExpandedSubmission(expandedSubmission === submissionId ? null : submissionId);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="submissions-container">
      <div className="submissions-header">
        <h1 className="submissions-title">Student Submissions</h1>
      </div>

      {loading ? (
        <div className="empty-state">
          <div className="loading-spinner"></div>
          <p>Loading submissions...</p>
        </div>
      ) : error ? (
        <div className="error-alert">
          <p>{error}</p>
        </div>
      ) : submissions.length === 0 ? (
        <div className="empty-state">
          <p>No submissions found for this assignment</p>
        </div>
      ) : (
        <div className="submission-list">
          {submissions.map((submission) => (
            <div key={submission._id} className="submission-item">
              <div className="submission-header" onClick={() => toggleExpand(submission._id)}>
                <div className="submission-user">
                  <div className="user-avatar">
                    <FiUser />
                  </div>
                  <div>
                    <h3 className="user-name">Submission by Student ID: {submission.student}</h3>
                    <div className="user-meta">
                      <FiClock />
                      <span>Submitted on {formatDate(submission.submittedAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="submission-status">
                  <span className={`grade-badge ${submission.grade ? 'graded' : 'ungraded'}`}>
                    <FiStar />
                    {submission.grade ? `Grade: ${submission.grade}` : 'Ungraded'}
                  </span>
                </div>
              </div>

              {expandedSubmission === submission._id && (
                <div className="submission-details">
                  <div className="detail-section">
                    <span className="detail-label">Comments</span>
                    <div className="comment-box">
                      {submission.comments || 'No comments provided'}
                    </div>
                  </div>

                  <div className="detail-section">
                    <span className="detail-label">Submitted Files</span>
                    <div className="files-list">
                      {submission.files.map((file) => (
                        <div key={file._id} className="file-item">
                          <div className="file-info">
                            <FiFile className="file-icon" />
                            <span className="file-name">{file.name}</span>
                          </div>
                          <a
                            href={file.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="download-btn"
                          >
                            <FiDownload /> Download
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="detail-section">
                    <span className="detail-label">Feedback</span>
                    {editingFeedback === submission._id ? (
                      <div className="feedback-form">
                        <div className="form-group">
                          <label>Grade</label>
                          <input
                            type="text"
                            value={grade}
                            onChange={(e) => setGrade(e.target.value)}
                            className="form-input"
                            placeholder="Enter grade (e.g., A, 95/100)"
                          />
                        </div>
                        <div className="form-group">
                          <label>Feedback</label>
                          <textarea
                            value={feedbackText}
                            onChange={(e) => setFeedbackText(e.target.value)}
                            className="form-input form-textarea"
                            placeholder="Provide detailed feedback..."
                            rows={4}
                          />
                        </div>
                        <div className="form-actions">
                          <button
                            onClick={() => handleGradeSubmit(submission._id)}
                            className="btn btn-primary"
                          >
                            <FiCheck /> Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingFeedback(null);
                              setFeedbackText('');
                              setGrade('');
                            }}
                            className="btn btn-outline"
                          >
                            <FiX /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : submission.feedback ? (
                      <div className="feedback-container">
                        <div className="feedback-header">
                          {submission.grade && (
                            <span className="grade-badge graded">
                              <FiStar /> Grade: {submission.grade}
                            </span>
                          )}
                          <span
                            className="edit-feedback-btn"
                            onClick={() => {
                              setEditingFeedback(submission._id);
                              setFeedbackText(submission.feedback || '');
                              setGrade(submission.grade || '');
                            }}
                          >
                            <FiEdit /> Edit
                          </span>
                        </div>
                        <div className="feedback-content">
                          {submission.feedback}
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setEditingFeedback(submission._id)}
                        className="btn btn-primary"
                      >
                        <FiMessageSquare /> Add Feedback
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmissionsList;