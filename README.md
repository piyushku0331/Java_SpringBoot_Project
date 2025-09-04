# Banking Application

A modern full-stack banking application built with React frontend and Spring Boot backend, featuring secure authentication, account management, transactions, and loan services.

## 🏗️ Architecture

- **Frontend**: React 18 with modern hooks, routing, and state management
- **Backend**: Spring Boot 3.4.9 with JWT authentication, JPA, and MySQL
- **Database**: MySQL 8.0 with proper indexing and relationships
- **Security**: JWT-based authentication with BCrypt password encryption

## 📁 Project Structure

```
SpringBoot_Project_Frontend/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Authentication context
│   │   ├── assets/        # Static assets
│   │   └── ...
│   ├── public/
│   └── package.json
├── backend/           # Spring Boot application
│   └── springboot_project_backend/
│       ├── src/
│       │   ├── main/java/     # Java source code
│       │   └── main/resources/ # Application properties
│       ├── pom.xml
│       └── ...
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- **Java 17+** (for Spring Boot backend)
- **Node.js 16+** and npm (for React frontend)
- **MySQL 8.0+** (for database)
- **Maven 3.6+** (for building backend)

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd SpringBoot_Project_Frontend
   ```

2. **Setup Backend**
   ```bash
   cd backend/springboot_project_backend
   
   # Configure database in src/main/resources/application.properties
   # Update database URL, username, and password
   
   # Build and run
   mvn clean install
   mvn spring-boot:run
   ```

3. **Setup Frontend**
   ```bash
   cd frontend
   
   # Install dependencies
   npm install
   
   # Start development server
   npm start
   ```

4. **Setup Database**
   - Create a MySQL database named `banking_db`
   - Update connection details in `application.properties`
   - The application will auto-create tables on first run

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080
- **Database**: localhost:3306

## 🔧 Configuration

### Backend Configuration

Edit `backend/springboot_project_backend/src/main/resources/application.properties`:

```properties
# Database Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/banking_db
spring.datasource.username=your_username
spring.datasource.password=your_password

# JWT Configuration
jwt.secret=your_jwt_secret_key

# Server Configuration
server.port=8080
```

### Frontend Configuration

The frontend is configured to connect to the backend at `http://localhost:8080/api`. If you change the backend port, update the API base URL in the frontend service files.

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Encryption**: BCrypt hashing for user passwords
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Input Validation**: Server-side validation for all API endpoints
- **SQL Injection Prevention**: JPA/Hibernate parameterized queries

## 📝 API Endpoints

### Authentication
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

## 🛠️ Development

### Backend Development

```bash
cd backend/springboot_project_backend

# Run in development mode
mvn spring-boot:run -Dspring.profiles.active=dev

# Run tests
mvn test

# Build for production
mvn clean package -DskipTests
```

### Frontend Development

```bash
cd frontend

# Start development server
npm start

# Run tests
npm test

# Build for production
npm run build
```

## 🧪 Testing

### Backend Tests
```bash
cd backend/springboot_project_backend
mvn test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 🚀 Production Build

### Backend
```bash
cd backend/springboot_project_backend
mvn clean package -DskipTests
java -jar target/springboot_project_backend-*.jar
```

### Frontend
```bash
cd frontend
npm run build
# Serve the build folder with a web server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see below for details:

```
MIT License

Copyright (c) 2024 Banking Application

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the documentation above
- Review the code comments for implementation details

## 🔮 Future Enhancements

- [ ] Add comprehensive test coverage
- [ ] Implement email notifications
- [ ] Add transaction categories and budgeting
- [ ] Mobile responsive design improvements
- [ ] API rate limiting
- [ ] Advanced security features (2FA, etc.)
