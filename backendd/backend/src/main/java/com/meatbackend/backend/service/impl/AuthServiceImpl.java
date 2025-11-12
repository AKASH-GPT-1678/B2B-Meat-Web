package com.meatbackend.backend.service.impl;

import com.meatbackend.backend.dto.LoginRequest;
import com.meatbackend.backend.dto.LoginResponse;
import com.meatbackend.backend.dto.RegistrationRequest;
import com.meatbackend.backend.exception.EmailNotFoundException;
import com.meatbackend.backend.io.*;
import com.meatbackend.backend.model.EmailEntity;
import com.meatbackend.backend.model.OtpModel;
import com.meatbackend.backend.model.User;
import com.meatbackend.backend.repository.OtpRepository;
import com.meatbackend.backend.repository.UserRepository;
import com.meatbackend.backend.service.AuthService;
import com.meatbackend.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;


@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final EmailService emailService;

    private final OtpRepository otpRepository;


    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    private final UserRegistrationService userRegistrationService;


    public AuthServiceImpl(UserRepository userRepository, EmailService emailService, OtpRepository otpRepository, UserRegistrationService userRegistrationService){
        this.userRepository = userRepository;

        this.emailService = emailService;
        this.otpRepository = otpRepository;
        this.userRegistrationService = userRegistrationService;
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


    @Override
    public VerifyEmailDto verifyUser(String email) {
        VerifyEmailDto verifyEmailDto = new VerifyEmailDto();

        try {
            Optional<User> existingUser = userRepository.findByEmail(email);
            if (existingUser.isEmpty()) {
                // Generate OTP once here
                String otp = generateOtp();

                // Save OTP to DB here
                OtpModel newOtp = new OtpModel();
                newOtp.setOtp(otp);
                newOtp.setUserEmail(email);
                newOtp.setCreatedOn(new Timestamp(System.currentTimeMillis()));
                otpRepository.save(newOtp);

                // Send email
                EmailEntity emailEntity = new EmailEntity();
                emailEntity.setRecipient(email);
                emailEntity.setSubject("Email Verification");
                emailEntity.setMsgBody("Your OTP is: " + otp);

                emailService.sendSimpleMail(emailEntity);

                verifyEmailDto.setMessage("OTP Sent");
                verifyEmailDto.setStatus("OTP Verification");
                verifyEmailDto.setMethod("Otp");
            } else {
                verifyEmailDto.setMessage("User Found");
                verifyEmailDto.setStatus("Password Verification");
                verifyEmailDto.setMethod("password");
            }
        } catch (Exception e) {
            verifyEmailDto.setMessage("Error occurred: " + e.getMessage());
            verifyEmailDto.setStatus("Failed");
            e.printStackTrace();
        }

        return verifyEmailDto;
    }


    @Override
    public String forgotPassword(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new EmailNotFoundException("No User with Such EMail found"));




        EmailEntity emailEntity = new EmailEntity();
        emailEntity.setRecipient(email);
        emailEntity.setSubject("Email verification");
        emailEntity.setAttachment("My Dear Bhanje"); // You can update or remove this if not needed
 ;



        emailService.sendSimpleMail(emailEntity);

        return "Otp Sent Successfully";
    }

    @Override
    public UpdatePasswordResponse updatePassword(LoginRequest loginRequest) {
        // 1. Check if email exists
        User user = userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(() -> new EmailNotFoundException("Email not found"));

        // 2. Encode password before saving
        String encodedPassword = passwordEncoder.encode(loginRequest.getPassword());
        user.setPassword(encodedPassword);


        userRepository.save(user);

        // 4. Return success response
        return new UpdatePasswordResponse(
                true,
                "Password updated and encoded successfully.",
                user.getEmail()
        );
    }

    @Override
    public ProfileResponseDTO getProfileByEmail() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new EmailNotFoundException("Email not found"));


        return ProfileResponseDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .username(user.getUsername())
                .profilePictureUrl(user.getProfilePictureUrl())
                .isUserSeller(user.isUserSeller())
                .isPremium(user.isPremium())
                .chat_Status(user.isChatStatus())
                .build();




    }

    @Override
    public LoginResponse loginWithGoogle(RegistrationRequest registerRequestDTO) {
        Optional<User> user = userRepository.findByEmail(registerRequestDTO.getEmail());


        if (user.isPresent()) {
            String token = jwtService.generateToken(registerRequestDTO.getEmail());


            return new LoginResponse(
                    token,
                    "Login successful",
                    registerRequestDTO.getEmail(),
                    user.get().getUsername()
            );
        }


        RegisterResponse registrationResult = userRegistrationService.registerUser(
                registerRequestDTO.getEmail(),
                registerRequestDTO.getUsername(),
                registerRequestDTO.getPassword()
        );

        if ("User Registered Successfully".equals(registrationResult)) {
            // Now generate token directly, skip authenticationManager (assuming Google verified identity)
            String token = jwtService.generateToken(registerRequestDTO.getEmail());
            User newUser = userRepository.findByEmail(registerRequestDTO.getEmail()).get();


            return new LoginResponse(
                    token,
                    "Login successful",
                    registerRequestDTO.getEmail(),
                    newUser.getUsername()
            );
        }


        throw new RuntimeException("Google login failed: Unable to register user.");
    }



    public String generateOtp() {

        StringBuilder otp = new StringBuilder();

        int run = 4;

        while (run != 0) {
            double a = Math.random();
            int rand = (int) (a * 10);

            otp.append(rand);
            run--;

        }
        ;
        System.out.println(otp);

        return otp.toString();

    }


}
