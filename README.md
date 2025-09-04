# [Banking Application](https://github.com/piyushku0331/Java_SpringBoot_Project) &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/piyushku0331/Java_SpringBoot_Project/blob/main/README.md#license) [![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.4.9-brightgreen.svg)](https://spring.io/projects/spring-boot) [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/) [![MySQL](https://img.shields.io/badge/MySQL-8.0-orange.svg)](https://www.mysql.com/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/piyushku0331/Java_SpringBoot_Project/pulls)

Banking Application is a modern full-stack web application for secure banking operations.

* **Secure Authentication:** JWT-based authentication with BCrypt password encryption ensures secure user sessions and data protection.
* **Account Management:** Comprehensive account creation, viewing, and management with real-time balance updates and transaction history.
* **Transaction Processing:** Seamless money transfers, deposits, and withdrawals with instant processing and detailed transaction records.
* **Loan Services:** Complete loan application system with approval workflows and repayment tracking.

[Learn how to use Banking Application in your environment](#installation).

## Installation

Banking Application has been designed for easy setup and deployment, and **you can run it locally or deploy it to the cloud**:

* Use [Quick Start](#quick-start) to get the application running locally.
* [Configure Database](#database-setup) to connect to your MySQL instance.
* [Deploy to Production](#production-deployment) when you're ready to go live.

## Documentation

You can find comprehensive setup instructions below.

Check out the [Quick Start](#quick-start) section for immediate setup.

The documentation covers:

* [Installation](#installation)
* [Quick Start](#quick-start)
* [Database Setup](#database-setup)
* [API Reference](#api-reference)
* [Contributing](#contributing)

## Examples

We have several examples to get you started. Here's a simple transaction example:

```java
@RestController
@RequestMapping("/api/customer")
public class TransactionController {
    
    @PostMapping("/transactions")
    public ResponseEntity<Transaction> createTransaction(@RequestBody TransactionRequest request) {
        Transaction transaction = transactionService.processTransaction(request);
        return ResponseEntity.ok(transaction);
    }
}
```

And here's how the frontend handles authentication:

```jsx
import { useAuth } from './context/AuthContext';

function LoginForm() {
  const { login } = useAuth();
  
  const handleSubmit = async (credentials) => {
    try {
      await login(credentials);
      navigate('/dashboard');
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Login form fields */}
    </form>
  );
}
```

## Quick Start

### Prerequisites
- Java 17+
- Node.js 16+
- MySQL 8.0+
- Maven 3.6+

### Setup

```bash
# Clone the repository
git clone https://github.com/piyushku0331/Java_SpringBoot_Project.git
cd Java_SpringBoot_Project

# Setup Backend
cd backend/springboot_project_backend
mvn clean install
mvn spring-boot:run

# Setup Frontend (in new terminal)
cd frontend
npm install
npm start
```

### Database Setup
1. Create MySQL database: `banking_db`
2. Update `application.properties` with your database credentials
3. Application will auto-create tables on first run

### Access
- Frontend: http://localhost:3000
- Backend API: http://localhost:8080

## API Reference

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login  
- `POST /api/auth/reset-password` - Password reset

### Account Management
- `GET /api/customer/accounts` - Get user accounts
- `POST /api/customer/accounts` - Create new account
- `GET /api/customer/accounts/{id}` - Get account details

### Transactions
- `GET /api/customer/transactions` - Get transaction history
- `POST /api/customer/transactions` - Create new transaction

### Loans
- `GET /api/customer/loans` - Get user loans
- `POST /api/customer/loans` - Apply for loan

## Contributing

The main purpose of this repository is to continue evolving the Banking Application, making it more secure and feature-rich. Development happens in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements.

### [Contributing Guide](https://github.com/piyushku0331/Java_SpringBoot_Project/blob/main/CONTRIBUTING.md)
Read our contributing guide to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

### [Good First Issues](https://github.com/piyushku0331/Java_SpringBoot_Project/labels/good%20first%20issue)
To help you get your feet wet and get familiar with our contribution process, we have a list of good first issues that contain bugs with a relatively limited scope. This is a great place to get started.

### License
Banking Application is [MIT licensed](./LICENSE).
