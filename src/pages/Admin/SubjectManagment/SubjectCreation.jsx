import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './subjectcss/SubjectForm.css';
import apiClient from '../../../services/axios';

const SubjectForm = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    department: {
      department_id: '',
      department_name: ''
    },
    faculty: {
      facultyId: ''
    },
    classes: [],
    credits: '',
    description: '',
    syllabus: [],
    semester: '',
    academic_year: '',
    is_active: true
  });
  const [currentClass, setCurrentClass] = useState('');
  const [currentSyllabusItem, setCurrentSyllabusItem] = useState('');
  const [errors, setErrors] = useState({});

  const fatchdepartment = async() => {
    try{
      const res = await apiClient.get("/api/features/getdepartmentname")
      setDepartments(res.data)
      console.log(res.data);
      setLoading(false);
    }catch(error){
      console.log(error);
    }
  }

  const fatchFaculty = async() => {
    try{
      const res = await apiClient.get("/api/faculty/allfacultyname")
      setFaculties(res.data)
      console.log(res.data);
      setLoading(false)
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    fatchdepartment();
    fatchFaculty();
    // const fetchData = async () => {
    //   try {
    //     const [deptRes, facultyRes] = await axios.all([
    //       axios.get('http://localhost:5000/api/features/getdepartmentname'),
    //       axios.get('http://localhost:5000/api/faculty/allfacultyname')
    //     ]);
    //     setDepartments(deptRes.data);
    //     setFaculties(facultyRes.data);
    //     setLoading(false);
    //   } catch (error) {
    //     console.error('Error fetching data:', error);
    //     setLoading(false);
    //   }
    // };
    // fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleAddClass = () => {
    if (currentClass.trim()) {
      setFormData(prev => ({
        ...prev,
        classes: [...prev.classes, { class: currentClass.trim() }]
      }));
      setCurrentClass('');
    }
  };

  const handleRemoveClass = (index) => {
    setFormData(prev => ({
      ...prev,
      classes: prev.classes.filter((_, i) => i !== index)
    }));
  };

  const handleAddSyllabusItem = () => {
    if (currentSyllabusItem.trim()) {
      setFormData(prev => ({
        ...prev,
        syllabus: [...prev.syllabus, currentSyllabusItem.trim()]
      }));
      setCurrentSyllabusItem('');
    }
  };

  const handleRemoveSyllabusItem = (index) => {
    setFormData(prev => ({
      ...prev,
      syllabus: prev.syllabus.filter((_, i) => i !== index)
    }));
  };

  const handleDepartmentChange = (e) => {
    const deptId = e.target.value;
    // console.log(deptId);
    
    const selectedDept = departments.find(d => d.id === deptId);
    
    setFormData(prev => ({
      ...prev,
      department: {
        department_id: deptId,
        department_name: selectedDept ? selectedDept.name : ''
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.code.trim()) newErrors.code = 'Subject code is required';
    if (!formData.name.trim()) newErrors.name = 'Subject name is required';
    if (!formData.department.department_id) newErrors['department.department_id'] = 'Department is required';
    if (!formData.credits) newErrors.credits = 'Credits are required';
    if (isNaN(formData.credits)) newErrors.credits = 'Credits must be a number';
    if (!formData.semester) newErrors.semester = 'Semester is required';
    if (!formData.academic_year) newErrors.academic_year = 'Academic year is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      console.log(formData);
      const response = await apiClient.post('/api/features/createSubject', formData);
      navigate('admin/subjectslist', { state: { message: 'Subject created successfully!' } });
    } catch (error) {
      console.error('Error creating subject:', error);
      if (error.response && error.response.data.errors) {
        // Handle server-side validation errors
        const serverErrors = {};
        error.response.data.errors.forEach(err => {
          serverErrors[err.path] = err.msg;
        });
        setErrors(serverErrors);
      } else {
        setErrors({ submit: 'Failed to create subject. Please try again.' });
      }
      setLoading(false);
    }
  };

  if (loading && (departments.length === 0 || faculties.length === 0)) {
    return <div className="loading-spinner">Loading form data...</div>;
  }

  return (
    <div className="subject-form-container">
      <div className="form-header">
        <h1>Create New Subject</h1>
        <p>Fill in the details to create a new subject</p>
      </div>

      <form onSubmit={handleSubmit} className="subject-form">
        <div className="form-grid-wholebox">
          {/* Basic Information */}
          <div className="form-section">
            <h2 className="section-title">Basic Information</h2>
            <div className="form-group-collection-box">
            <div className={`form-group ${errors.code ? 'has-error' : ''}`}>
              <label htmlFor="code">Subject Code*</label>
              <input
                type="text"
                id="code"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g., CS101"
              />
              {errors.code && <span className="error-message">{errors.code}</span>}
            </div>
            
            <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
              <label htmlFor="name">Subject Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Introduction to Computer Science"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className={`form-group ${errors['department.department_id'] ? 'has-error' : ''}`}>
              <label htmlFor="department">Department*</label>
              <select
                id="department"
                name="department.department_id"
                value={formData?.department?.department_id}
                onChange={handleDepartmentChange}
              >
                <option value="">Select Department</option>
                {departments?.map(dept => (
                  <option key={dept?.id} value={dept?.id}>
                    {dept?.name}
                    {/* {dept.personal_details.first_name} {dept.personal_details.last_name} */}
                  </option>
                ))}
              </select>
              {errors['department.department_id'] && (
                <span className="error-message">{errors['department.department_id']}</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="faculty">Faculty Incharge</label>
              <select
                id="faculty"
                name="faculty.facultyId"
                value={formData?.faculty?.facultyId}
                onChange={handleChange}
              >
                <option value="">Select Faculty</option>
                {faculties?.map(faculty => (
                  <option key={faculty._id} value={faculty._id}>
                    {faculty.personal_details.first_name} {faculty.personal_details.last_name}
                    {/* {faculty.name} ({faculty.employeeId}) */}
                  </option>
                ))}
              </select>
            </div>
            </div>
          </div>

          {/* Academic Details */}
          <div className="form-section">
            <h2 className="section-title">Academic Details</h2>
            <div className="form-group-collection-box">
            <div className={`form-group ${errors.credits ? 'has-error' : ''}`}>
              <label htmlFor="credits">Credits*</label>
              <input
                type="number"
                id="credits"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                placeholder="e.g., 4"
                min="1"
                max="10"
              />
              {errors.credits && <span className="error-message">{errors.credits}</span>}
            </div>
            
            <div className={`form-group ${errors.semester ? 'has-error' : ''}`}>
              <label htmlFor="semester">Semester*</label>
              <select
                id="semester"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
              >
                <option value="">Select Semester</option>
                <option value="1">Semester 1</option>
                <option value="2">Semester 2</option>
                <option value="3">Semester 3</option>
                <option value="4">Semester 4</option>
                <option value="5">Semester 5</option>
                <option value="6">Semester 6</option>
                <option value="7">Semester 7</option>
                <option value="8">Semester 8</option>
              </select>
              {errors.semester && <span className="error-message">{errors.semester}</span>}
            </div>
            
            <div className={`form-group ${errors.academic_year ? 'has-error' : ''}`}>
              <label htmlFor="academic_year">Academic Year*</label>
              <select
                id="academic_year"
                name="academic_year"
                value={formData.academic_year}
                onChange={handleChange}
              >
                <option value="">Select Academic Year</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
                <option value="2026-2027">2026-2027</option>
              </select>
              {errors.academic_year && <span className="error-message">{errors.academic_year}</span>}
            </div>
            
            <div className="form-group">
              <label>Active Status</label>
              <div className="toggle-switch">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    is_active: e.target.checked
                  }))}
                />
                <span className="slider round"></span>
                <label htmlFor="is_active" className="toggle-label">
                  {formData.is_active ? 'Active' : 'Inactive'}
                </label>
              </div>
            </div>
            </div>
          </div>

          {/* Classes */}
          <div className="classes-syllabus-box">
          <div className="class-form-section">
            <h2 className="section-title">Classes</h2>
            <div className="class-form-group">
              <label>Add Class</label>
              <div className="input-with-button">
                <input
                  type="text"
                  value={currentClass}
                  onChange={(e) => setCurrentClass(e.target.value)}
                  placeholder="e.g., A, B, C"
                />
                <button
                  type="button"
                  className="add-button"
                  onClick={handleAddClass}
                  disabled={!currentClass.trim()}
                >
                  Add
                </button>
              </div>
            </div>
            
            {formData?.classes?.length > 0 && (
              <div className="items-list">
                <h4>Added Classes:</h4>
                <ul>
                  {formData?.classes?.map((cls, index) => (
                    <li key={index}>
                      {cls.class}
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => handleRemoveClass(index)}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Syllabus */}
          <div className="syllabus-form-section">
            <h2 className="section-title">Syllabus</h2>
            <div className="syllabus-form-group">
              <label>Add Syllabus Item</label>
              <div className="input-with-button">
                <input
                  type="text"
                  value={currentSyllabusItem}
                  onChange={(e) => setCurrentSyllabusItem(e.target.value)}
                  placeholder="e.g., Introduction to Programming"
                />
                <button
                  type="button"
                  className="add-button"
                  onClick={handleAddSyllabusItem}
                  disabled={!currentSyllabusItem.trim()}
                >
                  Add
                </button>
              </div>
            </div>
            
            {formData?.syllabus?.length > 0 && (
              <div className="items-list">
                <h4>Syllabus Items:</h4>
                <ol>
                  {formData?.syllabus?.map((item, index) => (
                    <li key={index}>
                      {item}
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => handleRemoveSyllabusItem(index)}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          </div>

          {/* Description */}
          <div className="form-section full-width">
            <h2 className="section-title">Description</h2>
            <div className="description-form-group">
              <label htmlFor="description">Subject Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Enter a detailed description of the subject..."
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/subjects')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Subject'}
          </button>
        </div>

        {errors.submit && (
          <div className="form-error">
            {errors.submit}
          </div>
        )}
      </form>
    </div>
  );
};

export default SubjectForm;