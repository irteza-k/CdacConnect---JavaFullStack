package com.cdac.cdacConnect.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Student {
	
	@Id                                                    
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long studId;
	
	private String studName;
	
	private String email;
	
	private String phone;
	
	private String password;

	public Long getStudId() {
		return studId;
	}

	public void setStudId(Long studId) {
		this.studId = studId;
	}

	public String getStudName() {
		return studName;
	}

	public void setStudName(String studName) {
		this.studName = studName;
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

	public Student(Long studId, String studName, String email, String phone, String password) {
		super();
		this.studId = studId;
		this.studName = studName;
		this.email = email;
		this.phone = phone;
		this.password = password;
	}

	public Student() {
		super();
		// TODO Auto-generated constructor stub
	}

	@Override
	public String toString() {
		return "Student [studId=" + studId + ", studName=" + studName + ", email=" + email + ", phone=" + phone
				+ ", password=" + password + "]";
	}
	
}
