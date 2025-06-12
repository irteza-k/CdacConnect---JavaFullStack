package com.cdac.cdacConnect.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;

@Entity
public class Mentor {
	
	@Id                                                    
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long mentorId;    
    
	private String mentorName;
	                        
	private String email;   
	                        
	private String phone;   
	                        
	private String password;
	
	private String calendlyLink; // Calendly link for scheduling
	
	@ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name = "mentor_skill",
        joinColumns = @JoinColumn(name = "mentor_id"),
        inverseJoinColumns = @JoinColumn(name = "skill_id")
    )
    @JsonIgnore
	private List<Skill> skills;

	public Long getMentorId() {
		return mentorId;
	}

	public void setMentorId(Long mentorId) {
		this.mentorId = mentorId;
	}

	public String getMentorName() {
		return mentorName;
	}

	public void setMentorName(String mentorName) {
		this.mentorName = mentorName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCalendlyLink() {
		return calendlyLink;
	}

	public void setCalendlyLink(String calendlyLink) {
		this.calendlyLink = calendlyLink;
	}

	public List<Skill> getSkills() {
		return skills;
	}

	public void setSkills(List<Skill> skills) {
		this.skills = skills;
	}

	public Mentor(Long mentorId, String mentorName, String email, String phone, String password, List<Skill> skills) {
		super();
		this.mentorId = mentorId;
		this.mentorName = mentorName;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.skills = skills;
	}

	public Mentor() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
