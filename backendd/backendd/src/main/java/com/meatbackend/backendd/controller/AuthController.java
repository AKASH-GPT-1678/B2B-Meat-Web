package com.meatbackend.backendd.controller;

import com.meatbackend.backendd.dto.ApiResponse;
import com.meatbackend.backendd.dto.LoginRequest;
import com.meatbackend.backendd.dto.LoginResponse;
import com.meatbackend.backendd.model.User;
import com.meatbackend.backendd.service.impl.CustomUserDetailsService;
import com.meatbackend.backendd.service.impl.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @GetMapping("/welcome")
    public ResponseEntity<ApiResponse> welcome() {
        return ResponseEntity.ok(new ApiResponse(true, "Welcome! This endpoint is accessible to everyone."));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            if (authentication.isAuthenticated()) {
                // Generate JWT token
                String token = jwtService.generateToken(loginRequest.getEmail());

                // Get user details
                UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());

                // Create response
                LoginResponse loginResponse = new LoginResponse(
                        token,
                        "Login successful",
                        loginRequest.getEmail(),
                        userDetails.getUsername()
                );

                return ResponseEntity.ok(new ApiResponse(true, "Login successful", loginResponse));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(new ApiResponse(false, "Invalid credentials"));
            }

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Invalid email or password"));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Login failed: " + e.getMessage()));
        }
    }

    @GetMapping("/user/profile")
    public ResponseEntity<ApiResponse> userProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();

            return ResponseEntity.ok(new ApiResponse(true,
                    "Welcome to User Profile! Logged in as: " + email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Error retrieving profile"));
        }
    }

    @GetMapping("/admin/profile")
    public ResponseEntity<ApiResponse> adminProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();

            return ResponseEntity.ok(new ApiResponse(true,
                    "Welcome to Admin Profile! Logged in as: " + email));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Error retrieving admin profile"));
        }
    }

    @GetMapping("/user/dashboard")
    public ResponseEntity<ApiResponse> userDashboard() {
        return ResponseEntity.ok(new ApiResponse(true, "User Dashboard - Access granted!"));
    }

    @GetMapping("/admin/dashboard")
    public ResponseEntity<ApiResponse> adminDashboard() {
        return ResponseEntity.ok(new ApiResponse(true, "Admin Dashboard - Access granted!"));
    }
}