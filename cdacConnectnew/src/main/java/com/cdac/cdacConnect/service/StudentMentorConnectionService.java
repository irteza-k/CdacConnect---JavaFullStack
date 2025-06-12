package com.cdac.cdacConnect.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cdac.cdacConnect.entity.StudentMentorConnection;
import com.cdac.cdacConnect.repository.StudentMentorConnectionRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class StudentMentorConnectionService {

    @Autowired
    private StudentMentorConnectionRepository connectionRepository;
    
    private ObjectMapper objectMapper = new ObjectMapper();

    // Create a new connection
    public ResponseEntity<String> createConnection(StudentMentorConnection connection) {
        try {
            // Check if connection already exists
            Optional<StudentMentorConnection> existingConnection = 
                connectionRepository.findByStudentIdAndMentorId(connection.getStudentId(), connection.getMentorId());
            
            if (existingConnection.isPresent()) {
                return ResponseEntity.badRequest().body("Connection already exists between this student and mentor");
            }
            
            // Convert selected skills list to JSON string if it's not already
            if (connection.getSelectedSkills() != null && !connection.getSelectedSkills().startsWith("[")) {
                // If it's not JSON, assume it's a comma-separated string and convert to JSON
                String[] skills = connection.getSelectedSkills().split(",");
                connection.setSelectedSkills(objectMapper.writeValueAsString(skills));
            }
            
            StudentMentorConnection savedConnection = connectionRepository.save(connection);
            return ResponseEntity.ok("Connection created successfully with ID: " + savedConnection.getConnectionId());
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create connection: " + e.getMessage());
        }
    }

    // Get all connections
    public List<StudentMentorConnection> getAllConnections() {
        return connectionRepository.findAll();
    }

    // Get connection by ID
    public Optional<StudentMentorConnection> getConnectionById(Long id) {
        return connectionRepository.findById(id);
    }

    // Get connections by student ID
    public List<StudentMentorConnection> getConnectionsByStudentId(Long studentId) {
        return connectionRepository.findByStudentId(studentId);
    }

    // Get connections by mentor ID
    public List<StudentMentorConnection> getConnectionsByMentorId(Long mentorId) {
        return connectionRepository.findByMentorId(mentorId);
    }

    // Get connections by student email
    public List<StudentMentorConnection> getConnectionsByStudentEmail(String studentEmail) {
        return connectionRepository.findByStudentEmail(studentEmail);
    }

    // Get connections by mentor email
    public List<StudentMentorConnection> getConnectionsByMentorEmail(String mentorEmail) {
        return connectionRepository.findByMentorEmail(mentorEmail);
    }

    // Update connection status
    public ResponseEntity<String> updateConnectionStatus(Long connectionId, String status) {
        Optional<StudentMentorConnection> connection = connectionRepository.findById(connectionId);
        
        if (connection.isPresent()) {
            StudentMentorConnection existingConnection = connection.get();
            existingConnection.setStatus(status);
            connectionRepository.save(existingConnection);
            return ResponseEntity.ok("Connection status updated successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Delete connection
    public ResponseEntity<String> deleteConnection(Long connectionId) {
        Optional<StudentMentorConnection> connection = connectionRepository.findById(connectionId);
        
        if (connection.isPresent()) {
            connectionRepository.delete(connection.get());
            return ResponseEntity.ok("Connection deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get connections by status
    public List<StudentMentorConnection> getConnectionsByStatus(String status) {
        return connectionRepository.findByStatus(status);
    }

    // Get pending connections for a mentor
    public List<StudentMentorConnection> getPendingConnectionsForMentor(Long mentorId) {
        return connectionRepository.findByMentorIdAndStatus(mentorId, "PENDING");
    }

    // Get approved connections for a student
    public List<StudentMentorConnection> getApprovedConnectionsForStudent(Long studentId) {
        return connectionRepository.findByStudentIdAndStatus(studentId, "APPROVED");
    }
} 