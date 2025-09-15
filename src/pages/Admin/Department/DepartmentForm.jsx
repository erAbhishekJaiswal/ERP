import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Department/DepartmentCSS/DepartmentForm.css';
import apiClient from '../../../services/axios';

const DepartmentForm = () => {
  const navigate = useNavigate();
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    establishment_date: '',
    current_hod: {
      faculty_id: '',
      faculty_name: ''
    },
    contact_info: {
      email: '',
      phone: '',
      office_location: ''
    }
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchFaculties = async () => {
      try {
        const response = await apiClient.get('/api/faculty/allfacultyname');
        setFaculties(response.data);
      } catch (error) {
        console.error('Error fetching faculties:', error);
      }
    };
    fetchFaculties();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('current_hod.') || name.startsWith('contact_info.')) {
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

  const handleHodChange = (e) => {
    const facultyId = e.target.value;
    const selectedFaculty = faculties.find(f => f._id === facultyId);
    
    setFormData(prev => ({
      ...prev,
      current_hod: {
        faculty_id: facultyId,
        faculty_name: selectedFaculty ? selectedFaculty.name : ''
      }
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Department name is required';
    if (!formData.establishment_date) newErrors.establishment_date = 'Establishment date is required';
    
    // Validate email format if provided
    if (formData.contact_info.email && !/^\S+@\S+\.\S+$/.test(formData.contact_info.email)) {
      newErrors['contact_info.email'] = 'Invalid email format';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      const response = await apiClient.post('/api/features/createDepartment', formData);
      console.log(response.data);
      setLoading(false);
      navigate('/admin/departmentlist', { state: { message: 'Department created successfully!' } });
    } catch (error) {
      console.error('Error creating department:', error);
      if (error.response && error.response.data.error) {
        setErrors({ submit: error.response.data.error });
      } else {
        setErrors({ submit: 'Failed to create department. Please try again.' });
      }
      setLoading(false);
    }
  };

  return (
    <div className="department-form-container">
      <div className="form-header">
        <h1>Create New Department</h1>
        <p>Fill in the details to create a new academic department</p>
      </div>

      <form onSubmit={handleSubmit} className="department-form">
        <div className="form-grid">
          {/* Basic Information */}
          <div className="form-section">
            <h2 className="section-title">Basic Information</h2>
            
            <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
              <label htmlFor="name">Department Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., Computer Science"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                placeholder="Brief description of the department..."
              />
            </div>
            
            <div className={`form-group ${errors.establishment_date ? 'has-error' : ''}`}>
              <label htmlFor="establishment_date">Establishment Date*</label>
              <input
                type="date"
                id="establishment_date"
                name="establishment_date"
                value={formData.establishment_date}
                onChange={handleChange}
              />
              {errors.establishment_date && (
                <span className="error-message">{errors.establishment_date}</span>
              )}
            </div>
          </div>

          {/* Head of Department */}
          <div className="form-section">
            <h2 className="section-title">Head of Department</h2>
            
            <div className="form-group">
              <label htmlFor="current_hod">Select HOD</label>
              <select
                id="current_hod"
                name="current_hod.faculty_id"
                value={formData.current_hod.faculty_id}
                onChange={handleHodChange}
              >
                <option value="">Select Faculty Member</option>
                {faculties.map(faculty => (
                  <option key={faculty._id} value={faculty._id}>
                    {faculty.personal_details.first_name} {faculty.personal_details.last_names}
                  </option>
                ))}
              </select>
            </div>
            
            {formData.current_hod.faculty_id && (
              <div className="selected-hod">
                <h4>Selected HOD:</h4>
                <p>
                  {faculties.find(f => f._id === formData.current_hod.faculty_id)?.name}
                </p>
              </div>
            )}
          </div>

          {/* Contact Information */}
          <div className="form-section">
            <h2 className="section-title">Contact Information</h2>
            
            <div className={`form-group ${errors['contact_info.email'] ? 'has-error' : ''}`}>
              <label htmlFor="contact_email">Email</label>
              <input
                type="email"
                id="contact_email"
                name="contact_info.email"
                value={formData.contact_info.email}
                onChange={handleChange}
                placeholder="department@university.edu"
              />
              {errors['contact_info.email'] && (
                <span className="error-message">{errors['contact_info.email']}</span>
              )}
            </div>
            
            <div className="form-group">
              <label htmlFor="contact_phone">Phone</label>
              <input
                type="tel"
                id="contact_phone"
                name="contact_info.phone"
                value={formData.contact_info.phone}
                onChange={handleChange}
                placeholder="+1 (123) 456-7890"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contact_location">Office Location</label>
              <input
                type="text"
                id="contact_location"
                name="contact_info.office_location"
                value={formData.contact_info.office_location}
                onChange={handleChange}
                placeholder="Building name, room number"
              />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/departments')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Department'}
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

export default DepartmentForm;