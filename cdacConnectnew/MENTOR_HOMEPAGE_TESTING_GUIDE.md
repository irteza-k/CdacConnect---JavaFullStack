# Mentor Homepage Testing Guide

## Overview
This guide covers testing the mentor homepage functionality that allows mentors to view and manage meeting requests from students.

## Backend API Endpoints

### 1. Get Meeting Requests for Mentor
- **Endpoint**: `GET /api/meetings/mentor/{mentorId}/requests`
- **Description**: Fetches all meeting requests for a specific mentor with student details
- **Response**: Array of meeting objects with student information

### 2. Update Meeting Status
- **Endpoint**: `PUT /api/meetings/{meetingId}`
- **Description**: Updates the status of a meeting request (Accept/Reject)
- **Request Body**: `{ "status": "APPROVED" | "REJECTED" }`
- **Response**: Success/error message

## Frontend Components

### MentorHomePage Component
- **Location**: `frontend/src/components/MentorHomePage.jsx`
- **CSS**: `frontend/src/components/MentorHomePage.css`
- **Features**:
  - Display meeting requests in a table format
  - Show student name, email, skills, question, request date, and status
  - Accept/Reject buttons for pending requests
  - Real-time status updates
  - Responsive design

## Testing Steps

### 1. Database Setup
```sql
-- Run the test data script
source test_meeting_data.sql;

-- Verify data exists
SELECT * FROM meetings;
SELECT * FROM students;
SELECT * FROM mentors;
```

### 2. Backend Testing

#### Test Meeting Requests API
```bash
# Get meeting requests for mentor ID 1
curl -X GET http://localhost:8080/api/meetings/mentor/1/requests

# Expected response: Array of meeting objects with student details
```

#### Test Status Update API
```bash
# Accept a meeting request
curl -X PUT http://localhost:8080/api/meetings/1 \
  -H "Content-Type: application/json" \
  -d '{"status": "APPROVED"}'

# Reject a meeting request
curl -X PUT http://localhost:8080/api/meetings/2 \
  -H "Content-Type: application/json" \
  -d '{"status": "REJECTED"}'
```

### 3. Frontend Testing

#### Login as Mentor
1. Start the frontend application: `npm run dev`
2. Navigate to `http://localhost:3000`
3. Login with mentor credentials
4. Verify you're redirected to the mentor homepage

#### Test Meeting Requests Display
1. Check if meeting requests are displayed in a table
2. Verify all columns are present:
   - Student Name
   - Student Email
   - Skills (as badges)
   - Question
   - Request Date
   - Status
   - Actions

#### Test Accept/Reject Functionality
1. Find a meeting request with "PENDING" status
2. Click the green checkmark (✓) to accept
3. Verify:
   - Status changes to "APPROVED"
   - Success message appears
   - Accept/Reject buttons disappear
4. Click the red X (✗) to reject
5. Verify:
   - Status changes to "REJECTED"
   - Success message appears
   - Accept/Reject buttons disappear

#### Test Error Handling
1. Try to accept/reject a non-pending meeting
2. Verify no action buttons are available
3. Test with invalid meeting ID
4. Verify error messages are displayed

#### Test Responsive Design
1. Test on different screen sizes
2. Verify table is responsive on mobile devices
3. Check that buttons and text remain readable

### 4. Integration Testing

#### Complete Workflow
1. **Student creates meeting request**:
   - Login as student
   - Navigate to student homepage
   - Connect with a mentor
   - Submit meeting request

2. **Mentor receives and manages request**:
   - Login as mentor
   - Navigate to mentor homepage
   - See the new meeting request
   - Accept or reject the request

3. **Verify status updates**:
   - Check that status changes are reflected immediately
   - Verify no duplicate requests
   - Confirm proper error handling

## Expected Behavior

### Success Scenarios
- ✅ Meeting requests load correctly
- ✅ Accept/Reject buttons work for pending requests
- ✅ Status updates immediately in UI
- ✅ Success/error messages display appropriately
- ✅ Responsive design works on all devices

### Error Scenarios
- ✅ Network errors show retry option
- ✅ Invalid actions show appropriate messages
- ✅ Session expiry redirects to login
- ✅ Empty state shows helpful message

## Troubleshooting

### Common Issues

1. **No meeting requests displayed**
   - Check if mentor ID exists in database
   - Verify meetings table has data
   - Check browser console for errors

2. **Accept/Reject not working**
   - Verify meeting status is "PENDING"
   - Check network tab for API errors
   - Ensure proper authentication

3. **Status not updating**
   - Refresh the page
   - Check if API call succeeded
   - Verify database update

4. **Styling issues**
   - Clear browser cache
   - Check CSS file is loaded
   - Verify Bootstrap is included

### Debug Commands
```bash
# Check backend logs
tail -f logs/application.log

# Check database
mysql -u root -p cdacconnectnew -e "SELECT * FROM meetings WHERE mentor_id = 1;"

# Check frontend console
# Open browser developer tools and check Console tab
```

## Performance Considerations

- Meeting requests are loaded on component mount
- Status updates are optimistic (UI updates immediately)
- Error handling includes retry mechanisms
- Responsive design ensures good UX on all devices

## Security Notes

- All API calls require authentication
- Mentor can only see their own meeting requests
- Status updates are validated on backend
- Session management uses sessionStorage for security 