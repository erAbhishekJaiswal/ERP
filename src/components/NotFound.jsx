// components/NotFound.js
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import './NotFound.css'; // Assuming you have some CSS for styling

const NotFound = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Show error message if it was passed in state
    if (location.state?.errorMessage) {
      toast.error(location.state.errorMessage);
    } else {
      toast.error("The page you're looking for doesn't exist");
    }
    
    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return (
    <div className="not-found-container">
      <h1>404 - Page Not Found</h1>
      <p>You will be redirected to the home page shortly...</p>
    </div>
  );
};

export default NotFound;