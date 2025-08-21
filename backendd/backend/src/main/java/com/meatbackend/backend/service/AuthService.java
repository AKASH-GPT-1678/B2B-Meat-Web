package com.meatbackend.backend.service;

import com.meatbackend.backend.dto.LoginRequest;
import com.meatbackend.backend.dto.LoginResponse;
import com.meatbackend.backend.dto.RegistrationRequest;
import com.meatbackend.backend.io.*;
import com.meatbackend.backend.model.User;

public interface AuthService {

    User createUser(RegisterRequestDTO registerRequestDTO);

    VerifyEmailDto verifyUser(String email);

    String forgotPassword(String email);

    UpdatePasswordResponse updatePassword(LoginRequest loginRequest);

    ProfileResponseDTO getProfileByEmail();


    LoginResponse loginWithGoogle(RegistrationRequest registrationRequest);



}
