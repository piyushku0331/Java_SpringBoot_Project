package com.Springboot_Project_Backend.springboot_project_backend.service;

import com.Springboot_Project_Backend.springboot_project_backend.entity.Loan;
import com.Springboot_Project_Backend.springboot_project_backend.entity.User;
import com.Springboot_Project_Backend.springboot_project_backend.repository.LoanRepository;
import com.Springboot_Project_Backend.springboot_project_backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class LoanService {

    @Autowired
    private LoanRepository loanRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Loan> getLoansByUserId(Long userId) {
        return loanRepository.findByUserId(userId);
    }

    public Loan getLoanByNumber(String loanNumber) {
        Optional<Loan> loanOpt = loanRepository.findByLoanNumber(loanNumber);
        if (loanOpt.isEmpty()) {
            throw new RuntimeException("Loan not found");
        }
        return loanOpt.get();
    }

    public Loan applyForLoan(Long userId, String loanType, BigDecimal amount, Integer termMonths) {
        Optional<User> userOpt = userRepository.findById(userId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = userOpt.get();
        
        Loan loan = new Loan();
        loan.setUser(user);
        loan.setLoanNumber(generateLoanNumber());
        loan.setLoanType(Loan.LoanType.valueOf(loanType.toUpperCase()));
        loan.setPrincipalAmount(amount);
        loan.setInterestRate(calculateInterestRate(loanType));
        loan.setTermMonths(termMonths);
        loan.setStatus(Loan.LoanStatus.PENDING);
        loan.setApplicationDate(LocalDate.now());

        return loanRepository.save(loan);
    }

    public Loan applyForLoanDetailed(Long customerId, String loanType, BigDecimal principalAmount, 
                                   BigDecimal interestRate, Integer termMonths, String purpose, 
                                   Long accountId, BigDecimal monthlyIncome, String employmentStatus,
                                   String employerName, BigDecimal workExperience, BigDecimal existingDebts,
                                   BigDecimal collateralValue) {
        Optional<User> userOpt = userRepository.findById(customerId);
        if (userOpt.isEmpty()) {
            throw new RuntimeException("Customer not found");
        }

        User user = userOpt.get();
        
        Loan loan = new Loan();
        loan.setUser(user);
        loan.setLoanNumber(generateLoanNumber());
        loan.setLoanType(Loan.LoanType.valueOf(loanType.toUpperCase()));
        loan.setPrincipalAmount(principalAmount);
        loan.setInterestRate(interestRate);
        loan.setTermMonths(termMonths);
        loan.setStatus(Loan.LoanStatus.PENDING);
        loan.setApplicationDate(LocalDate.now());
        
        // Calculate monthly payment
        BigDecimal monthlyPayment = calculateMonthlyPayment(principalAmount, interestRate, termMonths);
        loan.setMonthlyPayment(monthlyPayment);

        return loanRepository.save(loan);
    }

    private BigDecimal calculateMonthlyPayment(BigDecimal principal, BigDecimal annualRate, Integer termMonths) {
        if (annualRate.compareTo(BigDecimal.ZERO) == 0) {
            return principal.divide(new BigDecimal(termMonths), 2, java.math.RoundingMode.HALF_UP);
        }
        
        BigDecimal monthlyRate = annualRate.divide(new BigDecimal("100")).divide(new BigDecimal("12"), 10, java.math.RoundingMode.HALF_UP);
        BigDecimal onePlusRate = BigDecimal.ONE.add(monthlyRate);
        BigDecimal compound = onePlusRate.pow(termMonths);
        
        BigDecimal numerator = principal.multiply(monthlyRate).multiply(compound);
        BigDecimal denominator = compound.subtract(BigDecimal.ONE);
        
        return numerator.divide(denominator, 2, java.math.RoundingMode.HALF_UP);
    }

    private String generateLoanNumber() {
        String loanNumber;
        do {
            loanNumber = "LOAN" + String.format("%08d", new Random().nextInt(100000000));
        } while (loanRepository.existsByLoanNumber(loanNumber));
        
        return loanNumber;
    }

    private BigDecimal calculateInterestRate(String loanType) {
        switch (loanType.toUpperCase()) {
            case "HOME":
                return new BigDecimal("3.5");
            case "CAR":
                return new BigDecimal("5.0");
            case "PERSONAL":
                return new BigDecimal("8.0");
            default:
                return new BigDecimal("6.0");
        }
    }

    public Loan updateLoanStatus(String loanNumber, String status) {
        Loan loan = getLoanByNumber(loanNumber);
        loan.setStatus(Loan.LoanStatus.valueOf(status.toUpperCase()));
        if ("APPROVED".equals(status)) {
            loan.setApprovalDate(LocalDate.now());
        }
        return loanRepository.save(loan);
    }
}
