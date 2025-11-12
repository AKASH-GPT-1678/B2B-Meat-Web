package com.meatbackend.backend.service.impl;

import com.meatbackend.backend.io.RegisterResponse;
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

    public RegisterResponse registerUser(String email, String username, String password) {

        // Check if username already exists
        RegisterResponse register = new RegisterResponse();
        if (userRepository.existsByUsername(username)) {
            register.setId(null);
            register.setSuccess(false);
            register.setMessage("User Exists");
            return register;
        }

        // Create new user
        User newUser = new User();

        newUser.setEmail(email);
        newUser.setUsername(username);
        newUser.setPassword(passwordEncoder.encode(password));
        newUser.setRoles("ROLE_USER");
        newUser.setCreatedOn(new Timestamp(System.currentTimeMillis()));
        User saveUser = userRepository.save(newUser);
        register.setMessage("User Created");
        register.setSuccess(true);
        register.setId(saveUser.getId());

        return register;
    }
}