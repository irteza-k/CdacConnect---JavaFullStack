package com.cdac.cdacConnect.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "meetings")
public class Meeting {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long meetingId;
    
    @Column(name = "student_id", nullable = false)
    private Long studentId;
    
    @Column(name = "mentor_id", nullable = false)
    private Long mentorId;
    
    @Column(name = "selected_skills", columnDefinition = "TEXT")
    private String selectedSkills; // Comma-separated list of selected skills
    
    @Column(name = "question", columnDefinition = "TEXT")
    private String question; // Student's question
    
    @Column(name = "status", nullable = false)
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED, COMPLETED, CANCELLED
    
    @Column(name = "request_date", nullable = false)
    private LocalDateTime requestDate;

    @Column(name = "is_scheduled", nullable = false)
    private Boolean isScheduled = false;
    
    // Default constructor
    public Meeting() {
        this.requestDate = LocalDateTime.now();
        this.isScheduled = false;
    }
    
    // Constructor for meeting requests
    public Meeting(Long studentId, Long mentorId, String selectedSkills, String question) {
        this.studentId = studentId;
        this.mentorId = mentorId;
        this.selectedSkills = selectedSkills;
        this.question = question;
        this.requestDate = LocalDateTime.now();
        this.status = "PENDING";
        this.isScheduled = false;
    }
    
    // Getters and Setters
    public Long getMeetingId() {
        return meetingId;
    }
    
    public void setMeetingId(Long meetingId) {
        this.meetingId = meetingId;
    }
    
    public Long getStudentId() {
        return studentId;
    }
    
    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }
    
    public Long getMentorId() {
        return mentorId;
    }
    
    public void setMentorId(Long mentorId) {
        this.mentorId = mentorId;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    public LocalDateTime getRequestDate() {
        return requestDate;
    }
    
    public void setRequestDate(LocalDateTime requestDate) {
        this.requestDate = requestDate;
    }
    
    public String getSelectedSkills() {
        return selectedSkills;
    }
    
    public void setSelectedSkills(String selectedSkills) {
        this.selectedSkills = selectedSkills;
    }
    
    public String getQuestion() {
        return question;
    }
    
    public void setQuestion(String question) {
        this.question = question;
    }

    public Boolean getIsScheduled() {
        return isScheduled;
    }

    public void setIsScheduled(Boolean isScheduled) {
        this.isScheduled = isScheduled;
    }
    
    @Override
    public String toString() {
        return "Meeting{" +
                "meetingId=" + meetingId +
                ", studentId=" + studentId +
                ", mentorId=" + mentorId +
                ", selectedSkills='" + selectedSkills + '\'' +
                ", question='" + question + '\'' +
                ", status='" + status + '\'' +
                ", requestDate=" + requestDate +
                ", isScheduled=" + isScheduled +
                '}';
    }
} 