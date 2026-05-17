# Complete Spring Boot Backend Setup Guide

This is a **comprehensive guide** to get your Campus Quest backend running from scratch.

---

## 📋 What You'll Learn

By the end, you'll have:
- ✅ A running Spring Boot Java backend server
- ✅ JWT authentication (login/register)
- ✅ MongoDB database storing user data
- ✅ XP and leveling system working
- ✅ Leaderboard rankings
- ✅ Working REST API endpoints

---

## 🏗️ Architecture Explained (Simple)

Here's how your application works:

```
┌─────────────────────────────────────────────────────────────┐
│                     Your Computer                            │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────────┐          ┌──────────────────────┐    │
│  │  MongoDB         │ ←→ Java  │  Spring Boot Server  │    │
│  │  (Database)      │  Command │  (Your API)          │    │
│  │  Port 27017      │          │  Port 8080           │    │
│  └──────────────────┘          └──────────────────────┘    │
│       Users, Courses,           Handles: Login,            │
│       Progress, Badges          XP Awards, Leaderboard     │
│                                                               │
│  Later: ┌────────────────────────────────────┐              │
│         │ React Frontend (Port 3000)          │              │
│         │ Displays: Dashboard, Leaderboard    │ ←→ API       │
│         └────────────────────────────────────┘              │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚙️ File Structure Explanation

Your backend project looks like this:

```
campus-quest-backend/
│
├── pom.xml                                 ← Maven config (dependencies)
│
├── src/main/resources/
│   └── application.yml                     ← Server config (port 8080, MongoDB)
│
└── src/main/java/com/campusquest/
    │
    ├── CampusQuestApplication.java         ← Main entry point (run this!)
    │
    ├── config/
    │   ├── SecurityConfig.java             ← JWT authentication setup
    │   ├── DataSeeder.java                 ← Sample data generator
    │   └── CorsConfig.java                 ← Cross-origin settings
    │
    ├── entity/                              ← Database models
    │   ├── User.java                       (User accounts, XP, streak)
    │   ├── Course.java                     (Courses/lessons)
    │   ├── UserProgress.java               (User's course progress)
    │   └── Badge.java                      (Achievements)
    │
    ├── repository/                          ← Database queries
    │   ├── UserRepository.java
    │   ├── CourseRepository.java
    │   ├── UserProgressRepository.java
    │   └── BadgeRepository.java
    │
    ├── service/                             ← Business logic
    │   ├── AuthService.java                (Login/register logic)
    │   ├── GamificationService.java        (XP, streaks, badges)
    │   ├── LeaderboardService.java         (Rankings)
    │   └── UserService.java                (User profiles, courses)
    │
    ├── controller/                          ← REST API endpoints
    │   ├── AuthController.java             (/api/auth/login, /register)
    │   ├── UserController.java             (/api/users/profile)
    │   ├── CourseController.java           (/api/courses)
    │   └── LeaderboardController.java      (/api/leaderboard)
    │
    ├── dto/                                 ← Data transfer objects (API request/response formats)
    │   ├── LoginRequest.java
    │   ├── AuthResponse.java
    │   └── LeaderboardEntry.java
    │
    └── security/
        ├── JwtUtil.java                    (Generate JWT tokens)
        └── JwtAuthenticationFilter.java    (Check tokens on requests)
```

---

## 🚀 Step-by-Step Setup

### Prerequisites Check

Verify you have these installed:

```bash
# Open Command Prompt and type these:

java --version
# Should show: openjdk 17.x.x

mvn --version
# Should show: Apache Maven 3.8.x

mongod --version
# Should show: db version v7.x.x

git --version
# Should show: git version 2.x.x
```

If any are missing, scroll back to the initial setup instructions.

---

### Step 1: Get the Code

**Option A: Download the ZIP**
1. I've provided you with a complete `campus-quest-backend` folder
2. Extract it to a convenient location, like:
   - Windows: `C:\Users\YourName\Desktop\campus-quest-backend`

**Option B: Copy Files Manually**
1. Create a new folder `campus-quest-backend`
2. Copy all the files I've provided into it

---

### Step 2: Open in VS Code

1. Open VS Code
2. **File** → **Open Folder**
3. Select the `campus-quest-backend` folder
4. Click **Select Folder**

You should see the folder structure on the left sidebar.

---

### Step 3: Start MongoDB

**Windows:**
1. Press `Win + R`
2. Type `services.msc`
3. Find **MongoDB Server** in the list
4. Right-click → **Start** (if not already running)
5. Verify in MongoDB Compass - should show "✓ Connected"

---

### Step 4: Open Terminal in VS Code

1. Press **Ctrl + `** (backtick key, above Tab)
2. A terminal appears at the bottom
3. Type:

```bash
cd campus-quest-backend
```

(If it says "not found", you're probably not in the right folder)

---

### Step 5: Download Dependencies

Type this in the terminal:

```bash
mvn clean install
```

**What happens:**
- Maven downloads ~200 Java libraries (~150 MB)
- Compiles all code to check for errors
- Takes 3-5 minutes first time
- You'll see lots of `[INFO]` messages

**When done, you should see:**
```
[INFO] BUILD SUCCESS
```

If you see `BUILD FAILURE`, take a screenshot and we'll debug!

---

### Step 6: Start the Server

Type:

```bash
mvn spring-boot:run
```

**Wait for this message:**
```
Started CampusQuestApplication in X.XXX seconds
```

🎉 **Your backend is now running on http://localhost:8080**

**Keep this terminal open!** Your server runs here.

---

### Step 7: Test It Works

Open a **new terminal tab** (click the `+` in the terminal):

```bash
curl http://localhost:8080/api/courses
```

You should see:
```
[]
```

This means your API is responding! ✅

---

## 📝 Testing the API

### Method 1: Using Thunder Client (Easiest)

1. VS Code → Extensions (`Ctrl + Shift + X`)
2. Search **Thunder Client** → Install
3. Click Thunder Client icon (left sidebar)
4. New Request:
   - **POST** `http://localhost:8080/api/auth/register`
   - Body → JSON:
   ```json
   {
     "email": "testuser@example.com",
     "password": "password123",
     "fullName": "Test User"
   }
   ```
5. Click **Send**

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "email": "testuser@example.com",
  "fullName": "Test User",
  "level": 1,
  "totalXP": 0
}
```

---

### Method 2: Using Postman

1. Download Postman from **https://www.postman.com/downloads/**
2. Same steps as Thunder Client
3. More powerful, but heavier

---

### Method 3: Using curl (Command Line)

**Register:**
```bash
curl -X POST http://localhost:8080/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"pass123\",\"fullName\":\"Test User\"}"
```

**Login:**
```bash
curl -X POST http://localhost:8080/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@example.com\",\"password\":\"pass123\"}"
```

**Get Profile (replace TOKEN with your token from login):**
```bash
curl -X GET http://localhost:8080/api/users/profile ^
  -H "Authorization: Bearer TOKEN"
```

---

## 🔐 Understanding JWT Tokens

**What's a JWT token?**
- A secure string that proves you're logged in
- Looks like: `eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjI3NTQ3NDYyLCJleHAiOjE2Mjc2MzM4NjJ9.xxx`
- Contains your email and expires in 24 hours

**How it works:**
1. User logs in → Server sends back a token
2. User saves token in browser (frontend will do this)
3. User makes requests → includes token in header: `Authorization: Bearer <token>`
4. Server checks token is valid → allows request
5. Token expires after 24 hours → user logs in again

---

## 🎮 Test API Endpoints

### 1. **Register** (Create Account)
```
POST /api/auth/register
Body: { email, password, fullName }
No token needed
```

### 2. **Login** (Get Token)
```
POST /api/auth/login
Body: { email, password }
No token needed
Response: JWT token + user info
```

### 3. **Get Profile**
```
GET /api/users/profile
Header: Authorization: Bearer <token>
```

### 4. **Get All Courses**
```
GET /api/courses
No token needed (public)
```

### 5. **Enroll in Course**
```
POST /api/courses/{courseId}/enroll
Header: Authorization: Bearer <token>
```

### 6. **Get Leaderboard**
```
GET /api/leaderboard/weekly
No token needed (public)
```

### 7. **Get Your Rank**
```
GET /api/leaderboard/rank
Header: Authorization: Bearer <token>
```

---

## 💾 Database (MongoDB)

Your data is stored in MongoDB. View it with MongoDB Compass:

1. **Open MongoDB Compass** (installed earlier)
2. Click **Connect**
3. On left sidebar, look for:
   - `campus_quest` database
   - Collections: `users`, `courses`, `user_progress`, `badges`
4. Click any collection to see data

**Example User Document:**
```json
{
  "_id": ObjectId("..."),
  "email": "arjun@example.com",
  "password": "$2a$10$...", // hashed
  "fullName": "Arjun Kumar",
  "level": 3,
  "totalXP": 2500,
  "currentLevelXP": 500,
  "dailyStreak": 5,
  "badges": 2,
  "createdAt": ISODate("2024-01-15T10:30:00Z"),
  "updatedAt": ISODate("2024-01-20T14:15:00Z")
}
```

---

## 🛠️ Common Errors & Fixes

### ❌ "Connection refused" (MongoDB)
**Cause:** MongoDB isn't running
**Fix:**
1. Open Services (`Win + R` → `services.msc`)
2. Find MongoDB Server
3. Right-click → Start

### ❌ "port 8080 already in use"
**Cause:** Another app is using port 8080
**Fix:** Change port in `application.yml`:
```yaml
server:
  port: 8081  # Change from 8080
```

### ❌ "BUILD FAILURE" when running mvn install
**Cause:** Corrupted Maven cache
**Fix:**
```bash
mvn clean install -U
```
The `-U` forces fresh downloads

### ❌ "Unknown property 'jwt.secret'"
**Cause:** Missing application.yml
**Fix:** Make sure `src/main/resources/application.yml` exists

### ❌ Terminal shows lots of red text
**Cause:** Usually just warnings, not errors
**Fix:** Scroll down to see if it says "BUILD SUCCESS" or "Started CampusQuestApplication"

---

## 📊 Testing Checklist

Go through these to verify everything works:

- [ ] `mvn clean install` shows BUILD SUCCESS
- [ ] `mvn spring-boot:run` shows "Started CampusQuestApplication"
- [ ] `curl http://localhost:8080/api/courses` returns `[]`
- [ ] Can register a new user (POST /api/auth/register)
- [ ] Can login with registered user (POST /api/auth/login)
- [ ] Can get profile with token (GET /api/users/profile)
- [ ] Can see users in MongoDB Compass
- [ ] Can see leaderboard (GET /api/leaderboard/weekly)

---

## 🎓 What Each Layer Does

### **Entity Layer** (entities/)
- Defines what data looks like
- `User.java` = the structure of a user in MongoDB
- Like a blueprint for data

### **Repository Layer** (repository/)
- Talks to MongoDB
- `UserRepository` = "find user by email", "get top 10 users"
- Already handles all SQL/MongoDB logic for you

### **Service Layer** (service/)
- Business logic (brains of the app)
- `AuthService` = handles login/register logic
- `GamificationService` = awards XP, checks for level ups
- `LeaderboardService` = calculates rankings

### **Controller Layer** (controller/)
- REST API endpoints
- `@PostMapping("/api/auth/login")` = when user POSTs to /api/auth/login, run this method
- Takes request → calls service → returns response

### **DTO Layer** (dto/)
- `LoginRequest` = what client sends when logging in
- `AuthResponse` = what server sends back
- Not stored in DB, just for communication

---

## 🚀 Next Steps

1. **Test all endpoints** (use Thunder Client)
2. **Add test data** (DataSeeder.java runs automatically)
3. **Build React Frontend** (connects to this backend)
4. **Deploy** (to Railway, Render, or AWS)

---

## ✅ Success!

When you can:
1. Register a user
2. Login and get a token
3. See yourself on leaderboard
4. See other users' profiles

...then your backend is **production-ready!**

---

## 📞 Need Help?

- Check the error message in terminal
- Screenshot the error
- Search "Spring Boot [your error]"
- Ask in Stack Overflow

**Most issues are:**
- MongoDB not running
- Port already in use
- Dependency conflict (fixed with `mvn clean install -U`)

---

## 📚 Learning Resources

- **Spring Boot Guide:** https://spring.io/guides/gs/spring-boot/
- **MongoDB with Spring:** https://spring.io/guides/gs/accessing-data-mongodb/
- **JWT with Spring:** https://www.baeldung.com/spring-boot-jwt
- **REST API Best Practices:** https://restfulapi.net/

---

**Happy coding! 🎉**
