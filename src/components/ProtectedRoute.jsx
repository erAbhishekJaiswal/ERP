// // components/ProtectedRoute.js
// import { Navigate, useLocation } from 'react-router-dom';
// import { isAuthorized, getDefaultRoute } from '../utils/authRoutes';

// const ProtectedRoute = ({ children, roles }) => {
//   const location = useLocation();
//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem('role');

//   if (!token) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   if (roles && !roles.includes(role)) {
//     // Redirect to default route for their role with a message
//     return (
//       <Navigate 
//         to={getDefaultRoute(role)} 
//         state={{ 
//           from: location,
//           message: "You don't have permission to access this page"
//         }} 
//         replace 
//       />
//     );
//   }

//   if (!isAuthorized(role, location.pathname)) {
//     return (
//       <Navigate 
//         to={getDefaultRoute(role)} 
//         state={{ 
//           from: location,
//           message: "You don't have permission to access this page"
//         }} 
//         replace 
//       />
//     );
//   }

//   return children;
// };

// export default ProtectedRoute;





// components/ProtectedRoute.js
import { Navigate, useLocation } from 'react-router-dom';
// import { toast } from 'react-toastify';

// const ProtectedRoute = ({ children, allowedRoles }) => {
//   const location = useLocation();
//   const token = localStorage.getItem('token');
//   const role = localStorage.getItem('role');

//   // If no token, redirect to login
//   if (!token) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // If route has specific role requirements and user doesn't have required role
//   if (allowedRoles && !allowedRoles.includes(role)) {
//     // toast.error("You don't have permission to access this page");
//     alert("You don't have permission to access this page");
//     return <Navigate to="/" replace />
//   }
//   return children;
// };

// ProtectedRoute.js
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