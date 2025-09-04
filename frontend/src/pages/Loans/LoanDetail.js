import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../../components/common/Card/Card';
import Button from '../../components/common/Button/Button';
import './Loans.css';
import { getLoanDetails, getLoanPaymentSchedule } from '../../services/loanService';
import { formatCurrency, formatDate } from '../../utils/formatters';

const LoanDetail = () => {
  const { id } = useParams();
  const [loan, setLoan] = useState(null);
  const [paymentSchedule, setPaymentSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        setLoading(true);
        const loanData = await getLoanDetails(id);
        setLoan(loanData);
        
        const scheduleData = await getLoanPaymentSchedule(id);
        setPaymentSchedule(scheduleData);
        
        setError(null);
      } catch (err) {
        setError('Failed to load loan details. Please try again later.');
        console.error('Error fetching loan details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoanData();
  }, [id]);

  if (loading) {
    return <div className="loading-spinner">Loading loan details...</div>;
  }

  if (error || !loan) {
    return <div className="error-message">{error || 'Loan not found'}</div>;
  }

  return (
    <div className="loan-detail-container page-container">
      <div className="loan-detail-header">
        <h1>{loan.loanType} Loan</h1>
        <div className="loan-actions">
          <Link to="/loans">
            <Button type="secondary">Back to Loans</Button>
          </Link>
          <Link to={`/loans/${loan.id}/payment`}>
            <Button type="primary">Make Payment</Button>
          </Link>
        </div>
      </div>

      <Card title="Loan Information" elevated={true}>
        <div className="loan-info-grid">
          <div className="info-item">
            <span className="info-label">Loan Number:</span>
            <span className="info-value">{loan.loanNumber}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Principal Amount:</span>
            <span className="info-value">{formatCurrency(loan.principalAmount)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Outstanding Amount:</span>
            <span className="info-value outstanding">{formatCurrency(loan.outstandingAmount)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Interest Rate:</span>
            <span className="info-value">{loan.interestRate}%</span>
          </div>
          <div className="info-item">
            <span className="info-label">Term Length:</span>
            <span className="info-value">{loan.termMonths} months</span>
          </div>
          <div className="info-item">
            <span className="info-label">Monthly Payment:</span>
            <span className="info-value">{formatCurrency(loan.monthlyPayment)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Start Date:</span>
            <span className="info-value">{formatDate(loan.startDate)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">End Date:</span>
            <span className="info-value">{formatDate(loan.endDate)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Status:</span>
            <span className={`info-value status-${loan.status.toLowerCase()}`}>
              {loan.status}
            </span>
          </div>
        </div>
      </Card>

      <Card title="Payment Schedule" elevated={true}>
        {paymentSchedule.length === 0 ? (
          <p className="no-schedule">No payment schedule available for this loan.</p>
        ) : (
          <div className="schedule-table-container">
            <table className="schedule-table">
              <thead>
                <tr>
                  <th>Payment #</th>
                  <th>Due Date</th>
                  <th>Payment Amount</th>
                  <th>Principal</th>
                  <th>Interest</th>
                  <th>Remaining Balance</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentSchedule.map((payment) => (
                  <tr key={payment.id} className={payment.status === 'PAID' ? 'payment-paid' : ''}>
                    <td>{payment.paymentNumber}</td>
                    <td>{formatDate(payment.dueDate)}</td>
                    <td>{formatCurrency(payment.paymentAmount)}</td>
                    <td>{formatCurrency(payment.principalAmount)}</td>
                    <td>{formatCurrency(payment.interestAmount)}</td>
                    <td>{formatCurrency(payment.remainingBalance)}</td>
                    <td className={`payment-status-${payment.status.toLowerCase()}`}>
                      {payment.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
};

export default LoanDetail;