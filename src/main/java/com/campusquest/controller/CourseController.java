package com.campusquest.controller;

import com.campusquest.entity.Course;
import com.campusquest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/courses")

public class CourseController {
    
    @Autowired
    private UserService userService;
    
    /**
     * GET /api/courses
     * Get all available courses
     */
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        try {
            List<Course> courses = userService.getAllCourses();
            return ResponseEntity.ok(courses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    /**
     * POST /api/courses/{courseId}/enroll
     * Enroll user in a course
     */
    @PostMapping("/{courseId}/enroll")
    public ResponseEntity<String> enrollCourse(@PathVariable String courseId, Principal principal) {
        try {
            String userId = principal.getName();
            userService.enrollCourse(userId, courseId);
            return ResponseEntity.ok("Enrolled successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    
    /**
     * PUT /api/courses/{courseId}/progress
     * Update course progress
     */
    @PutMapping("/{courseId}/progress")
    public ResponseEntity<String> updateProgress(
            @PathVariable String courseId,
            @RequestParam int progress,
            Principal principal) {
        try {
            String userId = principal.getName();
            userService.updateCourseProgress(userId, courseId, progress);
            return ResponseEntity.ok("Progress updated");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
