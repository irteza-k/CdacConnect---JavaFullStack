package com.cdac.cdacConnect.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.cdacConnect.entity.Mentor;
import com.cdac.cdacConnect.entity.Skill;
import com.cdac.cdacConnect.repository.MentorRepository;
import com.cdac.cdacConnect.repository.SkillRepository;

@Service
public class MentorServiceImpl implements MentorService {

    @Autowired
    private MentorRepository mentorRepository;
    
    @Autowired
    private SkillRepository skillRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<String> saveMentor(Mentor mentor) {
        try {
            if (mentor == null) {
                return new ResponseEntity<>("Mentor data is invalid", HttpStatus.BAD_REQUEST);
            }

            // Check if email already exists
            Optional<Mentor> existingMentor = mentorRepository.findByEmail(mentor.getEmail());
            if (existingMentor.isPresent()) {
                return new ResponseEntity<>("Mentor with this email already exists", HttpStatus.CONFLICT);
            }

            // Encrypt password before saving
            mentor.setPassword(passwordEncoder.encode(mentor.getPassword()));
            mentorRepository.save(mentor);
            return new ResponseEntity<>("Mentor saved successfully", HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>("Error occurred while saving mentor: " + e.getMessage(), 
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> deleteMentor(Long id) {
        try {
            Optional<Mentor> mentor = mentorRepository.findById(id);
            if (mentor.isEmpty()) {
                return new ResponseEntity<>("Mentor not found", HttpStatus.NOT_FOUND);
            }

            mentorRepository.deleteById(id);
            return new ResponseEntity<>("Mentor deleted successfully", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Error occurred while deleting mentor: " + e.getMessage(), 
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateMentor(Long id, Mentor updatedMentor) {
        try {
            Optional<Mentor> existingMentor = mentorRepository.findById(id);
            if (existingMentor.isEmpty()) {
                return new ResponseEntity<>("Mentor not found", HttpStatus.NOT_FOUND);
            }

            Mentor mentor = existingMentor.get();
            
            // Update fields if they are not null
            if (updatedMentor.getMentorName() != null) {
                mentor.setMentorName(updatedMentor.getMentorName());
            }
            if (updatedMentor.getEmail() != null) {
                mentor.setEmail(updatedMentor.getEmail());
            }
            if (updatedMentor.getPhone() != null) {
                mentor.setPhone(updatedMentor.getPhone());
            }
            if (updatedMentor.getPassword() != null) {
                mentor.setPassword(passwordEncoder.encode(updatedMentor.getPassword()));
            }
            if (updatedMentor.getSkills() != null) {
                mentor.setSkills(updatedMentor.getSkills());
            }

            mentorRepository.save(mentor);
            return new ResponseEntity<>("Mentor updated successfully", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Error occurred while updating mentor: " + e.getMessage(), 
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public List<Mentor> getAllMentor() {
        return mentorRepository.findAll();
    }

    @Override
    public Optional<Mentor> getMentorById(Long id) {
        return mentorRepository.findById(id);
    }

    @Override
    public Optional<Mentor> getMentorByEmail(String email) {
        return mentorRepository.findByEmail(email);
    }

	@Override
	public Mentor addSkillsToMentor(Long mentorId, List<String> skillNames) {
		Optional<Mentor> optionalMentor = mentorRepository.findById(mentorId);
        if (optionalMentor.isEmpty()) {
            throw new RuntimeException("Mentor not found with id: " + mentorId);
        }

        Mentor mentor = optionalMentor.get();
        List<Skill> mentorSkills = mentor.getSkills() != null ? mentor.getSkills() : new ArrayList<>();

        for (String skillName : skillNames) {
            Skill skill = skillRepository.findBySkillName(skillName)
                    .orElseGet(() -> {
                        Skill newSkill = new Skill();
                        newSkill.setSkillName(skillName);
                        return skillRepository.save(newSkill);
                    });

            if (!mentorSkills.contains(skill)) {
                mentorSkills.add(skill);
            }
        }

        mentor.setSkills(mentorSkills);
        return mentorRepository.save(mentor);
	}
} 