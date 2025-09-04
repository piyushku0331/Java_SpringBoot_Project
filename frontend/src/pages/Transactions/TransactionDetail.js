import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import './Transactions.css';
import { getTransactionDetails } from '../../services/transactionService';
import { formatCurrency, formatDate, formatTime } from '../../utils/formatters';

const TransactionDetail = () => {
  const { id } = useParams();
  const [transaction, setTransaction] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTransactionData = async () => {
      try {
        setLoading(true);
        const data = await getTransactionDetails(id);
        setTransaction(data);
        setError(null);
      } catch (err) {
        setError('Failed to load transaction details. Please try again later.');
        console.error('Error fetching transaction details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactionData();
  }, [id]);

  if (loading) {
    return <div className="loading-spinner">Loading transaction details...</div>;
  }

  if (error || !transaction) {
    return <div className="error-message">{error || 'Transaction not found'}</div>;
  }

  return (
    <div className="transaction-detail-container page-container">
      <div className="transaction-detail-header">
        <h1>Transaction Details</h1>
        <Link to="/transactions">
          <Button type="secondary">Back to Transactions</Button>
        </Link>
      </div>

      <Card elevated={true}>
        <div className="transaction-detail-content">
          <div className="transaction-summary">
            <div className={`transaction-amount ${transaction.type === 'DEBIT' ? 'amount-negative' : 'amount-positive'}`}>
              {transaction.type === 'DEBIT' ? '-' : '+'} {formatCurrency(transaction.amount)}
            </div>
            <div className="transaction-status">
              <span className={`status-indicator status-${transaction.status.toLowerCase()}`}></span>
              {transaction.status}
            </div>
          </div>

          <div className="transaction-info-grid">
            <div className="info-item">
              <span className="info-label">Transaction ID:</span>
              <span className="info-value">{transaction.transactionId}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Date:</span>
              <span className="info-value">{formatDate(transaction.date)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Time:</span>
              <span className="info-value">{formatTime(transaction.timestamp)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Type:</span>
              <span className={`info-value transaction-type-${transaction.type.toLowerCase()}`}>
                {transaction.type}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Description:</span>
              <span className="info-value">{transaction.description}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Account:</span>
              <span className="info-value">
                {transaction.accountId ? (
                  <Link to={`/accounts/${transaction.accountId}`}>
                    {transaction.accountType || 'Account'} - {transaction.accountNumber || transaction.accountId}
                  </Link>
                ) : (
                  <span>N/A</span>
                )}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Balance Before:</span>
              <span className="info-value">{formatCurrency(transaction.balanceBefore)}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Balance After:</span>
              <span className="info-value">{formatCurrency(transaction.balanceAfter)}</span>
            </div>
            {transaction.reference && (
              <div className="info-item">
                <span className="info-label">Reference:</span>
                <span className="info-value">{transaction.reference}</span>
              </div>
            )}
          </div>

          {transaction.notes && (
            <div className="transaction-notes">
              <h3>Notes</h3>
              <p>{transaction.notes}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default TransactionDetail;