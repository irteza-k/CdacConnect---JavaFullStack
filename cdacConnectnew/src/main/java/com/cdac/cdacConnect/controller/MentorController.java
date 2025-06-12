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

import com.cdac.cdacConnect.entity.Mentor;
import com.cdac.cdacConnect.entity.Skill;
import com.cdac.cdacConnect.service.MentorService;

@RestController
@RequestMapping("/api/mentors")
public class MentorController {

    @Autowired
    private MentorService mentorService;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    // Create a new mentor
    @PostMapping
    public ResponseEntity<String> createMentor(@RequestBody Mentor mentor) {
        return mentorService.saveMentor(mentor);
    }

    // Mentor login
    @PostMapping("/login")
    public ResponseEntity<?> loginMentor(@RequestBody LoginRequest loginRequest) {
        Optional<Mentor> mentor = mentorService.getMentorByEmail(loginRequest.getEmail());
        
        if (mentor.isPresent() && passwordEncoder.matches(loginRequest.getPassword(), mentor.get().getPassword())) {
            // Create a simple response with user info (in production, you'd use JWT tokens)
            LoginResponse response = new LoginResponse();
            response.setMessage("Login successful");
            response.setUserType("mentor");
            response.setEmail(mentor.get().getEmail());
            response.setName(mentor.get().getMentorName());
            response.setId(mentor.get().getMentorId());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }

    // Get all mentors
    @GetMapping
    public ResponseEntity<List<Mentor>> getAllMentors() {
        List<Mentor> mentors = mentorService.getAllMentor();
        if (mentors.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(mentors);
    }

    // Get mentor by ID
    @GetMapping("/{id}")
    public ResponseEntity<Mentor> getMentorById(@PathVariable Long id) {
        Optional<Mentor> mentor = mentorService.getMentorById(id);
        return mentor.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get mentor by email
    @GetMapping("/email/{email}")
    public ResponseEntity<Mentor> getMentorByEmail(@PathVariable String email) {
        Optional<Mentor> mentor = mentorService.getMentorByEmail(email);
        return mentor.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update mentor
    @PutMapping("/{id}")
    public ResponseEntity<String> updateMentor(@PathVariable Long id, @RequestBody Mentor updatedMentor) {
        return mentorService.updateMentor(id, updatedMentor);
    }

    // Delete mentor
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteMentor(@PathVariable Long id) {
        return mentorService.deleteMentor(id);
    }
    
 // Add or update skills for a mentor
    @PostMapping("/{mentorId}/skills")
    public Mentor addSkillsToMentor(@PathVariable Long mentorId, @RequestBody List<String> skillNames) {
    	System.out.println(mentorId);
    	System.out.println(skillNames);
        return mentorService.addSkillsToMentor(mentorId, skillNames);
    }

    // Get mentor's skills
    @GetMapping("/{id}/skills")
    public ResponseEntity<?> getMentorSkills(@PathVariable Long id) {
        Optional<Mentor> mentor = mentorService.getMentorById(id);
        if (mentor.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(mentor.get().getSkills());
    }

    // Delete a specific skill from mentor
    @DeleteMapping("/{mentorId}/skills/{skillName}")
    public ResponseEntity<String> deleteSkillFromMentor(@PathVariable Long mentorId, @PathVariable String skillName) {
        try {
            Optional<Mentor> mentor = mentorService.getMentorById(mentorId);
            if (mentor.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Mentor mentorData = mentor.get();
            List<Skill> currentSkills = mentorData.getSkills();
            
            if (currentSkills == null) {
                return ResponseEntity.badRequest().body("No skills found for this mentor");
            }
            
            // Find and remove the skill by name
            boolean skillFound = currentSkills.removeIf(skill -> skill.getSkillName().equals(skillName));
            
            if (!skillFound) {
                return ResponseEntity.badRequest().body("Skill not found for this mentor");
            }
            
            mentorData.setSkills(currentSkills);
            mentorService.updateMentor(mentorId, mentorData);
            return ResponseEntity.ok("Skill '" + skillName + "' deleted successfully");
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting skill: " + e.getMessage());
        }
    }

    // Delete multiple skills from mentor
    @DeleteMapping("/{mentorId}/skills")
    public ResponseEntity<String> deleteSkillsFromMentor(@PathVariable Long mentorId, @RequestBody List<String> skillNames) {
        try {
            Optional<Mentor> mentor = mentorService.getMentorById(mentorId);
            if (mentor.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            
            Mentor mentorData = mentor.get();
            List<Skill> currentSkills = mentorData.getSkills();
            
            if (currentSkills == null) {
                return ResponseEntity.badRequest().body("No skills found for this mentor");
            }
            
            // Remove skills by name
            currentSkills.removeIf(skill -> skillNames.contains(skill.getSkillName()));
            mentorData.setSkills(currentSkills);
            
            mentorService.updateMentor(mentorId, mentorData);
            return ResponseEntity.ok("Skills deleted successfully");
            
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error deleting skills: " + e.getMessage());
        }
    }

    // Get mentor's Calendly link
    @GetMapping("/{id}/calendly-link")
    public ResponseEntity<String> getCalendlyLink(@PathVariable Long id) {
        Optional<Mentor> mentor = mentorService.getMentorById(id);
        if (mentor.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(mentor.get().getCalendlyLink());
    }

    // Update mentor's Calendly link
    @PutMapping("/{id}/calendly-link")
    public ResponseEntity<String> updateCalendlyLink(@PathVariable Long id, @RequestBody String calendlyLink) {
        Optional<Mentor> mentorOpt = mentorService.getMentorById(id);
        if (mentorOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        Mentor mentor = mentorOpt.get();
        mentor.setCalendlyLink(calendlyLink);
        mentorService.updateMentor(id, mentor);
        return ResponseEntity.ok("Calendly link updated successfully");
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