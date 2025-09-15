import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTools, FaUpload, FaSpinner } from 'react-icons/fa';
import '../../../CSSfolder/HostelMangement/Maintenance/CreateMaintenance.css';

const CreateMaintenance = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    room: '',
    issueType: '',
    description: '',
    priority: 'medium',
    images: []
  });
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('/api/rooms');
        setRooms(response.data.data);
      } catch (err) {
        console.error('Error fetching rooms:', err);
      }
    };

    fetchRooms();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageUpload = async (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      setUploading(true);
      try {
        // In a real app, you would upload to a cloud service like AWS S3
        // This is just a simulation
        const uploadedImages = await Promise.all(
          Array.from(files).map(async (file) => {
            return new Promise((resolve) => {
              setTimeout(() => {
                const reader = new FileReader();
                reader.onload = (event) => {
                  resolve(event.target.result);
                };
                reader.readAsDataURL(file);
              }, 1000);
            });
          })
        );
        
        setFormData({
          ...formData,
          images: [...formData.images, ...uploadedImages]
        });
      } catch (err) {
        setError('Failed to upload images');
      } finally {
        setUploading(false);
      }
    }
  };

  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({
      ...formData,
      images: updatedImages
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/maintenance', formData);
      if (response.data.success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/maintenance');
        }, 1500);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create maintenance request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-in">
      <div className="card create-maintenance-card">
        <div className="card-header">
          <h2 className="card-title">
            <FaTools /> Create Maintenance Request
          </h2>
          <div className="actions">
            <button 
              onClick={() => navigate('/maintenance')} 
              className="btn btn-secondary"
            >
              Cancel
            </button>
          </div>
        </div>
        <div className="card-body">
          {success && (
            <div className="alert alert-success slide-up">
              Maintenance request created successfully! Redirecting...
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
                <label className="form-label">Room</label>
                <select
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Room</option>
                  {rooms?.map(room => (
                    <option key={room._id} value={room._id}>
                      {room.roomNumber} (Block {room.block}, Floor {room.floor})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="form-group">
                <label className="form-label">Issue Type</label>
                <select
                  name="issueType"
                  value={formData.issueType}
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="">Select Issue Type</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Furniture">Furniture</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>
            
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                rows="4"
                placeholder="Describe the issue in detail..."
                required
              ></textarea>
            </div>
            
            <div className="form-group">
              <label className="form-label">Attach Images (Optional)</label>
              <div className="image-upload-container">
                <label className="upload-btn">
                  <input 
                    type="file" 
                    multiple 
                    onChange={handleImageUpload} 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                  />
                  <FaUpload /> {uploading ? 'Uploading...' : 'Choose Images'}
                </label>
                {uploading && <FaSpinner className="spinner" />}
              </div>
              
              {formData.images.length > 0 && (
                <div className="image-preview-container">
                  {formData.images.map((image, index) => (
                    <div key={index} className="image-preview">
                      <img src={image} alt={`Preview ${index + 1}`} />
                      <button 
                        type="button" 
                        className="remove-btn"
                        onClick={() => removeImage(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="form-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Submitting...' : 'Submit Request'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMaintenance;