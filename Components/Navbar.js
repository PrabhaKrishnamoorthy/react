import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className="d-flex">
      <h1>Employee</h1>
      <button onClick={handleLogout} className="btn btn-sm btn-info margin-left">
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
