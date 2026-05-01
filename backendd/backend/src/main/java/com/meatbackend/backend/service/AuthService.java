package com.meatbackend.backend.service;

import com.meatbackend.backend.io.request.LoginRequest;
import com.meatbackend.backend.io.response.LoginResponse;
import com.meatbackend.backend.io.request.RegistrationRequest;
import com.meatbackend.backend.io.*;
import com.meatbackend.backend.io.request.RegisterRequestDTO;
import com.meatbackend.backend.io.response.ProfileResponseDTO;
import com.meatbackend.backend.io.response.UpdatePasswordResponse;
import com.meatbackend.backend.model.User;

public interface AuthService {

    User createUser(RegisterRequestDTO registerRequestDTO);

    VerifyEmailDto verifyUser(String email);

    String forgotPassword(String email);

    UpdatePasswordResponse updatePassword(LoginRequest loginRequest);

    ProfileResponseDTO getProfileByEmail();


    LoginResponse loginWithGoogle(RegistrationRequest registrationRequest);



}
