import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaBed, FaSearch, FaFilter, FaPlus, FaUserFriends, FaDoorOpen } from 'react-icons/fa';
import '../../../CSSfolder/HostelMangement/Rooms/RoomList.css';

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    block: 'all',
    floor: 'all',
    type: 'all',
    status: 'all'
  });

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v2/rooms/');
        setRooms(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // var id = rooms._id;

  const filteredRooms = rooms?.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBlock = filters.block === 'all' || room.block === filters.block;
    const matchesFloor = filters.floor === 'all' || room.floor.toString() === filters.floor;
    const matchesType = filters.type === 'all' || room.type === filters.type;
    const matchesStatus = filters.status === 'all' || room.status === filters.status;
    
    return matchesSearch && matchesBlock && matchesFloor && matchesType && matchesStatus;
  });

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

  const getTypeBadge = (type) => {
    switch (type) {
      case 'AC':
        return <span className="badge badge-primary">AC</span>;
      case 'Non-AC':
        return <span className="badge badge-secondary">Non-AC</span>;
      case 'Deluxe':
        return <span className="badge badge-accent">Deluxe</span>;
      default:
        return <span className="badge badge-secondary">{type}</span>;
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  return (
    <div className="fade-in">
      <div className="card room-card">
        <div className="card-header">
          <h2 className="card-title">
            <FaBed className="header-icon" /> Room Management
          </h2>
          <div className="actions">
            <Link to="/admin/createroom" className="btn btn-primary">
              <FaPlus /> Add New Room
            </Link>
          </div>
        </div>
        <div className="card-body">
          <div className="filters-container">
            <div className="search-filter">
              <div className="search-box">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by room number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="dropdown-filters">
              <div className="filter-group">
                <label>
                  <FaFilter /> Block:
                </label>
                <select
                  name="block"
                  value={filters.block}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Blocks</option>
                  <option value="A">Block A</option>
                  <option value="B">Block B</option>
                  <option value="C">Block C</option>
                  <option value="D">Block D</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>
                  <FaFilter /> Floor:
                </label>
                <select
                  name="floor"
                  value={filters.floor}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Floors</option>
                  <option value="1">1st Floor</option>
                  <option value="2">2nd Floor</option>
                  <option value="3">3rd Floor</option>
                  <option value="4">4th Floor</option>
                  <option value="5">5th Floor</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>
                  <FaFilter /> Type:
                </label>
                <select
                  name="type"
                  value={filters.type}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Types</option>
                  <option value="AC">AC</option>
                  <option value="Non-AC">Non-AC</option>
                  <option value="Deluxe">Deluxe</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>
                  <FaFilter /> Status:
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                >
                  <option value="all">All Statuses</option>
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="loading-animation">
              <div className="spinner"></div>
              <p>Loading rooms...</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="room-table">
                <thead>
                  <tr>
                    <th>Room Number</th>
                    <th>Block/Floor</th>
                    <th>Type</th>
                    <th>Capacity</th>
                    <th>Occupancy</th>
                    <th>Status</th>
                    <th>Fee</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRooms?.length > 0 ? (
                    filteredRooms.map((room) => (
                      <tr key={room._id} className="slide-up">
                        <td>
                          <div className="room-number">
                            <FaBed className="room-icon" />
                            {room.roomNumber}
                          </div>
                        </td>
                        <td>
                          <div className="block-floor">
                            <span className="block">Block {room.block}</span>
                            <span className="floor">Floor {room.floor}</span>
                          </div>
                        </td>
                        <td>
                          {getTypeBadge(room.type)}
                        </td>
                        <td>
                          <div className="capacity">
                            <FaUserFriends className="capacity-icon" />
                            {room.capacity}
                          </div>
                        </td>
                        <td>
                          <div className="occupancy">
                            <div className="occupancy-bar">
                              <div 
                                className="occupancy-fill"
                                style={{
                                  width: `${(room.currentOccupancy / room.capacity) * 100}%`,
                                  backgroundColor: room.currentOccupancy === room.capacity 
                                    ? '#ef233c' 
                                    : room.currentOccupancy > 0 
                                      ? '#4895ef' 
                                      : '#4cc9f0'
                                }}
                              ></div>
                            </div>
                            <span className="occupancy-text">
                              {room.currentOccupancy}/{room.capacity}
                            </span>
                          </div>
                        </td>
                        <td>
                          {getStatusBadge(room.status)}
                        </td>
                        <td>
                          <div className="fee">
                            ₹{room.feePerMonth?.toLocaleString() || '0'}
                          </div>
                        </td>
                        <td>
                          <div className="action-buttons">
                            <Link
                              to={`/admin/rooms/${room._id}`}
                              className="btn btn-sm btn-secondary"
                            >
                              View
                            </Link>
                            <Link
                              to={`/admin/allocate/${room._id}`}
                              className="btn btn-sm btn-success"
                              disabled={room.status === 'occupied'}
                            >
                              Allocate
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="8" className="no-rooms">
                        No rooms found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomList;