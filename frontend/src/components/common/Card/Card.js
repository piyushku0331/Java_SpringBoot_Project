import React from 'react';
import './Card.css';

/**
 * Card component for displaying content in a contained box
 * @param {string} title - Card title
 * @param {node} children - Card content
 * @param {string} className - Additional CSS classes
 * @param {boolean} elevated - Whether to show elevation shadow
 */
const Card = ({ 
  title, 
  children, 
  className = '', 
  elevated = false,
  ...props 
}) => {
  const cardClass = `card ${elevated ? 'card-elevated' : ''} ${className}`;
  
  return (
    <div className={cardClass} {...props}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;