package com.Springboot_Project_Backend.springboot_project_backend.controller;

import com.Springboot_Project_Backend.springboot_project_backend.config.JwtUtil;
import com.Springboot_Project_Backend.springboot_project_backend.dto.LoginRequest;
import com.Springboot_Project_Backend.springboot_project_backend.dto.RegisterRequest;
import com.Springboot_Project_Backend.springboot_project_backend.dto.UserResponse;
import com.Springboot_Project_Backend.springboot_project_backend.entity.User;
import com.Springboot_Project_Backend.springboot_project_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        try {
            System.out.println("Registration request received: " + request.getEmail());
            System.out.println("Request details - FirstName: " + request.getFirstName() + ", Phone: " + request.getPhoneNumber());

            UserResponse userResponse = userService.registerUser(request);
            System.out.println("User registered successfully with ID: " + userResponse.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "User registered successfully");
            response.put("user", userResponse);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("Registration failed for email: " + request.getEmail());
            System.out.println("Error: " + e.getMessage());
            e.printStackTrace();
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            Optional<User> userOpt = userService.findByEmail(request.getEmail());
            
            if (userOpt.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid email or password");
                return ResponseEntity.badRequest().body(error);
            }

            User user = userOpt.get();
            if (!userService.validatePassword(request.getPassword(), user.getPassword())) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "Invalid email or password");
                return ResponseEntity.badRequest().body(error);
            }

            UserResponse userResponse = new UserResponse(user);

            // Generate JWT token
            String token = jwtUtil.generateToken(user.getEmail(), user.getId());

            Map<String, Object> response = new HashMap<>();
            response.put("message", "Login successful");
            response.put("user", userResponse);
            response.put("token", token);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Login failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            
            Optional<User> userOpt = userService.findByEmail(email);
            if (userOpt.isEmpty()) {
                Map<String, String> error = new HashMap<>();
                error.put("error", "User not found");
                return ResponseEntity.badRequest().body(error);
            }

            Map<String, String> response = new HashMap<>();
            response.put("message", "Password reset instructions sent to your email");
            
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Password reset failed: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
