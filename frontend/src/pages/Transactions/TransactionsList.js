import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import './Transactions.css';
import { getTransactions } from '../../services/transactionService';
import { getUserAccounts } from '../../services/accountService';
import { useAuth } from '../../context/AuthContext';
import { formatCurrency, formatDate } from '../../utils/formatters';

const TransactionsList = () => {
  const location = useLocation();
  const { user } = useAuth();
  const queryParams = new URLSearchParams(location.search);
  const initialAccountId = queryParams.get('accountId');

  const [transactions, setTransactions] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccountId, setSelectedAccountId] = useState(initialAccountId || 'all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      console.log('TransactionsList: Current user:', user);
      console.log('TransactionsList: User ID:', user?.id);

      // Use user ID if available, otherwise use default for testing
      const userId = user?.id || 4; // Default to user ID 4 for testing
      console.log('TransactionsList: Using userId:', userId);

      try {
        console.log('TransactionsList: Fetching accounts for userId:', userId);
        const response = await getUserAccounts(userId);
        console.log('TransactionsList: Accounts response:', response);
        
        // Handle the response properly - check if it's wrapped in data property
        let accountsData = [];
        if (Array.isArray(response)) {
          accountsData = response;
        } else if (response && Array.isArray(response.data)) {
          accountsData = response.data;
        } else if (response && response.accounts && Array.isArray(response.accounts)) {
          accountsData = response.accounts;
        }
        
        console.log('TransactionsList: Processed accounts data:', accountsData);
        setAccounts(accountsData);
      } catch (err) {
        console.error('Error fetching accounts:', err);
        setAccounts([]); // Set empty array on error
        // If still failing, try with a different approach
        if (err.response?.status === 400) {
          console.log('TransactionsList: Trying alternative approach...');
          // Could implement fallback logic here
        }
      }
    };

    if (user?.id) {
      fetchAccounts();
    }
  }, [user]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const data = await getTransactions(selectedAccountId !== 'all' ? selectedAccountId : null);
        console.log('Received transactions data:', data);
        // Ensure data is an array
        setTransactions(Array.isArray(data) ? data : []);
        setError(null);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        setTransactions([]); // Set empty array on error
        // Check if it's a network error (backend not running)
        if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
          setError('Backend server is not running. Please start the Spring Boot application on port 8080.');
        } else if (err.response?.status === 401) {
          setError('Authentication failed. Please log in again.');
        } else if (err.response?.status === 403) {
          setError('Access denied. Please check your permissions.');
        } else {
          setError('Failed to load transactions. Please try again later.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [selectedAccountId]);

  const handleAccountChange = (e) => {
    setSelectedAccountId(e.target.value);
  };

  if (loading && !transactions.length) {
    return <div className="loading-spinner">Loading transactions...</div>;
  }

  return (
    <div className="transactions-container page-container">
      <div className="transactions-header">
        <h1>Transactions</h1>
        <Link to="/transactions/create">
          <Button type="primary">New Transaction</Button>
        </Link>
      </div>


      <Card className="filter-card">
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="account-filter">Account:</label>
            <select 
              id="account-filter" 
              value={selectedAccountId} 
              onChange={handleAccountChange}
              className="account-select"
            >
              <option value="all">All Accounts</option>
              {accounts && accounts.length > 0 ? accounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.accountType} - {account.accountNumber}
                </option>
              )) : (
                <option value="" disabled>No accounts available</option>
              )}
            </select>
          </div>
        </div>
      </Card>

      {error ? (
        <div className="error-message">{error}</div>
      ) : transactions.length === 0 ? (
        <Card>
          <div className="no-transactions">
            <p>No transactions found for the selected account.</p>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="table-responsive">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Account</th>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Balance</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{formatDate(transaction.transactionDate)}</td>
                    <td>{transaction.description}</td>
                    <td>{accounts.length > 0 ? accounts[0].accountNumber : 'N/A'}</td>
                    <td className={`transaction-type-${transaction.type?.toLowerCase() || ''}`}>
                      {transaction.type}
                    </td>
                    <td className={transaction.amount < 0 ? 'amount-negative' : 'amount-positive'}>
                      {formatCurrency(Math.abs(transaction.amount))}
                    </td>
                    <td>{accounts.length > 0 ? formatCurrency(accounts[0].balance) : 'N/A'}</td>
                    <td>
                      <button 
                        className="details-button"
                        onClick={() => window.location.href = `/transactions/${transaction.id}`}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default TransactionsList;