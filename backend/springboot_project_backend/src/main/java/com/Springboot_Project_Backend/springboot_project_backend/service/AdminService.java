package com.Springboot_Project_Backend.springboot_project_backend.service;

import com.Springboot_Project_Backend.springboot_project_backend.dto.AdminDashboardStats;
import com.Springboot_Project_Backend.springboot_project_backend.dto.AdminLoginRequest;
import com.Springboot_Project_Backend.springboot_project_backend.dto.AdminResponse;
import com.Springboot_Project_Backend.springboot_project_backend.entity.Admin;
import com.Springboot_Project_Backend.springboot_project_backend.entity.User;
import com.Springboot_Project_Backend.springboot_project_backend.entity.Loan;
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
        try {
            System.out.println("AdminService: Starting getDashboardStats...");
            
            // Initialize all variables with default values
            long totalUsers = 0;
            long activeUsers = 0;
            long suspendedUsers = 0;
            long totalAccounts = 0;
            long totalLoans = 0;
            long pendingLoans = 0;
            BigDecimal totalDeposits = BigDecimal.ZERO;
            BigDecimal totalLoanAmount = BigDecimal.ZERO;
            long totalTransactions = 0;
            long todayTransactions = 0;
            
            System.out.println("AdminService: Counting users...");
            try {
                totalUsers = userRepository.count();
                activeUsers = userRepository.countByStatus(User.UserStatus.ACTIVE);
                suspendedUsers = userRepository.countByStatus(User.UserStatus.SUSPENDED);
                System.out.println("AdminService: Users - Total: " + totalUsers + ", Active: " + activeUsers + ", Suspended: " + suspendedUsers);
            } catch (Exception e) {
                System.err.println("AdminService: Error counting users: " + e.getMessage());
            }
            
            System.out.println("AdminService: Counting accounts...");
            try {
                totalAccounts = accountRepository.count();
                System.out.println("AdminService: Total accounts: " + totalAccounts);
            } catch (Exception e) {
                System.err.println("AdminService: Error counting accounts: " + e.getMessage());
            }
            
            System.out.println("AdminService: Counting loans...");
            try {
                totalLoans = loanRepository.count();
                System.out.println("AdminService: Total loans: " + totalLoans);
            } catch (Exception e) {
                System.err.println("AdminService: Error counting loans: " + e.getMessage());
            }
            
            // Use enum instead of string for loan status
            System.out.println("AdminService: Counting pending loans...");
            try {
                pendingLoans = loanRepository.countByStatus(Loan.LoanStatus.PENDING);
                System.out.println("AdminService: Pending loans: " + pendingLoans);
            } catch (Exception e) {
                System.err.println("AdminService: Error counting pending loans: " + e.getMessage());
            }
            
            System.out.println("AdminService: Getting total deposits...");
            try {
                BigDecimal deposits = accountRepository.getTotalBalance();
                totalDeposits = deposits != null ? deposits : BigDecimal.ZERO;
                System.out.println("AdminService: Total deposits: " + totalDeposits);
            } catch (Exception e) {
                System.err.println("AdminService: Error getting total deposits: " + e.getMessage());
            }
            
            System.out.println("AdminService: Getting total loan amount...");
            try {
                BigDecimal loanAmount = loanRepository.getTotalLoanAmount();
                totalLoanAmount = loanAmount != null ? loanAmount : BigDecimal.ZERO;
                System.out.println("AdminService: Total loan amount: " + totalLoanAmount);
            } catch (Exception e) {
                System.err.println("AdminService: Error getting total loan amount: " + e.getMessage());
            }
            
            System.out.println("AdminService: Counting transactions...");
            try {
                totalTransactions = transactionRepository.count();
                System.out.println("AdminService: Total transactions: " + totalTransactions);
            } catch (Exception e) {
                System.err.println("AdminService: Error counting transactions: " + e.getMessage());
            }
            
            System.out.println("AdminService: Counting today's transactions...");
            try {
                todayTransactions = transactionRepository.countTransactionsToday(LocalDate.now());
                System.out.println("AdminService: Today's transactions: " + todayTransactions);
            } catch (Exception e) {
                System.err.println("AdminService: Error counting today's transactions: " + e.getMessage());
            }
            
            System.out.println("AdminService: Creating AdminDashboardStats object...");
            AdminDashboardStats stats = new AdminDashboardStats(
                totalUsers, activeUsers, suspendedUsers,
                totalAccounts, totalLoans, pendingLoans,
                totalDeposits != null ? totalDeposits : BigDecimal.ZERO,
                totalLoanAmount != null ? totalLoanAmount : BigDecimal.ZERO,
                totalTransactions, todayTransactions
            );
            
            System.out.println("AdminService: Successfully created dashboard stats");
            return stats;
            
        } catch (Exception e) {
            System.err.println("AdminService: Error in getDashboardStats: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
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
