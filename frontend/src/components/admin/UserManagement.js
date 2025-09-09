import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllUsers, suspendUser, activateUser, deleteUser as deleteUserService } from '../../services/adminService';
import { logoutAdmin } from '../../services/authService';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const navigate = useNavigate();

  const fetchUsers = useCallback(async () => {
    try {
      const response = await getAllUsers();
      const data = Array.isArray(response) ? response : [];
      setUsers(data);
    } catch (error) {
      setUsers([]); // Ensure users is always an array
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
    fetchUsers();
  }, [navigate, fetchUsers]);


  const updateUserStatus = async (userId, newStatus) => {
    try {
      if (newStatus === 'SUSPENDED') {
        await suspendUser(userId);
      } else if (newStatus === 'ACTIVE') {
        await activateUser(userId);
      }
      
      // Update local state
      setUsers(users.map(user => 
        user.id === userId ? { ...user, status: newStatus } : user
      ));
    } catch (error) {
      console.error('Failed to update user status:', error);
      alert('Failed to update user status');
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      await deleteUserService(userId);
      
      // Remove from local state
      setUsers(users.filter(user => user.id !== userId));
      alert('User deleted successfully');
    } catch (error) {
      console.error('Failed to delete user:', error);
      alert('Failed to delete user');
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'ALL' || user.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'ACTIVE': return 'status-active';
      case 'INACTIVE': return 'status-inactive';
      case 'SUSPENDED': return 'status-suspended';
      default: return 'status-unknown';
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }

  return (
    <div className="user-management">
      <div className="page-header">
        <h1>User Management</h1>
        <button onClick={() => navigate('/admin/dashboard')} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-dropdown">
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
            <option value="SUSPENDED">Suspended</option>
          </select>
        </div>
      </div>

      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(user.status)}`}>
                    {user.status}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                <td>
                  <div className="action-buttons">
                    {user.status === 'ACTIVE' ? (
                      <button
                        onClick={() => updateUserStatus(user.id, 'SUSPENDED')}
                        className="suspend-btn"
                      >
                        Suspend
                      </button>
                    ) : (
                      <button
                        onClick={() => updateUserStatus(user.id, 'ACTIVE')}
                        className="activate-btn"
                      >
                        Activate
                      </button>
                    )}
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {filteredUsers.length === 0 && (
          <div className="no-users">
            No users found matching your criteria.
          </div>
        )}
      </div>

      <div className="users-summary">
        <p>Total Users: {users.length}</p>
        <p>Active: {users.filter(u => u.status === 'ACTIVE').length}</p>
        <p>Suspended: {users.filter(u => u.status === 'SUSPENDED').length}</p>
        <p>Inactive: {users.filter(u => u.status === 'INACTIVE').length}</p>
      </div>
    </div>
  );
};

export default UserManagement;
