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
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * GET /api/users/profile
     * Get current user's profile
     */
    @GetMapping("/profile")
    public ResponseEntity<?> getProfile(Principal principal) {

        try {

            String email = principal.getName();

            UserResponse response =
                    userService.getUserProfile(email);

            return ResponseEntity.ok(response);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.badRequest()
                    .body("Failed to load profile: " + e.getMessage());
        }
    }

    /**
     * GET /api/users/courses
     * Get current user's enrolled courses
     */
    @GetMapping("/courses")
    public ResponseEntity<?> getUserCourses(Principal principal) {

        try {

            String email = principal.getName();

            List<UserProgress> courses =
                    userService.getUserCourses(email);

            return ResponseEntity.ok(courses);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.badRequest()
                    .body("Failed to load courses: " + e.getMessage());
        }
    }

    /**
     * GET /api/users/badges
     * Get current user's badges
     */
    @GetMapping("/badges")
    public ResponseEntity<?> getUserBadges(Principal principal) {

        try {

            String email = principal.getName();

            List<Badge> badges =
                    userService.getUserBadges(email);

            return ResponseEntity.ok(badges);

        } catch (Exception e) {

            e.printStackTrace();

            return ResponseEntity.badRequest()
                    .body("Failed to load badges: " + e.getMessage());
        }
    }
}