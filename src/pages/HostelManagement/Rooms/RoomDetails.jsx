import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { FaBed, FaUserFriends, FaMoneyBillWave, FaDoorOpen, FaDoorClosed, FaTools } from 'react-icons/fa';
import '../../../CSSfolder/HostelMangement/Rooms/RoomDetails.css';

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [occupants, setOccupants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v2/rooms/${id}`);
        setRoom(response.data.data);
        // console.log('Students Data:', response.data.students);
        
        const mockOccupants = response.data.students || [
          { _id: '1', name: 'John Doe', checkInDate: '2023-05-15T00:00:00.000Z' },
          { _id: '2', name: 'Jane Smith', checkInDate: '2023-06-20T00:00:00.000Z' }];
        
        // In a real app, you would fetch occupants data
        // This is just a simulation
        // const mockOccupants = [
        //   { _id: '1', name: 'John Doe', checkInDate: '2023-05-15T00:00:00.000Z' },
        //   { _id: '2', name: 'Jane Smith', checkInDate: '2023-06-20T00:00:00.000Z' }
        // ];
        setOccupants(mockOccupants);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch room details');
        setLoading(false);
        console.error(err);
      }
    };

    fetchRoomData();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'available':
        return <span className="badge badge-success">Available</span>;
      case 'occupied':
        return <span className="badge badge-danger">Occupied</span>;
      case 'maintenance':
        return <span className="badge badge-warning">Maintenance</span>;
      default:
        return <span className="badge badge-secondary">{status}</span>;
    }
  };

  const handleVacate = async (studentId) => {
    try {
      // In a real app, you would call the API to vacate the room
      // await axios.put(`/api/rooms/${id}/vacate/${studentId}`);
      alert(`Student ${studentId} vacated successfully!`);
      // Refresh data
      const response = await axios.get(`/api/rooms/${id}`);
      setRoom(response.data.data);
    } catch (err) {
      alert('Failed to vacate student');
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading room details...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!room) {
    return <div className="error-message">Room not found</div>;
  }

  return (
    <div className="fade-in">
      <div className="card room-details-card">
        <div className="card-header">
          <h2 className="card-title">
            <FaBed /> Room Details: {room.roomNumber}
          </h2>
          <div className="actions">
            <Link to="/admin/rooms" className="btn btn-secondary">
              Back to List
            </Link>
            <Link to={`/rooms/${id}/edit`} className="btn btn-primary">
              Edit Room
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="details-grid">
            <div className="detail-section">
              <h3 className="section-title">Basic Information</h3>
              <div className="detail-item">
                <span className="detail-label">Room Number:</span>
                <span className="detail-value">{room.roomNumber}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Block/Floor:</span>
                <span className="detail-value">Block {room.block}, Floor {room.floor}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Type:</span>
                <span className="detail-value">
                  <span className={`badge ${
                    room.type === 'AC' ? 'badge-primary' :
                    room.type === 'Non-AC' ? 'badge-secondary' : 'badge-accent'
                  }`}>
                    {room.type}
                  </span>
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status:</span>
                <span className="detail-value">
                  {getStatusBadge(room.status)}
                </span>
              </div>
            </div>

            <div className="detail-section">
              <h3 className="section-title">Occupancy Details</h3>
              <div className="detail-item">
                <span className="detail-label">Capacity:</span>
                <span className="detail-value">
                  <FaUserFriends className="icon" /> {room.capacity}
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Current Occupancy:</span>
                <span className="detail-value">
                  {room.currentOccupancy} ({((room.currentOccupancy / room.capacity) * 100).toFixed(0)}%)
                </span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Monthly Fee:</span>
                <span className="detail-value">
                  <FaMoneyBillWave className="icon" /> ₹{room.feePerMonth?.toLocaleString() || '0'}
                </span>
              </div>
            </div>

            <div className="detail-section full-width">
              <h3 className="section-title">Amenities</h3>
              <div className="amenities-list">
                {room.amenities && room.amenities.length > 0 ? (
                  room.amenities.map((amenity, index) => (
                    <div key={index} className="amenity-item">
                      {amenity}
                    </div>
                  ))
                ) : (
                  <div className="no-amenities">No amenities listed</div>
                )}
              </div>
            </div>

            {room.currentOccupancy > 0 && (
              <div className="detail-section full-width">
                <h3 className="section-title">
                  <FaUserFriends /> Current Occupants ({occupants.length})
                </h3>
                <div className="occupants-table">
                  <table>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Check-In Date</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {occupants.map(occupant => (
                        <tr key={occupant._id}>
                          <td>{occupant.name}</td>
                          <td>{formatDate(occupant.checkInDate)}</td>
                          <td>
                            <button
                              onClick={() => handleVacate(occupant._id)}
                              className="btn btn-sm btn-danger"
                            >
                              <FaDoorOpen /> Vacate
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

  

            <div className="detail-section full-width">
              <div className="action-buttons">
                <Link
                  to={`/rooms/${room._id}/allocate`}
                  className="btn btn-success"
                  disabled={room.status === 'occupied'}
                >
                  <FaUserFriends /> Allocate Student
                </Link>
                {room.status !== 'maintenance' && (
                  <button className="btn btn-warning">
                    <FaTools /> Mark for Maintenance
                  </button>
                )}
                {room.status === 'maintenance' && (
                  <button className="btn btn-primary">
                    <FaDoorClosed /> Return to Service
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;