# Task Management Application

> **📋 Case Study Notice**: This project was developed as a technical assessment within a **3-day** timeline (August 20-22, 2025). While fully functional, it offers rapid development capabilities and pragmatic technology choices to meet the deadline. Development areas and the preferred technology stack are detailed at the bottom of this README. Some technologies were used for the first time, so I aimed to learn them quickly and keep them simple.

A full-stack task management application built with modern web technologies. Users can register, authenticate, and manage their personal tasks with priority levels and due dates.

## 🚀 Features

- **User Authentication**: Secure JWT-based registration and login
- **Task Management**: Create, read, update, and delete tasks
- **Task Properties**: Title, description, status, priority levels (Low/Medium/High), due dates
- **User Isolation**: Users can only access their own tasks
- **Modern UI**: Clean, responsive interface with Tailwind CSS
- **Real-time Notifications**: Toast notifications for user feedback
- **Confirmation Dialogs**: Beautiful confirmation modals for critical actions

## 🛠️ Technology Stack

### Frontend
- **React 19** with TypeScript
- **Vite** for build tooling
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **Axios** for API calls
- **React Hot Toast** for notifications

### Backend
- **Node.js** with Express (TypeScript)
- **Prisma ORM** with PostgreSQL
- **JWT** for authentication
- **bcryptjs** for password hashing
- **Zod** for validation
- **Swagger** for API documentation

### Database
- **PostgreSQL** with Prisma migrations

## 📁 Project Structure

```
Task-Management-Application/
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # Reusable UI components
│   │   ├── pages/      # Main application pages
│   │   ├── store/      # Redux store and slices
│   │   └── utils/      # Utility functions
│   └── package.json
├── backend/            # Express backend API
│   ├── src/
│   │   ├── controllers/# Route controllers
│   │   ├── middleware/ # Authentication middleware
│   │   ├── routes/     # API route definitions
│   │   └── app.ts      # Express application setup
│   ├── prisma/         # Database schema and migrations
│   └── package.json
└── README.md          # This file
```

## 🚦 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

**OR**

- Docker & Docker Compose (Recommended for quick setup)

### Option 1: Docker Deployment (Recommended) 🐳

1. **Clone the Repository**
```bash
git clone https://github.com/ahmetefeersoy/Task-Management-Application.git
cd Task-Management-Application
```

2. **Setup Environment**
```bash
# Copy Docker environment file
cp .env.docker .env

# Edit .env file with your preferred database credentials
# Default values work for local development
```

3. **Run with Docker Compose**
```bash
# Start all services (database, backend, frontend)
docker-compose up -d

# Run database migrations
docker-compose exec backend npx prisma migrate deploy
```

4. **Access the Application**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/api-docs

### Option 2: Local Development

### 1. Clone the Repository
```bash
git clone https://github.com/ahmetefeersoy/Task-Management-Application.git
cd Task-Management-Application
```

### 2. Database Setup
1. Create a PostgreSQL database
2. Copy `.env.example` to `.env` in the backend folder
3. Update database connection string and JWT secret

### 3. Backend Setup
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm start
```
Backend will run on `http://localhost:8080`

### 4. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend will run on `http://localhost:5173`

## 📚 API Documentation with Swagger

The API documentation is available via Swagger UI at:
`http://localhost:8080/api-docs`

### Main Endpoints

#### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

#### Tasks (Protected)
- `GET /api/tasks` - Get user's tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

## 🗄️ Database Schema

### Users
- `id` (Primary Key)
- `email` (Unique)
- `username`
- `password` (Hashed)
- `createdAt`, `updatedAt`

### Tasks
- `id` (Primary Key)
- `title`
- `description` (Optional)
- `status` (PENDING, IN_PROGRESS, COMPLETED, CANCELLED)
- `priority` (LOW, MEDIUM, HIGH)
- `dueDate` (Optional)
- `userId` (Foreign Key)
- `createdAt`, `updatedAt`

## 🔐 Authentication Flow

1. User registers with email/username and password
2. Backend hashes password and stores user in database
3. User logs in with credentials
4. Backend validates credentials and returns JWT token
5. Frontend stores token in localStorage
6. All protected API calls include JWT token in Authorization header
7. Backend middleware validates token for protected routes

## 🎨 UI Features

- **Responsive Design**: Works on desktop and mobile
- **Priority Color Coding**: Visual indicators for task priorities
- **Status Management**: Click to toggle task completion
- **Beautiful Confirmations**: Modern modal dialogs for delete/logout
- **Toast Notifications**: Real-time feedback for user actions
- **Loading States**: Visual feedback during API calls

## 📝 Development

### Running in Development Mode

#### Backend (with auto-reload)
```bash
cd backend
npm run dev
```

#### Frontend (with hot reload)
```bash
cd frontend
npm run dev
```

### Building for Production

#### Frontend Build
```bash
cd frontend
npm run build
```

#### Backend Production
```bash
cd backend
npm run build
npm run start:prod
```

## 🐳 Production Deployment

### Docker Production Setup
```bash
# Build and start production containers
docker-compose -f docker-compose.yml up -d

# Scale services if needed
docker-compose up -d --scale frontend=2

# Check service status
docker-compose ps

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Environment Configuration
- Copy `.env.docker` to `.env`
- Update production database credentials
- Set strong JWT secret (minimum 32 characters)
- Configure production domain/ports if needed

### Database Management
```bash
# Run migrations in production
docker-compose exec backend npx prisma migrate deploy

# Access database directly
docker-compose exec database psql -U taskuser -d taskmanager

# Backup database
docker-compose exec database pg_dump -U taskuser taskmanager > backup.sql
```



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Ahmet Efe Ersoy**
- GitHub: [@ahmetefeersoy](https://github.com/ahmetefeersoy)

## 🙏 Acknowledgments

- Built as a case study for full-stack development
- Demonstrates modern React and Node.js best practices
- Includes secure authentication and database design patterns
