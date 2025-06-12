package com.cdac.cdacConnect.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cdac.cdacConnect.entity.Mentor;

@Service
public interface MentorService {
    // Save new mentor
    ResponseEntity<String> saveMentor(Mentor mentor);

    // Delete mentor by ID
    ResponseEntity<String> deleteMentor(Long id);

    // Update existing mentor
    ResponseEntity<String> updateMentor(Long id, Mentor updatedMentor);

    // Get all mentors
    List<Mentor> getAllMentor();

    // Get mentor by ID
    Optional<Mentor> getMentorById(Long id);

    // Get mentor by email
    Optional<Mentor> getMentorByEmail(String email);

	Mentor addSkillsToMentor(Long mentorId, List<String> skillNames);
} 