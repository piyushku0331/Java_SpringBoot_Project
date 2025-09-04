package com.Springboot_Project_Backend.springboot_project_backend.repository;

import com.Springboot_Project_Backend.springboot_project_backend.entity.Loan;
import com.Springboot_Project_Backend.springboot_project_backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface LoanRepository extends JpaRepository<Loan, Long> {
    List<Loan> findByUser(User user);
    List<Loan> findByUserId(Long userId);
    Optional<Loan> findByLoanNumber(String loanNumber);
    boolean existsByLoanNumber(String loanNumber);
}
