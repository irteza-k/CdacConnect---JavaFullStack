package com.cdac.cdacConnect.entity;

import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToMany;

@Entity
public class Skill {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long skillId;
	
	private String skillName;
	
	@ManyToMany(mappedBy = "skills")
	private List<Mentor> mentors;

	public Long getSkillId() {
		return skillId;
	}

	public void setSkillId(Long skillId) {
		this.skillId = skillId;
	}

	public String getSkillName() {
		return skillName;
	}

	public void setSkillName(String skillName) {
		this.skillName = skillName;
	}

	public List<Mentor> getMentors() {
		return mentors;
	}

	public void setMentors(List<Mentor> mentors) {
		this.mentors = mentors;
	}

	public Skill(Long skillId, String skillName, List<Mentor> mentors) {
		super();
		this.skillId = skillId;
		this.skillName = skillName;
		this.mentors = mentors;
	}

	public Skill() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Skill [skillId=" + skillId + ", skillName=" + skillName + "]";
	}
	
	
}
