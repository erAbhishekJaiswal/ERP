import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './DesignationCSS/DesignationDetail.css';
import apiClient from '../../../services/axios';

const DesignationDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [designation, setDesignation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState(false);

  useEffect(() => {
    const fetchDesignation = async () => {
      try {
        const response = await apiClient.get(`/api/features/designation/${id}`);
        
        // const designationDetail = {
        //     _id: '61a0f8b3ab26a742b4e8d4c1',
        //     title: 'Professor',
        //     rank: 1,
        //     is_teaching: true,
        //     pay_scale: 'Level 14 ($90,000 - $120,000)',
        //     responsibilities: [
        //       'Lead research projects and secure funding',
        //       'Teach graduate-level courses in specialized areas',
        //       'Mentor junior faculty members',
        //       'Serve on academic committees and boards',
        //       'Publish research in peer-reviewed journals',
        //       'Represent the university at academic conferences'
        //     ],
        //     // faculty_count: 8,
        //     // typical_qualifications: [
        //     //   'PhD in relevant field',
        //     //   '10+ years of teaching experience',
        //     //   'Proven research track record',
        //     //   'Leadership experience in academic settings'
        //     // ],
        //     // benefits: [
        //     //   'Research grant opportunities',
        //     //   'Sabbatical leave every 7 years',
        //     //   'Graduate assistant support',
        //     //   'Conference travel funding'
        //     // ],
        //     // createdAt: '2021-11-25T08:00:00.000Z',
        //     // updatedAt: '2023-05-15T10:30:00.000Z',
        //     // stats: {
        //     //   current_holders: 12,
        //     //   avg_years_in_position: 8.5,
        //     //   promotion_path: 'From Associate Professor',
        //     //   next_rank: 'Distinguished Professor'
        //     // }
        //   };
        
        setDesignation(response.data.designations);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching designation:', error);
        setLoading(false);
      }
    };
    fetchDesignation();
  }, [id]);

  const handleDeleteDesignation = async () => {
    try {
      await apiClient.delete(`/api/designations/${id}`);
      navigate('/designations', { state: { message: 'Designation deleted successfully!' } });
    } catch (error) {
      console.error('Error deleting designation:', error);
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading designation details...</div>;
  }

  if (!designation) {
    return <div className="not-found">Designation not found</div>;
  }

  return (
    <div className="designation-detail-container">
      <div className="designation-header">
        <h1>{designation.title}</h1>
        <div className="designation-actions">
          {/* <button
            className="edit-button"
            onClick={() => navigate(`/designations/${id}/edit`)}
          >
            Edit Designation
          </button> */}
          <button
            className="designation-detail-delete-button"
            onClick={() => setDeleteModal(true)}
          >
            Delete Designation
          </button>
        </div>
      </div>

      <div className="designation-content">
        <div className="designation-info">
          <div className="info-section">
            <h2>Basic Information</h2>
            <div className="info-item">
              <span className="info-label">Rank:</span>
              <span className="info-value">{designation.rank}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Type:</span>
              <span className={`info-value type-badge ${designation.is_teaching ? 'teaching' : 'non-teaching'}`}>
                {designation.is_teaching ? 'Teaching' : 'Non-Teaching'}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Pay Scale:</span>
              <span className="info-value">{designation.pay_scale}</span>
            </div>
          </div>

          <div className="info-section">
            <h2>Responsibilities</h2>
            {designation.responsibilities.length > 0 ? (
              <ul className="responsibilities-list">
                {designation.responsibilities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            ) : (
              <p className="no-responsibilities">No responsibilities defined</p>
            )}
          </div>
        </div>

        <div className="designation-meta">
          <div className="meta-card">
            <h3>Created At</h3>
            <p>{new Date(designation.createdAt).toLocaleDateString()}</p>
          </div>
          <div className="meta-card">
            <h3>Last Updated</h3>
            <p>{new Date(designation.updatedAt).toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>
              Are you sure you want to delete the {designation.title} designation? 
              This action cannot be undone.
            </p>
            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-button"
                onClick={handleDeleteDesignation}
              >
                Delete Designation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignationDetail;