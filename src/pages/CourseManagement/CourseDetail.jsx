import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../CSSfolder/CourseCSS/CourseDetail.css';
import apiClient from '../../services/axios';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    console.log(id);
    
    const fetchCourse = async () => {
      try {
        const response = await apiClient.get(`/api/features/course/${id}`);
        console.log(response.data.coursedata);
        if (!response.data.coursedata === undefined) {
          setCourse(response.data.getCourse);
        }
        setCourse(response.data.coursedata);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch course details');
        setLoading(false);
        console.error(err);
      }
    };
    fetchCourse();
  }, [id]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return 'status-badge approved';
      case 'completed':
        return 'status-badge completed';
      default:
        return 'status-badge pending';
    }
  };

  if (loading) return <div className="loading">Loading course details...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!course) return <div className="not-found">Course not found</div>;

  return (
    <div className="course-detail-container">
      <div className="course-detail-header">
        <h1>{course.courseName} ({course.code})</h1>
        <div className="header-actions">
          <button onClick={() => navigate(`/admin/courseedit/${id}`)} className="edit-button">
            Edit Course
          </button>
          <button onClick={() => navigate('/admin/courselist')} className="back-button">
            Back to Courses
          </button>
        </div>
      </div>

      <div className="course-detail-content">
        <div className="course-card">
          <div className="course-info">
            <div className="info-row">
              <span className="label">Course Code:</span>
              <span className="value">{course?.code}</span>
            </div>
            <div className="info-row">
              <span className="label">Status:</span>
              <span className={getStatusBadge(course?.status)}>
                {course?.status}
              </span>
            </div>
            <div className="info-row">
              <span className="label">Credits:</span>
              <span className="value">{course?.credits}</span>
            </div>
            <div className="info-row">
              <span className="label">Fee:</span>
              <span className="value">{course?.fee}</span>
            </div>
            <div className="info-row">
              <span className="label">Semester:</span>
              <span className="value">{course?.semester}</span>
            </div>
            <div className="info-row">
              <span className="label">Academic Year:</span>
              <span className="value">{course?.academic_year}</span>
            </div>
          </div>

          <div className="course-description">
            <h3>Description</h3>
            <p>{course?.description}</p>
          </div>
        </div>

        <div className="related-sections">
          <div className="departments-section">
            <h3>Departments</h3>
            {course?.departments[0] !== null && course?.departments.length > 0  ? (
              <ul className="department-list">
                {course?.departments?.map(dept => (
                  <li key={dept?._id}>{dept?.name}</li>
                ))}
              </ul>
            ) : (
              <p>No departments assigned</p>
            )}
          </div>

          <div className="faculty-section">
            <h3>Assigned Faculty</h3>
            {course?.facultyAssigned && course?.facultyAssigned?.length > 0 ? (
              <ul className="faculty-list">
                {course?.facultyAssigned?.map(faculty => (
                  <li key={faculty._id}>
                    {faculty?.personal_details?.first_name} {faculty?.personal_details?.last_name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No faculty assigned</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;