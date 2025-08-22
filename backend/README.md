# Task Management API Backend

A RESTful API for task management with JWT authentication built with Node.js, Express, TypeScript, Prisma, and PostgreSQL.

## Features

- 🔐 JWT Authentication (Register/Login)
- 📝 CRUD Operations for Tasks
- 👤 User-specific task management
- 🗄️ PostgreSQL database with Prisma ORM
- 📚 Swagger API documentation
- 🔒 Protected routes with JWT middleware

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Documentation**: Swagger/OpenAPI
- **Password Hashing**: bcryptjs

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database (Local installation **OR** Cloud service)
- npm or yarn package manager

### Database Options
- **Local**: PostgreSQL installed locally
- **Cloud**: Supabase, Neon, Railway, ElephantSQL, etc.

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   ```bash
   # Copy the example environment file
   cp .env.example .env
   
   # Then edit .env file with your database credentials and JWT secret
   # Example DATABASE_URL for cloud services:
   # postgresql://username:password@host:port/database
   ```
   
   See `.env.example` file for all required environment variables.

4. **Setup database**
   
   **Option A: Using Cloud Database (Recommended for development)**
   ```bash
   # Push schema to your cloud database (Supabase, Neon, etc.)
   npx prisma db push
   
   # Generate Prisma Client
   npx prisma generate
   ```
   
   **Option B: Using Local Database with Migrations**
   ```bash
   # Run database migrations (for local PostgreSQL)
   npx prisma migrate dev
   
   # Generate Prisma Client
   npx prisma generate
   ```

5. **Start the development server**
   ```bash
   npm start
   ```

The server will be available at `http://localhost:8080`

API documentation will be available at `http://localhost:8080/api-docs`

## Available Scripts

- `npm start` - Start the development server with hot reload
- `npm run build` - Build the project for production
- `npx prisma studio` - Open Prisma Studio for database management
- `npx prisma db push` - Push schema changes to database (for cloud databases)
- `npx prisma migrate dev` - Run database migrations (for local databases)
- `npx prisma generate` - Generate Prisma Client

## Database Setup Examples

### Using Supabase (Free Cloud PostgreSQL)
1. Create account at [supabase.com](https://supabase.com)
2. Create new project
3. Copy connection string to `.env`:
   ```
   DATABASE_URL="postgresql://postgres:your-password@db.xxx.supabase.co:5432/postgres"
   ```
4. Run `npx prisma db push`

### Using Local PostgreSQL
1. Install PostgreSQL locally
2. Create database
3. Update `.env` with local connection:
   ```
   DATABASE_URL="postgresql://postgres:password@localhost:5432/task-tracker"
   ```
4. Run `npx prisma migrate dev`