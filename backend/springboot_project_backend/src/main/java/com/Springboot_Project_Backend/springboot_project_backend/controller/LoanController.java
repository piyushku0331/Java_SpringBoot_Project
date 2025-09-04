package com.Springboot_Project_Backend.springboot_project_backend.controller;

import com.Springboot_Project_Backend.springboot_project_backend.entity.Loan;
import com.Springboot_Project_Backend.springboot_project_backend.service.LoanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LoanController {

    @Autowired
    private LoanService loanService;

    @PostMapping("/loans/apply")
    public ResponseEntity<?> applyForLoan(@RequestBody Map<String, Object> request) {
        try {
            Long customerId = Long.valueOf(request.get("customerId").toString());
            String loanType = request.get("loanType").toString();
            BigDecimal principalAmount = new BigDecimal(request.get("principalAmount").toString());
            BigDecimal interestRate = new BigDecimal(request.get("interestRate").toString());
            Integer termMonths = Integer.valueOf(request.get("termMonths").toString());
            String purpose = request.get("purpose").toString();
            Long accountId = Long.valueOf(request.get("accountId").toString());
            BigDecimal monthlyIncome = new BigDecimal(request.get("monthlyIncome").toString());
            String employmentStatus = request.get("employmentStatus").toString();
            String employerName = request.getOrDefault("employerName", "").toString();
            BigDecimal workExperience = new BigDecimal(request.get("workExperience").toString());
            BigDecimal existingDebts = new BigDecimal(request.getOrDefault("existingDebts", "0").toString());
            BigDecimal collateralValue = new BigDecimal(request.getOrDefault("collateralValue", "0").toString());

            Loan loan = loanService.applyForLoanDetailed(customerId, loanType, principalAmount, 
                interestRate, termMonths, purpose, accountId, monthlyIncome, employmentStatus,
                employerName, workExperience, existingDebts, collateralValue);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Loan application submitted successfully");
            response.put("loan", loan);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/loans/status")
    public ResponseEntity<?> getLoanStatus(@RequestParam(required = false) Long userId) {
        try {
            if (userId != null) {
                List<Loan> loans = loanService.getLoansByUserId(userId);
                return ResponseEntity.ok(loans);
            } else {
                Map<String, String> error = new HashMap<>();
                error.put("error", "userId parameter is required");
                return ResponseEntity.badRequest().body(error);
            }
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/customer/loans")
    public ResponseEntity<?> getCustomerLoans(@RequestParam Long userId) {
        try {
            List<Loan> loans = loanService.getLoansByUserId(userId);
            return ResponseEntity.ok(loans);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/customer/loans/{loanId}")
    public ResponseEntity<?> getLoanDetails(@PathVariable Long loanId) {
        try {
            // You'll need to implement getLoanById in LoanService
            Map<String, String> error = new HashMap<>();
            error.put("error", "Loan details endpoint not yet implemented");
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/customer/loans/{loanId}/payments")
    public ResponseEntity<?> makeLoanPayment(@PathVariable Long loanId, @RequestBody Map<String, Object> paymentData) {
        try {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Loan payment endpoint not yet implemented");
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/customer/loans/{loanId}/payment-schedule")
    public ResponseEntity<?> getLoanPaymentSchedule(@PathVariable Long loanId) {
        try {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Payment schedule endpoint not yet implemented");
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PutMapping("/loans/{loanNumber}/status")
    public ResponseEntity<?> updateLoanStatus(@PathVariable String loanNumber, @RequestBody Map<String, String> request) {
        try {
            String status = request.get("status");
            Loan updatedLoan = loanService.updateLoanStatus(loanNumber, status);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Loan status updated successfully");
            response.put("loan", updatedLoan);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
