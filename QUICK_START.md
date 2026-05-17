# Quick Start Guide - Campus Quest Backend

Follow these steps **in exact order**. If you see an error, screenshot and show me!

---

## Step 1: Verify MongoDB is Running

**Windows:**
1. Press `Win + R`
2. Type `services.msc` and press Enter
3. Look for **MongoDB Server** in the list
4. It should show **Running** status
5. If not, right-click it and select **Start**

**Verify Connection:**
1. Open **MongoDB Compass** (installed earlier)
2. Click **Connect**
3. You should see "✓ Connected"

---

## Step 2: Prepare the Folder

1. Extract the `campus-quest-backend.zip` file somewhere (e.g., `C:\Users\YourName\Desktop\campus-quest-backend`)

2. Open that folder in VS Code:
   - Open VS Code
   - File → Open Folder
   - Select `campus-quest-backend` folder

3. Open Terminal in VS Code:
   - Press `Ctrl + backtick` (the key before 1 on your keyboard)
   - You should see a terminal at the bottom

---

## Step 3: Install Dependencies

In the VS Code terminal, type this command and press Enter:

```bash
mvn clean install
```

**What this does:**
- Downloads all Java libraries needed (might take 3-5 minutes)
- Compiles all the code
- You'll see lots of green `[INFO]` messages

**When it's done, you should see:**
```
BUILD SUCCESS
```

If you see `BUILD FAILURE`, take a screenshot and show me the error.

---

## Step 4: Start the Backend Server

Still in the terminal, type:

```bash
mvn spring-boot:run
```

**Wait for this message:**
```
Started CampusQuestApplication in X.XXX seconds
```

When you see it, **your backend is running!** ✅

**Keep this terminal open** — your backend runs here.

---

## Step 5: Test the API

Open a **new terminal tab** in VS Code (click the `+` icon):

```bash
# Test if the server is running
curl http://localhost:8080/api/courses
```

You should see:
```
[]
```

This means your API is working!

---

## Step 6: Register a Test User

Still in the new terminal tab, run this:

```bash
curl -X POST http://localhost:8080/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"arjun@test.com\",\"password\":\"test123\",\"fullName\":\"Arjun Kumar\"}"
```

You should get back something like:
```json
{
  "token": "eyJhbGciOi...",
  "email": "arjun@test.com",
  "fullName": "Arjun Kumar",
  "level": 1,
  "totalXP": 0
}
```

**Copy that `token` value** — you'll need it!

---

## Step 7: Test Login

Replace the `<token>` in the command below with the token from Step 6:

```bash
curl -X GET http://localhost:8080/api/users/profile ^
  -H "Authorization: Bearer <token>"
```

You should get back your user profile!

---

## ✅ You Did It!

Your backend is now running locally. Next steps:

1. Keep the `mvn spring-boot:run` terminal open
2. Build the React frontend
3. Connect frontend to this backend

---

## Common Issues & Fixes

### Issue: "Cannot connect to MongoDB"
**Fix:** Open MongoDB Compass and make sure it says "✓ Connected"

### Issue: "port 8080 already in use"
**Fix:** Either:
- Close other apps using port 8080, OR
- Change port in `src/main/resources/application.yml` line 10 from 8080 to 8081

### Issue: "BUILD FAILURE"
**Fix:** Run this command:
```bash
mvn clean install -U
```

The `-U` forces Maven to download fresh copies.

### Issue: Lots of red text in terminal
**Fix:** It's probably just warnings. Scroll to the end — if you see `BUILD SUCCESS`, you're good!

---

## Using Thunder Client (VS Code) to Test API

Instead of using `curl`, you can use the Thunder Client GUI extension:

1. In VS Code, press `Ctrl + Shift + X` (Extensions)
2. Search **Thunder Client**
3. Install it
4. Click the Thunder Client icon on the left sidebar
5. Create new request:
   - Method: POST
   - URL: `http://localhost:8080/api/auth/register`
   - Body → JSON:
   ```json
   {
     "email": "test@example.com",
     "password": "password123",
     "fullName": "Test User"
   }
   ```
6. Click **Send**

Much easier than `curl`!

---

**Done!** Your backend is ready. Message me if you hit any issues! 🚀
