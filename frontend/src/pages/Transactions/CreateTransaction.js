import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { createTransaction } from '../../services/transactionService';
import { getUserAccounts } from '../../services/accountService';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/common/Button/Button';
import './Transactions.css';

const CreateTransaction = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [accounts, setAccounts] = useState([]);
  const [formData, setFormData] = useState({
    accountId: '',
    transactionType: 'DEPOSIT',
    amount: '',
    description: ''
  });

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!user || !user.id) {
        console.log('No user logged in, cannot fetch accounts');
        return;
      }

      try {
        console.log('Fetching user accounts for userId:', user.id);
        const response = await getUserAccounts(user.id);
        console.log('Accounts fetched:', response);

        // Ensure we have an array
        const accountData = Array.isArray(response) ? response : (response?.data || []);
        console.log('Processed account data:', accountData);
        setAccounts(accountData);

        // Pre-select account if accountId is in URL params
        const accountIdFromUrl = searchParams.get('accountId');
        if (accountIdFromUrl && accountData.length > 0) {
          const accountExists = accountData.find(acc => acc.id.toString() === accountIdFromUrl);
          if (accountExists) {
            setFormData(prev => ({
              ...prev,
              accountId: accountIdFromUrl
            }));
          }
        }
      } catch (err) {
        console.error('Error fetching accounts:', err);
        // Fallback to empty array
        setAccounts([]);
      }
    };

    fetchAccounts();
  }, [user, searchParams]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.accountId) {
      setError('Please select an account');
      return false;
    }
    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setError('Please enter a valid amount');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Please enter a description');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      console.log('Creating transaction with data:', formData);
      const response = await createTransaction({
        accountId: parseInt(formData.accountId),
        transactionType: formData.transactionType,
        amount: parseFloat(formData.amount),
        description: formData.description.trim()
      });

      console.log('Transaction created successfully:', response);
      navigate('/dashboard', {
        state: {
          message: 'Transaction created successfully!',
          transactionCreated: true
        }
      });
    } catch (err) {
      console.error('Error creating transaction:', err);
      setError(err.response?.data?.error || 'Failed to create transaction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-transaction-container page-container">
      <div className="form-card">
        <h2>Create New Transaction</h2>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="transaction-form">
          <div className="form-group">
            <label htmlFor="accountId">Account *</label>
            <select
              id="accountId"
              name="accountId"
              value={formData.accountId}
              onChange={handleInputChange}
              className="form-control"
              required
            >
              <option value="">Select Account</option>
              {accounts && accounts.length > 0 ? (
                accounts.map(account => (
                  <option key={account.id} value={account.id}>
                    {account.accountNumber || `Account ${account.id}`}
                  </option>
                ))
              ) : (
                <option disabled>No accounts available</option>
              )}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="transactionType">Transaction Type *</label>
            <select
              id="transactionType"
              name="transactionType"
              value={formData.transactionType}
              onChange={handleInputChange}
              className="form-control"
              required
            >
              <option value="DEPOSIT">Deposit</option>
              <option value="WITHDRAWAL">Withdrawal</option>
              <option value="TRANSFER">Transfer</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="amount">Amount *</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter amount"
              min="0.01"
              step="0.01"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter transaction description"
              rows="3"
              required
            />
          </div>

          <div className="form-actions">
            <Button
              type="secondary"
              onClick={() => navigate('/transactions')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="primary"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Transaction'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTransaction;
