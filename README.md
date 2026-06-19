# Campus Quest Backend - Spring Boot API

A gamified learning platform backend built with Spring Boot, MongoDB, and JWT authentication.

## Features

✅ **User Authentication** - Registration and login with JWT tokens
✅ **XP & Leveling System** - Award XP, track levels, automatic level ups
✅ **Daily Streaks** - Maintain learning streaks with timezone handling
✅ **Badges** - Earn achievements for milestones
✅ **Leaderboard** - Weekly rankings with nearby users
✅ **Course Management** - Enroll in courses, track progress

## Project Structure

```
campus-quest-backend/
├── src/main/java/com/campusquest/
│   ├── entity/           # MongoDB entities (User, Course, etc)
│   ├── repository/       # MongoDB repositories
│   ├── service/          # Business logic (Auth, Gamification, etc)
│   ├── controller/       # REST API endpoints
│   ├── dto/              # Data Transfer Objects
│   ├── security/         # JWT utilities
│   ├── config/           # Spring configuration
│   └── CampusQuestApplication.java  # Main entry point
├── src/main/resources/
│   └── application.yml   # Configuration file
└── pom.xml              # Maven dependencies
```

## Prerequisites

- **Java 17** (installed from Adoptium)
- **Maven 3.8+** (installed)
- **MongoDB 7.0+** (running locally)
- **Node.js 20+** (for frontend, not needed for backend)

## Setup Instructions

### 1. Verify Prerequisites

```bash
# Check Java
java --version
# Should show: openjdk 17.x.x

# Check Maven
mvn --version
# Should show: Apache Maven 3.x.x

# Check MongoDB is running
# Open MongoDB Compass - should connect to localhost:27017
```

### 2. Project Setup

```bash
# Navigate to backend directory
cd campus-quest-backend

# Download all dependencies (first time only)
mvn clean install

# This will take 2-3 minutes the first time
```

### 3. Run the Backend

```bash
# From the campus-quest-backend directory
mvn spring-boot:run

# The server starts at http://localhost:8080
# You should see output like:
# Started CampusQuestApplication in X.XXX seconds
```

### 4. Verify it's Working

Open your browser or use Postman:
```
GET http://localhost:8080/api/courses
```

You should get back an empty array `[]` (no courses yet).

---

## API Endpoints

### Authentication

**POST** `/api/auth/register`
```json
{
  "email": "arjun@example.com",
  "password": "password123",
  "fullName": "Arjun Kumar"
}
```

**POST** `/api/auth/login`
```json
{
  "email": "arjun@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "token": "eyJhbGc...",
  "email": "arjun@example.com",
  "fullName": "Arjun Kumar",
  "level": 1,
  "totalXP": 0
}
```

### User Profile

**GET** `/api/users/profile` (requires JWT token)
```
Header: Authorization: Bearer <token>
```

Returns:
```json
{
  "id": "507f1f77bcf86cd799439011",
  "email": "anzal@example.com",
  "fullName": "null",
  "level": 1,
  "totalXP": 0,
  "currentLevelXP": 0,
  "dailyStreak": 0,
  "badges": 0
}
```

### Courses

**GET** `/api/courses`
- Get all available courses

**POST** `/api/courses/{courseId}/enroll` (requires JWT)
- Enroll in a course

**PUT** `/api/courses/{courseId}/progress` (requires JWT)
```
?progress=50
```
- Update course progress

### Leaderboard

**GET** `/api/leaderboard/weekly`
- Get top 10 users

**GET** `/api/leaderboard/nearby` (requires JWT)
- Get users around your rank

**GET** `/api/leaderboard/fastest-climbers`
- Get fastest climbers this week

---

## Testing with Thunder Client (VS Code)

1. Install **Thunder Client** extension in VS Code
2. Create a new request:
   - URL: `http://localhost:8080/api/auth/register`
   - Method: POST
   - Body (JSON):
   ```json
   {
     "email": "test@example.com",
     "password": "test123",
     "fullName": "Test User"
   }
   ```
3. Click **Send**

---

## Troubleshooting

### "Connection refused" error
- Make sure MongoDB is running
- Open MongoDB Compass to verify

### "port 8080 already in use"
```bash
# Change port in application.yml
server:
  port: 8081  # Use different port
```

### "Dependency resolution failed"
```bash
# Clean and reinstall
mvn clean install -U
```

---

## Next Steps

1. **Seed Database** - Add sample courses and users
2. **Build Frontend** - Create React dashboard
3. **Deploy** - Host on Railway or AWS
4. **Add Features** - Real-time notifications with WebSocket

---

## Database Schema

### Users Collection
```
{
  _id: ObjectId,
  email: String,
  password: String (hashed),
  fullName: String,
  level: Number,
  totalXP: Number,
  currentLevelXP: Number,
  dailyStreak: Number,
  lastActivityDate: Date,
  badges: Number,
  createdAt: Date,
  updatedAt: Date
}
```

---

## Notes

- Passwords are hashed using BCrypt (never stored in plain text)
- JWT tokens expire after 24 hours
- XP per level: 1000 (configurable in GamificationService)
- Level progression is automatic when you reach XP threshold

---

