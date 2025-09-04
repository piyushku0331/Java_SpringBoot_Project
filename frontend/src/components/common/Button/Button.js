import React from 'react';
import './Button.css';

/**
 * Button component for consistent UI elements across the application
 * @param {string} type - Button type (primary, secondary, danger, success)
 * @param {string} size - Button size (small, medium, large)
 * @param {boolean} disabled - Whether the button is disabled
 * @param {function} onClick - Click handler function
 * @param {node} children - Button content
 * @param {string} className - Additional CSS classes
 */
const Button = ({ 
  type = 'primary', 
  size = 'medium', 
  disabled = false, 
  onClick, 
  children, 
  className = '',
  ...props 
}) => {
  const buttonClass = `button ${type} ${size} ${className}`;
  
  return (
    <button 
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;