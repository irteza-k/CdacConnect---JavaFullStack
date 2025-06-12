# Login Functionality Test Guide

## 🧪 Testing the Complete Login System

### Prerequisites
- Backend running on `http://localhost:8080`
- Frontend running on `http://localhost:3000`

### Test Case 1: Student Registration and Login

1. **Register a Student:**
   ```
   - Go to: http://localhost:3000
   - Click: "Student Registration"
   - Fill form:
     * Name: "John Doe"
     * Email: "john@example.com"
     * Password: "password123"
     * Phone: "1234567890"
   - Click: "Register Student"
   - Verify: Success message appears
   ```

2. **Login as Student:**
   ```
   - Go to: Login page
   - Select: "Student" from dropdown
   - Enter: 
     * Email: "john@example.com"
     * Password: "password123"
   - Click: "Login"
   - Verify: 
     * Success message appears
     * Redirects to Student Home Page
     * Navbar shows "Welcome, John Doe (student)"
     * Profile link is available
   ```

### Test Case 2: Mentor Registration and Login

1. **Register a Mentor:**
   ```
   - Go to: http://localhost:3000
   - Click: "Mentor Registration"
   - Fill form:
     * Name: "Jane Smith"
     * Email: "jane@example.com"
     * Password: "password123"
     * Phone: "9876543210"
   - Click: "Register Mentor"
   - Verify: Success message appears
   ```

2. **Login as Mentor:**
   ```
   - Go to: Login page
   - Select: "Mentor" from dropdown
   - Enter:
     * Email: "jane@example.com"
     * Password: "password123"
   - Click: "Login"
   - Verify:
     * Success message appears
     * Redirects to Mentor Dashboard
     * Navbar shows "Welcome, Jane Smith (mentor)"
     * Profile link is available
   ```

### Test Case 3: Profile Management

1. **Access Profile Page:**
   ```
   - After login, click: "Profile" in navbar
   - Verify: All user information is displayed
   ```

2. **Edit Profile Information:**
   ```
   - Click: "Edit" next to "Phone Number"
   - Enter: "5551234567"
   - Click: "Save"
   - Verify: Success message and updated phone number
   ```

3. **Edit Email:**
   ```
   - Click: "Edit" next to "Email Address"
   - Enter: "newemail@example.com"
   - Click: "Save"
   - Verify: Success message and updated email
   ```

### Test Case 4: Error Handling

1. **Invalid Login:**
   ```
   - Go to: Login page
   - Enter: Wrong email/password
   - Click: "Login"
   - Verify: Error message appears
   ```

2. **Form Validation:**
   ```
   - Try to submit empty form
   - Verify: Validation errors appear
   - Try invalid email format
   - Verify: Email validation error
   ```

### Test Case 5: Logout Functionality

1. **Logout:**
   ```
   - After login, click: "Logout" button
   - Verify: 
     * Returns to login page
     * User data cleared from localStorage
     * Cannot access protected pages
   ```

### Test Case 6: Student Home Page (After Login)

1. **View Mentors:**
   ```
   - Login as student
   - Verify: Student Home Page loads
   - Check: All mentors are displayed
   ```

2. **Search Functionality:**
   ```
   - Enter skill in search box: "Java"
   - Verify: Only mentors with Java skill appear
   - Clear search
   - Verify: All mentors appear again
   ```

3. **Connect with Mentor:**
   ```
   - Click: "Connect with Mentor" on any mentor card
   - Verify: Modal opens with mentor details
   - Click: "Connect with Mentor" in modal
   - Verify: Success message appears
   ```

## 🔍 API Testing

### Test Backend APIs Directly:

1. **Student Login API:**
   ```bash
   curl -X POST http://localhost:8080/api/students/login \
   -H "Content-Type: application/json" \
   -d '{"email":"john@example.com","password":"password123"}'
   ```

2. **Mentor Login API:**
   ```bash
   curl -X POST http://localhost:8080/api/mentors/login \
   -H "Content-Type: application/json" \
   -d '{"email":"jane@example.com","password":"password123"}'
   ```

3. **Get Student Profile:**
   ```bash
   curl http://localhost:8080/api/students/1
   ```

4. **Get Mentor Profile:**
   ```bash
   curl http://localhost:8080/api/mentors/1
   ```

## ✅ Expected Results

### Successful Login Flow:
- ✅ Form validation works
- ✅ API calls succeed
- ✅ User data stored in localStorage
- ✅ Automatic redirection to appropriate page
- ✅ Navbar shows user information
- ✅ Profile page accessible
- ✅ Logout functionality works

### Error Handling:
- ✅ Invalid credentials show error message
- ✅ Form validation prevents submission
- ✅ Network errors handled gracefully
- ✅ Loading states work correctly

### Profile Management:
- ✅ Individual field editing works
- ✅ API calls for updates succeed
- ✅ Success/error messages appear
- ✅ Form validation on edits
- ✅ Cancel functionality works

## 🐛 Common Issues and Solutions

1. **"Maven not found" error:**
   - Install Maven or use IDE to run Spring Boot

2. **"npm start" fails:**
   - Make sure you're in `frontend` directory
   - Run `npm install` first

3. **Login doesn't work:**
   - Check if backend is running on port 8080
   - Verify user exists in database
   - Check browser console for errors

4. **CORS errors:**
   - Backend should handle CORS properly
   - Check if proxy is configured in package.json

## 🎉 Success Criteria

The login functionality is **COMPLETE** when:
- ✅ Users can register as students or mentors
- ✅ Users can login with correct credentials
- ✅ Users are redirected to appropriate pages
- ✅ Profile information can be viewed and edited
- ✅ Logout functionality works
- ✅ Error handling is comprehensive
- ✅ Form validation works properly

**All these features are now implemented and ready for testing!** 🚀 