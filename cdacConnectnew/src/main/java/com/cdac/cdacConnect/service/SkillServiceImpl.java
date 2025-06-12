package com.cdac.cdacConnect.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cdac.cdacConnect.entity.Skill;
import com.cdac.cdacConnect.repository.SkillRepository;

@Service
public class SkillServiceImpl implements SkillService {

    @Autowired
    private SkillRepository skillRepository;

    @Override
    public ResponseEntity<String> saveSkill(Skill skill) {
        try {
            if (skill == null || skill.getSkillName() == null || skill.getSkillName().trim().isEmpty()) {
                return new ResponseEntity<>("Skill data is invalid", HttpStatus.BAD_REQUEST);
            }

            // Check if skill name already exists
            Optional<Skill> existingSkill = skillRepository.findBySkillName(skill.getSkillName());
            if (existingSkill.isPresent()) {
                return new ResponseEntity<>("Skill with this name already exists", HttpStatus.CONFLICT);
            }

            skillRepository.save(skill);
            return new ResponseEntity<>("Skill saved successfully", HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>("Error occurred while saving skill: " + e.getMessage(), 
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> deleteSkill(Long id) {
        try {
            Optional<Skill> skill = skillRepository.findById(id);
            if (skill.isEmpty()) {
                return new ResponseEntity<>("Skill not found", HttpStatus.NOT_FOUND);
            }

            // Check if skill is associated with any mentors
            if (!skill.get().getMentors().isEmpty()) {
                return new ResponseEntity<>("Cannot delete skill as it is associated with mentors", 
                    HttpStatus.CONFLICT);
            }

            skillRepository.deleteById(id);
            return new ResponseEntity<>("Skill deleted successfully", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Error occurred while deleting skill: " + e.getMessage(), 
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateSkill(Long id, Skill updatedSkill) {
        try {
            Optional<Skill> existingSkill = skillRepository.findById(id);
            if (existingSkill.isEmpty()) {
                return new ResponseEntity<>("Skill not found", HttpStatus.NOT_FOUND);
            }

            Skill skill = existingSkill.get();
            
            // Check if new name already exists (if name is being updated)
            if (updatedSkill.getSkillName() != null && !updatedSkill.getSkillName().equals(skill.getSkillName())) {
                Optional<Skill> skillWithNewName = skillRepository.findBySkillName(updatedSkill.getSkillName());
                if (skillWithNewName.isPresent()) {
                    return new ResponseEntity<>("Skill with this name already exists", HttpStatus.CONFLICT);
                }
                skill.setSkillName(updatedSkill.getSkillName());
            }

            skillRepository.save(skill);
            return new ResponseEntity<>("Skill updated successfully", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Error occurred while updating skill: " + e.getMessage(), 
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public List<Skill> getAllSkill() {
        return skillRepository.findAll();
    }

    @Override
    public Optional<Skill> getSkillById(Long id) {
        return skillRepository.findById(id);
    }

    @Override
    public Optional<Skill> getSkillByName(String skillName) {
        return skillRepository.findBySkillName(skillName);
    }
} 