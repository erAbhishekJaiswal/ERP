// // Unauthorized.js
// import { useNavigate } from 'react-router-dom';

// const Unauthorized = () => {
//   const navigate = useNavigate();
//   const role = localStorage.getItem('role');

//   return (
//     <div className="unauthorized-container">
//       <h1>403 - Unauthorized Access</h1>
//       <p>You don't have permission to view this page.</p>
//       <button onClick={() => navigate(-1)}>Go Back</button>
//       <button onClick={() => navigate('/')}>Go to Home</button>
//     </div>
//   );
// };

// export default Unauthorized;












import { useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaHome, FaLock } from 'react-icons/fa';
import './Unauthorized.css'; // Create this CSS file

const Unauthorized = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem('role');

  return (
    <div className="unauthorized-container">
      <div className="unauthorized-card">
        <div className="unauthorized-icon">
          <FaLock size={64} />
        </div>
        <h1 className="unauthorized-title">403 - Access Denied</h1>
        <p className="unauthorized-message">
          Oops! You don't have permission to view this page.
          {role && ` Your current role (${role}) doesn't have access.`}
        </p>
        
        <div className="unauthorized-actions">
          <button 
            className="unauthorized-btn back-btn"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="btn-icon" />
            Go Back
          </button>
          <button 
            className="unauthorized-btn home-btn"
            onClick={() => navigate('/')}
          >
            <FaHome className="btn-icon" />
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default Unauthorized;