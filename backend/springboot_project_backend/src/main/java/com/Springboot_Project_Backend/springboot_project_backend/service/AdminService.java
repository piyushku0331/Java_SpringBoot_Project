package com.Springboot_Project_Backend.springboot_project_backend.service;

import com.Springboot_Project_Backend.springboot_project_backend.dto.AdminDashboardStats;
import com.Springboot_Project_Backend.springboot_project_backend.dto.AdminLoginRequest;
import com.Springboot_Project_Backend.springboot_project_backend.dto.AdminResponse;
import com.Springboot_Project_Backend.springboot_project_backend.entity.Admin;
import com.Springboot_Project_Backend.springboot_project_backend.entity.User;
import com.Springboot_Project_Backend.springboot_project_backend.exception.ResourceNotFoundException;
import com.Springboot_Project_Backend.springboot_project_backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AdminResponse authenticateAdmin(AdminLoginRequest loginRequest) {
        Optional<Admin> adminOpt = adminRepository.findByEmail(loginRequest.getEmail());
        
        if (adminOpt.isEmpty()) {
            throw new ResourceNotFoundException("Admin not found with email: " + loginRequest.getEmail());
        }
        
        Admin admin = adminOpt.get();
        
        if (admin.getStatus() != Admin.AdminStatus.ACTIVE) {
            throw new RuntimeException("Admin account is not active");
        }
        
        if (!passwordEncoder.matches(loginRequest.getPassword(), admin.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }
        
        // Update last login
        admin.setLastLogin(LocalDateTime.now());
        adminRepository.save(admin);
        
        return new AdminResponse(admin);
    }

    public AdminDashboardStats getDashboardStats() {
        long totalUsers = userRepository.count();
        long activeUsers = userRepository.countByStatus(User.UserStatus.ACTIVE);
        long suspendedUsers = userRepository.countByStatus(User.UserStatus.SUSPENDED);
        
        long totalAccounts = accountRepository.count();
        long totalLoans = loanRepository.count();
        long pendingLoans = loanRepository.countByStatus("PENDING");
        
        BigDecimal totalDeposits = accountRepository.getTotalBalance();
        BigDecimal totalLoanAmount = loanRepository.getTotalLoanAmount();
        
        long totalTransactions = transactionRepository.count();
        long todayTransactions = transactionRepository.countTransactionsToday(LocalDate.now());
        
        return new AdminDashboardStats(
            totalUsers, activeUsers, suspendedUsers,
            totalAccounts, totalLoans, pendingLoans,
            totalDeposits != null ? totalDeposits : BigDecimal.ZERO,
            totalLoanAmount != null ? totalLoanAmount : BigDecimal.ZERO,
            totalTransactions, todayTransactions
        );
    }

    public List<AdminResponse> getAllAdmins() {
        return adminRepository.findAll().stream()
                .map(AdminResponse::new)
                .collect(Collectors.toList());
    }

    public AdminResponse getAdminById(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));
        return new AdminResponse(admin);
    }

    public AdminResponse createAdmin(Admin admin) {
        if (adminRepository.existsByEmail(admin.getEmail())) {
            throw new RuntimeException("Admin already exists with email: " + admin.getEmail());
        }
        
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        Admin savedAdmin = adminRepository.save(admin);
        return new AdminResponse(savedAdmin);
    }

    public AdminResponse updateAdmin(Long id, Admin adminDetails) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));

        admin.setFirstName(adminDetails.getFirstName());
        admin.setLastName(adminDetails.getLastName());
        admin.setEmail(adminDetails.getEmail());
        admin.setPhoneNumber(adminDetails.getPhoneNumber());
        admin.setRole(adminDetails.getRole());
        admin.setStatus(adminDetails.getStatus());

        if (adminDetails.getPassword() != null && !adminDetails.getPassword().isEmpty()) {
            admin.setPassword(passwordEncoder.encode(adminDetails.getPassword()));
        }

        Admin updatedAdmin = adminRepository.save(admin);
        return new AdminResponse(updatedAdmin);
    }

    public void deleteAdmin(Long id) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));
        adminRepository.delete(admin);
    }

    public AdminResponse updateAdminStatus(Long id, Admin.AdminStatus status) {
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Admin not found with id: " + id));
        
        admin.setStatus(status);
        Admin updatedAdmin = adminRepository.save(admin);
        return new AdminResponse(updatedAdmin);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUserStatus(Long userId, User.UserStatus status) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        
        user.setStatus(status);
        return userRepository.save(user);
    }

    public void deleteUser(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
        userRepository.delete(user);
    }
}
