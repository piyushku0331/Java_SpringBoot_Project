package com.Springboot_Project_Backend.springboot_project_backend.dto;

import com.Springboot_Project_Backend.springboot_project_backend.entity.Admin;
import java.time.LocalDateTime;

public class AdminResponse {
    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private Admin.AdminRole role;
    private Admin.AdminStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime lastLogin;
    
    // Constructors
    public AdminResponse() {}
    
    public AdminResponse(Admin admin) {
        this.id = admin.getId();
        this.firstName = admin.getFirstName();
        this.lastName = admin.getLastName();
        this.email = admin.getEmail();
        this.phoneNumber = admin.getPhoneNumber();
        this.role = admin.getRole();
        this.status = admin.getStatus();
        this.createdAt = admin.getCreatedAt();
        this.lastLogin = admin.getLastLogin();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getFirstName() { return firstName; }
    public void setFirstName(String firstName) { this.firstName = firstName; }
    
    public String getLastName() { return lastName; }
    public void setLastName(String lastName) { this.lastName = lastName; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPhoneNumber() { return phoneNumber; }
    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }
    
    public Admin.AdminRole getRole() { return role; }
    public void setRole(Admin.AdminRole role) { this.role = role; }
    
    public Admin.AdminStatus getStatus() { return status; }
    public void setStatus(Admin.AdminStatus status) { this.status = status; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getLastLogin() { return lastLogin; }
    public void setLastLogin(LocalDateTime lastLogin) { this.lastLogin = lastLogin; }
}
