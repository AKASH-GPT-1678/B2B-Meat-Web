package com.meatbackend.backend.service.impl;

import com.meatbackend.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.meatbackend.backend.model.User;
import java.sql.Timestamp;

@Service
public class UserRegistrationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public String registerUser(String email, String username, String password) {

        // Check if username already exists
        if (userRepository.existsByUsername(username)) {
            return "Username already exists!";
        }

        // Create new user
        User newUser = new User();
//        User user = User.builder()
//                .email(email)
//                .username(username)
//                .password(passwordEncoder.encode(password))
//                .roles("ROLE_USER")
//                .createdOn(new Timestamp(System.currentTimeMillis()))
//                .build();

        // Save user
        newUser.setEmail(email);
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setRoles("ROLE_USER");
        newUser.setCreatedOn(new Timestamp(System.currentTimeMillis()));
        userRepository.save(newUser);

        return "User registered successfully!";
    }
}