// Admin Panel Backend Integration Test
// This script tests all admin API endpoints to verify backend connectivity

import { getAdminDashboardStats, getAllUsers, getAllLoans, getAllAccounts, getAllTransactions } from './services/adminService.js';

const testAdminIntegration = async () => {
  console.log('🔍 Starting Admin Panel Backend Integration Test...');
  
  // Check if admin token exists
  const adminToken = localStorage.getItem('adminToken');
  console.log('Admin Token Present:', !!adminToken);
  
  if (!adminToken) {
    console.error('❌ No admin token found. Please login as admin first.');
    return;
  }

  const tests = [
    {
      name: 'Dashboard Stats',
      test: async () => {
        const stats = await getAdminDashboardStats();
        console.log('Dashboard Stats:', stats);
        return stats;
      }
    },
    {
      name: 'Users List',
      test: async () => {
        const users = await getAllUsers();
        console.log('Users Count:', Array.isArray(users) ? users.length : 'Not an array');
        return users;
      }
    },
    {
      name: 'Loans List',
      test: async () => {
        const loans = await getAllLoans();
        console.log('Loans Count:', Array.isArray(loans) ? loans.length : 'Not an array');
        return loans;
      }
    },
    {
      name: 'Accounts List',
      test: async () => {
        const accounts = await getAllAccounts();
        console.log('Accounts Count:', Array.isArray(accounts) ? accounts.length : 'Not an array');
        return accounts;
      }
    },
    {
      name: 'Transactions List',
      test: async () => {
        const transactions = await getAllTransactions();
        console.log('Transactions Count:', Array.isArray(transactions) ? transactions.length : 'Not an array');
        return transactions;
      }
    }
  ];

  const results = {};
  
  for (const test of tests) {
    try {
      console.log(`\n🧪 Testing ${test.name}...`);
      const result = await test.test();
      results[test.name] = { success: true, data: result };
      console.log(`✅ ${test.name} - SUCCESS`);
    } catch (error) {
      results[test.name] = { success: false, error: error.message, details: error };
      console.error(`❌ ${test.name} - FAILED:`, error.message);
      console.error('Error Details:', error);
    }
  }

  console.log('\n📊 Test Results Summary:');
  Object.entries(results).forEach(([testName, result]) => {
    console.log(`${result.success ? '✅' : '❌'} ${testName}: ${result.success ? 'PASS' : 'FAIL'}`);
  });

  return results;
};

// Export for use in browser console
window.testAdminIntegration = testAdminIntegration;

console.log('🚀 Admin Integration Test loaded. Run testAdminIntegration() in console to test.');
