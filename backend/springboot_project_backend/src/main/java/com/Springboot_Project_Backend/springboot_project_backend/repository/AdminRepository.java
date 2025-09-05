package com.Springboot_Project_Backend.springboot_project_backend.repository;

import com.Springboot_Project_Backend.springboot_project_backend.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    
    Optional<Admin> findByEmail(String email);
    
    List<Admin> findByStatus(Admin.AdminStatus status);
    
    List<Admin> findByRole(Admin.AdminRole role);
    
    @Query("SELECT a FROM Admin a WHERE a.status = :status AND a.role = :role")
    List<Admin> findByStatusAndRole(@Param("status") Admin.AdminStatus status, @Param("role") Admin.AdminRole role);
    
    @Query("SELECT a FROM Admin a WHERE a.lastLogin < :dateTime")
    List<Admin> findInactiveAdmins(@Param("dateTime") LocalDateTime dateTime);
    
    @Query("SELECT COUNT(a) FROM Admin a WHERE a.status = 'ACTIVE'")
    long countActiveAdmins();
    
    boolean existsByEmail(String email);
}
