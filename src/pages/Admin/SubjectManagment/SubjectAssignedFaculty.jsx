import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './subjectcss/FacultyAssignment.css';
import axios from 'axios';
import apiClient from '../../../services/axios';
// import './FacultyAssignment.css';

const FacultyAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [subject, setSubject] = useState({
    _id: '',
    code: '',
    name: '',
    faculty: { facultyId: '' }
  });
  const [faculties, setFaculties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch subject data
        const subjectResponse = await apiClient.get(`/api/features/getSubjectNameCodefacultybyId/${id}`);
        setSubject(subjectResponse.data);
        console.log(subjectResponse.data);
        
        // Fetch all faculties
        const response = await apiClient.get('/api/faculty/allfacultyname');
        console.log(response.data);
        setFaculties(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleFacultyChange = (e) => {
    const facultyId = e.target.value;
    setSubject({
      ...subject,
      faculty: { facultyId }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/features/addfaculty/${id}`, {facultyId: subject.faculty.facultyId})
      if (response.status === 200) {
        navigate(`/admin/subjectdetail/${id}`);
      } else {
        throw new Error('Failed to update faculty assignment');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
//   if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="faculty-assignment-container">
      <div className="header">
        <h1>Assign Faculty to Subject</h1>
        <button onClick={() => navigate(`/subjects/${id}`)} className="back-button">
          Back to Subject
        </button>
      </div>

      <div className="subject-info">
        <h2>{subject.code} - {subject.name}</h2>
        <p>Current Faculty: {subject.faculty?.faculty_name || 'Not assigned'}</p>
      </div>

      <form onSubmit={handleSubmit} className="faculty-form">
        <div className="form-group">
          <label htmlFor="faculty">Select Faculty:</label>
          <select
            id="faculty"
            value={subject.faculty?.facultyId || ''}
            onChange={handleFacultyChange}
            required
          >
            <option value="">-- Select a faculty --</option>
            {faculties?.map((faculty) => (
              <option key={faculty._id} value={faculty._id}>
                {faculty.personal_details.first_name} {faculty.personal_details.last_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="save-button">
            Save Assignment
          </button>
          <button
            type="button"
            onClick={() => navigate(`/subjects/${id}`)}
            className="cancel-button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FacultyAssignment;