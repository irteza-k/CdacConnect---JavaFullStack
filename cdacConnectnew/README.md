# CDAC Connect - Full Stack Application

A complete full-stack application for connecting students with mentors, built with Spring Boot backend and React frontend.

## 🏗️ Project Structure

```
cdacConnectnew/
├── backend/                    # Spring Boot application
│   ├── src/main/java/com/cdac/cdacConnect/
│   │   ├── controller/         # REST API controllers
│   │   ├── service/           # Business logic services
│   │   ├── repository/        # Data access layer
│   │   └── entity/           # JPA entities
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                   # React application
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── App.js
│   │   └── index.js
│   ├── public/
│   │   └── index.html
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Java 17+** and **Maven** (for backend)
- **Node.js 14+** and **npm** (for frontend)

### Backend Setup

1. **Navigate to project root:**
   ```bash
   cd cdacConnectnew
   ```

2. **Run Spring Boot application:**
   ```bash
   mvn spring-boot:run
   ```
   
   The backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start React development server:**
   ```bash
   npm start
   ```
   
   The frontend will start on `http://localhost:3000`

## 🔐 Login Functionality

### Features Implemented

✅ **Complete Login System**
- Student and Mentor login
- Form validation
- Error handling
- Success feedback
- Automatic redirection

✅ **Backend APIs**
- `POST /api/students/login` - Student login
- `POST /api/mentors/login` - Mentor login
- `GET /api/students/{id}` - Get student details
- `GET /api/mentors/{id}` - Get mentor details
- `PUT /api/students/{id}` - Update student
- `PUT /api/mentors/{id}` - Update mentor

✅ **Frontend Components**
- LoginForm - Complete login interface
- StudentHomePage - Student dashboard
- ProfilePage - User profile management
- Registration forms for new users

### How to Test Login

1. **Start both applications** (backend and frontend)

2. **Register a new user:**
   - Go to `http://localhost:3000`
   - Click "Student Registration" or "Mentor Registration"
   - Fill out the form and submit

3. **Test Login:**
   - Go to Login page
   - Select user type (Student/Mentor)
   - Enter email and password
   - Click "Login"

4. **Verify Success:**
   - Should see success message
   - Should redirect to appropriate home page
   - Should show user info in navbar
   - Should have access to Profile page

## 📱 Available Pages

### For Guests (Not Logged In)
- **Login Page** - User authentication
- **Student Registration** - New student signup
- **Mentor Registration** - New mentor signup

### For Students (After Login)
- **Student Home Page** - View all mentors, search by skills
- **Profile Page** - View and edit personal information
- **Logout** - Sign out functionality

### For Mentors (After Login)
- **Mentor Dashboard** - Basic dashboard (placeholder)
- **Profile Page** - View and edit personal information
- **Logout** - Sign out functionality

## 🔧 API Endpoints

### Authentication
- `POST /api/students/login` - Student login
- `POST /api/mentors/login` - Mentor login

### Students
- `POST /api/students` - Create student
- `GET /api/students` - Get all students
- `GET /api/students/{id}` - Get student by ID
- `PUT /api/students/{id}` - Update student
- `DELETE /api/students/{id}` - Delete student

### Mentors
- `POST /api/mentors` - Create mentor
- `GET /api/mentors` - Get all mentors
- `GET /api/mentors/{id}` - Get mentor by ID
- `PUT /api/mentors/{id}` - Update mentor
- `DELETE /api/mentors/{id}` - Delete mentor
- `POST /api/mentors/{id}/skills` - Add skills to mentor

### Student-Mentor Connections
- `POST /api/student-mentor-connections` - Create connection
- `GET /api/student-mentor-connections` - Get all connections
- `GET /api/student-mentor-connections/student/{studentId}` - Get student connections
- `GET /api/student-mentor-connections/mentor/{mentorId}` - Get mentor connections

## 🎯 Key Features

### Frontend
- **React 18** with functional components
- **Bootstrap 5** for responsive design
- **Axios** for API communication
- **Form validation** with real-time feedback
- **Loading states** and error handling
- **Local storage** for user session management

### Backend
- **Spring Boot 3** with Spring Data JPA
- **RESTful APIs** with proper HTTP methods
- **Entity relationships** between Students, Mentors, and Skills
- **Service layer** for business logic
- **Repository pattern** for data access

## 🐛 Troubleshooting

### Common Issues

1. **Maven not found:**
   - Install Maven and add to PATH
   - Or use IDE to run Spring Boot application

2. **npm start fails:**
   - Make sure you're in the `frontend` directory
   - Run `npm install` first

3. **Backend connection fails:**
   - Check if Spring Boot is running on port 8080
   - Check application.properties for database configuration

4. **Login doesn't work:**
   - Verify user exists in database
   - Check browser console for API errors
   - Ensure backend is running

### Database Setup

The application uses H2 in-memory database by default. For production, update `application.properties` with your database configuration.

## 📝 Development Notes

- **Login Flow**: Complete with validation and error handling
- **Profile Management**: Individual field updates with API calls
- **Student-Mentor Connections**: Full CRUD operations
- **Responsive Design**: Works on all device sizes
- **Error Handling**: Comprehensive error messages and validation

## 🚀 Next Steps

1. **Add JWT Authentication** for production security
2. **Implement Mentor Dashboard** with connection management
3. **Add Email Notifications** for connection requests
4. **Implement Real-time Chat** between students and mentors
5. **Add File Upload** for profile pictures and documents

---

**Login functionality is now complete and ready for testing!** 🎉 