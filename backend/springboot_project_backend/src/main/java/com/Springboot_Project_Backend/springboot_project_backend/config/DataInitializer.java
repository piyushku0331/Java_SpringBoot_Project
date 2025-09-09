package com.Springboot_Project_Backend.springboot_project_backend.config;

import com.Springboot_Project_Backend.springboot_project_backend.entity.Account;
import com.Springboot_Project_Backend.springboot_project_backend.entity.Admin;
import com.Springboot_Project_Backend.springboot_project_backend.entity.Transaction;
import com.Springboot_Project_Backend.springboot_project_backend.entity.User;
import com.Springboot_Project_Backend.springboot_project_backend.repository.AccountRepository;
import com.Springboot_Project_Backend.springboot_project_backend.repository.AdminRepository;
import com.Springboot_Project_Backend.springboot_project_backend.repository.TransactionRepository;
import com.Springboot_Project_Backend.springboot_project_backend.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Component
public class DataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(DataInitializer.class);

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private final Random random = new Random();

    @Override
    public void run(String... args) throws Exception {
        logger.info("Starting data initialization for MySQL database");
        
        if (adminRepository.count() == 0) {
            logger.info("No admins found, creating default admin");
            createDefaultAdmin();
        }

        // Check if we need to create sample data
        if (userRepository.count() == 0) {
            logger.info("No users found, creating sample user and data");
            createSampleData();
        } else if (transactionRepository.count() == 0) {
            logger.info("Users exist but no transactions found, creating sample transactions for existing users");
            createSampleTransactionsForExistingUsers();
        } else {
            logger.info("Sample data already exists, skipping initialization");
        }

        logger.info("Data initialization process finished");
    }

    private void createSampleData() {
        // Create a user with specific ID (2) for testing
        createUserWithSpecificId();

        User testUser = new User();
        testUser.setFirstName("Test");
        testUser.setLastName("User");
        testUser.setEmail("test@example.com");
        testUser.setPassword(passwordEncoder.encode("password123"));
        testUser.setPhoneNumber("9876543210");
        testUser.setAddress("123 Test Street, Test City");

        User savedUser = userRepository.save(testUser);
        createAccountsAndTransactions(savedUser);
        logger.info("Sample data initialization completed successfully");
    }

    private void createUserWithSpecificId() {
        // Create a user with ID 2 for testing purposes
        try {
            User userWithId2 = new User();
            userWithId2.setId(2L); // Set specific ID
            userWithId2.setFirstName("Demo");
            userWithId2.setLastName("User");
            userWithId2.setEmail("demo@example.com");
            userWithId2.setPassword(passwordEncoder.encode("demo123"));
            userWithId2.setPhoneNumber("9876543211");
            userWithId2.setAddress("456 Demo Street, Demo City");

            User savedUser = userRepository.save(userWithId2);
            createAccountsAndTransactions(savedUser);
            logger.info("Created user with specific ID: {}", savedUser.getId());
        } catch (Exception e) {
            logger.warn("Could not create user with specific ID, it may already exist: {}", e.getMessage());
        }
    }

    private void createSampleTransactionsForExistingUsers() {
        // Get all users and create accounts/transactions for each
        List<User> existingUsers = userRepository.findAll();
        for (User user : existingUsers) {
            // Check if user already has accounts
            if (accountRepository.findByUser(user).isEmpty()) {
                createAccountsAndTransactions(user);
                logger.info("Sample accounts and transactions created for user: {}", user.getEmail());
            }
        }
    }

    private void createAccountsAndTransactions(User user) {
        // Create test accounts
        Account savingsAccount = new Account();
        savingsAccount.setUser(user);
        savingsAccount.setAccountNumber(generateAccountNumber());
        savingsAccount.setAccountType(Account.AccountType.SAVINGS);
        savingsAccount.setBalance(new BigDecimal("5000.00"));
        savingsAccount.setStatus(Account.AccountStatus.ACTIVE);

        Account checkingAccount = new Account();
        checkingAccount.setUser(user);
        checkingAccount.setAccountNumber(generateAccountNumber());
        checkingAccount.setAccountType(Account.AccountType.CURRENT);
        checkingAccount.setBalance(new BigDecimal("2500.00"));
        checkingAccount.setStatus(Account.AccountStatus.ACTIVE);

        Account savedSavings = accountRepository.save(savingsAccount);
        Account savedChecking = accountRepository.save(checkingAccount);

        // Create sample transactions
        createSampleTransaction(savedSavings, Transaction.TransactionType.DEPOSIT,
                new BigDecimal("1000.00"), "Initial deposit");
        createSampleTransaction(savedSavings, Transaction.TransactionType.DEPOSIT,
                new BigDecimal("500.00"), "Salary credit");
        createSampleTransaction(savedSavings, Transaction.TransactionType.WITHDRAWAL,
                new BigDecimal("200.00"), "ATM withdrawal");

        createSampleTransaction(savedChecking, Transaction.TransactionType.DEPOSIT,
                new BigDecimal("2000.00"), "Initial deposit");
        createSampleTransaction(savedChecking, Transaction.TransactionType.WITHDRAWAL,
                new BigDecimal("150.00"), "Online purchase");
        createSampleTransaction(savedChecking, Transaction.TransactionType.TRANSFER,
                new BigDecimal("300.00"), "Transfer to savings");
    }

    private void createSampleTransaction(Account account, Transaction.TransactionType type,
                                         BigDecimal amount, String description) {
        Transaction transaction = new Transaction();
        transaction.setTransactionId(generateTransactionId());
        transaction.setAccount(account);
        transaction.setType(type);
        transaction.setAmount(amount); // keep amounts positive
        transaction.setDescription(description);
        transaction.setTransactionDate(LocalDateTime.now().minusDays(random.nextInt(30)));
        transaction.setStatus(Transaction.TransactionStatus.COMPLETED);
        transaction.setReferenceNumber("REF" + String.format("%06d", random.nextInt(999999)));

        // Update account balance
        if (type == Transaction.TransactionType.WITHDRAWAL) {
            account.setBalance(account.getBalance().subtract(amount));
        } else {
            account.setBalance(account.getBalance().add(amount));
        }
        accountRepository.save(account);

        transactionRepository.save(transaction);
    }

    private String generateTransactionId() {
        return "TXN" + String.format("%010d", random.nextInt(1000000000));
    }

    private String generateAccountNumber() {
        return "ACC" + String.format("%010d", random.nextInt(1000000000));
    }

    private void createDefaultAdmin() {
        try {
            Admin defaultAdmin = new Admin();
            defaultAdmin.setFirstName("Super");
            defaultAdmin.setLastName("Admin");
            defaultAdmin.setEmail("admin@bank.com");
            defaultAdmin.setPassword(passwordEncoder.encode("admin123"));
            defaultAdmin.setPhoneNumber("9999999999");
            defaultAdmin.setRole(Admin.AdminRole.SUPER_ADMIN);
            defaultAdmin.setStatus(Admin.AdminStatus.ACTIVE);

            Admin savedAdmin = adminRepository.save(defaultAdmin);
            logger.info("Default admin created successfully with email: {}", savedAdmin.getEmail());
        } catch (Exception e) {
            logger.error("Error creating default admin: {}", e.getMessage());
        }
    }
}
