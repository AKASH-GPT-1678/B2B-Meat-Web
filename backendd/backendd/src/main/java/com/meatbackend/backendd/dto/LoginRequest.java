package com.meatbackend.backendd.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

// Login Request DTO
@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String email;
    private String password;
}
