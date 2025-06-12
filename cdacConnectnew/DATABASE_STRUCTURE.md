# CDAC Connect - Database Structure

## 1. Database Overview
The project uses a relational database (MySQL/PostgreSQL) with the following main entities:
- Students
- Mentors
- Meetings
- Skills
- Notifications

## 2. Entity Relationships

### Student Entity
```sql
CREATE TABLE students (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Mentor Entity
```sql
CREATE TABLE mentors (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(15),
    calendly_link VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Skills Entity
```sql
CREATE TABLE skills (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Mentor-Skills Relationship
```sql
CREATE TABLE mentor_skills (
    mentor_id BIGINT,
    skill_id BIGINT,
    PRIMARY KEY (mentor_id, skill_id),
    FOREIGN KEY (mentor_id) REFERENCES mentors(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);
```

### Meetings Entity
```sql
CREATE TABLE meetings (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    student_id BIGINT,
    mentor_id BIGINT,
    status ENUM('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED'),
    meeting_date TIMESTAMP,
    duration INT, -- in minutes
    topic VARCHAR(255),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (mentor_id) REFERENCES mentors(id) ON DELETE CASCADE
);
```

### Notifications Entity
```sql
CREATE TABLE notifications (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT,
    user_type ENUM('STUDENT', 'MENTOR'),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES students(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES mentors(id) ON DELETE CASCADE
);
```

## 3. Key Relationships

### One-to-Many Relationships
1. Mentor to Meetings
   - One mentor can have multiple meetings
   - Each meeting belongs to one mentor

2. Student to Meetings
   - One student can have multiple meetings
   - Each meeting belongs to one student

3. User to Notifications
   - One user (student/mentor) can have multiple notifications
   - Each notification belongs to one user

### Many-to-Many Relationships
1. Mentors to Skills
   - One mentor can have multiple skills
   - One skill can be associated with multiple mentors
   - Junction table: mentor_skills

## 4. Indexes
```sql
-- Performance optimization indexes
CREATE INDEX idx_student_email ON students(email);
CREATE INDEX idx_mentor_email ON mentors(email);
CREATE INDEX idx_meeting_status ON meetings(status);
CREATE INDEX idx_meeting_date ON meetings(meeting_date);
CREATE INDEX idx_notification_user ON notifications(user_id, user_type);
```

## 5. Data Types and Constraints

### Common Data Types
- `BIGINT`: For IDs and large numbers
- `VARCHAR`: For strings with length limits
- `TEXT`: For long text content
- `TIMESTAMP`: For dates and times
- `ENUM`: For fixed set of values
- `BOOLEAN`: For true/false values

### Constraints
- `PRIMARY KEY`: Unique identifier for each record
- `FOREIGN KEY`: Referential integrity
- `UNIQUE`: No duplicate values
- `NOT NULL`: Required fields
- `DEFAULT`: Default values
- `ON DELETE CASCADE`: Automatic deletion of related records

## 6. Database Operations

### Common Queries

1. Get Mentor with Skills
```sql
SELECT m.*, GROUP_CONCAT(s.name) as skills
FROM mentors m
LEFT JOIN mentor_skills ms ON m.id = ms.mentor_id
LEFT JOIN skills s ON ms.skill_id = s.id
GROUP BY m.id;
```

2. Get Student's Meetings
```sql
SELECT m.*, mt.name as mentor_name
FROM meetings m
JOIN mentors mt ON m.mentor_id = mt.id
WHERE m.student_id = ?;
```

3. Get Mentor's Meeting Requests
```sql
SELECT m.*, s.name as student_name
FROM meetings m
JOIN students s ON m.student_id = s.id
WHERE m.mentor_id = ? AND m.status = 'PENDING';
```

## 7. Security Considerations

### Password Storage
- Passwords are hashed using BCrypt
- Never stored in plain text
- Salt is automatically handled by BCrypt

### Data Protection
- Sensitive data is encrypted
- Access is controlled through JWT authentication
- Database credentials are secured

## 8. Backup and Maintenance

### Backup Strategy
- Regular automated backups
- Point-in-time recovery capability
- Backup verification process

### Maintenance Tasks
- Regular index optimization
- Data archiving for old records
- Performance monitoring
- Security updates

## 9. Database Configuration

### Connection Settings
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cdac_connect
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

### Performance Settings
```properties
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
spring.jpa.properties.hibernate.jdbc.batch_size=50
spring.jpa.properties.hibernate.order_inserts=true
spring.jpa.properties.hibernate.order_updates=true
``` 