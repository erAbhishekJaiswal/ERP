import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../CSSfolder/FacultyCSS/NewFacultyRegistration.css';
import apiClient from '../../services/axios';

const FacultyRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [departments, setDepartments] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    personal_details: {
      first_name: '',
      last_name: '',
      date_of_birth: '',
      gender: '',
      email: '',
      mobile: '',
      address: {
        street: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'India'
      }
    },
    employment: {
      joining_date: '',
      is_active: true,
      qualifications: [],
      bio: '',
      profile_picture_url: ''
    },
    departments: [],
    subjects: [],
    designation: '',
    courses: [],
    research_interests: [],
    publications: []
  });
  const [newQualification, setNewQualification] = useState('');
  const [newResearchInterest, setNewResearchInterest] = useState('');
  const [newPublication, setNewPublication] = useState({
    title: '',
    type: '',
    venue: '',
    date: '',
    doi: '',
    co_authors: []
  });
  const [newCoAuthor, setNewCoAuthor] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [deptResponse, subjResponse, desgResponse] = await Promise.all([
          apiClient.get('http://localhost:5000/api/features/getDepartmentlist'),
          apiClient.get('http://localhost:5000/api/features/subjectcodenamelist'),
          apiClient.get('http://localhost:5000/api/features/getdesignationname')
        ]);
        
        setDepartments(deptResponse.data.departments || []);
        setSubjects(subjResponse.data.subjectNames || []);
        setDesignations(desgResponse.data.designations || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;

    if (name.startsWith('personal_')) {
      const field = name.replace('personal_', '');
      setFormData(prev => ({
        ...prev,
        personal_details: {
          ...prev.personal_details,
          [field]: inputValue
        }
      }));
    } 
    else if (name.startsWith('address_')) {
      const field = name.replace('address_', '');
      setFormData(prev => ({
        ...prev,
        personal_details: {
          ...prev.personal_details,
          address: {
            ...prev.personal_details.address,
            [field]: inputValue
          }
        }
      }));
    }
    else if (name.startsWith('employment_')) {
      const field = name.replace('employment_', '');
      setFormData(prev => ({
        ...prev,
        employment: {
          ...prev.employment,
          [field]: inputValue
        }
      }));
    }
    else {
      setFormData(prev => ({
        ...prev,
        [name]: inputValue
      }));
    }
  };

  const handleAddQualification = () => {
    if (newQualification.trim()) {
      setFormData(prev => ({
        ...prev,
        employment: {
          ...prev.employment,
          qualifications: [...prev.employment.qualifications, newQualification.trim()]
        }
      }));
      setNewQualification('');
    }
  };

  const handleAddResearchInterest = () => {
    if (newResearchInterest.trim()) {
      setFormData(prev => ({
        ...prev,
        research_interests: [...prev.research_interests, newResearchInterest.trim()]
      }));
      setNewResearchInterest('');
    }
  };

  const handleAddCoAuthor = () => {
    if (newCoAuthor.trim()) {
      setNewPublication(prev => ({
        ...prev,
        co_authors: [...prev.co_authors, newCoAuthor.trim()]
      }));
      setNewCoAuthor('');
    }
  };

  const handleAddPublication = () => {
    if (newPublication.title.trim()) {
      setFormData(prev => ({
        ...prev,
        publications: [...prev.publications, newPublication]
      }));
      setNewPublication({
        title: '',
        type: '',
        venue: '',
        date: '',
        doi: '',
        co_authors: []
      });
    }
  };

  const handleDepartmentSelect = (deptId) => {
    setFormData(prev => ({
      ...prev,
      departments: prev.departments.includes(deptId)
        ? prev.departments.filter(id => id !== deptId)
        : [...prev.departments, deptId]
    }));
  };

  const handleSubjectSelect = (subjectId) => {
    setFormData(prev => ({
      ...prev,
      subjects: prev.subjects.includes(subjectId)
        ? prev.subjects.filter(id => id !== subjectId)
        : [...prev.subjects, subjectId]
    }));
  };

  const handleCourseSelect = (courseId) => {
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.includes(courseId)
        ? prev.courses.filter(id => id !== courseId)
        : [...prev.courses, courseId]
    }));
  };

  const handleRemoveItem = (arrayName, index) => {
    setFormData(prev => {
      const newArray = [...prev[arrayName]];
      newArray.splice(index, 1);
      return {
        ...prev,
        [arrayName]: newArray
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add designation name to the form data before submission
      const selectedDesignation = designations.find(d => d._id === formData.designation);
      const submissionData = {
        ...formData,
        designation_name: selectedDesignation?.title || ''
      };

      console.log('submissionData:', submissionData);
      

      const response = await apiClient.post('/api/auth/facultyregister', submissionData);
      console.log('Faculty registered:', response.data);
      navigate('/admin/facultylist');
    } catch (error) {
      console.error('Error registering faculty:', error.response?.data || error.message);
      alert('Error registering faculty. Please try again.');
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="faculty-registration-container">
      <div className="faculty-registration-header">
        <h1>New Faculty Registration</h1>
        <div className="progress-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Personal</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Employment</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Academic</div>
          <div className={`step ${step >= 4 ? 'active' : ''}`}>4. Review</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="faculty-registration-form">
        {step === 1 && (
          <div className="form-section">
            <h2>Personal Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>First Name*</label>
                <input
                  type="text"
                  name="personal_first_name"
                  value={formData.personal_details.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Last Name*</label>
                <input
                  type="text"
                  name="personal_last_name"
                  value={formData.personal_details.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="personal_date_of_birth"
                  value={formData.personal_details.date_of_birth}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select
                  name="personal_gender"
                  value={formData.personal_details.gender}
                  onChange={handleInputChange}
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Email*</label>
                <input
                  type="email"
                  name="personal_email"
                  value={formData.personal_details.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Mobile</label>
                <input
                  type="tel"
                  name="personal_mobile"
                  value={formData.personal_details.mobile}
                  onChange={handleInputChange}
                  pattern="[0-9]{10,15}"
                />
              </div>
            </div>

            <h3>Address Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Street</label>
                <input
                  type="text"
                  name="address_street"
                  value={formData.personal_details.address.street}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="address_city"
                  value={formData.personal_details.address.city}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="address_state"
                  value={formData.personal_details.address.state}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="address_postal_code"
                  value={formData.personal_details.address.postal_code}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="address_country"
                  value={formData.personal_details.address.country}
                  onChange={handleInputChange}
                  disabled
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={nextStep} className="next-button">
                Next: Employment Details
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-section">
            <h2>Employment Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Joining Date</label>
                <input
                  type="date"
                  name="employment_joining_date"
                  value={formData.employment.joining_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group checkbox-group">
                <label>
                  <input
                    type="checkbox"
                    name="employment_is_active"
                    checked={formData.employment.is_active}
                    onChange={handleInputChange}
                  />
                  Currently Active
                </label>
              </div>
              <div className="form-group">
                <label>Designation*</label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Designation</option>
                  {designations.map(desg => (
                    <option key={desg._id} value={desg._id}>{desg.title}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Profile Picture URL</label>
                <input
                  type="text"
                  name="employment_profile_picture_url"
                  value={formData.employment.profile_picture_url}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <h3>Qualifications</h3>
            <div className="form-group">
              <div className="add-item-control">
                <input
                  type="text"
                  value={newQualification}
                  onChange={(e) => setNewQualification(e.target.value)}
                  placeholder="Add qualification (e.g., Ph.D in Computer Science)"
                />
                <button type="button" onClick={handleAddQualification} className="add-button">
                  Add
                </button>
              </div>
              <ul className="item-list">
                {formData.employment.qualifications.map((qual, index) => (
                  <li key={index}>
                    {qual}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('employment.qualifications', index)}
                      className="remove-button"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                name="employment_bio"
                value={formData.employment.bio}
                onChange={handleInputChange}
                rows="4"
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={prevStep} className="prev-button">
                Back
              </button>
              <button type="button" onClick={nextStep} className="next-button">
                Next: Academic Details
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="form-section">
            <h2>Academic Details</h2>
            
            <h3>Departments</h3>
            <div className="checkbox-grid">
              {departments.map(dept => (
                <div key={dept._id} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`dept-${dept._id}`}
                    checked={formData.departments.includes(dept._id)}
                    onChange={() => handleDepartmentSelect(dept._id)}
                  />
                  <label htmlFor={`dept-${dept._id}`}>{dept.name}</label>
                </div>
              ))}
            </div>

            <h3>Subjects</h3>
            <div className="checkbox-grid">
              {subjects.map(subject => (
                <div key={subject._id} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`subject-${subject._id}`}
                    checked={formData.subjects.includes(subject._id)}
                    onChange={() => handleSubjectSelect(subject._id)}
                  />
                  <label htmlFor={`subject-${subject._id}`}>{subject.name}</label>
                </div>
              ))}
            </div>

            <h3>Research Interests</h3>
            <div className="form-group">
              <div className="add-item-control">
                <input
                  type="text"
                  value={newResearchInterest}
                  onChange={(e) => setNewResearchInterest(e.target.value)}
                  placeholder="Add research interest"
                />
                <button type="button" onClick={handleAddResearchInterest} className="add-button">
                  Add
                </button>
              </div>
              <div className="tag-container">
                {formData.research_interests.map((interest, index) => (
                  <span key={index} className="tag">
                    {interest}
                    <button
                      type="button"
                      onClick={() => handleRemoveItem('research_interests', index)}
                      className="tag-remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <h3>Publications</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Title*</label>
                <input
                  type="text"
                  value={newPublication.title}
                  onChange={(e) => setNewPublication({...newPublication, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Type</label>
                <input
                  type="text"
                  value={newPublication.type}
                  onChange={(e) => setNewPublication({...newPublication, type: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Venue</label>
                <input
                  type="text"
                  value={newPublication.venue}
                  onChange={(e) => setNewPublication({...newPublication, venue: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Date</label>
                <input
                  type="date"
                  value={newPublication.date}
                  onChange={(e) => setNewPublication({...newPublication, date: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>DOI</label>
                <input
                  type="text"
                  value={newPublication.doi}
                  onChange={(e) => setNewPublication({...newPublication, doi: e.target.value})}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Co-Authors</label>
              <div className="add-item-control">
                <input
                  type="text"
                  value={newCoAuthor}
                  onChange={(e) => setNewCoAuthor(e.target.value)}
                  placeholder="Add co-author name"
                />
                <button type="button" onClick={handleAddCoAuthor} className="add-button">
                  Add
                </button>
              </div>
              <div className="tag-container">
                {newPublication.co_authors.map((author, index) => (
                  <span key={index} className="tag">
                    {author}
                    <button
                      type="button"
                      onClick={() => setNewPublication({
                        ...newPublication,
                        co_authors: newPublication.co_authors.filter((_, i) => i !== index)
                      })}
                      className="tag-remove"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button 
              type="button" 
              onClick={handleAddPublication} 
              className="add-publication-button"
              disabled={!newPublication.title.trim()}
            >
              Add Publication
            </button>

            <div className="publications-list">
              {formData.publications.map((pub, index) => (
                <div key={index} className="publication-card">
                  <h4>{pub.title}</h4>
                  <p><strong>Type:</strong> {pub.type}</p>
                  <p><strong>Venue:</strong> {pub.venue}</p>
                  <p><strong>Date:</strong> {pub.date}</p>
                  <p><strong>DOI:</strong> {pub.doi}</p>
                  {pub.co_authors.length > 0 && (
                    <p><strong>Co-Authors:</strong> {pub.co_authors.join(', ')}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveItem('publications', index)}
                    className="remove-button"
                  >
                    Remove Publication
                  </button>
                </div>
              ))}
            </div>

            <div className="form-actions">
              <button type="button" onClick={prevStep} className="prev-button">
                Back
              </button>
              <button type="button" onClick={nextStep} className="next-button">
                Next: Review
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="form-section">
            <h2>Review Information</h2>
            <div className="review-section">
              <h3>Personal Details</h3>
              <div className="review-grid">
                <div>
                  <p><strong>Name:</strong> {`${formData.personal_details.first_name} ${formData.personal_details.last_name}`}</p>
                  <p><strong>Date of Birth:</strong> {formData.personal_details.date_of_birth || 'Not specified'}</p>
                  <p><strong>Gender:</strong> {formData.personal_details.gender || 'Not specified'}</p>
                </div>
                <div>
                  <p><strong>Email:</strong> {formData.personal_details.email}</p>
                  <p><strong>Mobile:</strong> {formData.personal_details.mobile || 'Not specified'}</p>
                </div>
              </div>

              <h3>Address</h3>
              <p>
                {formData.personal_details.address.street || 'Not specified'}, {formData.personal_details.address.city || 'Not specified'},<br />
                {formData.personal_details.address.state || 'Not specified'}, {formData.personal_details.address.postal_code || 'Not specified'},<br />
                {formData.personal_details.address.country}
              </p>

              <h3>Employment Details</h3>
              <div className="review-grid">
                <div>
                  <p><strong>Joining Date:</strong> {formData.employment.joining_date || 'Not specified'}</p>
                  <p><strong>Status:</strong> {formData.employment.is_active ? 'Active' : 'Inactive'}</p>
                  <p><strong>Designation:</strong> {
                    designations.find(d => d._id === formData.designation)?.title || 'Not specified'
                  }</p>
                </div>
                <div>
                  <p><strong>Profile Picture:</strong> {formData.employment.profile_picture_url || 'Not specified'}</p>
                </div>
              </div>

              {formData.employment.qualifications.length > 0 && (
                <>
                  <h3>Qualifications</h3>
                  <ul>
                    {formData.employment.qualifications.map((qual, index) => (
                      <li key={index}>{qual}</li>
                    ))}
                  </ul>
                </>
              )}

              {formData.employment.bio && (
                <>
                  <h3>Bio</h3>
                  <p>{formData.employment.bio}</p>
                </>
              )}

              {formData.departments.length > 0 && (
                <>
                  <h3>Departments</h3>
                  <div className="tag-container">
                    {formData.departments.map(deptId => {
                      const dept = departments.find(d => d._id === deptId);
                      return dept ? (
                        <span key={dept._id} className="tag">{dept.name}</span>
                      ) : null;
                    })}
                  </div>
                </>
              )}

              {formData.subjects.length > 0 && (
                <>
                  <h3>Subjects</h3>
                  <div className="tag-container">
                    {formData.subjects.map(subjId => {
                      const subject = subjects.find(s => s._id === subjId);
                      return subject ? (
                        <span key={subject._id} className="tag">{subject.name}</span>
                      ) : null;
                    })}
                  </div>
                </>
              )}

              {formData.research_interests.length > 0 && (
                <>
                  <h3>Research Interests</h3>
                  <div className="tag-container">
                    {formData.research_interests.map((interest, index) => (
                      <span key={index} className="tag">{interest}</span>
                    ))}
                  </div>
                </>
              )}

              {formData.publications.length > 0 && (
                <>
                  <h3>Publications</h3>
                  <div className="publications-list">
                    {formData.publications.map((pub, index) => (
                      <div key={index} className="publication-card">
                        <h4>{pub.title}</h4>
                        <p><strong>Type:</strong> {pub.type || 'Not specified'}</p>
                        <p><strong>Venue:</strong> {pub.venue || 'Not specified'}</p>
                        <p><strong>Date:</strong> {pub.date || 'Not specified'}</p>
                        <p><strong>DOI:</strong> {pub.doi || 'Not specified'}</p>
                        {pub.co_authors.length > 0 && (
                          <p><strong>Co-Authors:</strong> {pub.co_authors.join(', ')}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="form-actions">
              <button type="button" onClick={prevStep} className="prev-button">
                Back
              </button>
              <button type="submit" className="submit-button">
                Register Faculty
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default FacultyRegistration;