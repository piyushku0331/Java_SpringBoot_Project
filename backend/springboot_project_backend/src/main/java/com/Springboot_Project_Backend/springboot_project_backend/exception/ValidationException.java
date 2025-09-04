package com.Springboot_Project_Backend.springboot_project_backend.exception;

public class ValidationException extends RuntimeException {
    public ValidationException(String message) {
        super(message);
    }
}
