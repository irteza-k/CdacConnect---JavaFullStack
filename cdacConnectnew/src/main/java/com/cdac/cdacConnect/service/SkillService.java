package com.cdac.cdacConnect.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cdac.cdacConnect.entity.Skill;

@Service
public interface SkillService {
    // Save new skill
    ResponseEntity<String> saveSkill(Skill skill);

    // Delete skill by ID
    ResponseEntity<String> deleteSkill(Long id);

    // Update existing skill
    ResponseEntity<String> updateSkill(Long id, Skill updatedSkill);

    // Get all skills
    List<Skill> getAllSkill();

    // Get skill by ID
    Optional<Skill> getSkillById(Long id);

    // Get skill by name
    Optional<Skill> getSkillByName(String skillName);
} 