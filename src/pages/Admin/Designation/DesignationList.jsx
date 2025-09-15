import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DesignationCSS/DesignationList.css';
import apiClient from '../../../services/axios';

const DesignationList = () => {
  const [designations, setDesignations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [deleteModal, setDeleteModal] = useState({ show: false, designationId: null });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDesignations = async () => {
      try {

        const response = await apiClient.get('/api/features/getDesignationlist');
      
        // const designations = [
        //     {
        //       _id: '61a0f8b3ab26a742b4e8d4c1',
        //       title: 'Professor',
        //       rank: 1,
        //       is_teaching: true,
        //       pay_scale: 'Level 14 ($90,000 - $120,000)',
        //       responsibilities: [
        //         'Lead research projects',
        //         'Teach graduate courses',
        //         'Mentor junior faculty',
        //         'Participate in academic committees'
        //       ],
        //       createdAt: '2021-11-25T08:00:00.000Z',
        //       updatedAt: '2023-05-15T10:30:00.000Z'
        //     },
        //     {
        //       _id: '61a0f8b3ab26a742b4e8d4c2',
        //       title: 'Associate Professor',
        //       rank: 2,
        //       is_teaching: true,
        //       pay_scale: 'Level 12 ($75,000 - $95,000)',
        //       responsibilities: [
        //         'Conduct research',
        //         'Teach undergraduate and graduate courses',
        //         'Supervise student projects'
        //       ],
        //       createdAt: '2021-11-25T08:00:00.000Z',
        //       updatedAt: '2023-04-22T09:15:00.000Z'
        //     },
        //     {
        //       _id: '61a0f8b3ab26a742b4e8d4c3',
        //       title: 'Assistant Professor',
        //       rank: 3,
        //       is_teaching: true,
        //       pay_scale: 'Level 10 ($65,000 - $85,000)',
        //       responsibilities: [
        //         'Teach undergraduate courses',
        //         'Develop research proposals',
        //         'Participate in departmental activities'
        //       ],
        //       createdAt: '2021-11-25T08:00:00.000Z',
        //       updatedAt: '2023-03-18T14:20:00.000Z'
        //     },
        //     {
        //       _id: '61a0f8b3ab26a742b4e8d4c4',
        //       title: 'Senior Lecturer',
        //       rank: 4,
        //       is_teaching: true,
        //       pay_scale: 'Level 9 ($60,000 - $75,000)',
        //       responsibilities: [
        //         'Teach undergraduate courses',
        //         'Develop course materials',
        //         'Advise students'
        //       ],
        //       createdAt: '2021-11-25T08:00:00.000Z',
        //       updatedAt: '2023-06-10T11:45:00.000Z'
        //     },
        //     {
        //       _id: '61a0f8b3ab26a742b4e8d4c5',
        //       title: 'Lecturer',
        //       rank: 5,
        //       is_teaching: true,
        //       pay_scale: 'Level 8 ($50,000 - $65,000)',
        //       responsibilities: [
        //         'Teach introductory courses',
        //         'Assist in curriculum development',
        //         'Grade assignments and exams'
        //       ],
        //       createdAt: '2021-11-25T08:00:00.000Z',
        //       updatedAt: '2023-02-28T16:10:00.000Z'
        //     },
        //     {
        //       _id: '61a0f8b3ab26a742b4e8d4c6',
        //       title: 'Lab Technician',
        //       rank: 6,
        //       is_teaching: false,
        //       pay_scale: 'Level 6 ($40,000 - $50,000)',
        //       responsibilities: [
        //         'Maintain laboratory equipment',
        //         'Prepare experiments',
        //         'Assist faculty with research setups',
        //         'Ensure lab safety protocols'
        //       ],
        //       createdAt: '2021-11-25T08:00:00.000Z',
        //       updatedAt: '2023-01-15T13:25:00.000Z'
        //     },
        //     {
        //       _id: '61a0f8b3ab26a742b4e8d4c7',
        //       title: 'Department Administrator',
        //       rank: 7,
        //       is_teaching: false,
        //       pay_scale: 'Level 7 ($45,000 - $55,000)',
        //       responsibilities: [
        //         'Manage department budget',
        //         'Coordinate faculty schedules',
        //         'Handle student inquiries',
        //         'Organize department events'
        //       ],
        //       createdAt: '2021-11-25T08:00:00.000Z',
        //       updatedAt: '2023-07-05T09:40:00.000Z'
        //     }
        //   ];
          
        setDesignations(response.data.AllDesignation);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching designations:', error);
        setLoading(false);
      }
    };
    fetchDesignations();
  }, []);

  const filteredDesignations = designations.filter(designation =>
    designation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    designation.pay_scale.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDesignations = [...filteredDesignations].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];

    if (aValue < bValue) {
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (aValue > bValue) {
      return sortConfig.direction === 'ascending' ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleDeleteDesignation = async () => {
    try {
      await apiClient.delete(`/api/features/designation/${deleteModal.designationId}`);
      setDesignations(designations.filter(d => d._id !== deleteModal.designationId));
      setDeleteModal({ show: false, designationId: null });
    } catch (error) {
      console.error('Error deleting designation:', error);
    }
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return null;
  };

  return (
    <div className="designation-list-container">
      <div className="header">
        <h1>Designation Management</h1>
        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search designations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          <button 
            className="add-button"
            onClick={() => navigate('/admin/designationform')}
          >
            Add New Designation
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading designations...</div>
      ) : (
        <div className="designation-table-container">
          <table className="designation-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('title')}>
                  Title {getSortIndicator('title')}
                </th>
                <th onClick={() => requestSort('rank')}>
                  Rank {getSortIndicator('rank')}
                </th>
                <th>Type</th>
                <th onClick={() => requestSort('pay_scale')}>
                  Pay Scale {getSortIndicator('pay_scale')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedDesignations?.length > 0 ? (
                sortedDesignations?.map((designation) => (
                  <tr key={designation._id}>
                    <td>
                      <div 
                        className="designation-title"
                        onClick={() => navigate(`/admin/designationdetail/${designation._id}`)}
                      >
                        {designation?.title}
                      </div>
                    </td>
                    <td>{designation?.rank}</td>
                    <td>
                      <span className={`type-badge ${designation.is_teaching ? 'teaching' : 'non-teaching'}`}>
                        {designation?.is_teaching ? 'Teaching' : 'Non-Teaching'}
                      </span>
                    </td>
                    <td>{designation?.pay_scale}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          className="designation-edit-button"
                          onClick={() => navigate(`/admin/designationdetail/${designation._id}`)}
                        >
                          View
                        </button>
                        <button
                          className="designation-delete-button"
                          onClick={() => setDeleteModal({ 
                            show: true, 
                            designationId: designation?._id 
                          })}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-results">
                    No designations found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this designation? This action cannot be undone.</p>
            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setDeleteModal({ show: false, designationId: null })}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-button"
                onClick={handleDeleteDesignation}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DesignationList;