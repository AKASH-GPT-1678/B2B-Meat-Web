package com.meatbackend.backendd.service;

import com.meatbackend.backendd.io.RegisterRequestDTO;
import com.meatbackend.backendd.model.User;

public interface AuthService {

    User createUser(RegisterRequestDTO registerRequestDTO);
}
