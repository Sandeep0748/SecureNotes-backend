# SecureNotes API - Backend

A secure, scalable REST API for managing notes with JWT authentication and role-based access control.

## Features

✅ User authentication (registration & login) with JWT tokens  
✅ Password hashing using bcrypt  
✅ Role-based access control (user vs admin)  
✅ CRUD operations for notes  
✅ Input validation & error handling  
✅ Swagger API documentation  
✅ PostgreSQL database  
✅ Security headers with Helmet  
✅ CORS support  

## Tech Stack

- **Node.js** with Express.js
- **PostgreSQL** for database
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation
- **Swagger** for API documentation

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- PostgreSQL
- npm or yarn

### Installation

1. Navigate to Backend folder:
```bash
cd Backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=securenotes
DB_USER=postgres
DB_PASSWORD=your_password
JWT_SECRET=your_super_secret_key
```

5. Create PostgreSQL database:
```sql
CREATE DATABASE securenotes;
```

### Running the Server

Development mode with auto-reload:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will start at `http://localhost:3001`

## API Endpoints

### Authentication

- `POST /v1/auth/register` - Register a new user
- `POST /v1/auth/login` - Login user

### Notes (Protected Routes)

- `GET /v1/notes` - Get all notes
- `GET /v1/notes/:id` - Get specific note
- `POST /v1/notes` - Create new note
- `PUT /v1/notes/:id` - Update note
- `DELETE /v1/notes/:id` - Delete note

## API Documentation

Swagger documentation available at: `http://localhost:3001/api-docs`

## Security Features

- JWT token-based authentication
- Bcrypt password hashing
- Input validation with express-validator
- SQL injection prevention with parameterized queries
- Security headers with Helmet
- Role-based access control middleware

## Scalability Considerations

1. **Database Optimization**: Indexed user_id on notes table for faster queries
2. **Caching**: Can add Redis for token caching and note caching
3. **Rate Limiting**: Can implement rate limiting middleware
4. **Load Balancing**: Backend can be deployed across multiple instances
5. **Microservices**: Notes service can be separated into its own microservice
6. **Database Replication**: PostgreSQL can be set up with replicas for read scaling

## Future Improvements

- Add refresh tokens
- Implement rate limiting
- Add Redis caching
- Docker containerization
- CI/CD pipeline
- Unit and integration tests
- API versioning strategy
- Logging service (Winston/Bunyan)
