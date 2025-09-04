import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import './Accounts.css';
import { getCustomerAccounts } from '../../services/customerService';
import { formatCurrency } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';

const AccountsList = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccounts = async () => {
      if (!user) {
        setError('User not logged in.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        console.log('User ID:', user.id);
        const data = await getCustomerAccounts(user.id);
        setAccounts(data);
        setError(null);
      } catch (err) {
        setError('Failed to load accounts. Please try again later.');
        console.error('Error fetching accounts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, [user]);

  if (loading) {
    return <div className="loading-spinner">Loading accounts...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="accounts-container page-container">
      <div className="accounts-header">
        <h1>Your Accounts</h1>
        <Button type="primary">
          <Link to="/accounts/new" className="new-account-link">Open New Account</Link>
        </Button>
      </div>

      {accounts.length === 0 ? (
        <Card>
          <div className="no-accounts">
            <p>You don't have any accounts yet.</p>
            <Button type="primary">
              <Link to="/accounts/new">Open Your First Account</Link>
            </Button>
          </div>
        </Card>
      ) : (
        <div className="accounts-list">
          {accounts.map((account) => (
            <Card key={account.id} className="account-card">
              <div className="account-info">
                <h3>{account.accountType}</h3>
                <p className="account-number">Account #: {account.accountNumber}</p>
                <p className="account-balance">
                  Balance: <span className="balance-amount">{formatCurrency(account.balance)}</span>
                </p>
              </div>
              <div className="account-actions">
                <Link to={`/accounts/${account.id}`}>
                  <Button type="secondary" size="small">View Details</Button>
                </Link>
                <Link to={`/transactions/create?accountId=${account.id}`}>
                  <Button type="primary" size="small">New Transaction</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountsList;