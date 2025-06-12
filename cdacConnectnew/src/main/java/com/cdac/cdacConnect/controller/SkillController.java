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

import com.cdac.cdacConnect.entity.Skill;
import com.cdac.cdacConnect.service.SkillService;

@RestController
@RequestMapping("/api/skills")
public class SkillController {

    @Autowired
    private SkillService skillService;

    // Create a new skill
    @PostMapping
    public ResponseEntity<String> createSkill(@RequestBody Skill skill) {
        return skillService.saveSkill(skill);
    }

    // Get all skills
    @GetMapping
    public ResponseEntity<List<Skill>> getAllSkills() {
        List<Skill> skills = skillService.getAllSkill();
        if (skills.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(skills);
    }

    // Get skill by ID
    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable Long id) {
        Optional<Skill> skill = skillService.getSkillById(id);
        return skill.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get skill by name
    @GetMapping("/name/{skillName}")
    public ResponseEntity<Skill> getSkillByName(@PathVariable String skillName) {
        Optional<Skill> skill = skillService.getSkillByName(skillName);
        return skill.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Update skill
    @PutMapping("/{id}")
    public ResponseEntity<String> updateSkill(@PathVariable Long id, @RequestBody Skill updatedSkill) {
        return skillService.updateSkill(id, updatedSkill);
    }

    // Delete skill
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSkill(@PathVariable Long id) {
        return skillService.deleteSkill(id);
    }

    // Get mentors with this skill
    @GetMapping("/{id}/mentors")
    public ResponseEntity<?> getMentorsWithSkill(@PathVariable Long id) {
        Optional<Skill> skill = skillService.getSkillById(id);
        if (skill.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(skill.get().getMentors());
    }
} 