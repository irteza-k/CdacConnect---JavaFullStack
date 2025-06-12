# Testing Guide for Enhanced "Connect with Mentor" Functionality

## Overview
This guide will help you test the enhanced Student Home Page functionality that allows students to select skills and ask questions when connecting with mentors.

## Prerequisites
1. Spring Boot backend running on port 8080
2. React frontend running on port 3000
3. MySQL database with proper schema

## Step 1: Database Setup

### 1.1 Run Database Script
Execute the `database-setup.sql` script in your MySQL database:
```sql
-- This will create the necessary tables and insert sample skills
source database-setup.sql;
```

### 1.2 Verify Database Structure
Check that the following tables exist:
- `meetings` - for storing meeting requests (simplified structure)
- `mentor_skill` - for mentor-skill relationships
- `skills` - for available skills
- `students` - existing student table
- `mentors` - existing mentor table

## Step 2: Backend Testing

### 2.1 Test Skills API
```bash
# Get all skills
curl -X GET http://localhost:8080/api/skills

# Expected response: Array of skill objects
```

### 2.2 Test Mentor Skills API
```bash
# Get skills for a specific mentor (replace {mentorId} with actual ID)
curl -X GET http://localhost:8080/api/mentors/{mentorId}/skills

# Expected response: Array of skills for that mentor
```

### 2.3 Test Meeting Request API
```bash
# Create a meeting request
curl -X POST http://localhost:8080/api/meetings \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "mentorId": 1,
    "skills": ["Java Programming", "Spring Boot"],
    "question": "I need help with Spring Boot configuration and dependency injection."
  }'

# Expected response: "Meeting request created successfully with ID: {id}"
```

### 2.4 Test Meeting Details API
```bash
# Get meeting with student and mentor details
curl -X GET http://localhost:8080/api/meetings/{meetingId}/details

# Get student meetings with mentor details
curl -X GET http://localhost:8080/api/meetings/student/{studentId}/details

# Get mentor meetings with student details
curl -X GET http://localhost:8080/api/meetings/mentor/{mentorId}/details
```

## Step 3: Frontend Testing

### 3.1 Register Test Users
1. **Register a Student:**
   - Go to `/student-registration`
   - Fill in student details
   - Note the student ID and email

2. **Register a Mentor:**
   - Go to `/mentor-registration`
   - Fill in mentor details
   - Note the mentor ID and email

### 3.2 Add Skills to Mentor
1. **Login as Mentor**
2. **Add Skills:**
   ```javascript
   // In browser console, run:
   fetch('/api/mentors/{mentorId}/skills', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify(['Java Programming', 'Spring Boot', 'React.js'])
   });
   ```

### 3.3 Test Enhanced Connect with Mentor
1. **Login as Student**
2. **Navigate to Student Home Page**
3. **Test the Enhanced Dialog:**
   - Click "Connect with Mentor" on any mentor card
   - Verify skills checklist loads
   - Select one or more skills
   - Enter a question
   - Submit the request
   - Verify success message

## Step 4: Feature Testing

### 4.1 Skills Checklist
- [ ] Skills load when dialog opens
- [ ] Multiple skills can be selected
- [ ] Selected skills show visual feedback
- [ ] At least one skill must be selected

### 4.2 Question Input
- [ ] Text area accepts input
- [ ] Question field is required
- [ ] Validation works properly

### 4.3 Form Submission
- [ ] Form validates all required fields
- [ ] Request is sent to correct endpoint
- [ ] Success message is displayed
- [ ] Modal closes after success
- [ ] Form resets for next use

### 4.4 Error Handling
- [ ] Network errors are handled
- [ ] Validation errors are displayed
- [ ] Loading states work properly

## Step 5: Database Verification

### 5.1 Check Meeting Requests
```sql
-- Check if meeting requests are saved
SELECT * FROM meetings WHERE status = 'PENDING';

-- Expected: Should see the meeting request with:
-- - student_id, mentor_id
-- - selected_skills (comma-separated)
-- - question
-- - status = 'PENDING'
-- - request_date (current timestamp)
```

### 5.2 Check Mentor Skills
```sql
-- Check mentor-skill relationships
SELECT m.mentor_name, s.skill_name 
FROM mentors m 
JOIN mentor_skill ms ON m.mentor_id = ms.mentor_id 
JOIN skills s ON ms.skill_id = s.skill_id;
```

### 5.3 Verify Simplified Structure
```sql
-- Verify meetings table has only essential fields
DESCRIBE meetings;

-- Expected columns:
-- meeting_id, student_id, mentor_id, selected_skills, question, status, request_date
```

## Step 6: API Endpoint Testing

### 6.1 Get Mentor Skills
```bash
# Test with actual mentor ID
curl -X GET http://localhost:8080/api/mentors/1/skills
```

### 6.2 Create Meeting Request
```bash
# Test with actual student and mentor IDs
curl -X POST http://localhost:8080/api/meetings \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "mentorId": 1,
    "skills": ["Java Programming"],
    "question": "Help with Spring Boot configuration"
  }'
```

### 6.3 Get Meeting Details
```bash
# Get all meetings
curl -X GET http://localhost:8080/api/meetings

# Get meetings for specific mentor
curl -X GET http://localhost:8080/api/meetings/mentor/1

# Get meetings for specific student
curl -X GET http://localhost:8080/api/meetings/student/1

# Get meeting with full details
curl -X GET http://localhost:8080/api/meetings/1/details
```

## Step 7: Troubleshooting

### 7.1 Common Issues

**Skills not loading:**
- Check if mentor has skills assigned
- Verify `/api/mentors/{id}/skills` endpoint works
- Check browser console for errors

**Meeting request fails:**
- Verify student and mentor IDs exist
- Check database connection
- Look for validation errors

**Database issues:**
- Ensure tables are created properly
- Check foreign key constraints
- Verify data types match entity

### 7.2 Debug Steps
1. Check browser console for JavaScript errors
2. Check Spring Boot logs for backend errors
3. Verify API endpoints are accessible
4. Test with Postman or curl
5. Check database directly

## Step 8: Performance Testing

### 8.1 Load Testing
- Test with multiple concurrent users
- Verify skills load quickly
- Check form submission performance

### 8.2 Mobile Testing
- Test on different screen sizes
- Verify responsive design works
- Check touch interactions

## Success Criteria
- [ ] Students can select skills from checklist
- [ ] Students can enter questions
- [ ] Meeting requests are saved to database (simplified structure)
- [ ] Student and mentor details are fetched from existing services
- [ ] All validation works properly
- [ ] Error handling is robust
- [ ] UI is responsive and user-friendly

## Key Improvements
- **Simplified Meeting Entity**: Only essential fields, no duplicate data
- **Service Integration**: Uses existing Student and Mentor services
- **Efficient Data Access**: Fetches details when needed, not stored redundantly
- **Clean Architecture**: Follows proper separation of concerns

## Next Steps
After successful testing:
1. Deploy to production
2. Monitor for issues
3. Gather user feedback
4. Plan future enhancements 