package com.meatbackend.backendd.service.impl;

import com.meatbackend.backendd.io.RegisterRequestDTO;
import com.meatbackend.backendd.model.User;
import com.meatbackend.backendd.repository.UserRepository;
import com.meatbackend.backendd.service.AuthService;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;


@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;

    }





    @Override
    public User createUser(RegisterRequestDTO registerRequestDTO) {
        User newUser = new User();

        newUser.setUsername(registerRequestDTO.getUserName());
        newUser.setEmail(registerRequestDTO.getEmail());
        newUser.setPassword(registerRequestDTO.getPassword());
        newUser.setCreatedOn(new Timestamp(System.currentTimeMillis()));
        newUser = userRepository.save(newUser);



        return newUser;
    }
}
