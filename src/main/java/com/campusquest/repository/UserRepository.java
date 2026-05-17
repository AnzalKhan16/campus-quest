package com.campusquest.repository;

import com.campusquest.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByEmail(String email);
    
    // Find top 10 users by total XP (for leaderboard)
    List<User> findTop10ByOrderByTotalXPDesc();
    
    // Find all users ordered by level and XP
    List<User> findAllByOrderByLevelDescTotalXPDesc();
    
    // Count users with total XP greater than given value
    long countByTotalXPGreaterThan(long xp);
}
