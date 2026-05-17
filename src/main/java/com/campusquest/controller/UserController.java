package com.campusquest.controller;

import com.campusquest.dto.UserResponse;
import com.campusquest.entity.Badge;
import com.campusquest.entity.UserProgress;
import com.campusquest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class UserController {
    
    @Autowired
    private UserService userService;
    
    /**
     * GET /api/users/profile
     * Get current user's profile
     */
    @GetMapping("/profile")
    public ResponseEntity<UserResponse> getProfile(Principal principal) {
        try {
            // The principal contains the authenticated user's email
            String userId = principal.getName();
            UserResponse response = userService.getUserProfile(userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * GET /api/users/{userId}/profile
     * Get any user's profile
     */
    @GetMapping("/{userId}/profile")
    public ResponseEntity<UserResponse> getUserProfile(@PathVariable String userId) {
        try {
            UserResponse response = userService.getUserProfile(userId);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    /**
     * GET /api/users/courses
     * Get current user's enrolled courses
     */
    @GetMapping("/courses")
    public ResponseEntity<List<UserProgress>> getUserCourses(Principal principal) {
        try {
            String userId = principal.getName();
            List<UserProgress> courses = userService.getUserCourses(userId);
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * GET /api/users/badges
     * Get current user's badges
     */
    @GetMapping("/badges")
    public ResponseEntity<List<Badge>> getUserBadges(Principal principal) {
        try {
            String userId = principal.getName();
            List<Badge> badges = userService.getUserBadges(userId);
            return ResponseEntity.ok(badges);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
