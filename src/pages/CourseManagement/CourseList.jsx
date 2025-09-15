import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../CSSfolder/CourseCSS/CourseList.css';
import apiClient from '../../services/axios';

const CourseList = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState({ show: false, courseId: null });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await apiClient.get('/api/features/courselist');
        console.log(response.data.allCourse);
        
        setCourses(response.data.allCourse);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch courses');
        setLoading(false);
        console.error(err);
      }
    };
    fetchCourses();
  }, []);

  const handleDelete = async () => {
    try {
      await apiClient.delete(`/api/features/coursedelete/${deleteModal.courseId}`);
      setCourses(courses.filter(course => course._id !== deleteModal.courseId));
      setDeleteModal({ show: false, courseId: null });
    } catch (err) {
      setError('Failed to delete course');
      console.error(err);
    }
  };

  const filteredCourses = courses.filter(course =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="course-list-container">
      <div className="course-list-header">
        <h1>Course Management</h1>
        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          <button onClick={() => navigate('/admin/createcourse')} className="add-button">
            Add New Course
          </button>
        </div>
      </div>

      <div className="course-table">
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Course Name</th>
              <th>Credits</th>
              <th>Fee</th>
              <th>Semester</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses?.length > 0 ? (
              filteredCourses?.map(course => (
                <tr key={course?._id}>
                  <td>{course?.code}</td>
                  <td>{course?.courseName}</td>
                  <td>{course?.credits}</td>
                  <td>{course?.fee}</td>
                  <td>{course?.semester}</td>
                  <td>
                    <span className={getStatusBadge(course?.status)}>
                      {course?.status}
                    </span>
                  </td>
                  <td className="actions">
                    <button
                      onClick={() => navigate(`/admin/coursedetail/${course?._id}`)}
                      className="view-button"
                    >
                      View
                    </button>
                    <button
                      onClick={() => navigate(`/admin/courseedit/${course?._id}`)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteModal({ show: true, courseId: course._id })}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="no-results">
                  No courses found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteModal?.show && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this course? This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                onClick={() => setDeleteModal({ show: false, courseId: null })}
                className="cancel-button"
              >
                Cancel
              </button>
              <button onClick={handleDelete} className="confirm-delete-button">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;