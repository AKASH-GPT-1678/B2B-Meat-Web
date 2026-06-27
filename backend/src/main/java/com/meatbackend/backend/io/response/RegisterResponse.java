package com.meatbackend.backend.io.response;



import lombok.Data;

import java.util.UUID;
@Data
public class RegisterResponse {
    private String message;
    private boolean success;
    private UUID id;
    
}
