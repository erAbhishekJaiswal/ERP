// import React, { useState } from 'react';
// // import api from '../api';
// import axios from 'axios';
// import '../../CSSfolder/CommonCSS/allfile.css'

// const UpdateStudentRecord = () => {
//     const [studentId, setStudentId] = useState('');
//     const [updatedData, setUpdatedData] = useState({});

//     const handleUpdateRecord = async () => {
//         try {
//             await axios.post('/registrar/student-record', { studentId, updatedData });
//             alert('Student record updated successfully');
//         } catch (error) {
//             console.error('Failed to update student record', error);
//         }
//     };

//     const handleDataChange = (field, value) => {
//         setUpdatedData((prevData) => ({ ...prevData, [field]: value }));
//     };

//     return (
//         <div className='allcontainer'>
//             <h2>Update Student Record</h2>
//             <input type="text" value={studentId} onChange={(e) => setStudentId(e.target.value)} placeholder="Student ID" />
//             <input type="text" onChange={(e) => handleDataChange('name', e.target.value)} placeholder="Name" />
//             <input type="text" onChange={(e) => handleDataChange('address', e.target.value)} placeholder="Address" />
//             <button onClick={handleUpdateRecord}>Update Record</button>
//         </div>
//     );
// };

// export default UpdateStudentRecord;















import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../CSSfolder/AdminCSS/UpdateStudentRecord.css';
import apiClient from '../../services/axios';

const UpdateStudentRecord = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [studentData, setStudentData] = useState(null);
  const [formData, setFormData] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeTab, setActiveTab] = useState('personal');

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await apiClient.get(`/api/student/${id}`);
        setStudentData(res.data);
        setFormData({
          personal_details: { ...res.data.personal_details },
          academic_details: { ...res.data.academic_details }
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const [section, field] = name.includes('.') ? name.split('.') : [name, ''];

    if (section === 'personal_details' || section === 'academic_details') {
      setFormData(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personal_details: {
        ...prev.personal_details,
        address: {
          ...prev.personal_details.address,
          [name]: value
        }
      }
    }));
  };

  const handleParentContactChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      personal_details: {
        ...prev.personal_details,
        parent_contact: {
          ...prev.personal_details.parent_contact,
          [name]: value
        }
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await apiClient.put(`/api/student/${id}`, formData);
      setStudentData(res.data);
      setSuccessMessage('Student information updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || 'Failed to update student information');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const parseDateForInput = (dateString) => {
    if (!dateString) return '';
    return dateString.split('T')[0];
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading student data...</p>
      </div>
    );
  }

  if (!studentData) {
    return (
      <div className="error-container">
        <h2>Student Not Found</h2>
        <p>The requested student could not be found.</p>
        <button onClick={() => navigate('/students')} className="back-btn">
          Back to Students
        </button>
      </div>
    );
  }

  return (
    <div className="student-edit-container">
      <div className="edit-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
          Back
        </button>
        <h1>Edit Student Profile</h1>
        <p>Update student information and academic details</p>
      </div>

      {successMessage && (
        <div className="success-message">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="error-message">
          <svg viewBox="0 0 24 24" width="20" height="20">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
          </svg>
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="student-profile-update-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveTab('personal')}
          >
            Personal Information
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'academic' ? 'active' : ''}`}
            onClick={() => setActiveTab('academic')}
          >
            Academic Information
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'additional' ? 'active' : ''}`}
            onClick={() => setActiveTab('additional')}
          >
            Additional Information
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'personal' && (
            <div className="form-section">
              <div className="form-grid">
                <div className="form-card">
                  <h3>Basic Information</h3>
                  <div className="form-group">
                    <label htmlFor="first_name">First Name</label>
                    <input
                      type="text"
                      id="first_name"
                      name="personal_details.first_name"
                      value={formData.personal_details?.first_name || ''}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="midname">Middle Name</label>
                    <input
                      type="text"
                      id="midname"
                      name="personal_details.midname"
                      value={formData.personal_details?.midname || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="last_name">Last Name</label>
                    <input
                      type="text"
                      id="last_name"
                      name="personal_details.last_name"
                      value={formData.personal_details?.last_name || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="date_of_birth">Date of Birth</label>
                    <input
                      type="date"
                      id="date_of_birth"
                      name="personal_details.date_of_birth"
                      value={parseDateForInput(formData.personal_details?.date_of_birth) || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="gender">Gender</label>
                    <select
                      id="gender"
                      name="personal_details.gender"
                      value={formData.personal_details?.gender || ''}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="form-card">
                  <h3>Contact Information</h3>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="personal_details.email"
                      value={formData.personal_details?.email || ''}
                      onChange={handleChange}
                      required
                      disabled
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mobile">Mobile Number</label>
                    <input
                      type="tel"
                      id="mobile"
                      name="personal_details.mobile"
                      value={formData.personal_details?.mobile || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-card">
                  <h3>Address</h3>
                  <div className="form-group">
                    <label htmlFor="street">Street</label>
                    <input
                      type="text"
                      id="street"
                      name="street"
                      value={formData.personal_details?.address?.street || ''}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.personal_details?.address?.city || ''}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="state">State</label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.personal_details?.address?.state || ''}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="postal_code">Postal Code</label>
                    <input
                      type="text"
                      id="postal_code"
                      name="postal_code"
                      value={formData.personal_details?.address?.postal_code || ''}
                      onChange={handleAddressChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.personal_details?.address?.country || ''}
                      onChange={handleAddressChange}
                    />
                  </div>
                </div>

                <div className="form-card">
                  <h3>Parent Contact</h3>
                  <div className="form-group">
                    <label htmlFor="father_name">Father's Name</label>
                    <input
                      type="text"
                      id="father_name"
                      name="father_name"
                      value={formData.personal_details?.parent_contact?.father_name || ''}
                      onChange={handleParentContactChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="father_mobile">Father's Mobile</label>
                    <input
                      type="tel"
                      id="father_mobile"
                      name="father_mobile"
                      value={formData.personal_details?.parent_contact?.father_mobile || ''}
                      onChange={handleParentContactChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mother_name">Mother's Name</label>
                    <input
                      type="text"
                      id="mother_name"
                      name="mother_name"
                      value={formData.personal_details?.parent_contact?.mother_name || ''}
                      onChange={handleParentContactChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="mother_mobile">Mother's Mobile</label>
                    <input
                      type="tel"
                      id="mother_mobile"
                      name="mother_mobile"
                      value={formData.personal_details?.parent_contact?.mother_mobile || ''}
                      onChange={handleParentContactChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="form-section">
              <div className="form-grid">
                <div className="form-card">
                  <h3>Academic Details</h3>
                  <div className="form-group">
                    <label htmlFor="enrollment_number">Enrollment Number</label>
                    <input
                      type="text"
                      id="enrollment_number"
                      name="academic_details.enrollment_number"
                      value={formData.academic_details?.enrollment_number || ''}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="admission_date">Admission Date</label>
                    <input
                      type="date"
                      id="admission_date"
                      name="academic_details.admission_date"
                      value={parseDateForInput(formData.academic_details?.admission_date) || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="current_semester">Current Semester</label>
                    <input
                      type="number"
                      id="current_semester"
                      name="academic_details.current_semester"
                      value={formData.academic_details?.current_semester || ''}
                      onChange={handleChange}
                      min="1"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="batch_year">Batch Year</label>
                    <input
                      type="number"
                      id="batch_year"
                      name="academic_details.batch_year"
                      value={formData.academic_details?.batch_year || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="section">Section</label>
                    <input
                      type="text"
                      id="section"
                      name="academic_details.section"
                      value={formData.academic_details?.section || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="status">Status</label>
                    <select
                      id="status"
                      name="academic_details.status"
                      value={formData.academic_details?.status || ''}
                      onChange={handleChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Graduated">Graduated</option>
                      <option value="Suspended">Suspended</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'additional' && (
            <div className="form-section">
              <div className="form-grid">
                <div className="form-card">
                  <h3>Identification</h3>
                  <div className="form-group">
                    <label htmlFor="aadhar">Aadhar Number</label>
                    <input
                      type="text"
                      id="aadhar"
                      name="personal_details.aadhar"
                      value={formData.personal_details?.aadhar || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="pan">PAN Number</label>
                    <input
                      type="text"
                      id="pan"
                      name="personal_details.pan"
                      value={formData.personal_details?.pan || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="religion">Religion</label>
                    <input
                      type="text"
                      id="religion"
                      name="personal_details.religion"
                      value={formData.personal_details?.religion || ''}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cast">Caste</label>
                    <input
                      type="text"
                      id="cast"
                      name="personal_details.cast"
                      value={formData.personal_details?.cast || ''}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="cancel-btn"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="save-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-small"></span>
                Saving...
              </>
            ) : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStudentRecord;