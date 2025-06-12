import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from sessionStorage
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('loginTime');
    onLogout();
  };

  return (
    <button 
      onClick={handleLogout}
      className="btn btn-outline-danger btn-sm"
    >
      <i className="bi bi-box-arrow-right me-1"></i>
      Logout
    </button>
  );
};

export default LogoutButton; 