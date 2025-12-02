// App.jsx
import React, { useState, useEffect } from 'react';
import Navbar from "./components/layout/Navbar.jsx";
import Sidebar from "./components/layout/Sidebar.jsx";
import MainPage from './pages/MainPage/MainPage.jsx';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1024);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    
    // For mobile/tablet, add/remove class to body to prevent scrolling
    if (window.innerWidth <= 1024) {
      if (!isSidebarOpen) {
        document.body.classList.add('sidebar-open-mobile');
      } else {
        document.body.classList.remove('sidebar-open-mobile');
      }
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1024);
      // Close sidebar on resize to desktop if it was open on mobile
      if (window.innerWidth > 1024 && isSidebarOpen) {
        setIsSidebarOpen(false);
        document.body.classList.remove('sidebar-open-mobile');
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isSidebarOpen]);

  // Close sidebar when clicking on overlay (mobile/tablet)
  const handleOverlayClick = () => {
    if (isMobile && isSidebarOpen) {
      toggleSidebar();
    }
  };

  return (
    <Router>
      <div className="app">
        <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
        <Sidebar isOpen={isSidebarOpen} />
        <MainPage 
          isSidebarOpen={isSidebarOpen} 
          onOverlayClick={handleOverlayClick}
        />
      </div>
    </Router>
  );
}

export default App;