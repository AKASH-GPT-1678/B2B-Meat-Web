package com.meatbackend.backendd.service.impl;

import com.meatbackend.backendd.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.meatbackend.backendd.model.User;
import java.sql.Timestamp;

@Service
public class UserRegistrationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String registerUser(String email, String username, String password) {
        // Check if email already exists
        if (userRepository.existsByEmail(email)) {
            return "Email already exists!";
        }

        // Check if username already exists
        if (userRepository.existsByUsername(username)) {
            return "Username already exists!";
        }

        // Create new user
        User user = User.builder()
                .email(email)
                .username(username)
                .password(passwordEncoder.encode(password))
                .roles("ROLE_USER")
                .createdOn(new Timestamp(System.currentTimeMillis()))
                .build();

        // Save user
        userRepository.save(user);

        return "User registered successfully!";
    }
}