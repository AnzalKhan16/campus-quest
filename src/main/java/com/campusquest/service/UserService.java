package com.campusquest.service;

import com.campusquest.dto.UserResponse;
import com.campusquest.entity.Badge;
import com.campusquest.entity.Course;
import com.campusquest.entity.User;
import com.campusquest.entity.UserProgress;
import com.campusquest.repository.BadgeRepository;
import com.campusquest.repository.CourseRepository;
import com.campusquest.repository.UserProgressRepository;
import com.campusquest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private CourseRepository courseRepository;
    
    @Autowired
    private UserProgressRepository userProgressRepository;
    
    @Autowired
    private BadgeRepository badgeRepository;
    
    /**
     * Get user profile
     */
    public UserResponse getUserProfile(String userId) throws Exception {
        User user = userRepository.findByEmail(userId)
                .orElseThrow(() -> new Exception("User not found"));
        
        return new UserResponse(
            user.getId(),
            user.getEmail(),
            user.getFullName(),
            user.getLevel(),
            user.getTotalXP(),
            user.getCurrentLevelXP(),
            user.getDailyStreak(),
            user.getBadges()
        );
    }
    
    /**
     * Enroll user in a course
     */
    public void enrollCourse(String userId, String courseId) throws Exception {
        // Check if user already enrolled
        if (userProgressRepository.findByUserIdAndCourseId(userId, courseId).isPresent()) {
            throw new Exception("User already enrolled in this course");
        }
        
        // Create progress record
        UserProgress progress = new UserProgress(userId, courseId);
        userProgressRepository.save(progress);
    }
    
    /**
     * Get user's enrolled courses
     */
    public List<UserProgress> getUserCourses(String userId) {
        return userProgressRepository.findByUserId(userId);
    }
    
    /**
     * Get user's badges
     */
    public List<Badge> getUserBadges(String userId) {
        return badgeRepository.findByUserId(userId);
    }
    
    /**
     * Update course progress
     */
    public void updateCourseProgress(String userId, String courseId, int progressPercentage) throws Exception {
        UserProgress progress = userProgressRepository.findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new Exception("Progress record not found"));
        
        progress.setProgress(progressPercentage);
        userProgressRepository.save(progress);
    }
    
    /**
     * Get user's total completed courses
     */
    public long getCompletedCoursesCount(String userId) {
        return userProgressRepository.countByUserIdAndCompleted(userId, true);
    }
    
    /**
     * Get all available courses
     */
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
}
