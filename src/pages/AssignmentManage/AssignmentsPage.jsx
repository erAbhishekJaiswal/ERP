// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { FiCalendar, FiFileText, FiDownload, FiClock, FiBook } from 'react-icons/fi';

// const AssignmentsPage = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [filter, setFilter] = useState('all'); // 'all', 'upcoming', 'past'

//   useEffect(() => {
//     const fetchAssignments = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/assignment/allassignments');
//         setAssignments(response.data);
//         setLoading(false);
//       } catch (err) {
//         console.error('Error fetching assignments:', err);
//         setError('Failed to load assignments');
//         setLoading(false);
//       }
//     };

//     fetchAssignments();
//   }, []);

//   const filteredAssignments = assignments.filter(assignment => {
//     const now = new Date();
//     const dueDate = new Date(assignment.dueDate);

//     if (filter === 'upcoming') return dueDate > now;
//     if (filter === 'past') return dueDate <= now;
//     return true;
//   });

//   const formatDate = (dateString) => {
//     const options = {
//       weekday: 'short',
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//       hour: '2-digit',
//       minute: '2-digit'
//     };
//     return new Date(dateString).toLocaleDateString('en-US', options);
//   };

//   const getTimeRemaining = (dueDate) => {
//     const now = new Date();
//     const due = new Date(dueDate);
//     const diff = due - now;

//     if (diff <= 0) return 'Due date passed';

//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

//     return `${days}d ${hours}h remaining`;
//   };

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p>Loading assignments...</p>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="error-container">
//         <p className="error-message">{error}</p>
//         <button onClick={() => window.location.reload()}>Retry</button>
//       </div>
//     );
//   }

//   return (
//     <div className="assignments-container">
//       <div className="header">
//         <h1><FiBook /> Assignments</h1>
//         <div className="filter-controls">
//           <button
//             className={filter === 'all' ? 'active' : ''}
//             onClick={() => setFilter('all')}
//           >
//             All Assignments
//           </button>
//           <button
//             className={filter === 'upcoming' ? 'active' : ''}
//             onClick={() => setFilter('upcoming')}
//           >
//             Upcoming
//           </button>
//           <button
//             className={filter === 'past' ? 'active' : ''}
//             onClick={() => setFilter('past')}
//           >
//             Past Due
//           </button>
//         </div>
//       </div>

//       {filteredAssignments.length === 0 ? (
//         <div className="no-assignments">
//           <p>No assignments found for the selected filter.</p>
//         </div>
//       ) : (
//         <div className="assignments-grid">
//           {filteredAssignments.map((assignment) => (
//             <div
//               key={assignment._id}
//               className={`assignment-card ${new Date(assignment.dueDate) < new Date() ? 'past-due' : ''}`}
//             >
//               <div className="card-header">
//                 <h3>{assignment.title.replace(/"/g, '')}</h3>
//                 <span className={`due-date ${new Date(assignment.dueDate) < new Date() ? 'overdue' : ''}`}>
//                   <FiCalendar /> {formatDate(assignment.dueDate)}
//                 </span>
//               </div>

//               <div className="card-body">
//                 <p className="description">{assignment.description.replace(/"/g, '')}</p>

//                 <div className="time-remaining">
//                   <FiClock /> {getTimeRemaining(assignment.dueDate)}
//                 </div>

//                 {assignment.guidelines && (
//                   <div className="guidelines">
//                     <h4>Guidelines:</h4>
//                     <p>{assignment.guidelines.replace(/"/g, '')}</p>
//                   </div>
//                 )}

//                 {assignment.rubric && assignment.rubric.length > 0 && (
//                   <div className="rubric">
//                     <h4>Rubric:</h4>
//                     <ul>
//                       {assignment.rubric.map((item) => (
//                         <li key={item._id}>
//                           {item.criteria}: {item.points} points
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <div className="card-footer">
//                 {assignment.attachments && assignment.attachments.length > 0 ? (
//                   <div className="attachments">
//                     <h4>Attachments:</h4>
//                     {assignment.attachments.map((file) => (
//                       <a
//                         key={file._id}
//                         href={file.url}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="attachment-link"
//                       >
//                         <FiDownload /> {file.name}
//                       </a>
//                     ))}
//                   </div>
//                 ) : (
//                   <p>No attachments</p>
//                 )}

//                 <Link to={`/assignments/submit/${assignment._id}`} className="submit-btn">
//                   Submit Assignment
//                 </Link>
//               </div>

//               <div className='card-footer'>
//               <Link to={`${role}/assignment-detail/${assignment._id}`} className="submit-btn">
//                  View Assignment
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <style jsx>{`
//         .assignments-container {
//           max-width: 1200px;
//           margin: 0 auto;
//           padding: 20px;
//           font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
//         }

//         .header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 30px;
//           flex-wrap: wrap;
//         }

//         .header h1 {
//           color: #2c3e50;
//           display: flex;
//           align-items: center;
//           gap: 10px;
//           font-size: 2rem;
//           margin: 0;
//         }

//         .filter-controls {
//           display: flex;
//           gap: 10px;
//           margin-top: 10px;
//         }

//         .filter-controls button {
//           padding: 8px 16px;
//           border: none;
//           border-radius: 20px;
//           background-color: #f1f1f1;
//           color: #555;
//           cursor: pointer;
//           transition: all 0.3s;
//           font-size: 0.9rem;
//         }

//         .filter-controls button.active {
//           background-color: #3498db;
//           color: white;
//         }

//         .filter-controls button:hover {
//           background-color: #e0e0e0;
//         }

//         .filter-controls button.active:hover {
//           background-color: #2980b9;
//         }

//         .assignments-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
//           gap: 25px;
//         }

//         .assignment-card {
//           background: white;
//           border-radius: 10px;
//           box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
//           overflow: hidden;
//           display: flex;
//           flex-direction: column;
//           transition: transform 0.3s, box-shadow 0.3s;
//           border-left: 4px solid #3498db;
//         }

//         .assignment-card:hover {
//           transform: translateY(-5px);
//           box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
//         }

//         .assignment-card.past-due {
//           border-left-color: #e74c3c;
//           opacity: 0.9;
//         }

//         .card-header {
//           padding: 20px;
//           background-color: #f8f9fa;
//           border-bottom: 1px solid #eee;
//         }

//         .card-header h3 {
//           margin: 0;
//           color: #2c3e50;
//           font-size: 1.3rem;
//         }

//         .due-date {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           color: #7f8c8d;
//           font-size: 0.9rem;
//           margin-top: 8px;
//         }

//         .due-date.overdue {
//           color: #e74c3c;
//         }

//         .card-body {
//           padding: 20px;
//           flex-grow: 1;
//         }

//         .description {
//           color: #555;
//           margin-bottom: 15px;
//           line-height: 1.5;
//         }

//         .time-remaining {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           color: #3498db;
//           font-weight: 500;
//           margin-bottom: 15px;
//         }

//         .guidelines, .rubric {
//           margin-bottom: 15px;
//         }

//         .guidelines h4, .rubric h4 {
//           margin: 0 0 8px 0;
//           color: #2c3e50;
//           font-size: 1rem;
//         }

//         .guidelines p {
//           color: #555;
//           font-size: 0.9rem;
//           line-height: 1.5;
//         }

//         .rubric ul {
//           margin: 0;
//           padding-left: 20px;
//         }

//         .rubric li {
//           margin-bottom: 5px;
//           color: #555;
//           font-size: 0.9rem;
//         }

//         .card-footer {
//           padding: 15px 20px;
//           background-color: #f8f9fa;
//           border-top: 1px solid #eee;
//         }

//         .attachments h4 {
//           margin: 0 0 8px 0;
//           color: #2c3e50;
//           font-size: 1rem;
//         }

//         .attachment-link {
//           display: flex;
//           align-items: center;
//           gap: 5px;
//           color: #3498db;
//           text-decoration: none;
//           font-size: 0.9rem;
//           margin-bottom: 8px;
//           transition: color 0.3s;
//         }

//         .attachment-link:hover {
//           color: #2980b9;
//           text-decoration: underline;
//         }

//         .submit-btn {
//           display: inline-block;
//           margin-top: 15px;
//           padding: 8px 16px;
//           background-color: #27ae60;
//           color: white;
//           text-decoration: none;
//           border-radius: 4px;
//           font-size: 0.9rem;
//           transition: background-color 0.3s;
//         }

//         .submit-btn:hover {
//           background-color: #219653;
//         }

//         .no-assignments {
//           text-align: center;
//           padding: 40px;
//           color: #7f8c8d;
//           font-style: italic;
//         }

//         .loading-container {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           height: 200px;
//         }

//         .spinner {
//           border: 4px solid rgba(0, 0, 0, 0.1);
//           border-radius: 50%;
//           border-top: 4px solid #3498db;
//           width: 40px;
//           height: 40px;
//           animation: spin 1s linear infinite;
//           margin-bottom: 20px;
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         .error-container {
//           text-align: center;
//           padding: 20px;
//         }

//         .error-message {
//           color: #e74c3c;
//           margin-bottom: 15px;
//         }

//         @media (max-width: 768px) {
//           .header {
//             flex-direction: column;
//             align-items: flex-start;
//             gap: 15px;
//           }

//           .filter-controls {
//             width: 100%;
//             flex-wrap: wrap;
//           }

//           .assignments-grid {
//             grid-template-columns: 1fr;
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default AssignmentsPage;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FiCalendar,
  FiFileText,
  FiDownload,
  FiClock,
  FiBook,
  FiFilter,
  FiX,
} from "react-icons/fi";
import apiClient from "../../services/axios";

const AssignmentsPage = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all"); // 'all', 'upcoming', 'past'
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [filters, setFilters] = useState({
    department: "",
    course: "",
    semester: "",
  });
  const [showFilters, setShowFilters] = useState(false);
  const role = localStorage.getItem("role");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all data in parallel
        const [assignmentsRes, deptsRes, coursesRes] = await Promise.all([
          apiClient.get("/api/assignment/allassignments"),
          apiClient.get("/api/features/getDepartmentlist"),
          apiClient.get("/api/features/getcoursecodenamelist"),
        ]);

        setAssignments(assignmentsRes.data);
        setDepartments(deptsRes.data.departments);
        setCourses(coursesRes.data.courseNames);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetFilters = () => {
    setFilters({
      department: "",
      course: "",
      semester: "",
    });
  };

  const filteredAssignments = assignments.filter((assignment) => {
    const now = new Date();
    const dueDate = new Date(assignment.dueDate);

    // Time filter
    if (filter === "upcoming" && dueDate <= now) return false;
    if (filter === "past" && dueDate > now) return false;

    // Department filter
    if (
      filters.department &&
      assignment.department?._id !== filters.department
    ) {
      return false;
    }

    // Course filter
    if (filters.course && assignment.course?._id !== filters.course) {
      return false;
    }

    // Semester filter
    if (filters.semester && assignment.semester !== filters.semester) {
      return false;
    }

    return true;
  });

  const formatDate = (dateString) => {
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getTimeRemaining = (dueDate) => {
    const now = new Date();
    const due = new Date(dueDate);
    const diff = due - now;

    if (diff <= 0) return "Due date passed";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return `${days}d ${hours}h remaining`;
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading assignments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
        <button className="retry-btn" onClick={() => window.location.reload()}>
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="assignments-container">
      <div className="header">
        <h1>
          <FiBook /> Assignments
        </h1>
        <div className="controls">
          <div className="filter-controls">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "upcoming" ? "active" : ""}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={filter === "past" ? "active" : ""}
              onClick={() => setFilter("past")}
            >
              Past Due
            </button>
          </div>

          <button
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FiFilter /> {showFilters ? "Hide Filters" : "More Filters"}
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="advanced-filters">
          <div className="filter-group">
            <label>Department</label>
            <select
              name="department"
              value={filters.department}
              onChange={handleFilterChange}
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Course</label>
            <select
              name="course"
              value={filters.course}
              onChange={handleFilterChange}
            >
              <option value="">All Courses</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.code} - {course.name}
                </option>
              ))}
            </select>
          </div>

          <div className="filter-group">
            <label>Semester</label>
            <select
              name="semester"
              value={filters.semester}
              onChange={handleFilterChange}
            >
              <option value="">All Semesters</option>
              {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                <option key={sem} value={sem}>
                  Semester {sem}
                </option>
              ))}
            </select>
          </div>

          <button className="reset-filters" onClick={resetFilters}>
            <FiX /> Reset Filters
          </button>
        </div>
      )}

      {filteredAssignments.length === 0 ? (
        <div className="no-assignments">
          <p>No assignments found matching your criteria.</p>
          {Object.values(filters).some(Boolean) && (
            <button className="clear-filters-btn" onClick={resetFilters}>
              Clear all filters
            </button>
          )}
        </div>
      ) : (
        <div className="assignments-grid">
          {filteredAssignments.map((assignment) => (
            <div
              key={assignment._id}
              className={`assignment-card ${
                new Date(assignment.dueDate) < new Date() ? "past-due" : ""
              }`}
            >
              <div className="card-header">
                <h3>
                  {assignment.title?.replace(/"/g, "") || "Untitled Assignment"}
                </h3>
                <span
                  className={`due-date ${
                    new Date(assignment.dueDate) < new Date() ? "overdue" : ""
                  }`}
                >
                  <FiCalendar /> {formatDate(assignment.dueDate)}
                </span>
              </div>

              <div className="meta-info">
                {assignment.course?.name && (
                  <span className="course">
                    {assignment.course.code} - {assignment.course.name}
                  </span>
                )}
                {assignment.department?.name && (
                  <span className="department">
                    {assignment.department.name}
                  </span>
                )}
                {assignment.semester && (
                  <span className="semester">
                    Semester {assignment.semester}
                  </span>
                )}
              </div>

              <div className="card-body">
                {assignment.description && (
                  <p className="description">
                    {assignment.description.replace(/"/g, "")}
                  </p>
                )}

                <div className="time-remaining">
                  <FiClock /> {getTimeRemaining(assignment.dueDate)}
                </div>

                {assignment.guidelines && (
                  <div className="guidelines">
                    <h4>Guidelines:</h4>
                    <p>{assignment.guidelines.replace(/"/g, "")}</p>
                  </div>
                )}

                {assignment.rubric?.length > 0 && (
                  <div className="rubric">
                    <h4>Rubric:</h4>
                    <ul>
                      {assignment.rubric.map((item) => (
                        <li key={item._id || item.criteria}>
                          {item.criteria}: {item.points} points
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="card-footer">
                {assignment.attachments?.length > 0 ? (
                  <div className="attachments">
                    <h4>Attachments:</h4>
                    {assignment.attachments.map((file) => (
                      <a
                        key={file._id || file.url}
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="attachment-link"
                      >
                        <FiDownload /> {file.name || "Download"}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p>No attachments</p>
                )}

                <div className="action-buttons">
                  {/* <Link 
                    to={`/assignments/submit/${assignment._id}`} 
                    className="submit-btn"
                  >
                    Submit Assignment
                  </Link> */}
                  <Link
                    to={`/${role}/assignment-detail/${assignment._id}`}
                    className="view-btn"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    <style>{`
  .assignments-container {
    width: 95%;
    margin: 30px auto;
    padding: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px,
                rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,
                rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
  }

  .header h1 {
    color: #2c3e50;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 1.8rem;
    margin: 0;
  }

  .controls {
    display: flex;
    gap: 15px;
    align-items: center;
    flex-wrap: wrap;
  }

  .filter-controls {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  .filter-controls button,
  .filter-toggle,
  .reset-filters {
    padding: 8px 16px;
    border: none;
    border-radius: 20px;
    background-color: #f1f1f1;
    color: #555;
    cursor: pointer;
    font-size: 0.9rem;
    transition: all 0.3s;
  }

  .filter-controls button.active {
    background-color: #3498db;
    color: white;
  }

  .filter-toggle:hover,
  .reset-filters:hover {
    background-color: #e0e0e0;
  }

  .reset-filters:hover {
    background-color: #e74c3c;
    color: white;
  }

  .advanced-filters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 20px;
    margin-bottom: 25px;
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
  }

  .filter-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .filter-group label {
    font-size: 0.9rem;
    color: #555;
    font-weight: 500;
  }

  .filter-group select {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 0.9rem;
    background: white;
  }

  .assignments-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 25px;
  }

  .assignment-card {
    background: white;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    transition: transform 0.3s, box-shadow 0.3s;
    border-left: 4px solid #3498db;
  }

  .assignment-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }

  .assignment-card.past-due {
    border-left-color: #e74c3c;
    opacity: 0.9;
  }

  .card-header {
    padding: 20px;
    background-color: #f8f9fa;
    border-bottom: 1px solid #eee;
  }

  .card-header h3 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.3rem;
    word-break: break-word;
  }

  .due-date {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #7f8c8d;
    font-size: 0.9rem;
    margin-top: 8px;
  }

  .due-date.overdue {
    color: #e74c3c;
  }

  .meta-info {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 0 20px;
    margin-bottom: 15px;
  }

  .meta-info span {
    background: #eaf2f8;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
    color: #2980b9;
  }

  .card-body {
    padding: 0 20px 20px;
    flex-grow: 1;
  }

  .description {
    color: #555;
    margin-bottom: 15px;
    line-height: 1.5;
    word-break: break-word;
  }

  .time-remaining {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #3498db;
    font-weight: 500;
    margin-bottom: 15px;
  }

  .guidelines, .rubric {
    margin-bottom: 15px;
  }

  .guidelines h4, .rubric h4 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  .guidelines p {
    color: #555;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .rubric ul {
    padding-left: 20px;
    margin: 0;
  }

  .rubric li {
    color: #555;
    font-size: 0.9rem;
    margin-bottom: 5px;
  }

  .card-footer {
    padding: 15px 20px;
    background-color: #f8f9fa;
    border-top: 1px solid #eee;
  }

  .attachments h4 {
    margin: 0 0 8px 0;
    color: #2c3e50;
    font-size: 1rem;
  }

  .attachment-link {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #3498db;
    text-decoration: none;
    font-size: 0.9rem;
    margin-bottom: 8px;
    word-break: break-word;
  }

  .attachment-link:hover {
    color: #2980b9;
    text-decoration: underline;
  }

  .action-buttons {
    display: flex;
    gap: 10px;
    margin-top: 15px;
    flex-wrap: wrap;
  }

  .submit-btn, .view-btn {
    padding: 8px 16px;
    color: white;
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.9rem;
    transition: background-color 0.3s;
    text-align: center;
    flex: 1;
  }

  .submit-btn {
    background-color: #27ae60;
  }

  .submit-btn:hover {
    background-color: #219653;
  }

  .view-btn {
    background-color: #3498db;
  }

  .view-btn:hover {
    background-color: #2980b9;
  }

  .no-assignments {
    text-align: center;
    padding: 40px;
    color: #7f8c8d;
    font-style: italic;
  }

  .clear-filters-btn {
    margin-top: 15px;
    padding: 8px 16px;
    background-color: #f1f1f1;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .clear-filters-btn:hover {
    background-color: #e74c3c;
    color: white;
  }

  .loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 200px;
  }

  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
    margin-bottom: 20px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .error-container {
    text-align: center;
    padding: 40px;
  }

  .error-message {
    color: #e74c3c;
    margin-bottom: 15px;
    font-size: 1.1rem;
  }

  .retry-btn {
    padding: 8px 20px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .retry-btn:hover {
    background-color: #2980b9;
  }

  /* Additional Mobile Responsiveness */
  @media (max-width: 768px) {
    .header, .controls, .action-buttons {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    .assignments-grid,
    .advanced-filters {
      grid-template-columns: 1fr;
    }
  }

  @media (max-width: 576px) {
    .header h1 {
      font-size: 1.5rem;
    }

    .submit-btn, .view-btn {
      font-size: 0.85rem;
      padding: 6px 12px;
    }

    .filter-controls button {
      font-size: 0.85rem;
      padding: 6px 12px;
    }

    .assignment-card {
      font-size: 0.9rem;
    }
  }
`}</style>

    </div>
  );
};

export default AssignmentsPage;
