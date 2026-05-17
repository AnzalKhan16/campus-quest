package com.campusquest.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "badges")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Badge {
    @Id
    private String id;
    
    private String userId;
    private String badgeName;
    private String description;
    private String badgeIcon;
    
    private LocalDateTime earnedAt;
    
    public Badge(String userId, String badgeName, String description, String badgeIcon) {
        this.userId = userId;
        this.badgeName = badgeName;
        this.description = description;
        this.badgeIcon = badgeIcon;
        this.earnedAt = LocalDateTime.now();
    }
}
