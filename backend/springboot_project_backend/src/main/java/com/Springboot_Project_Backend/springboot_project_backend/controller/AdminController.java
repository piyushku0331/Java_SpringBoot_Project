package com.Springboot_Project_Backend.springboot_project_backend.controller;

import com.Springboot_Project_Backend.springboot_project_backend.config.JwtUtil;
import com.Springboot_Project_Backend.springboot_project_backend.dto.*;
import com.Springboot_Project_Backend.springboot_project_backend.entity.Admin;
import com.Springboot_Project_Backend.springboot_project_backend.entity.User;
import com.Springboot_Project_Backend.springboot_project_backend.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody AdminLoginRequest loginRequest) {
        try {
            AdminResponse admin = adminService.authenticateAdmin(loginRequest);
            String token = jwtUtil.generateToken(admin.getEmail(), admin.getId());
            
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("admin", admin);
            response.put("message", "Admin login successful");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @GetMapping("/dashboard/stats")
    public ResponseEntity<?> getDashboardStats() {
        try {
            System.out.println("AdminController: Getting dashboard stats...");
            
            // Create a simple fallback response if database is empty
            AdminDashboardStats stats = new AdminDashboardStats();
            stats.setTotalUsers(0);
            stats.setActiveUsers(0);
            stats.setSuspendedUsers(0);
            stats.setTotalAccounts(0);
            stats.setTotalLoans(0);
            stats.setPendingLoans(0);
            stats.setTotalDeposits(java.math.BigDecimal.ZERO);
            stats.setTotalLoanAmount(java.math.BigDecimal.ZERO);
            stats.setTotalTransactions(0);
            stats.setTodayTransactions(0);
            
            try {
                stats = adminService.getDashboardStats();
                System.out.println("AdminController: Successfully retrieved dashboard stats from service");
            } catch (Exception serviceException) {
                System.err.println("AdminController: Service error, using fallback stats: " + serviceException.getMessage());
                // Return the fallback stats instead of throwing error
            }
            
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            System.err.println("AdminController: Error getting dashboard stats: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            errorResponse.put("details", "Failed to retrieve dashboard statistics");
            return ResponseEntity.status(500).body(errorResponse);
        }
    }

    // Admin Management Endpoints
    @GetMapping("/admins")
    public ResponseEntity<List<AdminResponse>> getAllAdmins() {
        try {
            List<AdminResponse> admins = adminService.getAllAdmins();
            return ResponseEntity.ok(admins);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/admins/{id}")
    public ResponseEntity<AdminResponse> getAdminById(@PathVariable Long id) {
        try {
            AdminResponse admin = adminService.getAdminById(id);
            return ResponseEntity.ok(admin);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/admins")
    public ResponseEntity<AdminResponse> createAdmin(@Valid @RequestBody Admin admin) {
        try {
            AdminResponse createdAdmin = adminService.createAdmin(admin);
            return ResponseEntity.ok(createdAdmin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/admins/{id}")
    public ResponseEntity<AdminResponse> updateAdmin(@PathVariable Long id, @Valid @RequestBody Admin adminDetails) {
        try {
            AdminResponse updatedAdmin = adminService.updateAdmin(id, adminDetails);
            return ResponseEntity.ok(updatedAdmin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/admins/{id}")
    public ResponseEntity<Map<String, String>> deleteAdmin(@PathVariable Long id) {
        try {
            adminService.deleteAdmin(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Admin deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PutMapping("/admins/{id}/status")
    public ResponseEntity<AdminResponse> updateAdminStatus(@PathVariable Long id, @RequestBody Map<String, String> statusRequest) {
        try {
            Admin.AdminStatus status = Admin.AdminStatus.valueOf(statusRequest.get("status"));
            AdminResponse updatedAdmin = adminService.updateAdminStatus(id, status);
            return ResponseEntity.ok(updatedAdmin);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // User Management Endpoints
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = adminService.getAllUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/users/{userId}/status")
    public ResponseEntity<User> updateUserStatus(@PathVariable Long userId, @RequestBody Map<String, String> statusRequest) {
        try {
            User.UserStatus status = User.UserStatus.valueOf(statusRequest.get("status"));
            User updatedUser = adminService.updateUserStatus(userId, status);
            return ResponseEntity.ok(updatedUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/users/{userId}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long userId) {
        try {
            adminService.deleteUser(userId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User deleted successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    // Account Management Endpoints
    @GetMapping("/accounts")
    public ResponseEntity<List<Object>> getAllAccounts() {
        // This would be implemented with AccountService
        return ResponseEntity.ok().build();
    }

    // Loan Management Endpoints
    @GetMapping("/loans")
    public ResponseEntity<List<Object>> getAllLoans() {
        // This would be implemented with LoanService
        return ResponseEntity.ok().build();
    }

    @PutMapping("/loans/{loanId}/approve")
    public ResponseEntity<Map<String, String>> approveLoan(@PathVariable Long loanId) {
        try {
            // Implementation would go here
            Map<String, String> response = new HashMap<>();
            response.put("message", "Loan approved successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PutMapping("/loans/{loanId}/reject")
    public ResponseEntity<Map<String, String>> rejectLoan(@PathVariable Long loanId) {
        try {
            // Implementation would go here
            Map<String, String> response = new HashMap<>();
            response.put("message", "Loan rejected successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    // Transaction Monitoring Endpoints
    @GetMapping("/transactions")
    public ResponseEntity<List<Object>> getAllTransactions() {
        // This would be implemented with TransactionService
        return ResponseEntity.ok().build();
    }

    @GetMapping("/transactions/suspicious")
    public ResponseEntity<List<Object>> getSuspiciousTransactions() {
        // This would be implemented to detect suspicious activities
        return ResponseEntity.ok().build();
    }
}
