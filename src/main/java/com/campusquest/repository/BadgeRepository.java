package com.campusquest.repository;

import com.campusquest.entity.Badge;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BadgeRepository extends MongoRepository<Badge, String> {
    List<Badge> findByUserId(String userId);
    long countByUserId(String userId);
}
