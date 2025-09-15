import React from 'react';
import { useEffect, useState } from 'react';
import './subjectcss/SubjectDetail.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../../services/axios';
// import './SubjectDetail.css';

const SubjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(`Subject ID from URL: ${id}`);
  const [subjectData, setSubjectData] = useState();
  const [facultyName, setFacultyName] = useState("null");
  // const [studentscount, setStudentscount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchSubjectData = async () => {
    try {
      const res = await apiClient.get(`/api/features/subject/${id}`);
      console.log(res.data.getsubject);
      setSubjectData(res.data.getsubject);
      setFacultyName(res.data.Subject_facultyName);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching subject data:", error);
    }
  }

  useEffect(() => {
    fetchSubjectData(); 
  }, []);

  const handleDelete = async () => {
    try {
      const res = await apiClient.delete(`/api/features/subjectdelete/${id}`);
      alert(res.data.message);
      navigate('/admin/subjectslist'); // Redirect to the subject list page after deletion
      console.log(`Deleting subject with ID: ${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="subject-detail-container">
      {loading && <div>Loading...</div>}
      { 
        subjectData && <>
      <div className="subject-header">
        <div className="subject-code-delete-box">
        <div className="subject-code-badge">
          Subject Code: {subjectData?.code}
        </div>
        <div className="subject-delete-edit-button">
        <button className="students-add-btn" onClick={() => navigate(`/admin/subject/${subjectData?._id}`)}>Add Students</button>
          <button className="edit-delete-btn" onClick={() => navigate(`/admin/editsubject/${subjectData?._id}`)}>Edit Subject</button>
          <button className="subject-delete-btn" onClick={() => handleDelete()}>Delete Subject</button>
        </div>
        </div>
        <h1>{subjectData?.name}</h1>
        <div className="subject-meta">
          <span className="badge credit-badge">{subjectData?.credits} Credits</span>
          <span className="badge semester-badge">Semester {subjectData?.semester}</span>
          <span className="badge year-badge">{subjectData?.academic_year}</span>
          <span className={`badge status-badge ${subjectData?.is_active ? 'active' : 'inactive'}`}>
            {subjectData?.is_active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>

      <div className="detail-subject-content">
        <div className="subject-card overview-card">
          <h2>Overview</h2>
          <p>{subjectData?.description}</p>
          
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Department</span>
              <span className="info-value">{subjectData?.department?.department_name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Faculty</span>
              <span className="info-value">{facultyName? facultyName : <><button className="faculty-add-button" onClick={()=>navigate(`/admin/subjectassignedfaculty/${subjectData?._id}`)}>Add Faculty</button></>}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Enrolled Students</span>
              <div className="classes-list">
               {subjectData?.studentsEnrolled.length> 0 ? subjectData?.studentsEnrolled.length :"No Students Enrolled"}
              <Link className="enrolledlist-btn" to={`/admin/enrolledstudentlist/${subjectData?._id}`}>View Students</Link>
              </div>
            </div>
            <div className="info-item">
              <span className="info-label">Classes</span>
              <div className="classes-list">
                {subjectData?.classes.map((cls, index) => (
                  <span key={index} className="class-badge">{cls?.class}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="subject-card syllabus-card">
          <h2>Syllabus</h2>
          <ul className="syllabus-list">
            {subjectData?.syllabus.map((item, index) => (
              <li key={index}>
                <span className="syllabus-number">{index + 1}.</span>
                <span className="syllabus-item">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="subject-card schedule-card">
          <h2>Class Schedule</h2>
          <table className="schedule-table">
            <thead className="schedule-header">
              <tr>
              <th>Day</th>
              <th>Time</th>
              <th>Room</th>
              </tr>
            </thead>
            <tbody className="schedule-row-container">
            {subjectData?.schedule?.map((slot, index) => (
              <tr className="schedule-row" key={index}>
                <td>{slot?.day}</td>
                <td>{slot?.time}</td>
                <td>{slot?.room}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div></>}
     
    </div>
  );
};

export default SubjectDetail;