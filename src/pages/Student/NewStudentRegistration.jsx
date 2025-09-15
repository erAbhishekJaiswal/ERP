import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../../CSSfolder/StudentCSS/NewStudentRegistration.css";
import apiClient from '../../services/axios';

const StudentRegistration = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    personal_details: {
      first_name: '',
      midname: '',
      last_name: '',
      date_of_birth: '',
      gender: '',
      email: '',
      mobile: '',
      cast: '',
      religion: '',
      aadhar: '',
      abcid: '',
      pan: '',
      address: {
        street: '',
        city: '',
        state: '',
        postal_code: '',
        country: 'India'
      },
      parent_contact: {
        father_name: '',
        father_mobile: '',
        mother_name: '',
        mother_mobile: ''
      }
    },
    academic_details: {
      enrollment_number: '',
      admission_date: '',
      current_semester: 1,
      course_id: '',
      course_name: '',
      department_id: '',
      department_name: '',
      batch_year: new Date().getFullYear(),
      section: 'A',
      status: 'Active'
    },
    classes: [],
    is_active: true
  });

  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [newClass, setNewClass] = useState('');

  useEffect(() => {
    // Fetch courses and departments when component mounts
    const fetchData = async () => {
      try {
        const coursesRes = await apiClient.get('/api/features/getcoursecodenamelist');
        const deptsRes = await apiClient.get('/api/features/getdepartmentname');
        setCourses(coursesRes.data.courseNames);
        console.log(coursesRes.data.courseNames);
        
        setDepartments(deptsRes.data);
        console.log(deptsRes.data);
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Handle address fields (personal_details.address.*)
    if (name.startsWith('address_')) {
      const field = name.replace('address_', '');
      setFormData(prev => ({
        ...prev,
        personal_details: {
          ...prev.personal_details,
          address: {
            ...prev.personal_details.address,
            [field]: value
          }
        }
      }));
    } 
    // Handle parent contact fields (personal_details.parent_contact.*)
    else if (name.startsWith('parent_')) {
      const field = name.replace('parent_', '');
      setFormData(prev => ({
        ...prev,
        personal_details: {
          ...prev.personal_details,
          parent_contact: {
            ...prev.personal_details.parent_contact,
            [field]: value
          }
        }
      }));
    }
    // Handle personal_details fields
    else if (name.startsWith('personal_')) {
      const field = name.replace('personal_', '');
      setFormData(prev => ({
        ...prev,
        personal_details: {
          ...prev.personal_details,
          [field]: value
        }
      }));
    }
    // Handle academic_details fields
    else if (name.includes('academic_')) {
      const field = name.replace('academic_', '');
      setFormData(prev => ({
        ...prev,
        academic_details: {
          ...prev.academic_details,
          [field]: value
        }
      }));
    }
    // Handle direct fields (fallback)
    else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddClass = () => {
    if (newClass.trim()) {
      setFormData(prev => ({
        ...prev,
        classes: [...prev.classes, { class: newClass.trim() }]
      }));
      setNewClass('');
    }
  };

  const handleRemoveClass = (index) => {
    setFormData(prev => ({
      ...prev,
      classes: prev.classes.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update course and department names based on selected IDs
      const selectedCourse = courses.find(c => c._id === formData.academic_details.course_id);
      const selectedDept = departments.find(d => d.id === formData.academic_details.department_id);
      
      const finalFormData = {
        ...formData,
        academic_details: {
          ...formData.academic_details,
          course_name: selectedCourse?.courseName || '',
          department_name: selectedDept?.name || ''
        }
      };

      console.log('Final Form Data:', finalFormData);
      

      const response = await apiClient.post('/api/auth/studentregister', finalFormData);
      console.log('Student registered:', response.data);
      navigate('/admin/allstudentlist');
    } catch (error) {
      console.error('Error registering student:', error.response?.data || error.message);
      alert('Error registering student. Please try again.');
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="registration-container">
      <div className="registration-header">
        <h1>New Student Registration</h1>
        <div className="progress-steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Personal</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Academic</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Review</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="registration-form">
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
                <label>Middle Name</label>
                <input
                  type="text"
                  name="personal_midname"
                  value={formData.personal_details.midname}
                  onChange={handleInputChange}
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
                <label>Date of Birth*</label>
                <input
                  type="date"
                  name="personal_date_of_birth"
                  value={formData.personal_details.date_of_birth}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Gender*</label>
                <select
                  name="personal_gender"
                  value={formData.personal_details.gender}
                  onChange={handleInputChange}
                  required
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
                <label>Mobile Number*</label>
                <input
                  type="tel"
                  name="personal_mobile"
                  value={formData.personal_details.mobile}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{10,15}"
                />
              </div>
              <div className="form-group">
                <label>Religion</label>
                <input
                  type="text"
                  name="personal_religion"
                  value={formData.personal_details.religion}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Caste</label>
                <input
                  type="text"
                  name="personal_cast"
                  value={formData.personal_details.cast}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Aadhar Number</label>
                <input
                  type="text"
                  name="personal_aadhar"
                  value={formData.personal_details.aadhar}
                  onChange={handleInputChange}
                  pattern="[0-9]{12}"
                />
              </div>
              <div className="form-group">
                <label>ABC ID</label>
                <input
                  type="text"
                  name="personal_abcid"
                  value={formData.personal_details.abcid}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>PAN Number</label>
                <input
                  type="text"
                  name="personal_pan"
                  value={formData.personal_details.pan}
                  onChange={handleInputChange}
                  pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
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

            <h3>Parent Contact Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Father's Name</label>
                <input
                  type="text"
                  name="parent_father_name"
                  value={formData.personal_details.parent_contact.father_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Father's Mobile</label>
                <input
                  type="tel"
                  name="parent_father_mobile"
                  value={formData.personal_details.parent_contact.father_mobile}
                  onChange={handleInputChange}
                  pattern="[0-9]{10,15}"
                />
              </div>
              <div className="form-group">
                <label>Mother's Name</label>
                <input
                  type="text"
                  name="parent_mother_name"
                  value={formData.personal_details.parent_contact.mother_name}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Mother's Mobile</label>
                <input
                  type="tel"
                  name="parent_mother_mobile"
                  value={formData.personal_details.parent_contact.mother_mobile}
                  onChange={handleInputChange}
                  pattern="[0-9]{10,15}"
                />
              </div>
            </div>

            <div className="form-actions">
              <button type="button" onClick={nextStep} className="next-button">
                Next: Academic Details
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="form-section">
            <h2>Academic Details</h2>
            <div className="form-grid">
              <div className="form-group">
                <label>Enrollment Number*</label>
                <input
                  type="text"
                  name="academic_enrollment_number"
                  value={formData.academic_details.enrollment_number}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Admission Date</label>
                <input
                  type="date"
                  name="academic_admission_date"
                  value={formData.academic_details.admission_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label>Current Semester*</label>
                <select
                  name="academic_current_semester"
                  value={formData.academic_details.current_semester}
                  onChange={handleInputChange}
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                    <option key={sem} value={sem}>Semester {sem}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Course*</label>
                <select
                  name="academic_course_id"
                  value={formData.academic_details.course_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Course</option>
                  {courses?.map(course => (
                    <option key={course?._id} value={course?._id}>{course?.code} {course?.courseName}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Department*</label>
                <select
                  name="academic_department_id"
                  value={formData.academic_details.department_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Department</option>
                  {departments?.map(dept => (
                    <option key={dept?.id} value={dept?.id}>{dept?.name}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Batch Year*</label>
                <input
                  type="number"
                  name="academic_batch_year"
                  value={formData.academic_details.batch_year}
                  onChange={handleInputChange}
                  required
                  min="2000"
                  max={new Date().getFullYear() + 5}
                />
              </div>
              <div className="form-group">
                <label>Section</label>
                <select
                  name="academic_section"
                  value={formData.academic_details.section}
                  onChange={handleInputChange}
                >
                  {['A', 'B', 'C', 'D'].map(sec => (
                    <option key={sec} value={sec}>Section {sec}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select
                  name="academic_status"
                  value={formData.academic_details.status}
                  onChange={handleInputChange}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Suspended">Suspended</option>
                  <option value="Completed">Completed</option>
                  <option value="Dropped">Dropped</option>
                </select>
              </div>
            </div>

            <h3>Classes</h3>
            <div className="form-group">
              <div className="add-class-control">
                <input
                  type="text"
                  value={newClass}
                  onChange={(e) => setNewClass(e.target.value)}
                  placeholder="Add class (e.g., CSE-5A)"
                />
                <button type="button" onClick={handleAddClass} className="add-button">
                  Add Class
                </button>
              </div>
              <div className="class-tags">
                {formData?.classes?.map((cls, index) => (
                  <span key={index} className="class-tag">
                    {cls.class}
                    <button
                      type="button"
                      onClick={() => handleRemoveClass(index)}
                      className="tag-remove-button"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
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

        {step === 3 && (
          <div className="form-section">
            <h2>Review Information</h2>
            <div className="review-section">
              <h3>Personal Details</h3>
              <div className="review-grid">
                <div>
                  <p><strong>Name:</strong> {`${formData.personal_details.first_name} ${formData.personal_details.midname} ${formData.personal_details.last_name}`}</p>
                  <p><strong>Date of Birth:</strong> {formData.personal_details.date_of_birth}</p>
                  <p><strong>Gender:</strong> {formData.personal_details.gender}</p>
                  <p><strong>Email:</strong> {formData.personal_details.email}</p>
                  <p><strong>Mobile:</strong> {formData.personal_details.mobile}</p>
                </div>
                <div>
                  <p><strong>Religion:</strong> {formData.personal_details.religion}</p>
                  <p><strong>Caste:</strong> {formData.personal_details.cast}</p>
                  <p><strong>Aadhar:</strong> {formData.personal_details.aadhar}</p>
                  <p><strong>PAN:</strong> {formData.personal_details.pan}</p>
                </div>
              </div>

              <h3>Address</h3>
              <p>
                {formData.personal_details.address.street}, {formData.personal_details.address.city},<br />
                {formData.personal_details.address.state}, {formData.personal_details.address.postal_code},<br />
                {formData.personal_details.address.country}
              </p>

              <h3>Parent Contact</h3>
              <div className="review-grid">
                <div>
                  <p><strong>Father's Name:</strong> {formData.personal_details.parent_contact.father_name}</p>
                  <p><strong>Father's Mobile:</strong> {formData.personal_details.parent_contact.father_mobile}</p>
                </div>
                <div>
                  <p><strong>Mother's Name:</strong> {formData.personal_details.parent_contact.mother_name}</p>
                  <p><strong>Mother's Mobile:</strong> {formData.personal_details.parent_contact.mother_mobile}</p>
                </div>
              </div>

              <h3>Academic Details</h3>
              <div className="review-grid">
                <div>
                  <p><strong>Enrollment Number:</strong> {formData.academic_details.enrollment_number}</p>
                  <p><strong>Admission Date:</strong> {formData.academic_details.admission_date}</p>
                  <p><strong>Current Semester:</strong> {formData.academic_details.current_semester}</p>
                  <p><strong>Batch Year:</strong> {formData.academic_details.batch_year}</p>
                </div>
                <div>
                  <p><strong>Course:</strong> {courses.find(c => c._id === formData.academic_details.course_id)?.courseName || 'Not selected'}</p>
                  <p><strong>Department:</strong> {departments.find(d => d.id === formData.academic_details.department_id)?.name || 'Not selected'}</p>
                  <p><strong>Section:</strong> {formData.academic_details.section}</p>
                  <p><strong>Status:</strong> {formData.academic_details.status}</p>
                </div>
              </div>

              {formData.classes.length > 0 && (
                <>
                  <h3>Classes</h3>
                  <div className="class-tags">
                    {formData.classes.map((cls, index) => (
                      <span key={index} className="class-tag">
                        {cls.class}
                      </span>
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
                Register Student
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default StudentRegistration;