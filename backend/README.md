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
- PostgreSQL database
- npm or yarn package manager

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
   
   # Then edit .env file with your actual database credentials and JWT secret
   ```
   
   See `.env.example` file for all required environment variables.

4. **Setup database**
   ```bash
   # Run database migrations
   npx prisma migrate dev
   
   # Generate Prisma Client (Important!)
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
- `npx prisma migrate dev` - Run database migrations
- `npx prisma generate` - Generate Prisma Client