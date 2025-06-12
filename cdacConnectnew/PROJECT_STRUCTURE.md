# CDAC Connect - Project Structure and Flow

## 1. Frontend Structure (React Application)

### Entry Points
- `main.jsx`: Main entry point that renders the React application
- `App.jsx`: Root component managing routing and application state

### Authentication Flow
- `LoginForm.jsx`: 
  - Handles user authentication
  - Supports Student and Mentor login
  - Stores JWT token and user data
  - Redirects to appropriate home page

- `StudentRegistrationForm.jsx` & `MentorRegistrationForm.jsx`:
  - New user registration
  - User details collection
  - Account creation
  - Login redirection

### User Dashboards
- `StudentHomePage.jsx`:
  - Student interface
  - Mentor listing
  - Meeting booking
  - Meeting history

- `MentorHomePage.jsx`:
  - Mentor interface
  - Meeting request management
  - Availability management

### Profile Management
- `ProfilePage.jsx`:
  - Personal information updates
  - Skills management (mentors)
  - Calendly link management
  - Preferences management

### Meeting Management
- `MeetingSchedulePage.jsx`:
  - Meeting scheduling
  - Calendly integration
  - Calendar view

### Notifications
- `NotificationPage.jsx`:
  - Meeting updates
  - System notifications
  - Status changes

### Additional Pages
- `AboutPage.jsx`: Platform information
- `FAQPage.jsx`: Frequently asked questions
- `ContactPage.jsx`: Contact information
- `Dashboard.jsx`: Activity overview

## 2. Backend Structure (Java Spring Boot)

### Main Components
- `config/`: Configuration files
  - `SecurityConfig.java`: Authentication and authorization
  - CORS and CSRF configurations

- `controller/`: REST API endpoints
  - Student and Mentor controllers
  - Meeting management
  - Authentication endpoints

- `service/`: Business logic layer
  - Data processing
  - Business rules
  - Transaction management

- `repository/`: Data access layer
  - Database interactions
  - CRUD operations
  - Data queries

- `entity/`: Database models
  - Student and Mentor entities
  - Meeting entity
  - Other data models

## 3. Data Flow
1. User interacts with frontend components
2. Frontend makes API calls to backend
3. Backend controllers receive requests
4. Services process the requests
5. Repositories interact with database
6. Response flows back to frontend
7. UI updates based on response

## 4. Security Flow
1. User logs in through `LoginForm`
2. Backend validates credentials
3. JWT token generated and sent to frontend
4. Token stored in sessionStorage
5. Token included in all subsequent API requests
6. Backend validates token for each request

## 5. Meeting Flow
1. Student views available mentors
2. Student requests meeting
3. Mentor receives notification
4. Mentor accepts/rejects request
5. Student receives status update
6. Meeting scheduled if accepted

## 6. Technology Stack
- Frontend: React.js
- Backend: Java Spring Boot
- Database: MySQL/PostgreSQL
- Authentication: JWT-based
- Additional Features: Calendly integration 