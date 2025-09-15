import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../CSSfolder/CourseCSS/CourseForm.css';
import apiClient from '../../services/axios';

const CourseForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [formData, setFormData] = useState({
    courseName: '',
    code: '',
    description: '',
    departments: [],
    fee: '',
    status: 'pending',
    facultyAssigned: [],
    credits: '',
    semester: '',
    academic_year: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {

        // Fetch departments and faculties
        const deptResponse = await apiClient.get('/api/features/getdepartmentname');
        setDepartments(deptResponse.data);
        const facultyResponse = await apiClient.get('/api/faculty/allfacultyname');
        setFaculties(facultyResponse.data);

        // If editing, fetch course data
        if (id) {
          const courseResponse = await apiClient.get(`/api/features/course/${id}`);
          setFormData(courseResponse.data.coursedata);
        }
      } catch (err) {
        setError('Failed to fetch required data');
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDepartmentSelect = (deptId) => {
    setFormData(prev => {
      const isSelected = prev.departments.includes(deptId);
      return {
        ...prev,
        departments: isSelected 
          ? prev.departments.filter(id => id !== deptId)
          : [...prev.departments, deptId]
      };
    });
  };

  const handleFacultySelect = (facultyId) => {
    setFormData(prev => {
      const isSelected = prev.facultyAssigned.includes(facultyId);
      return {
        ...prev,
        facultyAssigned: isSelected 
          ? prev.facultyAssigned.filter(id => id !== facultyId)
          : [...prev.facultyAssigned, facultyId]
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (id) {
        // Update existing course
        await apiClient.put(`/api/features/courseedit/${id}`, formData);
      } else {
        // Create new course
        await apiClient.post('/api/features/course', formData);
      }
      navigate('/admin/courselist');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save course');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="course-form-container">
      <div className="course-form-header">
        <h1>{id ? 'Edit Course' : 'Create New Course'}</h1>
        <button onClick={() => navigate('/admin/courselist')} className="back-button">
          Back to Courses
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Course Name*</label>
              <input
                type="text"
                name="courseName"
                value={formData?.courseName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Course Code*</label>
              <input
                type="text"
                name="code"
                value={formData?.code}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Credits*</label>
              <input
                type="text"
                name="credits"
                value={formData?.credits}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Fee*</label>
              <input
                type="text"
                name="fee"
                value={formData?.fee}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Semester*</label>
              <input
                type="text"
                name="semester"
                value={formData?.semester}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Academic Year*</label>
              <input
                type="text"
                name="academic_year"
                value={formData?.academic_year}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Status*</label>
              <select
                name="status"
                value={formData?.status}
                onChange={handleChange}
                required
              >
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description*</label>
            <textarea
              name="description"
              value={formData?.description}
              onChange={handleChange}
              rows="4"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Departments</h2>
          <div className="checkbox-grid">
            {departments?.map(dept => (
              <div key={dept.id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`dept-${dept?.id}`}
                  checked={formData?.departments?.includes(dept.id)}
                  onChange={() => handleDepartmentSelect(dept?.id)}
                />
                <label htmlFor={`dept-${dept?.id}`}>{dept?.name}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h2>Assigned Faculty</h2>
          <div className="checkbox-grid">
            {faculties?.map(faculty => (
              <div key={faculty?._id} className="checkbox-item">
                <input
                  type="checkbox"
                  id={`faculty-${faculty?._id}`}
                  checked={formData?.facultyAssigned?.includes(faculty?._id)}
                  onChange={() => handleFacultySelect(faculty?._id)}
                />
                <label htmlFor={`faculty-${faculty?._id}`}>
                  {faculty?.personal_details?.first_name} {faculty?.personal_details?.last_name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/courses')} className="cancel-button">
            Cancel
          </button>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? 'Saving...' : 'Save Course'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseForm;