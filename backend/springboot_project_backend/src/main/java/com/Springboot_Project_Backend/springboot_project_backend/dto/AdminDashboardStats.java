package com.Springboot_Project_Backend.springboot_project_backend.dto;

import java.math.BigDecimal;

public class AdminDashboardStats {
    private long totalUsers;
    private long activeUsers;
    private long suspendedUsers;
    private long totalAccounts;
    private long totalLoans;
    private long pendingLoans;
    private BigDecimal totalDeposits;
    private BigDecimal totalLoanAmount;
    private long totalTransactions;
    private long todayTransactions;
    
    // Constructors
    public AdminDashboardStats() {}
    
    public AdminDashboardStats(long totalUsers, long activeUsers, long suspendedUsers, 
                              long totalAccounts, long totalLoans, long pendingLoans,
                              BigDecimal totalDeposits, BigDecimal totalLoanAmount,
                              long totalTransactions, long todayTransactions) {
        this.totalUsers = totalUsers;
        this.activeUsers = activeUsers;
        this.suspendedUsers = suspendedUsers;
        this.totalAccounts = totalAccounts;
        this.totalLoans = totalLoans;
        this.pendingLoans = pendingLoans;
        this.totalDeposits = totalDeposits;
        this.totalLoanAmount = totalLoanAmount;
        this.totalTransactions = totalTransactions;
        this.todayTransactions = todayTransactions;
    }
    
    // Getters and Setters
    public long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }
    
    public long getActiveUsers() { return activeUsers; }
    public void setActiveUsers(long activeUsers) { this.activeUsers = activeUsers; }
    
    public long getSuspendedUsers() { return suspendedUsers; }
    public void setSuspendedUsers(long suspendedUsers) { this.suspendedUsers = suspendedUsers; }
    
    public long getTotalAccounts() { return totalAccounts; }
    public void setTotalAccounts(long totalAccounts) { this.totalAccounts = totalAccounts; }
    
    public long getTotalLoans() { return totalLoans; }
    public void setTotalLoans(long totalLoans) { this.totalLoans = totalLoans; }
    
    public long getPendingLoans() { return pendingLoans; }
    public void setPendingLoans(long pendingLoans) { this.pendingLoans = pendingLoans; }
    
    public BigDecimal getTotalDeposits() { return totalDeposits; }
    public void setTotalDeposits(BigDecimal totalDeposits) { this.totalDeposits = totalDeposits; }
    
    public BigDecimal getTotalLoanAmount() { return totalLoanAmount; }
    public void setTotalLoanAmount(BigDecimal totalLoanAmount) { this.totalLoanAmount = totalLoanAmount; }
    
    public long getTotalTransactions() { return totalTransactions; }
    public void setTotalTransactions(long totalTransactions) { this.totalTransactions = totalTransactions; }
    
    public long getTodayTransactions() { return todayTransactions; }
    public void setTodayTransactions(long todayTransactions) { this.todayTransactions = todayTransactions; }
}
