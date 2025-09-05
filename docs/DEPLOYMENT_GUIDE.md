# Deployment Guide

## Prerequisites
- Java 17+
- Node.js 16+
- MySQL 8.0+
- Maven 3.6+

## Local Development Setup

### 1. Database Setup
```sql
CREATE DATABASE banking_db;
CREATE USER 'banking_user'@'localhost' IDENTIFIED BY 'your_password';
GRANT ALL PRIVILEGES ON banking_db.* TO 'banking_user'@'localhost';
FLUSH PRIVILEGES;
```

### 2. Backend Configuration
Update `backend/springboot_project_backend/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/banking_db
spring.datasource.username=banking_user
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
jwt.secret=your_jwt_secret_key_here
```

### 3. Frontend Configuration
Create `frontend/.env`:
```
REACT_APP_API_URL=http://localhost:8080/api
```

### 4. Build and Run
```bash
# Backend
cd backend/springboot_project_backend
mvn clean install
mvn spring-boot:run

# Frontend (new terminal)
cd frontend
npm install
npm start
```

## Production Deployment

### Docker Deployment
```bash
# Build backend
cd backend/springboot_project_backend
mvn clean package
docker build -t banking-backend .

# Build frontend
cd frontend
npm run build
docker build -t banking-frontend .

# Run with docker-compose
docker-compose up -d
```

### Cloud Deployment (AWS/Azure/GCP)
1. Set up managed database service
2. Configure environment variables
3. Deploy backend to container service
4. Deploy frontend to static hosting
5. Configure SSL/HTTPS
6. Set up monitoring and logging
