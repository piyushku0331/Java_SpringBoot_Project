import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { applyLoan } from '../../services/loanService';
import { getUserAccounts } from '../../services/accountService';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button/Button';
import './Loans.css';

const LoanApplication = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    loanType: 'PERSONAL',
    principalAmount: '',
    interestRate: '',
    termMonths: '',
    purpose: '',
    accountId: '',
    monthlyIncome: '',
    employmentStatus: 'EMPLOYED',
    employerName: '',
    workExperience: '',
    existingDebts: '',
    collateralValue: ''
  });
  const [errors, setErrors] = useState({});

  const fetchUserAccounts = React.useCallback(async () => {
    if (!user?.id) {
      setErrors({ accounts: 'Please log in to view your accounts' });
      return;
    }
    try {
      const userId = user?.id;
      if (!userId) {
        console.error('LoanApplication: User ID not available');
        setErrors({ accounts: 'User not authenticated' });
        return;
      }
      console.log('LoanApplication: Fetching accounts for userId:', userId);
      const response = await getUserAccounts(userId);
      console.log('LoanApplication: Received accounts response:', response);

      // Ensure we have an array
      const accountData = Array.isArray(response) ? response : (response?.data || []);
      console.log('LoanApplication: Processed account data:', accountData);
      setAccounts(accountData);
    } catch (error) {
      console.error('Error fetching accounts:', error);
      setErrors({ accounts: 'Failed to load accounts' });
    }
  }, [user?.id]);

  useEffect(() => {
    fetchUserAccounts();
  }, [fetchUserAccounts]);

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

    if (!formData.loanType) {
      newErrors.loanType = 'Please select a loan type';
    }

    if (!formData.principalAmount || parseFloat(formData.principalAmount) <= 0) {
      newErrors.principalAmount = 'Please enter a valid loan amount';
    }

    if (!formData.termMonths || parseInt(formData.termMonths) <= 0) {
      newErrors.termMonths = 'Please enter a valid loan term';
    }

    if (!formData.purpose.trim()) {
      newErrors.purpose = 'Please enter the loan purpose';
    }

    if (!formData.accountId) {
      newErrors.accountId = 'Please select an account for disbursement';
    }

    if (!formData.monthlyIncome || parseFloat(formData.monthlyIncome) <= 0) {
      newErrors.monthlyIncome = 'Please enter a valid monthly income';
    }

    if (!formData.employmentStatus) {
      newErrors.employmentStatus = 'Please select employment status';
    }

    if (formData.employmentStatus === 'EMPLOYED' && !formData.employerName.trim()) {
      newErrors.employerName = 'Please enter employer name';
    }

    if (!formData.workExperience || parseFloat(formData.workExperience) < 0) {
      newErrors.workExperience = 'Please enter work experience';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateInterestRate = (loanType, amount) => {
    let baseRate;
    switch (loanType) {
      case 'HOME':
        baseRate = 8.5;
        break;
      case 'CAR':
        baseRate = 9.5;
        break;
      case 'PERSONAL':
        baseRate = 12.0;
        break;
      case 'BUSINESS':
        baseRate = 11.0;
        break;
      default:
        baseRate = 12.0;
    }

    if (amount > 1000000) baseRate -= 0.5;
    else if (amount > 500000) baseRate -= 0.25;

    return baseRate;
  };

  const handleLoanTypeChange = (e) => {
    const loanType = e.target.value;
    const amount = parseFloat(formData.principalAmount) || 0;
    const interestRate = calculateInterestRate(loanType, amount);
    
    setFormData(prev => ({
      ...prev,
      loanType,
      interestRate: interestRate.toString()
    }));
  };

  const handleAmountChange = (e) => {
    const amount = parseFloat(e.target.value) || 0;
    const interestRate = calculateInterestRate(formData.loanType, amount);
    
    setFormData(prev => ({
      ...prev,
      principalAmount: e.target.value,
      interestRate: interestRate.toString()
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      const loanData = {
        customerId: user.id,
        loanType: formData.loanType,
        principalAmount: parseFloat(formData.principalAmount),
        interestRate: parseFloat(formData.interestRate),
        termMonths: parseInt(formData.termMonths),
        purpose: formData.purpose,
        accountId: formData.accountId,
        monthlyIncome: parseFloat(formData.monthlyIncome),
        employmentStatus: formData.employmentStatus,
        employerName: formData.employerName,
        workExperience: parseFloat(formData.workExperience),
        existingDebts: parseFloat(formData.existingDebts) || 0,
        collateralValue: parseFloat(formData.collateralValue) || 0
      };

      const response = await applyLoan(loanData);
      console.log('Loan application submitted:', response);
      
      navigate('/dashboard', {
        state: { message: 'Loan application submitted successfully! We will review your application and get back to you soon.' }
      });
    } catch (error) {
      console.error('Loan application error:', error);
      setErrors({ 
        submit: error.response?.data?.error || 'Loan application failed. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="loans-container page-container">
      <div className="loans-header">
        <h2>Apply for Loan</h2>
        <Button type="secondary" onClick={() => navigate('/loans')}>
          Back to Loans
        </Button>
      </div>

      <div className="loan-form-container">
        <form onSubmit={handleSubmit} className="loan-form">
          <div className="form-section">
            <h3>Loan Details</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="loanType">Loan Type</label>
                <select
                  id="loanType"
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleLoanTypeChange}
                  className={`form-control ${errors.loanType ? 'error' : ''}`}
                >
                  <option value="PERSONAL">Personal Loan</option>
                  <option value="HOME">Home Loan</option>
                  <option value="CAR">Car Loan</option>
                  <option value="BUSINESS">Business Loan</option>
                </select>
                {errors.loanType && <span className="error-text">{errors.loanType}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="principalAmount">Loan Amount (₹)</label>
                <input
                  type="number"
                  id="principalAmount"
                  name="principalAmount"
                  value={formData.principalAmount}
                  onChange={handleAmountChange}
                  className={`form-control ${errors.principalAmount ? 'error' : ''}`}
                  placeholder="Enter loan amount"
                  min="0"
                  step="1000"
                />
                {errors.principalAmount && <span className="error-text">{errors.principalAmount}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="interestRate">Interest Rate (%)</label>
                <input
                  type="number"
                  id="interestRate"
                  name="interestRate"
                  value={formData.interestRate}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Auto-calculated"
                  step="0.1"
                  readOnly
                />
              </div>

              <div className="form-group">
                <label htmlFor="termMonths">Loan Term (Months)</label>
                <select
                  id="termMonths"
                  name="termMonths"
                  value={formData.termMonths}
                  onChange={handleInputChange}
                  className={`form-control ${errors.termMonths ? 'error' : ''}`}
                >
                  <option value="">Select Term</option>
                  <option value="12">12 Months</option>
                  <option value="24">24 Months</option>
                  <option value="36">36 Months</option>
                  <option value="48">48 Months</option>
                  <option value="60">60 Months</option>
                  <option value="84">84 Months</option>
                  <option value="120">120 Months</option>
                  <option value="240">240 Months</option>
                </select>
                {errors.termMonths && <span className="error-text">{errors.termMonths}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="purpose">Loan Purpose</label>
              <textarea
                id="purpose"
                name="purpose"
                value={formData.purpose}
                onChange={handleInputChange}
                className={`form-control ${errors.purpose ? 'error' : ''}`}
                placeholder="Enter the purpose of the loan"
                rows="3"
              />
              {errors.purpose && <span className="error-text">{errors.purpose}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="accountId">Disbursement Account</label>
              <select
                id="accountId"
                name="accountId"
                value={formData.accountId}
                onChange={handleInputChange}
                className={`form-control ${errors.accountId ? 'error' : ''}`}
              >
                <option value="">Select Account</option>
                {accounts && accounts.length > 0 ? (
                  accounts.map(account => (
                    <option key={account.id} value={account.id}>
                      {account.accountNumber || `Account ${account.id}`} - {account.accountType}
                    </option>
                  ))
                ) : (
                  <option disabled>No accounts available</option>
                )}
              </select>
              {errors.accountId && <span className="error-text">{errors.accountId}</span>}
            </div>
          </div>

          <div className="form-section">
            <h3>Employment & Financial Information</h3>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="monthlyIncome">Monthly Income (₹)</label>
                <input
                  type="number"
                  id="monthlyIncome"
                  name="monthlyIncome"
                  value={formData.monthlyIncome}
                  onChange={handleInputChange}
                  className={`form-control ${errors.monthlyIncome ? 'error' : ''}`}
                  placeholder="Enter monthly income"
                  min="0"
                />
                {errors.monthlyIncome && <span className="error-text">{errors.monthlyIncome}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="employmentStatus">Employment Status</label>
                <select
                  id="employmentStatus"
                  name="employmentStatus"
                  value={formData.employmentStatus}
                  onChange={handleInputChange}
                  className={`form-control ${errors.employmentStatus ? 'error' : ''}`}
                >
                  <option value="EMPLOYED">Employed</option>
                  <option value="SELF_EMPLOYED">Self Employed</option>
                  <option value="BUSINESS_OWNER">Business Owner</option>
                  <option value="RETIRED">Retired</option>
                </select>
                {errors.employmentStatus && <span className="error-text">{errors.employmentStatus}</span>}
              </div>
            </div>

            {formData.employmentStatus === 'EMPLOYED' && (
              <div className="form-group">
                <label htmlFor="employerName">Employer Name</label>
                <input
                  type="text"
                  id="employerName"
                  name="employerName"
                  value={formData.employerName}
                  onChange={handleInputChange}
                  className={`form-control ${errors.employerName ? 'error' : ''}`}
                  placeholder="Enter employer name"
                />
                {errors.employerName && <span className="error-text">{errors.employerName}</span>}
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="workExperience">Work Experience (Years)</label>
                <input
                  type="number"
                  id="workExperience"
                  name="workExperience"
                  value={formData.workExperience}
                  onChange={handleInputChange}
                  className={`form-control ${errors.workExperience ? 'error' : ''}`}
                  placeholder="Enter work experience"
                  min="0"
                  step="0.5"
                />
                {errors.workExperience && <span className="error-text">{errors.workExperience}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="existingDebts">Existing Debts (₹)</label>
                <input
                  type="number"
                  id="existingDebts"
                  name="existingDebts"
                  value={formData.existingDebts}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter existing debt amount (optional)"
                  min="0"
                />
              </div>
            </div>

            {(formData.loanType === 'HOME' || formData.loanType === 'CAR') && (
              <div className="form-group">
                <label htmlFor="collateralValue">Collateral Value (₹)</label>
                <input
                  type="number"
                  id="collateralValue"
                  name="collateralValue"
                  value={formData.collateralValue}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="Enter collateral value"
                  min="0"
                />
              </div>
            )}
          </div>

          {errors.submit && (
            <div className="error-message">
              {errors.submit}
            </div>
          )}

          <div className="form-actions">
            <Button type="secondary" onClick={() => navigate('/loans')}>
              Cancel
            </Button>
            <Button type="primary" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoanApplication;
