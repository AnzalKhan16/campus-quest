package com.campusquest.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;
    
    private String email;
    private String password;
    private String fullName;
    private String profileImage;
    
    // Gamification fields
    private int level;
    private long totalXP;
    private int currentLevelXP;
    private int dailyStreak;
    private LocalDateTime lastActivityDate;
    private int badges;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public User(String email, String password, String fullName) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.level = 1;
        this.totalXP = 0;
        this.currentLevelXP = 0;
        this.dailyStreak = 0;
        this.badges = 0;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
