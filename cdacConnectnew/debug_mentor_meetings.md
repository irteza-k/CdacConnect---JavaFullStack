# Debugging Mentor Homepage - No Meeting Data

## Issue
The MentorHomePage is not displaying any meeting data from the meetings table.

## Possible Causes & Solutions

### 1. Check if Backend Server is Running
```bash
# Check if Spring Boot server is running on port 8080
curl http://localhost:8080/api/meetings
```

**Expected**: Should return meeting data or empty array
**If fails**: Start your Spring Boot backend server

### 2. Check if Meeting Data Exists
```bash
# Check all meetings
curl http://localhost:8080/api/meetings

# Check meetings for specific mentor (replace 1 with actual mentor ID)
curl http://localhost:8080/api/meetings/mentor/1/requests
```

### 3. Check Browser Console
1. Open browser developer tools (F12)
2. Go to Console tab
3. Navigate to Mentor Homepage
4. Look for console logs showing:
   - Mentor ID being used
   - API URL being called
   - Response data or error

### 4. Verify User Data in SessionStorage
1. Open browser developer tools (F12)
2. Go to Application tab
3. Check Session Storage
4. Verify user object has correct `id` field

### 5. Test API Directly
```bash
# Test the exact endpoint the frontend is calling
curl http://localhost:8080/api/meetings/mentor/{MENTOR_ID}/requests
```

### 6. Check Database
```sql
-- Check if meetings table has data
SELECT * FROM meetings;

-- Check if there are meetings for your mentor
SELECT * FROM meetings WHERE mentor_id = {YOUR_MENTOR_ID};

-- Check if students and mentors exist
SELECT * FROM students;
SELECT * FROM mentors;
```

## Quick Fix Steps

1. **Start Backend Server** (if not running):
   ```bash
   cd "e:\CDAC FEB 25\WPJ\SkillSwap\cdacConnectnew"
   mvn spring-boot:run
   ```

2. **Create Test Meeting Data** (if no meetings exist):
   ```sql
   INSERT INTO meetings (student_id, mentor_id, selected_skills, question, status, request_date)
   VALUES (1, 1, 'Java,Spring Boot', 'How to implement REST APIs?', 'PENDING', NOW());
   ```

3. **Check Frontend Console** for detailed error messages

4. **Verify Mentor Login** - Make sure you're logged in as a mentor with correct ID

## Expected Console Output
When working correctly, you should see:
```
Fetching meeting requests for mentor ID: 1
API URL: /api/meetings/mentor/1/requests
API Response: {data: [...], status: 200}
Response data: [{meeting: {...}, student: {...}}]
```

## Common Issues
- **No meetings in database**: Create test meeting data
- **Wrong mentor ID**: Check sessionStorage user data
- **Backend not running**: Start Spring Boot application
- **CORS issues**: Check browser console for CORS errors
- **Network errors**: Check if API URL is correct 