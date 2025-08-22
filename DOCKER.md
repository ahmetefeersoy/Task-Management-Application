# 🐳 Docker Quick Reference

# Please contact if this option doesn't work!

## Quick Start Commands

```bash
# Start all services
docker-compose up -d

# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# Stop all services
docker-compose down

# Restart a specific service
docker-compose restart backend
```

## Service URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8080
- **API Documentation**: http://localhost:8080/api-docs
- **Database**: localhost:5432

## Useful Docker Commands

```bash
# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Check service status
docker-compose ps

# Rebuild services
docker-compose up --build

# Remove all containers and volumes
docker-compose down -v

# Access container shell
docker-compose exec backend sh
docker-compose exec database psql -U taskuser -d taskmanager
```

## Environment Setup

1. Copy `.env.docker` to `.env`
2. Update database credentials if needed
3. Set a strong JWT secret for production

## Database Management

```bash
# Run database migrations
docker-compose exec backend npx prisma migrate deploy

# Reset database (development only)
docker-compose exec backend npx prisma migrate reset

# Open Prisma Studio
docker-compose exec backend npx prisma studio

# Database backup
docker-compose exec database pg_dump -U taskuser taskmanager > backup.sql
```
