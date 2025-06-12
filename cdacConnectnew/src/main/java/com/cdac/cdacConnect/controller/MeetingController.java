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

import com.cdac.cdacConnect.entity.Meeting;
import com.cdac.cdacConnect.service.MeetingService;

@RestController
@RequestMapping("/api/meetings")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

    // Create a new meeting request
    @PostMapping
    public ResponseEntity<String> createMeeting(@RequestBody MeetingRequest request) {
        try {
            Meeting meeting = new Meeting();
            meeting.setStudentId(request.getStudentId());
            meeting.setMentorId(request.getMentorId());
            meeting.setSelectedSkills(String.join(",", request.getSkills()));
            meeting.setQuestion(request.getQuestion());
            meeting.setStatus("PENDING");
            meeting.setRequestDate(java.time.LocalDateTime.now());
            
            return meetingService.createMeeting(meeting);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating meeting request: " + e.getMessage());
        }
    }

    // Create a new meeting request with skills and question (Enhanced endpoint)
    @PostMapping("/request")
    public ResponseEntity<String> createMeetingRequest(@RequestBody MeetingRequestWithSkills request) {
        try {
            Meeting meeting = new Meeting();
            meeting.setStudentId(request.getStudentId());
            meeting.setMentorId(request.getMentorId());
            meeting.setSelectedSkills(String.join(",", request.getSkills()));
            meeting.setQuestion(request.getQuestion());
            meeting.setStatus("PENDING");
            meeting.setRequestDate(java.time.LocalDateTime.now());
            
            return meetingService.createMeeting(meeting);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error creating meeting request: " + e.getMessage());
        }
    }

    // Get all meetings
    @GetMapping
    public ResponseEntity<List<Meeting>> getAllMeetings() {
        List<Meeting> meetings = meetingService.getAllMeetings();
        if (meetings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(meetings);
    }

    // Get meeting by ID
    @GetMapping("/{id}")
    public ResponseEntity<Meeting> getMeetingById(@PathVariable Long id) {
        Optional<Meeting> meeting = meetingService.getMeetingById(id);
        return meeting.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get meetings by student ID
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Meeting>> getMeetingsByStudentId(@PathVariable Long studentId) {
        List<Meeting> meetings = meetingService.getMeetingsByStudentId(studentId);
        if (meetings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(meetings);
    }

    // Get meetings by mentor ID
    @GetMapping("/mentor/{mentorId}")
    public ResponseEntity<List<Meeting>> getMeetingsByMentorId(@PathVariable Long mentorId) {
        List<Meeting> meetings = meetingService.getMeetingsByMentorId(mentorId);
        if (meetings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(meetings);
    }

    // Get meeting requests with student details for mentor homepage
    @GetMapping("/mentor/{mentorId}/requests")
    public ResponseEntity<?> getMeetingRequestsForMentor(@PathVariable Long mentorId) {
        return meetingService.getMentorMeetingsWithDetails(mentorId);
    }

    // Get pending meetings for a mentor
    @GetMapping("/mentor/{mentorId}/pending")
    public ResponseEntity<List<Meeting>> getPendingMeetingsForMentor(@PathVariable Long mentorId) {
        List<Meeting> meetings = meetingService.getPendingMeetingsForMentor(mentorId);
        if (meetings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(meetings);
    }

    // Get upcoming meetings for a student
    @GetMapping("/student/{studentId}/upcoming")
    public ResponseEntity<List<Meeting>> getUpcomingMeetingsForStudent(@PathVariable Long studentId) {
        List<Meeting> meetings = meetingService.getUpcomingMeetingsForStudent(studentId);
        if (meetings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(meetings);
    }

    // Update meeting status (for mentor response)
    @PutMapping("/{id}/status")
    public ResponseEntity<String> updateMeetingStatus(@PathVariable Long id, @RequestBody StatusUpdateRequest request) {
        return meetingService.updateMeetingStatus(id, request.getStatus(), null);
    }

    // Update meeting status (simple endpoint for accept/reject)
    @PutMapping("/{id}")
    public ResponseEntity<String> updateMeetingStatus(@PathVariable Long id, @RequestBody MeetingStatusUpdate request) {
        return meetingService.updateMeetingStatus(id, request.getStatus(), request.getMentorId());
    }

    // Cancel meeting
    @PutMapping("/{id}/cancel")
    public ResponseEntity<String> cancelMeeting(@PathVariable Long id, @RequestBody CancelRequest request) {
        return meetingService.cancelMeeting(id, request.getUserId(), request.getUserType());
    }

    // Get meetings by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Meeting>> getMeetingsByStatus(@PathVariable String status) {
        List<Meeting> meetings = meetingService.getMeetingsByStatus(status);
        if (meetings.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(meetings);
    }

    // Delete meeting (admin only)
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMeeting(@PathVariable Long id) {
        return meetingService.deleteMeeting(id);
    }

    // Get meeting by ID with details
    @GetMapping("/{id}/details")
    public ResponseEntity<?> getMeetingWithDetails(@PathVariable Long id) {
        return meetingService.getMeetingWithDetails(id);
    }

    // Get meetings by student ID with mentor details
    @GetMapping("/student/{studentId}/details")
    public ResponseEntity<?> getStudentMeetingsWithDetails(@PathVariable Long studentId) {
        return meetingService.getStudentMeetingsWithDetails(studentId);
    }

    // Get meetings by mentor ID with student details
    @GetMapping("/mentor/{mentorId}/details")
    public ResponseEntity<?> getMentorMeetingsWithDetails(@PathVariable Long mentorId) {
        return meetingService.getMentorMeetingsWithDetails(mentorId);
    }

    // Inner classes for request/response
    public static class MeetingRequest {
        private Long studentId;
        private Long mentorId;
        private List<String> skills;
        private String question;

        // Getters and Setters
        public Long getStudentId() { return studentId; }
        public void setStudentId(Long studentId) { this.studentId = studentId; }
        
        public Long getMentorId() { return mentorId; }
        public void setMentorId(Long mentorId) { this.mentorId = mentorId; }
        
        public List<String> getSkills() { return skills; }
        public void setSkills(List<String> skills) { this.skills = skills; }
        
        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }
    }

    public static class StatusUpdateRequest {
        private String status;
        private String mentorResponse;

        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        
        public String getMentorResponse() { return mentorResponse; }
        public void setMentorResponse(String mentorResponse) { this.mentorResponse = mentorResponse; }
    }

    public static class CancelRequest {
        private Long userId;
        private String userType;

        public Long getUserId() { return userId; }
        public void setUserId(Long userId) { this.userId = userId; }
        
        public String getUserType() { return userType; }
        public void setUserType(String userType) { this.userType = userType; }
    }

    public static class MeetingRequestWithSkills {
        private Long studentId;
        private Long mentorId;
        private List<String> skills;
        private String question;

        // Getters and Setters
        public Long getStudentId() { return studentId; }
        public void setStudentId(Long studentId) { this.studentId = studentId; }
        
        public Long getMentorId() { return mentorId; }
        public void setMentorId(Long mentorId) { this.mentorId = mentorId; }
        
        public List<String> getSkills() { return skills; }
        public void setSkills(List<String> skills) { this.skills = skills; }
        
        public String getQuestion() { return question; }
        public void setQuestion(String question) { this.question = question; }
    }

    public static class MeetingStatusUpdate {
        private String status;
        private Long mentorId;

        // Getters and Setters
        public String getStatus() { return status; }
        public void setStatus(String status) { this.status = status; }
        public Long getMentorId() { return mentorId; }
        public void setMentorId(Long mentorId) { this.mentorId = mentorId; }
    }
} 