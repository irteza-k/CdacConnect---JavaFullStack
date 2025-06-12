package com.cdac.cdacConnect.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.cdacConnect.entity.StudentMentorConnection;
import com.cdac.cdacConnect.service.StudentMentorConnectionService;

@RestController
@RequestMapping("/api/student-mentor-connections")
public class StudentMentorConnectionController {

    @Autowired
    private StudentMentorConnectionService connectionService;

    // Create a new connection
    @PostMapping
    public ResponseEntity<String> createConnection(@RequestBody ConnectionRequest request) {
        StudentMentorConnection connection = new StudentMentorConnection();
        connection.setStudentId(request.getStudentId());
        connection.setStudentEmail(request.getStudentEmail());
        connection.setMentorId(request.getMentorId());
        connection.setMentorEmail(request.getMentorEmail());
        connection.setMentorName(request.getMentorName());
        connection.setSelectedSkills(request.getSelectedSkills());
        
        return connectionService.createConnection(connection);
    }

    // Get all connections
    @GetMapping
    public ResponseEntity<List<StudentMentorConnection>> getAllConnections() {
        List<StudentMentorConnection> connections = connectionService.getAllConnections();
        if (connections.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(connections);
    }

    // Get connection by ID
    @GetMapping("/{id}")
    public ResponseEntity<StudentMentorConnection> getConnectionById(@PathVariable Long id) {
        Optional<StudentMentorConnection> connection = connectionService.getConnectionById(id);
        return connection.map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get connections by student ID
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<StudentMentorConnection>> getConnectionsByStudentId(@PathVariable Long studentId) {
        List<StudentMentorConnection> connections = connectionService.getConnectionsByStudentId(studentId);
        if (connections.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(connections);
    }

    // Get connections by mentor ID
    @GetMapping("/mentor/{mentorId}")
    public ResponseEntity<List<StudentMentorConnection>> getConnectionsByMentorId(@PathVariable Long mentorId) {
        List<StudentMentorConnection> connections = connectionService.getConnectionsByMentorId(mentorId);
        if (connections.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(connections);
    }

    // Get connections by student email
    @GetMapping("/student/email/{studentEmail}")
    public ResponseEntity<List<StudentMentorConnection>> getConnectionsByStudentEmail(@PathVariable String studentEmail) {
        List<StudentMentorConnection> connections = connectionService.getConnectionsByStudentEmail(studentEmail);
        if (connections.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(connections);
    }

    // Get connections by mentor email
    @GetMapping("/mentor/email/{mentorEmail}")
    public ResponseEntity<List<StudentMentorConnection>> getConnectionsByMentorEmail(@PathVariable String mentorEmail) {
        List<StudentMentorConnection> connections = connectionService.getConnectionsByMentorEmail(mentorEmail);
        if (connections.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(connections);
    }

    // Update connection status
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateConnectionStatus(@PathVariable Long id, @RequestBody StatusUpdateRequest request) {
        return connectionService.updateConnectionStatus(id, request.getStatus());
    }

    // Delete connection
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteConnection(@PathVariable Long id) {
        return connectionService.deleteConnection(id);
    }

    // Get connections by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<StudentMentorConnection>> getConnectionsByStatus(@PathVariable String status) {
        List<StudentMentorConnection> connections = connectionService.getConnectionsByStatus(status);
        if (connections.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(connections);
    }

    // Get pending connections for a mentor
    @GetMapping("/mentor/{mentorId}/pending")
    public ResponseEntity<List<StudentMentorConnection>> getPendingConnectionsForMentor(@PathVariable Long mentorId) {
        List<StudentMentorConnection> connections = connectionService.getPendingConnectionsForMentor(mentorId);
        if (connections.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(connections);
    }

    // Get approved connections for a student
    @GetMapping("/student/{studentId}/approved")
    public ResponseEntity<List<StudentMentorConnection>> getApprovedConnectionsForStudent(@PathVariable Long studentId) {
        List<StudentMentorConnection> connections = connectionService.getApprovedConnectionsForStudent(studentId);
        if (connections.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(connections);
    }

    // Inner classes for request/response
    public static class ConnectionRequest {
        private Long studentId;
        private String studentEmail;
        private Long mentorId;
        private String mentorEmail;
        private String mentorName;
        private String selectedSkills;

        // Getters and Setters
        public Long getStudentId() { return studentId; }
        public void setStudentId(Long studentId) { this.studentId = studentId; }
        
        public String getStudentEmail() { return studentEmail; }
        public void setStudentEmail(String studentEmail) { this.studentEmail = studentEmail; }
        
        public Long getMentorId() { return mentorId; }
        public void setMentorId(Long mentorId) { this.mentorId = mentorId; }
        
        public String getMentorEmail() { return mentorEmail; }
        public void setMentorEmail(String mentorEmail) { this.mentorEmail = mentorEmail; }
        
        public String getMentorName() { return mentorName; }
        public void setMentorName(String mentorName) { this.mentorName = mentorName; }
        
        public String getSelectedSkills() { return selectedSkills; }
        public void setSelectedSkills(String selectedSkills) { this.selectedSkills = selectedSkills; }
    }

    public static class StatusUpdateRequest {
        private String status;

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
    }
} 