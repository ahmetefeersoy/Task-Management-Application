# Backend - Task Management Application

Modern Node.js backend API with TypeScript, Express, and Prisma ORM.

## 🚀 Technologies

- **Node.js** with TypeScript
- **Express.js** for REST API
- **Prisma ORM** for database management
- **PostgreSQL** database
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Zod** for input validation
- **Swagger** for API documentation
- **Jest** for testing

## 📊 Test Coverage

[![Tests](https://img.shields.io/badge/tests-13%20passed-brightgreen)]()
[![Coverage](https://img.shields.io/badge/coverage-88.88%25-brightgreen)]()

### Latest Test Results
```
=============================== Coverage summary ===============================
Statements   : 88.88% ( 120/135 )
Branches     : 58.33% ( 21/36 )
Functions    : 90% ( 9/10 )
Lines        : 88.28% ( 113/128 )
================================================================================
Test Suites: 1 passed, 1 total
Tests:       13 passed, 13 total
Snapshots:   0 total
Time:        6.072 s
```

### Test Categories
- ✅ **Authentication Tests** - User registration, login, validation
- ✅ **Task Management Tests** - CRUD operations for tasks
- ✅ **Authorization Tests** - Protected routes and token validation
- ✅ **Validation Tests** - Input validation and error handling
- ✅ **API Integration Tests** - End-to-end API functionality

## 📁 Project Structure

```
backend/src/
├── controllers/        # Route handlers
│   ├── auth.ts        # Authentication logic
│   └── tasks.ts       # Task management logic
├── middleware/        # Express middleware
│   └── auth.ts        # JWT authentication middleware
├── utils/             # Utility functions
│   └── validation.ts  # Input validation schemas
├── prisma/           # Database configuration
│   └── schema.prisma # Database schema
├── __tests__/        # Test files
│   └── api.test.ts   # API integration tests
├── app.ts            # Express app configuration
└── index.ts          # Server entry point
```

## 🎯 API Features

### Authentication Endpoints
- **POST** `/api/auth/register` - User registration with validation
- **POST** `/api/auth/login` - User authentication with JWT

### Task Management Endpoints
- **GET** `/api/tasks` - Get all user tasks
- **POST** `/api/tasks` - Create new task
- **PUT** `/api/tasks/:id` - Update task
- **DELETE** `/api/tasks/:id` - Delete task

### Task Properties
- **Title** - Task name (required)
- **Description** - Detailed task description (optional)
- **Status** - PENDING, IN_PROGRESS, COMPLETED
- **Priority** - LOW, MEDIUM, HIGH
- **Due Date** - Optional deadline
- **User Association** - Tasks linked to authenticated user

## 🚦 Setup & Installation

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Create a `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/taskdb"
JWT_SECRET="your-super-secret-jwt-key"
PORT=8080
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

### 4. Start Development Server
```bash
npm run dev
```

API will be available at `http://localhost:8080`

## 🧪 Testing

### Run Tests
```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run tests in watch mode
npm run test:watch
```

### Test Configuration
- **Framework**: Jest with TypeScript support
- **Environment**: Node.js test environment
- **Coverage**: HTML and LCOV reports generated
- **Timeout**: 10 seconds per test

## 🐳 Docker Deployment

### With Docker Compose (Recommended)
```bash
# From project root directory
docker-compose up -d

# API will be available at http://localhost:8080
```

### Individual Docker Commands
```bash
# Build backend image
docker build -t task-backend .

# Run backend container
docker run -p 8080:8080 task-backend
```

## 📖 API Documentation

Interactive API documentation available at:
- **Swagger UI**: `http://localhost:8080/api-docs`

### Authentication Flow
1. Register new user with email/username/password
2. Login to receive JWT token
3. Include token in `Authorization: Bearer <token>` header
4. Access protected task management endpoints

### Error Responses
- **400** - Bad Request (validation errors)
- **401** - Unauthorized (missing/invalid token)
- **404** - Not Found (resource doesn't exist)
- **500** - Internal Server Error

## 📱 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run test suite
- `npm run test:coverage` - Run tests with coverage report
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations

## 🔒 Security Features

- **JWT Authentication** - Secure token-based auth
- **Password Hashing** - Bcrypt with salt rounds
- **Input Validation** - Zod schema validation
- **CORS Protection** - Configurable cross-origin requests
- **Rate Limiting** - API endpoint protection
- **SQL Injection Prevention** - Prisma ORM protection

## 🎯 Performance Metrics

- **Response Time** - Average < 100ms
- **Database Queries** - Optimized with Prisma
- **Memory Usage** - Efficient resource management
- **Error Handling** - Comprehensive error middleware

---

## 📝 License

This project is licensed under the MIT License.