import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../../../services/axios';

const BulkEnrollment = () => {
  const { subjectId } = useParams();
  const [studentIds, setStudentIds] = useState('');
  const [loading, setLoading] = useState(false);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  useEffect(() => {
    const fetchAvailableStudents = async () => {
      try {
        const response = await apiClient.get('/api/student/list');
        setAvailableStudents(response.data);
      } catch (error) {
        toast.error('Error fetching available students');
      }
    };
    
    fetchAvailableStudents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await apiClient.post(`/api/subjects/${subjectId}/students/bulk`, {
        studentIds: studentIds.split(',').map(id => id.trim())
      });
      
      toast.success(`${response.data.enrolledCount} students enrolled successfully`);
      setStudentIds('');
      setSelectedStudents([]);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Error enrolling students');
    } finally {
      setLoading(false);
    }
  };

  const handleStudentSelect = (studentId) => {
    if (selectedStudents.includes(studentId)) {
      setSelectedStudents(prev => prev.filter(id => id !== studentId));
    } else {
      setSelectedStudents(prev => [...prev, studentId]);
    }
  };

  return (
    <div className="bulk-enrollment-container">
      <div className="card">
        <h2 className="card-title">Bulk Student Enrollment</h2>
        
        <form onSubmit={handleSubmit} className="bulk-form">
          <div className="form-group">
            <label>Student IDs (comma separated):</label>
            <textarea
              value={studentIds}
              onChange={(e) => setStudentIds(e.target.value)}
              placeholder="Enter student IDs separated by commas"
              className="form-textarea"
              rows="3"
            />
          </div>

          <div className="or-divider">
            <span>OR</span>
          </div>

          <div className="student-selection">
            <h3>Select Students</h3>
            <div className="student-list">
              {availableStudents?.map(student => (
                <div 
                  key={student?._id} 
                  className={`student-item ${selectedStudents?.includes(student._id) ? 'selected' : ''}`}
                  onClick={() => handleStudentSelect(student?._id)}
                >
                  <span>{student?.personal_details?.fname} {student?.personal_details?.lname}</span>
                  <span>{student?.academic_details?.enrollment_number}</span>
                </div>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            className="submit-btn"
            disabled={loading || (!studentIds && selectedStudents.length === 0)}
          >
            {loading ? 'Enrolling...' : 'Enroll Students'}
          </button>
        </form>
      </div>

      <style jsx>{`
        .bulk-enrollment-container {
          max-width: 800px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        
        .card {
          background: white;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          padding: 2rem;
        }
        
        .card-title {
          color: #2c3e50;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        
        .bulk-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        
        .form-textarea {
          width: 100%;
          padding: 10px 15px;
          border: 1px solid #ddd;
          border-radius: 5px;
          font-size: 1rem;
          resize: vertical;
          min-height: 100px;
        }
        
        .or-divider {
          display: flex;
          align-items: center;
          margin: 1rem 0;
        }
        
        .or-divider::before,
        .or-divider::after {
          content: '';
          flex: 1;
          border-bottom: 1px solid #ddd;
        }
        
        .or-divider span {
          padding: 0 1rem;
          color: #7f8c8d;
        }
        
        .student-selection {
          margin-top: 1rem;
        }
        
        .student-selection h3 {
          margin-bottom: 1rem;
          color: #2c3e50;
        }
        
        .student-list {
          max-height: 300px;
          overflow-y: auto;
          border: 1px solid #eee;
          border-radius: 5px;
        }
        
        .student-item {
          display: flex;
          justify-content: space-between;
          padding: 10px 15px;
          border-bottom: 1px solid #f5f5f5;
          cursor: pointer;
          transition: background 0.2s;
        }
        
        .student-item:hover {
          background: #f5f5f5;
        }
        
        .student-item.selected {
          background: #e3f2fd;
        }
        
        .submit-btn {
          width: 100%;
          background: #2ecc71;
          color: white;
          border: none;
          padding: 12px;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
          margin-top: 1rem;
          transition: background 0.3s;
        }
        
        .submit-btn:hover {
          background: #27ae60;
        }
        
        .submit-btn:disabled {
          background: #95a5a6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default BulkEnrollment;