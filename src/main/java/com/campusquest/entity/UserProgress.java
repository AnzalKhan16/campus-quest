package com.campusquest.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "user_progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserProgress {
    @Id
    private String id;
    
    private String userId;
    private String courseId;
    private int progress; // 0-100
    private boolean completed;
    private LocalDateTime completedAt;
    
    private LocalDateTime startedAt;
    private LocalDateTime updatedAt;
    
    public UserProgress(String userId, String courseId) {
        this.userId = userId;
        this.courseId = courseId;
        this.progress = 0;
        this.completed = false;
        this.startedAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
