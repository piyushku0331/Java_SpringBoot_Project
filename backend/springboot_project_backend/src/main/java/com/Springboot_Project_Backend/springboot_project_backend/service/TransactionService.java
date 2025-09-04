package com.Springboot_Project_Backend.springboot_project_backend.service;

import com.Springboot_Project_Backend.springboot_project_backend.entity.Account;
import com.Springboot_Project_Backend.springboot_project_backend.entity.Transaction;
import com.Springboot_Project_Backend.springboot_project_backend.repository.AccountRepository;
import com.Springboot_Project_Backend.springboot_project_backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountRepository accountRepository;

    public List<Transaction> getTransactionsByAccountId(Long accountId) {
        return transactionRepository.findByAccountId(accountId);
    }

    public List<Transaction> getTransactionsByAccount(Account account) {
        return transactionRepository.findByAccountOrderByTransactionDateDesc(account);
    }

    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAllByOrderByTransactionDateDesc();
    }

    public boolean isAccountOwnedByUser(Long accountId, Long userId) {
        List<Account> userAccounts = accountRepository.findByUserId(userId);
        return userAccounts.stream().anyMatch(account -> account.getId().equals(accountId));
    }

    public List<Transaction> getTransactionsByUserId(Long userId) {
        return transactionRepository.findByAccount_User_IdOrderByTransactionDateDesc(userId);
    }

    public Transaction getTransactionById(Long transactionId) {
        Optional<Transaction> transactionOpt = transactionRepository.findById(transactionId);
        if (transactionOpt.isEmpty()) {
            throw new RuntimeException("Transaction not found");
        }
        return transactionOpt.get();
    }

    @Transactional
    public Transaction createTransaction(String accountNumber, String transactionType, BigDecimal amount, String description) {
        Optional<Account> accountOpt = accountRepository.findByAccountNumber(accountNumber);
        if (accountOpt.isEmpty()) {
            throw new RuntimeException("Account not found");
        }

        Account account = accountOpt.get();
        return createTransactionForAccount(account, transactionType, amount, description);
    }

    public Transaction createTransaction(Long accountId, String transactionType, BigDecimal amount, String description) {
        Optional<Account> accountOpt = accountRepository.findById(accountId);
        if (accountOpt.isEmpty()) {
            throw new RuntimeException("Account not found");
        }

        Account account = accountOpt.get();
        return createTransactionForAccount(account, transactionType, amount, description);
    }

    private Transaction createTransactionForAccount(Account account, String transactionType, BigDecimal amount, String description) {
        
        // Validate transaction
        if ("WITHDRAWAL".equals(transactionType) || "TRANSFER".equals(transactionType)) {
            if (account.getBalance().compareTo(amount) < 0) {
                throw new RuntimeException("Insufficient funds");
            }
        }

        // Create transaction record
        Transaction transaction = new Transaction();
        transaction.setAccount(account);
        transaction.setType(Transaction.TransactionType.valueOf(transactionType.toUpperCase()));
        transaction.setAmount(amount);
        transaction.setDescription(description);
        transaction.setTransactionDate(LocalDateTime.now());

        // Update account balance
        BigDecimal newBalance;
        if ("DEPOSIT".equals(transactionType)) {
            newBalance = account.getBalance().add(amount);
        } else {
            newBalance = account.getBalance().subtract(amount);
        }
        
        account.setBalance(newBalance);
        accountRepository.save(account);

        return transactionRepository.save(transaction);
    }

    @Transactional
    public Transaction transferFunds(Long fromAccountId, String toAccountNumber, BigDecimal amount, String description) {
        // Find source account
        Optional<Account> fromAccountOpt = accountRepository.findById(fromAccountId);
        if (fromAccountOpt.isEmpty()) {
            throw new RuntimeException("Source account not found");
        }

        // Find destination account by account number
        Optional<Account> toAccountOpt = accountRepository.findByAccountNumber(toAccountNumber);
        if (toAccountOpt.isEmpty()) {
            throw new RuntimeException("Destination account not found");
        }

        Account fromAccount = fromAccountOpt.get();
        Account toAccount = toAccountOpt.get();

        // Validate sufficient funds
        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new RuntimeException("Insufficient funds");
        }

        // Create debit transaction for source account
        Transaction debitTransaction = new Transaction();
        debitTransaction.setAccount(fromAccount);
        debitTransaction.setType(Transaction.TransactionType.TRANSFER);
        debitTransaction.setAmount(amount.negate()); // Negative for debit
        debitTransaction.setDescription("Transfer to " + toAccountNumber + " - " + description);
        debitTransaction.setTransactionDate(LocalDateTime.now());

        // Create credit transaction for destination account
        Transaction creditTransaction = new Transaction();
        creditTransaction.setAccount(toAccount);
        creditTransaction.setType(Transaction.TransactionType.TRANSFER);
        creditTransaction.setAmount(amount); // Positive for credit
        creditTransaction.setDescription("Transfer from " + fromAccount.getAccountNumber() + " - " + description);
        creditTransaction.setTransactionDate(LocalDateTime.now());

        // Update account balances
        fromAccount.setBalance(fromAccount.getBalance().subtract(amount));
        toAccount.setBalance(toAccount.getBalance().add(amount));

        // Save all changes
        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);
        transactionRepository.save(debitTransaction);
        transactionRepository.save(creditTransaction);

        return debitTransaction; // Return the debit transaction as confirmation
    }
}
