/**
 * Utility functions for formatting data in the application
 */

/**
 * Format a number as currency (INR)
 * @param {number} amount - The amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Format a date string to a readable format (MM/DD/YYYY)
 * @param {string|number|Date} dateInput - The date input to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateInput) => {
  if (!dateInput) return 'N/A';

  try {
    let date;

    // Handle different input types
    if (dateInput instanceof Date) {
      date = dateInput;
    } else if (typeof dateInput === 'number') {
      // Handle timestamps
      date = new Date(dateInput);
    } else if (typeof dateInput === 'string') {
      // Handle string dates - try different formats
      // First try ISO format
      date = new Date(dateInput);

      // If that doesn't work, try other common formats
      if (isNaN(date.getTime())) {
        // Try MM/DD/YYYY format
        const parts = dateInput.split('/');
        if (parts.length === 3) {
          date = new Date(parts[2], parts[0] - 1, parts[1]);
        }
      }

      // If still invalid, try DD/MM/YYYY format
      if (isNaN(date.getTime())) {
        const parts = dateInput.split('/');
        if (parts.length === 3) {
          date = new Date(parts[2], parts[1] - 1, parts[0]);
        }
      }
    } else {
      return 'Invalid Date';
    }

    // Final validation
    if (isNaN(date.getTime())) {
      return 'Invalid Date';
    }

    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).format(date);
  } catch (error) {
    console.warn('Error formatting date:', dateInput, error);
    return 'Invalid Date';
  }
};

/**
 * Format a timestamp to a readable time format (HH:MM AM/PM)
 * @param {string|number|Date} timeInput - The time input to format
 * @returns {string} Formatted time string
 */
export const formatTime = (timeInput) => {
  if (!timeInput) return 'N/A';

  try {
    let date;

    // Handle different input types
    if (timeInput instanceof Date) {
      date = timeInput;
    } else if (typeof timeInput === 'number') {
      // Handle timestamps
      date = new Date(timeInput);
    } else if (typeof timeInput === 'string') {
      // Handle string timestamps
      date = new Date(timeInput);
    } else {
      return 'Invalid Time';
    }

    // Final validation
    if (isNaN(date.getTime())) {
      return 'Invalid Time';
    }

    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    }).format(date);
  } catch (error) {
    console.warn('Error formatting time:', timeInput, error);
    return 'Invalid Time';
  }
};

/**
 * Format a phone number to (XXX) XXX-XXXX format
 * @param {string} phoneNumber - The phone number to format
 * @returns {string} Formatted phone number
 */
export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '';
  
  // Remove all non-numeric characters
  const cleaned = phoneNumber.replace(/\D/g, '');
  
  // Check if the input is of correct length
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  
  return phoneNumber;
};

/**
 * Format an account number to show only last 4 digits
 * @param {string} accountNumber - The account number to mask
 * @returns {string} Masked account number
 */
export const maskAccountNumber = (accountNumber) => {
  if (!accountNumber) return '';
  
  const last4 = accountNumber.slice(-4);
  const masked = 'XXXX-XXXX-' + last4;
  
  return masked;
};

/**
 * Format a percentage value
 * @param {number} value - The percentage value
 * @param {number} decimals - Number of decimal places
 * @returns {string} Formatted percentage
 */
export const formatPercentage = (value, decimals = 2) => {
  if (value === null || value === undefined) return '';
  
  return value.toFixed(decimals) + '%';
};