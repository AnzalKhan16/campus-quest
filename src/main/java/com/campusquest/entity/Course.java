package com.campusquest.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "courses")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Course {
    @Id
    private String id;
    
    private String title;
    private String description;
    private String category;
    private int difficulty; // 1-5
    private int xpReward;
    
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public Course(String title, String description, String category, int difficulty, int xpReward) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.difficulty = difficulty;
        this.xpReward = xpReward;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
