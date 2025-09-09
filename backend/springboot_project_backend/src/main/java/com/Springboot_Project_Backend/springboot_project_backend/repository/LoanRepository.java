package com.Springboot_Project_Backend.springboot_project_backend.repository;

import com.Springboot_Project_Backend.springboot_project_backend.entity.Loan;
import com.Springboot_Project_Backend.springboot_project_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByUser(User user);
    List<Loan> findByUserId(Long userId);
    Optional<Loan> findByLoanNumber(String loanNumber);
    boolean existsByLoanNumber(String loanNumber);
    
    @Query("SELECT COUNT(l) FROM Loan l WHERE l.status = ?1")
    long countByStatus(Loan.LoanStatus status);
    
    @Query("SELECT COALESCE(SUM(l.principalAmount), 0) FROM Loan l")
    BigDecimal getTotalLoanAmount();
}
