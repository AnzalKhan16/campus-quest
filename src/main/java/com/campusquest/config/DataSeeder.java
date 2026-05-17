package com.campusquest.config;

import com.campusquest.entity.Course;
import com.campusquest.entity.User;
import com.campusquest.repository.CourseRepository;
import com.campusquest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Seeds the database with initial courses and users on startup
 * Comment out @Component if you don't want auto-seeding
 */
@Component
public class DataSeeder implements CommandLineRunner {
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    @Override
    public void run(String... args) throws Exception {
        // Only seed if database is empty
        if (courseRepository.count() == 0) {
            seedCourses();
        }
        
        if (userRepository.count() == 0) {
            seedUsers();
        }
    }
    
    private void seedCourses() {
        // Java courses
        courseRepository.save(new Course(
            "Java Basics",
            "Learn the fundamentals of Java programming",
            "Java",
            1,
            100
        ));
        
        courseRepository.save(new Course(
            "Spring Boot Fundamentals",
            "Master Spring Boot for building web applications",
            "Java",
            2,
            200
        ));
        
        courseRepository.save(new Course(
            "Database Design with MongoDB",
            "Learn NoSQL database design patterns",
            "Database",
            3,
            300
        ));
        
        courseRepository.save(new Course(
            "RESTful API Development",
            "Build scalable REST APIs using Spring",
            "Java",
            3,
            300
        ));
        
        courseRepository.save(new Course(
            "Advanced Java Concurrency",
            "Master threading and concurrent programming",
            "Java",
            4,
            400
        ));
        
        // Web Development courses
        courseRepository.save(new Course(
            "React.js Essentials",
            "Build interactive user interfaces with React",
            "Web",
            2,
            200
        ));
        
        courseRepository.save(new Course(
            "HTML & CSS Mastery",
            "Create beautiful web pages with semantic HTML and CSS",
            "Web",
            1,
            100
        ));
        
        courseRepository.save(new Course(
            "JavaScript Advanced Concepts",
            "Deep dive into JavaScript closures, promises, and async/await",
            "Web",
            3,
            250
        ));
        
        // Data & AI courses
        courseRepository.save(new Course(
            "Python for Data Science",
            "Learn Python with Pandas and NumPy",
            "AI/ML",
            2,
            200
        ));
        
        courseRepository.save(new Course(
            "Machine Learning with Scikit-Learn",
            "Build predictive models and classification systems",
            "AI/ML",
            4,
            500
        ));
        
        System.out.println("✅ Seeded 10 courses");
    }
    
    private void seedUsers() {
        // Sample users with different levels/XP
        
        User user1 = new User(
            "arjun@example.com",
            "$2a$10$slYQmyNdGzin7olVN3z5..UQRbW5bYbM2o.dFLWhMkGJ1.qBBFwSy", // "password123" hashed
            "Arjun Kumar"
        );
        user1.setLevel(3);
        user1.setTotalXP(2500);
        user1.setCurrentLevelXP(500);
        user1.setDailyStreak(5);
        user1.setBadges(2);
        userRepository.save(user1);
        
        User user2 = new User(
            "priya@example.com",
            "$2a$10$slYQmyNdGzin7olVN3z5..UQRbW5bYbM2o.dFLWhMkGJ1.qBBFwSy",
            "Priya Singh"
        );
        user2.setLevel(4);
        user2.setTotalXP(4200);
        user2.setCurrentLevelXP(200);
        user2.setDailyStreak(12);
        user2.setBadges(5);
        userRepository.save(user2);
        
        User user3 = new User(
            "rahul@example.com",
            "$2a$10$slYQmyNdGzin7olVN3z5..UQRbW5bYbM2o.dFLWhMkGJ1.qBBFwSy",
            "Rahul Verma"
        );
        user3.setLevel(2);
        user3.setTotalXP(1800);
        user3.setCurrentLevelXP(800);
        user3.setDailyStreak(3);
        user3.setBadges(1);
        userRepository.save(user3);
        
        User user4 = new User(
            "neha@example.com",
            "$2a$10$slYQmyNdGzin7olVN3z5..UQRbW5bYbM2o.dFLWhMkGJ1.qBBFwSy",
            "Neha Gupta"
        );
        user4.setLevel(5);
        user4.setTotalXP(5500);
        user4.setCurrentLevelXP(500);
        user4.setDailyStreak(20);
        user4.setBadges(8);
        userRepository.save(user4);
        
        System.out.println("✅ Seeded 4 sample users");
        System.out.println("📧 Test login: arjun@example.com / password123");
    }
}
