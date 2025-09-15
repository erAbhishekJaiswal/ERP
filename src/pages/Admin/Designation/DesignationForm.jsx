// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import './DesignationCSS/DesignationForm.css';

// const DesignationForm = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     title: '',
//     rank: '',
//     is_teaching: false,
//     pay_scale: '',
//     responsibilities: []
//   });
//   const [currentResponsibility, setCurrentResponsibility] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }));
    
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: null
//       }));
//     }
//   };

//   const handleAddResponsibility = () => {
//     if (currentResponsibility.trim()) {
//       setFormData(prev => ({
//         ...prev,
//         responsibilities: [...prev.responsibilities, currentResponsibility.trim()]
//       }));
//       setCurrentResponsibility('');
//     }
//   };

//   const handleRemoveResponsibility = (index) => {
//     setFormData(prev => ({
//       ...prev,
//       responsibilities: prev.responsibilities.filter((_, i) => i !== index)
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.title.trim()) newErrors.title = 'Title is required';
//     if (!formData.rank) newErrors.rank = 'Rank is required';
//     if (isNaN(formData.rank)) newErrors.rank = 'Rank must be a number';
//     if (!formData.pay_scale.trim()) newErrors.pay_scale = 'Pay scale is required';
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validateForm()) return;

//     try {
//       setLoading(true);
//       const response = await axios.post('http://localhost:5000/api/features/createDesignation', formData);
//       navigate('/admin/designationlist', { 
//         state: { message: 'Designation created successfully!' } 
//       });
//     } catch (error) {
//       console.error('Error creating designation:', error);
//       if (error.response?.data?.error) {
//         setErrors({ submit: error.response.data.error });
//       } else {
//         setErrors({ submit: 'Failed to create designation. Please try again.' });
//       }
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="designation-form-container">
//       <div className="form-header">
//         <h1>Create New Designation</h1>
//         <p>Define a new faculty or staff position</p>
//       </div>

//       <form onSubmit={handleSubmit} className="designation-form">
//         <div className="form-grid">
//           <div className="form-section">
//             <h2 className="section-title">Basic Information</h2>
            
//             <div className={`form-group ${errors.title ? 'has-error' : ''}`}>
//               <label htmlFor="title">Designation Title*</label>
//               <input
//                 type="text"
//                 id="title"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 placeholder="e.g., Associate Professor"
//               />
//               {errors.title && <span className="error-message">{errors.title}</span>}
//             </div>
            
//             <div className={`form-group ${errors.rank ? 'has-error' : ''}`}>
//               <label htmlFor="rank">Rank*</label>
//               <input
//                 type="number"
//                 id="rank"
//                 name="rank"
//                 value={formData.rank}
//                 onChange={handleChange}
//                 placeholder="Numerical rank (e.g., 1, 2, 3)"
//                 min="1"
//               />
//               {errors.rank && <span className="error-message">{errors.rank}</span>}
//             </div>
            
//             <div className="form-group">
//               <label htmlFor="pay_scale">Pay Scale*</label>
//               <input
//                 type="text"
//                 id="pay_scale"
//                 name="pay_scale"
//                 value={formData.pay_scale}
//                 onChange={handleChange}
//                 placeholder="e.g., Level 12 or $75,000 - $90,000"
//               />
//               {errors.pay_scale && <span className="error-message">{errors.pay_scale}</span>}
//             </div>
//           </div>

//           <div className="form-section">
//             <h2 className="section-title">Position Type</h2>
            
//             <div className="form-group toggle-group">
//               <label>Is this a teaching position?</label>
//               <div className="toggle-switch">
//                 <input
//                   type="checkbox"
//                   id="is_teaching"
//                   name="is_teaching"
                  
//                   // onChange={handleChange}
//                 />
//                 <span className="slider round"></span>
//                 <span className="toggle-label">
//                   {formData.is_teaching ? 'Teaching' : 'Non-Teaching'}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="form-section full-width">
//             <h2 className="section-title">Responsibilities</h2>
            
//             <div className="form-group">
//               <label>Add Responsibility</label>
//               <div className="input-with-button">
//                 <input
//                   type="text"
//                   value={currentResponsibility}
//                   onChange={(e) => setCurrentResponsibility(e.target.value)}
//                   placeholder="e.g., Conduct research, Teach undergraduate courses"
//                 />
//                 <button
//                   type="button"
//                   className="add-button"
//                   onClick={handleAddResponsibility}
//                   disabled={!currentResponsibility.trim()}
//                 >
//                   Add
//                 </button>
//               </div>
//             </div>
            
//             {formData.responsibilities.length > 0 && (
//               <div className="responsibilities-list">
//                 <h4>Current Responsibilities:</h4>
//                 <ul>
//                   {formData.responsibilities.map((item, index) => (
//                     <li key={index}>
//                       {item}
//                       <button
//                         type="button"
//                         className="remove-button"
//                         onClick={() => handleRemoveResponsibility(index)}
//                       >
//                         ×
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="form-actions">
//           <button
//             type="button"
//             className="cancel-button"
//             onClick={() => navigate('/designations')}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="submit-button"
//             disabled={loading}
//           >
//             {loading ? 'Creating...' : 'Create Designation'}
//           </button>
//         </div>

//         {errors.submit && (
//           <div className="form-error">
//             {errors.submit}
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default DesignationForm;










import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './DesignationCSS/DesignationForm.css';
import apiClient from '../../../services/axios';

const DesignationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    rank: '',
    is_teaching: false,
    pay_scale: '',
    responsibilities: []
  });
  const [currentResponsibility, setCurrentResponsibility] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleToggleTeaching = () => {
    setFormData(prev => ({
      ...prev,
      is_teaching: !prev.is_teaching
    }));
  };

  const handleAddResponsibility = () => {
    if (currentResponsibility.trim()) {
      setFormData(prev => ({
        ...prev,
        responsibilities: [...prev.responsibilities, currentResponsibility.trim()]
      }));
      setCurrentResponsibility('');
    }
  };

  const handleRemoveResponsibility = (index) => {
    setFormData(prev => ({
      ...prev,
      responsibilities: prev.responsibilities.filter((_, i) => i !== index)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.rank) newErrors.rank = 'Rank is required';
    if (isNaN(formData.rank)) newErrors.rank = 'Rank must be a number';
    if (!formData.pay_scale.trim()) newErrors.pay_scale = 'Pay scale is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setLoading(true);
      const response = await apiClient.post('/api/features/createDesignation', formData);
      console.log(response.data); // Log the response data for debugging
      
      navigate('/admin/designationlist', { 
        state: { message: 'Designation created successfully!' } 
      });
    } catch (error) {
      console.error('Error creating designation:', error);
      if (error.response?.data?.error) {
        setErrors({ submit: error.response.data.error });
      } else {
        setErrors({ submit: 'Failed to create designation. Please try again.' });
      }
      setLoading(false);
    }
  };

  return (
    <div className="designation-form-container">
      <div className="form-header">
        <h1>Create New Designation</h1>
        <p>Define a new faculty or staff position</p>
      </div>

      <form onSubmit={handleSubmit} className="designation-form">
        <div className="form-grid">
          {/* Basic Information */}
          <div className="form-section">
            <h2 className="section-title">Basic Information</h2>

            <div className={`form-group ${errors.title ? 'has-error' : ''}`}>
              <label htmlFor="title">Designation Title*</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g., Associate Professor"
              />
              {errors.title && <span className="error-message">{errors.title}</span>}
            </div>

            <div className={`form-group ${errors.rank ? 'has-error' : ''}`}>
              <label htmlFor="rank">Rank*</label>
              <input
                type="number"
                id="rank"
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                placeholder="Numerical rank (e.g., 1, 2, 3)"
                min="1"
              />
              {errors.rank && <span className="error-message">{errors.rank}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="pay_scale">Pay Scale*</label>
              <input
                type="text"
                id="pay_scale"
                name="pay_scale"
                value={formData.pay_scale}
                onChange={handleChange}
                placeholder="e.g., Level 12 or $75,000 - $90,000"
              />
              {errors.pay_scale && <span className="error-message">{errors.pay_scale}</span>}
            </div>
          </div>

          {/* Position Type */}
          <div className="form-section">
            <h2 className="section-title">Position Type</h2>

            <div className="form-group toggle-group">
              <label>Is this a teaching position?</label>
              <div className="toggle-switch-wrapper">
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={formData.is_teaching}
                    onChange={handleToggleTeaching}
                  />
                  <span className="slider round"></span>
                </label>
                <span className="toggle-label">
                  {formData.is_teaching ? 'Teaching' : 'Non-Teaching'}
                </span>
              </div>
            </div>
          </div>

          {/* Responsibilities */}
          <div className="form-section full-width">
            <h2 className="section-title">Responsibilities</h2>

            <div className="form-group">
              <label>Add Responsibility</label>
              <div className="input-with-button">
                <input
                  type="text"
                  value={currentResponsibility}
                  onChange={(e) => setCurrentResponsibility(e.target.value)}
                  placeholder="e.g., Conduct research, Teach undergraduate courses"
                />
                <button
                  type="button"
                  className="add-button"
                  onClick={handleAddResponsibility}
                  disabled={!currentResponsibility.trim()}
                >
                  Add
                </button>
              </div>
            </div>

            {formData.responsibilities.length > 0 && (
              <div className="responsibilities-list">
                <h4>Current Responsibilities:</h4>
                <ul>
                  {formData.responsibilities.map((item, index) => (
                    <li key={index}>
                      {item}
                      <button
                        type="button"
                        className="remove-button"
                        onClick={() => handleRemoveResponsibility(index)}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate('/designations')}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Designation'}
          </button>
        </div>

        {errors.submit && (
          <div className="form-error">
            {errors.submit}
          </div>
        )}
      </form>
    </div>
  );
};

export default DesignationForm;
