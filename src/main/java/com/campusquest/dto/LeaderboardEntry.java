package com.campusquest.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaderboardEntry {
    private int rank;
    private String userId;
    private String fullName;
    private int level;
    private long totalXP;
    private int dailyStreak;
    private int rankDelta; // how much rank changed this week
}
