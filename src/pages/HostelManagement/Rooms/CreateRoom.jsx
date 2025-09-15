import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBed, FaSave, FaTimes } from 'react-icons/fa';
import '../../../CSSfolder/HostelMangement/Rooms/CreateRoom.css';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    roomNumber: '',
    block: 'A',
    floor: 1,
    type: 'Non-AC',
    capacity: 2,
    amenities: ['Bed', 'Table', 'Chair', 'Wardrobe'],
    feePerMonth: 0,
    status: 'available'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

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
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:5000/api/v2/rooms/', formData);
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin/rooms');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <div className="card create-room-card">
        <div className="card-header">
          <h2 className="card-title">
            <FaBed /> Create New Room
          </h2>
          <div className="actions">
            <button 
              onClick={() => navigate('/admin/rooms')} 
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="card-body">
          {success && (
            <div className="alert alert-success slide-up">
              Room created successfully! Redirecting...
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
                  placeholder="e.g., 101"
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
                      placeholder="e.g., Bed, Table, etc."
                    />
                    {index >= 4 && (
                      <button
                        type="button"
                        className="remove-amenity"
                        onClick={() => removeAmenity(index)}
                      >
                        <FaTimes />
                      </button>
                    )}
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
              <label className="form-label">Initial Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control"
                required
              >
                <option value="available">Available</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            
            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Creating...' : (
                  <>
                    <FaSave /> Create Room
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

export default CreateRoom;