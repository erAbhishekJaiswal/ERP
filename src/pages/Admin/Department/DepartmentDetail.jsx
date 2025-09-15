import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./DepartmentCSS/DepartmentDetail.css"
import apiClient from '../../../services/axios';

const DepartmentView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const response = await apiClient.get(`/api/features/getDepartment/${id}`);
        setDepartment(response.data.department);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch department');
        setLoading(false);
      }
    };

    fetchDepartment();
  }, [id]);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="butter-container butter-flex butter-justify-center butter-items-center butter-min-h-screen">
        <div className="butter-spinner butter-text-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="butter-container butter-py-8">
        <div className="butter-alert butter-alert-error butter-mb-6">
          {error}
        </div>
        <button 
          onClick={() => navigate('/departments')}
          className="butter-btn butter-btn-primary"
        >
          Back to Departments
        </button>
      </div>
    );
  }

  if (!department) {
    return (
      <div className="butter-container butter-py-8">
        <div className="butter-alert butter-alert-warning butter-mb-6">
          Department not found
        </div>
        <button 
          onClick={() => navigate('/departments')}
          className="butter-btn butter-btn-primary"
        >
          Back to Departments
        </button>
      </div>
    );
  }

  return (
    <div className="butter-container butter-py-8">
      <div className="butter-card butter-mb-6">
      <div className="butter-card-footer butter-flex butter-justify-end butter-gap-3">
          <button 
            onClick={() => navigate('/admin/departmentlist')}
            className="butter-btn butter-btn-ghost"
          >
            Back to List
          </button>
          {/* <button 
            onClick={() => navigate(`/departments/${department._id}/edit`)}
            className="butter-btn butter-btn-primary"
          >
            Edit Department
          </button> */}
        </div>

        <div className="butter-card-header">
          <h1 className="butter-text-3xl butter-font-bold butter-text-gray-800">
            {department.name}
          </h1>
          <div className="butter-flex butter-gap-2 butter-mt-2">
            <span className="butter-badge butter-badge-primary">
              Established: {formatDate(department.establishment_date)}
            </span>
            <span className="butter-badge butter-badge-secondary">
              Last Updated: {formatDate(department.updatedAt)}
            </span>
          </div>
        </div>

        

        <div className="butter-card-body">
          <p className="butter-text-lg butter-text-gray-600 butter-mb-6">
            {department.description}
          </p>

          <div className="butter-grid butter-grid-cols-1 butter-md-grid-cols-2 butter-gap-6 butter-mb-8">
            <div className="butter-card butter-card-bordered">
              <div className="butter-card-header">
                <h2 className="butter-text-xl butter-font-semibold">Contact Information</h2>
              </div>
              <div className="butter-card-body">
                <ul className="butter-list butter-list-hover">
                  <li className="butter-list-item">
                    <span className="butter-list-icon">
                      <i className="butter-icon butter-icon-mail"></i>
                    </span>
                    <span>{department.contact_info.email}</span>
                  </li>
                  <li className="butter-list-item">
                    <span className="butter-list-icon">
                      <i className="butter-icon butter-icon-phone"></i>
                    </span>
                    <span>{department.contact_info.phone}</span>
                  </li>
                  <li className="butter-list-item">
                    <span className="butter-list-icon">
                      <i className="butter-icon butter-icon-map-pin"></i>
                    </span>
                    <span>{department.contact_info.office_location}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="butter-card butter-card-bordered">
              <div className="butter-card-header">
                <h2 className="butter-text-xl butter-font-semibold">Department Details</h2>
              </div>
              <div className="butter-card-body">
                <div className="butter-stats">
                  <div className="butter-stat">
                    <div className="butter-stat-title">Created On</div>
                    <div className="butter-stat-value">
                      {formatDate(department.createdAt)}
                    </div>
                  </div>
                  <div className="butter-stat">
                    <div className="butter-stat-title">Department ID</div>
                    <div className="butter-stat-value butter-text-sm butter-font-mono">
                      {department._id}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

       
      </div>
    </div>
  );
};

export default DepartmentView;