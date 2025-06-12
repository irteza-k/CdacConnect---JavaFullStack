package com.cdac.cdacConnect.service;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.cdac.cdacConnect.entity.Student;

@Service
public interface StudentService {
	// Save new student
    ResponseEntity<String> saveStudent(Student student);

    // Delete student by ID
    ResponseEntity<String> deleteStudent(Long id);

    // Update existing student
    ResponseEntity<String> updateStudent(Long id, Student updatedStudent);

    // Get all students
    List<Student> getAllStudent();

    // Get student by ID
    Optional<Student> getStudentById(Long id);

    // Get student by email
    Optional<Student> getStudentByEmail(String email);
}
