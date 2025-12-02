// components/ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';
const ProtectedRoute = ({ children, allowedRoles }) => {
    const location = useLocation();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
  
    if (!token) {
      return <Navigate to="/login" state={{ from: location }} replace />;
    }
  
    // Normalize roles for comparison
    const normalizedAllowedRoles = allowedRoles?.map(r => r.toLowerCase());
    const normalizedUserRole = role?.toLowerCase();
  
    if (allowedRoles && !normalizedAllowedRoles.includes(normalizedUserRole)) {
      return <Navigate to="/unauthorized" replace />;
    }
    console.log(
        `Role: ${role}, Allowed Roles: ${allowedRoles}, Access Granted: ${
          allowedRoles?.map(r => r.toLowerCase()).includes(role)
        }`
      );
  
    return children;
  };

export default ProtectedRoute;