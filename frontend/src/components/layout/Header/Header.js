import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/dashboard" className="header-logo">
          <img src="/favicon.ico" alt="Banking App Logo" className="logo-icon" />
          <span className="site-name">NextGen Bank</span>
        </Link>

        <div className="header-actions">
          <span className="user-greeting">
            Welcome, {user?.firstName || user?.email || 'User'}
          </span>
          <button
            onClick={handleLogout}
            className="logout-btn"
            title="Logout"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;