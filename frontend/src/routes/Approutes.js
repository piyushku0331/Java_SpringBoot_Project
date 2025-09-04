import { Routes, Route } from "react-router-dom";
import ProtectedRoute from './ProtectedRoute';
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ResetPassword from "../pages/Auth/ResetPassword";
import CustomerDashboard from "../pages/Dashboard/CustomerDashboard";
import AccountsList from "../pages/Accounts/AccountsList";
import AccountDetail from "../pages/Accounts/AccountDetail";
import CreateAccount from "../pages/Accounts/CreateAccount";
import TransactionsList from "../pages/Transactions/TransactionsList";
import TransactionDetail from "../pages/Transactions/TransactionDetail";
import CreateTransaction from "../pages/Transactions/CreateTransaction";
import LoansList from "../pages/Loans/LoansList";
import LoanDetail from "../pages/Loans/LoanDetail";
import LoanApplication from "../pages/Loans/LoanApplication";
import NotFound from "../pages/NotFound/NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <CustomerDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accounts"
        element={
          <ProtectedRoute>
            <AccountsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accounts/:id"
        element={
          <ProtectedRoute>
            <AccountDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/accounts/new"
        element={
          <ProtectedRoute>
            <CreateAccount />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <TransactionsList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions/create"
        element={
          <ProtectedRoute>
            <CreateTransaction />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transactions/:id"
        element={
          <ProtectedRoute>
            <TransactionDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/loans"
        element={
          <ProtectedRoute>
            <LoansList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/loans/apply"
        element={
          <ProtectedRoute>
            <LoanApplication />
          </ProtectedRoute>
        }
      />
      <Route
        path="/loans/:id"
        element={
          <ProtectedRoute>
            <LoanDetail />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
