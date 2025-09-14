import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount } from '../../services/accountService';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button/Button';
import './Accounts.css';

const CreateAccount = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    accountType: 'SAVINGS',
    initialDeposit: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.accountType) {
      newErrors.accountType = 'Please select an account type';
    }

    if (!formData.initialDeposit || parseFloat(formData.initialDeposit) < 0) {
      newErrors.initialDeposit = 'Please enter a valid initial deposit amount';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Debug authentication status
    console.log('=== ACCOUNT CREATION DEBUG ===');
    console.log('User from AuthContext:', user);
    console.log('Is authenticated:', !!user);
    console.log('User ID:', user?.id);
    console.log('localStorage token:', localStorage.getItem('token'));
    console.log('localStorage user:', localStorage.getItem('user'));
    console.log('All localStorage keys:', Object.keys(localStorage));
    console.log('localStorage contents:', { ...localStorage });

    if (!user) {
      console.error('No user found - user is not logged in!');
      setErrors({
        submit: 'You must be logged in to create an account. Please log in first.'
      });
      return;
    }

    if (!user.id) {
      console.error('User has no ID:', user);
      setErrors({
        submit: 'User information is incomplete. Please log in again.'
      });
      return;
    }

    setLoading(true);
    try {
      const accountData = {
        userId: user.id,
        accountType: formData.accountType,
        initialDeposit: parseFloat(formData.initialDeposit)
      };

      console.log('Creating account with data:', accountData);
      const response = await createAccount(accountData);
      console.log('Account created successfully:', response);

      navigate('/accounts', {
        state: { message: 'Account created successfully!' }
      });
    } catch (error) {
      console.error('Account creation error:', error);
      console.error('Error response status:', error.response?.status);
      console.error('Error response data:', error.response?.data);
      setErrors({
        submit: error.response?.data?.error || 'Account creation failed. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="accounts-container page-container">
      <div className="accounts-header">
        <h2>Open New Account</h2>
        <Button type="secondary" onClick={() => navigate('/accounts')}>
          Back to Accounts
        </Button>
      </div>

      <div className="account-form-container">
        <form onSubmit={handleSubmit} className="account-form">
          <div className="form-section">
            <h3>Account Details</h3>

            <div className="form-group">
              <label htmlFor="accountType">Account Type</label>
              <select
                id="accountType"
                name="accountType"
                value={formData.accountType}
                onChange={handleInputChange}
                className={`form-control ${errors.accountType ? 'error' : ''}`}
              >
                <option value="SAVINGS">Savings Account</option>
                <option value="CURRENT">Current Account</option>
                <option value="FIXED_DEPOSIT">Fixed Deposit</option>
              </select>
              {errors.accountType && <span className="error-text">{errors.accountType}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="initialDeposit">Initial Deposit (₹)</label>
              <input
                type="number"
                id="initialDeposit"
                name="initialDeposit"
                value={formData.initialDeposit}
                onChange={handleInputChange}
                className={`form-control ${errors.initialDeposit ? 'error' : ''}`}
                placeholder="Enter initial deposit amount"
                min="0"
                step="100"
              />
              {errors.initialDeposit && <span className="error-text">{errors.initialDeposit}</span>}
            </div>
          </div>

          {errors.submit && (
            <div className="error-message">
              {errors.submit}
            </div>
          )}

          <div className="form-actions">
            <Button type="secondary" onClick={() => navigate('/accounts')}>
              Cancel
            </Button>
            <Button type="primary" disabled={loading}>
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;