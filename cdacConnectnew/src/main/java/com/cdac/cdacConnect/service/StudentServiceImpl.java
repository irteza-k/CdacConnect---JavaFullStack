package com.cdac.cdacConnect.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.cdac.cdacConnect.entity.Student;
import com.cdac.cdacConnect.repository.StudentRepository;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public ResponseEntity<String> saveStudent(Student student) {
        try {
            if (student == null) {
                return new ResponseEntity<>("Student data is invalid", HttpStatus.BAD_REQUEST);
            }

            // Check if email already exists
            Optional<Student> existingStudent = studentRepository.findByEmail(student.getEmail());
            if (existingStudent.isPresent()) {
                return new ResponseEntity<>("Student with this email already exists", HttpStatus.CONFLICT);
            }

            // Encrypt password before saving
            student.setPassword(passwordEncoder.encode(student.getPassword()));
            studentRepository.save(student);
            return new ResponseEntity<>("Student saved successfully", HttpStatus.CREATED);

        } catch (Exception e) {
            return new ResponseEntity<>("Error occurred while saving student: " + e.getMessage(), 
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> deleteStudent(Long id) {
        try {
            Optional<Student> student = studentRepository.findById(id);
            if (student.isEmpty()) {
                return new ResponseEntity<>("Student not found", HttpStatus.NOT_FOUND);
            }

            studentRepository.deleteById(id);
            return new ResponseEntity<>("Student deleted successfully", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Error occurred while deleting student: " + e.getMessage(), 
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateStudent(Long id, Student updatedStudent) {
        try {
            Optional<Student> existingStudent = studentRepository.findById(id);
            if (existingStudent.isEmpty()) {
                return new ResponseEntity<>("Student not found", HttpStatus.NOT_FOUND);
            }

            Student student = existingStudent.get();
            
            // Update fields if they are not null
            if (updatedStudent.getStudName() != null) {
                student.setStudName(updatedStudent.getStudName());
            }
            if (updatedStudent.getEmail() != null) {
                student.setEmail(updatedStudent.getEmail());
            }
            if (updatedStudent.getPhone() != null) {
                student.setPhone(updatedStudent.getPhone());
            }
            if (updatedStudent.getPassword() != null) {
                student.setPassword(passwordEncoder.encode(updatedStudent.getPassword()));
            }

            studentRepository.save(student);
            return new ResponseEntity<>("Student updated successfully", HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>("Error occurred while updating student: " + e.getMessage(), 
                HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public List<Student> getAllStudent() {
        return studentRepository.findAll();
    }

    @Override
    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    @Override
    public Optional<Student> getStudentByEmail(String email) {
        return studentRepository.findByEmail(email);
    }
} 