import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import '../../styles/global.css';
import { getAdminDashboardStats } from '../../services/adminService';
import { logoutAdmin } from '../../services/authService';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [adminInfo, setAdminInfo] = useState(null);
  const navigate = useNavigate();

  const fetchDashboardStats = useCallback(async () => {
    try {
      console.log('AdminDashboard: Fetching dashboard stats...');
      const data = await getAdminDashboardStats();
      console.log('AdminDashboard: Dashboard stats received:', data);
      setStats(data);
    } catch (error) {
      console.error('AdminDashboard: Error fetching stats:', error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        console.log('AdminDashboard: Authentication error, redirecting to login');
        logoutAdmin();
        navigate('/admin/login');
      } else {
        console.error('AdminDashboard: API Error details:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message
        });
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const admin = localStorage.getItem('adminInfo');
    
    if (!token || !admin) {
      navigate('/admin/login');
      return;
    }

    try {
      setAdminInfo(JSON.parse(admin));
      fetchDashboardStats();
    } catch (error) {
      navigate('/admin/login');
    }
  }, [navigate, fetchDashboardStats]);

  const handleLogout = () => {
    logoutAdmin();
    navigate('/admin/login');
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount || 0);
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-spinner">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-header-content">
          <h1>Admin Dashboard</h1>
          <div className="admin-user-info">
            <span>Welcome, {adminInfo?.firstName} {adminInfo?.lastName}</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card users">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>Total Users</h3>
              <p className="stat-number">{stats?.totalUsers || 0}</p>
              <small>{stats?.activeUsers || 0} active, {stats?.suspendedUsers || 0} suspended</small>
            </div>
          </div>

          <div className="stat-card accounts">
            <div className="stat-icon">🏦</div>
            <div className="stat-info">
              <h3>Total Accounts</h3>
              <p className="stat-number">{stats?.totalAccounts || 0}</p>
              <small>Total Deposits: {formatCurrency(stats?.totalDeposits)}</small>
            </div>
          </div>

          <div className="stat-card loans">
            <div className="stat-icon">💰</div>
            <div className="stat-info">
              <h3>Loans</h3>
              <p className="stat-number">{stats?.totalLoans || 0}</p>
              <small>{stats?.pendingLoans || 0} pending approval</small>
            </div>
          </div>

          <div className="stat-card transactions">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Transactions</h3>
              <p className="stat-number">{stats?.totalTransactions || 0}</p>
              <small>{stats?.todayTransactions || 0} today</small>
            </div>
          </div>
        </div>

        <div className="admin-actions">
          <h2>Quick Actions</h2>
          <div className="action-buttons">
            <div className="action-card">
              <button 
                className="action-btn users-btn"
                onClick={() => navigate('/admin/users')}
              >
                <span className="btn-icon">👤</span>
              </button>
              <h3>User Management</h3>
              <p>Manage user accounts, suspend/activate users</p>
            </div>
            
            <div className="action-card">
              <button 
                className="action-btn accounts-btn"
                onClick={() => navigate('/admin/accounts')}
              >
                <span className="btn-icon">🏦</span>
              </button>
              <h3>Account Management</h3>
              <p>View and manage bank accounts</p>
            </div>
            
            <div className="action-card">
              <button 
                className="action-btn loans-btn"
                onClick={() => navigate('/admin/loan-approval')}
              >
                <span className="btn-icon">💳</span>
              </button>
              <h3>Loan Approval</h3>
              <p>Review and approve/reject loan applications</p>
            </div>
            
            <div className="action-card">
              <button 
                className="action-btn transactions-btn"
                onClick={() => navigate('/admin/transactions')}
              >
                <span className="btn-icon">📈</span>
              </button>
              <h3>Transaction Monitor</h3>
              <p>Monitor all banking transactions</p>
            </div>
            
            <div className="action-card">
              <button 
                className="action-btn terminate-btn"
                onClick={() => navigate('/admin/account-termination')}
              >
                <span className="btn-icon">🚫</span>
              </button>
              <h3>Account Termination</h3>
              <p>Terminate user accounts permanently</p>
            </div>
            
            <div className="action-card">
              <button 
                className="action-btn admins-btn"
                onClick={() => navigate('/admin/admins')}
              >
                <span className="btn-icon">⚙️</span>
              </button>
              <h3>Admin Management</h3>
              <p>Manage admin users and permissions</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
