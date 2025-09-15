// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import "./DepartmentCSS/DepartmentList.css"

// const DepartmentList = () => {
//   const [departments, setDepartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
//   const [deleteModal, setDeleteModal] = useState({ show: false, departmentId: null });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchDepartments = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/features/getDepartmentlist');
//         console.log(response.data);
//         setDepartments(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching departments:', error);
//         setLoading(false);
//       }
//     };
//     fetchDepartments();
//   }, []);

//   const filteredDepartments = departments?.filter(department =>
//     department?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     (department?.description && department?.description?.toLowerCase().includes(searchTerm.toLowerCase()))
//   );

//   const sortedDepartments = [...filteredDepartments].sort((a, b) => {
//     if (sortConfig.key === null) return 0;
    
//     const aValue = sortConfig.key.includes('.') 
//       ? sortConfig.key.split('.').reduce((obj, key) => obj[key], a)
//       : a[sortConfig.key];
      
//     const bValue = sortConfig.key.includes('.') 
//       ? sortConfig.key.split('.').reduce((obj, key) => obj[key], b)
//       : b[sortConfig.key];

//     if (aValue < bValue) {
//       return sortConfig.direction === 'ascending' ? -1 : 1;
//     }
//     if (aValue > bValue) {
//       return sortConfig.direction === 'ascending' ? 1 : -1;
//     }
//     return 0;
//   });

//   const requestSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const handleDeleteDepartment = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/departments/${deleteModal.departmentId}`);
//       setDepartments(departments.filter(d => d._id !== deleteModal.departmentId));
//       setDeleteModal({ show: false, departmentId: null });
//     } catch (error) {
//       console.error('Error deleting department:', error);
//     }
//   };

//   const getSortIndicator = (key) => {
//     if (sortConfig.key === key) {
//       return sortConfig.direction === 'ascending' ? '↑' : '↓';
//     }
//     return null;
//   };

//   return (
//     <div className="department-list-container">
//       <div className="header">
//         <h1>Department Management</h1>
//         <div className="controls">
//           <div className="search-box">
//             <input
//               type="text"
//               placeholder="Search departments..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//             <i className="fas fa-search"></i>
//           </div>
//           <button 
//             className="add-button"
//             onClick={() => navigate('/departments/new')}
//           >
//             Add New Department
//           </button>
//         </div>
//       </div>

//       {loading ? (
//         <div className="loading-spinner">Loading departments...</div>
//       ) : (
//         <div className="department-table-container">
//           <table className="department-table">
//             <thead>
//               <tr>
//                 <th onClick={() => requestSort('name')}>
//                   Name {getSortIndicator('name')}
//                 </th>
//                 <th onClick={() => requestSort('current_hod.faculty_name')}>
//                   HOD {getSortIndicator('current_hod.faculty_name')}
//                 </th>
//                 <th onClick={() => requestSort('establishment_date')}>
//                   Established {getSortIndicator('establishment_date')}
//                 </th>
//                 <th>Contact</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedDepartments?.length > 0 ? (
//                 sortedDepartments?.map((department) => (
//                   <tr key={department?._id}>
//                     <td>
//                       <div 
//                         className="department-name"
//                         onClick={() => navigate(`/departments/${department?._id}`)}
//                       >
//                         {department?.name}
//                         {department?.description && (
//                           <span className="department-description">
//                             {department?.description}
//                           </span>
//                         )}
//                       </div>
//                     </td>
//                     <td>
//                       {department?.current_hod?.faculty_name || 'N/A'}
//                     </td>
//                     <td>
//                       {department?.establishment_date 
//                         ? new Date(department?.establishment_date).toLocaleDateString() 
//                         : 'N/A'}
//                     </td>
//                     <td>
//                       {department?.contact_info?.email || 'N/A'}
//                     </td>
//                     <td>
//                       <div className="action-buttons">
//                         <button
//                           className="edit-button"
//                           onClick={() => navigate(`/departments/${department?._id}/edit`)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="delete-button"
//                           onClick={() => setDeleteModal({ 
//                             show: true, 
//                             departmentId: department?._id 
//                           })}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="no-results">
//                     No departments found matching your criteria
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {deleteModal?.show && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Confirm Deletion</h3>
//             <p>Are you sure you want to delete this department? This action cannot be undone.</p>
//             <div className="modal-actions">
//               <button
//                 className="cancel-button"
//                 onClick={() => setDeleteModal({ show: false, departmentId: null })}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="confirm-delete-button"
//                 onClick={handleDeleteDepartment}
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default DepartmentList;









import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./DepartmentCSS/DepartmentList.css";
// import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import apiClient from '../../../services/axios';

const DepartmentList = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [deleteModal, setDeleteModal] = useState({ show: false, departmentId: null });
  const navigate = useNavigate();
  const [role,setrole] = useState(localStorage.getItem('role'))

  if(role == 'Registrar'){
    setrole('admin')
  }

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await apiClient.get('/api/features/getDepartmentlist');
        setDepartments(response.data.departments); // Updated to access the departments array
        setLoading(false);
      } catch (error) {
        console.error('Error fetching departments:', error);
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  const filteredDepartments = departments?.filter(department =>
    department?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (department?.description && department?.description?.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (department?.contact_info?.email && department?.contact_info?.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const sortedDepartments = [...filteredDepartments].sort((a, b) => {
    if (sortConfig.key === null) return 0;
    
    const getNestedValue = (obj, path) => {
      return path.split('.').reduce((o, key) => (o && o[key] !== undefined ? o[key] : ''), obj);
    };
    
    const aValue = sortConfig.key.includes('.') 
      ? getNestedValue(a, sortConfig.key)
      : a[sortConfig.key];
      
    const bValue = sortConfig.key.includes('.') 
      ? getNestedValue(b, sortConfig.key)
      : b[sortConfig.key];

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

  const handleDeleteDepartment = async () => {
    try {
      const res = await apiClient.delete(`/api/features/deleteDepartment/${deleteModal.departmentId}`);
      console.log(res);
      setDepartments(departments.filter(d => d._id !== deleteModal.departmentId));
      setDeleteModal({ show: false, departmentId: null });
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return null;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // const deleteDepartment = async (departmentId) => {
  //   try {
  //     await axios.delete(`http://localhost:5000/api/departments/${departmentId}`);
  //     setDepartments(departments.filter(department => department._id !== departmentId));
  //     setDeleteModal({ show: false, departmentId: null });
  //   } catch (error) {
  //     console.error('Error deleting department:', error);
  //   }
  // }

  return (
    <div className="department-list-container">
      <div className="header">
        <h1>Department Management</h1>
        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search departments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search"></i>
          </div>
          <button 
            className="add-button"
            onClick={() => navigate('/admin/departmentform')}
          >
            <i className="fas fa-plus"></i> Add New Department
          </button>
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i> Loading departments...
        </div>
      ) : (
        <div className="department-table-container">
          <table className="department-table">
            <thead>
              <tr>
                <th onClick={() => requestSort('name')}>
                  Department Name {getSortIndicator('name')}
                </th>
                <th>Description</th>
                <th onClick={() => requestSort('establishment_date')}>
                  Established {getSortIndicator('establishment_date')}
                </th>
                <th onClick={() => requestSort('contact_info.email')}>
                  Contact Email {getSortIndicator('contact_info.email')}
                </th>
                <th>Contact Info</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedDepartments?.length > 0 ? (
                sortedDepartments?.map((department) => (
                  <tr key={department?._id}>
                    <td>
                      <div 
                        className="department-name-cell"
                        onClick={() => navigate(`/${role}/departmentdetail/${department?._id}`)}
                      >
                        <span className="department-name">{department?.name}</span>
                        {department?.current_hod?.faculty_id && (
                          <span className="hod-badge">
                            <i className="fas fa-user-tie"></i> HOD Assigned
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="department-description-cell">
                      {department?.description || 'N/A'}
                    </td>
                    <td>
                      {formatDate(department?.establishment_date)}
                    </td>
                    <td>
                      {department?.contact_info?.email || 'N/A'}
                    </td>
                    <td>
                      <div className="contact-info">
                        {department?.contact_info?.phone && (
                          <div><i className="fas fa-phone"></i> {department.contact_info.phone}</div>
                        )}
                        {department?.contact_info?.office_location && (
                          <div><i className="fas fa-map-marker-alt"></i> {department.contact_info.office_location}</div>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {/* <button
                          className="edit-button"
                          onClick={() => navigate(`/departments/${department?._id}/edit`)}
                          title="Edit"
                        >
                          <FaRegEdit />
                        </button> */}
                       
                        <button
                          className="view-button"
                          onClick={() => navigate(`/admin/departmentdetail/${department?._id}`)}
                          title="View Details"
                        >
                          <CiViewList style={{fontSize:"15px",color:"black"}} />
                        </button>
                         <button
                          className="delete-button"
                          onClick={() => setDeleteModal({ 
                            show: true, 
                            departmentId: department?._id 
                          })}
                          title="Delete"
                        >
                          <MdDelete style={{fontSize:"15px",color:"black"}} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-results">
                    <i className="fas fa-info-circle"></i> No departments found matching your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModal?.show && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3><i className="fas fa-exclamation-triangle"></i> Confirm Deletion</h3>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this department? This action cannot be undone.</p>
            </div>
            <div className="modal-actions">
              <button
                className="cancel-button"
                onClick={() => setDeleteModal({ show: false, departmentId: null })}
              >
                <i className="fas fa-times"></i> Cancel
              </button>
              <button
                className="confirm-delete-button"
                onClick={handleDeleteDepartment}
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentList;














 // const departments = [
        //   {
        //     _id: '5f8d04b3ab26a742b4e8d4c1',
        //     name: 'Computer Science',
        //     description: 'Department focusing on computer programming, algorithms, and software development',
        //     establishment_date: '2005-09-01T00:00:00.000Z',
        //     current_hod: {
        //       faculty_id: '5f8d04b3ab26a742b4e8d4d1',
        //       faculty_name: 'Dr. Sarah Johnson'
        //     },
        //     contact_info: {
        //       email: 'cs@university.edu',
        //       phone: '+1 (555) 123-4567',
        //       office_location: 'Tech Building, Room 301'
        //     },
        //     createdAt: '2020-10-20T08:00:00.000Z',
        //     updatedAt: '2023-05-15T10:30:00.000Z'
        //   },
        //   {
        //     _id: '5f8d04b3ab26a742b4e8d4c2',
        //     name: 'Electrical Engineering',
        //     description: 'Department specializing in electrical systems and electronics',
        //     establishment_date: '1998-08-15T00:00:00.000Z',
        //     current_hod: {
        //       faculty_id: '5f8d04b3ab26a742b4e8d4d2',
        //       faculty_name: 'Dr. Michael Chen'
        //     },
        //     contact_info: {
        //       email: 'ee@university.edu',
        //       phone: '+1 (555) 234-5678',
        //       office_location: 'Engineering Building, Room 205'
        //     },
        //     createdAt: '2020-10-20T08:00:00.000Z',
        //     updatedAt: '2023-04-22T09:15:00.000Z'
        //   },
        //   {
        //     _id: '5f8d04b3ab26a742b4e8d4c3',
        //     name: 'Mechanical Engineering',
        //     description: 'Department focused on mechanical systems and design',
        //     establishment_date: '2002-01-10T00:00:00.000Z',
        //     current_hod: {
        //       faculty_id: '5f8d04b3ab26a742b4e8d4d3',
        //       faculty_name: 'Dr. Robert Williams'
        //     },
        //     contact_info: {
        //       email: 'me@university.edu',
        //       phone: '+1 (555) 345-6789',
        //       office_location: 'Engineering Building, Room 310'
        //     },
        //     createdAt: '2020-10-20T08:00:00.000Z',
        //     updatedAt: '2023-03-18T14:20:00.000Z'
        //   },
        //   {
        //     _id: '5f8d04b3ab26a742b4e8d4c4',
        //     name: 'Mathematics',
        //     description: 'Department offering pure and applied mathematics courses',
        //     establishment_date: '1985-05-20T00:00:00.000Z',
        //     current_hod: {
        //       faculty_id: '5f8d04b3ab26a742b4e8d4d4',
        //       faculty_name: 'Dr. Emily Davis'
        //     },
        //     contact_info: {
        //       email: 'math@university.edu',
        //       phone: '+1 (555) 456-7890',
        //       office_location: 'Science Building, Room 101'
        //     },
        //     createdAt: '2020-10-20T08:00:00.000Z',
        //     updatedAt: '2023-06-10T11:45:00.000Z'
        //   },
        //   {
        //     _id: '5f8d04b3ab26a742b4e8d4c5',
        //     name: 'Physics',
        //     description: 'Department focused on fundamental physics research and education',
        //     establishment_date: '1975-03-12T00:00:00.000Z',
        //     current_hod: {
        //       faculty_id: '5f8d04b3ab26a742b4e8d4d5',
        //       faculty_name: 'Dr. James Wilson'
        //     },
        //     contact_info: {
        //       email: 'physics@university.edu',
        //       phone: '+1 (555) 567-8901',
        //       office_location: 'Science Building, Room 210'
        //     },
        //     createdAt: '2020-10-20T08:00:00.000Z',
        //     updatedAt: '2023-02-28T16:10:00.000Z'
        //   }
        // ];