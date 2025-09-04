import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../../../context/AuthContext';
import Button from '../../common/Button/Button';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className={`glass-navbar ${isMobile ? 'mobile-hidden' : ''}`}>
        <Link to="/" onClick={closeMobileMenu}>Home</Link>

        {!isAuthenticated ? (
          <>
            <Link to="/login" onClick={closeMobileMenu}>Login</Link>
            <Link to="/register" onClick={closeMobileMenu}>Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard" onClick={closeMobileMenu}>Dashboard</Link>
            <Link to="/accounts" onClick={closeMobileMenu}>Accounts</Link>
            <Link to="/transactions" onClick={closeMobileMenu}>Transactions</Link>
            <Link to="/loans" onClick={closeMobileMenu}>Loans</Link>
            <span className="user-info">
              Welcome, {user?.firstName || user?.email}
            </span>
            <Button type="secondary" size="small" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </nav>

      {/* Mobile Header */}
      {isMobile && (
        <div className="mobile-header">
          <Link to="/" className="mobile-logo" onClick={closeMobileMenu}>
            Banking App
          </Link>
          <button
            className="hamburger-menu"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
            <span className={`hamburger-line ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>
      )}

      {/* Mobile Sidebar */}
      {isMobile && (
        <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="sidebar-content">
            <div className="sidebar-header">
              <h3>Menu</h3>
              <button
                className="close-sidebar"
                onClick={closeMobileMenu}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <nav className="sidebar-nav">
              <Link to="/" onClick={closeMobileMenu}>
                <span className="nav-icon">🏠</span>
                Home
              </Link>

              {!isAuthenticated ? (
                <>
                  <Link to="/login" onClick={closeMobileMenu}>
                    <span className="nav-icon">🔐</span>
                    Login
                  </Link>
                  <Link to="/register" onClick={closeMobileMenu}>
                    <span className="nav-icon">📝</span>
                    Register
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/dashboard" onClick={closeMobileMenu}>
                    <span className="nav-icon">📊</span>
                    Dashboard
                  </Link>
                  <Link to="/accounts" onClick={closeMobileMenu}>
                    <span className="nav-icon">🏦</span>
                    Accounts
                  </Link>
                  <Link to="/transactions" onClick={closeMobileMenu}>
                    <span className="nav-icon">💳</span>
                    Transactions
                  </Link>
                  <Link to="/loans" onClick={closeMobileMenu}>
                    <span className="nav-icon">💰</span>
                    Loans
                  </Link>

                  <div className="sidebar-user-info">
                    <div className="user-avatar" title={`${user?.firstName || 'User'} ${user?.lastName || ''}`}>
                      <span className="avatar-letter">
                        {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                      </span>
                      <div className="avatar-status"></div>
                    </div>
                    <div className="user-details">
                      <p className="user-name">
                        {user?.firstName || 'User'}
                        {user?.lastName && ` ${user?.lastName}`}
                      </p>
                      <p className="user-email">{user?.email}</p>
                      <div className="user-role">Premium Member</div>
                    </div>
                  </div>

                  <button className="sidebar-logout-btn" onClick={handleLogout}>
                    <span className="nav-icon">🚪</span>
                    Logout
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Sidebar Overlay */}
      {isMobile && isMobileMenuOpen && (
        <div className="sidebar-overlay" onClick={closeMobileMenu}></div>
      )}
    </>
  );
}
