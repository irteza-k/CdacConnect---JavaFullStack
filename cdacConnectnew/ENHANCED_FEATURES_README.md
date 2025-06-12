# Enhanced Student Home Page Features

## Overview
The Student Home Page has been enhanced with advanced meeting request functionality that allows students to:
- View mentor skills as a checklist
- Select specific skills for discussion
- Ask detailed questions about selected skills
- Send meeting requests that are saved to the database

## New Features

### 1. Skills Checklist
- **Dynamic Loading**: Mentor skills are fetched from the `mentor_skill` table when a mentor is selected
- **Interactive Selection**: Students can select multiple skills using checkboxes
- **Visual Feedback**: Selected skills are displayed with a green checkmark
- **Validation**: At least one skill must be selected before submitting

### 2. Question Input Form
- **Text Area**: Large text area for detailed questions
- **Placeholder Text**: Helpful guidance on what to include
- **Character Limit**: No strict limit, but encourages detailed questions
- **Validation**: Question field is required

### 3. Enhanced Meeting Request System
- **New Endpoint**: `/api/meetings/request` for creating meeting requests
- **Database Storage**: Requests are saved in the `meetings` table with status "PENDING"
- **Comprehensive Data**: Includes student ID, mentor ID, selected skills, and question
- **Timestamp**: Automatic recording of request date and time

## Backend Changes

### 1. Meeting Entity Updates
Added new fields to the `Meeting` entity:
```java
@Column(name = "selected_skills", columnDefinition = "TEXT")
private String selectedSkills; // Comma-separated list

@Column(name = "question", columnDefinition = "TEXT")
private String question; // Student's question
```

### 2. New API Endpoints

#### Create Meeting Request
- **Endpoint**: `POST /api/meetings/request`
- **Request Body**:
```json
{
  "studentId": 1,
  "mentorId": 2,
  "skills": ["Java Programming", "Spring Boot"],
  "question": "I need help with Spring Boot configuration and dependency injection."
}
```
- **Response**: Success/error message

#### Get Mentor Skills
- **Endpoint**: `GET /api/mentors/{mentorId}/skills`
- **Response**: Array of skill objects
```json
[
  {
    "skillId": 1,
    "skillName": "Java Programming"
  },
  {
    "skillId": 2,
    "skillName": "Spring Boot"
  }
]
```

### 3. Database Schema
The `meetings` table now includes:
- `selected_skills`: TEXT field for comma-separated skill list
- `question`: TEXT field for student's question
- `status`: Default "PENDING" for new requests
- `request_date`: Automatic timestamp

## Frontend Changes

### 1. Enhanced Modal Dialog
- **Skills Section**: Dynamic checklist loaded from API
- **Question Section**: Large text area with validation
- **Summary Section**: Real-time preview of the request
- **Improved UI**: Better styling and user experience

### 2. State Management
New state variables:
```javascript
const [mentorSkills, setMentorSkills] = useState([]);
const [selectedSkills, setSelectedSkills] = useState([]);
const [question, setQuestion] = useState('');
const [isLoadingSkills, setIsLoadingSkills] = useState(false);
```

### 3. Form Validation
- Skills selection validation
- Question field validation
- Real-time feedback
- Error handling and display

## Usage Instructions

### For Students:
1. **Browse Mentors**: Use the search functionality to find mentors by skill
2. **Select Mentor**: Click "Connect with Mentor" on any mentor card
3. **Choose Skills**: Select one or more skills from the checklist
4. **Ask Question**: Enter a detailed question about the selected skills
5. **Submit Request**: Click "Send Meeting Request" to submit
6. **Confirmation**: Wait for success message and modal will close automatically

### For Mentors:
1. **View Requests**: Check the Schedule page for pending meeting requests
2. **Review Details**: See student information, selected skills, and questions
3. **Respond**: Approve, reject, or provide feedback on requests

## Testing

### 1. Add Test Skills
Run the provided test script to add skills to the database:
```javascript
// Copy and paste the contents of test-skills.js into browser console
// Or run it as a separate script
```

### 2. Test Meeting Requests
1. Register as a student
2. Register as a mentor and add skills
3. Login as student and try the enhanced "Connect with Mentor" feature
4. Check the database to verify requests are saved

### 3. API Testing
Test the new endpoints:
```bash
# Get mentor skills
curl -X GET http://localhost:8080/api/mentors/1/skills

# Create meeting request
curl -X POST http://localhost:8080/api/meetings/request \
  -H "Content-Type: application/json" \
  -d '{
    "studentId": 1,
    "mentorId": 1,
    "skills": ["Java Programming"],
    "question": "Help with Spring Boot configuration"
  }'
```

## Error Handling

### Frontend:
- Network error handling
- Validation error display
- Loading states for better UX
- Graceful fallbacks

### Backend:
- Input validation
- Database error handling
- Proper HTTP status codes
- Descriptive error messages

## Future Enhancements

1. **Email Notifications**: Send emails to mentors when requests are received
2. **Request History**: Show students their previous requests
3. **Skill Categories**: Group skills by categories
4. **Meeting Scheduling**: Allow students to suggest specific times
5. **File Attachments**: Allow students to attach relevant files
6. **Rating System**: Allow students to rate mentor responses

## Technical Notes

- **Database**: Uses existing `mentor_skill` many-to-many relationship
- **Security**: All endpoints require proper authentication
- **Performance**: Skills are cached after first load
- **Responsive**: Works on all device sizes
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Troubleshooting

### Common Issues:
1. **Skills not loading**: Check if mentor has skills assigned
2. **Request not saving**: Verify database connection and schema
3. **Validation errors**: Ensure all required fields are filled
4. **CORS issues**: Check backend CORS configuration

### Debug Steps:
1. Check browser console for errors
2. Verify API endpoints are accessible
3. Check database for saved requests
4. Test with different browsers/devices 