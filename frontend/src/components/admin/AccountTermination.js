import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, deleteUser } from '../../services/adminService';
import { logoutAdmin } from '../../services/authService';
import './AccountTermination.css';

const AccountTermination = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [terminationReason, setTerminationReason] = useState('');
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const response = await getAllUsers();
      let data = [];
      if (Array.isArray(response)) {
        data = response;
      } else if (response && Array.isArray(response.data)) {
        data = response.data;
      } else if (response && Array.isArray(response.users)) {
        data = response.users;
      }
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
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
    fetchUsers();
  }, [navigate, fetchUsers]);

  const handleTerminateAccount = async () => {
    if (!terminationReason.trim()) {
      alert('Please provide a reason for account termination');
      return;
    }

    if (!window.confirm(`Are you absolutely sure you want to PERMANENTLY TERMINATE the account of ${selectedUser.firstName} ${selectedUser.lastName}? This action CANNOT be undone and will delete all user data.`)) {
      return;
    }

    try {
      await deleteUser(selectedUser.id);
      setUsers(users.filter(user => user.id !== selectedUser.id));
      setShowConfirmModal(false);
      setSelectedUser(null);
      setTerminationReason('');
      alert('Account terminated successfully');
    } catch (error) {
      console.error('Error terminating account:', error);
      alert('Failed to terminate account');
    }
  };

  const openTerminationModal = (user) => {
    setSelectedUser(user);
    setShowConfirmModal(true);
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.phoneNumber?.includes(searchTerm)
    );
  });

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="account-termination">
      <div className="page-header">
        <h1>Account Termination</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="warning-banner">
        <div className="warning-icon">⚠️</div>
        <div className="warning-text">
          <h3>DANGER ZONE</h3>
          <p>Account termination is permanent and irreversible. All user data will be permanently deleted.</p>
        </div>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search users by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="users-grid">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-avatar">
              <div className="avatar-initials">
                {user.firstName.charAt(0)}{user.lastName.charAt(0)}
              </div>
            </div>
            
            <div className="user-info">
              <h3>{user.firstName} {user.lastName}</h3>
              <p className="user-email">{user.email}</p>
              <p className="user-phone">{user.phoneNumber}</p>
              <p className="user-status">Status: <span className={`status-${user.status?.toLowerCase()}`}>{user.status}</span></p>
              <p className="user-joined">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
            </div>

            <div className="termination-section">
              <button
                onClick={() => openTerminationModal(user)}
                className="terminate-btn"
              >
                <span className="terminate-icon">🗑️</span>
                Terminate Account
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <div className="no-users">
          {searchTerm ? 'No users found matching your search.' : 'No active users available for termination.'}
        </div>
      )}

      {showConfirmModal && selectedUser && (
        <div className="modal-overlay">
          <div className="termination-modal">
            <div className="modal-header">
              <h2>⚠️ ACCOUNT TERMINATION</h2>
              <p>You are about to permanently terminate the account of:</p>
            </div>

            <div className="user-details">
              <div className="detail-item">
                <strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}
              </div>
              <div className="detail-item">
                <strong>Email:</strong> {selectedUser.email}
              </div>
              <div className="detail-item">
                <strong>User ID:</strong> {selectedUser.id}
              </div>
            </div>

            <div className="termination-form">
              <label htmlFor="reason">Reason for Termination *</label>
              <textarea
                id="reason"
                placeholder="Please provide a detailed reason for account termination..."
                value={terminationReason}
                onChange={(e) => setTerminationReason(e.target.value)}
                rows="4"
                required
              />
            </div>

            <div className="warning-text">
              <p><strong>WARNING:</strong> This action will:</p>
              <ul>
                <li>Permanently delete all user data</li>
                <li>Close all associated bank accounts</li>
                <li>Cancel all pending transactions</li>
                <li>Remove all loan applications</li>
                <li>This action CANNOT be undone</li>
              </ul>
            </div>

            <div className="modal-actions">
              <button
                onClick={handleTerminateAccount}
                className="confirm-terminate-btn"
                disabled={!terminationReason.trim()}
              >
                PERMANENTLY TERMINATE
              </button>
              <button 
                onClick={() => {
                  setShowConfirmModal(false);
                  setSelectedUser(null);
                  setTerminationReason('');
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

export default AccountTermination;
