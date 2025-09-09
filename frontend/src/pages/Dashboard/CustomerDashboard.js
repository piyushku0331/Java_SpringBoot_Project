import React, { useState, useEffect, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import './CustomerDashboard.css';
import '../../styles/global.css';
import { getCustomerAccounts } from '../../services/customerService';
import { getTransactions } from '../../services/transactionService';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { FaCreditCard, FaExchangeAlt, FaChartLine, FaCog, FaSignOutAlt, FaCheckCircle, FaUniversity, FaPiggyBank, FaCreditCard as FaCreditCardAlt } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch accounts
      console.log('Fetching accounts for user:', user?.id);
      const accountsData = await getCustomerAccounts(user?.id);
      console.log('Accounts received:', accountsData);
      console.log('Accounts array length:', accountsData?.length);
      console.log('Accounts data type:', typeof accountsData);
      console.log('Is accounts array?', Array.isArray(accountsData));
      
      // Ensure we have a valid array
      const validAccounts = Array.isArray(accountsData) ? accountsData : [];
      console.log('Valid accounts to set:', validAccounts);
      setAccounts(validAccounts);

      // Fetch recent transactions (last 5) - get from first account if available
      if (validAccounts.length > 0) {
        console.log('Fetching transactions for account:', validAccounts[0].id);
        try {
          const transactionsData = await getTransactions(validAccounts[0].id);
          console.log('Transactions received:', transactionsData);
          console.log('Transactions array length:', transactionsData?.length);
          console.log('Transactions data type:', typeof transactionsData);
          console.log('Is transactions array?', Array.isArray(transactionsData));
          
          // Ensure we have a valid array
          const validTransactions = Array.isArray(transactionsData) ? transactionsData : [];
          console.log('Valid transactions to set:', validTransactions);
          setRecentTransactions(validTransactions.slice(0, 5));
        } catch (transactionError) {
          console.error('Failed to fetch transactions:', transactionError);
          setRecentTransactions([]);
        }
      } else {
        console.log('No accounts available, skipping transaction fetch');
        setRecentTransactions([]);
      }

      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    // Get stable values from location state
    const message = location.state?.message || '';
    const shouldRefresh = Boolean(location.state?.refresh || location.state?.transactionCreated);

    // Check for success message from navigation state
    if (message) {
      setSuccessMessage(message);
      // Clear the message from location state
      window.history.replaceState({}, document.title);
      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccessMessage(null), 5000);
    }

    // Check if we need to refresh data (e.g., after transaction creation)
    if (shouldRefresh) {
      fetchDashboardData();
      // Clear the refresh flag
      window.history.replaceState({}, document.title);
    }
  }, [fetchDashboardData, location.state]);

  useEffect(() => {
    console.log('Dashboard useEffect triggered');
    console.log('User object:', user);
    console.log('User ID:', user?.id);
    console.log('User authenticated:', !!user);
    
    if (user?.id) {
      console.log('User ID found, fetching dashboard data...');
      fetchDashboardData();
    } else {
      console.log('No user ID found, skipping data fetch');
    }
  }, [user, fetchDashboardData]);

  const getTotalBalance = () => {
    return accounts.reduce((total, account) => total + (account.balance || 0), 0);
  };

  const getAccountTypeIcon = (accountType) => {
    switch (accountType?.toLowerCase()) {
      case 'current':
        return <FaUniversity />;
      case 'savings':
        return <FaPiggyBank />;
      case 'fixed_deposit':
        return <FaCreditCardAlt />;
      default:
        return <FaUniversity />;
    }
  };

  const getTransactionIcon = (transactionType) => {
    switch (transactionType) {
      case 'DEPOSIT':
        return '➕';
      case 'WITHDRAWAL':
        return '➖';
      case 'TRANSFER':
        return '↔️';
      case 'PAYMENT':
        return '💳';
      default:
        return '💰';
    }
  };

  const getTransactionAmountClass = (transactionType) => {
    switch (transactionType) {
      case 'DEPOSIT':
        return 'positive';
      case 'WITHDRAWAL':
        return 'negative';
      case 'TRANSFER':
        return 'neutral';
      case 'PAYMENT':
        return 'negative';
      default:
        return 'neutral';
    }
  };

  const getTransactionAmountPrefix = (transactionType, amount) => {
    switch (transactionType) {
      case 'DEPOSIT':
        return '+';
      case 'WITHDRAWAL':
        return '-';
      case 'TRANSFER':
        return amount < 0 ? '-' : '+';
      case 'PAYMENT':
        return '-';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-message">{error}</div>
        <Button type="primary" onClick={fetchDashboardData}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div className="dashboard-container page-container">
      {/* Success Message */}
      {successMessage && (
        <div className="success-message">
          <FaCheckCircle />
          <span>{successMessage}</span>
          <button
            onClick={() => setSuccessMessage(null)}
            className="success-close"
            aria-label="Close success message"
          >
            ×
          </button>
        </div>
      )}

      {/* Header Section */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.firstName || user?.name || 'Valued Customer'}!</h1>
          <p>Here's an overview of your banking activity</p>
        </div>
        <div className="header-actions">
          <Button type="secondary" onClick={() => {
            setSuccessMessage('Dashboard refreshed!');
            fetchDashboardData();
            setTimeout(() => setSuccessMessage(null), 3000);
          }}>
            <FaCog /> Refresh
          </Button>
          <Button type="secondary" onClick={() => window.location.href = '/login'}>
            <FaSignOutAlt /> Logout
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">💰</div>
            <div className="stat-details">
              <h3>Total Balance</h3>
              <p className="stat-value">{formatCurrency(getTotalBalance(), true)}</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">🏦</div>
            <div className="stat-details">
              <h3>Active Accounts</h3>
              <p className="stat-value">{accounts.length}</p>
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-content">
            <div className="stat-icon">📊</div>
            <div className="stat-details">
              <h3>This Month</h3>
              <p className="stat-value">
                {recentTransactions.length > 0 
                  ? `${recentTransactions.length} transactions` 
                  : 'No transactions'
                }
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <div className="action-card" onClick={() => navigate('/accounts/new')}>
            <Card className="action-item">
              <div className="action-icon">
                <FaCreditCard />
              </div>
              <h3>Open New Account</h3>
              <p>Create a new bank account</p>
            </Card>
          </div>

          <div className="action-card" onClick={() => navigate('/transactions/create')}>
            <Card className="action-item">
              <div className="action-icon">
                <FaExchangeAlt />
              </div>
              <h3>New Transaction</h3>
              <p>Transfer money or make payments</p>
            </Card>
          </div>

          <div className="action-card" onClick={() => navigate('/loans/apply')}>
            <Card className="action-item">
              <div className="action-icon">
                <FaChartLine />
              </div>
              <h3>Apply for Loan</h3>
              <p>Submit a new loan application</p>
            </Card>
          </div>

        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity">
        <div className="section-header">
          <h2>Recent Activity</h2>
          <Link to="/transactions">
            <Button type="secondary" size="small">View All</Button>
          </Link>
        </div>
        
        {recentTransactions.length > 0 ? (
          <Card>
            <div className="transactions-list">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-info">
                    <div className="transaction-icon">
                      {getTransactionIcon(transaction.type)}
                    </div>
                    <div className="transaction-details">
                      <h4>{transaction.description}</h4>
                      <p className="transaction-date">
                        {formatDate(transaction.transactionDate)}
                      </p>
                    </div>
                  </div>
                  <div className="transaction-amount">
                    <span className={`amount ${getTransactionAmountClass(transaction.type)}`}>
                      {getTransactionAmountPrefix(transaction.type, transaction.amount)}{formatCurrency(Math.abs(transaction.amount))}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        ) : (
          <Card>
            <div className="no-activity">
              <p>No recent transactions to display.</p>
            </div>
          </Card>
        )}
      </div>

      {/* Account Summary */}
      <div className="account-summary">
        <div className="section-header">
          <h2>Your Accounts</h2>
          <Link to="/accounts">
            <Button type="secondary" size="small">View All</Button>
          </Link>
        </div>
        
        {accounts && accounts.length > 0 ? (
          <div className="accounts-grid">
            {accounts.map((account) => (
              <Card key={account.id} className="account-summary-card">
                <div className="account-header">
                  <div className="account-icon">
                    {getAccountTypeIcon(account.accountType)}
                  </div>
                  <div className="account-info">
                    <h3>{account.accountType || 'Unknown Account'}</h3>
                    <p className="account-number">****{account.accountNumber?.slice(-4) || '0000'}</p>
                  </div>
                </div>
                <div className="account-balance">
                  <p className="balance-label">Available Balance</p>
                  <p className="balance-amount">{formatCurrency(account.balance || 0)}</p>
                </div>
                <div className="account-actions">
                  <Link to={`/accounts/${account.id}`}>
                    <Button type="secondary" size="small">Details</Button>
                  </Link>
                  <Link to={`/transactions?accountId=${account.id}`}>
                    <Button type="primary" size="small">Transactions</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <div className="no-accounts">
              <p>You don't have any accounts yet.</p>
              <Link to="/accounts/new">
                <Button type="primary">Open New Account</Button>
              </Link>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
