package com.campusquest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse {
    private String id;
    private String email;
    private String fullName;
    private int level;
    private long totalXP;
    private int currentLevelXP;
    private int dailyStreak;
    private int badges;
}
