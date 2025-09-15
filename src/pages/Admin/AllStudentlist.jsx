// import React, { useEffect, useState } from 'react';
// import "../../CSSfolder/AdminCSS/allstudentlist.css";
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const StudentList = () => {
//   const [loading, setLoading] = useState(true);
//   const [students, setStudents] = useState([]);
//   const role = localStorage.getItem("role");
//   const navigate = useNavigate();

//   const fetchStudentList = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/student/list");
//       setStudents(res.data);
//       setLoading(false);
//     } catch (error) {
//       console.log(error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStudentList();
//   }, []);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
//   const [activeTab, setActiveTab] = useState('all');
//   const [showEngineeringOnly, setShowEngineeringOnly] = useState(false);

//   const handleViewStudent = (studentId) => {
//     if(role === 'Dean' || role === 'Director' || role === 'Accountant' || role === 'faculty') {
//       navigate(`/${role}/student-profile/${studentId}`);
//     }else if(role ==="Registrar") {
//       navigate(`/admin/student-profile/${studentId}`);
//     }
//   };

//   const handleEditStudent = (studentId) => {
//     navigate(`/admin/student/edit/${studentId}`);
//   };

//   const toggleEngineeringFilter = () => {
//     setShowEngineeringOnly(!showEngineeringOnly);
//   };

//   const filteredStudents = students.filter(student => {
//     // Apply search filter
//     const searchLower = searchTerm.toLowerCase();
//     const matchesSearch = (
//       student.personal_details.fname.toLowerCase().includes(searchLower) ||
//       student.personal_details.lname.toLowerCase().includes(searchLower) ||
//       student.academic_details.enrollment_number.toLowerCase().includes(searchLower) ||
//       (student.academic_details.department_name && 
//        student.academic_details.department_name.toLowerCase().includes(searchLower))
//     );

//     // Apply active tab filter
//     const matchesTab = 
//       activeTab === 'all' ||
//       (activeTab === 'active' && student.academic_details.status === 'Active') ||
//       (activeTab === 'engineering' && 
//        student.academic_details.department_name && 
//        student.academic_details.department_name.includes('Engineering'));

//     // Apply engineering filter
//     const matchesEngineering = 
//       !showEngineeringOnly || 
//       (student.academic_details.department_name && 
//        student.academic_details.department_name.includes('Engineering'));

//     return matchesSearch && matchesTab && matchesEngineering;
//   });

//   const sortedStudents = [...filteredStudents].sort((a, b) => {
//     if (sortConfig.key === null) return 0;
    
//     const aValue = sortConfig.key.includes('.') 
//       ? sortConfig.key.split('.').reduce((obj, key) => obj[key], a)
//       : a[sortConfig.key];
      
//     const bValue = sortConfig.key.includes('.') 
//       ? sortConfig.key.split('.').reduce((obj, key) => obj[key], b)
//       : b[sortConfig.key];

//     if (aValue < bValue) {
//       return sortConfig.direction === 'ascending' ? -1 : 1;
//     }
//     if (aValue > bValue) {
//       return sortConfig.direction === 'ascending' ? 1 : -1;
//     }
//     return 0;
//   });

//   const requestSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const getStatusBadge = (status) => {
//     return status === 'Active' ? 'active' : 'inactive';
//   };

//   return (
//     <div className="student-list-container">
//       <div className="header">
//         {/* <h1>Student List</h1> */}
//         <div className="student-filter-controls">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search students..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <i className="fas fa-search"></i>
//           </div>
//           <div className="filter-buttons">
//             <div className="student-filter-tabs">
//               <button 
//                 className={activeTab === 'all' ? 'active' : ''} 
//                 onClick={() => setActiveTab('all')}
//               >
//                 All Students
//               </button>
//               <button 
//                 className={activeTab === 'active' ? 'active' : ''} 
//                 onClick={() => setActiveTab('active')}
//               >
//                 Active
//               </button>
//               <button 
//                 className={activeTab === 'engineering' ? 'active' : ''} 
//                 onClick={() => setActiveTab('engineering')}
//               >
//                 Engineering
//               </button>
//             </div>
//             {/* <button 
//               className={`engineering-filter-btn ${showEngineeringOnly ? 'active' : ''}`}
//               onClick={toggleEngineeringFilter}
//             >
//               {showEngineeringOnly ? 'Show All Students' : 'Engineering Only'}
//             </button> */}
//           </div>
//         </div>
//       </div>

//       {loading ? (
//         <div className="loading-spinner">Loading students...</div>
//       ) : (
//         <>
//           <div className="student-table-container">
//             <table className="student-table">
//               <thead>
//                 <tr>
//                   <th onClick={() => requestSort('personal_details.fname')}>
//                     Name {sortConfig.key === 'personal_details.fname' && (
//                       <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
//                     )}
//                   </th>
//                   <th onClick={() => requestSort('academic_details.enrollment_number')}>
//                     Enrollment No. {sortConfig.key === 'academic_details.enrollment_number' && (
//                       <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
//                     )}
//                   </th>
//                   <th onClick={() => requestSort('personal_details.email')}>
//                     Email {sortConfig.key === 'personal_details.email' && (
//                       <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
//                     )}
//                   </th>
//                   <th onClick={() => requestSort('academic_details.semester')}>
//                     Semester {sortConfig.key === 'academic_details.semester' && (
//                       <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
//                     )}
//                   </th>
//                   <th onClick={() => requestSort('academic_details.batch_year')}>
//                     Batch {sortConfig.key === 'academic_details.batch_year' && (
//                       <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
//                     )}
//                   </th>
//                   <th>Department</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {sortedStudents.length > 0 ? (
//                   sortedStudents.map((student) => (
//                     <tr key={student._id}>
//                       <td>
//                         <div className="student-avatar-inlist">
//                           <div className="avatar-circle-inlist">
//                             {student.personal_details.fname.charAt(0)}{student.personal_details.lname.charAt(0)}
//                           </div>
//                           <div className="student-name">
//                             {student.personal_details.fname} {student.personal_details.lname}
//                             <span className="student-mobile">{student.personal_details.mobile}</span>
//                           </div>
//                         </div>
//                       </td>
//                       <td>{student.academic_details.enrollment_number}</td>
//                       <td>{student.personal_details.email}</td>
//                       <td>Semester {student.academic_details.semester}</td>
//                       <td>{student.academic_details.batch_year}</td>
//                       <td>{student.academic_details.department_name || 'N/A'}</td>
//                       <td>
//                         <span className={`status-badge ${getStatusBadge(student.academic_details.status)}`}>
//                           {student.academic_details.status}
//                         </span>
//                       </td>
//                       <td>
//                         <div className="action-buttons">
//                           <button 
//                             className="studentlist-view-btn"
//                             onClick={() => handleViewStudent(student._id)}
//                           >
//                             View
//                           </button>
//                           <button 
//                             className="studentlist-edit-btn"
//                             onClick={() => handleEditStudent(student._id)}
//                           >
//                             Edit
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan="8" className="no-results">
//                       No students found matching your criteria
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="summary-cards">
//             <div className="summary-card">
//               <h3>Total Students</h3>
//               <p>{students.length}</p>
//             </div>
//             <div className="summary-card">
//               <h3>Active Students</h3>
//               <p>{students.filter(s => s.academic_details.status === 'Active').length}</p>
//             </div>
//             <div className="summary-card">
//               <h3>Engineering Students</h3>
//               <p>{students.filter(s => s.academic_details.department_name && s.academic_details.department_name.includes('Engineering')).length}</p>
//             </div>
//           </div>
//         </>
//       )}
//     </div>
//   );
// };

// export default StudentList;














import React, { useEffect, useState, useMemo } from 'react';
import "../../CSSfolder/AdminCSS/allstudentlist.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/axios';

const StudentList = () => {
  const [loading, setLoading] = useState(true);
  const [students, setStudents] = useState([]);
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [activeTab, setActiveTab] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  const [batchFilter, setBatchFilter] = useState('');

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const fetchStudentList = async () => {
    try {
      const res = await apiClient.get("/api/student/list");
      setStudents(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudentList();
  }, []);

  const handleViewStudent = (studentId) => {
    if(role === 'Dean' || role === 'Director' || role === 'Accountant' || role === 'faculty') {
      navigate(`/${role}/student-profile/${studentId}`);
    } else if(role === "Registrar") {
      navigate(`/admin/student-profile/${studentId}`);
    }
  };

  const handleEditStudent = (studentId) => {
    navigate(`/admin/student/edit/${studentId}`);
  };

  // Get unique values for filters
  const uniqueDepartments = useMemo(() => {
    const depts = new Set();
    students.forEach(student => {
      if (student.academic_details?.department_name) {
        depts.add(student.academic_details.department_name);
      }
    });
    return Array.from(depts).sort();
  }, [students]);

  const uniqueSemesters = useMemo(() => {
    const sems = new Set();
    students.forEach(student => {
      if (student.academic_details?.semester) {
        sems.add(student.academic_details.semester);
      }
    });
    return Array.from(sems).sort((a, b) => a - b);
  }, [students]);

  const uniqueBatches = useMemo(() => {
    const batches = new Set();
    students.forEach(student => {
      if (student.academic_details?.batch_year) {
        batches.add(student.academic_details.batch_year);
      }
    });
    return Array.from(batches).sort((a, b) => b - a); // Sort descending (newest first)
  }, [students]);

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    return students.filter(student => {
      // Apply search filter
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = (
        student.personal_details?.fname?.toLowerCase().includes(searchLower) ||
        student.personal_details?.lname?.toLowerCase().includes(searchLower) ||
        student.academic_details?.enrollment_number?.toLowerCase().includes(searchLower) ||
        (student.academic_details?.department_name && 
         student.academic_details.department_name.toLowerCase().includes(searchLower))
      );

      // Apply active tab filter
      const matchesTab = 
        activeTab === 'all' ||
        (activeTab === 'active' && student.academic_details?.status === 'Active') ||
        (activeTab === 'engineering' && 
         student.academic_details?.department_name && 
         student.academic_details.department_name.includes('Engineering'));

      // Apply department filter
      const matchesDepartment = 
        !departmentFilter || 
        (student.academic_details?.department_name === departmentFilter);

      // Apply semester filter
      const matchesSemester = 
        !semesterFilter || 
        student.academic_details?.semester?.toString() === semesterFilter;

      // Apply batch filter
      const matchesBatch = 
        !batchFilter || 
        student.academic_details?.batch_year?.toString() === batchFilter;

      return matchesSearch && matchesTab && matchesDepartment && matchesSemester && matchesBatch;
    });
  }, [students, searchTerm, activeTab, departmentFilter, semesterFilter, batchFilter]);

  const sortedStudents = useMemo(() => {
    return [...filteredStudents].sort((a, b) => {
      if (sortConfig.key === null) return 0;
      
      const getValue = (obj, key) => {
        return key.split('.').reduce((o, k) => (o || {})[k], obj);
      };

      const aValue = getValue(a, sortConfig.key);
      const bValue = getValue(b, sortConfig.key);

      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredStudents, sortConfig]);

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = sortedStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(sortedStudents.length / studentsPerPage);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const getStatusBadge = (status) => {
    return status === 'Active' ? 'active' : 'inactive';
  };

  const resetFilters = () => {
    setSearchTerm('');
    setDepartmentFilter('');
    setSemesterFilter('');
    setBatchFilter('');
    setActiveTab('all');
    setCurrentPage(1);
  };

  return (
    <div className="student-list-container">
      <div className="header">
        <div className="student-filter-controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <i className="fas fa-search"></i>
          </div>
          
          <div className="filter-options">
            <select
              value={departmentFilter}
              onChange={(e) => {
                setDepartmentFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Departments</option>
              {uniqueDepartments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>

            <select
              value={semesterFilter}
              onChange={(e) => {
                setSemesterFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Semesters</option>
              {uniqueSemesters.map(sem => (
                <option key={sem} value={sem}>Semester {sem}</option>
              ))}
            </select>

            <select
              value={batchFilter}
              onChange={(e) => {
                setBatchFilter(e.target.value);
                setCurrentPage(1);
              }}
            >
              <option value="">All Batches</option>
              {uniqueBatches.map(batch => (
                <option key={batch} value={batch}>{batch}</option>
              ))}
            </select>

            <button 
              className="reset-filters-btn"
              onClick={resetFilters}
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="filter-buttons">
          <div className="student-filter-tabs">
            <button 
              className={activeTab === 'all' ? 'active' : ''} 
              onClick={() => {
                setActiveTab('all');
                setCurrentPage(1);
              }}
            >
              All Students
            </button>
            <button 
              className={activeTab === 'active' ? 'active' : ''} 
              onClick={() => {
                setActiveTab('active');
                setCurrentPage(1);
              }}
            >
              Active
            </button>
            <button 
              className={activeTab === 'engineering' ? 'active' : ''} 
              onClick={() => {
                setActiveTab('engineering');
                setCurrentPage(1);
              }}
            >
              Engineering
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading students...</div>
      ) : (
        <>
          <div className="studentlist-table-container">
            <table className="student-table">
              <thead>
                <tr>
                  <th onClick={() => requestSort('personal_details.fname')}>
                    Name {sortConfig.key === 'personal_details.fname' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th onClick={() => requestSort('academic_details.enrollment_number')}>
                    Enrollment No. {sortConfig.key === 'academic_details.enrollment_number' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th onClick={() => requestSort('personal_details.email')}>
                    Email {sortConfig.key === 'personal_details.email' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th onClick={() => requestSort('academic_details.semester')}>
                    Semester {sortConfig.key === 'academic_details.semester' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th onClick={() => requestSort('academic_details.batch_year')}>
                    Batch {sortConfig.key === 'academic_details.batch_year' && (
                      <span>{sortConfig.direction === 'ascending' ? '↑' : '↓'}</span>
                    )}
                  </th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentStudents.length > 0 ? (
                  currentStudents.map((student) => (
                    <tr key={student._id}>
                      <td>
                        <div className="student-avatar-inlist">
                          <div className="avatar-circle-inlist">
                            {student.personal_details?.fname?.charAt(0)}{student.personal_details?.lname?.charAt(0)}
                          </div>
                          <div className="student-name">
                            {student.personal_details?.fname} {student.personal_details?.lname}
                            <span className="student-mobile">{student.personal_details?.mobile}</span>
                          </div>
                        </div>
                      </td>
                      <td>{student.academic_details?.enrollment_number || 'N/A'}</td>
                      <td>{student.personal_details?.email || 'N/A'}</td>
                      <td>Semester {student.academic_details?.semester || 'N/A'}</td>
                      <td>{student.academic_details?.batch_year || 'N/A'}</td>
                      <td>{student.academic_details?.department_name || 'N/A'}</td>
                      <td>
                        <span className={`status-badge ${getStatusBadge(student.academic_details?.status)}`}>
                          {student.academic_details?.status || 'N/A'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="studentlist-view-btn"
                            onClick={() => handleViewStudent(student._id)}
                          >
                            View
                          </button>
                          {role === 'Registrar' && (
                            <button 
                              className="studentlist-edit-btn"
                              onClick={() => handleEditStudent(student._id)}
                            >
                              Edit
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="no-results">
                      No students found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination controls */}
          {sortedStudents.length > studentsPerPage && (
            <div className="pagination-controls">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={currentPage === pageNumber ? 'active' : ''}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <span className="ellipsis">...</span>
              )}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  className={currentPage === totalPages ? 'active' : ''}
                >
                  {totalPages}
                </button>
              )}
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}

          <div className="summary-section">
            <div className="summary-cards">
              <div className="summary-card">
                <h3>Total Students</h3>
                <p>{students.length}</p>
              </div>
              <div className="summary-card">
                <h3>Filtered Students</h3>
                <p>{sortedStudents.length}</p>
              </div>
              <div className="summary-card">
                <h3>Active Students</h3>
                <p>{students.filter(s => s.academic_details?.status === 'Active').length}</p>
              </div>
              <div className="summary-card">
                <h3>Engineering Students</h3>
                <p>{students.filter(s => s.academic_details?.department_name && s.academic_details.department_name.includes('Engineering')).length}</p>
              </div>
            </div>

            <div className="pagination-info">
              Showing {indexOfFirstStudent + 1} to {Math.min(indexOfLastStudent, sortedStudents.length)} of {sortedStudents.length} students
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default StudentList;