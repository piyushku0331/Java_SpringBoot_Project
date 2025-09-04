import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShieldAlt, FaLock, FaUserShield } from 'react-icons/fa';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Main Footer Sections */}
        <div className="footer-sections">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <FaShieldAlt className="logo-icon" />
              <h3>NextGen Bank</h3>
            </div>
            <p className="company-description">
              Empowering your financial future with innovative banking solutions, 
              cutting-edge security, and personalized service.
            </p>
            <div className="social-links">
              <button type="button" className="social-link" aria-label="Facebook">
                <FaFacebook />
              </button>
              <button type="button" className="social-link" aria-label="Twitter">
                <FaTwitter />
              </button>
              <button type="button" className="social-link" aria-label="LinkedIn">
                <FaLinkedin />
              </button>
              <button type="button" className="social-link" aria-label="Instagram">
                <FaInstagram />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/accounts">Accounts</Link></li>
              <li><Link to="/transactions">Transactions</Link></li>
              <li><Link to="/loans">Loans</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="footer-section">
            <h4>Services</h4>
            <ul className="footer-links">
              <li><Link to="/accounts">Personal Banking</Link></li>
              <li><Link to="/loans">Loan Services</Link></li>
              <li><Link to="/transactions">Money Transfer</Link></li>
              <li><Link to="/accounts">Investment Accounts</Link></li>
              <li><Link to="/accounts">Business Banking</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div className="footer-section">
            <h4>Support</h4>
            <ul className="footer-links">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/support">Live Chat</Link></li>
              <li><Link to="/feedback">Feedback</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-section">
            <h4>Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <span>7988327875</span>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <span>support@nextgenbank.com</span>
              </div>
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <span>Chitkara University, Rajpura, Punjab(140402)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="security-badge">
          <div className="security-info">
            <FaLock className="security-icon" />
            <span>256-bit SSL Encryption</span>
          </div>
          <div className="security-info">
            <FaUserShield className="security-icon" />
            <span>FDIC Insured</span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {currentYear} NextGen Bank. All rights reserved.</p>
            <div className="legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
