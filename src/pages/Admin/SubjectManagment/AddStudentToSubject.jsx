import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../../../services/axios';

const AddStudentToSubject = () => {
  const { subjectId } = useParams();
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    department: '',
    semester: '',
    status: '',
    enrollmentNumber: ''
  });
  const [departments, setDepartments] = useState([]);

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch students
        const studentsResponse = await apiClient.get('/api/student/list');
        setAllStudents(studentsResponse.data);
        setFilteredStudents(studentsResponse.data);
        console.log(studentsResponse.data);
        
        // Fetch departments
        const deptResponse = await apiClient.get('/api/features/getdepartmentname');
        setDepartments(deptResponse.data);
        console.log(deptResponse.data);
        
      } catch (error) {
        toast.error('Error fetching initial data');
      }
    };
    
    fetchInitialData();
  }, []);

  // Apply filters whenever filters or searchQuery changes
  useEffect(() => {
    const filtered = allStudents.filter(student => {
      // Search by name or enrollment number
      const matchesSearch = 
        searchQuery === '' ||
        (student.personal_details?.first_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (student.personal_details?.last_name?.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (student.academic_details?.enrollment_number?.toLowerCase().includes(searchQuery.toLowerCase()));

      // Filter by department
      const matchesDepartment = 
        filters.department === '' || 
        student.academic_details?.department_name === filters.department;

      // Filter by semester
      const matchesSemester = 
        filters.semester === '' || 
        student.academic_details?.semester?.toString() === filters.semester;

      // Filter by status
      const matchesStatus = 
        filters.status === '' || 
        student.academic_details?.status?.toLowerCase() === filters.status.toLowerCase();

      // Filter by enrollment number
      const matchesEnrollment = 
        filters.enrollmentNumber === '' || 
        student.academic_details?.enrollment_number?.toLowerCase().includes(filters.enrollmentNumber.toLowerCase());

      return matchesSearch && matchesDepartment && matchesSemester && matchesStatus && matchesEnrollment;
    });

    setFilteredStudents(filtered);
  }, [allStudents, searchQuery, filters]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const toggleStudentSelection = (studentId) => {
    setSelectedStudents(prev => {
      if (prev.includes(studentId)) {
        return prev.filter(id => id !== studentId);
      } else {
        return [...prev, studentId];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedStudents.length === 0) {
      toast.warning('Please select at least one student');
      return;
    }

    setLoading(true);
    try {
      const response = await apiClient.put(`/api/features/addmultiplestudents/${subjectId}`, {
        studentIds: selectedStudents
      });
      console.log( "studentIds" , selectedStudents);
      
      toast.success(response.data.message);
      setSelectedStudents([]);
      // Refresh the list after successful addition
      const studentsResponse = await axios.get('http://localhost:5000/api/student/list');
      setAllStudents(studentsResponse.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error adding students');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enrollment-container">
      <div className="card">
        <h2 className="card-title">Add Students to Subject</h2>
        
        {/* Search and Filter Section */}
        <div className="search-filter-section">
          <div className="search-section">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search by name or enrollment number"
              className="search-input"
            />
          </div>

          <div className="filter-section">
            <div className="filter-group">
              <label>Department:</label>
              <select
                name="department"
                value={filters.department}
                onChange={handleFilterChange}
                className="filter-input"
              >
                <option value="">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept?.name}>{dept.name}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Semester:</label>
              <select
                name="semester"
                value={filters.semester}
                onChange={handleFilterChange}
                className="filter-input"
              >
                <option value="">All Semesters</option>
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Status:</label>
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="filter-input"
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Graduated">Graduated</option>
              </select>
            </div>

            <div className="filter-group">
              <label>Enrollment Number:</label>
              <input
                type="text"
                name="enrollmentNumber"
                value={filters.enrollmentNumber}
                onChange={handleFilterChange}
                placeholder="Filter by enrollment"
                className="filter-input"
              />
            </div>
          </div>
        </div>

        {/* Search Results */}
        {filteredStudents.length > 0 ? (
          <div className="search-results">
            <div className="results-header">
              <h4>Showing {filteredStudents.length} students</h4>
              {selectedStudents.length > 0 && (
                <span className="selected-count">{selectedStudents.length} selected</span>
              )}
            </div>
            <ul className="student-list">
              {filteredStudents.map(student => (
                <li 
                  key={student._id} 
                  className={`student-item ${selectedStudents.includes(student._id) ? 'selected' : ''}`}
                  onClick={() => toggleStudentSelection(student._id)}
                >
                  <div className="student-info">
                    <span className="student-name">
                      {student.personal_details?.fname} {student.personal_details?.lname}
                    </span>
                    <span className="student-enrollment">{student.academic_details?.enrollment_number}</span>
                    <span className="student-dept">{student.academic_details?.department_name || 'N/A'}</span>
                    <span className="student-sem">Sem {student.academic_details?.semester}</span>
                    <span className={`student-status ${student.academic_details?.status?.toLowerCase()}`}>
                      {student.academic_details?.status}
                    </span>
                  </div>
                  <div className="selection-indicator">
                    {selectedStudents.includes(student._id) ? '✓' : ''}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="no-results">
            No students found matching your criteria
          </div>
        )}

        {/* Submit Form */}
        {selectedStudents.length > 0 && (
          <form onSubmit={handleSubmit} className="enrollment-form">
            <button 
              type="submit" 
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Adding...' : `Add ${selectedStudents.length} Selected Students`}
            </button>
          </form>
        )}
      </div>

      <style jsx>{`
        .enrollment-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        
        .card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }
        
        .card-title {
          color: #2c3e50;
          margin-bottom: 1.5rem;
          text-align: center;
          font-size: 1.5rem;
        }
        
        .search-filter-section {
          margin-bottom: 1.5rem;
        }
        
        .search-section {
          margin-bottom: 1rem;
        }
        
        .search-input {
          width: 100%;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
        }
        
        .filter-section {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
        }
        
        .filter-group {
          display: flex;
          flex-direction: column;
        }
        
        .filter-group label {
          margin-bottom: 0.5rem;
          font-size: 0.9rem;
          color: #555;
        }
        
        .filter-input {
          padding: 8px 12px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 0.9rem;
        }
        
        .search-results {
          margin: 1.5rem 0;
          border: 1px solid #eee;
          border-radius: 5px;
          overflow: hidden;
        }
        
        .no-results {
          padding: 2rem;
          text-align: center;
          color: #666;
          font-style: italic;
        }
        
        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background: #f8f9fa;
          border-bottom: 1px solid #eee;
        }
        
        .results-header h4 {
          margin: 0;
          color: #34495e;
        }
        
        .selected-count {
          background: #3498db;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.8rem;
        }
        
        .student-list {
          list-style: none;
          padding: 0;
          margin: 0;
          max-height: 400px;
          overflow-y: auto;
        }
        
        .student-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 15px;
          border-bottom: 1px solid #f5f5f5;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .student-item:hover {
          background: #f8f9fa;
        }
        
        .student-item.selected {
          background: #e3f2fd;
        }
        
        .student-info {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 15px;
          flex: 1;
        }
        
        .student-name {
          font-weight: 500;
          min-width: 180px;
        }
        
        .student-enrollment {
          color: #555;
          font-family: monospace;
          min-width: 120px;
        }
        
        .student-dept {
          background: #e0f7fa;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.8rem;
          color: #00838f;
        }
        
        .student-sem {
          background: #e8f5e9;
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.8rem;
          color: #2e7d32;
        }
        
        .student-status {
          padding: 2px 8px;
          border-radius: 10px;
          font-size: 0.8rem;
        }
        
        .student-status.active {
          background: #e8f5e9;
          color: #2e7d32;
        }
        
        .student-status.inactive {
          background: #ffebee;
          color: #c62828;
        }
        
        .student-status.graduated {
          background: #e3f2fd;
          color: #1565c0;
        }
        
        .selection-indicator {
          width: 20px;
          height: 20px;
          border: 2px solid #3498db;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #3498db;
          font-weight: bold;
        }
        
        .student-item.selected .selection-indicator {
          background: #3498db;
          color: white;
        }
        
        .enrollment-form {
          margin-top: 1.5rem;
        }
        
        .submit-btn {
          width: 100%;
          background: #2ecc71;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .submit-btn:hover {
          background: #27ae60;
        }
        
        .submit-btn:disabled {
          background: #95a5a6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default AddStudentToSubject;