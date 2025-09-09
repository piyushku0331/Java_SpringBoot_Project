package com.Springboot_Project_Backend.springboot_project_backend.config;

import com.Springboot_Project_Backend.springboot_project_backend.service.UserService;
import com.Springboot_Project_Backend.springboot_project_backend.service.AdminService;
import com.Springboot_Project_Backend.springboot_project_backend.repository.AdminRepository;
import com.Springboot_Project_Backend.springboot_project_backend.entity.Admin;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.lang.NonNull;

import java.io.IOException;
import java.util.Collections;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");
        final String requestURI = request.getRequestURI();

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            System.out.println("JWT Filter - Token found: " + jwt.substring(0, Math.min(20, jwt.length())) + "...");
            System.out.println("JWT Filter - Request URI: " + requestURI);
            try {
                username = jwtUtil.extractUsername(jwt);
                System.out.println("JWT Filter - Username extracted: " + username);
            } catch (Exception e) {
                System.out.println("JWT Filter - Token parsing failed: " + e.getMessage());
                logger.warn("JWT token parsing failed: " + e.getMessage());
            }
        } else {
            System.out.println("JWT Filter - No Authorization header or invalid format. Header: " + authorizationHeader);
        }

        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                UserDetails userDetails = null;
                
                // Check if this is an admin endpoint
                if (requestURI.startsWith("/api/admin")) {
                    System.out.println("JWT Filter - Admin endpoint detected, checking admin authentication");
                    Optional<Admin> adminOpt = adminRepository.findByEmail(username);
                    
                    if (adminOpt.isPresent()) {
                        Admin admin = adminOpt.get();
                        System.out.println("JWT Filter - Admin found: " + admin.getEmail() + ", Status: " + admin.getStatus());
                        
                        if (admin.getStatus() == Admin.AdminStatus.ACTIVE) {
                            // Create UserDetails for admin with admin role
                            userDetails = User.builder()
                                .username(admin.getEmail())
                                .password(admin.getPassword())
                                .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_ADMIN")))
                                .build();
                            System.out.println("JWT Filter - Admin UserDetails created with ROLE_ADMIN");
                        } else {
                            System.out.println("JWT Filter - Admin account is not active: " + admin.getStatus());
                        }
                    } else {
                        System.out.println("JWT Filter - No admin found with email: " + username);
                    }
                } else {
                    // Regular user endpoint
                    System.out.println("JWT Filter - Regular user endpoint, using UserService");
                    userDetails = userService.loadUserByUsername(username);
                }

                if (userDetails != null && jwtUtil.validateToken(jwt, userDetails.getUsername())) {
                    UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    System.out.println("JWT Filter - Authentication successful for: " + username + " with authorities: " + userDetails.getAuthorities());
                } else {
                    System.out.println("JWT Filter - Token validation failed for user: " + username);
                }
            } catch (Exception e) {
                System.out.println("JWT Filter - Error during authentication: " + e.getMessage());
                e.printStackTrace();
            }
        }

        filterChain.doFilter(request, response);
    }
}