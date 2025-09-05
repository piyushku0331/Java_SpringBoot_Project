package com.Springboot_Project_Backend.springboot_project_backend.repository;

import com.Springboot_Project_Backend.springboot_project_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    
    @Query("SELECT COUNT(u) FROM User u WHERE u.status = ?1")
    long countByStatus(User.UserStatus status);
}
