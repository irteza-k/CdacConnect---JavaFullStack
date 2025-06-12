# CDAC Connect

A Spring Boot-based mentoring platform that connects mentors with mentees, facilitating skill development and knowledge sharing.

---

## 🚀 Features

- Mentor Management  
- Skill-based Mentor Matching  
- Calendly Integration for Scheduling  
- User Authentication  
- RESTful API Architecture  

---

## ⚙️ Prerequisites

- Java 17 or higher  
- Maven  
- MySQL Database  
- IDE (IntelliJ IDEA, Eclipse, or VS Code)  

---

## 🛠️ Tech Stack

- Spring Boot  
- Spring Security  
- Spring Data JPA  
- MySQL  
- Maven  
- Jackson (for JSON processing)  

---

## 🧑‍💻 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/irteza-k/CdacConnect---JavaFullStack.git
cd CdacConnect---JavaFullStack
```

### 2. Configure Database

1. Create a MySQL database named `cdac_connect`
2. Update your database credentials in `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/cdac_connect
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Build the Project

```bash
mvn clean install
```

### 4. Run the Application

```bash
mvn spring-boot:run
```

Backend server will be available at:  
👉 `http://localhost:8080`

---

## 📁 Project Structure

```
CdacConnect---JavaFullStack/
├── backend/           # Spring Boot app
│   ├── src/
│   ├── pom.xml
│   └── ...
├── frontend/          # React app
│   ├── src/
│   ├── package.json
│   └── ...
├── README.md
└── .gitignore
```

---

## 📡 API Endpoints

### Mentor Endpoints

- `POST /api/mentors` — Create a new mentor profile  
- `GET /api/mentors` — Retrieve all mentors  
- `GET /api/mentors/{id}` — Get mentor by ID  
- `PUT /api/mentors/{id}` — Update mentor information  
- `DELETE /api/mentors/{id}` — Delete a mentor

### Skill Endpoints

- `POST /api/skills` — Create a new skill  
- `GET /api/skills` — Retrieve all skills  
- `GET /api/skills/{id}` — Get skill by ID

---

## 🔍 Example API Requests

### Create a Mentor – `POST /api/mentors`

**Request Body:**
```json
{
  "mentorName": "Irteza Khan",
  "email": "irteza@example.com",
  "phone": "1234567890",
  "password": "securePass123",
  "calendlyLink": "https://calendly.com/irteza",
  "skills": [
    { "skillId": 1, "skillName": "Java" }
  ]
}
```

**Response:**
```json
{
  "mentorId": 101,
  "mentorName": "Irteza Khan",
  "email": "irteza@example.com",
  ...
}
```

---

### Create a Skill – `POST /api/skills`

**Request Body:**
```json
{
  "skillName": "Spring Boot"
}
```

**Response:**
```json
{
  "skillId": 5,
  "skillName": "Spring Boot"
}
```

---

## 🧱 Entity Models

### Mentor
```java
Long mentorId  
String mentorName  
String email  
String phone  
String password  
String calendlyLink  
List<Skill> skills
```

### Skill
```java
Long skillId  
String skillName
```

---

## 📘 Full API Documentation

- ✅ Swagger UI (if enabled): [http://localhost:8080/swagger-ui.html](http://localhost:8080/swagger-ui.html)  
- ✅ Postman Collection: Add a collection file in `docs/CdacConnect.postman_collection.json`

---

## 🤝 Contributing

1. Fork the repository  
2. Create your feature branch: `git checkout -b feature/YourFeature`  
3. Commit your changes: `git commit -m "Add YourFeature"`  
4. Push to the branch: `git push origin feature/YourFeature`  
5. Open a Pull Request  

---

## 📄 License

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for details.

---

## 📬 Contact

**Irteza Zafeer Khan** – irteza0007@gmail.com  
GitHub Repo: [https://github.com/irteza-k/CdacConnect---JavaFullStack](https://github.com/irteza-k/CdacConnect---JavaFullStack)