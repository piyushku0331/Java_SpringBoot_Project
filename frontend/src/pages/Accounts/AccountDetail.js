import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import './Accounts.css';
import { getAccountDetails } from '../../services/customerService';
import { getAccountTransactions } from '../../services/transactionService';
import { formatCurrency, formatDate } from '../../utils/formatters';

const AccountDetail = () => {
  const { id } = useParams();
  const [account, setAccount] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccountData = async () => {
      try {
        setLoading(true);
        const accountData = await getAccountDetails(id);
        setAccount(accountData);
        
        const transactionsData = await getAccountTransactions(id);
        setTransactions(transactionsData);
        
        setError(null);
      } catch (err) {
        setError('Failed to load account details. Please try again later.');
        console.error('Error fetching account details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAccountData();
  }, [id]);

  if (loading) {
    return <div className="loading-spinner">Loading account details...</div>;
  }

  if (error || !account) {
    return <div className="error-message">{error || 'Account not found'}</div>;
  }

  return (
    <div className="account-detail-container page-container">
      <div className="account-detail-header">
        <h1>{account.accountType} Account</h1>
        <div className="account-actions">
          <Link to="/accounts">
            <Button type="secondary">Back to Accounts</Button>
          </Link>
          <Link to={`/transactions/create?accountId=${account.id}`}>
            <Button type="primary">New Transaction</Button>
          </Link>
        </div>
      </div>

      <Card title="Account Information" elevated={true}>
        <div className="account-info-grid">
          <div className="info-item">
            <span className="info-label">Account Number:</span>
            <span className="info-value">{account.accountNumber}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Current Balance:</span>
            <span className="info-value balance">{formatCurrency(account.balance)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Account Type:</span>
            <span className="info-value">{account.accountType}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Opened On:</span>
            <span className="info-value">{formatDate(account.openDate)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Status:</span>
            <span className={`info-value status-${account.status.toLowerCase()}`}>
              {account.status}
            </span>
          </div>
        </div>
      </Card>

      <Card title="Recent Transactions" elevated={true}>
        {transactions.length === 0 ? (
          <p className="no-transactions">No transactions found for this account.</p>
        ) : (
          <div className="transactions-table-container">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.slice(0, 10).map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{formatDate(transaction.date)}</td>
                    <td>{transaction.description}</td>
                    <td className={`transaction-type-${transaction.type.toLowerCase()}`}>
                      {transaction.type}
                    </td>
                    <td className={transaction.type === 'DEBIT' ? 'amount-negative' : 'amount-positive'}>
                      {formatCurrency(transaction.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {transactions.length > 10 && (
              <div className="view-all-link">
                <Link to={`/transactions?accountId=${account.id}`}>View All Transactions</Link>
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default AccountDetail;