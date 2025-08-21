package com.meatbackend.backend.controller;

import com.meatbackend.backend.dto.*;
import com.meatbackend.backend.io.*;
import com.meatbackend.backend.model.User;
import com.meatbackend.backend.repository.UserRepository;
import com.meatbackend.backend.service.AuthService;
import com.meatbackend.backend.service.EmailService;
import com.meatbackend.backend.service.impl.CustomUserDetailService;
import com.meatbackend.backend.service.impl.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;


    @Autowired
    private CustomUserDetailService userDetailService;

    private final AuthService authService;

    private final UserRepository userRepository;
    private final EmailService emailService;


    public AuthController(AuthService authService, UserRepository userRepository , EmailService emailService){
        this.authService = authService;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    @GetMapping("/welcome")
    public ResponseEntity<ApiResponse> welcome() {
        return ResponseEntity.ok(new ApiResponse(true, "Welcome! This endpoint is accessible to everyone."));
    }
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest loginRequest) {
        try {
            System.out.println("Login attempt for: " + loginRequest.getEmail());

            // Authenticate user
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );


            String token = jwtService.generateToken(loginRequest.getEmail());
            UserDetails userDetails = userDetailService.loadUserByUsername(loginRequest.getEmail());

            LoginResponse loginResponse = new LoginResponse(
                    token,
                    "Login successful",
                    loginRequest.getEmail(),
                    userDetails.getUsername()
            );

            return ResponseEntity.ok(new ApiResponse(true, "Login successful", loginResponse));

        } catch (BadCredentialsException e) {
            System.out.println("Invalid credentials for: " + loginRequest.getEmail());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new ApiResponse(false, "Invalid email or password"));
        } catch (Exception e) {
            System.out.println("Login error: " + e.getMessage());
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


    @PostMapping("/userverify")
    public ResponseEntity<VerifyEmailDto> verifyEmail(@RequestParam("email") String email){

        VerifyEmailDto verifyEmail = authService.verifyUser(email);

        return ResponseEntity.ok().body(verifyEmail);


    };
    @PostMapping("/update-password")
    public ResponseEntity<UpdatePasswordResponse> updatePassword(@RequestBody LoginRequest loginRequest) {
        UpdatePasswordResponse response = authService.updatePassword(loginRequest);
        return ResponseEntity.ok(response);
    }


    @PostMapping("/forgotPassword")
    public ResponseEntity<String> forgotPassword(@RequestParam("email") String email){
        System.out.println("Email sent to: " + email);
        String message = authService.forgotPassword(email);

        return ResponseEntity.ok(message);

    }

    @PostMapping("/forgotOtp")
    public ResponseEntity<VerifyOtpResponse> forgotOtp(@RequestBody OtpRequestDto otp){

        boolean response = emailService.verifyOtp(otp);
        VerifyOtpResponse verifyOtpResponse = new VerifyOtpResponse();
        verifyOtpResponse.setMessage("Verified");
        verifyOtpResponse.setSuccess(response);


        return ResponseEntity.ok(verifyOtpResponse);
    }

    @GetMapping("/profile")
    public ResponseEntity<ProfileResponseDTO> getProfile(){
        ProfileResponseDTO response = authService.getProfileByEmail();
        return ResponseEntity.ok(response);
    }



    @GetMapping("/checkToken")
    public TokenResponseDTO checkToken(){
        TokenResponseDTO response = new TokenResponseDTO();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();


        if (authentication.isAuthenticated()){
            Optional<User> user = userRepository.findByEmail(authentication.getName());

            boolean subscriptionStatus = user.get().isPremium();
            boolean isSeller = user.get().isUserSeller();


             response.setMessage("Verified User");
             response.setStatus(true);
             response.setSubscription(subscriptionStatus);
             response.setSeller(isSeller);
             response.setEmail(user.get().getEmail());

             return response;
        }
        else {
            response.setMessage("Not Verified User");
            response.setStatus(false);
            return response;


        }
    }

    @PostMapping("/google")
    public ResponseEntity<ApiResponse> loginwithGoogle(@RequestBody RegistrationRequest registerRequestDTO) {
        System.out.println("Google login attempt for: " + registerRequestDTO);
        try {
            System.out.println("Login attempt for: " + registerRequestDTO.getEmail());
            LoginResponse loginResponse = authService.loginWithGoogle(registerRequestDTO);
            return ResponseEntity.ok(new ApiResponse(true, "Login successful", loginResponse));
        }
        catch (Exception e) {
            System.out.println("Login error: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Login failed: " + e.getMessage()));
        }
    }





}