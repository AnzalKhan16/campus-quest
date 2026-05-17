package com.campusquest.service;

import com.campusquest.dto.LeaderboardEntry;
import com.campusquest.entity.User;
import com.campusquest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LeaderboardService {
    
    @Autowired
    private UserRepository userRepository;
    
    /**
     * Get top 10 users by XP/Level (weekly leaderboard)
     */
    public List<LeaderboardEntry> getWeeklyLeaderboard() {
        List<User> users = userRepository.findAllByOrderByLevelDescTotalXPDesc();
        
        List<LeaderboardEntry> leaderboard = new ArrayList<>();
        
        for (int i = 0; i < Math.min(10, users.size()); i++) {
            User user = users.get(i);
            LeaderboardEntry entry = new LeaderboardEntry(
                i + 1, // rank (1-indexed)
                user.getId(),
                user.getFullName(),
                user.getLevel(),
                user.getTotalXP(),
                user.getDailyStreak(),
                0 // rankDelta would come from previous week's data
            );
            leaderboard.add(entry);
        }
        
        return leaderboard;
    }
    
    /**
     * Get user's rank on leaderboard
     */
    public int getUserRank(String userId) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));
        
        // Count how many users have higher XP+Level combination
        long rank = userRepository.countByTotalXPGreaterThan(user.getTotalXP());
        
        return (int) rank + 1;
    }
    
    /**
     * Get users near you on the leaderboard (5 above, 5 below)
     */
    public List<LeaderboardEntry> getNearbyUsers(String userId) throws Exception {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new Exception("User not found"));
        
        int userRank = getUserRank(userId);
        List<User> allUsers = userRepository.findAllByOrderByLevelDescTotalXPDesc();
        
        List<LeaderboardEntry> nearby = new ArrayList<>();
        
        // Get 5 above and 5 below
        int startIdx = Math.max(0, userRank - 6);
        int endIdx = Math.min(allUsers.size(), userRank + 5);
        
        for (int i = startIdx; i < endIdx; i++) {
            User u = allUsers.get(i);
            nearby.add(new LeaderboardEntry(
                i + 1,
                u.getId(),
                u.getFullName(),
                u.getLevel(),
                u.getTotalXP(),
                u.getDailyStreak(),
                0
            ));
        }
        
        return nearby;
    }
    
    /**
     * Get fastest climbers (users with highest XP gained this week)
     * Note: This is a simple implementation. In production, track weekly XP gain.
     */
    public List<LeaderboardEntry> getFastestClimbers() {
        List<User> users = userRepository.findAllByOrderByLevelDescTotalXPDesc();
        
        List<LeaderboardEntry> fastest = new ArrayList<>();
        
        for (int i = 0; i < Math.min(5, users.size()); i++) {
            User user = users.get(i);
            fastest.add(new LeaderboardEntry(
                i + 1,
                user.getId(),
                user.getFullName(),
                user.getLevel(),
                user.getTotalXP(),
                user.getDailyStreak(),
                0
            ));
        }
        
        return fastest;
    }
}
