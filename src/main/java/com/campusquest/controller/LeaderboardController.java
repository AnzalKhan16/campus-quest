package com.campusquest.controller;

import com.campusquest.dto.LeaderboardEntry;
import com.campusquest.service.LeaderboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/leaderboard")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class LeaderboardController {
    
    @Autowired
    private LeaderboardService leaderboardService;
    
    /**
     * GET /api/leaderboard/weekly
     * Get top 10 users on leaderboard
     */
    @GetMapping("/weekly")
    public ResponseEntity<List<LeaderboardEntry>> getWeeklyLeaderboard() {
        try {
            List<LeaderboardEntry> leaderboard = leaderboardService.getWeeklyLeaderboard();
            return ResponseEntity.ok(leaderboard);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * GET /api/leaderboard/nearby
     * Get nearby users on leaderboard (5 above, 5 below current user)
     */
    @GetMapping("/nearby")
    public ResponseEntity<List<LeaderboardEntry>> getNearbyUsers(Principal principal) {
        try {
            String userId = principal.getName();
            List<LeaderboardEntry> nearby = leaderboardService.getNearbyUsers(userId);
            return ResponseEntity.ok(nearby);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * GET /api/leaderboard/fastest-climbers
     * Get fastest climbers this week
     */
    @GetMapping("/fastest-climbers")
    public ResponseEntity<List<LeaderboardEntry>> getFastestClimbers() {
        try {
            List<LeaderboardEntry> climbers = leaderboardService.getFastestClimbers();
            return ResponseEntity.ok(climbers);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * GET /api/leaderboard/rank
     * Get current user's rank
     */
    @GetMapping("/rank")
    public ResponseEntity<Integer> getUserRank(Principal principal) {
        try {
            String userId = principal.getName();
            int rank = leaderboardService.getUserRank(userId);
            return ResponseEntity.ok(rank);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
