# CDAC Connect - Frontend & Backend API Mapping

## 1. How Controllers Work in Spring Boot
- Controllers (e.g., `MeetingController`, `MentorController`, `StudentController`) are Java classes in the `controller` package.
- They define API endpoints using annotations like `@GetMapping`, `@PostMapping`, `@PutMapping`, etc.
- Each endpoint corresponds to a URL (e.g., `/api/meetings`, `/api/mentors/login`).
- When the frontend makes an HTTP request to one of these URLs, the controller method is executed.

## 2. How the Frontend Uses These Endpoints
- The React frontend uses **Axios** (and sometimes `fetch`) to call these endpoints.
- The URLs and HTTP methods in the frontend match the backend controller mappings.

## 3. Example Mapping Table

| Frontend File                | API Endpoint Called                        | HTTP Method | Backend Controller File      | Backend Controller Method                        |
|------------------------------|--------------------------------------------|-------------|-----------------------------|--------------------------------------------------|
| LoginForm.jsx                | `/api/mentors/login`                       | POST        | MentorController.java        | `@PostMapping("/api/mentors/login")`            |
| StudentRegistrationForm.jsx  | `/api/students`                            | POST        | StudentController.java       | `@PostMapping("/api/students")`                 |
| MentorHomePage.jsx           | `/api/meetings/mentor/{id}/requests`       | GET         | MeetingController.java       | `@GetMapping("/api/meetings/mentor/{mentorId}/requests")` |
| MentorHomePage.jsx           | `/api/meetings/{id}`                       | PUT         | MeetingController.java       | `@PutMapping("/api/meetings/{id}")`             |
| StudentHomePage.jsx          | `/api/mentors`                             | GET         | MentorController.java        | `@GetMapping("/api/mentors")`                   |

## 4. How Data Flows
1. **User Action:** User clicks a button or submits a form in the frontend.
2. **Frontend Request:** React component sends an HTTP request to the backend API endpoint.
3. **Backend Controller:** The controller method receives the request, processes it, and returns a response.
4. **Frontend Response:** The React component receives the response and updates the UI.

## 5. How to Find Which Endpoints Are Used
- Search your frontend code for `axios.get`, `axios.post`, `axios.put`, etc.
- The first argument is the API endpoint URL.
- Match this URL to the corresponding controller method in the backend.

## 6. Example: Approving/Rejecting a Meeting
- **Backend Controller:**
  ```java
  // MeetingController.java
  @PutMapping("/api/meetings/{id}")
  public ResponseEntity<String> updateMeetingStatus(@PathVariable Long id, @RequestBody MeetingStatusUpdate request) { ... }
  ```
- **Frontend Usage:**
  ```js
  await axios.put(`/api/meetings/${meetingId}`, {
    status: action === 'accept' ? 'APPROVED' : 'REJECTED',
    mentorId: Number(user.id)
  }, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  ```

## 7. Summary
- **Controllers** define the backend API endpoints.
- **Frontend** calls these endpoints using Axios/fetch.
- The **URL and HTTP method** in the frontend must match the controller's mapping.
- The **data sent/received** is usually JSON. 