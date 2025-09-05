package com.Springboot_Project_Backend.springboot_project_backend.controller;

import com.Springboot_Project_Backend.springboot_project_backend.entity.Account;
import com.Springboot_Project_Backend.springboot_project_backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/customer/accounts")
@CrossOrigin(origins = "http://localhost:3000")
public class AccountController {

    private static final Logger logger = LoggerFactory.getLogger(AccountController.class);

    @Autowired
    private AccountService accountService;

    @GetMapping
    public ResponseEntity<?> getCustomerAccounts(@RequestParam Long userId) {
        try {
            logger.info("Fetching accounts for userId: {}", userId);
            List<Account> accounts = accountService.getAccountsByUserId(userId);
            logger.info("Found {} accounts", accounts.size());
            return ResponseEntity.ok(accounts);
        } catch (Exception e) {
            logger.error("Error fetching accounts: {}", e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/{userId}/accounts")
    public ResponseEntity<?> getCustomerAccountsByPath(@PathVariable Long userId) {
        try {
            logger.info("Fetching accounts for userId (path): {}", userId);
            List<Account> accounts = accountService.getAccountsByUserId(userId);
            logger.info("Found {} accounts", accounts.size());
            return ResponseEntity.ok(accounts);
        } catch (Exception e) {
            logger.error("Error fetching accounts: {}", e.getMessage());
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/{accountId}")
    public ResponseEntity<?> getAccountDetails(@PathVariable String accountId) {
        try {
            // Validate accountId is numeric
            if (!accountId.matches("\\d+")) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid account ID format");
                return ResponseEntity.badRequest().body(error);
            }

            Long accountIdLong = Long.parseLong(accountId);
            Account account = accountService.getAccountById(accountIdLong);
            return ResponseEntity.ok(account);
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

    @PostMapping
    public ResponseEntity<?> createAccount(@RequestBody Map<String, Object> request) {
        try {
            validateCreateAccountRequest(request);
            Long userId = Long.valueOf(request.get("userId").toString());
            String accountType = request.get("accountType").toString();
            BigDecimal initialDeposit = new BigDecimal(request.get("initialDeposit").toString());
            
            Account account = accountService.createAccount(userId, accountType, initialDeposit);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Account created successfully");
            response.put("account", account);
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/balance/{accountNumber}")
    public ResponseEntity<?> getAccountBalance(@PathVariable String accountNumber) {
        try {
            Account account = accountService.getAccountByNumber(accountNumber);
            
            Map<String, Object> response = new HashMap<>();
            response.put("accountNumber", account.getAccountNumber());
            response.put("balance", account.getBalance());
            response.put("accountType", account.getAccountType());
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    private void validateCreateAccountRequest(Map<String, Object> request) {
        if (request.get("userId") == null || request.get("accountType") == null || request.get("initialDeposit") == null) {
            throw new IllegalArgumentException("Missing required fields: userId, accountType, initialDeposit");
        }
    }

    private Map<String, String> createErrorResponse(String message) {
        Map<String, String> error = new HashMap<>();
        error.put("error", message);
        return error;
    }
}
