import React, { useEffect, useState } from 'react';
import "../../CSSfolder/StudentCSS/studentprofile.css";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import apiClient from '../../services/axios';

const StudentProfile = () => {

    const {id} = useParams()
    const [loading,setloading] = useState (true)
    const [studentData,setStudentData] = useState()
    const fatchstudentdata = async () =>{
        try {
            const res = await apiClient.get(`/api/student/${id}`);
            // console.log(res.data);
            setStudentData(res.data)
            setloading(false)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fatchstudentdata()
    },[])
const [activeTab, setActiveTab] = useState('personal');
  
  // Helper functions for error handling
  const getValue = (obj, path, defaultValue = 'N/A') => {
    const keys = path.split('.');
    let result = obj;
    for (const key of keys) {
      if (!result || !result.hasOwnProperty(key)) return defaultValue;
      result = result[key];
    }
    return result || defaultValue;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Extract data with fallbacks
  const personalDetails = getValue(studentData, 'personal_details', {});
  const academicDetails = getValue(studentData, 'academic_details', {});
  const address = getValue(personalDetails, 'address', {});
  const parentContact = getValue(personalDetails, 'parent_contact', {});
  const currentSubject = getValue(studentData, 'subjects.0', {});
  const subjectDetails = getValue(currentSubject, 'subject_id', {});

  if(loading){
    return (
        <h2>Loading...</h2>
    )
  }

  return (
    <div className="student-profile-container">
      {/* Header Section */}
      <div className="profile-header">
        <div className="avatar">
          {getValue(personalDetails, 'first_name', '').charAt(0)}
          {getValue(personalDetails, 'last_name', '').charAt(0)}
        </div>
        <div className="header-info">
          <h1>
            {getValue(personalDetails, 'first_name', '')} 
            {getValue(personalDetails, 'midname', '') && ` ${getValue(personalDetails, 'midname', '')}`} 
            {getValue(personalDetails, 'last_name', '') && ` ${getValue(personalDetails, 'last_name', '')}`}
          </h1>
          <p className="enrollment">{getValue(academicDetails, 'enrollment_number', 'No enrollment number')}</p>
          <div className="status-badge">
            {getValue(academicDetails, 'status', 'Unknown')}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="profile-tabs">
        <button 
          className={`tab-button ${activeTab === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          Personal Information
        </button>
        <button 
          className={`tab-button ${activeTab === 'academic' ? 'active' : ''}`}
          onClick={() => setActiveTab('academic')}
        >
          Academic Information
        </button>
        <button 
          className={`tab-button ${activeTab === 'additional' ? 'active' : ''}`}
          onClick={() => setActiveTab('additional')}
        >
          Additional Information
        </button>
      </div>

      {/* Tab Content */}
      <div className="tab-content">
        {/* Personal Information Tab */}
        {activeTab === 'personal' && (
          <div className="profile-section">
            <div className="section-grid">
              <div className="info-card">
                <h3>Basic Details</h3>
                <div className="info-item">
                  <span className="label">Date of Birth:</span>
                  <span className="value">{formatDate(getValue(personalDetails, 'date_of_birth'))}</span>
                </div>
                <div className="info-item">
                  <span className="label">Gender:</span>
                  <span className="value">{getValue(personalDetails, 'gender')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Email:</span>
                  <span className="value">{getValue(personalDetails, 'email')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Mobile:</span>
                  <span className="value">{getValue(personalDetails, 'mobile')}</span>
                </div>
              </div>

              <div className="info-card">
                <h3>Address</h3>
                <div className="info-item">
                  <span className="label">Street:</span>
                  <span className="value">{getValue(address, 'street')}</span>
                </div>
                <div className="info-item">
                  <span className="label">City:</span>
                  <span className="value">{getValue(address, 'city')}</span>
                </div>
                <div className="info-item">
                  <span className="label">State:</span>
                  <span className="value">{getValue(address, 'state')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Postal Code:</span>
                  <span className="value">{getValue(address, 'postal_code')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Country:</span>
                  <span className="value">{getValue(address, 'country')}</span>
                </div>
              </div>

              <div className="info-card">
                <h3>Parent Contact</h3>
                <div className="info-item">
                  <span className="label">Father's Name:</span>
                  <span className="value">{getValue(parentContact, 'father_name')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Father's Mobile:</span>
                  <span className="value">{getValue(parentContact, 'father_mobile')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Mother's Name:</span>
                  <span className="value">{getValue(parentContact, 'mother_name')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Mother's Mobile:</span>
                  <span className="value">{getValue(parentContact, 'mother_mobile')}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Academic Information Tab */}
        {activeTab === 'academic' && (
          <div className="profile-section">
            <div className="section-grid">
              <div className="info-card">
                <h3>Current Status</h3>
                <div className="info-item">
                  <span className="label">Admission Date:</span>
                  <span className="value">{formatDate(getValue(academicDetails, 'admission_date'))}</span>
                </div>
                <div className="info-item">
                  <span className="label">Current Semester:</span>
                  <span className="value">{getValue(academicDetails, 'current_semester')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Batch Year:</span>
                  <span className="value">{getValue(academicDetails, 'batch_year')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Section:</span>
                  <span className="value">{getValue(academicDetails, 'section')}</span>
                </div>
              </div>

              <div className="info-card">
                <h3>Current Course</h3>
                <div className="info-item">
                  <span className="label">Course Name:</span>
                  <span className="value">{getValue(academicDetails, 'course_id.courseName')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Course Code:</span>
                  <span className="value">{getValue(academicDetails, 'course_id.coursecode')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Credits:</span>
                  <span className="value">{getValue(academicDetails, 'course_id.credits')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Instructor:</span>
                  <span className="value">{getValue(academicDetails, 'course_id.facultyName')}</span>
                </div>
              </div>

              <div className="info-card">
                <h3>Current Subject</h3>
                <div className="info-item">
                  <span className="label">Subject Name:</span>
                  <span className="value">{getValue(subjectDetails, 'name')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Subject Code:</span>
                  <span className="value">{getValue(subjectDetails, 'code')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Credits:</span>
                  <span className="value">{getValue(subjectDetails, 'credits')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Instructor:</span>
                  <span className="value">{getValue(subjectDetails, 'faculty.facultyId')}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Additional Information Tab */}
        {activeTab === 'additional' && (
          <div className="profile-section">
            <div className="section-grid">
              <div className="info-card">
                <h3>Identification</h3>
                <div className="info-item">
                  <span className="label">Aadhar Number:</span>
                  <span className="value">{getValue(personalDetails, 'aadhar')}</span>
                </div>
                <div className="info-item">
                  <span className="label">PAN Number:</span>
                  <span className="value">{getValue(personalDetails, 'pan')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Religion:</span>
                  <span className="value">{getValue(personalDetails, 'religion')}</span>
                </div>
                <div className="info-item">
                  <span className="label">Caste:</span>
                  <span className="value">{getValue(personalDetails, 'cast')}</span>
                </div>
              </div>

              <div className="info-card">
                <h3>System Information</h3>
                <div className="info-item">
                  <span className="label">Account Created:</span>
                  <span className="value">{formatDate(getValue(studentData, 'createdAt'))}</span>
                </div>
                <div className="info-item">
                  <span className="label">Last Updated:</span>
                  <span className="value">{formatDate(getValue(studentData, 'updatedAt'))}</span>
                </div>
                <div className="info-item">
                  <span className="label">Account Status:</span>
                  <span className="value">{getValue(studentData, 'is_active') ? 'Active' : 'Inactive'}</span>
                </div>
              </div>

              {subjectDetails.syllabus && (
                <div className="info-card syllabus-card">
                  <h3>Current Subject Syllabus</h3>
                  <ul>
                    {subjectDetails.syllabus.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;