package com.cdac.cdacConnect.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.cdacConnect.entity.Skill;

@Repository
public interface SkillRepository extends JpaRepository<Skill, Long> {
	Optional<Skill> findBySkillName(String skillName);
}
