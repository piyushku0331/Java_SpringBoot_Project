import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllLoans, approveLoan, rejectLoan } from '../../services/adminService';
import { logoutAdmin } from '../../services/authService';
import './LoanApproval.css';

const LoanApproval = () => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('PENDING');
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [selectedLoanId, setSelectedLoanId] = useState(null);
  const navigate = useNavigate();

  const fetchLoans = useCallback(async () => {
    try {
      const response = await getAllLoans();
      const data = Array.isArray(response) ? response : (response?.data || []);
      setLoans(data);
    } catch (error) {
      console.error('Error fetching loans:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        logoutAdmin();
        navigate('/admin/login');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchLoans();
  }, [navigate, fetchLoans]);

  const handleApproveLoan = async (loanId) => {
    try {
      await approveLoan(loanId);
      setLoans(loans.map(loan => 
        loan.id === loanId ? { ...loan, status: 'APPROVED' } : loan
      ));
      alert('Loan approved successfully!');
    } catch (error) {
      console.error('Error approving loan:', error);
      alert('Failed to approve loan');
    }
  };

  const handleRejectLoan = async () => {
    if (!rejectReason.trim()) {
      alert('Please provide a reason for rejection');
      return;
    }

    try {
      await rejectLoan(selectedLoanId, rejectReason);
      setLoans(loans.map(loan => 
        loan.id === selectedLoanId ? { ...loan, status: 'REJECTED' } : loan
      ));
      setShowRejectModal(false);
      setRejectReason('');
      setSelectedLoanId(null);
      alert('Loan rejected successfully!');
    } catch (error) {
      console.error('Error rejecting loan:', error);
      alert('Failed to reject loan');
    }
  };

  const openRejectModal = (loanId) => {
    setSelectedLoanId(loanId);
    setShowRejectModal(true);
  };

  const filteredLoans = loans.filter(loan => 
    filterStatus === 'ALL' || loan.status === filterStatus
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount || 0);
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'PENDING': return 'status-pending';
      case 'APPROVED': return 'status-approved';
      case 'REJECTED': return 'status-rejected';
      default: return 'status-unknown';
    }
  };

  if (loading) {
    return <div className="loading">Loading loans...</div>;
  }

  return (
    <div className="loan-approval">
      <div className="page-header">
        <h1>Loan Approval Management</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="filters">
        <div className="filter-dropdown">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
        </div>
      </div>

      <div className="loans-grid">
        {filteredLoans.map(loan => (
          <div key={loan.id} className="loan-card">
            <div className="loan-header">
              <h3>Loan Application #{loan.id}</h3>
              <span className={`status-badge ${getStatusBadgeClass(loan.status)}`}>
                {loan.status}
              </span>
            </div>
            
            <div className="loan-details">
              <div className="detail-row">
                <span className="label">Applicant:</span>
                <span className="value">{loan.user?.firstName} {loan.user?.lastName}</span>
              </div>
              <div className="detail-row">
                <span className="label">Email:</span>
                <span className="value">{loan.user?.email}</span>
              </div>
              <div className="detail-row">
                <span className="label">Loan Type:</span>
                <span className="value">{loan.loanType}</span>
              </div>
              <div className="detail-row">
                <span className="label">Amount:</span>
                <span className="value">{formatCurrency(loan.amount)}</span>
              </div>
              <div className="detail-row">
                <span className="label">Purpose:</span>
                <span className="value">{loan.purpose}</span>
              </div>
              <div className="detail-row">
                <span className="label">Applied Date:</span>
                <span className="value">{new Date(loan.applicationDate).toLocaleDateString()}</span>
              </div>
            </div>

            {loan.status === 'PENDING' && (
              <div className="loan-actions">
                <button
                  onClick={() => handleApproveLoan(loan.id)}
                  className="approve-btn"
                >
                  Approve
                </button>
                <button
                  onClick={() => openRejectModal(loan.id)}
                  className="reject-btn"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredLoans.length === 0 && (
        <div className="no-loans">
          No loans found matching your criteria.
        </div>
      )}

      {showRejectModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Reject Loan Application</h3>
            <textarea
              placeholder="Please provide a reason for rejection..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows="4"
            />
            <div className="modal-actions">
              <button onClick={handleRejectLoan} className="confirm-btn">
                Confirm Rejection
              </button>
              <button 
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason('');
                  setSelectedLoanId(null);
                }} 
                className="cancel-btn"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApproval;
