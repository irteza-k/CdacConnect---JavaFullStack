package com.cdac.cdacConnect.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.cdacConnect.entity.StudentMentorConnection;

@Repository
public interface StudentMentorConnectionRepository extends JpaRepository<StudentMentorConnection, Long> {
    
    // Find connections by student ID
    List<StudentMentorConnection> findByStudentId(Long studentId);
    
    // Find connections by mentor ID
    List<StudentMentorConnection> findByMentorId(Long mentorId);
    
    // Find connections by student email
    List<StudentMentorConnection> findByStudentEmail(String studentEmail);
    
    // Find connections by mentor email
    List<StudentMentorConnection> findByMentorEmail(String mentorEmail);
    
    // Find connection by student ID and mentor ID
    Optional<StudentMentorConnection> findByStudentIdAndMentorId(Long studentId, Long mentorId);
    
    // Find connections by status
    List<StudentMentorConnection> findByStatus(String status);
    
    // Find connections by student ID and status
    List<StudentMentorConnection> findByStudentIdAndStatus(Long studentId, String status);
    
    // Find connections by mentor ID and status
    List<StudentMentorConnection> findByMentorIdAndStatus(Long mentorId, String status);
} 