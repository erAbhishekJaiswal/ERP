import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBed, FaUser, FaArrowRight, FaCheck } from 'react-icons/fa';
import '../../../CSSfolder/HostelMangement/Rooms/AllocateRoom.css';

const AllocateRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [loading, setLoading] = useState(true);
  const [allocating, setAllocating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  console.log('Room ID:', id);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [roomRes, studentsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/v2/rooms/${id}`),//add rooms Api endpoint
          axios.get('http://localhost:5000/api/student/students/unallocated') //add Students list Api endpoint
        ]);
        
        setRoom(roomRes.data.data);
        setStudents(studentsRes.data);
        console.log('Room Data:', roomRes.data.data, 
          'Students Data:', studentsRes.data
        );
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, [id]);

  const handleAllocate = async () => {
    if (!selectedStudent) {
      setError('Please select a student');
      return;
    }

    setAllocating(true);
    setError(null);

    try {
      const response = await axios.put(`http://localhost:5000/api/v2/rooms/${id}/allocate/${selectedStudent}`);
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/rooms/${id}`);
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to allocate room');
    } finally {
      setAllocating(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading data...</p>
      </div>
    );
  }

  if (error && !allocating) {
    return <div className="error-message">{error}</div>;
  }

  if (!room) {
    return <div className="error-message">Room not found</div>;
  }

  return (
    <div className="fade-in">
      <div className="card allocate-room-card">
        <div className="card-header">
          <h2 className="card-title">
            <FaBed /> Allocate Room: {room.roomNumber}
          </h2>
          <div className="actions">
            <button 
              onClick={() => navigate(`/rooms/${id}`)} 
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="card-body">
          {success && (
            <div className="alert alert-success slide-up">
              Room allocated successfully! Redirecting...
            </div>
          )}
          {error && (
            <div className="alert alert-danger slide-up">
              {error}
            </div>
          )}
          
          <div className="allocation-container">
            <div className="room-info">
              <h3>
                <FaBed /> Room Details
              </h3>
              <div className="detail-item">
                <span className="detail-label">Room Number:</span>
                <span className="detail-value">{room?.roomNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Block/Floor:</span>
                <span className="detail-value">Block {room?.block}, Floor {room?.floor}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Type:</span>
                <span className="detail-value">{room?.type}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Capacity:</span>
                <span className="detail-value">{room?.currentOccupancy}/{room?.capacity}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Monthly Fee:</span>
                <span className="detail-value">₹{room?.feePerMonth?.toLocaleString() || '0'}</span>
              </div>
            </div>
            
            <div className="allocation-arrow">
              <FaArrowRight />
            </div>
            
            <div className="student-selection">
              <h3>
                <FaUser /> Select Student
              </h3>
              {students?.length > 0 ? (
                <>
                  <select
                    className="form-control"
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e?.target?.value)}
                  >
                    <option value="">Select a student</option>
                    {students?.map(student => (
                      <option key={student?._id} value={student?._id}>
                        {student?.name} ({student?.studentId})
                      </option>
                    ))}
                  </select>
                  
                  <button
                    onClick={handleAllocate}
                    className="btn btn-primary allocate-btn"
                    disabled={allocating || !selectedStudent}
                  >
                    {allocating ? 'Allocating...' : (
                      <>
                        <FaCheck /> Allocate Room
                      </>
                    )}
                  </button>
                </>
              ) : (
                <div className="no-students">
                  No unallocated students available
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocateRoom;