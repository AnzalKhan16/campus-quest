package com.campusquest.service;

import com.campusquest.dto.AuthResponse;
import com.campusquest.dto.LoginRequest;
import com.campusquest.dto.RegisterRequest;
import com.campusquest.entity.User;
import com.campusquest.repository.UserRepository;
import com.campusquest.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    /**
     * Register a new user
     */
    public AuthResponse register(RegisterRequest request) throws Exception {
        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new Exception("User already exists with this email");
        }
        
        // Create new user
        User user = new User(
            request.getEmail(),
            passwordEncoder.encode(request.getPassword()),
            request.getFullName()
        );
        
        // Save user to database
        User savedUser = userRepository.save(user);
        
        // Generate JWT token
        String token = jwtUtil.generateToken(savedUser.getEmail());
        
        // Return response
        return new AuthResponse(
            token,
            savedUser.getEmail(),
            savedUser.getFullName(),
            savedUser.getLevel(),
            savedUser.getTotalXP()
        );
    }
    
    /**
     * Login user with email and password
     */
    public AuthResponse login(LoginRequest request) throws Exception {
        // Find user by email
        Optional<User> userOptional = userRepository.findByEmail(request.getEmail());
        
        if (userOptional.isEmpty()) {
            throw new Exception("User not found");
        }
        
        User user = userOptional.get();
        
        // Check if password matches
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new Exception("Invalid password");
        }
        
        // Generate JWT token
        String token = jwtUtil.generateToken(user.getEmail());
        
        // Return response
        return new AuthResponse(
            token,
            user.getEmail(),
            user.getFullName(),
            user.getLevel(),
            user.getTotalXP()
        );
    }
    
    /**
     * Get user by email
     */
    public User getUserByEmail(String email) throws Exception {
        Optional<User> userOptional = userRepository.findByEmail(email);
        
        if (userOptional.isEmpty()) {
            throw new Exception("User not found");
        }
        
        return userOptional.get();
    }
}
