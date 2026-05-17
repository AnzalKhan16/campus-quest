package com.campusquest.service;

import com.campusquest.entity.Badge;
import com.campusquest.entity.User;
import com.campusquest.entity.UserProgress;
import com.campusquest.repository.BadgeRepository;
import com.campusquest.repository.UserRepository;
import com.campusquest.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Service
public class GamificationService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BadgeRepository badgeRepository;
    
    @Autowired
    private UserProgressRepository userProgressRepository;
    
    // XP Thresholds for leveling up
    private static final int XP_PER_LEVEL = 1000;
    
    /**
     * Award XP to a user when they complete a course
     */
    public User awardXP(String userId, int xpAmount) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));
        
        // Add XP
        user.setTotalXP(user.getTotalXP() + xpAmount);
        user.setCurrentLevelXP(user.getCurrentLevelXP() + xpAmount);
        
        // Check for level up
        while (user.getCurrentLevelXP() >= XP_PER_LEVEL) {
            user.setLevel(user.getLevel() + 1);
            user.setCurrentLevelXP(user.getCurrentLevelXP() - XP_PER_LEVEL);
            
            // Award badge for level up
            awardBadge(userId, "Level " + user.getLevel(), 
                      "Reached level " + user.getLevel(), "🏆");
        }
        
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }
    
    /**
     * Update daily streak
     */
    public User updateDailyStreak(String userId) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));
        
        LocalDateTime lastActivity = user.getLastActivityDate();
        LocalDateTime now = LocalDateTime.now();
        
        if (lastActivity == null) {
            // First activity
            user.setDailyStreak(1);
        } else {
            // Check if activity was today or yesterday
            long daysBetween = ChronoUnit.DAYS.between(lastActivity.toLocalDate(), now.toLocalDate());
            
            if (daysBetween == 0) {
                // Same day, no change to streak
            } else if (daysBetween == 1) {
                // Next day, continue streak
                user.setDailyStreak(user.getDailyStreak() + 1);
            } else {
                // Break in streak
                user.setDailyStreak(1);
            }
        }
        
        user.setLastActivityDate(now);
        user.setUpdatedAt(LocalDateTime.now());
        
        return userRepository.save(user);
    }
    
    /**
     * Award a badge to user
     */
    public Badge awardBadge(String userId, String badgeName, String description, String icon) throws Exception {
        // Check if user already has this badge
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));
        
        Badge badge = new Badge(userId, badgeName, description, icon);
        Badge savedBadge = badgeRepository.save(badge);
        
        // Update user's badge count
        user.setBadges(user.getBadges() + 1);
        userRepository.save(user);
        
        return savedBadge;
    }
    
    /**
     * Complete a course for a user
     */
    public User completeCourse(String userId, String courseId, int xpReward) throws Exception {
        // Mark course as completed
        UserProgress progress = userProgressRepository.findByUserIdAndCourseId(userId, courseId)
                .orElseThrow(() -> new Exception("Progress record not found"));
        
        progress.setProgress(100);
        progress.setCompleted(true);
        progress.setCompletedAt(LocalDateTime.now());
        userProgressRepository.save(progress);
        
        // Award XP
        User user = awardXP(userId, xpReward);
        
        // Update streak
        user = updateDailyStreak(userId);
        
        return user;
    }
    
    /**
     * Get XP required for next level
     */
    public int getXPForNextLevel(User user) {
        return XP_PER_LEVEL - user.getCurrentLevelXP();
    }
    
    /**
     * Get progress percentage towards next level
     */
    public double getLevelProgress(User user) {
        return (double) user.getCurrentLevelXP() / XP_PER_LEVEL * 100;
    }
}
