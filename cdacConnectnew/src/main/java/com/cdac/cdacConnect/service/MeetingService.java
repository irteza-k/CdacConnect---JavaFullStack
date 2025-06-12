package com.cdac.cdacConnect.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cdac.cdacConnect.entity.Meeting;
import com.cdac.cdacConnect.entity.Mentor;
import com.cdac.cdacConnect.entity.Student;
import com.cdac.cdacConnect.repository.MeetingRepository;
import com.cdac.cdacConnect.repository.MentorRepository;
import com.cdac.cdacConnect.repository.StudentRepository;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;
    
    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private MentorRepository mentorRepository;

    // Create a new meeting request
    public ResponseEntity<String> createMeeting(Meeting meeting) {
        try {
            // Validate student exists
            Optional<Student> student = studentRepository.findById(meeting.getStudentId());
            if (!student.isPresent()) {
                return ResponseEntity.badRequest().body("Student not found");
            }
            
            // Validate mentor exists
            Optional<Mentor> mentor = mentorRepository.findById(meeting.getMentorId());
            if (!mentor.isPresent()) {
                return ResponseEntity.badRequest().body("Mentor not found");
            }
            
            // Set status and request date if not already set
            if (meeting.getStatus() == null) {
                meeting.setStatus("PENDING");
            }
            if (meeting.getRequestDate() == null) {
                meeting.setRequestDate(LocalDateTime.now());
            }
            
            Meeting savedMeeting = meetingRepository.save(meeting);
            return ResponseEntity.ok("Meeting request created successfully with ID: " + savedMeeting.getMeetingId());
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to create meeting: " + e.getMessage());
        }
    }

    // Get all meetings
    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    // Get meeting by ID
    public Optional<Meeting> getMeetingById(Long id) {
        return meetingRepository.findById(id);
    }

    // Get meetings by student ID
    public List<Meeting> getMeetingsByStudentId(Long studentId) {
        return meetingRepository.findByStudentId(studentId);
    }

    // Get meetings by mentor ID
    public List<Meeting> getMeetingsByMentorId(Long mentorId) {
        return meetingRepository.findByMentorId(mentorId);
    }

    // Get pending meetings for a mentor
    public List<Meeting> getPendingMeetingsForMentor(Long mentorId) {
        return meetingRepository.findByMentorIdAndStatusOrderByRequestDateAsc(mentorId, "PENDING");
    }

    // Get upcoming meetings for a student
    public List<Meeting> getUpcomingMeetingsForStudent(Long studentId) {
        return meetingRepository.findByStudentIdAndStatusInOrderByRequestDateAsc(studentId, List.of("PENDING", "APPROVED"));
    }

    // Update meeting status (for mentor response)
    public ResponseEntity<String> updateMeetingStatus(Long meetingId, String status, String mentorResponse) {
        System.out.println("[DEBUG] updateMeetingStatus called with meetingId=" + meetingId + ", status=" + status + ", mentorResponse=" + mentorResponse);
        Optional<Meeting> meeting = meetingRepository.findById(meetingId);
        if (meeting.isPresent()) {
            Meeting existingMeeting = meeting.get();
            System.out.println("[DEBUG] Found meeting: " + existingMeeting);
            existingMeeting.setStatus(status);
            meetingRepository.save(existingMeeting);
            System.out.println("[DEBUG] Meeting status updated successfully");
            return ResponseEntity.ok("Meeting status updated successfully");
        }
        System.out.println("[DEBUG] Meeting not found: " + meetingId);
        return ResponseEntity.badRequest().body("Meeting not found");
    }

    // Cancel meeting
    public ResponseEntity<String> cancelMeeting(Long meetingId, Long userId, String userType) {
        Optional<Meeting> meeting = meetingRepository.findById(meetingId);
        
        if (meeting.isPresent()) {
            Meeting existingMeeting = meeting.get();
            
            // Check if user has permission to cancel
            if (userType.equals("student") && !existingMeeting.getStudentId().equals(userId)) {
                return ResponseEntity.badRequest().body("You can only cancel your own meetings");
            }
            
            if (userType.equals("mentor") && !existingMeeting.getMentorId().equals(userId)) {
                return ResponseEntity.badRequest().body("You can only cancel your own meetings");
            }
            
            existingMeeting.setStatus("CANCELLED");
            meetingRepository.save(existingMeeting);
            return ResponseEntity.ok("Meeting cancelled successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get meetings by status
    public List<Meeting> getMeetingsByStatus(String status) {
        return meetingRepository.findByStatus(status);
    }

    // Delete meeting (admin only)
    public ResponseEntity<String> deleteMeeting(Long meetingId) {
        Optional<Meeting> meeting = meetingRepository.findById(meetingId);
        
        if (meeting.isPresent()) {
            meetingRepository.delete(meeting.get());
            return ResponseEntity.ok("Meeting deleted successfully");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get meeting details with student and mentor information
    public ResponseEntity<?> getMeetingWithDetails(Long meetingId) {
        try {
            Optional<Meeting> meeting = meetingRepository.findById(meetingId);
            if (!meeting.isPresent()) {
                return ResponseEntity.notFound().build();
            }
            
            Meeting meetingData = meeting.get();
            
            // Get student details
            Optional<Student> student = studentRepository.findById(meetingData.getStudentId());
            if (!student.isPresent()) {
                return ResponseEntity.badRequest().body("Student not found");
            }
            
            // Get mentor details
            Optional<Mentor> mentor = mentorRepository.findById(meetingData.getMentorId());
            if (!mentor.isPresent()) {
                return ResponseEntity.badRequest().body("Mentor not found");
            }
            
            // Create response object with all details
            Map<String, Object> response = new HashMap<>();
            response.put("meeting", meetingData);
            response.put("student", student.get());
            response.put("mentor", mentor.get());
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching meeting details: " + e.getMessage());
        }
    }

    // Get meetings for mentor with student details
    public ResponseEntity<?> getMentorMeetingsWithDetails(Long mentorId) {
        try {
            List<Meeting> meetings = meetingRepository.findByMentorId(mentorId);
            if (meetings.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            
            List<Map<String, Object>> meetingsWithDetails = new ArrayList<>();
            
            for (Meeting meeting : meetings) {
                Optional<Student> student = studentRepository.findById(meeting.getStudentId());
                if (student.isPresent()) {
                    Map<String, Object> meetingDetail = new HashMap<>();
                    meetingDetail.put("meeting", meeting);
                    meetingDetail.put("student", student.get());
                    meetingsWithDetails.add(meetingDetail);
                }
            }
            
            return ResponseEntity.ok(meetingsWithDetails);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching mentor meetings: " + e.getMessage());
        }
    }

    // Get meetings for student with mentor details
    public ResponseEntity<?> getStudentMeetingsWithDetails(Long studentId) {
        try {
            List<Meeting> meetings = meetingRepository.findByStudentId(studentId);
            if (meetings.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            
            List<Map<String, Object>> meetingsWithDetails = new ArrayList<>();
            
            for (Meeting meeting : meetings) {
                Optional<Mentor> mentor = mentorRepository.findById(meeting.getMentorId());
                if (mentor.isPresent()) {
                    Map<String, Object> meetingDetail = new HashMap<>();
                    meetingDetail.put("meeting", meeting);
                    meetingDetail.put("mentor", mentor.get());
                    meetingsWithDetails.add(meetingDetail);
                }
            }
            
            return ResponseEntity.ok(meetingsWithDetails);
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching student meetings: " + e.getMessage());
        }
    }
} 