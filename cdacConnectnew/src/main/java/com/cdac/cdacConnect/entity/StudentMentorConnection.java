package com.cdac.cdacConnect.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "student_mentor_connections")
public class StudentMentorConnection {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long connectionId;
    
    @Column(name = "student_id", nullable = false)
    private Long studentId;
    
    @Column(name = "student_email", nullable = false)
    private String studentEmail;
    
    @Column(name = "mentor_id", nullable = false)
    private Long mentorId;
    
    @Column(name = "mentor_email", nullable = false)
    private String mentorEmail;
    
    @Column(name = "mentor_name", nullable = false)
    private String mentorName;
    
    @Column(name = "selected_skills", columnDefinition = "TEXT")
    private String selectedSkills; // JSON string of selected skills
    
    @Column(name = "connection_date", nullable = false)
    private LocalDateTime connectionDate;
    
    @Column(name = "status", nullable = false)
    private String status = "PENDING"; // PENDING, APPROVED, REJECTED
    
    // Default constructor
    public StudentMentorConnection() {
        this.connectionDate = LocalDateTime.now();
    }
    
    // Constructor with parameters
    public StudentMentorConnection(Long studentId, String studentEmail, Long mentorId, 
                                 String mentorEmail, String mentorName, String selectedSkills) {
        this.studentId = studentId;
        this.studentEmail = studentEmail;
        this.mentorId = mentorId;
        this.mentorEmail = mentorEmail;
        this.mentorName = mentorName;
        this.selectedSkills = selectedSkills;
        this.connectionDate = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getConnectionId() {
        return connectionId;
    }
    
    public void setConnectionId(Long connectionId) {
        this.connectionId = connectionId;
    }
    
    public Long getStudentId() {
        return studentId;
    }
    
    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }
    
    public String getStudentEmail() {
        return studentEmail;
    }
    
    public void setStudentEmail(String studentEmail) {
        this.studentEmail = studentEmail;
    }
    
    public Long getMentorId() {
        return mentorId;
    }
    
    public void setMentorId(Long mentorId) {
        this.mentorId = mentorId;
    }
    
    public String getMentorEmail() {
        return mentorEmail;
    }
    
    public void setMentorEmail(String mentorEmail) {
        this.mentorEmail = mentorEmail;
    }
    
    public String getMentorName() {
        return mentorName;
    }
    
    public void setMentorName(String mentorName) {
        this.mentorName = mentorName;
    }
    
    public String getSelectedSkills() {
        return selectedSkills;
    }
    
    public void setSelectedSkills(String selectedSkills) {
        this.selectedSkills = selectedSkills;
    }
    
    public LocalDateTime getConnectionDate() {
        return connectionDate;
    }
    
    public void setConnectionDate(LocalDateTime connectionDate) {
        this.connectionDate = connectionDate;
    }
    
    public String getStatus() {
        return status;
    }
    
    public void setStatus(String status) {
        this.status = status;
    }
    
    @Override
    public String toString() {
        return "StudentMentorConnection{" +
                "connectionId=" + connectionId +
                ", studentId=" + studentId +
                ", studentEmail='" + studentEmail + '\'' +
                ", mentorId=" + mentorId +
                ", mentorEmail='" + mentorEmail + '\'' +
                ", mentorName='" + mentorName + '\'' +
                ", selectedSkills='" + selectedSkills + '\'' +
                ", connectionDate=" + connectionDate +
                ", status='" + status + '\'' +
                '}';
    }
} 