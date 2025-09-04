import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import './Loans.css';
import { getCustomerLoans } from '../../services/loanService';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';

const LoansList = () => {
  const { user, isAuthenticated } = useAuth();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        console.log('LoansList: Starting to fetch loans');
        console.log('LoansList: isAuthenticated:', isAuthenticated);
        console.log('LoansList: user object:', user);

        if (!isAuthenticated || !user) {
          console.error('LoansList: User not authenticated or user object missing');
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        if (!user.id) {
          console.error('LoansList: User object missing id field:', user);
          setError('User ID not available');
          setLoading(false);
          return;
        }

        console.log('LoansList: Calling getCustomerLoans with userId:', user.id);
        setLoading(true);
        const response = await getCustomerLoans(user.id);
        console.log('LoansList: Successfully fetched loans:', response);

        // Ensure we have an array
        const data = Array.isArray(response) ? response : (response?.data || []);
        console.log('LoansList: Processed loans data:', data);
        setLoans(data);
        setError(null);
      } catch (err) {
        console.error('LoansList: Error fetching loans:', err);
        console.error('LoansList: Error response:', err.response);
        setError('Failed to load loans. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [user, isAuthenticated]);

  if (loading) {
    return <div className="loading-spinner">Loading loans...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="loans-container page-container">
      <div className="loans-header">
        <h1>Your Loans</h1>
        <Button type="primary">
          <Link to="/loans/apply" className="apply-loan-link">Apply for Loan</Link>
        </Button>
      </div>

      {loans.length === 0 ? (
        <Card>
          <div className="no-loans">
            <p>You don't have any loans.</p>
            <p>Use the "Apply for Loan" button above to apply for your first loan.</p>
          </div>
        </Card>
      ) : (
        <div className="loans-list">
          {loans.map((loan) => (
            <Card key={loan.id} className="loan-card">
              <div className="loan-info">
                <h3>{loan.loanType}</h3>
                <p className="loan-number">Loan #: {loan.loanNumber}</p>
                <div className="loan-details">
                  <div className="loan-detail-item">
                    <span className="detail-label">Principal:</span>
                    <span className="detail-value">{formatCurrency(loan.principalAmount)}</span>
                  </div>
                  <div className="loan-detail-item">
                    <span className="detail-label">Outstanding:</span>
                    <span className="detail-value">{formatCurrency(loan.outstandingAmount)}</span>
                  </div>
                  <div className="loan-detail-item">
                    <span className="detail-label">Interest Rate:</span>
                    <span className="detail-value">{loan.interestRate}%</span>
                  </div>
                  <div className="loan-detail-item">
                    <span className="detail-label">Start Date:</span>
                    <span className="detail-value">{formatDate(loan.startDate)}</span>
                  </div>
                  <div className="loan-detail-item">
                    <span className="detail-label">End Date:</span>
                    <span className="detail-value">{formatDate(loan.endDate)}</span>
                  </div>
                  <div className="loan-detail-item">
                    <span className="detail-label">Status:</span>
                    <span className={`detail-value status-${loan.status.toLowerCase()}`}>
                      {loan.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="loan-actions">
                <Link to={`/loans/${loan.id}`}>
                  <Button type="secondary" size="small">View Details</Button>
                </Link>
                <Link to={`/loans/${loan.id}/payment`}>
                  <Button type="primary" size="small">Make Payment</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default LoansList;