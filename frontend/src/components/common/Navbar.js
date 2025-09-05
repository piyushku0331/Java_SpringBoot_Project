import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem('token') || localStorage.getItem('adminToken');
  const isAdmin = localStorage.getItem('adminToken');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`navbar glass ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <div className="logo-container">
            <div className="logo-icon">
              <div className="logo-gradient"></div>
            </div>
            <span className="logo-text text-gradient">BankApp</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="navbar-menu">
          <div className="navbar-nav">
            <Link 
              to="/" 
              className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
            >
              <span className="nav-text">Home</span>
              <div className="nav-indicator"></div>
            </Link>
            
            {isLoggedIn && !isAdmin && (
              <>
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                >
                  <span className="nav-text">Dashboard</span>
                  <div className="nav-indicator"></div>
                </Link>
                <Link 
                  to="/transactions" 
                  className={`nav-link ${location.pathname === '/transactions' ? 'active' : ''}`}
                >
                  <span className="nav-text">Transactions</span>
                  <div className="nav-indicator"></div>
                </Link>
              </>
            )}

            {isAdmin && (
              <>
                <Link 
                  to="/admin/dashboard" 
                  className={`nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
                >
                  <span className="nav-text">Admin Dashboard</span>
                  <div className="nav-indicator"></div>
                </Link>
                <Link 
                  to="/admin/users" 
                  className={`nav-link ${location.pathname === '/admin/users' ? 'active' : ''}`}
                >
                  <span className="nav-text">User Management</span>
                  <div className="nav-indicator"></div>
                </Link>
              </>
            )}
          </div>

          {/* Auth Buttons */}
          <div className="navbar-auth">
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="btn-modern btn-outline">
                  Login
                </Link>
                <Link to="/register" className="btn-modern">
                  Register
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn-modern btn-logout">
                <span>Logout</span>
                <div className="logout-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke="currentColor" strokeWidth="2"/>
                    <polyline points="16,17 21,12 16,7" stroke="currentColor" strokeWidth="2"/>
                    <line x1="21" y1="12" x2="9" y2="12" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu glass ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav">
          <Link 
            to="/" 
            className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          
          {isLoggedIn && !isAdmin && (
            <>
              <Link 
                to="/dashboard" 
                className={`mobile-nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link 
                to="/transactions" 
                className={`mobile-nav-link ${location.pathname === '/transactions' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Transactions
              </Link>
            </>
          )}

          {isAdmin && (
            <>
              <Link 
                to="/admin/dashboard" 
                className={`mobile-nav-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Admin Dashboard
              </Link>
              <Link 
                to="/admin/users" 
                className={`mobile-nav-link ${location.pathname === '/admin/users' ? 'active' : ''}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                User Management
              </Link>
            </>
          )}

          <div className="mobile-auth">
            {!isLoggedIn ? (
              <>
                <Link 
                  to="/login" 
                  className="btn-modern btn-outline"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn-modern"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="btn-modern btn-logout">
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
