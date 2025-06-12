-- Test data for meetings table
-- Make sure you have students and mentors in the database first

-- Insert test meeting requests
INSERT INTO meetings (student_id, mentor_id, selected_skills, question, status, request_date) VALUES
(1, 1, 'Java,Spring Boot', 'How to implement JWT authentication in Spring Boot?', 'PENDING', NOW()),
(2, 1, 'React,JavaScript', 'What are the best practices for state management in React?', 'PENDING', NOW()),
(1, 2, 'Python,Django', 'How to create REST APIs with Django REST Framework?', 'APPROVED', NOW()),
(3, 1, 'Database,MySQL', 'What are the differences between INNER JOIN and LEFT JOIN?', 'REJECTED', NOW()),
(2, 2, 'JavaScript,Node.js', 'How to handle async operations in Node.js?', 'PENDING', NOW());

-- Note: Replace student_id and mentor_id with actual IDs from your students and mentors tables
-- You can check existing IDs with:
-- SELECT student_id, stud_name FROM students;
-- SELECT mentor_id, mentor_name FROM mentors; 