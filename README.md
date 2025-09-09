# 🏦 NextGen Bank - Modern Digital Banking Platform

[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.9-brightgreen.svg)](https://spring.io/projects/spring-boot) [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/) [![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://www.mysql.com/) [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/piyushku0331/Java_SpringBoot_Project/pulls)

> **A complete, production-ready digital banking solution with modern UI, comprehensive admin panel, and enterprise-grade security.**

## 📖 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Screenshots](#screenshots)
- [Quick Start](#quick-start)
- [Installation Guide](#installation-guide)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Admin Panel](#admin-panel)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🌟 Overview

NextGen Bank is a full-stack digital banking platform that provides a complete banking experience for both customers and administrators. Built with Spring Boot and React, it offers secure transactions, account management, loan processing, and a comprehensive admin dashboard.

### 🎯 What This Application Does

**For Customers:**
- Create and manage multiple bank accounts
- Transfer money between accounts instantly
- View detailed transaction history
- Apply for loans and track applications
- Secure login with JWT authentication

**For Administrators:**
- Manage all user accounts and transactions
- Approve or reject loan applications
- Monitor system statistics and analytics
- Suspend/activate user accounts
- Generate reports and insights

## ✨ Features

### 🔐 Security & Authentication
- **JWT Token Authentication** - Secure login system
- **Password Encryption** - BCrypt hashing for passwords
- **Role-Based Access** - Separate admin and customer portals
- **Session Management** - Automatic logout on token expiry

### 💰 Banking Operations
- **Multi-Account Support** - Savings, Current, Fixed Deposit accounts
- **Real-Time Transfers** - Instant money transfers between accounts
- **Transaction History** - Detailed records with filtering options
- **Balance Tracking** - Live balance updates

### 🏦 Loan Management
- **Loan Applications** - Apply for personal, home, or business loans
- **Credit Assessment** - Automated eligibility checking
- **Approval Workflow** - Admin review and approval process
- **Payment Tracking** - EMI schedules and payment history

### 📊 Admin Dashboard
- **User Management** - View, edit, suspend user accounts
- **Transaction Monitoring** - Real-time transaction oversight
- **Loan Approval System** - Review and process loan applications
- **Analytics & Reports** - System statistics and insights
- **Account Termination** - Permanently close user accounts

### 🎨 Modern UI/UX
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Dark Theme** - Modern glassmorphism design
- **Smooth Animations** - 3D effects and transitions
- **Intuitive Navigation** - User-friendly interface
- **Accessibility** - WCAG compliant design

## 📱 Screenshots

### Customer Dashboard
![Customer Dashboard](docs/screenshots/customer-dashboard.png)
*Clean, intuitive dashboard showing account balances and recent transactions*

### Admin Panel
![Admin Panel](docs/screenshots/admin-panel.png)
*Comprehensive admin dashboard with user management and system analytics*

### Transaction History
![Transactions](docs/screenshots/transactions.png)
*Detailed transaction history with filtering and search capabilities*


## 🚀 Quick Start

### 📋 Prerequisites
- ☕ Java 17+ (JDK)
- 🟢 Node.js 16+ & npm
- 🐬 MySQL 8.0+
- 📦 Maven 3.6+

### ⚡ Quick Setup (5 Minutes)

```bash
# 1️⃣ Clone the repository
git clone https://github.com/piyushku0331/Java_SpringBoot_Project.git
cd Java_SpringBoot_Project

# 2️⃣ Setup Backend (Spring Boot)
cd backend/springboot_project_backend
mvn clean install
mvn spring-boot:run

# 3️⃣ Setup Frontend (React) - Open new terminal
cd ../../frontend
npm install
npm start
```

**That's it! 🎉** Your banking application is now running!

### 🌐 Access Your Application
- **🎨 Customer Portal:** http://localhost:3000
- **👨‍💼 Admin Dashboard:** http://localhost:3000/admin/login
- **⚙️ Backend API:** http://localhost:8080/api

### 🔑 Login Credentials

**Admin Access:**
```
Email: admin@bank.com
Password: admin123
```

**Test Customer:**
- Register new account at http://localhost:3000/register
- Use any valid email format and secure password
- Verify email functionality (if configured)

## 🛠️ Installation Guide

### Step 1: Database Setup

1. **Install MySQL 8.0+**
2. **Create Database:**
   ```sql
   CREATE DATABASE banking_db;
   ```
3. **Configure Connection** in `backend/springboot_project_backend/src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/banking_db
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   ```

### Step 2: Backend Setup

```bash
cd backend/springboot_project_backend

# Install dependencies
mvn clean install

# Run the application (will create tables automatically)
mvn spring-boot:run
```

**✅ Backend Success Indicators:**
- Console shows: "Started SpringbootProjectBackendApplication"
- No error messages about database connection
- API accessible at http://localhost:8080/api

### Step 3: Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

**✅ Frontend Success Indicators:**
- Browser opens automatically to http://localhost:3000
- No compilation errors
- Landing page loads with "NextGen Bank" branding

## ⚙️ Configuration

### Environment Variables

**Backend (.env or application.properties):**
```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/banking_db
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT Configuration
jwt.secret=your_jwt_secret_key_here
jwt.expiration=86400000

# Server Configuration
server.port=8080
```

**Frontend (.env):**
```bash
# API Base URL
REACT_APP_API_URL=http://localhost:8080/api

# App Configuration
REACT_APP_NAME=NextGen Bank
REACT_APP_VERSION=1.0.0
```

## 🏗️ Technology Stack

### Backend Architecture
```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React App     │───▶│   Spring Boot    │───▶│   MySQL DB      │
│   (Frontend)    │    │   (Backend API)  │    │   (Database)    │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

**Backend (Spring Boot 3.4.9):**
- 🔐 **Security:** Spring Security + JWT Authentication
- 🗄️ **Database:** MySQL 8.0 with JPA/Hibernate ORM
- 🔒 **Encryption:** BCrypt password hashing
- 🌐 **API:** RESTful endpoints with proper error handling
- ✅ **Validation:** Request validation and data sanitization

**Frontend (React 18.2.0):**
- ⚛️ **Framework:** Modern React with Hooks (useState, useEffect, useContext)
- 🎨 **Styling:** CSS3 with glassmorphism and 3D animations
- 🔄 **State Management:** Context API for global state
- 🛣️ **Routing:** React Router v6 with protected routes
- 📱 **Responsive:** Mobile-first responsive design

**Key Libraries & Dependencies:**
- **Axios:** HTTP client for API calls
- **React Router:** Client-side routing
- **JWT:** JSON Web Token authentication
- **Maven:** Backend dependency management
- **npm:** Frontend package management

## 📚 API Documentation

### 🔐 Authentication & Authorization

**Customer Authentication:**
```http
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
```

**Admin Authentication:**
```http
POST /api/admin/login
POST /api/admin/logout
```

### 👤 Customer Endpoints

**Account Management:**
```http
GET    /api/customer/accounts           # Get all user accounts
POST   /api/customer/accounts           # Create new account
GET    /api/customer/accounts/{id}      # Get account details
PUT    /api/customer/accounts/{id}      # Update account
DELETE /api/customer/accounts/{id}      # Close account
```

**Transactions:**
```http
GET  /api/customer/transactions         # Get transaction history
POST /api/customer/transactions         # Create new transaction
GET  /api/customer/transactions/{id}    # Get transaction details
```

**Loans:**
```http
GET  /api/customer/loans               # Get user loans
POST /api/customer/loans               # Apply for loan
GET  /api/customer/loans/{id}          # Get loan details
```

### 👨‍💼 Admin Endpoints

**Dashboard & Analytics:**
```http
GET /api/admin/dashboard/stats         # Get dashboard statistics
```

**User Management:**
```http
GET    /api/admin/users                # Get all users
PUT    /api/admin/users/{id}/suspend   # Suspend user account
PUT    /api/admin/users/{id}/activate  # Activate user account
DELETE /api/admin/users/{id}           # Delete user account
```

**Transaction Monitoring:**
```http
GET /api/admin/transactions            # Get all transactions
```

**Loan Management:**
```http
GET  /api/admin/loans                  # Get all loan applications
POST /api/admin/loans/{id}/approve     # Approve loan
POST /api/admin/loans/{id}/reject      # Reject loan
```

**Account Management:**
```http
GET /api/admin/accounts                # Get all accounts
PUT /api/admin/accounts/{id}/freeze    # Freeze account
PUT /api/admin/accounts/{id}/unfreeze  # Unfreeze account
```

## 👨‍💼 Admin Panel

The admin panel provides comprehensive management capabilities for banking operations.

### 🔑 Admin Access
1. Navigate to http://localhost:3000/admin/login
2. Use credentials: `admin@bank.com` / `admin123`
3. Access full administrative dashboard

### 📊 Dashboard Features

**Quick Statistics:**
- Total registered users
- Active accounts count
- Pending loan applications
- Total transaction volume

**User Management:**
- View all registered customers
- Suspend/activate user accounts
- Delete user accounts permanently
- Search and filter users

**Loan Approval System:**
- Review pending loan applications
- Approve or reject loans with comments
- View loan history and details
- Track loan performance metrics

**Transaction Monitoring:**
- Monitor all system transactions
- Filter by date, amount, or user
- Detect suspicious activities
- Generate transaction reports

**Account Termination:**
- Permanently close customer accounts
- Handle account closure procedures
- Maintain audit trails

### 🔒 Admin Security Features
- Separate admin authentication system
- Role-based access control
- Session timeout management
- Activity logging and audit trails

## 🐛 Troubleshooting

### Common Issues & Solutions

**Backend Won't Start:**
```bash
# Check if MySQL is running
sudo systemctl status mysql

# Verify database exists
mysql -u root -p
SHOW DATABASES;

# Check application.properties configuration
```

**Frontend Build Errors:**
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Database Connection Issues:**
1. Verify MySQL is running on port 3306
2. Check username/password in application.properties
3. Ensure database `banking_db` exists
4. Verify firewall settings

**JWT Token Issues:**
- Clear browser localStorage
- Check token expiration settings
- Verify JWT secret configuration

**Admin Panel Not Loading:**
1. Verify backend is running (http://localhost:8080/api)
2. Check browser console for errors
3. Ensure admin credentials are correct
4. Clear browser cache and cookies

### 🔧 Debug Mode

**Enable Backend Logging:**
```properties
# Add to application.properties
logging.level.com.yourpackage=DEBUG
logging.level.org.springframework.security=DEBUG
```

**Frontend Debug Console:**
- Open browser DevTools (F12)
- Check Console tab for errors
- Monitor Network tab for API calls
- Use React Developer Tools extension

### 📞 Getting Help

If you encounter issues:
1. Check the [troubleshooting section](#troubleshooting)
2. Review console logs for error messages
3. Verify all prerequisites are installed
4. Check database connectivity
5. Open an issue on GitHub with error details

## 🤝 Contributing

We welcome contributions! This project follows modern development practices and maintains high code quality standards.

### 🚀 Development Workflow

1. **Fork & Clone**
   ```bash
   git clone https://github.com/yourusername/Java_SpringBoot_Project.git
   cd Java_SpringBoot_Project
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow existing code style
   - Add tests for new features
   - Update documentation

4. **Test Your Changes**
   ```bash
   # Backend tests
   cd backend/springboot_project_backend
   mvn test
   
   # Frontend tests
   cd frontend
   npm test
   ```

5. **Submit Pull Request**
   - Provide clear description
   - Reference related issues
   - Ensure CI passes

### 🎯 Areas for Contribution

**High Priority:**
- 🔐 Enhanced security features
- 📊 Advanced analytics dashboard
- 🧪 Increased test coverage
- 📱 Mobile app development

**Medium Priority:**
- 🎨 UI/UX improvements
- 🌐 Internationalization (i18n)
- 📈 Performance optimizations
- 🔔 Notification system

**Documentation:**
- 📚 API documentation improvements
- 🎥 Video tutorials
- 📖 Developer guides
- 🔧 Deployment guides

### 📋 Code Standards

**Backend (Java/Spring Boot):**
- Follow Spring Boot best practices
- Use proper exception handling
- Implement comprehensive logging
- Write unit and integration tests

**Frontend (React):**
- Use functional components with hooks
- Follow React best practices
- Implement proper error boundaries
- Write component tests

**General:**
- Clear, descriptive commit messages
- Proper code documentation
- Follow existing naming conventions
- Maintain backwards compatibility

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful frontend library
- MySQL for reliable database management
- Open source community for inspiration and support

## 📞 Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs and issues
- 💡 Suggesting new features
- 🤝 Contributing to the codebase

---

<div align="center">

### 🏦 NextGen Bank - Modern Digital Banking Platform

**Built with ❤️ using Spring Boot & React**

[⭐ Star Repository](https://github.com/piyushku0331/Java_SpringBoot_Project) • [🐛 Report Issues](https://github.com/piyushku0331/Java_SpringBoot_Project/issues) • [💡 Request Features](https://github.com/piyushku0331/Java_SpringBoot_Project/issues/new)

---

**Tech Stack:** `Spring Boot` `React` `MySQL` `JWT` `REST API` `Responsive Design`

</div>
