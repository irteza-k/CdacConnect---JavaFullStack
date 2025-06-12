package com.cdac.cdacConnect.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.cdacConnect.entity.Meeting;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    
    // Find meetings by student ID
    List<Meeting> findByStudentId(Long studentId);
    
    // Find meetings by mentor ID
    List<Meeting> findByMentorId(Long mentorId);
    
    // Find meetings by student ID and status
    List<Meeting> findByStudentIdAndStatus(Long studentId, String status);
    
    // Find meetings by mentor ID and status
    List<Meeting> findByMentorIdAndStatus(Long mentorId, String status);
    
    // Find meetings by status
    List<Meeting> findByStatus(String status);
    
    // Find pending meetings for a mentor
    List<Meeting> findByMentorIdAndStatusOrderByRequestDateAsc(Long mentorId, String status);
    
    // Find upcoming meetings for a student
    List<Meeting> findByStudentIdAndStatusInOrderByRequestDateAsc(Long studentId, List<String> statuses);
} 