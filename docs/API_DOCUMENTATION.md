# API Documentation

## Overview
This document provides comprehensive API documentation for the Banking Application REST endpoints.

## Base URL
```
http://localhost:8080/api
```

## Authentication
All endpoints require JWT token authentication via Authorization header:
```
Authorization: Bearer <jwt_token>
```

## Endpoints

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `POST /auth/reset-password` - Password reset

### Customer Accounts
- `GET /customer/accounts` - Get user accounts
- `POST /customer/accounts` - Create new account
- `GET /customer/accounts/{id}` - Get account details
- `PUT /customer/accounts/{id}` - Update account
- `DELETE /customer/accounts/{id}` - Close account

### Transactions
- `GET /customer/transactions` - Get transaction history
- `POST /customer/transactions` - Create transaction
- `GET /customer/transactions/{id}` - Get transaction details

### Loans
- `GET /customer/loans` - Get user loans
- `POST /customer/loans` - Apply for loan
- `GET /customer/loans/{id}` - Get loan details
- `POST /customer/loans/{id}/payment` - Make loan payment

### Admin Endpoints
- `POST /admin/login` - Admin authentication
- `GET /admin/users` - User management
- `GET /admin/transactions` - All transactions
- `GET /admin/loans` - Loan management
- `POST /admin/loans/{id}/approve` - Approve/reject loans
