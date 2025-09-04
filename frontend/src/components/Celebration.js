import React, { useEffect } from 'react';

const Celebration = ({ onComplete, userName }) => {
  const currentStep = 3;
  const progress = 100;

  useEffect(() => {
    onComplete();
  }, [onComplete]);

  return (
    <div className="celebration-overlay">
      <div className="celebration-message">
          <div className="celebration-content">
            {/* Animated Progress Bar */}
            <div className="celebration-progress">
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
              <div className="progress-text">Setting up your account... {Math.round(progress)}%</div>
            </div>

            {/* Dynamic Celebration Icon */}
            <div className="celebration-icon-container">
              <div className={`celebration-icon ${currentStep >= 1 ? 'active' : ''}`}>🎉</div>
              <div className={`celebration-icon ${currentStep >= 2 ? 'active' : ''}`}>✨</div>
              <div className={`celebration-icon ${currentStep >= 3 ? 'active' : ''}`}>🏆</div>
            </div>

            <h1 className="celebration-title">
              Welcome to Our Bank!
              <div className="title-decoration"></div>
            </h1>

            <p className="celebration-subtitle">
              Congratulations <span className="user-highlight">{userName}</span>!
              Your account has been created successfully.
            </p>

            {/* Enhanced Features Grid */}
            <div className="celebration-features">
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">🏦</span>
                  <div className="icon-glow"></div>
                </div>
                <span className="feature-text">Secure Banking</span>
                <div className="feature-check">✓</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">💳</span>
                  <div className="icon-glow"></div>
                </div>
                <span className="feature-text">Digital Cards</span>
                <div className="feature-check">✓</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">📊</span>
                  <div className="icon-glow"></div>
                </div>
                <span className="feature-text">Financial Insights</span>
                <div className="feature-check">✓</div>
              </div>
              <div className="feature-item">
                <div className="feature-icon-wrapper">
                  <span className="feature-icon">🔒</span>
                  <div className="icon-glow"></div>
                </div>
                <span className="feature-text">Bank-Level Security</span>
                <div className="feature-check">✓</div>
              </div>
            </div>

            {/* Enhanced Loading Animation */}
            <div className="celebration-loading">
              <div className="loading-spinner">
                <div className="spinner-ring"></div>
                <div className="spinner-center"></div>
              </div>
              <div className="loading-text">
                <span className="loading-step">
                  {currentStep === 0 && "Initializing..."}
                  {currentStep === 1 && "Creating your profile..."}
                  {currentStep === 2 && "Setting up security..."}
                  {currentStep === 3 && "Almost ready!"}
                </span>
              </div>
            </div>

            {/* Success Message */}
            <div className="success-message">
              <div className="success-icon">🎊</div>
              <p>Your account is ready! Redirecting to dashboard...</p>
            </div>
          </div>
        </div>
    </div>
  );
};

export default Celebration;