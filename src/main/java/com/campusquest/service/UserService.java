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
     * Get user profile using email
     */
    public UserResponse getUserProfile(String email) throws Exception {

        User user = userRepository.findByEmail(email)
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
    public void enrollCourse(String email, String courseId) throws Exception {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        String userId = user.getId();

        if (userProgressRepository.findByUserIdAndCourseId(userId, courseId).isPresent()) {
            throw new Exception("User already enrolled in this course");
        }

        UserProgress progress = new UserProgress(userId, courseId);

        userProgressRepository.save(progress);
    }

    /**
     * Get user's enrolled courses
     */
    public List<UserProgress> getUserCourses(String email) throws Exception {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        return userProgressRepository.findByUserId(user.getId());
    }

    /**
     * Get user's badges
     */
    public List<Badge> getUserBadges(String email) throws Exception {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        return badgeRepository.findByUserId(user.getId());
    }

    /**
     * Update course progress
     */
    public void updateCourseProgress(String email, String courseId, int progressPercentage) throws Exception {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        String userId = user.getId();

        UserProgress progress = userProgressRepository
                .findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new Exception("Progress record not found"));

        progress.setProgress(progressPercentage);

        userProgressRepository.save(progress);
    }

    /**
     * Get user's total completed courses
     */
    public long getCompletedCoursesCount(String email) throws Exception {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new Exception("User not found"));

        return userProgressRepository.countByUserIdAndCompleted(user.getId(), true);
    }

    /**
     * Get all available courses
     */
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
}