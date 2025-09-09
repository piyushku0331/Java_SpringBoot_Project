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
        console.log('=== LoansList: Starting to fetch loans ===');
        console.log('LoansList: isAuthenticated:', isAuthenticated);
        console.log('LoansList: user object:', user);
        console.log('LoansList: localStorage token:', localStorage.getItem('token'));
        console.log('LoansList: localStorage user:', localStorage.getItem('user'));

        if (!isAuthenticated || !user) {
          console.error('LoansList: User not authenticated or user object missing');
          setError('User not authenticated');
          setLoading(false);
          return;
        }

        // Try to get user ID from different possible fields
        const userId = user.id || user.userId || user.customerId;
        console.log('LoansList: Extracted userId:', userId);
        
        if (!userId) {
          console.error('LoansList: No valid user ID found in user object:', user);
          setError('User ID not available');
          setLoading(false);
          return;
        }

        console.log('LoansList: Calling getCustomerLoans with userId:', userId);
        setLoading(true);
        const response = await getCustomerLoans(userId);
        console.log('LoansList: Raw API response:', response);
        console.log('LoansList: Response type:', typeof response);
        console.log('LoansList: Response is array:', Array.isArray(response));

        // Handle different response structures including string responses
        let data = [];
        let parsedResponse = response;
        
        // If response is a string, try to parse it as JSON
        if (typeof response === 'string') {
          console.log('LoansList: String response detected, length:', response.length);
          
          try {
            // Check if string starts with [ or { to validate it's JSON
            const trimmed = response.trim();
            if (!trimmed.startsWith('[') && !trimmed.startsWith('{')) {
              console.error('LoansList: Response does not appear to be JSON, treating as empty array');
              parsedResponse = [];
            } else {
              parsedResponse = JSON.parse(trimmed);
              console.log('LoansList: Successfully parsed JSON response');
            }
          } catch (parseError) {
            console.error('LoansList: JSON parsing failed:', parseError.message);
            
            // Try to find and extract valid JSON array from corrupted response
            const jsonArrayMatch = response.match(/\[[\s\S]*?\]/);
            if (jsonArrayMatch) {
              try {
                parsedResponse = JSON.parse(jsonArrayMatch[0]);
                console.log('LoansList: Successfully extracted valid JSON array from corrupted response');
              } catch (extractError) {
                console.error('LoansList: Failed to parse extracted JSON:', extractError);
                parsedResponse = [];
              }
            } else {
              console.error('LoansList: No valid JSON array found in response, using empty array');
              parsedResponse = [];
            }
          }
        }
        
        // The response appears to be an array of loan objects directly
        if (Array.isArray(parsedResponse)) {
          data = parsedResponse;
          console.log('LoansList: Using response as loan array, found', data.length, 'loans');
        } else if (parsedResponse && Array.isArray(parsedResponse.data)) {
          data = parsedResponse.data;
          console.log('LoansList: Using response.data as loan array, found', data.length, 'loans');
        } else if (parsedResponse && parsedResponse.loans && Array.isArray(parsedResponse.loans)) {
          data = parsedResponse.loans;
          console.log('LoansList: Using response.loans as loan array, found', data.length, 'loans');
        } else if (parsedResponse && parsedResponse.content && Array.isArray(parsedResponse.content)) {
          data = parsedResponse.content;
          console.log('LoansList: Using response.content as loan array, found', data.length, 'loans');
        } else {
          // If it's an object, check if it contains loan properties
          if (parsedResponse && parsedResponse.id && parsedResponse.loanNumber) {
            // Single loan object, wrap in array
            data = [parsedResponse];
            console.log('LoansList: Single loan object detected, wrapping in array');
          } else {
            console.log('LoansList: No valid loan data found in response');
            data = [];
          }
        }
        
        console.log('LoansList: Final processed loans data:', data);
        console.log('LoansList: Number of loans:', data.length);
        setLoans(data);
        setError(null);
      } catch (err) {
        console.error('=== LoansList: Error fetching loans ===');
        console.error('LoansList: Error object:', err);
        console.error('LoansList: Error message:', err.message);
        console.error('LoansList: Error response:', err.response);
        console.error('LoansList: Error status:', err.response?.status);
        console.error('LoansList: Error data:', err.response?.data);
        
        // Set empty array instead of error to show "no loans" message
        setLoans([]);
        setError(null);
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
        <Link to="/loans/apply">
          <Button type="primary">Apply for Loan</Button>
        </Link>
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