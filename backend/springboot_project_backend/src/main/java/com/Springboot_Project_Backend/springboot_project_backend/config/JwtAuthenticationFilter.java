package com.Springboot_Project_Backend.springboot_project_backend.config;

import com.Springboot_Project_Backend.springboot_project_backend.service.UserService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.lang.NonNull;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        final String authorizationHeader = request.getHeader("Authorization");

        String username = null;
        String jwt = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            jwt = authorizationHeader.substring(7);
            System.out.println("JWT Filter - Token found: " + jwt.substring(0, Math.min(20, jwt.length())) + "...");
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
                UserDetails userDetails = userService.loadUserByUsername(username);

                if (jwtUtil.validateToken(jwt, userDetails.getUsername())) {
                    UsernamePasswordAuthenticationToken authenticationToken =
                        new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authenticationToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                    System.out.println("JWT Filter - Authentication successful for user: " + username);
                } else {
                    System.out.println("JWT Filter - Token validation failed for user: " + username);
                }
            } catch (Exception e) {
                System.out.println("JWT Filter - Error loading user details: " + e.getMessage());
            }
        }

        filterChain.doFilter(request, response);
    }
}