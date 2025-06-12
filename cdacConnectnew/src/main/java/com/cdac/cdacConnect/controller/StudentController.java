package com.cdac.cdacConnect.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.cdacConnect.entity.Student;
import com.cdac.cdacConnect.service.StudentService;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentService studentService;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Create a new student
    @PostMapping
    public ResponseEntity<String> createStudent(@RequestBody Student student) {
        return studentService.saveStudent(student);
    }

    // Student login
    @PostMapping("/login")
    public ResponseEntity<?> loginStudent(@RequestBody LoginRequest loginRequest) {
        Optional<Student> student = studentService.getStudentByEmail(loginRequest.getEmail());
        
        if (student.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), student.get().getPassword())) {
            // Create a simple response with user info (in production, you'd use JWT tokens)
            LoginResponse response = new LoginResponse();
            response.setMessage("Login successful");
            response.setUserType("student");
            response.setEmail(student.get().getEmail());
            response.setName(student.get().getStudName());
            response.setId(student.get().getStudId());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }

    // Get all students
    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = studentService.getAllStudent();
        if (students.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(students);
    }

    // Get student by ID
    @GetMapping("/{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
        Optional<Student> student = studentService.getStudentById(id);
        return student.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get student by email
    @GetMapping("/email/{email}")
    public ResponseEntity<Student> getStudentByEmail(@PathVariable String email) {
        Optional<Student> student = studentService.getStudentByEmail(email);
        return student.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update student
    @PutMapping("/{id}")
    public ResponseEntity<String> updateStudent(@PathVariable Long id, @RequestBody Student updatedStudent) {
        return studentService.updateStudent(id, updatedStudent);
    }

    // Delete student
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
        return studentService.deleteStudent(id);
    }

    // Inner classes for login request/response
    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }

    public static class LoginResponse {
        private String message;
        private String userType;
        private String email;
        private String name;
        private Long id;

        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
        public String getUserType() { return userType; }
        public void setUserType(String userType) { this.userType = userType; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public Long getId() { return id; }
        public void setId(Long id) { this.id = id; }
    }
} 