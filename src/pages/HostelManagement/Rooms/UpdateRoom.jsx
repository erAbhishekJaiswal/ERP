import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBed, FaSave, FaTimes } from 'react-icons/fa';
import '../../../CSSfolder/HostelMangement/Rooms/UpdateRoom.css';

const UpdateRoom = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomNumber: '',
    block: 'A',
    floor: 1,
    type: 'Non-AC',
    capacity: 2,
    amenities: [],
    feePerMonth: 0,
    status: 'available'
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const response = await axios.get(`/api/rooms/${id}`);
        setFormData({
          roomNumber: response.data.data.roomNumber,
          block: response.data.data.block,
          floor: response.data.data.floor,
          type: response.data.data.type,
          capacity: response.data.data.capacity,
          amenities: response.data.data.amenities || [],
          feePerMonth: response.data.data.feePerMonth || 0,
          status: response.data.data.status
        });
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch room data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchRoom();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: parseInt(value) || 0
    });
  };

  const handleAmenityChange = (index, value) => {
    const updatedAmenities = [...formData.amenities];
    updatedAmenities[index] = value;
    setFormData({
      ...formData,
      amenities: updatedAmenities
    });
  };

  const addAmenity = () => {
    setFormData({
      ...formData,
      amenities: [...formData.amenities, '']
    });
  };

  const removeAmenity = (index) => {
    const updatedAmenities = [...formData.amenities];
    updatedAmenities.splice(index, 1);
    setFormData({
      ...formData,
      amenities: updatedAmenities
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);
    setError(null);

    try {
      const response = await axios.put(`/api/rooms/${id}`, formData);
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate(`/rooms/${id}`);
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update room');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading room data...</p>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="fade-in">
      <div className="card update-room-card">
        <div className="card-header">
          <h2 className="card-title">
            <FaBed /> Update Room: {formData.roomNumber}
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
              Room updated successfully! Redirecting...
            </div>
          )}
          {error && (
            <div className="alert alert-danger slide-up">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Room Number</label>
                <input
                  type="text"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              
              <div className="form-group">
                <label className="form-label">Block</label>
                <select
                  name="block"
                  value={formData.block}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="A">Block A</option>
                  <option value="B">Block B</option>
                  <option value="C">Block C</option>
                  <option value="D">Block D</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Floor</label>
                <select
                  name="floor"
                  value={formData.floor}
                  onChange={handleNumberChange}
                  className="form-control"
                  required
                >
                  <option value="1">1st Floor</option>
                  <option value="2">2nd Floor</option>
                  <option value="3">3rd Floor</option>
                  <option value="4">4th Floor</option>
                  <option value="5">5th Floor</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Room Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="Non-AC">Non-AC</option>
                  <option value="AC">AC</option>
                  <option value="Deluxe">Deluxe</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Capacity</label>
                <select
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleNumberChange}
                  className="form-control"
                  required
                >
                  <option value="1">1 Person</option>
                  <option value="2">2 Persons</option>
                  <option value="3">3 Persons</option>
                  <option value="4">4 Persons</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Monthly Fee (₹)</label>
                <input
                  type="number"
                  name="feePerMonth"
                  value={formData.feePerMonth}
                  onChange={handleNumberChange}
                  className="form-control"
                  required
                  min="0"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Amenities</label>
              <div className="amenities-list">
                {formData.amenities.map((amenity, index) => (
                  <div key={index} className="amenity-input">
                    <input
                      type="text"
                      value={amenity}
                      onChange={(e) => handleAmenityChange(index, e.target.value)}
                      className="form-control"
                    />
                    <button
                      type="button"
                      className="remove-amenity"
                      onClick={() => removeAmenity(index)}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="btn btn-sm btn-secondary"
                  onClick={addAmenity}
                >
                  Add Amenity
                </button>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={updating}
              >
                {updating ? 'Updating...' : (
                  <>
                    <FaSave /> Update Room
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateRoom;