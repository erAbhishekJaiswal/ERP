import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiClient from '../../../services/axios';

const EnrolledStudentsList = () => {
  const { subjectId } = useParams();
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const response = await apiClient.get(`/api/features/getstudentsinsubject/${subjectId}`);
        setEnrolledStudents(response.data.enrolledStudents);
        setSubjectName(response.data.subjectName);
        console.log(response.data);
        
        // Temporary mock (for testing)
    //   const mockResponse = {
    //     subjectName: "Data Structures & Algorithms",
    //     enrolledStudents: [
    //       {
    //         _id: "stu001",
    //         fullName: "John Doe",
    //         rollNumber: "CS101",
    //         enrollmentDate: "2024-09-01T10:00:00Z"
    //       },
    //       {
    //         _id: "stu002",
    //         fullName: "Jane Smith",
    //         rollNumber: "CS102",
    //         enrollmentDate: "2024-09-02T11:00:00Z"
    //       }
    //     ]
    //   };

    //   // Comment this during real API calls
    //   setEnrolledStudents(mockResponse.enrolledStudents);
    //   setSubjectName(mockResponse.subjectName);

      } catch (error) {
        toast.error('Error fetching enrolled students');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEnrolledStudents();
  }, [subjectId]);

  // Pagination logic
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = enrolledStudents.slice(indexOfFirstStudent, indexOfLastStudent);
  const totalPages = Math.ceil(enrolledStudents.length / studentsPerPage);

  const handleRemoveStudent = async (studentId) => {
    if (window.confirm('Are you sure you want to remove this student?')) {
      try {
        await axios.delete(`/api/features/subject/${subjectId}/studentdelete/${studentId}`);
        setEnrolledStudents(prev => prev.filter(student => student._id !== studentId));

        console.log("subjectId",subjectId,"studentId",studentId);
        
        toast.success('Student removed successfully');
      } catch (error) {
        toast.error('Error removing student');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="enrolled-students-container">
      <div className="header">
        <h1>Enrolled Students</h1>
        <h2>{subjectName}</h2>
        <p className="count">{enrolledStudents?.length} students enrolled</p>
      </div>

      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Enrollment Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentStudents?.map((student, index) => (
              <tr key={student?._id._id}>
                <td>{indexOfFirstStudent + index + 1}</td>
                <td>{student?.fullName}</td>
                <td>{student?.rollNumber}</td>
                <td>{new Date(student?.enrollmentDate).toLocaleDateString()}</td>
                <td>
                  <button 
                    onClick={() => handleRemoveStudent(student?._id._id)}
                    className="remove-btn"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {enrolledStudents?.length === 0 && (
          <div className="no-students">
            No students enrolled in this subject yet.
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          
          <span>Page {currentPage} of {totalPages}</span>
          
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}

      <style jsx>{`
        .enrolled-students-container {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 1rem;
        }
        
        .header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .header h1 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }
        
        .header h2 {
          color: #7f8c8d;
          margin-top: 0;
        }
        
        .count {
          font-size: 1.1rem;
          color: #3498db;
          font-weight: 500;
        }
        
        .students-table-container {
          overflow-x: auto;
          background: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
        }
        
        .students-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .students-table th,
        .students-table td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }
        
        .students-table th {
          background-color: #f8f9fa;
          font-weight: 600;
          color: #2c3e50;
        }
        
        .students-table tr:hover {
          background-color: #f9f9f9;
        }
        
        .remove-btn {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .remove-btn:hover {
          background: #c0392b;
        }
        
        .no-students {
          padding: 2rem;
          text-align: center;
          color: #7f8c8d;
        }
        
        .pagination {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 20px;
          margin-top: 2rem;
        }
        
        .pagination button {
          padding: 8px 16px;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        
        .pagination button:disabled {
          background: #bdc3c7;
          cursor: not-allowed;
        }
        
        .loading {
          text-align: center;
          padding: 2rem;
          font-size: 1.2rem;
          color: #7f8c8d;
        }
      `}</style>
    </div>
  );
};

export default EnrolledStudentsList;