package com.Springboot_Project_Backend.springboot_project_backend.controller;

import com.Springboot_Project_Backend.springboot_project_backend.entity.Transaction;
import com.Springboot_Project_Backend.springboot_project_backend.entity.User;
import com.Springboot_Project_Backend.springboot_project_backend.service.TransactionService;
import com.Springboot_Project_Backend.springboot_project_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private UserService userService;

    private User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new RuntimeException("User not authenticated");
        }
        String email = authentication.getName();
        return userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @GetMapping("/transactions")
    public ResponseEntity<?> getTransactions(@RequestParam(required = false) Long accountId) {
        try {
            User currentUser = getCurrentUser();
            List<Transaction> transactions;

            if (accountId != null) {
                // Verify the account belongs to the current user
                if (!transactionService.isAccountOwnedByUser(accountId, currentUser.getId())) {
                    Map<String, String> error = new HashMap<>();
                    error.put("error", "Access denied: Account does not belong to user");
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
                }
                transactions = transactionService.getTransactionsByAccountId(accountId);
            } else {
                // Return transactions for all user's accounts
                transactions = transactionService.getTransactionsByUserId(currentUser.getId());
            }
            return ResponseEntity.ok(transactions);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/transactions/{transactionId}")
    public ResponseEntity<?> getTransactionDetails(@PathVariable Long transactionId) {
        try {
            Transaction transaction = transactionService.getTransactionById(transactionId);
            return ResponseEntity.ok(transaction);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/accounts/{accountId}/transactions")
    public ResponseEntity<?> getAccountTransactions(@PathVariable String accountId) {
        try {
            // Validate accountId is numeric
            if (!accountId.matches("\\d+")) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid account ID format");
                return ResponseEntity.badRequest().body(error);
            }

            Long accountIdLong = Long.parseLong(accountId);
            List<Transaction> transactions = transactionService.getTransactionsByAccountId(accountIdLong);
            return ResponseEntity.ok(transactions);
        } catch (NumberFormatException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid account ID format");
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/transactions")
    public ResponseEntity<?> createTransaction(@RequestBody Map<String, Object> request) {
        try {
            System.out.println("Create transaction request received: " + request);

            // Validate required fields
            if (request.get("accountId") == null || request.get("transactionType") == null ||
                request.get("amount") == null || request.get("description") == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Missing required fields: accountId, transactionType, amount, description");
                System.out.println("Validation failed: Missing required fields");
                return ResponseEntity.badRequest().body(error);
            }

            Long accountId = Long.parseLong(request.get("accountId").toString());
            String transactionType = request.get("transactionType").toString();
            BigDecimal amount = new BigDecimal(request.get("amount").toString());
            String description = request.get("description").toString();

            System.out.println("Parsed data - AccountId: " + accountId + ", Type: " + transactionType + ", Amount: " + amount);

            Transaction transaction = transactionService.createTransaction(
                accountId, transactionType, amount, description);

            System.out.println("Transaction created successfully with ID: " + transaction.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Transaction created successfully");
            response.put("transaction", transaction);

            return ResponseEntity.ok(response);
        } catch (NumberFormatException e) {
            System.out.println("Number format exception: " + e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid number format for accountId or amount");
            return ResponseEntity.badRequest().body(error);
        } catch (IllegalArgumentException e) {
            System.out.println("Illegal argument exception: " + e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid transaction type");
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            System.out.println("Exception creating transaction: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/transactions/transfer")
    public ResponseEntity<?> transferFunds(@RequestBody Map<String, Object> request) {
        try {
            // Validate required fields
            if (request.get("fromAccountId") == null || request.get("toAccountNumber") == null ||
                request.get("amount") == null || request.get("description") == null) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Missing required fields: fromAccountId, toAccountNumber, amount, description");
                return ResponseEntity.badRequest().body(error);
            }

            Long fromAccountId = Long.parseLong(request.get("fromAccountId").toString());
            String toAccountNumber = request.get("toAccountNumber").toString();
            BigDecimal amount = new BigDecimal(request.get("amount").toString());
            String description = request.get("description").toString();

            Transaction transaction = transactionService.transferFunds(
                fromAccountId, toAccountNumber, amount, description);

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Transfer completed successfully");
            response.put("transaction", transaction);

            return ResponseEntity.ok(response);
        } catch (NumberFormatException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Invalid number format for fromAccountId or amount");
            return ResponseEntity.badRequest().body(error);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
