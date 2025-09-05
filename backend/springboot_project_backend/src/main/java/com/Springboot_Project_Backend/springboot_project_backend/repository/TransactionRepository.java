package com.Springboot_Project_Backend.springboot_project_backend.repository;

import com.Springboot_Project_Backend.springboot_project_backend.entity.Account;
import com.Springboot_Project_Backend.springboot_project_backend.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {
    List<Transaction> findByAccount(Account account);
    List<Transaction> findByAccountId(Long accountId);
    List<Transaction> findByAccountOrderByTransactionDateDesc(Account account);
    List<Transaction> findAllByOrderByTransactionDateDesc();
    List<Transaction> findByAccount_User_IdOrderByTransactionDateDesc(Long userId);
    
    @Query("SELECT COUNT(t) FROM Transaction t WHERE DATE(t.transactionDate) = ?1")
    long countTransactionsToday(LocalDate date);
}
