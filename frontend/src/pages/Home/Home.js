import React from "react";
import { Link } from "react-router-dom";
import { FaShieldAlt, FaChartLine, FaMobileAlt, FaRocket, FaStar, FaGem, FaLinkedin, FaTwitter } from "react-icons/fa";
import './Home.css';

export default function Home() {

    return (
        <div className="home-container page-container">
            {/* Hero Section with Three Boxes */}
            <section className="hero-section">
                <div className="hero-content stagger-children">
                    <div className="hero-badge">
                        <FaStar className="star-icon" />
                        <span>Trusted by 1M+ customers</span>
                    </div>

                    <h1 className="hero-title">
                        <span className="gradient-text">Welcome to</span>
                        <br />
                        <span className="main-title">NextGen Bank India</span>
                    </h1>

                    <p className="hero-subtitle">
                        Your trusted partner for modern Indian banking. Experience seamless digital banking
                        with UPI, IMPS, NEFT, and RTGS transfers.
                    </p>

                    <div className="hero-boxes">
                        <div className="hero-box">
                            <div className="box-content">
                                <FaShieldAlt className="box-icon" />
                                <h3 className="box-title">Secure Banking</h3>
                                <p className="box-description">RBI compliant security with advanced encryption</p>
                            </div>
                        </div>
                        <div className="hero-box">
                            <div className="box-content">
                                <FaChartLine className="box-icon" />
                                <h3 className="box-title">UPI Payments</h3>
                                <p className="box-description">Instant transfers with UPI, IMPS, NEFT & RTGS</p>
                            </div>
                        </div>
                        <div className="hero-box">
                            <div className="box-content">
                                <FaMobileAlt className="box-icon" />
                                <h3 className="box-title">Mobile Banking</h3>
                                <p className="box-description">Complete banking solutions on your mobile</p>
                            </div>
                        </div>
                    </div>

                    <div className="hero-actions">
                        <Link to="/login" className="cta-button primary-button hover-lift transition-base">
                            <FaRocket className="button-icon" />
                            Get Started
                        </Link>
                        <Link to="/register" className="cta-button secondary-button hover-lift transition-base">
                            <FaGem className="button-icon" />
                            Create Account
                        </Link>
                    </div>
                </div>
            </section>

            {/* Enhanced Features Section */}
            <section className="features-section">
                <div className="section-header">
                    <h2 className="section-title">Why Choose Us</h2>
                    <p className="section-subtitle">Experience banking like never before</p>
                </div>

                <div className="features-grid stagger-children">
                    <div className="feature-card hover-lift-3d">
                        <div className="feature-icon-wrapper">
                            <div className="feature-icon-bg"></div>
                            <FaShieldAlt className="feature-icon" />
                        </div>
                        <h3 className="feature-title">RBI Compliant Security</h3>
                        <p className="feature-description">
                            Fully compliant with RBI guidelines and regulations. Your data is protected
                            with bank-grade security, OTP verification, and real-time fraud detection.
                        </p>
                        <div className="feature-highlight">
                            <span>RBI Approved</span>
                        </div>
                    </div>

                    <div className="feature-card hover-lift-3d">
                        <div className="feature-icon-wrapper">
                            <div className="feature-icon-bg"></div>
                            <FaChartLine className="feature-icon" />
                        </div>
                        <h3 className="feature-title">UPI & Digital Payments</h3>
                        <p className="feature-description">
                            Send money instantly with UPI, IMPS, NEFT, and RTGS. Create UPI IDs,
                            scan QR codes, and enjoy seamless digital payments across India.
                        </p>
                        <div className="feature-highlight">
                            <span>Instant UPI Transfers</span>
                        </div>
                    </div>

                    <div className="feature-card hover-lift-3d">
                        <div className="feature-icon-wrapper">
                            <div className="feature-icon-bg"></div>
                            <FaMobileAlt className="feature-icon" />
                        </div>
                        <h3 className="feature-title">Indian Banking Services</h3>
                        <p className="feature-description">
                            Complete banking solutions including savings accounts, current accounts,
                            fixed deposits, recurring deposits, and personal loans with competitive rates.
                        </p>
                        <div className="feature-highlight">
                            <span>Complete Banking Suite</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Customer Testimonials Section */}
            <section className="testimonials-section">
                <div className="section-header">
                    <h2 className="section-title">What Our Customers Say</h2>
                    <p className="section-subtitle">Real stories from real customers</p>
                </div>

                <div className="testimonials-grid stagger-children">
                    <div className="testimonial-card hover-lift">
                        <div className="customer-avatar">
                            <div className="customer-initials">A</div>
                        </div>
                        <div className="customer-info">
                            <h4 className="customer-name">Arjun Sharma</h4>
                            <p className="customer-title">Software Engineer</p>
                            <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="star">⭐</span>
                                ))}
                            </div>
                        </div>
                        <blockquote className="testimonial-text">
                            "NextGen Bank's UPI integration is fantastic! I can transfer money instantly to anyone
                            across India. The mobile app is intuitive and the security features give me complete peace of mind."
                        </blockquote>
                        <div className="testimonial-highlight">
                            <span>Best UPI experience!</span>
                        </div>
                    </div>

                    <div className="testimonial-card hover-lift">
                        <div className="customer-avatar">
                            <div className="customer-initials">P</div>
                        </div>
                        <div className="customer-info">
                            <h4 className="customer-name">Priya Patel</h4>
                            <p className="customer-title">Business Owner</p>
                            <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="star">⭐</span>
                                ))}
                            </div>
                        </div>
                        <blockquote className="testimonial-text">
                            "As a small business owner in Mumbai, I need reliable banking that grows with me. NextGen Bank's
                            business solutions are perfect - from easy current account management to competitive business loan rates."
                        </blockquote>
                        <div className="testimonial-highlight">
                            <span>Perfect for Indian businesses</span>
                        </div>
                    </div>

                    <div className="testimonial-card hover-lift">
                        <div className="customer-avatar">
                            <div className="customer-initials">R</div>
                        </div>
                        <div className="customer-info">
                            <h4 className="customer-name">Rajesh Kumar</h4>
                            <p className="customer-title">Financial Advisor</p>
                            <div className="rating">
                                {[...Array(5)].map((_, i) => (
                                    <span key={i} className="star">⭐</span>
                                ))}
                            </div>
                        </div>
                        <blockquote className="testimonial-text">
                            "I recommend NextGen Bank to all my clients in Delhi. Their fixed deposit and recurring deposit
                            rates are competitive, and the investment tools help people make better financial decisions."
                        </blockquote>
                        <div className="testimonial-highlight">
                            <span>Best FD rates in India</span>
                        </div>
                    </div>
                </div>

                <div className="testimonials-cta">
                    <p>Join thousands of satisfied customers</p>
                    <Link to="/register" className="testimonial-button hover-lift transition-base hover-underline">
                        <FaGem className="button-icon" />
                        Start Your Journey
                    </Link>
                </div>
            </section>

            {/* Team Members Section */}
            <section className="team-section">
                <div className="section-header">
                    <h2 className="section-title">Meet Our Team</h2>
                    <p className="section-subtitle">The brilliant minds behind NextGen Bank</p>
                </div>

                <div className="team-grid stagger-children">
                    <div className="team-member-card hover-lift">
                        <div className="member-avatar">
                            <div className="member-initials">P</div>
                            <div className="member-overlay">
                                <div className="social-links">
                                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                        <FaLinkedin />
                                    </a>
                                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                                        <FaTwitter />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="member-info">
                            <h3 className="member-name">Piyush</h3>
                            <p className="member-role">Role to be assigned</p>
                            <p className="member-description">
                                Dedicated team member contributing to the development and success of NextGen Bank's innovative solutions.
                            </p>
                            <div className="member-expertise">
                                <span className="expertise-tag">Development</span>
                                <span className="expertise-tag">Innovation</span>
                                <span className="expertise-tag">Teamwork</span>
                            </div>
                        </div>
                    </div>

                    <div className="team-member-card hover-lift">
                        <div className="member-avatar">
                            <div className="member-initials">P</div>
                            <div className="member-overlay">
                                <div className="social-links">
                                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                        <FaLinkedin />
                                    </a>
                                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                                        <FaTwitter />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="member-info">
                            <h3 className="member-name">Pranav</h3>
                            <p className="member-role">Role to be assigned</p>
                            <p className="member-description">
                                Passionate team member focused on delivering exceptional banking experiences and cutting-edge technology solutions.
                            </p>
                            <div className="member-expertise">
                                <span className="expertise-tag">Technology</span>
                                <span className="expertise-tag">Problem Solving</span>
                                <span className="expertise-tag">Collaboration</span>
                            </div>
                        </div>
                    </div>

                    <div className="team-member-card hover-lift">
                        <div className="member-avatar">
                            <div className="member-initials">P</div>
                            <div className="member-overlay">
                                <div className="social-links">
                                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                        <FaLinkedin />
                                    </a>
                                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                                        <FaTwitter />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="member-info">
                            <h3 className="member-name">Prachi</h3>
                            <p className="member-role">Role to be assigned</p>
                            <p className="member-description">
                                Creative team member dedicated to building user-friendly interfaces and seamless banking experiences.
                            </p>
                            <div className="member-expertise">
                                <span className="expertise-tag">Design</span>
                                <span className="expertise-tag">User Experience</span>
                                <span className="expertise-tag">Innovation</span>
                            </div>
                        </div>
                    </div>

                    <div className="team-member-card hover-lift">
                        <div className="member-avatar">
                            <div className="member-initials">P</div>
                            <div className="member-overlay">
                                <div className="social-links">
                                    <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="LinkedIn">
                                        <FaLinkedin />
                                    </a>
                                    <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-link" aria-label="Twitter">
                                        <FaTwitter />
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="member-info">
                            <h3 className="member-name">Pranjal</h3>
                            <p className="member-role">Role to be assigned</p>
                            <p className="member-description">
                                Skilled team member committed to developing robust backend systems and ensuring platform reliability.
                            </p>
                            <div className="member-expertise">
                                <span className="expertise-tag">Backend</span>
                                <span className="expertise-tag">Security</span>
                                <span className="expertise-tag">Performance</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="team-cta">
                    <p>Join our mission to revolutionize banking</p>
                    <Link to="/careers" className="team-button hover-lift transition-base hover-underline">
                        <FaRocket className="button-icon" />
                        View Open Positions
                    </Link>
                </div>
            </section>

            {/* Interactive CTA Section */}
            <section className="cta-section">
                <div className="cta-background">
                    <div className="cta-particles">
                        {[...Array(20)].map((_, i) => (
                            <div
                                key={i}
                                className="particle"
                            ></div>
                        ))}
                    </div>
                </div>

                <div className="cta-content">
                    <h2 className="cta-title">Ready for Modern Indian Banking?</h2>
                    <p className="cta-subtitle">
                        Join millions of Indians who have already upgraded to digital banking with UPI,
                        instant transfers, and secure banking solutions
                    </p>

                    <div className="cta-buttons">
                        <Link to="/login" className="cta-button primary-button hover-lift transition-base hover-underline">
                            <FaRocket className="button-icon" />
                            Start Banking
                        </Link>
                        <Link to="/register" className="cta-button secondary-button hover-lift transition-base hover-underline">
                            <FaGem className="button-icon" />
                            Open Account
                        </Link>
                    </div>

                    <div className="trust-indicators stagger-children">
                        <div className="trust-item hover-lift">
                            <div className="trust-icon">🔒</div>
                            <span>RBI Compliant</span>
                        </div>
                        <div className="trust-item hover-lift">
                            <div className="trust-icon">⚡</div>
                            <span>Instant UPI</span>
                        </div>
                        <div className="trust-item hover-lift">
                            <div className="trust-icon">💎</div>
                            <span>Indian Banking</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}