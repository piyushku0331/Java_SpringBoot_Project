# Remaining Modules Documentation - NextGen Bank

This document provides detailed information about the remaining modules that need to be implemented in the NextGen Bank project. These modules include Account Management, User Management, and Admin Management.

## 📋 Module Overview

### ✅ Completed Modules (by team)
- **Configuration**: JWT, Security, Database setup
- **Authentication**: User login/register, password reset
- **Loan Management**: Loan applications, approvals, payments

### 🔄 Remaining Modules
- **Account Management**: CRUD operations for bank accounts
- **User Management**: User profile management

---

## 🏦 Account Management Module

### Backend Implementation

#### Controller: `AccountController.java`
**Base URL**: `/api/customer/accounts`

**Endpoints:**
- `GET /` - Get all accounts for a user
  - Parameters: `userId` (query param)
  - Returns: List of Account objects
  - Security: User authentication required

- `GET /{userId}/accounts` - Get accounts by user ID (path param)
  - Returns: List of Account objects
  - Validation: User ownership verification

- `GET /{accountId}` - Get account details
  - Parameters: `accountId` (path variable)
  - Returns: Single Account object
  - Validation: Numeric ID format

- `POST /` - Create new account
  - Request Body: `{userId, accountType, initialDeposit}`
  - Validation: Required fields check
  - Returns: Created account with success message

- `GET /balance/{accountNumber}` - Get account balance
  - Parameters: `accountNumber` (path variable)
  - Returns: `{accountNumber, balance, accountType}`

**Key Functions:**
- `validateCreateAccountRequest()` - Validates account creation input
- `createErrorResponse()` - Standardized error response format
- Logging with SLF4J for all operations

#### Service: `AccountService.java`
**Core Methods:**
- `getAccountsByUserId(Long userId)` - Fetch user accounts
- `getAccountById(Long accountId)` - Get account by ID
- `createAccount(Long userId, String accountType, BigDecimal initialDeposit)` - Create account
- `getAccountByNumber(String accountNumber)` - Find by account number

#### Entity: `Account.java`
**Fields:**
- `id` (Long) - Primary key
- `accountNumber` (String) - Unique account number
- `accountType` (String) - Savings, Current, etc.
- `balance` (BigDecimal) - Current balance
- `user` (User) - Account owner
- `createdAt`, `updatedAt` (LocalDateTime)

#### Repository: `AccountRepository.java`
**Methods:**
- `findByUserId(Long userId)` - Find accounts by user
- `findByAccountNumber(String accountNumber)` - Find by account number
- `findById(Long id)` - Standard JPA find

### Frontend Implementation

#### Components:
- `AccountsList.js` - Main accounts listing page
- `AccountDetail.js` - Individual account details
- `CreateAccount.js` - Account creation form

#### Key Features:
- **State Management**: React hooks (useState, useEffect)
- **Authentication**: AuthContext integration
- **Error Handling**: Network errors, authentication failures
- **Loading States**: Spinner during API calls
- **Responsive Design**: Mobile-friendly layout

#### Service Integration:
```javascript
// accountService.js
export const getCustomerAccounts = async (userId) => {
  const response = await api.get(`/customer/accounts?userId=${userId}`);
  return response.data;
};
```

---


## 👤 User Management Module

### Backend Implementation

#### Controller: `UserController.java`
**Base URL**: `/api/user`

**Endpoints:**
- `GET /{userId}` - Get user profile
  - Returns: User object or error if not found

- `PUT /{userId}` - Update user profile
  - Request Body: Map of fields to update
  - Returns: Updated User object

#### Service: `UserService.java`
**Core Methods:**
- `findById(Long userId)` - Get user by ID
- `findByEmail(String email)` - Get user by email
- `updateUser(Long userId, Map<String, String> updates)` - Update user fields

#### Entity: `User.java`
**Fields:**
- `id` (Long) - Primary key
- `email` (String) - Unique email
- `password` (String) - Encrypted password
- `firstName`, `lastName` (String) - User names
- `phone` (String) - Phone number
- `status` (UserStatus) - ACTIVE, SUSPENDED, etc.
- `createdAt`, `updatedAt` (LocalDateTime)

### Frontend Implementation
- User profile components (to be implemented)
- Profile update forms
- User settings pages

---


## 🔧 Technologies Used & Import Analysis

### Backend Technologies & Imports

#### Core Spring Framework Imports:
```java
import org.springframework.beans.factory.annotation.Autowired; // Dependency injection
import org.springframework.http.ResponseEntity; // HTTP response wrapper
import org.springframework.web.bind.annotation.*; // REST controller annotations
import org.springframework.stereotype.Service; // Service layer annotation
import org.springframework.transaction.annotation.Transactional; // Transaction management
```

**Purpose:**
- `@Autowired`: Enables dependency injection, automatically wiring beans
- `ResponseEntity`: Provides HTTP response with status codes and headers
- `@RestController`, `@RequestMapping`: Define REST endpoints
- `@Service`: Marks class as a service component
- `@Transactional`: Ensures database operations are atomic

#### Security & Authentication Imports:
```java
import org.springframework.security.core.Authentication; // User authentication object
import org.springframework.security.core.context.SecurityContextHolder; // Security context
import com.Springboot_Project_Backend.springboot_project_backend.config.JwtUtil; // JWT utilities
```

**Purpose:**
- `Authentication`: Represents authenticated user principal
- `SecurityContextHolder`: Provides access to current security context
- `JwtUtil`: Custom utility for JWT token generation and validation

#### Database & JPA Imports:
```java
import jakarta.persistence.*; // JPA annotations for entities
import com.fasterxml.jackson.annotation.JsonIgnore; // JSON serialization control
```

**Purpose:**
- `@Entity`, `@Table`: Define database entities and tables
- `@Id`, `@GeneratedValue`: Primary key configuration
- `@Column`: Column mapping and constraints
- `@ManyToOne`, `@OneToMany`: Relationship mappings
- `@JsonIgnore`: Prevents infinite recursion in JSON serialization

#### Java Standard Library Imports:
```java
import java.math.BigDecimal; // Precise decimal arithmetic
import java.time.LocalDateTime; // Date/time handling
import java.util.*; // Collections framework
import java.util.UUID; // Unique identifier generation
```

**Purpose:**
- `BigDecimal`: Financial calculations with precision
- `LocalDateTime`: Timestamp management
- `List`, `Map`, `Optional`: Data structures and null-safe operations
- `UUID`: Generate unique transaction IDs

#### Logging Imports:
```java
import org.slf4j.Logger; // Logging interface
import org.slf4j.LoggerFactory; // Logger factory
```

**Purpose:**
- `Logger`: Interface for logging messages
- `LoggerFactory`: Creates logger instances
- Used for debugging, monitoring, and audit trails

### Frontend Technologies & Imports

#### React Core Imports:
```javascript
import React, { useState, useEffect } from 'react'; // React hooks and core
import { Link, useLocation } from 'react-router-dom'; // Navigation components
```

**Purpose:**
- `React`: Core React library
- `useState`: State management in functional components
- `useEffect`: Side effects and lifecycle management
- `Link`: Declarative navigation
- `useLocation`: Access current URL location

#### HTTP Client Imports:
```javascript
import axios from 'axios'; // HTTP client library
```

**Purpose:**
- `axios`: Promise-based HTTP client for API calls
- Handles requests, responses, and interceptors
- Automatic JSON transformation

#### Custom Component Imports:
```javascript
import Card from '../../components/common/Card/Card'; // Reusable UI components
import Button from '../../components/common/Button/Button'; // Button component
import { useAuth } from '../../context/AuthContext'; // Authentication context
```

**Purpose:**
- `Card`: Consistent card layout component
- `Button`: Reusable button with variants
- `useAuth`: Custom hook for authentication state

#### Utility Imports:
```javascript
import { formatCurrency, formatDate } from '../../utils/formatters'; // Data formatting
import { getCustomerAccounts } from '../../services/customerService'; // API service functions
```

**Purpose:**
- `formatCurrency`: Currency display formatting
- `formatDate`: Date/time formatting
- Service functions: Encapsulated API calls

#### Styling Imports:
```javascript
import './Accounts.css'; // Component-specific styles
import '../../styles/global.css'; // Global application styles
```

**Purpose:**
- Component CSS: Scoped styling
- Global CSS: Application-wide styles and variables

### Import Patterns & Best Practices

#### Backend Import Organization:
1. **Project imports first**: Custom entities, services, repositories
2. **Spring framework**: Core Spring annotations and utilities
3. **Third-party libraries**: Jackson, security frameworks
4. **Java standard library**: Collections, time, math utilities
5. **Logging**: SLF4J logging framework

#### Frontend Import Organization:
1. **React ecosystem**: React, React Router, hooks
2. **Third-party libraries**: Axios, date libraries
3. **Custom components**: UI components and layouts
4. **Custom hooks**: Business logic hooks
5. **Services**: API service functions
6. **Utilities**: Helper functions and formatters
7. **Styles**: CSS files and style utilities

### Key Import Dependencies Explained:

#### Critical Backend Dependencies:
- **Spring Boot Starter Web**: REST controllers and web functionality
- **Spring Boot Starter Data JPA**: Database operations and ORM
- **Spring Boot Starter Security**: Authentication and authorization
- **MySQL Connector**: Database connectivity
- **JJWT**: JWT token handling
- **Jackson**: JSON processing

#### Critical Frontend Dependencies:
- **React**: UI framework and component library
- **React Router DOM**: Client-side routing
- **Axios**: HTTP client for API communication
- **React Context**: State management solution

### Import-Related Configuration:

#### Maven Dependencies (pom.xml):
```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-security</artifactId>
    </dependency>
</dependencies>
```

#### NPM Dependencies (package.json):
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-router-dom": "^6.8.0",
    "axios": "^1.3.0"
  }
}
```

This import structure ensures clean, maintainable code with proper separation of concerns and clear dependency management.

### Import Best Practices Demonstrated:

#### 1. **Organized Import Structure**:
- Group imports by functionality (Spring, JPA, utilities)
- Separate third-party from custom project imports
- Use wildcard imports judiciously for related classes

#### 2. **Dependency Injection Pattern**:
```java
@Autowired
private AccountService accountService; // Field injection
```
- Reduces coupling between classes
- Enables easier testing with mocks
- Spring manages object lifecycle

#### 3. **Layered Architecture Imports**:
- Controllers import services (not repositories)
- Services import repositories and entities
- Clear separation of concerns

#### 4. **Exception Handling Imports**:
```java
import java.util.Optional; // Null-safe operations
```
- Prevents NullPointerException
- Encourages defensive programming
- Modern Java best practices

#### 5. **Frontend State Management**:
```javascript
import { useState, useEffect } from 'react'; // React hooks
import { useAuth } from '../../context/AuthContext'; // Custom context
```
- Declarative state management
- Custom hooks for reusable logic
- Context API for global state

### Common Import Patterns:

#### Service Layer Pattern:
```java
@Service
public class AccountService {
    @Autowired
    private AccountRepository accountRepository;
    // Business logic here
}
```

#### Controller Layer Pattern:
```java
@RestController
@RequestMapping("/api/accounts")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {
    // REST endpoints here
}
```

#### Entity Layer Pattern:
```java
@Entity
@Table(name = "accounts")
public class Account {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    // Entity fields here
}
```

#### React Component Pattern:
```javascript
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const AccountsList = () => {
    const { user } = useAuth();
    // Component logic here
};
```

This comprehensive import analysis helps understand the project's architecture, dependencies, and design patterns used throughout the application.

### Development Tools:
- **Java 17** - Backend runtime
- **Node.js 16+** - Frontend runtime
- **Git** - Version control
- **VS Code** - IDE

---

## ❓ Potential Teacher Questions

### Architecture & Design
1. **How does the JWT authentication work in this application?**
   - JWT tokens are generated on login and stored in localStorage
   - Tokens are validated on each API request using JwtUtil
   - User context is extracted from token for authorization

2. **Explain the layered architecture (Controller → Service → Repository)**
   - Controllers handle HTTP requests/responses
   - Services contain business logic
   - Repositories handle data persistence

3. **How is security implemented across the application?**
   - Spring Security with JWT authentication
   - Role-based access control
   - CORS configuration for frontend integration
   - Password encryption with BCrypt

### Database Design
4. **How are database operations handled to ensure data consistency?**
   - Service layer manages transaction boundaries
   - Balance updates are atomic operations
   - Database transactions ensure ACID properties

### Frontend Architecture
5. **How does the React Context API manage authentication state?**
   - AuthContext provides user state globally
   - Login/logout functions update context
   - Protected routes check authentication status

6. **Explain the component structure and reusability**
   - Common components (Button, Card) for consistency
   - Page components for specific features
   - Separation of concerns between UI and logic

### API Design
7. **How are RESTful conventions followed in the API design?**
   - Proper HTTP methods (GET, POST, PUT, DELETE)
   - Resource-based URLs
   - Consistent response formats
   - Error handling with appropriate status codes

8. **Explain the validation and error handling strategy**
   - Request validation in controllers
   - Custom exception handling
   - Standardized error response format
   - Client-side validation in forms

### Performance & Security
9. **What measures are taken for API security?**
    - JWT token validation
    - CORS configuration
    - Input validation and sanitization
    - SQL injection prevention with JPA

10. **How does the application handle concurrent database operations?**
   - Database-level locking for balance updates
   - Optimistic locking for data consistency
   - Database isolation levels

11. **Explain the logging strategy used in the application**
    - SLF4J with different log levels
    - Structured logging with context
    - Error tracking and debugging information

### Deployment & DevOps
12. **How would you deploy this application to production?**
    - Backend: JAR file with embedded Tomcat
    - Frontend: Build and serve static files
    - Database: MySQL in cloud environment
    - Reverse proxy (Nginx) for routing

13. **What monitoring and logging would you implement?**
    - Application metrics with Spring Boot Actuator
    - Centralized logging with ELK stack
    - Health checks and alerts
    - Performance monitoring

### Code Quality
14. **How is code maintainability ensured?**
    - Clean code principles
    - Separation of concerns
    - Consistent naming conventions
    - Documentation and comments

15. **Explain the testing strategy for this application**
    - Unit tests for services
    - Integration tests for controllers
    - Frontend component tests
    - End-to-end testing with Selenium

### Import & Dependency Management
16. **Why is `BigDecimal` used instead of `double` or `float` for financial calculations?**
    - `BigDecimal` provides exact decimal arithmetic, preventing floating-point precision errors
    - Essential for banking applications where accuracy is critical
    - Avoids rounding errors that can occur with binary floating-point representations

17. **Explain the purpose of `@JsonIgnore` annotation in entity classes**
    - Prevents infinite recursion during JSON serialization of bidirectional relationships
    - Improves performance by avoiding unnecessary data serialization
    - Maintains data integrity while controlling API response structure

18. **Why are JPA annotations like `@Entity`, `@Table`, `@Id` important?**
    - `@Entity`: Marks class as JPA entity for database mapping
    - `@Table`: Specifies database table name and properties
    - `@Id`: Identifies primary key field
    - `@GeneratedValue`: Auto-generates primary key values
    - Enables ORM functionality and automatic CRUD operations

19. **What is the role of `@Autowired` in Spring dependency injection?**
    - Enables automatic dependency injection by Spring container
    - Reduces manual object creation and coupling
    - Supports constructor, setter, and field injection
    - Facilitates loose coupling and easier testing

20. **Explain the use of `Optional` in service methods**
    - Provides null-safe operations and prevents NullPointerException
    - Forces explicit null checking with `isPresent()` and `orElseThrow()`
    - Improves code readability and reduces defensive programming
    - Modern Java best practice for nullable return values

21. **Why is `LocalDateTime` preferred over `Date` or `Calendar`?**
    - Thread-safe and immutable design
    - Better API with clear method names
    - Supports nanosecond precision
    - Easier to work with time zones and formatting
    - Modern Java date/time API (introduced in Java 8)

22. **What is the purpose of `@Transactional` annotation?**
    - Ensures database operations are atomic (all-or-nothing)
    - Automatically manages transaction boundaries
    - Provides rollback capability on exceptions
    - Critical for data consistency in multi-step operations

23. **Explain the use of React hooks like `useState` and `useEffect`**
    - `useState`: Manages component state in functional components
    - `useEffect`: Handles side effects like API calls and subscriptions
    - Enables functional components to have state and lifecycle
    - More concise than class component lifecycle methods

24. **Why is Axios used instead of native `fetch` API?**
    - Automatic JSON transformation
    - Request/response interceptors for authentication
    - Better error handling and timeout management
    - Consistent API across different browsers
    - Built-in CSRF protection capabilities

25. **What is the role of `SecurityContextHolder` in Spring Security?**
    - Provides access to current security context
    - Stores authentication information for current thread
    - Enables retrieval of authenticated user details
    - Thread-local storage for security information

26. **Explain the purpose of `@PrePersist` and `@PreUpdate` annotations**
    - `@PrePersist`: Executes before entity is saved to database
    - `@PreUpdate`: Executes before entity is updated in database
    - Used for automatic field population (timestamps, IDs)
    - Ensures data consistency and audit trails

27. **Why are enumerated types (`enum`) used in entities?**
    - Provides type safety and prevents invalid values
    - Self-documenting code with meaningful names
    - Database-level constraints through JPA
    - Easier validation and business logic implementation

28. **What is the significance of `@CrossOrigin` annotation?**
    - Enables Cross-Origin Resource Sharing (CORS)
    - Allows frontend to make requests to backend from different origin
    - Configurable origins, methods, and headers
    - Essential for separate frontend/backend deployments

29. **Explain the use of `UUID` for unique identifiers**
    - Generates universally unique identifiers
    - Prevents ID collisions in distributed systems
    - No sequential pattern that could be exploited
    - Standard format for unique identification

---

## 📝 Implementation Notes

### Current Status
- Backend controllers and services are implemented
- Basic frontend components exist
- Database entities and repositories are set up
- Authentication and security are configured

### Next Steps
1. Complete frontend components for all modules
2. Implement comprehensive error handling
3. Add input validation and form handling
4. Create unit and integration tests
5. Add comprehensive logging
6. Add application monitoring capabilities

### Best Practices Implemented
- RESTful API design
- Proper error handling
- Input validation
- Security measures
- Clean code architecture
- Responsive UI design
- Performance optimization

This documentation covers the core functionality and implementation details of the remaining modules in the NextGen Bank project.