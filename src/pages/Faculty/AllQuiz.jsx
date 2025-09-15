// import React,{ useState,useEffect} from 'react';
// import axios from "axios";
// import "../../CSSfolder/StudentCSS/quiz.css"
// import { Link } from 'react-router-dom';

// const QuizDashboard = () => {
//     const [quizData, setQuizData] = useState();

//     const fetchQuizData = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/quiz/quizslist`
//                 // , {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}
//         );
//             setQuizData(response.data);
//         } catch (error) {
//             console.error("Error fetching quiz data:", error);
//         }
//     }
//     useEffect(() => {
//         fetchQuizData();
//     },[])

//   return (
//     <div className="quiz-list-container">
//       <header className="dashboard-header">
//         <h1>Quiz Management Dashboard</h1>
//         <div className="header-actions">
//           <button className="primary-button">
//             <Link to="/faculty/set-quiz">Create New Quiz</Link>
//             </button>
//         </div>
//       </header>

//       <div className="quiz-grid">
//         {quizData?.map((quiz) => (
//           <div key={quiz._id} className="quiz-card">
//             <div className="quiz-card-header">
//               <h3>{quiz.subject || 'Untitled Quiz'}</h3>
//               {quiz.quizName && <span className="quiz-name">{quiz.quizName}</span>}
//               {quiz.department && <span className="department-badge">{quiz.department}</span>}
//             </div>

//             <div className="quiz-meta">
//               {quiz?.lastDate && (
//                 <div className="meta-item">
//                   <span className="meta-label">Due:</span>
//                   <span>{new Date(quiz.lastDate).toLocaleDateString()} {quiz.lastTime}</span>
//                 </div>
//               )}
//               <div className="meta-item">
//                 <span className="meta-label">Questions:</span>
//                 <span>{quiz.questions.length}</span>
//               </div>
//               <div className="meta-item">
//                 <span className="meta-label">Created:</span>
//                 <span>{new Date(quiz.createdAt).toLocaleDateString()}</span>
//               </div>
//             </div>

//             <div className="quiz-actions">
//               <button className="action-button view-button">View Details</button>
//               <button className="action-button edit-button">Edit</button>
//               <button className="action-button delete-button">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default QuizDashboard;

















// import React, { useState, useEffect } from 'react';
// import axios from "axios";
// import "../../CSSfolder/FacultyCSS/Allquiz.css"
// import { Link } from 'react-router-dom';

// const QuizDashboard = () => {
//     const [quizData, setQuizData] = useState([]);
//     const [filteredData, setFilteredData] = useState([]);
//     const [filters, setFilters] = useState({
//         department: '',
//         semester: '',
//         subject: '',
//         searchQuery: ''
//     });

//     const fetchQuizData = async () => {
//         try {
//             const response = await axios.get(`http://localhost:5000/api/quiz/quizslist`);
//             setQuizData(response.data);
//             setFilteredData(response.data);
//             console.log(response.data);
            
//         } catch (error) {
//             console.error("Error fetching quiz data:", error);
//         }
//     }

//     useEffect(() => {
//         fetchQuizData();
//     }, []);

//     useEffect(() => {
//         applyFilters();
//     }, [filters, quizData]);

//     const applyFilters = () => {
//         let result = [...quizData];

//         if (filters.department) {
//             result = result.filter(quiz => 
//                 quiz.department?.toLowerCase().includes(filters.department.toLowerCase())
//             );
//         }

//         if (filters.semester) {
//             result = result.filter(quiz => 
//                 quiz.semester?.toString().includes(filters.semester)
//             );
//         }

//         if (filters.subject) {
//             result = result.filter(quiz => 
//                 quiz.subject?.toLowerCase().includes(filters.subject.toLowerCase())
//             );
//         }

//         if (filters.searchQuery) {
//             const query = filters.searchQuery.toLowerCase();
//             result = result.filter(quiz => 
//                 quiz.quizName?.toLowerCase().includes(query) || 
//                 quiz.subject?.toLowerCase().includes(query) ||
//                 quiz.description?.toLowerCase().includes(query)
//             );
//         }

//         setFilteredData(result);
//     };

//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters(prev => ({
//             ...prev,
//             [name]: value
//         }));
//     };

//     const clearFilters = () => {
//         setFilters({
//             department: '',
//             semester: '',
//             subject: '',
//             searchQuery: ''
//         });
//     };

//     // Extract unique values for dropdowns
//     const uniqueDepartments = [...new Set(quizData.map(quiz => quiz.department))].filter(Boolean);
//     const uniqueSemesters = [...new Set(quizData.map(quiz => quiz.semester))].filter(Boolean).sort();
//     const uniqueSubjects = [...new Set(quizData.map(quiz => quiz.subject))].filter(Boolean);

//     const quizdeletehandler = async (id) => {
//         try {
//             await axios.delete(`http://localhost:5000/api/quiz/quizdelete/${id}`);
//             fetchQuizData();
//         } catch (error) {
//             console.error("Error deleting quiz:", error);
//         }
//     };

//     return (
//         <div className="quiz-dashboard-container">
//             <header className="dashboard-header">
//                 <h1>Quiz Management Dashboard</h1>
//                 <div className="header-actions">
//                     <button className="primary-button">
//                         <Link to="/faculty/set-quiz">Create New Quiz</Link>
//                     </button>
//                 </div>
//             </header>

//             <div className="filters-section">
//                 <div className="search-bar">
//                     <input
//                         type="text"
//                         name="searchQuery"
//                         placeholder="Search quizzes..."
//                         value={filters.searchQuery}
//                         onChange={handleFilterChange}
//                     />
//                     <i className="search-icon">🔍</i>
//                 </div>

//                 <div className="filter-controls">
//                     <select
//                         name="department"
//                         value={filters.department}
//                         onChange={handleFilterChange}
//                     >
//                         <option value="">All Departments</option>
//                         {uniqueDepartments.map((dept, index) => (
//                             <option key={index} value={dept}>{dept}</option>
//                         ))}
//                     </select>

//                     <select
//                         name="semester"
//                         value={filters.semester}
//                         onChange={handleFilterChange}
//                     >
//                         <option value="">All Semesters</option>
//                         {uniqueSemesters.map((sem, index) => (
//                             <option key={index} value={sem}>Semester {sem}</option>
//                         ))}
//                     </select>

//                     <select
//                         name="subject"
//                         value={filters.subject}
//                         onChange={handleFilterChange}
//                     >
//                         <option value="">All Subjects</option>
//                         {uniqueSubjects.map((subj, index) => (
//                             <option key={index} value={subj}>{subj}</option>
//                         ))}
//                     </select>

//                     <button className="clear-filters" onClick={clearFilters}>
//                         Clear Filters
//                     </button>
//                 </div>
//             </div>

//             <div className="quiz-stats">
//                 <div className="allquiz-stat-card">
//                     <h3>Total Quizzes</h3>
//                     <p>{filteredData.length}</p>
//                 </div>
//                 <div className="allquiz-stat-card">
//                     <h3>Active Quizzes</h3>
//                     <p>{filteredData.filter(quiz => new Date(quiz.lastDate) > new Date()).length}</p>
//                 </div>
//                 <div className="allquiz-stat-card">
//                     <h3>Departments</h3>
//                     <p>{uniqueDepartments.length}</p>
//                 </div>
//             </div>

//             <div className="quiz-grid">
//                 {filteredData?.length > 0 ? (
//                     filteredData?.map((quiz) => (
//                         <div key={quiz?._id} className="quiz-card">
//                             <div className="quiz-card-header">
//                                 <h3>{quiz?.quizName || 'Untitled Quiz'}</h3>
//                                 <div className="quiz-tags">
//                                     {quiz?.department && <span className="department-badge">{quiz?.department}</span>}
//                                     {quiz?.semester && <span className="semester-badge">Sem {quiz?.semester}</span>}
//                                 </div>
//                             </div>

//                             <div className="quiz-subject">
//                                 {quiz?.subject && <span>{quiz?.subject.name}</span>}
//                             </div>

//                             {quiz?.description && (
//                                 <div className="quiz-description">
//                                     <p>{quiz?.description?.length > 100 
//                                         ? `${quiz?.description.substring(0, 100)}...` 
//                                         : quiz?.description}</p>
//                                 </div>
//                             )}

//                             <div className="quiz-meta">
//                                 {quiz?.lastDate && (
//                                     <div className="meta-item">
//                                         <span className="meta-label">Due:</span>
//                                         <span className={new Date(quiz?.lastDate) < new Date() ? 'expired' : ''}>
//                                             {new Date(quiz?.lastDate).toLocaleDateString()} {quiz?.lastTime || ''}
//                                         </span>
//                                     </div>
//                                 )}
//                                 <div className="meta-item">
//                                     <span className="meta-label">Questions:</span>
//                                     <span>{quiz?.questions?.length || 0}</span>
//                                 </div>
//                                 <div className="meta-item">
//                                     <span className="meta-label">Duration:</span>
//                                     <span>{quiz?.duration || 'N/A'} mins</span>
//                                 </div>
//                             </div>

//                                 <Link to={`/quiz/edit/${quiz._id}`} className="action-button edit-button">
//                                     Edit
//                                 </Link>
//                             <div className="quiz-actions">
//                                 <Link to={`/faculty/quiz/${quiz?._id}`} className="action-button view-button">
//                                     View Details
//                                 </Link>
                               
//                                 <button className="action-button delete-button" onClick={() => quizdeletehandler(quiz?._id)}>
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                     ))
//                 ) : (
//                     <div className="no-results">
//                         <p>No quizzes found matching your criteria.</p>
//                         <button onClick={clearFilters}>Clear filters</button>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default QuizDashboard;














import React, { useState, useEffect } from 'react';
import axios from "axios";
import "../../CSSfolder/FacultyCSS/Allquiz.css"
import { Link } from 'react-router-dom';
import apiClient from '../../services/axios';

const QuizDashboard = () => {
    const [quizData, setQuizData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [filters, setFilters] = useState({
        department: '',
        semester: '',
        subject: '',
        searchQuery: ''
    });

    const fetchQuizData = async () => {
        try {
            const response = await apiClient.get(`/api/quiz/quizslist`);
            setQuizData(response.data);
            setFilteredData(response.data);
        } catch (error) {
            console.error("Error fetching quiz data:", error);
        }
    }

    useEffect(() => {
        fetchQuizData();
    }, []);

    useEffect(() => {
        applyFilters();
    }, [filters, quizData]);

    const applyFilters = () => {
        let result = [...quizData];

        if (filters.department) {
            result = result.filter(quiz => 
                quiz.department?.name?.toLowerCase().includes(filters.department.toLowerCase())
            );
        }

        if (filters.subject) {
            result = result.filter(quiz => 
                quiz.subject?.name?.toLowerCase().includes(filters.subject.toLowerCase())
            );
        }

        if (filters.searchQuery) {
            const query = filters.searchQuery.toLowerCase();
            result = result.filter(quiz => 
                quiz.quizName?.toLowerCase().includes(query) || 
                quiz.subject?.name?.toLowerCase().includes(query) ||
                (quiz.description && quiz.description.toLowerCase().includes(query))
            );
        }

        setFilteredData(result);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            department: '',
            semester: '',
            subject: '',
            searchQuery: ''
        });
    };

    // Extract unique values for dropdowns
    const uniqueDepartments = [...new Set(quizData.map(quiz => quiz.department?.name))].filter(Boolean);
    const uniqueSubjects = [...new Set(quizData.map(quiz => quiz.subject?.name))].filter(Boolean);

    const quizdeletehandler = async (id) => {
        try {
            await apiClient.delete(`/api/quiz/quizdelete/${id}`);
            fetchQuizData();
        } catch (error) {
            console.error("Error deleting quiz:", error);
        }
    };

    return (
        <div className="quiz-dashboard-container">
            <header className="dashboard-header">
                <h1>Quiz Management Dashboard</h1>
                <div className="header-actions">
                    <button className="primary-button">
                        <Link to="/faculty/set-quiz">Create New Quiz</Link>
                    </button>
                </div>
            </header>

            <div className="filters-section">
                <div className="search-bar">
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder="Search quizzes..."
                        value={filters.searchQuery}
                        onChange={handleFilterChange}
                    />
                    <i className="search-icon">🔍</i>
                </div>

                <div className="filter-controls">
                    <select
                        name="department"
                        value={filters.department}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Departments</option>
                        {uniqueDepartments.map((dept, index) => (
                            <option key={index} value={dept}>{dept}</option>
                        ))}
                    </select>

                    <select
                        name="subject"
                        value={filters.subject}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Subjects</option>
                        {uniqueSubjects.map((subj, index) => (
                            <option key={index} value={subj}>{subj}</option>
                        ))}
                    </select>

                    <button className="clear-filters" onClick={clearFilters}>
                        Clear Filters
                    </button>
                </div>
            </div>

            <div className="quiz-stats">
                <div className="allquiz-stat-card">
                    <h3>Total Quizzes</h3>
                    <p>{filteredData.length}</p>
                </div>
                <div className="allquiz-stat-card">
                    <h3>Active Quizzes</h3>
                    <p>{filteredData.filter(quiz => new Date(quiz.lastDate) > new Date()).length}</p>
                </div>
                <div className="allquiz-stat-card">
                    <h3>Departments</h3>
                    <p>{uniqueDepartments.length}</p>
                </div>
            </div>

            <div className="quiz-grid">
                {filteredData.length > 0 ? (
                    filteredData.map((quiz) => (
                        <div key={quiz._id} className="quiz-card">
                            <div className="quiz-card-header">
                                <h3>{quiz.quizName || 'Untitled Quiz'}</h3>
                                <div className="quiz-tags">
                                    {quiz.department?.name && (
                                        <span className="department-badge">{quiz.department.name}</span>
                                    )}
                                </div>
                            </div>

                            <div className="quiz-subject">
                                {quiz.subject?.name && (
                                    <>
                                        <span className="subject-name">{quiz.subject.name}</span>
                                        {quiz.subject.code && (
                                            <span className="subject-code">({quiz.subject.code})</span>
                                        )}
                                    </>
                                )}
                            </div>

                            {quiz.description && (
                                <div className="quiz-description">
                                    <p>{quiz.description.length > 100 
                                        ? `${quiz.description.substring(0, 100)}...` 
                                        : quiz.description}</p>
                                </div>
                            )}

                            <div className="quiz-meta">
                                {quiz.lastDate && (
                                    <div className="meta-item">
                                        <span className="meta-label">Due:</span>
                                        <span className={new Date(quiz.lastDate) < new Date() ? 'expired' : ''}>
                                            {new Date(quiz.lastDate).toLocaleDateString()} {quiz.lastTime || ''}
                                        </span>
                                    </div>
                                )}
                                <div className="meta-item">
                                    <span className="meta-label">Questions:</span>
                                    <span>{quiz.questions?.length || 0}</span>
                                </div>
                                <div className="meta-item">
                                    <span className="meta-label">Duration:</span>
                                    <span>{quiz.duration || 'N/A'} mins</span>
                                </div>
                            </div>

                            <div className="quiz-actions">
                                <Link to={`/faculty/quiz/${quiz._id}`} className="action-button view-button">
                                    View Details
                                </Link>
                                <Link to={`/quiz/edit/${quiz._id}`} className="action-button edit-button">
                                    Edit
                                </Link>
                                <button 
                                    className="action-button delete-button" 
                                    onClick={() => quizdeletehandler(quiz._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="no-results">
                        <p>No quizzes found matching your criteria.</p>
                        <button onClick={clearFilters}>Clear filters</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default QuizDashboard;