# CDAC Connect - Design Patterns, MVC Architecture, and Annotations

## 1. Design Patterns Used

### MVC (Model-View-Controller)
- **Model:** Java classes in the `entity` package (e.g., `Student`, `Mentor`, `Meeting`) represent the data and business objects.
- **View:** The React frontend acts as the view, communicating with the backend via REST APIs.
- **Controller:** Java classes in the `controller` package (e.g., `MeetingController`, `MentorController`) handle HTTP requests and responses.

### Service Layer Pattern
- Classes in the `service` package (e.g., `MeetingService`, `MentorService`) contain business logic, keeping controllers thin and focused on HTTP.

### Repository Pattern
- Classes in the `repository` package (e.g., `MeetingRepository`, `MentorRepository`) abstract database access, using Spring Data JPA.

### Dependency Injection
- Spring's `@Autowired` and `@Bean` annotations inject dependencies, promoting loose coupling.

### Singleton Pattern
- Spring beans (services, repositories, controllers) are singletons by default.

---

## 2. MVC Architecture in the Backend

### Model
- Java classes in the `entity` package represent your database tables.
- Example: `Mentor.java`, `Student.java`, `Meeting.java`
- Annotated with `@Entity`, `@Id`, etc.

### View
- The view is the React frontend, which communicates with the backend via REST APIs.

### Controller
- Java classes in the `controller` package handle HTTP requests.
- Example: `MeetingController.java`
- Annotated with `@RestController`, `@RequestMapping`, `@GetMapping`, `@PostMapping`, `@PutMapping`, etc.
- They receive requests, call the service layer, and return responses.

### Service
- Java classes in the `service` package contain business logic.
- Example: `MeetingService.java`
- Annotated with `@Service`
- Called by controllers to process data and interact with repositories.

### Repository
- Java interfaces in the `repository` package extend Spring Data JPA interfaces.
- Example: `MeetingRepository.java`
- Annotated with `@Repository`
- Handle CRUD operations with the database.

---

## 3. Annotations Used and Their Work

### Spring Core Annotations
- `@Component`: Generic stereotype for any Spring-managed component.
- `@Autowired`: Injects dependencies automatically.
- `@Bean`: Declares a bean to be managed by Spring.

### Spring MVC/Web Annotations
- `@RestController`: Marks a class as a RESTful controller (combines `@Controller` and `@ResponseBody`).
- `@Controller`: Marks a class as a web controller.
- `@RequestMapping`: Maps HTTP requests to handler methods (class or method level).
- `@GetMapping`, `@PostMapping`, `@PutMapping`, `@DeleteMapping`: Shortcut annotations for HTTP methods.
- `@PathVariable`: Binds a URI template variable to a method parameter.
- `@RequestBody`: Binds the body of the HTTP request to a method parameter.
- `@RequestParam`: Binds a query parameter to a method parameter.
- `@ResponseBody`: Indicates a method return value should be bound to the web response body.

### Spring Data JPA Annotations
- `@Entity`: Marks a class as a JPA entity (database table).
- `@Id`: Marks a field as the primary key.
- `@GeneratedValue`: Specifies how the primary key is generated.
- `@Repository`: Marks a class as a repository (DAO) for database operations.

### Spring Security Annotations
- `@EnableWebSecurity`: Enables Spring Security's web security support.
- `@Configuration`: Marks a class as a source of bean definitions.
- `@Bean`: Declares a bean to be managed by Spring.

### Other Useful Annotations
- `@Service`: Marks a class as a service provider.
- `@Component`: Generic stereotype for any Spring-managed component.
- `@EnableAutoConfiguration`: Enables Spring Boot's auto-configuration mechanism (usually in the main class).

---

## 4. How They Work Together
- **Controller** receives HTTP requests, uses `@Autowired` to call a **Service**.
- **Service** contains business logic, uses `@Autowired` to call a **Repository**.
- **Repository** interacts with the database using JPA.
- **Entity** classes represent database tables.
- **Spring** manages all dependencies and object lifecycles using annotations.

---

## 5. Example Flow
1. **Frontend** sends a POST request to `/api/meetings`.
2. **MeetingController** (`@RestController`) receives the request.
3. It calls **MeetingService** (`@Service`) to process the request.
4. **MeetingService** uses **MeetingRepository** (`@Repository`) to save the meeting to the database.
5. **Meeting** (`@Entity`) is mapped to a database table. 